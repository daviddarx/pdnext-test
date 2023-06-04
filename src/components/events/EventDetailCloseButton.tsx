import { useRouter } from 'next/router';
import { useSelector, useDispatch } from 'react-redux';

import { uiStateType } from '@/store/ui-slice';
import { uiActions } from '@/store/';

import CloseButton from '@/components/ui/CloseButton';

type Props = {
  disabled: undefined | boolean;
};

const EventDetailCloseButton: React.FC<Props> = ({ disabled }) => {
  const dispatch = useDispatch();
  const router = useRouter();

  const openedEvent = useSelector((state: uiStateType) => state.ui.openedEvent);
  const isBurgerVisible = useSelector((state: uiStateType) => state.ui.isBurgerVisible);

  const close = () => {
    dispatch(uiActions.closeEvent());
    router.push(location.pathname, undefined, { shallow: true });
  };

  return (
    <CloseButton
      className={`program-page__close ${
        openedEvent && disabled ? '' : 'program-page__close--disabled'
      } ${isBurgerVisible ? 'program-page__close--nav-opened' : ''}`.trim()}
      onClick={close}
    />
  );
};

export default EventDetailCloseButton;
