import { useEffect } from 'react';
import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import localFont from 'next/font/local';
import { Provider } from 'react-redux';
import { AnimatePresence } from 'framer-motion';

const font = localFont({
  src: './../fonts/Agrandir_Variable.ttf',
});

import store from '@/store/';
import { uiActions } from '@/store/';

import RainbowBackground from '@/components/layout/RainbowBackground';
import NavBurger from '@/components/navs/NavBurger';
import MainNavPanel from '@/components/navs/MainNav';

import '@/styles/globals.css';

const App = ({ Component, pageProps }: AppProps) => {
  const router = useRouter();
  const pageKey = router.asPath;

  useEffect(() => {
    const handleRouteChangeStart = () => {
      store.dispatch(uiActions.closeNavigation());
      store.dispatch(uiActions.closeEvent());
    };
    router.events.on('routeChangeStart', handleRouteChangeStart);

    return () => {
      router.events.off('routeChangeStart', handleRouteChangeStart);
    };
  }, [router.events]);

  // useEffect(() => {
  //   console.log('app mounted');

  //   return () => {
  //     console.log('app unmounted');
  //   };
  // }, []);

  return (
    <Provider store={store}>
      <div className={font.className}>
        <MainNavPanel />
        <NavBurger />
        <AnimatePresence mode='wait' initial={false} onExitComplete={() => window.scrollTo(0, 0)}>
          <Component key={pageKey} {...pageProps} />
        </AnimatePresence>
        <RainbowBackground />
      </div>
    </Provider>
  );
};

export default App;
