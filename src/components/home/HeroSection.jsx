
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import InteractiveElement from '@/components/InteractiveElement';
import { Zap, PlayCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary via-purple-500 to-fuchsia-600 text-white mb-12 shadow-2xl">
      <div className="absolute inset-0 overflow-hidden opacity-20">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-white/20 rounded-full filter blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-white/10 rounded-full filter blur-3xl animate-pulse animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-white/5 rounded-full filter blur-2xl animate-ping animation-delay-4000"></div>
      </div>
      
      <div className="relative z-10 px-6 py-16 md:py-24 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 leading-tight tracking-tight">
              Aprende de forma <span className="text-yellow-300 animate-shimmer bg-clip-text text-transparent">divertida</span> e <span className="text-yellow-300 animate-shimmer bg-clip-text text-transparent">interactiva</span>
            </h1>
            <p className="text-lg md:text-xl opacity-90 mb-8 max-w-lg">
              Explora recursos educativos para todas las edades en matemáticas, español, ciencias naturales e inglés. ¡El conocimiento te espera!
            </p>
            <div className="flex flex-wrap gap-4">
              <Button size="lg" asChild className="btn-primary shadow-lg transform hover:scale-105">
                <Link to="/cursos">Explorar Cursos</Link>
              </Button>
              <Button size="lg" variant="outline" className="bg-white/10 border-white/30 text-white hover:bg-white/20 hover:border-white/50 shadow-lg transform hover:scale-105">
                <PlayCircle className="mr-2 h-5 w-5" /> ¿Cómo funciona?
              </Button>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="flex justify-center items-center" 
          >
            <div className="relative w-full max-w-md aspect-square">
              <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-yellow-400 via-pink-400 to-purple-400 opacity-30 animate-spin-slow filter blur-xl"></div>
              <img  
                class="relative z-10 rounded-2xl shadow-2xl border-4 border-white/20 w-full h-full object-cover" 
                alt="Estudiantes sonrientes aprendiendo con tabletas en un aula colorida"
                src="/images/cover-img.webp" />
              
              <InteractiveElement 
                type="bounce" 
                className="absolute -top-5 -right-5 z-20 glassmorphism p-3 rounded-full shadow-xl"
              >
                <Zap className="h-7 w-7 text-yellow-300" />
                <span className="absolute -top-1 -right-1 block h-2.5 w-2.5 rounded-full bg-red-500 ring-2 ring-background" /> 
              </InteractiveElement>
              <InteractiveElement 
                type="pulse" 
                className="absolute -bottom-5 left-1/4 transform -translate-x-1/2 z-20 glassmorphism px-3 py-1.5 rounded-lg shadow-xl"
              >
                <span className="text-xs font-semibold text-white">¡Nuevos Retos!</span>
              </InteractiveElement>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
