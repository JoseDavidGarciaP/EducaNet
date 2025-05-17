
import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DropdownMenuSeparator } from "@/components/ui/dropdown-menu";

const NavItem = ({ path, label, icon, onClick }) => (
    <NavLink
      to={path}
      onClick={onClick} 
      className={({ isActive }) =>
        `flex items-center px-3 py-3 rounded-lg transition-all duration-200 ease-in-out transform hover:bg-primary/5
        ${isActive
          ? 'bg-primary/10 text-primary font-semibold'
          : 'text-foreground/80 hover:text-primary'
        }`
      }
    >
      {React.cloneElement(icon, { className: "w-5 h-5 mr-3" })}
      <span className="text-sm">{label}</span>
    </NavLink>
  );
  
const renderNavItems = (items, user, onLinkClick) => items.map(item => (
    (!item.auth || (item.auth && user)) && 
    <NavItem key={item.path} path={item.path} label={item.label} icon={item.icon} onClick={onLinkClick} />
));


const MobileMenu = ({ isOpen, toggleMenu, navItems, user, logout }) => {
  const { mainNavItems, subjectNavItems, utilityNavItems } = navItems;
  const siteName = "EducaNet";
  const logoUrl = "public/images/LogoEducaNet.webp";

  return (
    <AnimatePresence>
      {isOpen && (
        <>
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-30 bg-black/50 backdrop-blur-sm md:hidden"
            onClick={toggleMenu} 
          />
        <motion.div
          initial={{ x: '-100%' }}
          animate={{ x: 0 }}
          exit={{ x: '-100%' }}
          transition={{ type: 'spring', stiffness: 320, damping: 30 }}
          className="fixed left-0 top-0 z-40 h-full w-72 bg-card p-6 md:hidden flex flex-col shadow-xl"
        >
          <div className="flex justify-between items-center mb-6">
            <Link to="/" className="flex items-center space-x-2" onClick={toggleMenu}>
              <img src={logoUrl} alt={`${siteName} Logo`} className="h-12 w-auto" />
              <span className="text-lg font-bold text-foreground">{siteName}</span>
            </Link>
            <Button variant="ghost" size="icon" onClick={toggleMenu}>
              <X className="h-6 w-6" />
            </Button>
          </div>
          
          <nav className="flex-grow space-y-1 overflow-y-auto pr-1 -mr-1">
            {renderNavItems(mainNavItems, user, toggleMenu)}
            <DropdownMenuSeparator className="my-2.5"/>
            <p className="px-3 py-1.5 text-xs font-semibold text-muted-foreground tracking-wider">MATERIAS</p>
            {renderNavItems(subjectNavItems, user, toggleMenu)}
            <DropdownMenuSeparator className="my-2.5"/>
            <p className="px-3 py-1.5 text-xs font-semibold text-muted-foreground tracking-wider">HERRAMIENTAS</p>
            {renderNavItems(utilityNavItems, user, toggleMenu)}
          </nav>

          <div className="mt-auto pt-6 border-t border-border">
            {user ? (
              <Button onClick={() => { logout(); toggleMenu(); }} variant="outline" className="w-full text-red-500 border-red-500/50 hover:bg-red-500/10 hover:text-red-600">
                <LogOut className="w-5 h-5 mr-2" />
                Cerrar Sesión
              </Button>
            ) : (
              <div className="space-y-2">
                <Button asChild variant="outline" className="w-full">
                  <Link to="/login" onClick={toggleMenu}>Iniciar Sesión</Link>
                </Button>
                <Button asChild className="w-full btn-primary">
                  <Link to="/registro" onClick={toggleMenu}>Registrarse</Link>
                </Button>
              </div>
            )}
          </div>
        </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default MobileMenu;
