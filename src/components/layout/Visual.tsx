import React, { useRef, useEffect, useState } from 'react';
import { debounce } from 'lodash-es';
import classNames from 'classnames';

const Visual = () => {
  const [faded, setFaded] = useState(false);

  useEffect(() => {
    function onScroll() {
      if (window.scrollY > 200) {
        setFaded(true);
      } else {
        setFaded(false);
      }
    }

    const onScrollDebounced = debounce(onScroll, 20);

    document.addEventListener('scroll', onScrollDebounced, { passive: true });

    return () => {
      document.removeEventListener('scroll', onScrollDebounced);
    };
  });

  return (
    <div className={classNames('visual', { faded: faded })}>
      <video autoPlay muted loop playsInline className='visual__video'>
        <source src='https://files.daviddarx.com/pornydays/porny_bg_video.mp4' type='video/mp4' />
      </video>
    </div>
  );
};

export default React.memo(Visual);
