import React, { useRef, useEffect } from 'react';

const Visual = () => {
  return (
    <div className='visual'>
      <video autoPlay muted loop playsInline className='visual__video'>
        <source src='https://files.daviddarx.com/pornydays/porny_bg_video.mp4' type='video/mp4' />
      </video>
    </div>
  );
};

export default React.memo(Visual);
