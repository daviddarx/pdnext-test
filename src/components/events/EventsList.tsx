import { Fragment } from 'react';

import { DateClusteredEvents } from '@/types/DateClusteredEvents';
import { FormatedEvent } from '@/types/FormatedEvent';

import Event from '@/components/events/Event';

interface Props {
  dateClusteredEvents: DateClusteredEvents[];
}

const EventsList = ({ dateClusteredEvents }: Props) => {
  console.log(dateClusteredEvents[0].events[0].id);
  return (
    <Fragment>
      {dateClusteredEvents.map((date: DateClusteredEvents) => (
        <section key={date.dateReadable} className='events-list'>
          <h2 className='events-list__title'>{date.dateReadable}</h2>
          {date.events.map((event: FormatedEvent) => (
            <Event key={event.id + event.title} event={event} />
          ))}
        </section>
      ))}
    </Fragment>
  );
};

export default EventsList;
