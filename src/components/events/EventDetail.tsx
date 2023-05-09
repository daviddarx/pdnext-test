import { Fragment } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AnimatePresence, motion } from 'framer-motion';

import { uiActions } from '@/store/';
import { uiStateType } from '@/store/ui-slice';

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
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '-100%' }}
          transition={{ duration: 0.4 }}
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
