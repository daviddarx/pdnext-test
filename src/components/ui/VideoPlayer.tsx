import { useEffect, useState } from 'react';
import Plyr from 'plyr';
import classNames from 'classnames';
import { v4 as uuidv4 } from 'uuid';

type Props = {
  videoUrl: string;
  autoPlay?: boolean;
  className?: string;
};

const VideoPlayer: React.FC<Props> = ({ videoUrl, autoPlay = false, className }) => {
  const [playerId, setPlayerId] = useState('');

  let videoType = '';
  let videoId = '';

  if (videoUrl.indexOf('youtube') !== -1) {
    videoType = 'youtube';
    videoId = videoUrl.split('youtube.com/watch?v=')[1];
  } else if (videoUrl.indexOf('vimeo') !== -1) {
    videoType = 'vimeo';
    videoId = videoUrl.split('vimeo.com/')[1];
  } else {
    videoType = 'custom';
  }

  /**
   * First set the uuid to avoid hydration missmatch
   * with the server.
   */
  useEffect(() => {
    if (playerId === '') {
      setPlayerId(`video-player-${uuidv4()}`);
    }
  }, [playerId]);

  /**
   * When the uuid is hydrated, init the player.
   */
  useEffect(() => {
    let plyr: Plyr;

    if (playerId !== '') {
      plyr = new Plyr(`#${playerId}`, {
        controls: [
          'play-large',
          'play',
          'progress',
          'current-time',
          'mute',
          'volume',
          'fullscreen',
        ],
        autoplay: autoPlay,
        fullscreen: { enabled: true, fallback: true, iosNative: true },
      });
    }
    return () => {
      if (plyr) {
        plyr.destroy();
      }
    };
  }, [playerId, autoPlay]);

  return (
    <div className={classNames('video-player', className)}>
      {videoType === 'custom' && (
        <video id={playerId} playsInline controls>
          <source src={videoUrl} type='video/mp4' />
        </video>
      )}

      {videoType !== 'custom' && (
        <div id={playerId} data-plyr-provider={videoType} data-plyr-embed-id={videoId}></div>
      )}
    </div>
  );
};

export default VideoPlayer;
