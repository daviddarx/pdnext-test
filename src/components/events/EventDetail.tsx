import { useSelector } from 'react-redux';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { AnimatePresence, motion } from 'framer-motion';

import eases from '@/utils/eases';
import { uiStateType } from '@/store/ui-slice';

import Entry from '@/components/events/Entry';

const transition = {
  duration: 0.35,
  ease: eases.outSine,
};

const panelMotionVariants = {
  initial: {
    x: '-100%',
  },
  animate: {
    x: 0,
    transition: transition,
  },
  exit: {
    x: '100%',
    transition: transition,
  },
};

const EventDetail = () => {
  const event = useSelector((state: uiStateType) => state.ui.openedEvent);

  return (
    <AnimatePresence mode='popLayout'>
      {event && (
        <motion.article
          key={event.id}
          className='event-detail'
          initial='initial'
          animate='animate'
          exit='exit'
          variants={panelMotionVariants}
        >
          <header>
            <div className='block mb-gutter'>
              {event.date.hour} – {event.date.readable}
            </div>

            <h2 className='mb-2'>
              {event.title}{' '}
              {event.specialstate && (
                <span className=' tag tag--inverted'>{event.specialstate}</span>
              )}
            </h2>

            {event.subtitle && <div>{event.subtitle}</div>}
          </header>

          <ReactMarkdown className='mt-gutter' remarkPlugins={[remarkGfm]}>
            {event.desc}
          </ReactMarkdown>

          <div className='mt-gutter'>
            <strong>Ort:</strong>{' '}
            <a href={event.eventlocationlink} target='_blank'>
              {event.eventlocation}
            </a>{' '}
            – {event.eventlocationcomplement && <span>({event.eventlocationcomplement})</span>}
          </div>

          {event.timetable?.length !== 0 && (
            <div className='mt-gutter-1/2'>
              <div className='mt-gutter-1/2'></div>
              <h5>Timetable: </h5>
              <ul>
                {event.timetable?.map((item) => (
                  <li key={item.title + item.time}>
                    <span>{item.time}</span> <span>{item.title}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {event.price && (
            <div className='mt-gutter'>
              <h5>Preis</h5>
              <ReactMarkdown remarkPlugins={[remarkGfm]}>{event.price}</ReactMarkdown>
            </div>
          )}

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
            <div className=' event-detail__entries mt-gutter space-y-gutter'>
              {event.entriesObjects.map((entry) => (
                <Entry key={entry.uuid} entry={entry} />
              ))}
            </div>
          )}
        </motion.article>
      )}
    </AnimatePresence>
  );
};

export default EventDetail;
