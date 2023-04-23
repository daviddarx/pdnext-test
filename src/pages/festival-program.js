import { Fragment } from 'react';

import Metas from '@/components/layout/Metas';
import EventsFilters from '@/components/events/EventsFilters';
import EventsList from '@/components/events/EventsList';

const FestivalProgram = (props) => {
  const events = Object.values(props.items);

  //console.log(props.items);
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

const fs = require('fs');
import path from 'path';

export async function getStaticProps() {
  const jsonsInDir = fs
    .readdirSync('_content/events')
    .filter((file) => path.extname(file) === '.json');

  const pages = [];

  jsonsInDir.forEach((file) => {
    const fileData = fs.readFileSync(path.join('_content/events', file));
    const json = JSON.parse(fileData.toString());
    pages.push(json);
  });

  return {
    props: {
      items: pages,
    },
  };
}
