import { useEffect, useState, useRef } from 'react';
import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { Provider } from 'react-redux';
import { AnimatePresence } from 'framer-motion';
import { detect } from 'detect-browser';
import classNames from 'classnames';

import { routes } from '@/routes/routes';
import { fontText, fontTitle } from '@/utils/get-fonts';
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
  const pageKey = router.asPath;
  const lastScrollPosition = useRef<number[]>([]);
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    const handleRouteChangeStart = () => {
      store.dispatch(uiActions.closeNavigation());
      store.dispatch(uiActions.closeEvent());
    };

    const handlePopState = () => {
      /**
       * On back/popstate navigation, override the scroll
       * restoration position to the previously saved position.
       */
      setScrollPosition(lastScrollPosition.current[0]);
    };

    const handleBeforeHistoryChange = () => {
      /**
       * Save the scroll position on page leave, to restore
       * it on back/popstate navigation. Use an array instead
       * of useState to have directly the value updated, everywhere.
       */
      lastScrollPosition.current[0] = window.scrollY;
    };

    router.events.on('routeChangeStart', handleRouteChangeStart);
    router.events.on('beforeHistoryChange', handleBeforeHistoryChange);
    router.beforePopState((state) => {
      /**
       * Deactive Next's scroll restoration on back/popstate navigation.
       */
      state.options.scroll = false;
      return true;
    });
    window.addEventListener('popstate', handlePopState);
    /**
     * Deactivate completely the scroll restoration
     * of the browser, necessary for custom scroll
     * restoration on back/popstate navigation.
     */
    window.history.scrollRestoration = 'manual';

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
      window.removeEventListener('popstate', handlePopState);
    };
  }, [router, router.events, pageKey]);

  useEffect(() => {
    const detected = detect();

    if (detected && detected.os && detected.name) {
      let os = detected.os.replace(/\s+/g, '') as string;
      let browser = detected.name.replace(/\s+/g, '') as string;

      if (detected.os.indexOf('Windows') > -1) {
        os = 'windows';
      } else if (detected.os.indexOf('Mac') > -1) {
        os = 'mac';
      } else if (detected.os.indexOf('iOS') > -1) {
        os = 'ios';
      } else if (detected.os.indexOf('Android') > -1) {
        os = 'android';
      }

      const ios = /iP(ad|od|hone)/i.test(window.navigator.userAgent);
      const safari = !!navigator.userAgent.match(/Version\/[\d\.]+.*Safari/);

      if (ios && safari) {
        browser = 'safari';
      }

      document.body.classList.add(os);
      document.body.classList.add(browser);

      store.dispatch(
        uiActions.setSystem({
          os: os,
          browser: browser,
        }),
      );

      store.dispatch(
        uiActions.setSettings({
          reducedPriceText: pageProps.commonPageData.settingsData.reducedPriceText,
        }),
      );
    }
  });

  const handleExitComplete = () => {
    /**
     * Add a delay for the scroll restoration to be sure that the
     * the page height is updated across all browsers, after
     * the animation-out of the page. Necessary for the scroll
     * restoration on back/popstate navigation.
     */
    setTimeout(() => {
      window.scrollTo(0, scrollPosition);
      setScrollPosition(0);
    }, 100);
  };

  return (
    <Provider store={store}>
      <div className={classNames(fontText.className, fontTitle.variable)}>
        <MainNavPanel />
        <NavBurger />
        <AnimatePresence mode='wait' initial={false} onExitComplete={handleExitComplete}>
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
