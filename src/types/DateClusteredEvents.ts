import { FormatedEvent } from '@/types/FormatedEvent';

export interface DateClusteredEvents {
  dateReadable: string;
  dateFilter?: string;
  events: FormatedEvent[];
}
