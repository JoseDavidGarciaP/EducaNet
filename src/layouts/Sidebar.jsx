
import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import { LogOut, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DropdownMenuSeparator } from "@/components/ui/dropdown-menu";

const NavItem = ({ path, label, icon, onClick }) => (
  <NavLink
    to={path}
    onClick={onClick} 
    className={({ isActive }) =>
      `flex items-center px-3 py-2.5 rounded-lg transition-all duration-200 ease-in-out transform hover:scale-105 hover:shadow-lg
      ${isActive
        ? 'bg-primary/20 text-primary font-semibold shadow-md'
        : 'text-foreground/70 hover:bg-primary/10 hover:text-primary'
      }`
    }
  >
    {icon}
    <span className="ml-3 text-sm">{label}</span>
  </NavLink>
);

const renderNavItems = (items, user, onLinkClick) => items.map(item => (
  (!item.auth || (item.auth && user)) && 
  <NavItem key={item.path} path={item.path} label={item.label} icon={item.icon} onClick={onLinkClick} />
));

const Sidebar = ({ isOpen, navItems, user, logout, toggleSidebar }) => {
  const { mainNavItems, subjectNavItems, utilityNavItems } = navItems;
  const siteName = "EducaNet";
  const logoUrl = "https://storage.googleapis.com/hostinger-horizons-assets-prod/ab230e52-a001-47c9-bc4e-f3021b284619/12025d89fd2e165c2b3b103e3b107a01.png";

  if (!isOpen) return null;

  return (
    <motion.aside 
      initial={{ x: '-100%' }}
      animate={{ x: 0 }}
      exit={{ x: '-100%' }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      className="fixed left-0 top-0 z-40 h-full w-64 bg-card border-r border-border p-4 flex flex-col space-y-4 overflow-y-auto md:translate-x-0"
    >
      <div className="flex items-center justify-between mb-4">
        <Link to="/" className="flex items-center space-x-2" onClick={toggleSidebar}>
          <img src={logoUrl} alt={`${siteName} Logo`} className="h-8 w-auto" />
          <span className="text-xl font-bold text-foreground">
            {siteName}
          </span>
        </Link>
        <Button variant="ghost" size="icon" onClick={toggleSidebar} className="md:hidden">
            <X className="h-6 w-6" />
        </Button>
      </div>
      <nav className="flex-grow space-y-1.5">
        {renderNavItems(mainNavItems, user, toggleSidebar)}
        <DropdownMenuSeparator className="my-3"/>
        <p className="px-3 py-1 text-xs font-semibold text-muted-foreground tracking-wider">MATERIAS</p>
        {renderNavItems(subjectNavItems, user, toggleSidebar)}
        <DropdownMenuSeparator className="my-3"/>
        <p className="px-3 py-1 text-xs font-semibold text-muted-foreground tracking-wider">HERRAMIENTAS</p>
        {renderNavItems(utilityNavItems, user, toggleSidebar)}
      </nav>
      {user && (
        <Button 
          onClick={() => { logout(); toggleSidebar(); }} 
          variant="ghost" 
          className="w-full justify-start text-red-500 hover:bg-red-500/10 hover:text-red-600"
        >
          <LogOut className="w-5 h-5 mr-3" />
          Cerrar Sesión
        </Button>
      )}
    </motion.aside>
  );
};

export default Sidebar;
