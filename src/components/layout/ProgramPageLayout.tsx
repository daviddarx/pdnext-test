import { ReactNode, useRef, useEffect, useState } from 'react';
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
  const [isDetailInViewport, setIsDetailInViewport] = useState(true);
  const detailRef = useRef<HTMLDivElement>(null);
  const openedEvent = useSelector((state: uiStateType) => state.ui.openedEvent);

  const close = () => {
    dispatch(uiActions.closeEvent());
  };

  useEffect(() => {
    console.log('program page mounted');

    const observer = new IntersectionObserver(
      (entries) => {
        // console.log(entries[0].intersectionRatio);
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
      console.log('program page unmounted');
    };
  }, []);

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
        ref={detailRef}
      >
        <CloseButton
          className={`program-page__close${
            openedEvent && isDetailInViewport ? '' : ' program-page__close--disabled'
          }`}
          onClick={close}
        />
        <EventDetail />
      </div>
    </section>
  );
};

export default ProgramPageLayout;
