import { motion, AnimatePresence } from 'framer-motion';

import eases from '@/utils/eases';
import { ClusteredEvents } from '@/types/ClusteredEvents';
import { FormatedEvent } from '@/types/FormatedEvent';

import Event from '@/components/events/Event';

const motionVariants = {
  initial: {
    opacity: 0,
    y: 50,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.35,
      ease: eases.outQuint,
    },
  },
  exit: {
    opacity: 0,
    y: 0,
    transition: {
      duration: 0.25,
      ease: eases.outQuart,
    },
  },
};

interface Props {
  dateClusteredEvents: ClusteredEvents[];
  dateVisible?: boolean;
}

const EventsList = ({ dateClusteredEvents, dateVisible = false }: Props) => {
  return (
    <AnimatePresence mode='wait' initial={false}>
      <motion.div
        /**
         * The random key assure that the div will be
         * animated each time dateClusteredEvents is updated
         */
        key={Math.random() * Math.random()}
        className='events-lists'
        initial='initial'
        animate='animate'
        exit='exit'
        variants={motionVariants}
      >
        {dateClusteredEvents.map((date: ClusteredEvents) => (
          <section key={date.dateReadable} className='events-list'>
            <h2 className='events-list__title'>{date.dateReadable}</h2>
            {date.events.map((event: FormatedEvent) => (
              <Event key={event.id + event.title} event={event} dateVisible={dateVisible} />
            ))}
          </section>
        ))}
      </motion.div>
    </AnimatePresence>
  );
};

export default EventsList;
