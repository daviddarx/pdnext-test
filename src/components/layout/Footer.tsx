import ActiveLink from '@/components/ui/ActiveLink';
import { routes, Route } from '@/routes/routes';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className='footer'>
      <nav>
        <h2 className='hidden'>Footer Navigation</h2>
        <ul className='footer__nav'>
          {Object.keys(routes.footer).map((key) => {
            const route = routes.footer[key as keyof typeof routes.footer] as Route;
            return (
              <li key={route.slug}>
                <ActiveLink
                  className='footer__link'
                  activeClassName='footer__link--active'
                  href={'/' + route.slug}
                >
                  {route.title}
                </ActiveLink>
              </li>
            );
          })}
        </ul>
      </nav>
      <p>©{currentYear} Porny Days</p>
    </footer>
  );
};

export default Footer;
