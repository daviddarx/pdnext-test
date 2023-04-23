import { ReactNode } from 'react';

import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

interface Props {
  children?: ReactNode;
}

const Layout = ({ children }: Props) => {
  return (
    <div className='layout'>
      <Header />
      <main className='layout__page'>{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
