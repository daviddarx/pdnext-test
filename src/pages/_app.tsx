import { useEffect } from 'react';
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

import store from '@/store/';
import { uiActions } from '@/store/';

import NavBurger from '@/components/navs/NavBurger';
import MainNavPanel from '@/components/navs/MainNav';

import '@/styles/globals.css';

const App = ({ Component, pageProps }: AppProps) => {
  const router = useRouter();
  const pageKey = router.asPath;

  useEffect(() => {
    const handleRouteChangeStart = () => {
      store.dispatch(uiActions.closeNavigation());
    };

    router.events.on('routeChangeStart', handleRouteChangeStart);

    return () => {
      router.events.off('routeChangeStart', handleRouteChangeStart);
    };
  }, [router.events]);

  return (
    <Provider store={store}>
      <div className={font.className}>
        <MainNavPanel />
        <NavBurger />
        <AnimatePresence mode='wait' initial={false} onExitComplete={() => window.scrollTo(0, 0)}>
          <Component key={pageKey} {...pageProps} />
        </AnimatePresence>
      </div>
    </Provider>
  );
};

export default App;
