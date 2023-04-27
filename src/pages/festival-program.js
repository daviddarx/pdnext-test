import { useState } from 'react';

import Layout from '@/components/layout/Layout';
import Metas from '@/components/layout/Metas';
import EventsFilters from '@/components/events/EventsFilters';
import EventsList from '@/components/events/EventsList';

const allTypesFilter = 'Alle';
const allDatesFilter = 'Alle Tage';

const FestivalProgram = ({ dateClusteredEvents, entryTypes }) => {
  const [currentType, setCurrentType] = useState(allTypesFilter);
  const [currentDate, setCurrentDate] = useState(allDatesFilter);

  const typeFilters = entryTypes.reduce(
    (current, type) => {
      current.push(type.titlePlurial);
      return current;
    },
    [allTypesFilter],
  );

  const currentTypeTitle = entryTypes.find(
    (type) => type.titlePlurial === currentType,
  )?.title; /* returns undefined for allTypesFilter, which isn't an object */

  const dateFilters = dateClusteredEvents.reduce(
    (current, date) => {
      if (
        currentTypeTitle === undefined ||
        date.events.some((event) => event.types.includes(currentTypeTitle))
      ) {
        current.push(date.dateFilter);
      }
      return current;
    },
    [allDatesFilter],
  );

  const filteredEvents = dateClusteredEvents.reduce((current, date) => {
    if (currentDate === allDatesFilter || date.dateFilter === currentDate) {
      const processedDate = { ...date };

      if (currentTypeTitle) {
        processedDate.events = date.events.filter((event) =>
          event.types.includes(currentTypeTitle),
        );
      }

      if (processedDate.events.length > 0) {
        current.push(processedDate);
      }
    }

    return current;
  }, []);

  const filterByType = (type) => {
    setCurrentType(type);
    setCurrentDate(allDatesFilter);
  };

  const filterByDate = (date) => {
    setCurrentDate(date);
  };

  return (
    <Layout>
      <Metas title='FestivalProgram' />
      <section>
        <h1>
          <span>
            10. Porny Days
            <br />
            23. — 27. Nov. 2022
          </span>
          <span className='block'>Festival Programm</span>
        </h1>
        <EventsFilters
          typeFilters={typeFilters}
          currentType={currentType}
          onFilterByType={filterByType}
          dateFilters={dateFilters}
          currentDate={currentDate}
          onFilterByDate={filterByDate}
        />
        <EventsList clusteredEvents={filteredEvents} />
      </section>
    </Layout>
  );
};

export default FestivalProgram;

import loadJsonFiles from '../utils/load-json-files.js';

export async function getStaticProps() {
  const events = await loadJsonFiles('_content/events');
  const entries = await loadJsonFiles('_content/entries');
  const entryTypes = await loadJsonFiles('_content/entryTypes');

  entryTypes.sort((a, b) => a.order - b.order);

  const processedEvents = events.map((event) => {
    const eventDate = new Date(event.eventdate);

    const eventEntries = event.entries
      ? event.entries.map((entryId) => entries.find((entry) => entry.uuid === entryId))
      : [];

    const eventTypes = eventEntries.reduce((current, entry) => {
      if (!current.includes(entry.entryType)) {
        current.push(entry.entryType);
      }
      return current;
    }, []);

    return {
      ...event,
      date: {
        readable: eventDate.toLocaleDateString('de-DE', {
          weekday: 'long',
          year: 'numeric',
          month: 'short',
          day: 'numeric',
        }),
        filter: eventDate
          .toLocaleDateString('de-DE', {
            weekday: 'short',
            day: 'numeric',
            month: 'numeric',
          })
          .replace('.,', '')
          .slice(0, -1),
        hour: eventDate.toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' }),
      },
      types: eventTypes,
      entriesObject: eventEntries,
    };
  });

  processedEvents.sort((a, b) => new Date(a.eventdate).getTime() - new Date(b.eventdate).getTime());

  const dateClusteredEvents = processedEvents.reduce((current, event) => {
    const index = current.findIndex((item) => item.events[0].date.filter === event.date.filter);
    if (index === -1) {
      current.push({
        dateReadable: event.date.readable,
        dateFilter: event.date.filter,
        events: [{ ...event }],
      });
    } else {
      current[index].events.push({ ...event });
    }
    return current;
  }, []);

  return {
    props: {
      dateClusteredEvents: dateClusteredEvents,
      entryTypes: entryTypes,
    },
  };
}
