import { Fragment, useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { uiActions } from '@/store';
import { ProgramContent } from '@/utils/fetch-program-content';
import { ClusteredEvents } from '@/types/ClusteredEvents';
import { FormatedEvent } from '@/types/FormatedEvent';

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

  const scrollToEventOnPageLoad = () => {
    const hashId = window.location.hash.slice(1);
    const subArrayIndex = filteredEvents.findIndex((subArray) =>
      subArray.events.find((event) => event.id === hashId),
    );
    if (subArrayIndex !== -1) {
      const event = filteredEvents[subArrayIndex].events.find(
        (event: FormatedEvent) => event.id === hashId,
      );

      if (event) {
        dispatch(uiActions.openEvent(event));

        const eventLink = document.querySelector(`[data-id="${hashId}"]`);

        if (eventLink) {
          const container = document.querySelector('.program-page');

          if (container) {
            const containerRect = container.getBoundingClientRect();
            const eventLinkRect = eventLink.getBoundingClientRect();
            let scrollPos = eventLinkRect.top - window.innerHeight * 0.25;
            console.log('winh', window.innerHeight);

            if (scrollPos > containerRect.height - window.innerHeight) {
              scrollPos = containerRect.height - window.innerHeight;
            }

            window.scroll({
              top: scrollPos,
              behavior: 'smooth',
            });
          }
        }
      }
    }
  };

  useEffect(() => {
    /**
     * Hash recogniztion to open event
     * accordingly placed in the return
     * function to avoid second call of
     * useEffect due to
     */
    return () => {
      if (window.location.hash) {
        scrollToEventOnPageLoad();
      }
    };
  }, [dispatch, filteredEvents]);

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

  return (
    <ProgramPageLayout
      header={
        <Fragment>
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
        </Fragment>
      }
    >
      <EventsList dateClusteredEvents={filteredEvents} />
    </ProgramPageLayout>
  );
};

export default ProgramPage;
