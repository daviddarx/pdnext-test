import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import classNames from 'classnames';
import { uiStateType } from '@/store/ui-slice';
import { debounce } from 'lodash-es';

const videosNames = [
  'porny_2024-01',
  'porny_2024-02',
  'porny_2024-03',
  'porny_2024-04',
  'porny_2024-05',
];

const videosURL = 'https://files.daviddarx.com/pornydays/videos/2024/';

const Visual = () => {
  const [mounted, setMounted] = useState(false);
  const [faded, setFaded] = useState(false);
  const isDark = useSelector((state: uiStateType) => state.ui.isDark);
  const isContentPage = useSelector((state: uiStateType) => state.ui.isContentPage);
  const [videoURL, setVideoURL] = useState('');

  useEffect(() => {
    setVideoURL(videosNames[Math.floor(Math.random() * videosNames.length)]);
    setMounted(true);
  }, [setVideoURL, setMounted]);

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
    <div
      className={classNames('visual', {
        'visual--dark': isDark,
        'visual--fadedout': faded,
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
