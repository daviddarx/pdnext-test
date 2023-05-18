import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { uiActions } from '@/store';
import { uiStateType } from '@/store/ui-slice';

import Drawer from '@/components/ui/Drawer';
import ActiveLink from '@/components/ui/ActiveLink';
import SocialNav from '@/components/navs/SocialsNav';

const mainNavItems = [
  {
    title: 'Festival Programm',
    complement: ' 23. — 27. Nov. 2022',
    link: '/festival-program',
  },
  {
    title: 'One Night Stands',
    complement: 'Saisonales Programm',
    link: '/one-night-stands',
  },
];

const secondaryNavItems = [
  { title: 'Das Festival', link: '/festival' },
  { title: 'News', link: '/news' },
  { title: 'Submissions', link: '/submissions' },
  { title: 'Impressions', link: '/impressions' },
  { title: 'Press', link: '/press' },
];

const MainNav = () => {
  const isNavigationOpened = useSelector((state: uiStateType) => state.ui.isNavigationOpened);

  const dispatch = useDispatch();

  useEffect(() => {
    if (isNavigationOpened) {
      dispatch(uiActions.closeSupportUs());
    }
  }, [isNavigationOpened, dispatch]);

  const closeNavigation = () => {
    dispatch(uiActions.closeNavigation());
  };

  const goToSupportUs = () => {
    dispatch(uiActions.openSupportUs());
    closeNavigation();
  };

  return (
    <Drawer isOpened={isNavigationOpened} onClose={closeNavigation}>
      <div className='main-nav'>
        <h2 className='hidden'>Navigation</h2>
        <div>
          <ul className='main-nav__nav main-nav__nav--main'>
            {mainNavItems.map((item) => (
              <li key={item.link}>
                <ActiveLink
                  className='main-nav__link main-nav__link--main'
                  activeClassName='main-nav__link--active'
                  href={item.link}
                >
                  <span className='main-nav__link-text'>{item.title}</span>
                  <span className='main-nav__link-detail'>{item.complement}</span>
                </ActiveLink>
              </li>
            ))}
          </ul>

          <ul className='main-nav__nav main-nav__nav--secondary'>
            {secondaryNavItems.map((item) => (
              <li key={item.link}>
                <ActiveLink
                  className='main-nav__link main-nav__link--secondary'
                  activeClassName='main-nav__link--active'
                  href={item.link}
                >
                  {item.title}
                </ActiveLink>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <SocialNav className='main-nav__socials' />

          <button className='main-nav__support tag' onClick={goToSupportUs}>
            Unterstützen Sie uns
          </button>
        </div>
      </div>
    </Drawer>
  );
};

export default React.memo(MainNav);
