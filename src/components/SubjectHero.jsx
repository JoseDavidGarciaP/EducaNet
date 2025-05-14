
import React from 'react';
import { motion } from 'framer-motion';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

const SubjectHero = ({ title, subtitle, icon, gradient, searchTerm, setSearchTerm, searchPlaceholder }) => {

  const heroClasses = `rounded-2xl overflow-hidden shadow-lg mb-8 ${gradient}`;

  return (
    <div className={heroClasses}>
      <div className={`relative px-6 py-12 md:py-16 lg:py-20 md:px-10 overflow-hidden`}>
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 rounded-full bg-white opacity-10"></div>
        <div className="absolute bottom-0 left-0 -mb-10 -ml-10 w-24 h-24 rounded-full bg-white opacity-10"></div>
        
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between">
          <div className="mb-6 md:mb-0 md:mr-8 text-center md:text-left">
            <motion.h1 
              className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {title}
            </motion.h1>
            <motion.p 
              className="text-white text-opacity-90 text-lg max-w-2xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              {subtitle}
            </motion.p>
          </div>
          
          <motion.div
            className={`w-32 h-32 md:w-40 md:h-40 flex items-center justify-center rounded-full bg-white bg-opacity-20`}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            {React.cloneElement(icon, { className: "h-16 w-16 md:h-20 md:w-20 text-white" })}
          </motion.div>
        </div>
        {setSearchTerm && (
          <motion.div 
            className="relative mt-8 md:mt-10 max-w-xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              type="text"
              placeholder={searchPlaceholder || "Buscar recursos..."}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-full bg-white/90 dark:bg-slate-800/90 text-foreground shadow-md focus:ring-2 focus:ring-primary border-transparent placeholder:text-muted-foreground"
            />
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default SubjectHero;
