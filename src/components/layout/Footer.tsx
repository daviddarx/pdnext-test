import ActiveLink from '@/components/ui/ActiveLink';

const footerNavItems = [
  {
    title: 'Impressum',
    link: '/impressum',
  },
  {
    title: 'Datenschutz',
    link: '/privacy',
  },
  {
    title: 'Cookie-Richtlinie',
    link: '/cookies',
  },
];

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className='footer'>
      <nav>
        <h2 className='hidden'>Footer Navigation</h2>
        <ul className='footer__nav'>
          {footerNavItems.map((item) => (
            <li key={item.link}>
              <ActiveLink
                className='footer__link'
                activeClassName='footer__link--active'
                href={item.link}
              >
                {item.title}
              </ActiveLink>
            </li>
          ))}
        </ul>
      </nav>
      <p>©{currentYear} Porny Days</p>
    </footer>
  );
};

export default Footer;
