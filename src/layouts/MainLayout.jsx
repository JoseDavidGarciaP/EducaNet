
import React, { useState, useContext, useEffect, useCallback } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { ThemeContext } from '@/App';
import TopHeader from './TopHeader';
import Footer from '@/components/Footer';
import { navConfig } from './navConfig';
import useViewport from '@/hooks/useViewport';
import PageTransitionWrapper from './PageTransitionWrapper';
import DesktopNavigation from './DesktopNavigation';
import MobileNavigation from './MobileNavigation';

const MainLayout = ({ user, logout }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); 
  const { theme, toggleTheme } = useContext(ThemeContext);
  const { width } = useViewport();
  const isDesktop = width >= 768;

  const toggleMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(prev => !prev);
  }, []);

  const handleSidebarToggle = useCallback(() => {
    if (!isDesktop) {
      setIsMobileMenuOpen(prev => !prev);
      setIsSidebarOpen(false); 
    } else {
      setIsSidebarOpen(prev => !prev);
      setIsMobileMenuOpen(false); 
    }
  }, [isDesktop]);

  const closeMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(false);
  }, []);

  const location = useLocation();
  useEffect(() => {
    closeMobileMenu();
  }, [location.pathname, closeMobileMenu]);

  useEffect(() => {
    if (isDesktop) {
      setIsMobileMenuOpen(false);
    } else {
      setIsSidebarOpen(false); 
    }
  }, [isDesktop]);

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <TopHeader 
        toggleSidebar={handleSidebarToggle}
        isSidebarOpen={isSidebarOpen && isDesktop} 
        user={user}
        logout={logout}
        theme={theme}
        toggleTheme={toggleTheme}
      />
      <div className="flex flex-1 overflow-hidden">
        {isDesktop && (
          <DesktopNavigation 
            isOpen={isSidebarOpen} 
            navItems={navConfig} 
            user={user} 
            logout={logout}
            toggleSidebar={handleSidebarToggle}
          />
        )}
        <main 
          className={`flex-1 overflow-y-auto transition-all duration-300 ease-in-out ${
            isSidebarOpen && isDesktop ? 'md:ml-64' : 'ml-0'
          }`}
        >
          <div className="p-4 sm:p-6 md:p-8 bg-gradient-to-br from-background via-background to-muted/20 min-h-[calc(100vh-4rem-5.5rem)]"> {/* Adjusted min-height */}
            <PageTransitionWrapper>
              <Outlet />
            </PageTransitionWrapper>
          </div>
          <Footer />
        </main>
      </div>
      {!isDesktop && (
        <MobileNavigation 
          isOpen={isMobileMenuOpen}
          toggleMenu={toggleMobileMenu}
          navItems={navConfig}
          user={user}
          logout={logout}
        />
      )}
    </div>
  );
};

export default MainLayout;
