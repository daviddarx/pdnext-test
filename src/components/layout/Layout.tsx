import { ReactNode } from 'react';
import { Space_Grotesk } from 'next/font/google';

import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

const font = Space_Grotesk({
  weight: ['400', '700'],
  style: ['normal'],
  subsets: ['latin'],
});

interface Props {
  children?: ReactNode;
}

const Layout = ({ children }: Props) => {
  return (
    <div className={`layout ${font.className}`}>
      <Header />
      <main className='layout__page'>{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
