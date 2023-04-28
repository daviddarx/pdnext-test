import { motion } from 'framer-motion';
import { useDispatch } from 'react-redux';

import { uiActions } from '../../../store';
import eases from '../../utils/eases';

const staticContent = require('./../../../static-content/static-content.json');

import ActiveLink from '@/components/ui/ActiveLink';

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

const socialsNavItems = [
  {
    title: 'Facebook',
    link: 'https://www.facebook.com/pornydays',
  },
  {
    title: 'Twitter',
    link: 'https://twitter.com/pornydays',
  },
  {
    title: 'Instagram',
    link: 'https://www.instagram.com/filmkunstfestival',
  },
  {
    title: 'Vimeo',
    link: 'https://vimeo.com/pornydays',
  },
  {
    title: 'Newsletter',
    link: 'https://pornydays.us10.list-manage.com/subscribe/post?u=9c7ed05ab79d08599fd3d90ee&id=7073021cc1',
  },
];

const MainNav = () => {
  const dispatch = useDispatch();

  const closeNavigation = () => {
    dispatch(uiActions.closeNavigation());
  };

  const goToSupport = () => {
    console.log('go to support');

    closeNavigation();
  };

  return (
    <div className='main-nav'>
      <motion.nav
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

        <article className='main-nav__socials'>
          <h3 className='hidden'>Bleiben Sie auf dem Laufenden.</h3>
          <ul>
            {socialsNavItems.map((item) => (
              <li key={item.title}>
                <a href={item.link} target='_blank' className='main-nav__social'>
                  {item.title}
                </a>
              </li>
            ))}
          </ul>
        </article>

        <button onClick={goToSupport}>Unterstützen Sie uns</button>

        <button className='main-nav__close' onClick={closeNavigation}>
          Close
        </button>
      </motion.nav>

      <motion.div
        className='main-nav__bg'
        initial='initial'
        animate='animate'
        exit='exit'
        variants={bgMotionVariants}
        onClick={closeNavigation}
      ></motion.div>
    </div>
  );
};

export default MainNav;
