
import React, { useState, useEffect, createContext } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Toaster } from '@/components/ui/toaster';

// Layouts
import MainLayout from '@/layouts/MainLayout';

// Pages
import HomePage from '@/pages/HomePage';
import MathPage from '@/pages/MathPage';
import SpanishPage from '@/pages/SpanishPage';
import SciencePage from '@/pages/SciencePage';
import EnglishPage from '@/pages/EnglishPage';
import ResourcePage from '@/pages/ResourcePage';
import NotFoundPage from '@/pages/NotFoundPage';
import LoginPage from '@/pages/LoginPage';
import RegisterPage from '@/pages/RegisterPage';
import ProfilePage from '@/pages/ProfilePage';
import AchievementsPage from '@/pages/AchievementsPage';
import CommunityPage from '@/pages/CommunityPage';
import SettingsPage from '@/pages/SettingsPage';
import CoursePage from '@/pages/CoursePage';
import LessonPage from '@/pages/LessonPage';
import CoursesPage from '@/pages/CoursesPage';
import CalendarPage from '@/pages/CalendarPage';
import ChatHelpPage from '@/pages/ChatHelpPage';
import AiHelperPage from '@/pages/AiHelperPage';
import TermsPage from '@/pages/TermsPage'; 

export const ThemeContext = createContext(null);

function App() {
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');
  const [user, setUser] = useState(null); 

  useEffect(() => {
    document.title = "EducaNet";
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  const login = (userData) => setUser(userData);
  const logout = () => setUser(null);
  const register = (userData) => setUser(userData); 

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <Router>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className={theme}
        >
          <Routes>
            <Route path="/" element={<MainLayout user={user} logout={logout} />}>
              <Route index element={<HomePage />} />
              <Route path="matematicas" element={<MathPage />} />
              <Route path="espanol" element={<SpanishPage />} />
              <Route path="ciencias" element={<SciencePage />} />
              <Route path="ingles" element={<EnglishPage />} />
              <Route path="recurso/:id" element={<ResourcePage />} />
              <Route path="cursos" element={<CoursesPage />} />
              <Route path="curso/:courseId" element={<CoursePage />} />
              <Route path="curso/:courseId/leccion/:lessonId" element={<LessonPage />} />
              <Route path="perfil" element={<ProfilePage user={user} />} />
              <Route path="logros" element={<AchievementsPage />} />
              <Route path="comunidad" element={<CommunityPage />} />
              <Route path="calendario" element={<CalendarPage />} />
              <Route path="chat" element={<ChatHelpPage />} />
              <Route path="ia-helper" element={<AiHelperPage />} />
              <Route path="configuracion" element={<SettingsPage />} />
              <Route path="terminos" element={<TermsPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Route>
            <Route path="/login" element={<LoginPage login={login} />} />
            <Route path="/registro" element={<RegisterPage register={register} />} />
          </Routes>
          <Toaster />
        </motion.div>
      </Router>
    </ThemeContext.Provider>
  );
}

export default App;
