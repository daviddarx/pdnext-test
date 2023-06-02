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

  const scrollToEventOnPageLoad = useCallback(() => {
    const hashId = window.location.hash.slice(1);
    const subArrayIndex = filteredEvents.findIndex((subArray) =>
      subArray.events.find((event) => event.id === hashId),
    );
    if (subArrayIndex !== -1) {
      const event = filteredEvents[subArrayIndex].events.find(
        (event: FormatedEvent) => event.id === hashId,
      );

      if (event) {
        dispatch(uiActions.openEvent({ event: event, nextPrev: false }));

        scrollToEvent(hashId);
      }
    }
  }, [dispatch, filteredEvents]);

  useEffect(() => {
    return () => {
      if (window.location.hash) {
        scrollToEventOnPageLoad();
      }
    };
  }, [scrollToEventOnPageLoad]);
};

export default useScrollToEventOnPageLoad;
