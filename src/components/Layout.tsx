// components/Layout.tsx
import React from 'react';
import Header from './Header';
import { Outlet, useLocation } from 'react-router-dom';
import Footer from './Footer';

function Layout() {
  const location = useLocation();
  const hideFooter = location.pathname === '/login' || location.pathname === '/register';

  return (
    <>
      <Header />
      <main className="main-content">
        <Outlet />
      </main>
      {!hideFooter && <Footer />}
    </>
  );
}

export default Layout;
