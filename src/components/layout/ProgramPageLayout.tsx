import { ReactNode, useRef, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import classNames from 'classnames';

import { uiStateType } from '@/store/ui-slice';
import { uiActions } from '@/store';
import { scrollToEvent } from '@/hooks/useScrollToEventOnPageLoad';

import EventDetail from '@/components/events/EventDetail';
import EventDetailCloseButton from '@/components/events/EventDetailCloseButton';
import EventDetailNavigation from '@/components/events/EventDetailNavigation';

type Props = {
  header: ReactNode;
  children: ReactNode;
};

const ProgramPageLayout: React.FC<Props> = ({ header, children }) => {
  const dispatch = useDispatch();

  const [isDetailInViewport, setIsDetailInViewport] = useState(true);

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

    return () => {
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    if (openedEvent) {
      /* Desktop recenter the page when at the bottom */
      if (window.innerWidth >= 1280) {
        const pageRect = pageRef.current!.getBoundingClientRect();

        if (window.scrollY > pageRect.height - window.innerHeight) {
          window.scroll({
            top: pageRect.height - window.innerHeight,
            behavior: 'smooth',
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

  return (
    <section className='program-page' ref={pageRef}>
      <div className='program-page__list'>
        <header className='program-page__header'>{header}</header>
        {children}
      </div>
      <div
        className={classNames('program-page__detail', {
          'program-page__detail--opened': openedEvent !== undefined,
        })}
        ref={detailRef}
      >
        <EventDetailCloseButton disabled={openedEvent && isDetailInViewport} />
        <EventDetail />

        <div className='program-page__mobile-detail-nav'>
          <EventDetailNavigation currentEvent={openedEvent} />
        </div>
      </div>
    </section>
  );
};

export default ProgramPageLayout;
