import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
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
  return (
    <Provider store={store}>
      <div className={`min-h-screen flex flex-col p-10 ${font.className}`}>
        <Header />
        <Layout>
          <Component {...pageProps} />
        </Layout>
        <Footer />
      </div>
    </Provider>
  );
};

export default App;
