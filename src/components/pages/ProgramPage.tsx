import React, { Fragment, useState, useRef } from 'react';
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

  const filterRef = useRef<HTMLDivElement>(null);

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

  const scrollToFilters = () => {
    /**
     * RAF in case an event is opened. In this case, the ProgramPageLayout
     * would give close the EventDetail and give back the focus to the event
     * which would scroll to the event. This behavious is avoided by scroll
     * reinitialization. RAF to wait for this reinit before scrolling to the
     * filters.
     */
    requestAnimationFrame(() => {
      filterRef.current?.scrollIntoView({ behavior: 'smooth' });
    });
  };

  const filterByType = (type: string) => {
    setCurrentType(type);
    setCurrentDate(allDatesFilter);
    closeEvent();
    scrollToFilters();
  };

  const filterByDate = (date: string) => {
    setCurrentDate(date);
    closeEvent();
    scrollToFilters();
  };

  useScrollToEventOnPageLoad(dateClusteredEvents);

  return (
    <ProgramPageLayout
      header={
        <Fragment>
          <h1>
            <span className='program-page__subtitle'>
              11. Porny Days <span className='program-page__subtitle-separation'>·</span> 29. Nov. -
              3. Dez. 2023
            </span>
            <span>Festival Programm</span>
          </h1>

          <div className='program-page__filters' ref={filterRef}>
            <EventsFilters
              typeFilters={typeFilters}
              currentType={currentType}
              onFilterByType={filterByType}
              dateFilters={dateFilters}
              currentDate={currentDate}
              onFilterByDate={filterByDate}
            />
          </div>
        </Fragment>
      }
    >
      <EventsList dateClusteredEvents={filteredEvents} />
    </ProgramPageLayout>
  );
};

export default React.memo(ProgramPage);
