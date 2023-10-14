import React, { useState, useEffect } from 'react';

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
    <div className='visual'>
      {mounted && (
        <video autoPlay muted loop playsInline className='visual__video'>
          <source
            src='https://files.daviddarx.com/pornydays/videos/2023/teaser.webm'
            type='video/webm'
          />
          <source
            src='https://files.daviddarx.com/pornydays/videos/2023/teaser.mp4'
            type='video/mp4'
          />
        </video>
      )}
    </div>
  );
};

export default React.memo(Visual);
