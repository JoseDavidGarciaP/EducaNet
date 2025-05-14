
import React from 'react';
import { Link } from 'react-router-dom';
import { Menu, Search, UserCircle, Settings, LogOut, Bell, Sun, Moon, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from '@/components/ui/input';

const TopHeader = ({ toggleSidebar, isSidebarOpen, user, logout, theme, toggleTheme }) => {
  const siteName = "EducaNet";
  const logoUrl = "public/LogoEducaNet.webp";


  return (
    <header className="bg-card border-b border-border shadow-sm h-16 flex items-center justify-between px-4 md:px-6 sticky top-0 z-30">
      <div className="flex items-center">
        <Button variant="ghost" size="icon" onClick={toggleSidebar} className="mr-2 p-2 rounded-full hover:bg-accent">
           {isSidebarOpen ? <X className="h-5 w-5 text-foreground" /> : <Menu className="h-5 w-5 text-foreground" />}
        </Button>
        
        <Link to="/" className="items-center space-x-2 flex">
             <img src={logoUrl} alt={`${siteName} Logo`} className="h-16 w-auto" />
            <span className="text-xl font-bold text-foreground hidden sm:inline">
                {siteName}
            </span>
        </Link>
      </div>

      <div className="flex-1 flex justify-center px-2 sm:px-4 lg:px-8">
        <div className="relative w-full max-w-xs sm:max-w-sm md:max-w-md">
          <Search className="absolute left-3.5 top-1/2 transform -translate-y-1/2 h-4 w-4 sm:h-5 sm:w-5 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Buscar cursos..."
            className="bg-background border border-input rounded-full pl-10 sm:pl-12 pr-4 py-2 sm:py-2.5 text-xs sm:text-sm w-full focus:ring-2 focus:ring-primary outline-none shadow-sm"
          />
        </div>
      </div>


      <div className="flex items-center space-x-1 sm:space-x-2">
        <Button variant="ghost" size="icon" onClick={toggleTheme} aria-label={theme === 'light' ? 'Activar tema oscuro' : 'Activar tema claro'}>
          {theme === 'light' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
        </Button>
        
        <Button variant="ghost" size="icon" aria-label="Notificaciones" className="relative">
          <Bell className="h-5 w-5" />
          <span className="absolute top-1.5 right-1.5 block h-2 w-2 rounded-full bg-red-500 ring-2 ring-card" /> 
        </Button>

        {user ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-8 w-8 sm:h-9 sm:w-9 rounded-full p-0">
                <Avatar className="h-8 w-8 sm:h-9 sm:w-9">
                  <AvatarImage src={user.avatarUrl || `https://avatar.vercel.sh/${user.email || 'user'}.png`} alt={user.name || 'Avatar'} />
                  <AvatarFallback>{user.name ? user.name.charAt(0).toUpperCase() : 'U'}</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">{user.name || 'Usuario'}</p>
                  <p className="text-xs leading-none text-muted-foreground">
                    {user.email || 'usuario@ejemplo.com'}
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link to="/perfil" className="flex items-center cursor-pointer">
                  <UserCircle className="mr-2 h-4 w-4" />
                  <span>Perfil</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/configuracion" className="flex items-center cursor-pointer">
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Configuración</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={logout} className="text-red-500 focus:bg-red-500/10 focus:text-red-600 cursor-pointer">
                <LogOut className="mr-2 h-4 w-4" />
                Cerrar Sesión
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <div className="flex items-center space-x-1 sm:space-x-2">
            <Button asChild variant="ghost" size="sm" className="px-2 sm:px-3 text-xs sm:text-sm">
              <Link to="/login">Iniciar Sesión</Link>
            </Button>
            <Button asChild size="sm" className="btn-primary px-3 sm:px-4 text-xs sm:text-sm">
              <Link to="/registro">Registrarse</Link>
            </Button>
          </div>
        )}
      </div>
    </header>
  );
};

export default TopHeader;
