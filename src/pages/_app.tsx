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

import Header from '@/components/layout/Header';

import '@/styles/globals.css';

const App = ({ Component, pageProps }: AppProps) => {
  // console.log(
  //   'App: here get the pageProps for special announcement, pass it to the header',
  //   pageProps,
  // );
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
        <Header />
        <AnimatePresence mode='wait' initial={false} onExitComplete={() => window.scrollTo(0, 0)}>
          <Component key={pageKey} {...pageProps} />
        </AnimatePresence>
      </div>
    </Provider>
  );
};

export default App;
