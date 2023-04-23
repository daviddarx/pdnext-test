import Link from 'next/link';

import PornyLogo from '@/components/logos/PornyLogo';
import MainNav from '@/components/layout/MainNav';

const staticContent = require('./../../../static-content/static-content.json');

const Header = () => {
  return (
    <header className='header'>
      <Link href={staticContent.defaultRoute}>
        <h2 className='hidden'>Porny Days – Film Kunst Festival Zürich</h2>
        <PornyLogo className='header__logo' />
      </Link>
      <MainNav />
    </header>
  );
};

export default Header;
