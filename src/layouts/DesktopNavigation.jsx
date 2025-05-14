
import React from 'react';
import Sidebar from './Sidebar';

const DesktopNavigation = ({ isOpen, navItems, user, logout, toggleSidebar }) => {
  return (
    <Sidebar 
      isOpen={isOpen} 
      navItems={navItems} 
      user={user} 
      logout={logout}
      toggleSidebar={toggleSidebar}
    />
  );
};

export default DesktopNavigation;
