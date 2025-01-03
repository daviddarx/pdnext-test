import { ReactNode, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import classNames from 'classnames';

import eases from '@/utils/eases';

const motionVariants = {
  closed: {
    height: 0,
    transition: {
      duration: 0.5,
      ease: eases.outQuart,
    },
  },
  opened: {
    height: 'auto',
    transition: {
      duration: 0.5,
      ease: eases.inOutQuart,
    },
  },
};

type Props = {
  className?: string;
  header?: ReactNode;
  children: ReactNode;
  isOpenedExt?: boolean;
  onToggle?: (_isOpened: boolean) => void;
};

const Accordion: React.FC<Props> = ({
  className,
  header,
  children,
  isOpenedExt = false,
  onToggle,
}) => {
  const [isOpened, setIsOpened] = useState(false);

  useEffect(() => {
    setIsOpened(isOpenedExt);
  }, [isOpenedExt]);

  const toggleOpened = () => {
    setIsOpened((prev) => !prev);

    if (onToggle) onToggle(!isOpened);
  };

  return (
    <section className={classNames('accordion', { 'is-opened': isOpened }, className)}>
      {header && (
        <header className='accordion__header'>
          <button className='accordion__button' onClick={toggleOpened}>
            {header}
          </button>
        </header>
      )}
      <AnimatePresence initial={true}>
        {isOpened && (
          <motion.section
            className='accordion__content'
            key='content'
            initial='closed'
            animate='opened'
            exit='closed'
            variants={motionVariants}
          >
            {children}
          </motion.section>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Accordion;
