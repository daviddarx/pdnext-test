import React, { useRef, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';

import { uiActions } from '../../../store';
import eases from '../../utils/eases';
import { setFocusables, resetFocusables, loopFocusables } from './../../utils/get-focusables';

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

const panelMotionVariants = {
  initial: {
    x: '100%',
  },
  animate: {
    x: 0,
    transition: {
      duration: 0.5,
      ease: eases.outQuart,
    },
  },
  exit: {
    x: '100%',
    transition: {
      duration: 0.25,
      ease: eases.inOutQuart,
    },
  },
};

const bgMotionVariants = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: eases.outQuint,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.25,
      ease: eases.outQuart,
    },
  },
};

const MainNav = () => {
  const isNavigationOpened = useSelector((state: any) => state.ui.isNavigationOpened);

  const dispatch = useDispatch();
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    let currentActiveAtOpen: HTMLElement;

    if (isNavigationOpened) {
      currentActiveAtOpen = document.activeElement as HTMLElement;

      if (navRef.current) {
        setFocusables(navRef.current);
      }
    }

    return () => {
      if (isNavigationOpened) {
        resetFocusables();
        currentActiveAtOpen?.focus?.();
      }
    };
  }, [isNavigationOpened]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    loopFocusables(e);
  };

  const closeNavigation = () => {
    dispatch(uiActions.closeNavigation());
  };

  const goToSupport = () => {
    closeNavigation();
  };

  return (
    <div className='main-nav' onKeyDown={handleKeyDown}>
      <AnimatePresence>
        {isNavigationOpened && (
          <motion.nav
            key='nav'
            ref={navRef}
            className='main-nav__panel'
            initial='initial'
            animate='animate'
            exit='exit'
            variants={panelMotionVariants}
          >
            <h2 className='hidden'>Navigation</h2>
            <ul className='main-nav__nav'>
              {mainNavItems.map((item) => (
                <li key={item.link}>
                  <ActiveLink
                    className='main-nav__link main-nav__link--main'
                    activeClassName='main-nav__link--active'
                    href={item.link}
                  >
                    {item.title}
                    <span className='main-nav__link-detail'>{item.complement}</span>
                  </ActiveLink>
                </li>
              ))}
            </ul>

            <ul className='main-nav__nav'>
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

            <SocialNav />

            <button className='main-nav__support' onClick={goToSupport}>
              Unterstützen Sie uns
            </button>

            <button className='main-nav__close' onClick={closeNavigation}>
              Close
            </button>
          </motion.nav>
        )}

        {isNavigationOpened && (
          <motion.div
            key='background'
            className='main-nav__bg'
            initial='initial'
            animate='animate'
            exit='exit'
            variants={bgMotionVariants}
            onClick={closeNavigation}
          ></motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default React.memo(MainNav);
