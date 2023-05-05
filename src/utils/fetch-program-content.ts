import loadJsonFiles from '@/utils/load-json-files';

import { Entry } from '@/types/Entry';
import { Event } from '@/types/Event';
import { FormatedEvent } from '@/types/FormatedEvent';
import { DateClusteredEvents } from '@/types/DateClusteredEvents';
import { EntryType } from '@/types/EntryType';

export interface ProgramContent {
  dateClusteredEvents: DateClusteredEvents[];
  entryTypes: EntryType[];
}

export async function fetchProgramContent(): Promise<ProgramContent> {
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
    dateClusteredEvents: dateClusteredEvents,
    entryTypes: entryTypes,
  };
}
