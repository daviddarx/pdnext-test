import React, { useState, useEffect } from 'react';
import { debounce } from 'lodash-es';
import classNames from 'classnames';

const Visual = () => {
  const [mounted, setMounted] = useState(false);
  const [faded, setFaded] = useState(false);

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

  useEffect(() => {
    const onScroll = () => {
      setFaded(window.scrollY > window.innerHeight * 0.75);
    };
    const onScrollDebounced = debounce(onScroll, 20);
    if (mounted) {
      document.addEventListener('scroll', onScrollDebounced, { passive: true });
    }

    return () => {
      document.removeEventListener('scroll', onScrollDebounced);
    };
  }, [mounted]);

  return (
    <React.Fragment>
      {mounted && (
        <div className='visual visual--mobile'>
          <video
            className={classNames('visual__video', {
              'visual__video--fadedout': faded,
            })}
            autoPlay
            muted
            loop
            playsInline
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
