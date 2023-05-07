import { ReactNode, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { motion } from 'framer-motion';

import eases from '@/utils/eases';
import { CommonPageData } from '@/utils/fetch-common-page-content';
import { uiActions } from '@/store/';

import BottomNav from '@/components/navs/BottomNav';
import SupportUs from '@/components/layout/SupportUs';
import Partners from '@/components/layout/Partners';
import Newsletter from '@/components/layout/Newsletter';
import Footer from '@/components/layout/Footer';

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
  commonPageData: CommonPageData;
  children: ReactNode;
};

const Layout: React.FC<Props> = ({ children, commonPageData }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(uiActions.closeSupportUs());
  }, [dispatch]);

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
        <SupportUs data={commonPageData.supportUsData} />
        <BottomNav />
        <Partners data={commonPageData.partnersData} />
        <Newsletter />
        <Footer />
      </div>
    </motion.div>
  );
};

export default Layout;
