import { Fragment } from 'react';
import { useDispatch } from 'react-redux';

import { uiActions } from '@/store';
import { FormatedEvent } from '@/types/FormatedEvent';
import { getEventById } from '@/utils/set-clustered-events-prev-next';
import ArrowIcon from '@/components/icons/ArrowIcon';

type Props = {
  currentEvent: FormatedEvent | undefined;
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
    <Fragment>
      {currentEvent && (
        <div className='event-detail-nav'>
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
        </div>
      )}
    </Fragment>
  );
};

export default EventDetailNavigation;
