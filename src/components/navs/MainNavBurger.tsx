import { useDispatch } from 'react-redux';

import { uiActions } from '@/store/';

const MainNavBurger = () => {
  const dispatch = useDispatch();

  const toggleNavigation = () => {
    dispatch(uiActions.toggleNavigation());
  };

  return (
    <button className='main-nav-burger' onClick={toggleNavigation}>
      Navigation
    </button>
  );
};

export default MainNavBurger;
