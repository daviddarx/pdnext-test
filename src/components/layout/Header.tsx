import Link from 'next/link';
import PornyLogo from '@/components/logos/PornyLogo';

const staticContent = require('./../../../static-content/static-content.json');

const Header = () => {
  return (
    <header className='header'>
      <Link href={staticContent.defaultRoute}>
        <h2 className='hidden'>Porny Days – Film Kunst Festival Zürich</h2>
        <PornyLogo className='header__logo' />
      </Link>
    </header>
  );
};

export default Header;
