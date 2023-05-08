import { Fragment } from 'react';
import { useSelector, useDispatch } from 'react-redux';

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
    <Fragment>
      {openedEvent && (
        <article className='event-detail'>
          <h1>{openedEvent.title}</h1>
          <button className={'event-detail__close'} onClick={close}>
            Close
          </button>
        </article>
      )}
    </Fragment>
  );
};

export default EventDetail;
