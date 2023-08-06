import { useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { uiActions } from '@/store';
import { ClusteredEvents } from '@/types/ClusteredEvents';
import { FormatedEvent } from '@/types/FormatedEvent';

export function scrollToEvent(id: string) {
  const eventLink = document.querySelector(`[data-id="${id}"]`);
  if (eventLink) {
    const container = document.querySelector('.program-page');

    if (container) {
      const containerRect = container.getBoundingClientRect();
      const eventLinkRect = eventLink.getBoundingClientRect();
      let scrollPos = eventLinkRect.top + window.pageYOffset - window.innerHeight * 0.25;

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

const useScrollToEventOnPageLoad = (filteredEvents: ClusteredEvents[]) => {
  const dispatch = useDispatch();

  const scrollToEventOnPageLoad = useCallback(
    (eventId: string) => {
      const subArrayIndex = filteredEvents.findIndex((subArray) =>
        subArray.events.find((event) => event.id === eventId),
      );
      if (subArrayIndex !== -1) {
        const event = filteredEvents[subArrayIndex].events.find(
          (event: FormatedEvent) => event.id === eventId,
        );

        if (event) {
          dispatch(uiActions.openEvent({ event: event, nextPrev: false }));

          scrollToEvent(eventId);
        }
      }
    },
    [dispatch, filteredEvents],
  );

  useEffect(() => {
    const url = new URL(window.location.href);
    const searchParams = new URLSearchParams(url.search);
    const event = searchParams.get('e');

    if (event && event !== '') {
      scrollToEventOnPageLoad(event);
    }
  }, [scrollToEventOnPageLoad]);
};

export default useScrollToEventOnPageLoad;
