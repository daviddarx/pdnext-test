import { useState } from 'react';

import { SupportUsSlot } from '@/types/SupportUsSlot';
import { DateClusteredEvents } from '@/types/DateClusteredEvents';
import { Entry } from '@/types/Entry';
import { EntryType } from '@/types/EntryType';
import { Event } from '@/types/Event';
import { FormatedEvent } from '@/types/FormatedEvent';

import loadJsonFiles from '@/utils/load-json-files';

import Layout from '@/components/layout/Layout';
import Metas from '@/components/layout/Metas';
import EventsFilters from '@/components/events/EventsFilters';
import EventsList from '@/components/events/EventsList';

const allTypesFilter = 'Alle';
const allDatesFilter = 'Alle Tage';

type Props = {
  supportUsData: SupportUsSlot[];
  dateClusteredEvents: DateClusteredEvents[];
  entryTypes: EntryType[];
};

const FestivalProgram = ({ supportUsData, dateClusteredEvents, entryTypes }: Props) => {
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
        if (date.dateFilter) current.push(date.dateFilter);
      }
      return current;
    },
    [allDatesFilter],
  );

  const filteredEvents = dateClusteredEvents.reduce(
    (current: DateClusteredEvents[], date: DateClusteredEvents) => {
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
    },
    [],
  );

  const filterByType = (type: string) => {
    setCurrentType(type);
    setCurrentDate(allDatesFilter);
  };

  const filterByDate = (date: string) => {
    setCurrentDate(date);
  };

  return (
    <Layout supportUsData={supportUsData}>
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
        <EventsList dateClusteredEvents={filteredEvents} />
      </section>
    </Layout>
  );
};

export default FestivalProgram;

export async function getStaticProps() {
  const supportUsSlotsDir: SupportUsSlot[] = [];
  const supportUsSlots = await loadJsonFiles(supportUsSlotsDir, '_content/supportUsSlots');

  const entryTypesDir: EntryType[] = [];
  const entryTypes = await loadJsonFiles(entryTypesDir, '_content/entryTypes');
  entryTypes.sort((a, b) => a.order - b.order);

  const eventsDir: Event[] = [];
  const events = await loadJsonFiles(eventsDir, '_content/events');

  const entriesDir: Entry[] = [];
  const entries = await loadJsonFiles(entriesDir, '_content/entries');

  const formatedEvents: FormatedEvent[] = events.map((event) => {
    const eventDate = new Date(event.eventdate);

    const eventEntries: Entry[] = event.entries
      ? event.entries.map((entryId) => {
          const entry = entries.find((entry) => entry.uuid === entryId);
          return entry as Entry;
        })
      : [];

    const eventTypes = eventEntries.reduce((current: string[], entry) => {
      if (entry && !current.includes(entry.entryType)) {
        current.push(entry.entryType);
      }
      return current;
    }, []);

    const dateReadable = eventDate.toLocaleDateString('de-DE', {
      weekday: 'long',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });

    const dateFilter = eventDate
      .toLocaleDateString('de-DE', {
        weekday: 'short',
        day: 'numeric',
        month: 'numeric',
      })
      .replace('.,', '')
      .slice(0, -1);

    const dateHour = eventDate.toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' });

    const id = `${dateFilter} ${event.title}`
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^\w\s./]/gi, '')
      .toLowerCase()
      .replace(/ /g, '-')
      .replace(/\//g, '-')
      .replace(/\./g, '-');

    const formatedEvent: FormatedEvent = {
      ...event,
      id: id,
      date: {
        readable: dateReadable,
        filter: dateFilter,
        hour: dateHour,
      },
      types: eventTypes,
      entriesObjects: eventEntries,
    };

    return formatedEvent;
  });

  formatedEvents.sort((a, b) => new Date(a.eventdate).getTime() - new Date(b.eventdate).getTime());

  const dateClusteredEvents: DateClusteredEvents[] = formatedEvents.reduce(
    (current: DateClusteredEvents[], event: FormatedEvent) => {
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
    },
    [],
  );

  return {
    props: {
      supportUsData: supportUsSlots,
      dateClusteredEvents: dateClusteredEvents,
      entryTypes: entryTypes,
    },
  };
}
