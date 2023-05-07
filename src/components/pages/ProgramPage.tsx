import { useState } from 'react';

import { ProgramContent } from '@/utils/fetch-program-content';
import { ClusteredEvents } from '@/types/ClusteredEvents';

import EventsFilters from '@/components/events/EventsFilters';
import EventsList from '@/components/events/EventsList';

const allTypesFilter = 'Alle';
const allDatesFilter = 'Alle Tage';

type Props = {
  data: ProgramContent;
};

const ProgramPage: React.FC<Props> = ({ data }) => {
  const dateClusteredEvents = data.dateClusteredEvents;
  const entryTypes = data.entryTypes;

  const [currentType, setCurrentType] = useState(allTypesFilter);
  const [currentDate, setCurrentDate] = useState(allDatesFilter);

  const typeFilters = entryTypes.reduce(
    (current, type) => {
      current.push(type.titlePlurial);
      return current;
    },
    [allTypesFilter],
  );

  const currentTypeTitle = entryTypes.find(
    (type) => type.titlePlurial === currentType,
  )?.title; /* returns undefined for allTypesFilter, which isn't an object */

  const dateFilters = dateClusteredEvents.reduce(
    (current, date) => {
      if (
        currentTypeTitle === undefined ||
        date.events.some((event) => event.types.includes(currentTypeTitle))
      ) {
        if (date.dateFilter) current.push(date.dateFilter);
      }
      return current;
    },
    [allDatesFilter],
  );

  const filteredEvents = dateClusteredEvents.reduce(
    (current: ClusteredEvents[], date: ClusteredEvents) => {
      if (currentDate === allDatesFilter || date.dateFilter === currentDate) {
        const processedDate = { ...date };

        if (currentTypeTitle) {
          processedDate.events = date.events.filter((event) =>
            event.types.includes(currentTypeTitle),
          );
        }

        if (processedDate.events.length > 0) {
          current.push(processedDate);
        }
      }
      return current;
    },
    [],
  );

  const filterByType = (type: string) => {
    setCurrentType(type);
    setCurrentDate(allDatesFilter);
  };

  const filterByDate = (date: string) => {
    setCurrentDate(date);
  };

  return (
    <section className='content-page'>
      <h1>
        <span>
          10. Porny Days
          <br />
          23. — 27. Nov. 2022
        </span>
        <span className='block'>Festival Programm</span>
      </h1>
      <EventsFilters
        typeFilters={typeFilters}
        currentType={currentType}
        onFilterByType={filterByType}
        dateFilters={dateFilters}
        currentDate={currentDate}
        onFilterByDate={filterByDate}
      />
      <EventsList dateClusteredEvents={filteredEvents} />
    </section>
  );
};

export default ProgramPage;
