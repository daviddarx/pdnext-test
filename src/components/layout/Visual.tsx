import React, { useState, useEffect } from 'react';
import { debounce } from 'lodash-es';
import classNames from 'classnames';

const Visual = () => {
  const [faded, setFaded] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setFaded(window.scrollY > window.innerHeight * 0.75);
    };
    const onScrollDebounced = debounce(onScroll, 20);
    document.addEventListener('scroll', onScrollDebounced, { passive: true });

    return () => {
      document.removeEventListener('scroll', onScrollDebounced);
    };
  }, []);

  return (
    <div className='visual'>
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
          src='https://files.daviddarx.com/pornydays/videos/2024/teaser.webm'
          type='video/webm'
        />
        <source
          src='https://files.daviddarx.com/pornydays/videos/2024/teaser.mp4'
          type='video/mp4'
        />
      </video>
    </div>
  );
};

export default React.memo(Visual);
