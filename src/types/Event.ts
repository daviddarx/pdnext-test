export interface Event {
  timetable: {
    time: string;
    title: string;
  }[];
  ticketsLink: string;
  eventdate: string;
  eventlocation: string;
  eventlocationcomplement: string;
  eventlocationlink: string;
  price: string;
  layout: string;
  entries: string[];
  desc: string;
  ticketsLinkTitle: string;
  subtitle: string;
  title: string;
  specialstate: string;
}
