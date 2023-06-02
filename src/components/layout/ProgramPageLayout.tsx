import { ReactNode, useRef, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { uiStateType } from '@/store/ui-slice';
import { uiActions } from '@/store';

import EventDetail from '@/components/events/EventDetail';
import EventDetailCloseButton from '@/components/events/EventDetailCloseButton';

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
      if (window.innerWidth >= 1280) {
        const pageRect = pageRef.current!.getBoundingClientRect();

        if (window.scrollY > pageRect.height - window.innerHeight) {
          console.log('scrolllll');
          window.scroll({
            top: pageRect.height - window.innerHeight,
            behavior: 'smooth',
          });
        }
      }
    } else {
      setTimeout(() => {
        dispatch(uiActions.setBurgerVisibility(true));
      }, 500);
    }
  }, [openedEvent, dispatch]);

  return (
    <section className='program-page' ref={pageRef}>
      <div className='program-page__list'>
        <header className='program-page__header'>{header}</header>
        {children}
      </div>
      <div
        className={`program-page__detail${
          openedEvent !== undefined ? ' program-page__detail--opened' : ''
        }`}
        ref={detailRef}
      >
        <EventDetailCloseButton disabled={openedEvent && isDetailInViewport} />
        <EventDetail />
      </div>
    </section>
  );
};

export default ProgramPageLayout;
