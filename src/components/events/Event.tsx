import { FormatedEvent } from '@/types/FormatedEvent';

type Props = {
  event: FormatedEvent;
  dateVisible?: boolean;
};

const Event = ({ event, dateVisible = false }: Props) => {
  const title = dateVisible ? event.title : `${event.date.hour} - ${event.title}`;
  const date = dateVisible ? event.date.short : undefined;
  return (
    <article className='event'>
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
    </article>
  );
};

export default Event;
