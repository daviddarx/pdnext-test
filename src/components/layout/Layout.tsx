import { ReactNode, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { motion } from 'framer-motion';
import classNames from 'classnames';

import eases from '@/utils/eases';
import { CommonPageData } from '@/utils/fetch-common-page-content';
import { uiActions } from '@/store/';

import Header from '@/components/layout/Header';
import BottomNav from '@/components/navs/BottomNav';
import SupportUs from '@/components/layout/SupportUs';
import Partners from '@/components/layout/Partners';
import Newsletter from '@/components/layout/Newsletter';
import Footer from '@/components/layout/Footer';

const motionVariants = {
  initial: {
    opacity: 0,
    transform: 'translateY(50px) translateZ(0)',
  },
  animate: {
    opacity: 1,
    transform: 'translateY(0) translateZ(0)',
    transition: {
      delay: 0.1 /* Corresponds to the delay in _app.tsx/handleExitComplete() */,
      duration: 0.5,
      ease: eases.outQuart,
    },
  },
  exit: {
    opacity: 0,
    transform: 'translateY(0) translateZ(0)',
    transition: {
      duration: 0.25,
      ease: eases.outQuart,
    },
  },
};

type Props = {
  commonPageData: CommonPageData;
  isDark?: boolean;
  children: ReactNode;
};

const Layout: React.FC<Props> = ({ children, isDark = false, commonPageData }) => {
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
      className={classNames({
        'dark dark--no-bg': isDark,
      })}
    >
      <Header commonPageData={commonPageData} />
      <main>{children}</main>
      <SupportUs data={commonPageData.supportUsData} />
      <BottomNav />
      <Partners data={commonPageData.partnersData} />
      <Newsletter />
      <Footer />
    </motion.div>
  );
};

export default Layout;
