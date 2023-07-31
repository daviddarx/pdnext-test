import { ReactNode, useRef, useEffect, useState, Fragment } from 'react';
import { Portal } from 'react-portal';
import { motion, AnimatePresence, useWillChange } from 'framer-motion';
import classNames from 'classnames';

import { fontText, fontTitle } from '@/utils/get-fonts';
import eases from '@/utils/eases';
import { setFocusables, resetFocusables, loopFocusables } from '@/utils/get-focusables';

import BackgroundOverlay from '@/components/ui/BackgroundOverlay';
import CloseButton from '@/components/ui/CloseButton';

const motionVariants = {
  initial: {
    transform: 'translateX(100%) translateZ(0)',
  },
  animate: {
    transform: 'translateX(0) translateZ(0)',
    transition: {
      duration: 0.5,
      ease: eases.outQuart,
    },
  },
  exit: {
    transform: 'translateX(100%) translateZ(0)',
    transition: {
      duration: 0.25,
      ease: eases.inOutQuart,
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
    /**
     * Needed to render component only on the client, not on the server.
     * If else if makes an hydration missmatch error.
     */
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

  const willChange = useWillChange();

  return (
    <Fragment>
      {isMounted && (
        <Portal>
          <div
            className={classNames('drawer', fontText.className, fontTitle.variable)}
            onKeyDown={handleKeyDown}
          >
            <AnimatePresence>
              {isOpened && (
                <motion.div
                  key='panel'
                  ref={panelRef}
                  className='drawer__panel dark'
                  initial='initial'
                  animate='animate'
                  exit='exit'
                  variants={motionVariants}
                  style={{ willChange }}
                >
                  <div className='drawer__content'>{children}</div>
                  <CloseButton className='drawer__close' onClick={onClose} />
                </motion.div>
              )}

              {isOpened && <BackgroundOverlay key='drawerBg' dark={false} onClick={onClose} />}
            </AnimatePresence>
          </div>
        </Portal>
      )}
    </Fragment>
  );
};

export default Drawer;
