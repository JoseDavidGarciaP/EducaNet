
import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Search, BookOpen, Award, Users, Zap } from 'lucide-react';

const steps = [
  {
    icon: <Search className="h-10 w-10 text-primary" />,
    title: "Explora y Descubre",
    description: "Navega por nuestra amplia gama de cursos y recursos educativos. Utiliza filtros para encontrar exactamente lo que necesitas.",
  },
  {
    icon: <BookOpen className="h-10 w-10 text-secondary" />,
    title: "Aprende a tu Ritmo",
    description: "Accede a lecciones interactivas, videos y material descargable. Avanza a tu propia velocidad, donde y cuando quieras.",
  },
  {
    icon: <Zap className="h-10 w-10 text-yellow-500" />,
    title: "Practica y Evalúa",
    description: "Pon a prueba tus conocimientos con quizzes interactivos y recibe retroalimentación instantánea para mejorar.",
  },
  {
    icon: <Award className="h-10 w-10 text-purple-500" />,
    title: "Gana Logros",
    description: "Completa módulos, mira videos y supera quizzes para ganar puntos, subir de nivel y desbloquear insignias.",
  },
  {
    icon: <Users className="h-10 w-10 text-pink-500" />,
    title: "Únete a la Comunidad",
    description: "Participa en foros, comenta en lecciones y conecta con otros estudiantes e instructores para una experiencia colaborativa.",
  },
];

const HowItWorks = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <section className="py-16 bg-muted/30 dark:bg-muted/10 rounded-3xl">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
            ¿Cómo Funciona EduDivertido?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Comenzar tu aventura de aprendizaje es fácil. Sigue estos sencillos pasos:
          </p>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {steps.map((step, index) => (
            <motion.div key={index} variants={itemVariants} className="lg:col-span-1 md:col-span-1">
              {(index === steps.length -1 && steps.length % 2 !== 0 && window.innerWidth >= 768 && window.innerWidth < 1024) && <div className="md:col-span-1 hidden md:block lg:hidden"></div>}
              <Card className="h-full text-center shadow-lg hover:shadow-xl transition-shadow duration-300 bg-card">
                <CardHeader className="items-center">
                  <div className="p-4 bg-primary/10 rounded-full mb-4 inline-block">
                    {step.icon}
                  </div>
                  <CardTitle className="text-xl font-semibold text-foreground">{step.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-sm">{step.description}</p>
                </CardContent>
              </Card>
              {(index === steps.length -1 && steps.length % 2 !== 0 && window.innerWidth >= 768 && window.innerWidth < 1024) && <div className="md:col-span-1 hidden md:block lg:hidden"></div>}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWorks;
