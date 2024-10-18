import React from 'react';
import { useSelector } from 'react-redux';
import classNames from 'classnames';
import { uiStateType } from '@/store/ui-slice';

const Visual = () => {
  const isDark = useSelector((state: uiStateType) => state.ui.isDark);
  const isContentPage = useSelector((state: uiStateType) => state.ui.isContentPage);

  return (
    <div
      className={classNames('visual', {
        'visual--dark': isDark,
        'visual--content-page': isContentPage && !isDark,
      })}
    >
      <video className='visual__video' autoPlay muted loop playsInline>
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
