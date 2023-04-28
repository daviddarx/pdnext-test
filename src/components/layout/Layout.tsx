import React, { ReactNode } from 'react';
import { motion } from 'framer-motion';

import eases from './../../utils/eases.js';

type Props = {
  children: ReactNode;
};

const variants = {
  hidden: {
    opacity: 0,
    x: 0,
    y: 50,
  },
  enter: {
    opacity: 1,
    x: 0,
    y: 0,
    transition: {
      duration: 0.5,
      ease: eases.outQuint,
    },
  },
  exit: {
    opacity: 0,
    x: 0,
    y: 0,
    transition: {
      duration: 0.25,
      ease: eases.outQuart,
    },
  },
};

const transition = { duration: 5, ease: 'backInOut' };
console.log('remove div here? ');

const Layout = ({ children }: Props): JSX.Element => (
  <div>
    <motion.main
      initial='hidden'
      animate='enter'
      exit='exit'
      variants={variants}
      transition={transition}
    >
      {children}
    </motion.main>
  </div>
);

export default Layout;
