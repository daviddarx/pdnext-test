import { Fragment, useState, useEffect } from 'react';
import { Portal } from 'react-portal';
import { useSelector, useDispatch } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';

import { uiStateType } from '@/store/ui-slice';
import { uiActions } from '@/store';
import CloseButton from '@/components/ui/CloseButton';
import BackgroundOverlay from '@/components/ui/BackgroundOverlay';

const VideoOverlay = () => {
  const [isMounted, setIsMounted] = useState(false);
  const dispatch = useDispatch();
  const openedVideo = useSelector((state: uiStateType) => state.ui.openedVideo);

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

  console.log(openedVideo);

  return (
    <Fragment>
      {isMounted && (
        <Portal>
          <div className='video-overlay dark'>
            <AnimatePresence>
              {openedVideo && (
                <CloseButton onClick={closeOverlay} className='video-overlay__close' />
              )}

              {openedVideo && <div className='video-overlay__video'></div>}

              {openedVideo && (
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
