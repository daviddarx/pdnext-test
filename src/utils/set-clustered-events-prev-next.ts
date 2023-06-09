import { ClusteredEvents } from '@/types/ClusteredEvents';
import { FormatedEvent } from '@/types/FormatedEvent';

export function setClusteredEventsPrevNext(clusteredEvent: ClusteredEvents[]) {
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
        nextTitle = date.events[eventI + 1].title;
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
}

/**
 * Setted outside of the store because of
 * immutable problem in the store when trying
 * to reset the value.
 */
let registeredClusterEvents: { [key: string]: FormatedEvent };

export function registerClusteredEvents(clusteredEvent: ClusteredEvents[]) {
  registeredClusterEvents = {};

  for (const cluster of clusteredEvent) {
    for (const event of cluster.events) {
      registeredClusterEvents[event.id] = event;
    }
  }
}

export function getEventById(id: string): FormatedEvent | undefined {
  if (id in registeredClusterEvents) {
    return registeredClusterEvents[id];
  } else {
    return undefined;
  }
}
