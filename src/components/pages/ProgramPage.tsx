import React, { Fragment, useState } from 'react';
import { useDispatch } from 'react-redux';

import { uiActions } from '@/store';
import { ProgramContent } from '@/utils/fetch-program-content';
import {
  setClusteredEventsPrevNext,
  registerClusteredEvents,
} from '@/utils/set-clustered-events-prev-next';
import { ClusteredEvents } from '@/types/ClusteredEvents';
import useScrollToEventOnPageLoad from '@/hooks/useScrollToEventOnPageLoad';

import ProgramPageLayout from '@/components/layout/ProgramPageLayout';
import EventsFilters from '@/components/events/EventsFilters';
import EventsList from '@/components/events/EventsList';

const allTypesFilter = 'Alle';
const allDatesFilter = 'Alle Tage';

type Props = {
  data: ProgramContent;
};

const ProgramPage: React.FC<Props> = ({ data }) => {
  const dispatch = useDispatch();

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

  setClusteredEventsPrevNext(filteredEvents);
  registerClusteredEvents(filteredEvents);

  const closeEvent = () => {
    dispatch(uiActions.closeEvent());
  };

  const filterByType = (type: string) => {
    setCurrentType(type);
    setCurrentDate(allDatesFilter);
    closeEvent();
  };

  const filterByDate = (date: string) => {
    setCurrentDate(date);
    closeEvent();
  };

  useScrollToEventOnPageLoad(dateClusteredEvents);

  return (
    <ProgramPageLayout
      header={
        <Fragment>
          <h1>
            <span className='program-page__subtitle'>10. Porny Days — 23. - 27. Nov. 2022</span>
            <span>Festival Programm</span>
          </h1>

          <EventsFilters
            typeFilters={typeFilters}
            currentType={currentType}
            onFilterByType={filterByType}
            dateFilters={dateFilters}
            currentDate={currentDate}
            onFilterByDate={filterByDate}
          />
        </Fragment>
      }
    >
      <EventsList dateClusteredEvents={filteredEvents} />
    </ProgramPageLayout>
  );
};

export default React.memo(ProgramPage);
