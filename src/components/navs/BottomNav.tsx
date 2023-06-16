import routes, { Route, RoutesCollection } from '@/routes/routes';
import ActiveLink from '@/components/ui/ActiveLink';
import SocialsNav from '@/components/navs/SocialsNav';

type BottomNavGroupProps = {
  header: Route;
  items: RoutesCollection;
  withSocials: boolean;
};

const BottomNavGroup = ({ header, items, withSocials }: BottomNavGroupProps) => {
  return (
    <section className='bottom-nav__group'>
      <ActiveLink
        className='bottom-nav__link'
        activeClassName='bottom-nav__link--active'
        href={header.link}
      >
        <h3 className='bottom-nav__title'>{header.title} </h3>
      </ActiveLink>

      <ul className='botton-nav__links'>
        {Object.keys(items).map((key) => {
          const route = items[key as keyof typeof items] as Route;
          return (
            <li key={route.link}>
              <ActiveLink
                className='bottom-nav__link'
                activeClassName='bottom-nav__link--active'
                href={route.link}
              >
                {route.title}
              </ActiveLink>
            </li>
          );
        })}
      </ul>

      {withSocials && <SocialsNav className='bottom-nav__socials' />}
    </section>
  );
};

const BottomNav = () => {
  return (
    <nav className='bottom-nav'>
      <h2 className='hidden'>Weiter zu...</h2>

      <BottomNavGroup
        header={routes.secondary.about}
        items={routes.bottomNav.about}
        withSocials={true}
      />
      <BottomNavGroup
        header={routes.secondary.press}
        items={routes.bottomNav.press}
        withSocials={false}
      />
    </nav>
  );
};

export default BottomNav;
