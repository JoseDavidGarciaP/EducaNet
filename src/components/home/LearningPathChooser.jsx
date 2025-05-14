
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ArrowRight, Compass, ListOrdered, Search } from 'lucide-react';
import { Link } from 'react-router-dom';

const LearningPathChooser = () => {
  const [selectedPath, setSelectedPath] = useState(null);

  const paths = [
    {
      id: 'linear',
      icon: <ListOrdered className="h-8 w-8 text-primary" />,
      title: 'Ruta Guiada',
      description: 'Sigue un camino estructurado, aprendiendo paso a paso desde el inicio. Ideal si prefieres una progresión clara.',
      actionText: 'Comenzar Ruta Guiada',
      link: '/cursos?modo=guiado'
    },
    {
      id: 'explore',
      icon: <Compass className="h-8 w-8 text-secondary" />,
      title: 'Exploración Libre',
      description: 'Navega por temas de tu interés. Busca, filtra y elige qué aprender y cuándo. Perfecto para curiosos y autodidactas.',
      actionText: 'Explorar Libremente',
      link: '/cursos?modo=libre'
    }
  ];

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.4, ease: "easeOut" } },
    hover: { scale: 1.03, boxShadow: "0px 10px 20px rgba(0,0,0,0.1)" }
  };

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
            Elige Tu Aventura de Aprendizaje
          </h2>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto">
            ¿Cómo prefieres aprender? Selecciona una opción para personalizar tu experiencia.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {paths.map((path) => (
            <motion.div
              key={path.id}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              whileHover="hover"
              viewport={{ once: true, amount: 0.3 }}
            >
              <Card 
                className={`h-full flex flex-col cursor-pointer transition-all duration-300 ${selectedPath === path.id ? 'border-primary ring-2 ring-primary shadow-2xl' : 'border-border'}`}
                onClick={() => setSelectedPath(path.id)}
              >
                <CardHeader className="items-center text-center p-6">
                  <div className={`p-4 rounded-full mb-4 inline-block ${selectedPath === path.id ? 'bg-primary/20' : 'bg-muted'}`}>
                    {path.icon}
                  </div>
                  <CardTitle className="text-2xl font-semibold text-foreground">{path.title}</CardTitle>
                </CardHeader>
                <CardContent className="flex-grow text-center p-6 pt-0">
                  <CardDescription className="text-muted-foreground mb-6 min-h-[60px]">{path.description}</CardDescription>
                  <Button 
                    asChild 
                    className={`w-full ${selectedPath === path.id ? 'btn-primary' : 'bg-primary/80 text-primary-foreground hover:bg-primary'}`}
                    onClick={(e) => { if (selectedPath !== path.id) e.preventDefault(); }} // Prevent navigation if not selected
                  >
                    <Link to={selectedPath === path.id ? path.link : '#'}>
                      {path.actionText} <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
        
        {selectedPath && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="mt-10 text-center"
          >
            <p className="text-muted-foreground">
              Has seleccionado: <span className="font-semibold text-primary">{paths.find(p => p.id === selectedPath)?.title}</span>.
            </p>
          </motion.div>
        )}

        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="mt-12 text-center"
        >
            <p className="text-muted-foreground mb-2">¿No estás seguro? Siempre puedes</p>
            <Button variant="outline" asChild>
                <Link to="/cursos">
                    <Search className="mr-2 h-4 w-4" /> Ver todos los cursos
                </Link>
            </Button>
        </motion.div>

      </div>
    </section>
  );
};

export default LearningPathChooser;
