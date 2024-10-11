import { ReactNode, useRef, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import classNames from 'classnames';

import { uiStateType } from '@/store/ui-slice';
import { uiActions } from '@/store';
import { scrollToEvent } from '@/hooks/useScrollToEventOnPageLoad';
import { setFocusables, resetFocusables, loopFocusables } from '@/utils/get-focusables';
import { screens } from '@/utils/screens';

import EventDetail from '@/components/events/EventDetail';
import EventDetailCloseButton from '@/components/events/EventDetailCloseButton';
import EventDetailNavigation from '@/components/events/EventDetailNavigation';

type Props = {
  header: ReactNode;
  children: ReactNode;
  hideEventNav?: boolean;
};

/**
 * Stores the reference to the corresponding event's button
 * outside the component, as the usage of a useState for
 * this in the same useEffect as for the focusable manamegement
 * cause an too much additional code's running.
 */
let eventButtonRef: HTMLElement | null;

const ProgramPageLayout: React.FC<Props> = ({ header, children, hideEventNav = false }) => {
  const dispatch = useDispatch();

  const [isDetailInViewport, setIsDetailInViewport] = useState(true);
  const [isMounted, setIsMounted] = useState(false);

  const pageRef = useRef<HTMLElement>(null);
  const detailRef = useRef<HTMLDivElement>(null);
  const openedEvent = useSelector((state: uiStateType) => state.ui.openedEvent);
  const eventNavUsed = useSelector((state: uiStateType) => state.ui.eventNavUsed);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsDetailInViewport(true);
        } else {
          setIsDetailInViewport(false);
        }
      },
      {
        rootMargin: '-50% 0px -50% 0px',
      },
    );

    observer.observe(detailRef.current!);

    setIsMounted(true);

    return () => {
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    if (openedEvent) {
      /* Desktop recenter the page when at the bottom of the two-cols layout*/
      if (window.innerWidth >= screens.xl) {
        const pageRect = pageRef.current!.getBoundingClientRect();
        const pagePosY = pageRect.top + window.scrollY;
        const maximalScroll = pagePosY + pageRect.height - window.innerHeight;

        if (window.scrollY > maximalScroll) {
          // RAF as the setFocusable() sets focus in the EventDetail and reinit the scroll to avoid jump.
          requestAnimationFrame(() => {
            window.scroll({
              top: maximalScroll,
              behavior: 'smooth',
            });
          });
        }
      }

      /* Scroll management when using prev/next nav in EventDetail */
      if (eventNavUsed) {
        scrollToEvent(openedEvent.id);
      }
    } else {
      setTimeout(() => {
        dispatch(uiActions.setBurgerVisibility(true));
      }, 500);
    }
  }, [openedEvent, eventNavUsed, dispatch]);

  useEffect(() => {
    if (pageRef.current && detailRef.current) {
      if (openedEvent) {
        eventButtonRef = pageRef.current.querySelector(`[data-id="${openedEvent.id}"] > button`);
        setFocusables(detailRef.current);
      } else {
        const scrollY = window.scrollY;
        eventButtonRef?.focus?.();
        window.scrollTo({ top: scrollY });

        resetFocusables();
      }
    }

    return () => {
      resetFocusables();
    };
  }, [openedEvent]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    loopFocusables(e);

    if (e.key === 'Escape' || e.key === 'Esc') {
      dispatch(uiActions.closeEvent());
    }
  };

  return (
    <section className={classNames('program-page', { mounted: isMounted })} ref={pageRef}>
      <div className='program-page__list'>
        <header className='program-page__header'>{header}</header>
        {children}
      </div>
      <div
        className={classNames('program-page__detail', {
          'program-page__detail--opened': openedEvent !== undefined,
        })}
        ref={detailRef}
        onKeyDown={handleKeyDown}
      >
        <EventDetailCloseButton disabled={openedEvent && isDetailInViewport} />
        <EventDetail hideEventNav={hideEventNav} />

        {!hideEventNav && (
          <div className='program-page__mobile-detail-nav'>
            <EventDetailNavigation currentEvent={openedEvent} />
          </div>
        )}
      </div>
    </section>
  );
};

export default ProgramPageLayout;
