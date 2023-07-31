import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import eases from '@/utils/eases';
import { routes } from '@/routes/routes';
import ActiveLink from '@/components/ui/ActiveLink';
import type { Timeout } from '@/types/Timeout';

const motionVariants = {
  initial: {
    transform: 'translate3d(0, 250%, 0)',
  },
  animate: {
    transform: 'translate3d(0, 0, 0)',
    transition: {
      duration: 0.5,
      ease: eases.outQuart,
    },
  },
  exit: {
    transform: 'translate3d(0, 250%, 0)',
    transition: {
      duration: 0.25,
      ease: eases.inQuart,
    },
  },
};

const CookieBanner = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // For debugging purpose
    // localStorage.removeItem('cookieAccepted');

    let displayTimeout: Timeout;

    if (!localStorage.cookieAccepted || localStorage.cookieAccepted === 'false') {
      localStorage.cookieAccepted = 'false';
      displayTimeout = setTimeout(() => {
        setIsVisible(true);
      }, 1500);
    }

    return () => {
      if (displayTimeout) {
        clearTimeout(displayTimeout);
      }
    };
  }, []);

  const handleAccept = () => {
    localStorage.cookieAccepted = 'true';
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          key='banner'
          className='cookie-banner'
          initial='initial'
          animate='animate'
          exit='exit'
          variants={motionVariants}
        >
          <div className='cookie-banner__content text-content'>
            <span className='cookie-banner__infos'>
              <span>This website uses cookies. </span>
              <ActiveLink className='cookie-banner__link' href={'/' + routes.footer.cookies.slug}>
                {routes.footer.cookies.title}
              </ActiveLink>
            </span>
            <button className='cookie-banner__button tag tag--inverted' onClick={handleAccept}>
              Accept
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CookieBanner;
