import React, { useRef, useEffect } from 'react';
import { render } from 'react-dom';
import * as THREE from 'three';
import Stats from 'three/examples/jsm/libs/stats.module';
// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

type MaterialType = THREE.MeshStandardMaterial;
class ThreeVisual {
  windowW = 0;
  windowH = 0;

  mouseXToCenter = 0;
  mouseXToCenterAbs = 0;
  mouseYToCenter = 0;
  dmFactor = 4;
  dmFactorEase = 0.05;
  rotX = 0;
  rotXFactor = 0.75;
  rotXFactorEase = 0.05;
  rotY = 0;
  rotYFactor = 0.75;
  rotYFactorEase = 0.05;

  camera = null as THREE.PerspectiveCamera | null;
  scene = null as THREE.Scene | null;
  loader = null as THREE.TextureLoader | null;
  plane = null as THREE.Mesh | null;
  light = null as THREE.AmbientLight | null;
  renderer = null as THREE.WebGLRenderer | null;
  stats = null as Stats | null;

  materials: MaterialType[] = [];

  paused: boolean | null = null;

  constructor() {
    this.init();
  }

  init() {
    console.log('init');
    this.camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.01, 10);
    this.camera.position.z = 3;

    this.scene = new THREE.Scene();

    this.loader = new THREE.TextureLoader();

    const texture = this.loader.load('/images/visual/texture_01.jpg');
    texture.colorSpace = THREE.SRGBColorSpace;
    const textureMap = this.loader.load('/images/visual/texture_01_map.jpg');
    const textureAlpha = this.loader.load('/images/visual/texture_01_alpha.jpg');
    const textureMat = new THREE.MeshStandardMaterial({
      map: texture,
      displacementMap: textureMap,
      displacementScale: 0.5,
      alphaMap: textureAlpha,
      transparent: true,
      depthTest: true /* default true, try false to see what happen */,
    });
    this.materials.push(textureMat);

    const planeGeo = new THREE.PlaneGeometry(7, 4, 256, 256);
    this.plane = new THREE.Mesh(planeGeo, this.materials[0]);
    this.scene.add(this.plane);

    this.light = new THREE.AmbientLight(0xffffff, 3);
    this.scene.add(this.light);

    this.stats = new Stats();
    document.body.appendChild(this.stats.dom);

    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setAnimationLoop(this.animate);

    // const controls = new OrbitControls(camera, renderer.domElement);
    // controls.update();

    document.addEventListener('mousemove', this.onMouseMove);
    window.addEventListener('resize', this.onResize);
    this.onResize();
  }

  animate = () => {
    if (this.stats) {
      this.stats.update();
    }

    if (this.plane) {
      const material = this.plane.material as MaterialType;

      material.displacementScale +=
        (this.mouseXToCenterAbs * this.dmFactor - material.displacementScale) * this.dmFactorEase;
      this.plane.rotation.x += (this.rotX - this.plane.rotation.x) * this.rotXFactorEase;
      this.plane.rotation.y += (this.rotY - this.plane.rotation.y) * this.rotYFactorEase;
    }

    if (this.renderer && this.scene && this.camera) {
      this.renderer.render(this.scene, this.camera);
    }
  };

  pause = () => {
    console.log('pause');
    this.paused = true;
    if (this.renderer) {
      this.renderer.setAnimationLoop(null);
    }
  };

  resume = () => {
    console.log('resume');
    this.paused = false;
    if (this.renderer) {
      this.renderer.setAnimationLoop(this.animate);
    }
  };

  onResize = () => {
    this.windowW = window.innerWidth;
    this.windowH = window.innerHeight;

    if (this.renderer && this.camera) {
      this.camera.aspect = this.windowW / this.windowH;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(this.windowW, this.windowH);
    }
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
      if (threeVisual.paused) {
        threeVisual.resume();
      }
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
