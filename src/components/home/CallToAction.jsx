
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Sparkles } from 'lucide-react';

const CallToAction = () => {
  return (
    <section className="py-12">
      <motion.div 
        className="bg-gradient-to-tr from-primary via-purple-500 to-fuchsia-600 rounded-3xl p-10 md:p-16 text-white text-center relative overflow-hidden shadow-2xl"
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="absolute -top-10 -left-10 w-40 h-40 bg-white/10 rounded-full animate-pulse filter blur-xl"></div>
        <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-white/10 rounded-full animate-pulse animation-delay-1000 filter blur-xl"></div>
        <Sparkles className="absolute top-5 right-5 h-16 w-16 text-yellow-300 opacity-50 animate-ping animation-delay-500" />
        <Sparkles className="absolute bottom-5 left-5 h-12 w-12 text-yellow-300 opacity-50 animate-ping animation-delay-1500" />

        <div className="relative z-10">
          <motion.h2 
            className="text-3xl md:text-4xl lg:text-5xl font-extrabold mb-6"
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            ¿Listo para <span className="text-yellow-300 animate-shimmer bg-clip-text text-transparent">desbloquear</span> tu potencial?
          </motion.h2>
          <motion.p 
            className="text-lg md:text-xl opacity-90 mb-10 max-w-2xl mx-auto"
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            Explora nuestra colección de recursos educativos y descubre una forma emocionante y efectiva de aprender. ¡Tu aventura de conocimiento comienza ahora!
          </motion.p>
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <Button 
              size="lg" 
              className="bg-white text-primary hover:bg-yellow-300 hover:text-purple-800 font-bold text-lg px-10 py-7 rounded-full shadow-xl transform hover:scale-105 transition-all duration-300"
            >
              ¡Empezar a Aprender Ahora!
            </Button>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default CallToAction;
