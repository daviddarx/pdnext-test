import { useSelector, useDispatch } from 'react-redux';
import classNames from 'classnames';

import { uiStateType } from '@/store/ui-slice';
import { uiActions } from '@/store/';

import CloseButton from '@/components/ui/CloseButton';

type Props = {
  disabled: undefined | boolean;
};

const EventDetailCloseButton: React.FC<Props> = ({ disabled }) => {
  const dispatch = useDispatch();

  const openedEvent = useSelector((state: uiStateType) => state.ui.openedEvent);
  const isBurgerVisible = useSelector((state: uiStateType) => state.ui.isBurgerVisible);

  const close = () => {
    dispatch(uiActions.closeEvent());
  };

  return (
    <CloseButton
      className={classNames('program-page__close', {
        'program-page__close--disabled': !openedEvent && !disabled,
        'program-page__close--nav-opened': isBurgerVisible,
      })}
      onClick={close}
    />
  );
};

export default EventDetailCloseButton;
