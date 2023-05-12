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

  const title = dateVisible ? event.title : `${event.date.hour} - ${event.title}`;
  const date = dateVisible ? event.date.short : undefined;

  const openEvent = () => {
    dispatch(uiActions.openEvent(event));

    window.location.hash = event.id;
  };

  return (
    <article data-id={event.id} className={`event${openedEvent === event ? ' event--active' : ''}`}>
      <h3 className='event__title'>
        {title}
        {date && <span className='event__date'> – {date}</span>}
        {event.specialstate && (
          <span className='event__special-state'> – {event.specialstate}</span>
        )}
      </h3>
      {event.subtitle && <div className='event__subtitle'>{event.subtitle}</div>}
      <div className='event__details'>
        {event.eventlocation} – {event.types.join(', ')}
      </div>
      <button className='event__btn' onClick={openEvent}>
        Mehr Infos
      </button>
    </article>
  );
};

export default Event;
