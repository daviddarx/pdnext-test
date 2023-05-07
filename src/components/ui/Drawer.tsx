import { ReactNode, useRef, useEffect, useState, Fragment } from 'react';
import { Portal } from 'react-portal';
import { motion, AnimatePresence } from 'framer-motion';

import eases from '@/utils/eases';
import { setFocusables, resetFocusables, loopFocusables } from '@/utils/get-focusables';

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

type Props = {
  children: ReactNode;
  isOpened: boolean;
  onClose: () => void;
};

const Drawer: React.FC<Props> = ({ children, isOpened, onClose }) => {
  const panelRef = useRef<HTMLDivElement>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    let currentActiveAtOpen: HTMLElement;

    if (isOpened) {
      currentActiveAtOpen = document.activeElement as HTMLElement;

      if (panelRef.current) {
        setFocusables(panelRef.current);
      }
    }

    return () => {
      if (isOpened) {
        resetFocusables();
        currentActiveAtOpen?.focus?.();
      }
    };
  }, [isOpened]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    loopFocusables(e);

    if (e.key === 'Escape' || e.key === 'Esc') {
      onClose();
    }
  };

  return (
    <Fragment>
      {isMounted && (
        <Portal>
          <div className='drawer' onKeyDown={handleKeyDown}>
            <AnimatePresence>
              {isOpened && (
                <motion.div
                  key='panel'
                  ref={panelRef}
                  className='drawer__panel'
                  initial='initial'
                  animate='animate'
                  exit='exit'
                  variants={panelMotionVariants}
                >
                  {children}
                  <button className='drawer__close' onClick={onClose}>
                    Close
                  </button>
                </motion.div>
              )}

              {isOpened && (
                <motion.div
                  key='background'
                  className='drawer__bg'
                  initial='initial'
                  animate='animate'
                  exit='exit'
                  variants={bgMotionVariants}
                  onClick={onClose}
                ></motion.div>
              )}
            </AnimatePresence>
          </div>
        </Portal>
      )}
    </Fragment>
  );
};

export default Drawer;
