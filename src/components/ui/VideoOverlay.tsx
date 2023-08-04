import { Fragment, useState, useEffect } from 'react';
import { Portal } from 'react-portal';
import { useSelector, useDispatch } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import classNames from 'classnames';

import eases from '@/utils/eases';
import { uiStateType } from '@/store/ui-slice';
import { uiActions } from '@/store';
import CloseButton from '@/components/ui/CloseButton';
import BackgroundOverlay from '@/components/ui/BackgroundOverlay';
import VideoPlayer from '@/components/ui/VideoPlayer';

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

  const closeOverlay = () => {
    dispatch(uiActions.closeVideo());
  };

  return (
    <Fragment>
      {isMounted && (
        <Portal>
          <div
            className={classNames('video-overlay', {
              'video-overlay--active': videoUrl,
            })}
          >
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
                  <VideoPlayer videoUrl={videoUrl} autoPlay={true} />
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
