
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import ResourceCard from '@/components/ResourceCard';
import { ArrowRight } from 'lucide-react';

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

const FeaturedResources = ({ resources }) => {
  const featuredResources = resources
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 4);

  return (
    <section className="mb-16">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-10">
        <motion.h2 
          className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary to-purple-400 bg-clip-text text-transparent mb-4 sm:mb-0"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          Recursos Destacados
        </motion.h2>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Button variant="outline" className="rounded-full border-primary text-primary hover:bg-primary/10 hover:text-primary/90 group">
            Ver todos <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Button>
        </motion.div>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {featuredResources.map((resource, index) => (
          <motion.div
            key={resource.id}
            custom={index}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={itemVariants}
            transition={{ delay: index * 0.1 }}
            className="h-full"
          >
            <ResourceCard resource={resource} />
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default FeaturedResources;
