import React, { useCallback, useEffect, useRef, useState } from 'react';
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
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleVideoEnd = useCallback(() => {
    const newIndex = currentVideoIndex === videosNames.length - 1 ? 0 : currentVideoIndex + 1;
    console.log('newIndex', newIndex);
    setCurrentVideoIndex(newIndex);
  }, [currentVideoIndex]);

  // Effect to play the new video when the index changes
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.load(); // Reload the video
      videoRef.current.play(); // Start playing the new video
    }
  }, [currentVideoIndex]);

  return (
    <div
      className={classNames('visual', {
        'visual--dark': isDark,
        'visual--content-page': isContentPage && !isDark,
      })}
    >
      <video
        className='visual__video'
        ref={videoRef}
        autoPlay
        muted
        playsInline
        onEnded={handleVideoEnd}
      >
        <source src={`${videosURL}${videosNames[currentVideoIndex]}.webm`} type='video/webm' />
        <source src={`${videosURL}${videosNames[currentVideoIndex]}.mp4`} type='video/mp4' />
      </video>
    </div>
  );
};

export default React.memo(Visual);
