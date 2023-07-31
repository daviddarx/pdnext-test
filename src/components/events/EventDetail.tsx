import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { AnimatePresence, motion } from 'framer-motion';

import eases from '@/utils/eases';
import { uiActions } from '@/store';
import { uiStateType } from '@/store/ui-slice';

import EventDetailNavigation from '@/components/events/EventDetailNavigation';
import Entry from '@/components/events/Entry';

const transition = {
  duration: 0.35,
  ease: eases.inOutQuart,
};

const panelMotionVariants = {
  initial: (direction: string) => ({
    transform: `translateX(${direction === 'prev' ? '-100%' : '100%'}) translateZ(0)`,
  }),
  animate: {
    transform: 'translateX(0) translateZ(0)',
    transition: transition,
  },
  exit: (direction: string) => ({
    transform: `translateX(${direction === 'prev' ? '100%' : '-100%'}) translateZ(0)`,
    transition: transition,
  }),
};

const EventDetail = () => {
  const dispatch = useDispatch();

  const event = useSelector((state: uiStateType) => state.ui.openedEvent);
  const eventSwitchDirection = useSelector((state: uiStateType) => state.ui.eventSwitchDirection);
  const lastScrollTopRef = useRef(0);

  const scrollHandler = (e: React.UIEvent<HTMLDivElement>) => {
    const target = e.target as HTMLDivElement;

    const currentScrollTop = Math.max(target.scrollTop, 0);

    if (currentScrollTop > lastScrollTopRef.current) {
      dispatch(uiActions.setBurgerVisibility(false));
    } else {
      dispatch(uiActions.setBurgerVisibility(true));
    }

    lastScrollTopRef.current = currentScrollTop;
  };

  useEffect(() => {
    lastScrollTopRef.current = 0;
  }, [event]);

  return (
    <AnimatePresence mode='popLayout'>
      {event && (
        <motion.article
          key={event.id}
          className='event-detail'
          onScroll={scrollHandler}
          initial='initial'
          animate='animate'
          exit='exit'
          variants={panelMotionVariants}
          custom={eventSwitchDirection}
        >
          <header className='event-detail__header'>
            <div className='event-detail__date'>
              <span className='event-detail__date-title'>{event.date.readable}</span>
              <span className='event-detail__date-separator'> – </span>
              <span>{event.date.hour}</span>
            </div>

            <h2 className='event-detail__title'>
              <span
                className='event-detail__title-text'
                dangerouslySetInnerHTML={{
                  __html: event.title,
                }}
              />

              {event.specialstate && (
                <span className='event-detail__special-state'>{event.specialstate}</span>
              )}
            </h2>

            {event.subtitle && <div className='event-detail__subtitle'>{event.subtitle}</div>}
          </header>

          <ReactMarkdown className='text-content event-detail__desc' remarkPlugins={[remarkGfm]}>
            {event.desc}
          </ReactMarkdown>

          <div className='event-detail__infos'>
            <div className='event-detail__info'>
              <h5 className='event-detail__info-title'>Ort:</h5>
              <div>
                <a href={event.eventlocationlink} target='_blank'>
                  {event.eventlocation}
                </a>{' '}
                – {event.eventlocationcomplement && <span>({event.eventlocationcomplement})</span>}
              </div>
            </div>

            {event.timetable?.length !== 0 && (
              <div className='event-detail__info'>
                <h5 className='event-detail__info-title'>Timetable: </h5>
                <ul>
                  {event.timetable?.map((item) => (
                    <li key={item.title + item.time}>
                      <span className='event-detail__timetable-title'>{item.time}</span>{' '}
                      <span>{item.title}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {event.price && (
              <div className='event-detail__info'>
                <h5 className='event-detail__info-title'>Preis</h5>
                <ReactMarkdown remarkPlugins={[remarkGfm]}>{event.price}</ReactMarkdown>
              </div>
            )}
          </div>

          <div className='event-detail__tickets'>
            {event.ticketsLink && event.ticketsLinkTitle && (
              <a className='tag' href={event.ticketsLink} target='_blank'>
                {event.ticketsLinkTitle}
              </a>
            )}

            {!event.ticketsLink && event.ticketsLinkTitle && (
              <span className='tag'>{event.ticketsLinkTitle}</span>
            )}
          </div>

          {event.entries && (
            <div className='event-detail__entries'>
              {event.entriesObjects.map((entry) => (
                <Entry key={entry.uuid} entry={entry} />
              ))}
            </div>
          )}

          <div className='event-detail__nav'>
            <EventDetailNavigation currentEvent={event} />
          </div>
        </motion.article>
      )}
    </AnimatePresence>
  );
};

export default EventDetail;
