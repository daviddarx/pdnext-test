import { useEffect } from 'react';

const RainbowBackground = () => {
  // useEffect(() => {
  //   console.log('mounted');

  //   return () => {
  //     console.log('unmounted');
  //   };
  // }, []);

  return (
    <canvas id='rainbow-background' className='rainbow-background' width='32' height='32'></canvas>
  );
};

export default RainbowBackground;
