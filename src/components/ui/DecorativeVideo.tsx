import { useState } from 'react';

type Props = {
  className: string;
  videoSettings: {
    urlPoster: string;
    urlWebM: string;
    urlMp4: string;
  };
};

const DecorativeVideo: React.FC<Props> = ({ className, videoSettings }) => {
  const [isMuted, setIsMuted] = useState(true);

  const toggleVideoMute = () => {
    setIsMuted((state) => !state);
  };

  return (
    <div className={`decorative-video ${className}`}>
      <video
        width='100%'
        muted={isMuted}
        autoPlay
        loop
        poster={videoSettings.urlPoster}
        className='video__element'
      >
        <source src={videoSettings.urlWebM} type='video/webm' />
        <source src={videoSettings.urlMp4} type='video/mp4' />
        Your browser does not support HTML5 video. Download video file
        <a href={videoSettings.urlMp4}>here</a>.
      </video>
      <button className='decorative-video__mute-button' onClick={toggleVideoMute}>
        {isMuted ? 'Unmute' : 'Mute'} Video
      </button>
    </div>
  );
};

export default DecorativeVideo;
