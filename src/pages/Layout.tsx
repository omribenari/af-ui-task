import React from 'react';
import { Outlet } from 'react-router-dom';
import { AppHeader } from '../components/AppHeader';

const Layout = () => {
  return (
    <div>
      <AppHeader />
      <Outlet />
    </div>
  );
};

export default Layout;
