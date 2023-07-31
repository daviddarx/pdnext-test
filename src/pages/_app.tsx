import { useEffect, useRef } from 'react';
import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { Provider } from 'react-redux';
import { AnimatePresence } from 'framer-motion';
import { detect } from 'detect-browser';
import classNames from 'classnames';

import { routes } from '@/routes/routes';
import { fontText, fontTitle } from '@/utils/get-fonts';
import { Timeout } from '@/types/Timeout';
import store from '@/store/';
import { uiActions } from '@/store/';

import RainbowBackground from '@/components/layout/RainbowBackground';
import CookieBanner from '@/components/layout/CookieBanner';
import NavBurger from '@/components/navs/NavBurger';
import MainNavPanel from '@/components/navs/MainNav';
import VideoOverlay from '@/components/ui/VideoOverlay';

import '@/styles/globals.css';

const App = ({ Component, pageProps }: AppProps) => {
  const router = useRouter();
  const scrollPositions = useRef<number[]>([]);
  const pageKey = router.asPath;
  const backScrollTimeout = useRef<Timeout | null>(null);

  useEffect(() => {
    const handleRouteChangeStart = () => {
      store.dispatch(uiActions.closeNavigation());
      store.dispatch(uiActions.closeEvent());
    };

    const handlePopState = () => {
      /**
       * Stop process for program pages, which interfer and trigger
       * a popstate event because of the hash-change.
       */
      if (pageKey.includes(routes.main.festival.slug) || pageKey.includes(routes.main.ons.slug)) {
        return;
      }

      if (backScrollTimeout.current) {
        clearTimeout(backScrollTimeout.current);
      }

      backScrollTimeout.current = setTimeout(() => {
        window.scroll({
          top: scrollPositions.current[0],
          behavior: 'smooth',
        });
        sessionStorage.setItem('back-scroll-position', '0');
      }, 500);
    };

    const handleBeforeHistoryChange = () => {
      scrollPositions.current.push(window.scrollY);
      if (scrollPositions.current.length > 2) {
        scrollPositions.current.shift();
      }
    };

    router.events.on('routeChangeStart', handleRouteChangeStart);
    router.events.on('beforeHistoryChange', handleBeforeHistoryChange);
    window.addEventListener('popstate', handlePopState);

    const pageSlug = pageKey.split('/')[1].split('#')[0];
    if (
      pageSlug === routes.secondary.about.slug ||
      pageSlug === routes.secondary.impressions.slug ||
      pageSlug === 'gallery'
    ) {
      store.dispatch(uiActions.setDark(true));
    } else {
      store.dispatch(uiActions.setDark(false));
    }

    return () => {
      router.events.off('routeChangeStart', handleRouteChangeStart);
      router.events.off('beforeHistoryChange', handleBeforeHistoryChange);
      router.beforePopState((state) => {
        state.options.scroll = false;
        return true;
      });
      window.removeEventListener('popstate', handlePopState);
    };
  }, [router, router.events, pageKey]);

  useEffect(() => {
    const browser = detect();

    if (browser && browser.os) {
      let os = browser.os as string;

      if (os.indexOf('Windows') > -1) {
        os = 'windows';
      } else if (browser.os.indexOf('Mac') > -1) {
        os = 'mac';
      }
      document.body.classList.add(os);
      document.body.classList.add(browser.name);
    }
  });

  return (
    <Provider store={store}>
      <div className={classNames(fontText.className, fontTitle.variable)}>
        <MainNavPanel />
        <NavBurger />
        <AnimatePresence mode='wait' initial={false} onExitComplete={() => window.scrollTo(0, 0)}>
          <Component key={pageKey} {...pageProps} />
        </AnimatePresence>
        <RainbowBackground />
        <VideoOverlay />
        <CookieBanner />
      </div>
    </Provider>
  );
};

export default App;
