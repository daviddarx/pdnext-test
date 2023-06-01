import { ClusteredEvents } from '@/types/ClusteredEvents';
import { FormatedEvent } from '@/types/FormatedEvent';

const setClusteredEventsPrevNext = (clusteredEvent: ClusteredEvents[]) => {
  clusteredEvent.forEach((date, dateI: number) => {
    date.events = date.events.map((event: FormatedEvent, eventI: number) => {
      /**
       * null needed for server side rendering as
       * undefined isn't allowed on the server.
       */
      let prevId = null;
      let prevTitle = null;
      let prevCluster = clusteredEvent[dateI - 1];

      let nextId = null;
      let nextTitle = null;
      let nextCluster = clusteredEvent[dateI + 1];

      if (date.events[eventI - 1]) {
        prevId = date.events[eventI - 1].id;
        prevTitle = date.events[eventI - 1].title;
      } else if (prevCluster && prevCluster.events) {
        prevId = prevCluster.events[prevCluster.events.length - 1].id;
        prevTitle = prevCluster.events[prevCluster.events.length - 1].title;
      }

      if (date.events[eventI + 1]) {
        nextId = date.events[eventI + 1].id;
        prevTitle = date.events[eventI + 1].title;
      } else if (nextCluster && nextCluster.events) {
        nextId = nextCluster.events[0].id;
        nextTitle = nextCluster.events[0].title;
      }

      return {
        ...event,
        prevId,
        prevTitle,
        nextId,
        nextTitle,
      };
    });
  });
};

export default setClusteredEventsPrevNext;
