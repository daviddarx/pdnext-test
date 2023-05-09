import { useSelector, useDispatch } from 'react-redux';
import { AnimatePresence, motion } from 'framer-motion';

import eases from '@/utils/eases';
import { uiActions } from '@/store/';
import { uiStateType } from '@/store/ui-slice';

const transition = {
  duration: 0.35,
  ease: eases.outSine,
};

const panelMotionVariants = {
  initial: {
    x: '100%',
  },
  animate: {
    x: 0,
    transition: transition,
  },
  exit: {
    x: '-100%',
    transition: transition,
  },
};

const EventDetail = () => {
  const dispatch = useDispatch();
  const openedEvent = useSelector((state: uiStateType) => state.ui.openedEvent);

  const close = () => {
    dispatch(uiActions.closeEvent());
    console.log('close');
  };

  return (
    <AnimatePresence mode='popLayout'>
      {openedEvent && (
        <motion.article
          key={openedEvent.id}
          className='event-detail'
          initial='initial'
          animate='animate'
          exit='exit'
          variants={panelMotionVariants}
        >
          <h1>{openedEvent.title}</h1>
          <button className={'event-detail__close'} onClick={close}>
            Close
          </button>
        </motion.article>
      )}
    </AnimatePresence>
  );
};

export default EventDetail;
