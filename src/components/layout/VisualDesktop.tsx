import React, { useState, useEffect } from 'react';
import { type Sketch } from '@p5-wrapper/react';
import { NextReactP5Wrapper } from '@p5-wrapper/next';

const sketch: Sketch = (p5) => {
  p5.setup = () => p5.createCanvas(500, 500, p5.WEBGL);
  let video = p5.createVideo(
    'https://files.daviddarx.com/pornydays/videos/2023/teaser.mp4',
    vidLoad,
  );
  video.size(500, 500);
  video.loop();
  video.play();
  video.volume(0);
  p5.imageMode('CENTER');

  let mask = p5.createGraphics(500, 500);

  function vidLoad() {
    video.loop();
    video.volume(0);
    video.play();
  }

  function vidMaskShape() {
    mask.push();
    mask.translate(-75, 0);
    mask.beginShape();
    mask.curveVertex(134, 150);
    mask.curveVertex(168, 65);
    mask.curveVertex(391, 17);
    mask.curveVertex(630, 49);
    mask.curveVertex(590, 192);
    mask.curveVertex(439, 153);
    mask.curveVertex(503, 385);
    mask.curveVertex(481, 525);
    mask.curveVertex(298, 587);
    mask.curveVertex(143, 462);
    mask.curveVertex(242, 378);
    mask.curveVertex(354, 453);
    mask.curveVertex(391, 373);
    mask.curveVertex(371, 165);
    mask.curveVertex(134, 150);
    mask.curveVertex(168, 65);
    mask.curveVertex(277, 83);
    mask.endShape();
    mask.pop();
  }

  function vidMaskDisplay() {
    video.mask(mask);
    p5.image(video, 500, 500, 500, 500);
  }

  p5.draw = () => {
    p5.background(255, 0, 0);
    // p5.normalMaterial();
    // p5.push();
    // p5.rotateY(p5.frameCount * 0.01);
    // p5.plane(100);
    // p5.pop();

    vidMaskShape();
    vidMaskDisplay();
  };
};

const Visual = () => {
  const [mounted, setMounted] = useState(false);
  const minScreenWidth = 1280;

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth <= minScreenWidth && mounted) {
        setMounted(false);
      } else if (window.innerWidth > minScreenWidth && !mounted) {
        setMounted(true);
      }
    };
    onResize();

    window.addEventListener('resize', onResize);

    return () => {
      window.removeEventListener('resize', onResize);
    };
  });

  return (
    <React.Fragment>
      {mounted && (
        <div className='visual visual--desktop'>
          <div className='w-full h-1/2 absolute top-0 left-0 z-10'>
            <NextReactP5Wrapper sketch={sketch} />
          </div>
          <video className='visual__video' autoPlay muted loop playsInline>
            <source
              src='https://files.daviddarx.com/pornydays/videos/2023/teaser.webm'
              type='video/webm'
            />
            <source
              src='https://files.daviddarx.com/pornydays/videos/2023/teaser.mp4'
              type='video/mp4'
            />
          </video>
        </div>
      )}
    </React.Fragment>
  );
};

export default React.memo(Visual);
