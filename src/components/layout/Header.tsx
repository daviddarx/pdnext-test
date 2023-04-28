import Link from 'next/link';

import { useSelector, useDispatch } from 'react-redux';

import { uiActions } from './../../../store/index.js';

import PornyLogo from '@/components/logos/PornyLogo';
import MainNav from '@/components/layout/MainNav';

const staticContent = require('./../../../static-content/static-content.json');

const Header = () => {
  const dispatch = useDispatch();

  const isNavigationOpened = useSelector((state: any) => state.ui.isNavigationOpened);

  const toggleNavigation = () => {
    dispatch(uiActions.toggleNavigation());
  };

  return (
    <header className='header'>
      <Link href={staticContent.defaultRoute}>
        <h2 className='hidden'>Porny Days – Film Kunst Festival Zürich</h2>
        <PornyLogo className='header__logo' />
      </Link>
      <button className='header__burger' onClick={toggleNavigation}>
        Navigation
      </button>
      {isNavigationOpened && <MainNav />}
    </header>
  );
};

export default Header;
