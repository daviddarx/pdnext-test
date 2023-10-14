import React, { useState, useEffect } from 'react';

const Visual = () => {
  const [mounted, setMounted] = useState(false);
  const maxScreenWidth = 1280;

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth < maxScreenWidth) {
        setMounted(true);
      } else {
        setMounted(false);
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
        <div className='visual visual--mobile'>
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
