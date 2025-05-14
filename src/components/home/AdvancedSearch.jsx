
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';

const AdvancedSearch = () => {
  return (
    <section className="mb-16">
      <motion.div 
        className="bg-gradient-to-br from-primary/80 via-purple-500/80 to-fuchsia-600/80 rounded-3xl p-8 md:p-12 text-white relative overflow-hidden shadow-xl backdrop-blur-md"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        <div className="absolute inset-0 bg-circuit-board opacity-10"></div>
        
        <div className="relative z-10 text-center max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">¿Buscas algo específico?</h2>
          <p className="text-lg opacity-90 mb-8">
            Utiliza nuestra búsqueda avanzada para encontrar recursos educativos que se adapten a tus necesidades y nivel.
          </p>
          
          <div className="bg-white/90 dark:bg-slate-800/90 rounded-full p-2 flex items-center shadow-2xl max-w-xl mx-auto backdrop-blur-sm">
            <Search className="h-6 w-6 text-muted-foreground ml-4" />
            <input
              type="text"
              placeholder="Tema, nivel, tipo de recurso..."
              className="bg-transparent border-none outline-none flex-grow px-4 py-2 text-foreground placeholder:text-muted-foreground"
            />
            <Button className="rounded-full btn-primary px-6 text-sm">
              Buscar
            </Button>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default AdvancedSearch;
