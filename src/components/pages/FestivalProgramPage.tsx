import { useState } from 'react';

import { ProgramContent } from '@/utils/fetch-program-content';
import { DateClusteredEvents } from '@/types/DateClusteredEvents';

import EventsFilters from '@/components/events/EventsFilters';
import EventsList from '@/components/events/EventsList';

const allTypesFilter = 'Alle';
const allDatesFilter = 'Alle Tage';

type Props = {
  content: ProgramContent;
};

const FestivalProgramPage: React.FC<Props> = ({ content }) => {
  const dateClusteredEvents = content.dateClusteredEvents;
  const entryTypes = content.entryTypes;

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
    (current: DateClusteredEvents[], date: DateClusteredEvents) => {
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
    <section>
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

export default FestivalProgramPage;
