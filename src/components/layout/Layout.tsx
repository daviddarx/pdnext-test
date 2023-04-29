import { ReactNode } from 'react';
import { motion } from 'framer-motion';

import eases from './../../utils/eases';

import Footer from '@/components/layout/Footer';
import BottomNav from '@/components/navs/BottomNav';

type Props = {
  children: ReactNode;
};

const motionVariants = {
  initial: {
    opacity: 0,
    x: 0,
    y: 50,
  },
  animate: {
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

const Layout = ({ children }: Props): JSX.Element => {
  return (
    <motion.div
      initial='initial'
      animate='animate'
      exit='exit'
      variants={motionVariants}
      className='min-h-screen flex flex-col p-gutter pt-gutter-4'
    >
      <main>{children}</main>
      <div className='mt-auto'>
        <BottomNav />
        <Footer />
      </div>
    </motion.div>
  );
};

export default Layout;
