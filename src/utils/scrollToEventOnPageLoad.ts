import { useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { uiActions } from '@/store';
import { ClusteredEvents } from '@/types/ClusteredEvents';
import { FormatedEvent } from '@/types/FormatedEvent';

export const useScrollToEventOnPageLoad = (filteredEvents: ClusteredEvents[]) => {
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
        dispatch(uiActions.openEvent(event));

        const eventLink = document.querySelector(`[data-id="${hashId}"]`);

        if (eventLink) {
          const container = document.querySelector('.program-page');

          if (container) {
            const containerRect = container.getBoundingClientRect();
            const eventLinkRect = eventLink.getBoundingClientRect();
            let scrollPos = eventLinkRect.top - window.innerHeight * 0.25;

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
  }, [dispatch, filteredEvents]);

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
  }, [scrollToEventOnPageLoad]);
};
