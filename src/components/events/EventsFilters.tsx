import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import classNames from 'classnames';

import eases from '@/utils/eases';

const motionVariants = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
    transition: {
      duration: 0.35,
      ease: eases.outQuint,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.25,
      ease: eases.outQuart,
    },
  },
};

type Props = {
  typeFilters: string[];
  currentType: string;
  onFilterByType: (type: string) => void;
  dateFilters: string[];
  currentDate: string;
  onFilterByDate: (date: string) => void;
};

const EventsFilters: React.FC<Props> = (props) => {
  /**
   * Unique key for each filters condifuration, to ensure
   * they will be animated only when they change
   */
  const dateFilterAnimationKey = JSON.stringify(props.dateFilters);

  return (
    <div className='events-filters'>
      <div>
        {props.typeFilters.map((filter) => (
          <button
            key={filter}
            className={classNames('events-filters__filter tag', {
              'tag--active': props.currentType === filter,
            })}
            onClick={props.onFilterByType.bind(null, filter)}
          >
            {filter}
          </button>
        ))}
      </div>
      {props.dateFilters.length > 0 && (
        <AnimatePresence mode='wait' initial={false}>
          <motion.div
            key={dateFilterAnimationKey}
            className='events-lists'
            initial='initial'
            animate='animate'
            exit='exit'
            variants={motionVariants}
          >
            <div>
              {props.dateFilters.map((filter) => (
                <button
                  key={filter}
                  className={classNames('events-filters__filter tag', {
                    'tag--active': props.currentDate === filter,
                  })}
                  onClick={props.onFilterByDate.bind(null, filter)}
                >
                  {filter}
                </button>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      )}
    </div>
  );
};

export default EventsFilters;
