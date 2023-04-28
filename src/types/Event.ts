type timeTableItem = {
  time: string;
  title: string;
};

export type Event = {
  timetable: timeTableItem[];
  ticketsLink: string;
  eventdate: string;
  eventlocationlink: string;
  price: string;
  layout: string;
  eventlocation: string;
  entries: string[];
  desc: string;
  ticketsLinkTitle: string;
  subtitle: string;
  title: string;
  specialstate: string;
};
