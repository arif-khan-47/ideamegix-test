import React from 'react';
import Sidebar from './Sidebar';

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
      <div className='grid grid-cols-6'>
        <head>
          <title>{title}</title>
        </head>
        <nav className='col-span-1 h-screen bg-[#F0564F] sticky top-0 bottom-0 left-0'>
          {!hideSidebar && <Sidebar />}
        </nav>
        {/* <link rel="stylesheet" href="https://unpkg.com/leaflet@1.0.1/dist/leaflet.css" /> */}
        <main className={`col-span-5 min-h-screen`}>{children}</main>
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
