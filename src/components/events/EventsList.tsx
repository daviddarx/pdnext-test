import { Fragment } from 'react';
import { useSelector } from 'react-redux';

import Event from '@/components/events/Event';

const EventsList = () => {
  const dateClusteredEvents = useSelector((state: any) => state.events.list);

  return (
    <Fragment>
      {dateClusteredEvents.map((date: any) => (
        <div key={date.title}>
          <h3 className='border-b border-black font-bold'>{date.title}</h3>
          <ul>
            {date.events.map((event: any) => (
              <li key={event.id}>
                <Event title={event.title} hour={event.date.hour} type={event.type} />
              </li>
            ))}
          </ul>
        </div>
      ))}
    </Fragment>
  );
};

export default EventsList;
