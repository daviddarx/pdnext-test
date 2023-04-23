import { Fragment } from 'react';

import Metas from '@/components/layout/Metas';
import EventsFilters from '@/components/events/EventsFilters';
import EventsList from '@/components/events/EventsList';

const FestivalProgram = (props) => {
  const events = Object.values(props.items);

  console.log(props.items);
  return (
    <Fragment>
      <Metas title='FestivalProgram' />
      <section>
        <h1>Festival Program</h1>
        <EventsFilters />
        <EventsList />
        {events.map((event) => (
          <p key={Math.random()}>{event.title}</p>
        ))}
      </section>
    </Fragment>
  );
};

export default FestivalProgram;

import loadJsonFiles from '../utils/load-json-files';

export async function getStaticProps() {
  return loadJsonFiles('_content/events');
}
