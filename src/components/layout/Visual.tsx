import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import Stats from 'three/examples/jsm/libs/stats.module';
// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const Visual = () => {
  const container = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const containerRef = container.current;

    let windowW = 0;
    let windowH = 0;

    const animation = {
      mouseXToCenter: 0,
      mouseXToCenterAbs: 0,
      mouseYToCenter: 0,
      dmFactor: 4,
      dmFactorEase: 0.05,
      rotX: 0,
      rotXFactor: 0.75,
      rotXFactorEase: 0.05,
      rotY: 0,
      rotYFactor: 0.75,
      rotYFactorEase: 0.05,
    };

    const camera = new THREE.PerspectiveCamera(
      70,
      window.innerWidth / window.innerHeight,
      0.01,
      10,
    );
    camera.position.z = 3;

    let scene = new THREE.Scene();

    const loader = new THREE.TextureLoader();

    const materials = [];

    const texture = loader.load('/images/visual/texture_01.jpg');
    texture.colorSpace = THREE.SRGBColorSpace;
    const textureMap = loader.load('/images/visual/texture_01_map.jpg');
    const textureAlpha = loader.load('/images/visual/texture_01_alpha.jpg');
    const textureMat = new THREE.MeshStandardMaterial({
      map: texture,
      displacementMap: textureMap,
      displacementScale: 0.5,
      alphaMap: textureAlpha,
      transparent: true,
      depthTest: true /* check if needed */,
    });
    materials.push(textureMat);

    const planeGeo = new THREE.PlaneGeometry(7, 4, 256, 256);
    const plane = new THREE.Mesh(planeGeo, textureMat);
    scene.add(plane);

    const light = new THREE.AmbientLight(0xffffff, 3);
    scene.add(light);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setAnimationLoop(animate);
    // renderer.shadowMap.enabled = true; /* What's this?  */
    container.current?.appendChild(renderer.domElement);

    const stats = new Stats();
    document.body.appendChild(stats.dom);

    // const controls = new OrbitControls(camera, renderer.domElement);
    // controls.update();

    function animate() {
      stats.update();

      plane.material.displacementScale +=
        (animation.mouseXToCenterAbs * animation.dmFactor - plane.material.displacementScale) *
        animation.dmFactorEase;
      plane.rotation.x += (animation.rotX - plane.rotation.x) * animation.rotXFactorEase;
      plane.rotation.y += (animation.rotY - plane.rotation.y) * animation.rotYFactorEase;

      renderer.render(scene, camera);
    }

    function onResize() {
      windowW = window.innerWidth;
      windowH = window.innerHeight;

      camera.aspect = windowW / windowH;
      camera.updateProjectionMatrix();
      renderer.setSize(windowW, windowH);
    }

    function onMouseMove(e: MouseEvent) {
      animation.mouseXToCenter = e.clientX / windowW - 0.5;
      animation.mouseXToCenterAbs = Math.abs(animation.mouseXToCenter);
      animation.mouseYToCenter = e.clientY / windowH - 0.5;
      animation.rotX = animation.mouseYToCenter * animation.rotXFactor;
      animation.rotY = animation.mouseXToCenter * animation.rotYFactor;
    }

    window.addEventListener('resize', onResize);
    onResize();

    document.addEventListener('mousemove', onMouseMove);

    return () => {
      /* TODO: KILL */
      renderer.dispose();
      containerRef?.removeChild(renderer.domElement);

      window.removeEventListener('resize', onResize);
      document.removeEventListener('mousemove', onMouseMove);
    };
  });

  return <div className='visual' ref={container}></div>;
};

export default React.memo(Visual);
