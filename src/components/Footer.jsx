
import React from 'react';
import { Link } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Mail } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const siteName = "EducaNet";
  const logoUrl = "public/LogoEducaNet.webp";


  return (
    <footer className="bg-primary/90 dark:bg-slate-900 text-primary-foreground dark:text-slate-300 py-12 px-4 sm:px-6 lg:px-8 shadow-inner mt-auto">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          <div>
            <Link to="/" className="flex items-center space-x-2 mb-4">
              <img src={logoUrl} alt={`${siteName} Logo`} className="h-16 w-auto" />
              <span className="text-2xl font-bold text-white">
                {siteName}
              </span>
            </Link>
            <p className="text-sm text-primary-foreground/80 dark:text-slate-400">
              Recursos educativos interactivos para todas las edades. Aprende sin límites.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Materias</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/matematicas" className="hover:text-white transition-colors">Matemáticas</Link></li>
              <li><Link to="/espanol" className="hover:text-white transition-colors">Español</Link></li>
              <li><Link to="/ciencias" className="hover:text-white transition-colors">Ciencias Naturales</Link></li>
              <li><Link to="/ingles" className="hover:text-white transition-colors">Inglés</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Enlaces</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/#about" className="hover:text-white transition-colors">Sobre Nosotros</Link></li>
              <li><Link to="/#contact" className="hover:text-white transition-colors">Contacto</Link></li>
              <li><Link to="/terminos" className="hover:text-white transition-colors">Política de Privacidad</Link></li>
              <li><Link to="/terminos" className="hover:text-white transition-colors">Términos de Uso</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Suscríbete</h3>
            <p className="text-sm text-primary-foreground/80 dark:text-slate-400 mb-3">
              Recibe nuevos recursos educativos en tu correo.
            </p>
            <form className="flex flex-col sm:flex-row gap-2">
              <div className="relative flex-grow">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground dark:text-slate-500" />
                <Input 
                  type="email" 
                  placeholder="Tu correo electrónico" 
                  className="w-full pl-10 pr-4 py-2.5 rounded-md bg-primary-foreground/20 dark:bg-slate-800 border-transparent focus:border-white dark:focus:border-primary text-primary-foreground dark:text-white placeholder:text-primary-foreground/60 dark:placeholder:text-slate-400"
                />
              </div>
              <Button type="submit" variant="secondary" className="bg-secondary hover:bg-secondary/90 text-secondary-foreground shrink-0">
                Enviar
              </Button>
            </form>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 dark:border-slate-700 pt-8 text-center">
          <p className="text-sm text-primary-foreground/80 dark:text-slate-400">
            &copy; {currentYear} {siteName}. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
