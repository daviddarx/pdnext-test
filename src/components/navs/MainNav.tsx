import Link from 'next/link';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { routes, type Route } from '@/routes/routes';
import { uiActions } from '@/store';
import { uiStateType } from '@/store/ui-slice';

import Drawer from '@/components/ui/Drawer';
import ActiveLink from '@/components/ui/ActiveLink';
import SocialNav from '@/components/navs/SocialsNav';

const MainNav = () => {
  const isNavigationOpened = useSelector((state: uiStateType) => state.ui.isNavigationOpened);

  const dispatch = useDispatch();

  const closeNavigation = () => {
    dispatch(uiActions.closeNavigation());
  };

  return (
    <Drawer isOpened={isNavigationOpened} onClose={closeNavigation}>
      <div className='main-nav'>
        <h2 className='hidden'>Navigation</h2>
        <div>
          <ul className='main-nav__nav main-nav__nav--main'>
            {Object.keys(routes.main).map((key) => {
              const route = routes.main[key as keyof typeof routes.main] as Route;
              return (
                <li key={route.slug}>
                  <ActiveLink
                    className='main-nav__link main-nav__link--main text-link'
                    activeClassName='main-nav__link--active'
                    href={'/' + route.slug}
                  >
                    <span className='main-nav__link-text'>{route.title}</span>
                    <span className='main-nav__link-detail'>{route.complement}</span>
                  </ActiveLink>
                </li>
              );
            })}
          </ul>

          <ul className='main-nav__nav main-nav__nav--secondary'>
            {Object.keys(routes.secondary).map((key) => {
              const route = routes.secondary[key as keyof typeof routes.secondary] as Route;
              if (!route.hidden) {
                return (
                  <li key={route.slug}>
                    <ActiveLink
                      className='main-nav__link main-nav__link--secondary text-link'
                      activeClassName='main-nav__link--active'
                      href={`/${route.slug}`}
                    >
                      {route.title}
                    </ActiveLink>
                  </li>
                );
              }
            })}
          </ul>

          <Link href={`/${routes.secondary.support.slug}`} className='main-nav__support tag'>
            Unterstütze uns
          </Link>
        </div>

        <SocialNav className='main-nav__socials' />
      </div>
    </Drawer>
  );
};

export default React.memo(MainNav);
