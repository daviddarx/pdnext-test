import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import * as THREE from 'three';
import { debounce } from 'lodash-es';
import Stats from 'three/examples/jsm/libs/stats.module';

type Vector3 = {
  x: number;
  y: number;
  z: number;
};

type AnimationStep = {
  pos: Vector3;
  rot: Vector3;
  scale: number;
  dmScale: number;
};

type Texture = {
  url: string;
  film: string;
  director: string;
  w: number;
  h: number;
  steps: AnimationStep[];
  mat: THREE.MeshStandardMaterial | undefined;
  plane: THREE.Mesh | undefined;
};
class ThreeVisual {
  camera = null as THREE.PerspectiveCamera | null;
  scene = null as THREE.Scene | null;
  loader = null as THREE.TextureLoader | null;
  container = null as THREE.Mesh | null;
  light = null as THREE.AmbientLight | null;
  renderer = null as THREE.WebGLRenderer | null;
  stats = null as Stats | null;

  windowW = 0;
  windowH = 0;

  animation = {
    duration: 10,
    delayIn: 3,
    delayOut: 3,
    startDelayIn: 1,
    opacityDurationIn: 1,
    opacityDurationOut: 1,
    ease: 'power2.inOut',
  };

  textures: Texture[] = [
    {
      url: '01',
      film: 'Pigs At First Sight',
      director: 'Jamal Phoenix, Skip Marshall',
      w: 719,
      h: 1040,
      steps: [
        {
          pos: { x: 0, y: 0, z: 1.2 },
          rot: { x: 0, y: 0, z: THREE.MathUtils.degToRad(-61) },
          scale: 1,
          dmScale: 1,
        },
        {
          pos: { x: 0, y: -0.4, z: 0 },
          rot: { x: 0, y: 0, z: THREE.MathUtils.degToRad(-61) },
          scale: 2.2,
          dmScale: 0,
        },
        {
          pos: { x: -0.3, y: -1.1, z: 1.5 },
          rot: {
            x: THREE.MathUtils.degToRad(8),
            y: THREE.MathUtils.degToRad(-18),
            z: THREE.MathUtils.degToRad(-32),
          },
          scale: 3,
          dmScale: -4.2,
        },
      ],
      mat: undefined,
      plane: undefined,
    },
    {
      url: '02.1',
      film: 'Maman',
      director: 'Four Chambers',
      w: 1563,
      h: 883,
      steps: [
        {
          pos: { x: 0.2, y: 0, z: 0.4 },
          rot: {
            x: THREE.MathUtils.degToRad(-10),
            y: THREE.MathUtils.degToRad(-13.8),
            z: THREE.MathUtils.degToRad(-30),
          },
          scale: 0.55,
          dmScale: 1.8,
        },
        {
          pos: { x: 0.2, y: 0.1, z: 0.7 },
          rot: { x: 0, y: 0, z: THREE.MathUtils.degToRad(-10) },
          scale: 0.87,
          dmScale: 0,
        },
        {
          pos: { x: -0.8, y: 0.4, z: 1.3 },
          rot: {
            x: THREE.MathUtils.degToRad(24),
            y: THREE.MathUtils.degToRad(-40),
            z: THREE.MathUtils.degToRad(-30),
          },
          scale: 1,
          dmScale: -1.3,
        },
      ],
      mat: undefined,
      plane: undefined,
    },
    {
      url: '02.2',
      film: 'Maman',
      director: 'Four Chambers',
      w: 1577,
      h: 883,
      steps: [
        {
          pos: { x: 0.9, y: 0.2, z: 0 },
          rot: {
            x: THREE.MathUtils.degToRad(0),
            y: THREE.MathUtils.degToRad(-16),
            z: THREE.MathUtils.degToRad(-18),
          },
          scale: 0.61,
          dmScale: 3,
        },
        {
          pos: { x: 1.2, y: 0, z: 0.5 },
          rot: { x: THREE.MathUtils.degToRad(2), y: 0, z: 0 },
          scale: 0.9,
          dmScale: 0,
        },
        {
          pos: { x: 0.3, y: 0.7, z: 0.7 },
          rot: {
            x: THREE.MathUtils.degToRad(-26),
            y: THREE.MathUtils.degToRad(-61),
            z: THREE.MathUtils.degToRad(-29.9),
          },
          scale: 1,
          dmScale: -2,
        },
      ],
      mat: undefined,
      plane: undefined,
    },
    {
      url: '03',
      film: 'Transit',
      director: 'Jizz Lee, Vanniall',
      w: 1916,
      h: 802,
      steps: [
        {
          pos: { x: 0.2, y: 0, z: -0.4 },
          rot: {
            x: THREE.MathUtils.degToRad(-23.69),
            y: THREE.MathUtils.degToRad(0),
            z: THREE.MathUtils.degToRad(-19.72),
          },
          scale: 0.64,
          dmScale: 1.8,
        },
        {
          pos: { x: -0.2, y: 0, z: 0.8 },
          rot: {
            x: THREE.MathUtils.degToRad(0),
            y: THREE.MathUtils.degToRad(0),
            z: THREE.MathUtils.degToRad(0),
          },
          scale: 0.64,
          dmScale: 0,
        },
        {
          pos: { x: -0.3, y: -0.3, z: 0.9 },
          rot: {
            x: THREE.MathUtils.degToRad(41.82),
            y: THREE.MathUtils.degToRad(-32),
            z: THREE.MathUtils.degToRad(2.12),
          },
          scale: 0.64,
          dmScale: -1.1,
        },
      ],
      mat: undefined,
      plane: undefined,
    },
  ];
  texture: Texture | undefined = undefined;
  textureId = 0;
  stepId = 0;
  running = false;
  timeline: GSAPTimeline | undefined = undefined;
  testId: number | undefined = undefined;
  testStep: number | undefined = undefined;

