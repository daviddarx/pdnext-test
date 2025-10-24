import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import classNames from 'classnames';
import { uiStateType } from '@/store/ui-slice';
import { debounce } from 'lodash-es';

const videosNames = [
  'porny_2025-01',
  'porny_2025-02',
  'porny_2025-03',
  'porny_2025-04',
  'porny_2025-05',
];

const videosURL = 'https://files.daviddarx.com/pornydays/videos/2025/';

const Visual = () => {
  const [mounted, setMounted] = useState(false);
  const [faded, setFaded] = useState(false);
  const isDark = useSelector((state: uiStateType) => state.ui.isDark);
  const isContentPage = useSelector((state: uiStateType) => state.ui.isContentPage);
  const [currentVideoId, setCurrentVideoId] = useState<number | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    setCurrentVideoId(Math.floor(Math.random() * videosNames.length));
    setMounted(true);
  }, [setCurrentVideoId, setMounted]);

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

  const randomizeNextVideo = () => {
    if (currentVideoId !== null) {
      const newVideoId = currentVideoId === videosNames.length - 1 ? 0 : currentVideoId + 1;
      setCurrentVideoId(newVideoId);
    }
  };

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.load();
      videoRef.current.play();
    }
  }, [currentVideoId]);

  return (
    <div
      className={classNames('visual', {
        'visual--dark': isDark,
        'visual--fadedout': faded,
        'visual--content-page': isContentPage && !isDark,
      })}
    >
      {currentVideoId !== null && (
        <video
          className='visual__video'
          ref={videoRef}
          autoPlay
          muted
          playsInline
          onEnded={randomizeNextVideo}
        >
          <source src={`${videosURL}${videosNames[currentVideoId]}.webm`} type='video/webm' />
          <source src={`${videosURL}${videosNames[currentVideoId]}.mp4`} type='video/mp4' />
        </video>
      )}
    </div>
  );
};

export default React.memo(Visual);
