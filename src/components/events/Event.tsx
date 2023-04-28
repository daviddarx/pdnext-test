import { FormatedEvent } from '@/types/FormatedEvent';

type Props = {
  event: FormatedEvent;
};

const Event = ({ event }: Props) => {
  return (
    <article className='event'>
      <h3 className='event__title '>{`${event.date.hour} - ${event.title}`}</h3>
      <div className='event__types'>{event.types.join(', ')}</div>
      <div className='event__location'>{event.eventlocation}</div>
      {event.specialstate && <div className='event__special-state'>{event.specialstate}</div>}
    </article>
  );
};

export default Event;
