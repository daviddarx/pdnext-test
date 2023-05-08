import { ReactNode } from 'react';
import { useSelector } from 'react-redux';

import { uiStateType } from '@/store/ui-slice';

import EventDetail from '@/components/events/EventDetail';

type Props = {
  header: ReactNode;
  children: ReactNode;
};

const ProgramPageLayout: React.FC<Props> = ({ header, children }) => {
  const openedEvent = useSelector((state: uiStateType) => state.ui.openedEvent);

  return (
    <section className='program-page'>
      <div
        className={`program-page__detail${
          openedEvent !== undefined ? ' program-page__detail--opened' : ''
        }`}
      >
        <EventDetail />
      </div>
      <div className='program-page__list'>
        <header className='program-page__header'>{header}</header>
        {children}
      </div>
    </section>
  );
};

export default ProgramPageLayout;
