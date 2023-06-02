import { useSelector, useDispatch } from 'react-redux';

import { uiActions } from '@/store';
import { uiStateType } from '@/store/ui-slice';

import { FormatedEvent } from '@/types/FormatedEvent';

type Props = {
  event: FormatedEvent;
  dateVisible?: boolean;
};

const Event = ({ event, dateVisible = false }: Props) => {
  const dispatch = useDispatch();
  const openedEvent = useSelector((state: uiStateType) => state.ui.openedEvent);

  const openEvent = () => {
    dispatch(uiActions.openEvent({ event: event, nextPrev: false }));
  };

  return (
    <article
      data-id={event.id}
      className={`event${openedEvent?.title === event.title ? ' event--active' : ''}`}
    >
      <div className={`${dateVisible ? '' : 'event__cols'}`}>
        {!dateVisible && <div className='event__hour'>{event.date.hour}</div>}

        <div className='event__infos'>
          <h3 className='event__title'>
            {event.title}{' '}
            {event.specialstate && (
              <span className='tag tag--sm event__special-state'>{event.specialstate}</span>
            )}
          </h3>
          {event.subtitle && <div className='event__subtitle'>{event.subtitle}</div>}
          {dateVisible && (
            <div className='event__date'>
              {event.date.short} – {event.date.hour}
            </div>
          )}
          <div className='event__details'>
            {event.eventlocation} – <i>{event.types.join(', ')}</i>
          </div>
        </div>
      </div>

      <button className='event__btn' onClick={openEvent}>
        Mehr Infos
      </button>
    </article>
  );
};

export default Event;
