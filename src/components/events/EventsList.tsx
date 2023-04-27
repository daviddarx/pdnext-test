import { Fragment } from 'react';
import { useSelector } from 'react-redux';

import Event from '@/components/events/Event';

interface Props {
  clusteredEvents: Array<any>;
}

const EventsList = ({ clusteredEvents }: Props) => {
  return (
    <Fragment>
      {clusteredEvents.map((date: any) => (
        <section key={date.dateReadable} className='events-list'>
          <h2 className='events-list__title'>{date.dateReadable}</h2>
          {date.events.map((event: any) => (
            <Event
              key={event.id + event.title}
              title={event.title}
              hour={event.date.hour}
              location={event.eventlocation}
              types={event.types}
              specialState={event.specialstate}
            />
          ))}
        </section>
      ))}
    </Fragment>
  );
};

export default EventsList;
