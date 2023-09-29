import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import * as THREE from 'three';
import { debounce } from 'lodash-es';
import Stats from 'three/examples/jsm/libs/stats.module';
import { constants } from 'fs';
// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

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
  duration: number;
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

  textures: Texture[] = [
    {
      url: '01',
      film: 'Pizza Topping',
      director: 'Ethan Folk & Ty Wardwell',
      w: 719,
      h: 1040,
      steps: [
        {
          pos: { x: 0, y: 0, z: 0 },
          rot: { x: 0, y: 0, z: THREE.MathUtils.degToRad(45) },
          scale: 1.15,
          dmScale: 1.5,
          duration: 1,
        },
        {
          pos: { x: 0, y: 0, z: 0 },
          rot: { x: 0, y: 0, z: 0 },
          scale: 1,
          dmScale: 0,
          duration: 1,
        },
        {
          pos: { x: 0, y: 0, z: 0 },
          rot: { x: 0, y: 0, z: THREE.MathUtils.degToRad(40) },
          scale: 2.5,
          dmScale: -5,
          duration: 1,
        },
      ],
      mat: undefined,
      plane: undefined,
    },
    {
      url: '02',
      film: 'BARE BREASTED // BARE CHESTED',
      director: 'Emma Fragorzi/Veronica Franchetti',
      w: 1563,
      h: 883,
      steps: [
        {
          pos: { x: -0.25, y: 0, z: 0 },
          rot: { x: 0, y: 0, z: THREE.MathUtils.degToRad(-30) },
          scale: 0.6,
          dmScale: 2,
          duration: 1,
        },
        {
          pos: { x: 0, y: 0, z: 0 },
          rot: { x: 0, y: 0, z: 0 },
          scale: 0.7,
          dmScale: 0,
          duration: 1,
        },
        {
          pos: { x: -0.25, y: 0, z: 0 },
          rot: {
            x: THREE.MathUtils.degToRad(40),
            y: THREE.MathUtils.degToRad(-40),
            z: THREE.MathUtils.degToRad(-30),
          },
          scale: 1,
          dmScale: -2,
          duration: 1,
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
  animation = {
    easeStep: 'back.inOut',
    easeReinit: 'power2.inOut',
  };
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

    this.stats = new Stats();
    document.body.appendChild(this.stats.dom);

    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });

    // const controls = new OrbitControls(camera, renderer.domElement);
    // controls.update();
  }

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

    this.container!.add(this.texture.plane!);

    setTimeout(() => {
      this.udpateCredits();
    }, 1000);
  };

  switchTexture = () => {
    this.switchStep();
    this.setTexture();
  };

  switchStep = () => {
    if (this.stepId < this.texture!.steps.length - 1) {
      this.stepId++;
    } else {
      this.stepId = 0;
    }
  };

  animateStep = () => {
    //  this.switchStep();
    console.log('animation start');
    let step = this.texture!.steps[this.stepId];
    let stepEase: string;

    if (this.stepId === 0) {
      stepEase = this.animation.easeStep;
      if (this.texture!.mat) {
        this.texture!.mat.opacity = 0;
        gsap.to(this.texture!.mat, {
          opacity: 1,
          duration: 1,
        });
      }
    } else {
      stepEase = this.animation.easeReinit;
    }

    if (this.timeline) {
      this.timeline.kill();
    }
    this.timeline = gsap.timeline();

    this.timeline.to(this.texture!.plane!.position, {
      ...step.pos,
      duration: step.duration,
      ease: stepEase,
    });
    this.timeline.to(
      this.texture!.plane!.rotation,
      {
        ...step.rot,
        duration: step.duration,
        ease: stepEase,
      },
      '<',
    );
    this.timeline.to(
      this.texture!.plane!.scale,
      {
        x: step.scale * (this.texture!.w / this.texture!.h),
        y: step.scale,
        duration: step.duration,
        ease: stepEase,
      },
      '<',
    );
    this.timeline.to(
      this.texture!.mat!,
      {
        displacementScale: step.dmScale,
        duration: step.duration,
        ease: stepEase,
      },
      '<',
    );
  };

  udpateCredits = () => {
    document.querySelector('.visual__caption-film')!.innerHTML = this.texture!.film;
    document.querySelector('.visual__caption-director')!.innerHTML = this.texture!.director;
  };

  render = () => {
    this.stats!.update();

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
      this.animateStep();

      this.renderer!.setAnimationLoop(this.render);

      if (this.testStep !== undefined) {
        document.addEventListener('click', this.switchTexture);
      }
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

      if (this.testStep !== undefined) {
        document.removeEventListener('click', this.switchTexture);
      }
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
        this.renderer?.domElement.classList.add('faded');
        this.isFaded = true;
      }
    } else {
      if (this.isFaded) {
        this.renderer?.domElement.classList.remove('faded');
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
         * will always call the start() twice, as the it mounted
         * twice in dev mode.
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
