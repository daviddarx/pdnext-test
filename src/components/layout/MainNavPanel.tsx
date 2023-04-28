import ActiveLink from '@/components/ui/ActiveLink';

const MainNavPanel = () => {
  return (
    <nav className='main-nav'>
      <h2 className='hidden'>Main Navigation</h2>
      <ul className='main-nav__nav'>
        <li>
          <ActiveLink
            className='main-nav__link'
            activeClassName='main-nav__link--active'
            href='/festival-program'
          >
            Festival Program
          </ActiveLink>
        </li>
        <li>
          <ActiveLink
            className='main-nav__link'
            activeClassName='main-nav__link--active'
            href='/one-night-stands'
          >
            One Night Stands
          </ActiveLink>
        </li>
        <li>
          <ActiveLink
            className='main-nav__link'
            activeClassName='main-nav__link--active'
            href='/festival'
          >
            Das Festival
          </ActiveLink>
        </li>
        <li>
          <ActiveLink
            className='main-nav__link'
            activeClassName='main-nav__link--active'
            href='/news'
          >
            News
          </ActiveLink>
        </li>
        <li>
          <ActiveLink
            className='main-nav__link'
            activeClassName='main-nav__link--active'
            href='/submissions'
          >
            Submissions
          </ActiveLink>
        </li>
        <li>
          <ActiveLink
            className='main-nav__link'
            activeClassName='main-nav__link--active'
            href='/impressions'
          >
            Impressions
          </ActiveLink>
        </li>
        <li>
          <ActiveLink
            className='main-nav__link'
            activeClassName='main-nav__link--active'
            href='/press'
          >
            Press
          </ActiveLink>
        </li>
      </ul>
    </nav>
  );
};

export default MainNavPanel;
