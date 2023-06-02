import loadJsonFiles from '@/utils/load-json-files';
import { setClusteredEventsPrevNext } from '@/utils/set-clustered-events-prev-next';

import { Entry } from '@/types/Entry';
import { Event } from '@/types/Event';
import { FormatedEvent } from '@/types/FormatedEvent';
import { ClusteredEvents } from '@/types/ClusteredEvents';
import formatEvent from '@/utils/format-event';
export interface OnsContent {
  dateClusteredEvents: ClusteredEvents[];
}

export async function fetchOnsContent(): Promise<OnsContent> {
  const eventsDir: Event[] = [];
  const events = await loadJsonFiles(eventsDir, '_content/events-ons');

  const entriesDir: Entry[] = [];
  const entries = await loadJsonFiles(entriesDir, '_content/entries-ons');

  // log image to help clean images folder (empty folder, and add again the listed images)
  // entries.map((entry) => {
  //   console.log(entry.image.split('images/uploads/')[1]);
  // });

  const formatedEvents: FormatedEvent[] = events.map((event) => {
    return formatEvent(event, entries);
  });

  formatedEvents.sort((a, b) => new Date(b.eventdate).getTime() - new Date(a.eventdate).getTime());

  const now = new Date();

  const dateClusteredEvents: ClusteredEvents[] = formatedEvents.reduce(
    (current: ClusteredEvents[], event: FormatedEvent) => {
      const eventDate = new Date(event.eventdate);

      if (eventDate > now) {
        current[0].events.push(event);
      } else {
        current[1].events.push(event);
      }

      return current;
    },
    [
      { dateReadable: 'Zukünftige Veranstaltungen', events: [] },
      { dateReadable: 'Vergangene Veranstaltungen', events: [] },
    ],
  );

  if (dateClusteredEvents[0].events.length > 0) {
    dateClusteredEvents[0].events.sort(
      (a, b) => new Date(a.eventdate).getTime() - new Date(b.eventdate).getTime(),
    );
  } else {
    dateClusteredEvents.shift();
  }

  setClusteredEventsPrevNext(dateClusteredEvents);

  return {
    dateClusteredEvents: dateClusteredEvents,
  };
}
