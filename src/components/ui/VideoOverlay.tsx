import { Fragment, useState, useEffect } from 'react';
import { Portal } from 'react-portal';
import { useSelector, useDispatch } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import Plyr from 'plyr';

import eases from '@/utils/eases';
import { uiStateType } from '@/store/ui-slice';
import { uiActions } from '@/store';
import CloseButton from '@/components/ui/CloseButton';
import BackgroundOverlay from '@/components/ui/BackgroundOverlay';

const motionVariants = {
  initial: {
    opacity: 0,
    transform: 'translateY(calc(var(--gutter)* 2)) translateZ(0)',
  },
  animate: {
    opacity: 1,
    transform: 'translateX(0) translateZ(0)',
    transition: {
      duration: 0.5,
      ease: eases.outQuart,
    },
  },
  exit: {
    opacity: 0,
    transform: 'translateY(var(--gutter)) translateZ(0)',
    transition: {
      duration: 0.25,
      ease: eases.inOutQuart,
    },
  },
};

const VideoOverlay = () => {
  const [isMounted, setIsMounted] = useState(false);
  const dispatch = useDispatch();
  const videoUrl = useSelector((state: uiStateType) => state.ui.openedVideo);

  useEffect(() => {
    /**
     * Needed to render component only on the client, not on the server.
     * If else if makes an hydration missmatch error.
     */
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (videoUrl) {
      const player = new Plyr('#player');
    }
  }, [videoUrl]);

  const closeOverlay = () => {
    dispatch(uiActions.closeVideo());
  };

  let videoType = 'custom';
  let videoId = '';

  if (videoUrl) {
    if (videoUrl.indexOf('youtube') !== -1) {
      videoType = 'youtube';
      videoId = videoUrl.split('youtube.com/watch?v=')[1];
    } else if (videoUrl.indexOf('vimeo') !== -1) {
      videoType = 'vimeo';
      videoId = videoUrl.split('vimeo.com/')[1];
    }
  }

  return (
    <Fragment>
      {isMounted && (
        <Portal>
          <div className='video-overlay'>
            <AnimatePresence>
              {videoUrl && (
                <motion.div
                  key='video'
                  initial='initial'
                  animate='animate'
                  exit='exit'
                  className='video-overlay__video'
                  variants={motionVariants}
                >
                  {videoType === 'custom' && (
                    <video id='player' playsInline controls>
                      <source src={videoUrl} type='video/mp4' />
                    </video>
                  )}
                  {videoType !== 'custom' && (
                    <div
                      id='player'
                      data-plyr-provider={videoType}
                      data-plyr-embed-id={videoId}
                    ></div>
                  )}
                </motion.div>
              )}

              {videoUrl && (
                <motion.div
                  key='close'
                  initial='initial'
                  animate='animate'
                  exit='exit'
                  className='video-overlay__close'
                  variants={motionVariants}
                >
                  <CloseButton onClick={closeOverlay} className='video-overlay__close-button' />
                </motion.div>
              )}

              {videoUrl && (
                <BackgroundOverlay key='videoOverlayBg' dark={true} onClick={closeOverlay} />
              )}
            </AnimatePresence>
          </div>
        </Portal>
      )}
    </Fragment>
  );
};

export default VideoOverlay;
