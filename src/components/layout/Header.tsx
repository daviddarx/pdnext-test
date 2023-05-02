import React from 'react';
import Link from 'next/link';

import MainNavBurger from '@/components/navs/MainNavBurger';
import MainNavPanel from '@/components/navs/MainNav';
import PornyLogo from '@/components/logos/PornyLogo';

const Header = () => {
  return (
    <header className='header'>
      <Link href='/festival-program'>
        <h2 className='hidden'>Porny Days – Film Kunst Festival Zürich</h2>
        <PornyLogo className='header__logo' />
      </Link>
      <MainNavPanel />
      <MainNavBurger />
    </header>
  );
};

export default React.memo(Header);
