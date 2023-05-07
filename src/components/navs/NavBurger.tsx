import { useDispatch } from 'react-redux';

import { uiActions } from '@/store/';

const NavBurger = () => {
  const dispatch = useDispatch();

  const toggleNavigation = () => {
    dispatch(uiActions.toggleNavigation());
  };

  return (
    <button className='nav-burger' onClick={toggleNavigation}>
      <span className='nav-burger__text'>Navigation</span>
      <span className='nav-burger__icon'></span>
    </button>
  );
};

export default NavBurger;
