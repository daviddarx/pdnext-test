import { useEffect, useCallback, useRef } from 'react';
import { useSelector } from 'react-redux';
import classNames from 'classnames';

import { uiStateType } from '@/store/ui-slice';

// CREDITS: https://codepen.io/tmrDevelops/pen/vOPZBv

const data = {
  windowW: 0,
  windowH: 0,
  raf: null as number | null,
  canvas: undefined,
  canvasContext: null as CanvasRenderingContext2D | null,
  time: 0,
  velocity: 0.05,
};

const getRed = (x: number, y: number, t: number) => {
  return Math.floor(192 + 64 * Math.cos((x * x - y * y) / 300 + t));
};
const getGreen = (x: number, y: number, t: number) => {
  return Math.floor(192 + 64 * Math.sin((x * x * Math.cos(t / 4) + y * y * Math.sin(t / 3)) / 300));
};
const getBlue = (x: number, y: number, t: number) => {
  return Math.floor(
    192 +
      64 * Math.sin(5 * Math.sin(t / 9) + ((x - 100) * (x - 100) + (y - 100) * (y - 100)) / 1100),
  );
};

const paintCol = (x: number, y: number, r: number, g: number, b: number) => {
  data.canvasContext!.fillStyle = 'rgb(' + r + ',' + g + ',' + b + ')';
  data.canvasContext!.fillRect(x, y, 1, 1);
};

const paintBackground = () => {
  for (let x = 0; x <= 35; x++) {
    for (let y = 0; y <= 35; y++) {
      paintCol(x, y, getRed(x, y, data.time), getGreen(x, y, data.time), getBlue(x, y, data.time));
    }
  }
  data.time = data.time + data.velocity;
  data.raf = window.requestAnimationFrame(paintBackground);
};

const RainbowBackground = () => {
  const isDark = useSelector((state: uiStateType) => state.ui.isDark);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const init = useCallback(() => {
    data.canvasContext = canvasRef.current!.getContext('2d');
    data.time = 0;

    paintBackground();
  }, []);

  const destroy = useCallback(() => {
    window.cancelAnimationFrame(data.raf!);
  }, []);

  useEffect(() => {
    init();

    return () => {
      destroy();
    };
  }, [init, destroy]);

  return (
    <div
      className={classNames('rainbow-background', {
        'rainbow-background--dark': isDark,
      })}
    >
      <canvas
        ref={canvasRef}
        id='rainbow-background'
        className='rainbow-background__canvas'
        width='32'
        height='32'
      />
      <div className='rainbow-background__dark-overlay'></div>
    </div>
  );
};

export default RainbowBackground;
