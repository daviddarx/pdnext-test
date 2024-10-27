import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import classNames from 'classnames';
import { uiStateType } from '@/store/ui-slice';

const videosNames = [
  'porny_2024-01',
  'porny_2024-02',
  'porny_2024-03',
  'porny_2024-04',
  'porny_2024-05',
];

const videosURL = 'https://files.daviddarx.com/pornydays/videos/2024/';

const Visual = () => {
  const isDark = useSelector((state: uiStateType) => state.ui.isDark);
  const isContentPage = useSelector((state: uiStateType) => state.ui.isContentPage);
  const [videoURL, setVideoURL] = useState('');

  useEffect(() => {
    setVideoURL(videosNames[Math.floor(Math.random() * videosNames.length)]);
  }, [setVideoURL]);

  return (
    <div
      className={classNames('visual', {
        'visual--dark': isDark,
        'visual--content-page': isContentPage && !isDark,
      })}
    >
      {videoURL && (
        <video className='visual__video' autoPlay muted loop playsInline>
          <source src={`${videosURL}${videoURL}.webm`} type='video/webm' />
          <source src={`${videosURL}${videoURL}.mp4`} type='video/mp4' />
        </video>
      )}
    </div>
  );
};

export default React.memo(Visual);
