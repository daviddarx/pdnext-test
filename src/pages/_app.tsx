import { useEffect, useRef } from 'react';
import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { Provider } from 'react-redux';
import { AnimatePresence } from 'framer-motion';

import { routes } from '@/routes/routes';
import { fontText, fontTitle } from '@/utils/get-fonts';
import { Timeout } from '@/types/Timeout';
import store from '@/store/';
import { uiActions } from '@/store/';

import RainbowBackground from '@/components/layout/RainbowBackground';
import NavBurger from '@/components/navs/NavBurger';
import MainNavPanel from '@/components/navs/MainNav';
import VideoOverlay from '@/components/ui/VideoOverlay';

import '@/styles/globals.css';

const App = ({ Component, pageProps }: AppProps) => {
  const router = useRouter();
  const pageKey = router.asPath;
  const backScrollTimeout = useRef<Timeout | null>(null);

  useEffect(() => {
    const handleRouteChangeStart = () => {
      store.dispatch(uiActions.closeNavigation());
      store.dispatch(uiActions.closeEvent());
    };

    const handlePopState = () => {
      if (backScrollTimeout.current) {
        clearTimeout(backScrollTimeout.current);
      }

      backScrollTimeout.current = setTimeout(() => {
        const backScrollPosition = sessionStorage.getItem('back-scroll-position');
        window.scroll({
          top: parseInt(backScrollPosition!),
          behavior: 'smooth',
        });
        sessionStorage.setItem('back-scroll-position', '0');
      }, 500);
    };

    const handleBeforeHistoryChange = () => {
      sessionStorage.setItem('back-scroll-position', String(window.scrollY));
    };

    router.events.on('routeChangeStart', handleRouteChangeStart);
    router.events.on('beforeHistoryChange', handleBeforeHistoryChange);
    window.addEventListener('popstate', handlePopState);

    return () => {
      router.events.off('routeChangeStart', handleRouteChangeStart);
      router.events.off('beforeHistoryChange', handleBeforeHistoryChange);
      window.removeEventListener('popstate', handlePopState);
    };
  }, [router.events]);

  useEffect(() => {
    const pageSlug = pageKey.split('/')[1];
    if (
      pageSlug === routes.secondary.about.slug ||
      pageSlug === routes.secondary.impressions.slug ||
      pageSlug === 'gallery'
    ) {
      store.dispatch(uiActions.setDark(true));
    } else {
      store.dispatch(uiActions.setDark(false));
    }
  }, [pageKey]);

  return (
    <Provider store={store}>
      <div className={`${fontText.className} ${fontTitle.variable}`}>
        <MainNavPanel />
        <NavBurger />
        <AnimatePresence mode='wait' initial={false} onExitComplete={() => window.scrollTo(0, 0)}>
          <Component key={pageKey} {...pageProps} />
        </AnimatePresence>
        <RainbowBackground />
        <VideoOverlay />
      </div>
    </Provider>
  );
};

export default App;
