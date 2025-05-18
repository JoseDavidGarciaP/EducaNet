
import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Star } from 'lucide-react';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

const testimonialsData = [
  {
    id: 1,
    name: "María G.",
    role: "Profesora de Primaria",
    quote: "Los recursos de matemáticas son geniales. Mis estudiantes disfrutan mucho aprendiendo con las actividades interactivas. ¡Plataforma 10/10!",
    avatar: "https://images.unsplash.com/photo-1568637329299-067edc3b71a6",
    bgColor: "bg-gradient-to-br from-purple-50 to-indigo-100 dark:from-purple-900/30 dark:to-indigo-900/40",
    borderColor: "border-purple-200 dark:border-purple-700",
    textColor: "text-purple-800 dark:text-purple-300"
  },
  {
    id: 2,
    name: "Carlos R.",
    role: "Padre de familia",
    quote: "Mi hijo ha mejorado muchísimo en inglés gracias a los juegos y videos. La plataforma es muy intuitiva, colorida y super divertida.",
    avatar: "https://images.unsplash.com/photo-1673606040964-cb3f12ccd9b3",
    bgColor: "bg-gradient-to-br from-blue-50 to-cyan-100 dark:from-blue-900/30 dark:to-cyan-900/40",
    borderColor: "border-blue-200 dark:border-blue-700",
    textColor: "text-blue-800 dark:text-blue-300"
  },
  {
    id: 3,
    name: "Ana L.",
    role: "Estudiante de Secundaria",
    quote: "Los recursos de ciencias me han ayudado un montón con mis tareas. Las explicaciones son claras y los experimentos virtuales son lo máximo.",
    avatar: "https://images.unsplash.com/photo-1548534143-1779f5b68bab",
    bgColor: "bg-gradient-to-br from-green-50 to-teal-100 dark:from-green-900/30 dark:to-teal-900/40",
    borderColor: "border-green-200 dark:border-green-700",
    textColor: "text-green-800 dark:text-green-300"
  }
];

const Testimonials = () => {
  return (
    <section className="mb-16">
      <div className="text-center mb-12">
        <motion.h2 
          className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-purple-400 bg-clip-text text-transparent"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Lo que dicen nuestros usuarios
        </motion.h2>
        <motion.p 
          className="text-muted-foreground max-w-xl mx-auto text-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          Descubre cómo EducaNet está transformando la forma de aprender.
        </motion.p>
      </div>
      
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-3 gap-8"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        {testimonialsData.map((testimonial) => (
          <motion.div key={testimonial.id} variants={itemVariants} className="h-full">
            <Card className={`h-full ${testimonial.bgColor} ${testimonial.borderColor} shadow-lg rounded-xl overflow-hidden flex flex-col`}>
              <CardContent className="p-6 md:p-8 flex flex-col items-center text-center flex-grow">
                <div className="mb-5">
                  <img    
                    class={`w-20 h-20 rounded-full object-cover border-4 ${testimonial.borderColor} shadow-md`} 
                    alt={`Foto de perfil de ${testimonial.name}`}
                    src={testimonial.avatar} />
                </div>
                <div className="flex mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
                <blockquote className="text-base md:text-lg text-foreground/90 italic mb-5 flex-grow">
                  "{testimonial.quote}"
                </blockquote>
                <div>
                  <p className={`font-semibold ${testimonial.textColor}`}>{testimonial.name}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default Testimonials;
