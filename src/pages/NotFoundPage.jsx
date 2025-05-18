
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Home } from 'lucide-react';

const NotFoundPage = () => {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <span className="text-9xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
          404
        </span>
      </motion.div>
      
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="text-3xl font-bold mb-4"
      >
        ¡Página no encontrada!
      </motion.h1>
      
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="text-gray-600 max-w-md mb-8"
      >
        Lo sentimos, la página que estás buscando no existe o ha sido movida a otra ubicación.
      </motion.p>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <Link to="/">
          <Button className="bg-gradient-to-r from-purple-600 to-indigo-600">
            <Home className="mr-2 h-4 w-4" />
            Volver al inicio
          </Button>
        </Link>
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="mt-12"
      >
        <img  
          className="max-w-xl mx-auto" 
          alt="Ilustración de página no encontrada"
          src="https://videos.openai.com/vg-assets/assets%2Ftask_01jvgpr3b2e9es122wapxqatka%2F1747538705_img_2.webp?st=2025-05-18T01%3A50%3A11Z&se=2025-05-24T02%3A50%3A11Z&sks=b&skt=2025-05-18T01%3A50%3A11Z&ske=2025-05-24T02%3A50%3A11Z&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skoid=aa5ddad1-c91a-4f0a-9aca-e20682cc8969&skv=2019-02-02&sv=2018-11-09&sr=b&sp=r&spr=https%2Chttp&sig=UEhnaSMR7QdqghiokVaMgkfSgEmnhCzyp%2B9p1pWYm%2F8%3D&az=oaivgprodscus" />
      </motion.div>
    </div>
  );
};

export default NotFoundPage;
