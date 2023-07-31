import { useState, useEffect } from 'react';
import classNames from 'classnames';
import { useSelector } from 'react-redux';

import { uiStateType } from '@/store/ui-slice';

import SoundOnIcon from '@/components/icons/SoundOnIcon';
import SoundOffIcon from '@/components/icons/SoundOffIcon';

type Props = {
  className: string;
  videoSettings: {
    urlPoster: string;
    urlWebM: string;
    urlMp4: string;
  };
};

const DecorativeVideo: React.FC<Props> = ({ className = '', videoSettings }) => {
  const [isMuted, setIsMuted] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const system = useSelector((state: uiStateType) => state.ui.system);

  useEffect(() => {
    if (system.os === 'android' || system.os === 'ios') {
      setIsMobile(true);
    }
  }, [system]);

  const toggleVideoMute = () => {
    setIsMuted((state) => !state);
  };

  return (
    <div className={classNames('decorative-video', className)}>
      <video
        width='100%'
        muted={isMobile ? false : isMuted}
        autoPlay={!isMobile}
        loop={!isMobile}
        controls={isMobile}
        poster={videoSettings.urlPoster}
        className='video__element'
      >
        <source src={videoSettings.urlWebM} type='video/webm' />
        <source src={videoSettings.urlMp4} type='video/mp4' />
        Your browser does not support HTML5 video. Download video file
        <a href={videoSettings.urlMp4}>here</a>.
      </video>
      {!isMobile && (
        <button className='decorative-video__mute-button' onClick={toggleVideoMute}>
          <span className='opacity-0'>{isMuted ? 'Unmute' : 'Mute'} Video</span>
          <span className='decorative-video__mute-icon'>
            {isMuted && <SoundOnIcon />}
            {!isMuted && <SoundOffIcon />}
          </span>
        </button>
      )}
    </div>
  );
};

export default DecorativeVideo;
