import React from 'react';
import Link from 'next/link';

import MainNavBurger from '@/components/layout/MainNavBurger';
import MainNavPanel from '@/components/layout/MainNav';
import PornyLogo from '@/components/logos/PornyLogo';

const staticContent = require('./../../../static-content/static-content.json');

const Header = () => {
  return (
    <header className='header'>
      <Link href={staticContent.defaultRoute}>
        <h2 className='hidden'>Porny Days – Film Kunst Festival Zürich</h2>
        <PornyLogo className='header__logo' />
      </Link>
      <MainNavPanel />
      <MainNavBurger />
    </header>
  );
};

export default React.memo(Header);
