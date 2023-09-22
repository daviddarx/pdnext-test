import React, { useRef, useEffect } from 'react';
import { render } from 'react-dom';
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
      w: 719,
      h: 1040,
      steps: [
        {
          pos: { x: 0, y: 0, z: 0 },
          rot: { x: 0, y: 0, z: 45 },
          scale: 1.5,
          dmScale: 1.5,
        },
        {
          pos: { x: 0, y: 0, z: 0 },
          rot: { x: 0, y: 0, z: 45 },
          scale: 1,
          dmScale: -1.5,
        },
      ],
      mat: undefined,
    },
  ];
  texture: Texture | undefined = undefined;
  paused = true;

  mouseXToCenter = 0;
  mouseXToCenterAbs = 0;
  mouseYToCenter = 0;
  rotX = 0;
  rotXFactor = 0.75;
  rotXFactorEase = 0.05;
  rotY = 0;
  rotYFactor = 0.75;
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

    this.texture = this.textures[0];

    this.container = new THREE.Mesh();
    this.scene.add(this.container);

    console.log(this.texture);
    const planeGeo = new THREE.PlaneGeometry(4, 4, 256, 256);
    this.plane = new THREE.Mesh(planeGeo, this.texture.mat);
    this.container.add(this.plane);

    this.light = new THREE.AmbientLight(0xffffff, 3);
    this.scene.add(this.light);

    this.stats = new Stats();
    document.body.appendChild(this.stats.dom);

    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });

    this.animate();

    // const controls = new OrbitControls(camera, renderer.domElement);
    // controls.update();
  }

  animate = () => {
    const step = this.texture!.steps[0];
    this.plane!.scale.y = step.scale;
    this.plane!.scale.x = step.scale * (this.texture!.w / this.texture!.h);
    this.plane!.position.x = step.pos.x;
    this.plane!.position.y = step.pos.y;
    this.plane!.rotation.z = THREE.MathUtils.degToRad(step.rot.z);
    this.texture!.mat!.displacementScale = step.dmScale;
  };

  render = () => {
    this.stats!.update();

    this.container!.rotation.x += (this.rotX - this.container!.rotation.x) * this.rotXFactorEase;
    this.container!.rotation.y += (this.rotY - this.container!.rotation.y) * this.rotYFactorEase;

    this.renderer!.render(this.scene!, this.camera!);
  };

  pause = () => {
    if (this.paused === false) {
      this.paused = true;

      this.renderer!.setAnimationLoop(null);

      document.removeEventListener('mousemove', this.onMouseMove);
      window.removeEventListener('resize', this.onResize);
    }
  };

  resume = () => {
    if (this.paused) {
      this.paused = false;

      this.renderer!.setAnimationLoop(this.render);

      document.addEventListener('mousemove', this.onMouseMove);
      window.addEventListener('resize', this.onResize);
      this.onResize();
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

  return <div className='visual' ref={container}></div>;
};

export default React.memo(Visual);
