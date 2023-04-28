import { Event } from '@/types/Event';
import { Entry } from '@/types/Entry';

type EventDate = {
  readable: string;
  filter?: string;
  hour?: string;
};

export type FormatedEvent = Event & {
  id: string;
  date: EventDate;
  types: string[];
  entriesObjects: Entry[];
};
