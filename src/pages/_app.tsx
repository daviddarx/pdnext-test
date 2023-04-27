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

import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Layout from '../components/layout/Layout';
import store from '../../store/index';

import '@/styles/globals.css';

const App = ({ Component, pageProps }: AppProps) => {
  const router = useRouter();
  const pageKey = router.asPath;

  return (
    <Provider store={store}>
      <div className={`min-h-screen flex flex-col p-10 ${font.className}`}>
        <Header />
        <AnimatePresence mode='wait' initial={false} onExitComplete={() => window.scrollTo(0, 0)}>
          <Component key={pageKey} {...pageProps} />
        </AnimatePresence>
        <Footer />
      </div>
    </Provider>
  );
};

export default App;
