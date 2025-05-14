
import React from 'react';
import { 
  Home, BookOpen, UserCircle, Award, Users, Calculator, 
  BookCopy as BookText, FlaskConical as Flask, Languages, 
  CalendarDays, MessageSquare, ShieldQuestion, Settings 
} from 'lucide-react';

export const navConfig = {
  mainNavItems: [
    { path: '/', label: 'Inicio', icon: <Home className="w-5 h-5" /> },
    { path: '/cursos', label: 'Cursos', icon: <BookOpen className="w-5 h-5" /> },
    { path: '/perfil', label: 'Perfil', icon: <UserCircle className="w-5 h-5" />, auth: true },
    { path: '/logros', label: 'Logros', icon: <Award className="w-5 h-5" />, auth: true },
    { path: '/comunidad', label: 'Comunidad', icon: <Users className="w-5 h-5" /> },
  ],
  subjectNavItems: [
    { path: '/matematicas', label: 'Matemáticas', icon: <Calculator className="w-5 h-5" /> },
    { path: '/espanol', label: 'Español', icon: <BookText className="w-5 h-5" /> },
    { path: '/ciencias', label: 'Ciencias Naturales', icon: <Flask className="w-5 h-5" /> },
    { path: '/ingles', label: 'Inglés', icon: <Languages className="w-5 h-5" /> },
  ],
  utilityNavItems: [
    { path: '/calendario', label: 'Calendario', icon: <CalendarDays className="w-5 h-5" /> },
    { path: '/chat', label: 'Chat Ayuda', icon: <MessageSquare className="w-5 h-5" /> },
    { path: '/ia-helper', label: 'Ayuda IA', icon: <ShieldQuestion className="w-5 h-5" /> },
    { path: '/configuracion', label: 'Configuración', icon: <Settings className="w-5 h-5" /> },
  ],
};
