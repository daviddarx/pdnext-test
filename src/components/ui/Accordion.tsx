import { ReactNode, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import eases from '../../utils/eases';

const motionVariants = {
  closed: {
    opacity: 0,
    height: 0,
    transition: {
      duration: 0.5,
      ease: eases.outQuart,
    },
  },
  opened: {
    opacity: 1,
    height: 'auto',
    transition: {
      duration: 0.75,
      ease: eases.inOutQuart,
    },
  },
};

type Props = {
  className?: string;
  title: ReactNode;
  children: ReactNode;
};

const Accordion: React.FC<Props> = ({ className, title, children }) => {
  const [isOpened, setIsOpened] = useState(true);

  useEffect(() => {
    setIsOpened(false);
  }, []);

  const toggleOpened = () => {
    setIsOpened((prev) => !prev);
  };

  return (
    <section className={`accordion ${className ? className : ''} ${isOpened ? 'is-opened' : ''}`}>
      <header className='accordion__header'>
        {title}
        <button className='accordion__button' onClick={toggleOpened}>
          {isOpened ? 'Schliessen' : 'Öffnen'}
        </button>
      </header>
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
