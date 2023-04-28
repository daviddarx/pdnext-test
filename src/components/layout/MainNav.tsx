import { useSelector } from 'react-redux';
import { Fragment } from 'react';

import MainNavPanel from '@/components/layout/MainNavPanel';

const MainNav = () => {
  const isNavigationOpened = useSelector((state: any) => state.ui.isNavigationOpened);

  return <Fragment>{isNavigationOpened && <MainNavPanel />}</Fragment>;
};

export default MainNav;
