import { FormatedEvent } from '@/types/FormatedEvent';

export type DateClusteredEvents = {
  dateReadable: string;
  dateFilter?: string;
  events: FormatedEvent[];
};
