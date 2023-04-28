import React, { ReactNode } from 'react';
import { motion } from 'framer-motion';

import eases from './../../utils/eases.js';

import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

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

const Layout = ({ children }: Props): JSX.Element => (
  <motion.div
    initial='hidden'
    animate='enter'
    exit='exit'
    variants={variants}
    transition={transition}
    className='min-h-screen flex flex-col p-10'
  >
    <Header />
    <main>{children}</main>
    <Footer />
  </motion.div>
);

export default Layout;
