import { useDispatch } from 'react-redux';
import { AnimatePresence, motion } from 'framer-motion';

import { uiActions } from '@/store';
import eases from '@/utils/eases';
import { FormatedEvent } from '@/types/FormatedEvent';
import { getEventById } from '@/utils/set-clustered-events-prev-next';
import ArrowIcon from '@/components/icons/ArrowIcon';

type Props = {
  currentEvent: FormatedEvent | undefined;
};

const motionVariants = {
  initial: {
    transform: 'translate3d(0, 100%, 0)',
  },
  animate: {
    transform: 'translate3d(0, 0, 0)',
    transition: {
      duration: 0.5,
      ease: eases.outQuart,
    },
  },
  exit: {
    transform: 'translate3d(0, 100%, 0)',
    transition: {
      duration: 0.25,
      ease: eases.inQuart,
    },
  },
};

const EventDetailNavigation = ({ currentEvent }: Props) => {
  const dispatch = useDispatch();

  const switchEvent = (id: string) => {
    const event = getEventById(id);

    dispatch(uiActions.setEventSwitchDirection(event));

    /**
     * Delay to allow the EventDetail to be
     * first updated with direction and then
     * trigger the animation on event change.
     * */
    requestAnimationFrame(() => {
      dispatch(uiActions.openEvent({ event: event, nextPrev: true }));
    });
  };

  return (
    <AnimatePresence>
      {currentEvent && (
        <motion.div
          key='nav'
          className='event-detail-nav'
          initial='initial'
          animate='animate'
          exit='exit'
          variants={motionVariants}
        >
          {currentEvent.prevId && (
            <button
              onClick={switchEvent.bind(null, currentEvent.prevId)}
              className='event-detail-nav__button event-detail-nav__button--prev'
            >
              <span className='event-detail-nav__subline'>
                <ArrowIcon className='event-detail-nav__icon' />
                <span>Davor</span>
              </span>
              <span className='event-detail-nav__title'>{currentEvent.prevTitle}</span>
            </button>
          )}
          {currentEvent.nextId && (
            <button
              onClick={switchEvent.bind(null, currentEvent.nextId)}
              className='event-detail-nav__button event-detail-nav__button--next'
            >
              <span className='event-detail-nav__subline'>
                <span className='xl:order-2'>Danach</span>
                <ArrowIcon className='event-detail-nav__icon' />
              </span>
              <span className='event-detail-nav__title'>{currentEvent.nextTitle}</span>
            </button>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default EventDetailNavigation;
