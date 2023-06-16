import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { motion, useWillChange } from 'framer-motion';

import routes, { Route } from '@/routes/routes';
import drawerChildreMotionVariants from '@/utils/drawer-children-animation';
import { uiActions } from '@/store';
import { uiStateType } from '@/store/ui-slice';

import Drawer from '@/components/ui/Drawer';
import ActiveLink from '@/components/ui/ActiveLink';
import SocialNav from '@/components/navs/SocialsNav';

const MainNav = () => {
  const isNavigationOpened = useSelector((state: uiStateType) => state.ui.isNavigationOpened);

  const willChange = useWillChange();

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
          <motion.ul
            className='main-nav__nav main-nav__nav--main'
            key='nav-main'
            initial='initial'
            animate='animate'
            variants={drawerChildreMotionVariants}
            style={{ willChange }}
            custom={0}
          >
            {Object.keys(routes.main).map((key) => {
              const route = routes.main[key as keyof typeof routes.main] as Route;
              return (
                <li key={route.link}>
                  <ActiveLink
                    className='main-nav__link main-nav__link--main text-link'
                    activeClassName='main-nav__link--active'
                    href={route.link}
                  >
                    <span className='main-nav__link-text'>{route.title}</span>
                    <span className='main-nav__link-detail'>{route.complement}</span>
                  </ActiveLink>
                </li>
              );
            })}
          </motion.ul>

          <motion.ul
            className='main-nav__nav main-nav__nav--secondary'
            key='nav-secondary'
            initial='initial'
            animate='animate'
            variants={drawerChildreMotionVariants}
            custom={1}
          >
            {Object.keys(routes.secondary).map((key) => {
              const route = routes.secondary[key as keyof typeof routes.secondary] as Route;
              return (
                <li key={route.link}>
                  <ActiveLink
                    className='main-nav__link main-nav__link--secondary text-link'
                    activeClassName='main-nav__link--active'
                    href={route.link}
                  >
                    {route.title}
                  </ActiveLink>
                </li>
              );
            })}
          </motion.ul>

          <motion.button
            className='main-nav__support tag'
            onClick={goToSupportUs}
            key='support'
            initial='initial'
            animate='animate'
            variants={drawerChildreMotionVariants}
            custom={2}
          >
            Unterstützen Sie uns
          </motion.button>
        </div>

        <motion.div
          key='socials'
          initial='initial'
          animate='animate'
          variants={drawerChildreMotionVariants}
          custom={3}
        >
          <SocialNav className='main-nav__socials' />
        </motion.div>
      </div>
    </Drawer>
  );
};

export default React.memo(MainNav);
