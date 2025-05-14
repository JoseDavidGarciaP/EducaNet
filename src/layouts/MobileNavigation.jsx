
import React from 'react';
import MobileMenu from './MobileMenu';

const MobileNavigation = ({ isOpen, toggleMenu, navItems, user, logout }) => {
  return (
    <MobileMenu 
      isOpen={isOpen}
      toggleMenu={toggleMenu}
      navItems={navItems}
      user={user}
      logout={logout}
    />
  );
};

export default MobileNavigation;