  isFaded = false;

  mouseXToCenter = 0;
  mouseXToCenterAbs = 0;
  mouseYToCenter = 0;
  rotX = 0;
  rotXFactor = 0.2;
  rotXFactorEase = 0.05;
  rotY = 0;
  rotYFactor = 0.2;
  rotYFactorEase = 0.05;

  constructor() {
    this.init();
  }

  init() {
    // For debguging puprose, switch to steps, i.e: http://localhost:3000/festival-program?id=1?step=1
    const url = new URL(window.location.href);
    const searchParams = new URLSearchParams(url.search);
    const searchId = searchParams.get('id');
    const searchStep = searchParams.get('step');

    this.testId = searchId ? parseInt(searchId) : undefined;
    this.testStep = searchStep ? parseInt(searchStep) : undefined;

    this.camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.01, 10);
    this.camera.position.z = 3;

    this.scene = new THREE.Scene();

    this.loader = new THREE.TextureLoader();

    this.textures.forEach((texture) => {
      const image = this.loader!.load(`/images/visual/${texture.url}.jpg`);
      image.colorSpace = THREE.SRGBColorSpace;
      const map = this.loader!.load(`/images/visual/${texture.url}_map.jpg`);
      const alpha = this.loader!.load(`/images/visual/${texture.url}_alpha.jpg`);
      texture.mat = new THREE.MeshStandardMaterial({
        map: image,
        alphaMap: alpha,
        displacementMap: map,
        displacementScale: 0,
        transparent: true,
        depthTest: true /* default true, try false to see what happen */,
      });

      const planeGeo = new THREE.PlaneGeometry(4, 4, 256, 256);
      texture.plane = new THREE.Mesh(planeGeo, texture.mat);
      texture.plane.scale.x = texture.steps[0].scale * (texture.w / texture.h);
      texture.plane.scale.y = texture.steps[0].scale;
    });

    this.container = new THREE.Mesh();
    this.scene.add(this.container);

    this.light = new THREE.AmbientLight(0xffffff, 3);
    this.scene.add(this.light);

