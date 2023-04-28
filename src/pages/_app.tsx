import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { Provider } from 'react-redux';
import { AnimatePresence } from 'framer-motion';
import { Space_Grotesk } from 'next/font/google';

const font = Space_Grotesk({
  weight: ['400', '700'],
  style: ['normal'],
  subsets: ['latin'],
});

import store from '../../store/index';

import MainNavBurger from '@/components/layout/MainNavBurger';
import MainNav from '@/components/layout/MainNav';

import '@/styles/globals.css';

const App = ({ Component, pageProps }: AppProps) => {
  const router = useRouter();
  const pageKey = router.asPath;

  return (
    <Provider store={store}>
      <div className={font.className}>
        <MainNavBurger />
        <MainNav />
        <AnimatePresence mode='wait' initial={false} onExitComplete={() => window.scrollTo(0, 0)}>
          <Component key={pageKey} {...pageProps} />
        </AnimatePresence>
      </div>
    </Provider>
  );
};

export default App;
