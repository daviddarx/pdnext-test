import { ReactNode } from 'react';
import { motion } from 'framer-motion';

import eases from '@/utils/eases';
import { SupportUsSlot } from '@/types/SupportUsSlot';

import Footer from '@/components/layout/Footer';
import SupportUs from '@/components/layout/SupportUs';
import BottomNav from '@/components/navs/BottomNav';

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

type Props = {
  children: ReactNode;
  supportUsData: SupportUsSlot[];
};

const Layout: React.FC<Props> = ({ children, supportUsData }) => {
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
        <SupportUs supportUsData={supportUsData} />
        <BottomNav />
        <Footer />
      </div>
    </motion.div>
  );
};

export default Layout;