    // this.stats = new Stats();
    // document.body.appendChild(this.stats.dom);

    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  }

  initDatGUI = async () => {
    const dat = await import('dat.gui');
    const gui = new dat.GUI();

    const step = this.texture!.steps[this.stepId];

    var tempValues = {
      rotX: THREE.MathUtils.radToDeg(step.rot.x),
      rotY: THREE.MathUtils.radToDeg(step.rot.y),
      rotZ: THREE.MathUtils.radToDeg(step.rot.z),
      scale: step.scale,
      dmScale: step.dmScale,
    };

    const position = gui.addFolder('Position');

    position.add(this.texture!.plane!.position, 'x', -2, 2).step(0.1);
    position.add(this.texture!.plane!.position, 'y', -2, 2).step(0.1);
    position.add(this.texture!.plane!.position, 'z', -2, 2).step(0.1);
    position.open();

    const rotation = gui.addFolder('Rotation');

    rotation.add(tempValues, 'rotX', -90, 90).onChange(() => {
      this.texture!.plane!.rotation.x = THREE.MathUtils.degToRad(tempValues.rotX);
    });
    rotation.add(tempValues, 'rotY', -90, 90).onChange(() => {
      this.texture!.plane!.rotation.y = THREE.MathUtils.degToRad(tempValues.rotY);
    });
    rotation.add(tempValues, 'rotZ', -90, 90).onChange(() => {
      this.texture!.plane!.rotation.z = THREE.MathUtils.degToRad(tempValues.rotZ);
    });
    rotation.open();

    gui.add(tempValues, 'scale', 0, 3).onChange(() => {
      this.texture!.plane!.scale.set(
        tempValues.scale * (this.texture!.w / this.texture!.h),
        tempValues.scale,
        1,
      );
    });

    gui
      .add(tempValues, 'dmScale', -5, 5)
      .step(0.1)
      .onChange(() => {
        this.texture!.mat!.displacementScale = tempValues.dmScale;
      });

    document.addEventListener('click', () => {
      navigator.clipboard.writeText(`{
          pos: { x: ${parseFloat(this.texture!.plane!.position.x.toFixed(2))}, y: ${parseFloat(
        this.texture!.plane!.position.y.toFixed(2),
      )}, z: ${parseFloat(this.texture!.plane!.position.z.toFixed(2))},},
          rot: {
            x: THREE.MathUtils.degToRad(${parseFloat(tempValues.rotX.toFixed(2))}),
            y: THREE.MathUtils.degToRad(${parseFloat(tempValues.rotY.toFixed(2))}),
            z: THREE.MathUtils.degToRad(${parseFloat(tempValues.rotZ.toFixed(2))}),
          },
          scale: ${parseFloat(tempValues.scale.toFixed(2))},
          dmScale: ${parseFloat(tempValues.dmScale.toFixed(2))},
        },`);
    });
  };

  setTexture = () => {
    if (this.texture) {
      this.container!.remove(this.texture.plane!);
    }

    this.texture = this.textures[this.textureId];

    const step = this.texture!.steps[this.stepId];

    this.texture.plane!.position.set(step.pos.x, step.pos.y, step.pos.z);
    this.texture.plane!.rotation.set(step.rot.x, step.rot.y, step.rot.z);
    this.texture.plane!.scale.set(step.scale * (this.texture.w / this.texture.h), step.scale, 1);
    this.texture.mat!.displacementScale = step.dmScale;
    if (this.testStep === undefined) {
      this.texture.mat!.opacity = 0;
    }

    this.container!.add(this.texture.plane!);
  };

  switchStep = () => {
    if (this.stepId < this.texture!.steps.length - 1) {
      this.stepId++;
    } else {
      this.stepId = 0;
    }
  };

  animateStep = (startDelayIn = 0) => {
    let step = this.texture!.steps[this.stepId];

    if (this.timeline) {
      this.timeline.kill();
    }
    this.timeline = gsap.timeline();

    if (this.stepId === 1 && this.texture!.mat) {
      this.timeline.to(this.texture!.mat, {
        delay: startDelayIn,
        opacity: 1,
        duration: this.animation.opacityDurationIn,
        onStart: this.udpateCredits,
      });
    }

    this.timeline.to(this.texture!.plane!.position, {
      ...step.pos,
      duration: this.animation.duration,
      delay: this.stepId === 1 ? this.animation.delayIn : 0,
      ease: this.animation.ease,
    });
    this.timeline.to(
      this.texture!.plane!.rotation,
      {
        ...step.rot,
        duration: this.animation.duration,
        ease: this.animation.ease,
      },
      '<',
    );
    this.timeline.to(
      this.texture!.plane!.scale,
      {
        x: step.scale * (this.texture!.w / this.texture!.h),
        y: step.scale,
        duration: this.animation.duration,
        ease: this.animation.ease,
      },
      '<',
    );
    this.timeline.to(
      this.texture!.mat!,
      {
        displacementScale: step.dmScale,
        duration: this.animation.duration,
        ease: this.animation.ease,
        onComplete: () => {
          if (this.stepId < this.texture!.steps.length - 1) {
            this.stepId++;
            this.animateStep();
          }
        },
      },
      '<',
    );
    if (this.stepId === this.texture!.steps.length - 1 && this.texture!.mat) {
      this.timeline.to(this.texture!.mat, {
        opacity: 0,
        duration: this.animation.opacityDurationIn,
        delay: this.animation.delayOut,
        onComplete: () => {
          if (this.textureId < this.textures.length - 1) {
            this.textureId++;
          } else {
            this.textureId = 0;
          }

          this.stepId = 0;
          this.setTexture();
          this.stepId = 1;
          this.animateStep();
        },
      });
    }
  };

  udpateCredits = () => {
    document.querySelector('.visual__caption-film')!.innerHTML = this.texture!.film;
    document.querySelector('.visual__caption-director')!.innerHTML = this.texture!.director;
  };

  render = () => {
    // this.stats!.update();

    this.container!.rotation.x += (this.rotX - this.container!.rotation.x) * this.rotXFactorEase;
    this.container!.rotation.y += (this.rotY - this.container!.rotation.y) * this.rotYFactorEase;

    this.renderer!.render(this.scene!, this.camera!);
  };

  start = () => {
    if (!this.running) {
      this.running = true;

      this.textureId =
        this.testId !== undefined
          ? this.testId
          : this.testId || Math.floor(Math.random() * this.textures.length);
      this.stepId = this.testStep !== undefined ? this.testStep : 0;

      this.setTexture();

      if (this.testStep === undefined) {
        this.switchStep();
        this.animateStep(this.animation.startDelayIn);
      } else {
        this.initDatGUI();
      }

      this.renderer!.setAnimationLoop(this.render);

      document.addEventListener('mousemove', this.onMouseMove);
      document.addEventListener('scroll', this.onScrollDebounced, { passive: true });
      window.addEventListener('resize', this.onResize);
      this.onResize();
    }
  };

  kill = () => {
    if (this.running) {
      this.running = false;

      this.renderer!.setAnimationLoop(null);
      gsap.globalTimeline.clear();

      document.removeEventListener('mousemove', this.onMouseMove);
      document.removeEventListener('scroll', this.onScrollDebounced);
      window.removeEventListener('resize', this.onResize);
    }
  };

  onMouseMove = (e: MouseEvent) => {
    this.mouseXToCenter = e.clientX / this.windowW - 0.5;
    this.mouseXToCenterAbs = Math.abs(this.mouseXToCenter);
    this.mouseYToCenter = e.clientY / this.windowH - 0.5;
    this.rotX = this.mouseYToCenter * this.rotXFactor;
    this.rotY = this.mouseXToCenter * this.rotYFactor;
  };

  onScroll = () => {
    if (window.scrollY > 200) {
      if (!this.isFaded) {
        document.querySelector('.visual')!.classList.add('faded');
        this.isFaded = true;
      }
    } else {
      if (this.isFaded) {
        document.querySelector('.visual')!.classList.remove('faded');
        this.isFaded = false;
      }
    }
  };
  onScrollDebounced = debounce(this.onScroll, 20);

  onResize = () => {
    this.windowW = window.innerWidth;
    this.windowH = window.innerHeight;

    this.camera!.aspect = this.windowW / this.windowH;
    this.camera!.updateProjectionMatrix();
    this.renderer!.setSize(this.windowW, this.windowH);
  };

  getRandomNumber = (start: number, end: number) => {
    return Math.random() * (end - start) + start;
  };
}

let threeVisual: ThreeVisual | null = null;

if (typeof window !== 'undefined') {
  threeVisual = new ThreeVisual();
}

const Visual = () => {
  const container = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const containerRef = container.current;

    if (threeVisual?.renderer) {
      threeVisual.start();
      containerRef?.appendChild(threeVisual.renderer.domElement);
    }

    return () => {
      if (threeVisual?.renderer) {
        /**
         * Comment the .kill() out to develop, if else it
         * will always call the start() twice, as the component
         * is mounted twice in dev mode.
         */
        threeVisual.kill();
        containerRef?.removeChild(threeVisual.renderer.domElement);
      }
    };
  });

  return (
    <figure className='visual' ref={container}>
      <figcaption className='visual__caption'>
        <span className='visual__caption-film'></span>
        <span className='visual__caption-director'></span>
      </figcaption>
    </figure>
  );
};

export default React.memo(Visual);
