import loadJsonFiles from '@/utils/load-json-files';
import formatEvent from '@/utils/format-event';
import setClusteredEventsPrevNext from '@/utils/set-clustered-events-prev-next';

import { Entry } from '@/types/Entry';
import { Event } from '@/types/Event';
import { FormatedEvent } from '@/types/FormatedEvent';
import { ClusteredEvents } from '@/types/ClusteredEvents';
import { EntryType } from '@/types/EntryType';

export interface ProgramContent {
  dateClusteredEvents: ClusteredEvents[];
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

  // log image to help clean images folder (empty folder, and add again the listed images)
  // entries.map((entry) => {
  //   console.log(entry.image.split('images/uploads/')[1]);
  // });

  const formatedEvents: FormatedEvent[] = events.map((event) => {
    return formatEvent(event, entries);
  });

  formatedEvents.sort((a, b) => new Date(a.eventdate).getTime() - new Date(b.eventdate).getTime());

  const dateClusteredEvents: ClusteredEvents[] = formatedEvents.reduce(
    (current: ClusteredEvents[], event: FormatedEvent) => {
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

  setClusteredEventsPrevNext(dateClusteredEvents);

  return {
    dateClusteredEvents: dateClusteredEvents,
    entryTypes: entryTypes,
  };
}
