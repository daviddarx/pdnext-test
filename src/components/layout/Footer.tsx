import ActiveLink from '@/components/ui/ActiveLink';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className='footer'>
      <nav>
        <h2 className='hidden'>Footer Navigation</h2>
        <ul className='footer__nav'>
          <li>
            <ActiveLink
              className='footer__link'
              activeClassName='footer__link--active'
              href='/impressum'
            >
              Impressum
            </ActiveLink>
          </li>
          <li>
            <ActiveLink
              className='footer__link'
              activeClassName='footer__link--active'
              href='/privacy'
            >
              Datenschutz
            </ActiveLink>
          </li>
          <li>
            <ActiveLink
              className='footer__link'
              activeClassName='footer__link--active'
              href='/cookies'
            >
              Cookie-Richtlinie
            </ActiveLink>
          </li>
        </ul>
      </nav>
      <p>©{currentYear} Porny Days</p>
    </footer>
  );
};

export default Footer;
