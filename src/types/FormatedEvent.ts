import { Event } from '@/types/Event';
import { Entry } from '@/types/Entry';
export interface FormatedEvent extends Event {
  id: string;
  date: {
    readable: string;
    filter?: string;
    hour?: string;
  };
  types: string[];
  entriesObjects: Entry[];
}
