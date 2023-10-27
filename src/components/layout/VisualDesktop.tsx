import React, { useState, useEffect } from 'react';
import classNames from 'classnames';

const Visual = () => {
  const [mounted, setMounted] = useState(false);
  const [active, setActive] = useState(false);

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

  const onPlay = () => {
    setActive(true);
  };

  return (
    <React.Fragment>
      {mounted && (
        <div className='visual visual--desktop'>
          <video
            className={classNames('visual__video', { 'visual__video--active': active })}
            autoPlay
            muted
            loop
            playsInline
            onPlay={onPlay}
          >
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
