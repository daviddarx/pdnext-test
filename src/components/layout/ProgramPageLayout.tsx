import { ReactNode } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { uiStateType } from '@/store/ui-slice';
import { uiActions } from '@/store/';

import CloseButton from '@/components/ui/CloseButton';
import EventDetail from '@/components/events/EventDetail';

type Props = {
  header: ReactNode;
  children: ReactNode;
};

const ProgramPageLayout: React.FC<Props> = ({ header, children }) => {
  const dispatch = useDispatch();
  const openedEvent = useSelector((state: uiStateType) => state.ui.openedEvent);

  const close = () => {
    dispatch(uiActions.closeEvent());
  };

  return (
    <section className='program-page'>
      <div className='program-page__list'>
        <header className='program-page__header'>{header}</header>
        {children}
      </div>
      <div
        className={`program-page__detail${
          openedEvent !== undefined ? ' program-page__detail--opened' : ''
        }`}
      >
        <CloseButton
          className={`program-page__close${openedEvent ? '' : ' program-page__close--disabled'}`}
          onClick={close}
        />
        <EventDetail />
      </div>
    </section>
  );
};

export default ProgramPageLayout;
