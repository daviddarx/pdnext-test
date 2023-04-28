import Link from 'next/link';
import { useSelector } from 'react-redux';
import { AnimatePresence } from 'framer-motion';

import MainNavBurger from '@/components/layout/MainNavBurger';
import MainNavPanel from '@/components/layout/MainNav';
import PornyLogo from '@/components/logos/PornyLogo';

const staticContent = require('./../../../static-content/static-content.json');

const Header = () => {
  const isNavigationOpened = useSelector((state: any) => state.ui.isNavigationOpened);

  return (
    <header className='header'>
      <Link href={staticContent.defaultRoute}>
        <h2 className='hidden'>Porny Days – Film Kunst Festival Zürich</h2>
        <PornyLogo className='header__logo' />
      </Link>
      <AnimatePresence>{isNavigationOpened && <MainNavPanel />}</AnimatePresence>
      <MainNavBurger />
    </header>
  );
};

export default Header;
