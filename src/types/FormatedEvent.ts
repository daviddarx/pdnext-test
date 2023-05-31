import { Event } from '@/types/Event';
import { Entry } from '@/types/Entry';

export interface FormatedEvent extends Event {
  id: string;
  date: {
    readable: string;
    short: string;
    filter: string;
    hour: string;
  };
  /**
   * null needed for server side rendering as setClusteredEventsPrevNext()
   * set to undefined, which isn't allowed on the server.
   */
  prevId?: string | null;
  prevTitle?: string | null;
  nextId?: string | null;
  nextTitle?: string | null;
  types: string[];
  entriesObjects: Entry[];
}
