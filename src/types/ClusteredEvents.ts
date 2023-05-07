import { FormatedEvent } from '@/types/FormatedEvent';

export interface ClusteredEvents {
  dateReadable: string;
  dateFilter?: string;
  events: FormatedEvent[];
}
