import React from 'react';
import Header from './Header';

type ILayoutProps = {
  hideSidebar?: boolean;
  children: React.ReactNode;
  title?: string;
  description?: string;
  keywords?: string;
};

const Layout = ({
  hideSidebar = false,
  children,
  title = 'Buddies Spot | Admin',
}: ILayoutProps) => {
  return (
    <div>
      <div className=''>
        <head>
          <title>{title}</title>
        </head>
        <nav className='m-auto container'>
          {!hideSidebar && <Header />}
        </nav>
        <main className={``}>{children}</main>
        {/* {!hideFooter && (
          <footer>
            <Footer />
          </footer>
        )} */}
      </div>
    </div>
  );
};

export default Layout;
