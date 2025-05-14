
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calculator, BookCopy as BookText, FlaskConical as Flask, Languages, ArrowRight } from 'lucide-react';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    }
  }
};

const itemVariants = {
  hidden: { y: 30, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

const subjects = [
  { name: 'Matemáticas', path: '/matematicas', icon: <Calculator className="h-10 w-10 text-white" />, description: 'Números, geometría, álgebra y más', colorClass: 'math-color', borderColor: 'border-purple-300', hoverShadow: 'hover:shadow-purple-400/50' },
  { name: 'Español', path: '/espanol', icon: <BookText className="h-10 w-10 text-white" />, description: 'Lectura, escritura, gramática', colorClass: 'spanish-color', borderColor: 'border-red-300', hoverShadow: 'hover:shadow-red-400/50' },
  { name: 'Ciencias', path: '/ciencias', icon: <Flask className="h-10 w-10 text-white" />, description: 'Biología, física, química', colorClass: 'science-color', borderColor: 'border-green-300', hoverShadow: 'hover:shadow-green-400/50' },
  { name: 'Inglés', path: '/ingles', icon: <Languages className="h-10 w-10 text-white" />, description: 'Vocabulario, gramática, conversación', colorClass: 'english-color', borderColor: 'border-blue-300', hoverShadow: 'hover:shadow-blue-400/50' },
];

const SubjectCards = () => {
  return (
    <section className="mb-16">
      <div className="text-center mb-12">
        <motion.h2 
          className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-purple-400 bg-clip-text text-transparent"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Explora por Materias
        </motion.h2>
        <motion.p 
          className="text-muted-foreground max-w-2xl mx-auto text-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          Sumérgete en el conocimiento y encuentra recursos educativos organizados por asignaturas para facilitar tu aprendizaje.
        </motion.p>
      </div>
      
      <motion.div 
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        {subjects.map((subject) => (
          <motion.div key={subject.name} variants={itemVariants} className="h-full">
            <Link to={subject.path} className="h-full flex">
              <Card className={`resource-card overflow-hidden w-full flex flex-col ${subject.borderColor} ${subject.hoverShadow} group`}>
                <CardContent className="p-6 flex flex-col items-center text-center flex-grow">
                  <div className={`mb-5 w-24 h-24 rounded-full ${subject.colorClass} flex items-center justify-center shadow-lg transform transition-transform duration-300 group-hover:scale-110`}>
                    {subject.icon}
                  </div>
                  <h3 className={`text-xl font-bold mb-2 text-foreground`}>{subject.name}</h3>
                  <p className="text-sm text-muted-foreground flex-grow">{subject.description}</p>
                  <Button variant="ghost" className="mt-4 text-primary hover:bg-primary/10 group-hover:text-primary/90 transition-colors duration-300">
                    Explorar <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </Button>
                </CardContent>
              </Card>
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default SubjectCards;
