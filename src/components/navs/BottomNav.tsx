import ActiveLink from '@/components/ui/ActiveLink';
import SocialsNav from '@/components/navs/SocialsNav';

type BottomNavLink = {
  title: string;
  link: string;
};

type BottomNavItems = {
  header: BottomNavLink;
  links: BottomNavLink[];
};

const bottomNavItems: BottomNavItems[] = [
  {
    header: {
      title: 'Das Festival',
      link: '/festival',
    },
    links: [
      {
        title: 'Über uns',
        link: '/festival#uber-uns',
      },
      {
        title: 'Manifesto',
        link: '/festival#manifesto',
      },
      {
        title: 'Team',
        link: '/festival#team',
      },
      {
        title: 'Kontakt',
        link: '/festival#kontakt',
      },
    ],
  },
  {
    header: {
      title: 'Presse',
      link: '/press',
    },
    links: [
      {
        title: 'Presse-Kontakt',
        link: '/press#presse-kontakt',
      },
      {
        title: 'Medienmitteilungen',
        link: '/press#medienmitteilungen',
      },

      {
        title: 'Pressespiegel',
        link: '/press#pressespiegel',
      },
    ],
  },
];

type BottomNavGroupProps = {
  items: BottomNavItems;
  withSocials: boolean;
};

const BottomNavGroup = ({ items, withSocials }: BottomNavGroupProps) => {
  return (
    <section className='bottom-nav__group'>
      <h3 className='bottom-nav__title'>
        <ActiveLink
          className='bottom-nav__link'
          activeClassName='bottom-nav__link--active'
          href={items.header.link}
        >
          {items.header.title}
        </ActiveLink>
      </h3>
      <ul className='botton-nav__links'>
        {items.links.map((link) => (
          <li key={link.link}>
            <ActiveLink
              className='bottom-nav__link'
              activeClassName='bottom-nav__link--active'
              href={link.link}
            >
              {link.title}
            </ActiveLink>
          </li>
        ))}
      </ul>

      {withSocials && <SocialsNav className='bottom-nav__socials' />}
    </section>
  );
};

const BottomNav = () => {
  return (
    <nav className='bottom-nav'>
      <h2 className='hidden'>Weiter zu...</h2>

      <BottomNavGroup items={bottomNavItems[0]} withSocials={true} />
      <BottomNavGroup items={bottomNavItems[1]} withSocials={false} />
    </nav>
  );
};

export default BottomNav;
