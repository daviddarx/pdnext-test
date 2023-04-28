import { useSelector } from 'react-redux';
import MainNavPanel from './MainNavPanel';
import { Fragment } from 'react';

const MainNav = () => {
  const isNavigationOpened = useSelector((state: any) => state.ui.isNavigationOpened);

  return <Fragment>{isNavigationOpened && <MainNavPanel />}</Fragment>;
};

export default MainNav;
