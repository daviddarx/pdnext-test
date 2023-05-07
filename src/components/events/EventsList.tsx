import { ClusteredEvents } from '@/types/ClusteredEvents';
import { FormatedEvent } from '@/types/FormatedEvent';

import Event from '@/components/events/Event';

interface Props {
  dateClusteredEvents: ClusteredEvents[];
  dateVisible?: boolean;
}

// ATTENTION: NE RENDRE LE CLUSTER QUE SI IL Y A DES EVENTS DEDANS

const EventsList = ({ dateClusteredEvents, dateVisible = false }: Props) => {
  return (
    <div className='events-lists'>
      {dateClusteredEvents.map((date: ClusteredEvents) => (
        <section key={date.dateReadable} className='events-list'>
          <h2 className='events-list__title'>{date.dateReadable}</h2>
          {date.events.map((event: FormatedEvent) => (
            <Event key={event.id + event.title} event={event} dateVisible={dateVisible} />
          ))}
        </section>
      ))}
    </div>
  );
};

export default EventsList;
