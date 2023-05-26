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
  prevId?: string;
  prevTitle?: string;
  nextId?: string;
  nextTitle?: string;
  types: string[];
  entriesObjects: Entry[];
}
