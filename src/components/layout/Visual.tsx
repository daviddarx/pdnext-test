import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import * as THREE from 'three';
import Stats from 'three/examples/jsm/libs/stats.module';
// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

type Material = THREE.MeshStandardMaterial;

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
  mat: Material | undefined;
};
class ThreeVisual {
  camera = null as THREE.PerspectiveCamera | null;
  scene = null as THREE.Scene | null;
  loader = null as THREE.TextureLoader | null;
  container = null as THREE.Mesh | null;
  plane = null as THREE.Mesh | null;
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
          rot: { x: 0, y: 0, z: 45 },
          scale: 1.25,
          dmScale: 1.5,
        },
        {
          pos: { x: 0.5, y: 0.2, z: 0 },
          rot: { x: 0, y: -10, z: 40 },
          scale: 3,
          dmScale: -5,
        },
      ],
      mat: undefined,
    },
  ];
  texture: Texture | undefined = undefined;
  textureId = 0;
  stepId: null | number = null;
  paused = true;
  timeline: GSAPTimeline | undefined = undefined;
  animation = {
    duration: 5,
    durationRandomRange: 1,
    easeStep: 'back.inOut',
    easeReinit: 'power2.inOut',
  };

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
    });

    const url = new URL(window.location.href);
    const searchParams = new URLSearchParams(url.search);
    const id = searchParams.get('id');

    this.textureId = id ? parseInt(id) : Math.floor(Math.random() * this.textures.length);
    this.texture = this.textures[this.textureId];

    this.container = new THREE.Mesh();
    this.scene.add(this.container);

    const planeGeo = new THREE.PlaneGeometry(4, 4, 256, 256);
    this.plane = new THREE.Mesh(planeGeo, this.texture.mat);
    this.container.add(this.plane);

    this.light = new THREE.AmbientLight(0xffffff, 3);
    this.scene.add(this.light);

    this.stats = new Stats();
    document.body.appendChild(this.stats.dom);

    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });

    // const controls = new OrbitControls(camera, renderer.domElement);
    // controls.update();
  }

  animate = () => {
    if (this.stepId === null) {
      this.stepId = 0;
    } else if (this.stepId === 0) {
      this.stepId = 1;
    } else {
      this.stepId = null;
    }
    console.log(this.stepId);

    let step: AnimationStep;
    let ease: string;

    if (this.stepId !== null) {
      step = this.texture!.steps[this.stepId];
      ease = this.animation.easeStep;
    } else {
      step = { pos: { x: 0, y: 0, z: 0 }, rot: { x: 0, y: 0, z: 0 }, scale: 1, dmScale: 0 };
      ease = this.animation.easeReinit;
    }

    const { duration, durationRandomRange } = this.animation;
    const durationStart = duration - durationRandomRange;
    const durationEnd = duration + durationRandomRange;
    const randomDuration = this.getRandomNumber(durationStart, durationEnd);

    if (this.timeline) {
      this.timeline.kill();
    }
    this.timeline = gsap.timeline();

    this.timeline.to(this.plane!.position, {
      ...step.pos,
      duration: randomDuration,
      ease: ease,
    });
    this.timeline.to(
      this.plane!.rotation,
      {
        x: THREE.MathUtils.degToRad(step.rot.x),
        y: THREE.MathUtils.degToRad(step.rot.y),
        z: THREE.MathUtils.degToRad(step.rot.z),
        duration: randomDuration,
        ease: ease,
      },
      '<',
    );
    this.timeline.to(
      this.plane!.scale,
      {
        x: step.scale * (this.texture!.w / this.texture!.h),
        y: step.scale,
        duration: randomDuration,
        ease: ease,
      },
      '<',
    );
    this.timeline.to(
      this.texture!.mat!,
      {
        displacementScale: step.dmScale,
        duration: randomDuration,
        ease: ease,
      },
      '<',
    );
  };

  render = () => {
    this.stats!.update();

    this.container!.rotation.x += (this.rotX - this.container!.rotation.x) * this.rotXFactorEase;
    this.container!.rotation.y += (this.rotY - this.container!.rotation.y) * this.rotYFactorEase;

    this.renderer!.render(this.scene!, this.camera!);
  };

  resume = () => {
    if (this.paused) {
      this.animate();

      this.paused = false;

      this.renderer!.setAnimationLoop(this.render);

      document.addEventListener('click', this.animate);
      document.addEventListener('mousemove', this.onMouseMove);
      window.addEventListener('resize', this.onResize);
      this.onResize();
    }
  };

  pause = () => {
    if (this.paused === false) {
      this.paused = true;

      this.renderer!.setAnimationLoop(null);
      gsap.globalTimeline.clear();

      document.removeEventListener('click', this.animate);
      document.removeEventListener('mousemove', this.onMouseMove);
      window.removeEventListener('resize', this.onResize);
    }
  };

  onResize = () => {
    this.windowW = window.innerWidth;
    this.windowH = window.innerHeight;

    this.camera!.aspect = this.windowW / this.windowH;
    this.camera!.updateProjectionMatrix();
    this.renderer!.setSize(this.windowW, this.windowH);
  };

  onMouseMove = (e: MouseEvent) => {
    this.mouseXToCenter = e.clientX / this.windowW - 0.5;
    this.mouseXToCenterAbs = Math.abs(this.mouseXToCenter);
    this.mouseYToCenter = e.clientY / this.windowH - 0.5;
    this.rotX = this.mouseYToCenter * this.rotXFactor;
    this.rotY = this.mouseXToCenter * this.rotYFactor;
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
      threeVisual.resume();
      containerRef?.appendChild(threeVisual.renderer.domElement);
    }

    return () => {
      if (threeVisual?.renderer) {
        threeVisual.pause();
        containerRef?.removeChild(threeVisual.renderer.domElement);
      }
    };
  });

  return (
    <figure className='visual' ref={container}>
      <figcaption className='visual__caption'>
        <span className='visual__caption-film'>{threeVisual?.texture?.film}</span>
        <span className='visual__caption-director'>{threeVisual?.texture?.director}</span>
      </figcaption>
    </figure>
  );
};

export default React.memo(Visual);
