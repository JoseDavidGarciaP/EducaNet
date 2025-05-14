
import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ResourceCard from '@/components/ResourceCard';
import SubjectHero from '@/components/SubjectHero';
import mathResourcesData from '@/data/mathResources.jsx'; 
import { Calculator, Sigma } from 'lucide-react';
import { Button } from '@/components/ui/button';

const MathPage = () => {
  const [activeTab, setActiveTab] = useState("todos");
  const [searchTerm, setSearchTerm] = useState("");

  const mathResources = useMemo(() => {
    return mathResourcesData; 
  }, []);

  const filteredResources = useMemo(() => {
    let resources = mathResources;
    if (activeTab !== "todos") {
      resources = resources.filter(r => r.type.toLowerCase().replace(/\s+/g, '-') === activeTab);
    }
    if (searchTerm) {
      resources = resources.filter(r => r.title.toLowerCase().includes(searchTerm.toLowerCase()));
    }
    return resources;
  }, [mathResources, activeTab, searchTerm]);

  const tabTypes = useMemo(() => {
    const types = new Set(mathResources.map(r => r.type.toLowerCase().replace(/\s+/g, '-')));
    return ["todos", ...Array.from(types)];
  }, [mathResources]);

  const getTypeDisplayName = (typeKey) => {
    if (typeKey === "todos") return "Todos";
    const foundResource = mathResources.find(r => r.type.toLowerCase().replace(/\s+/g, '-') === typeKey);
    return foundResource ? foundResource.type : typeKey.charAt(0).toUpperCase() + typeKey.slice(1);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <SubjectHero
        title="Matemáticas Divertidas"
        subtitle="Explora el mundo de los números, las formas y el razonamiento lógico con nuestros recursos interactivos."
        icon={<Sigma />}
        gradient="math-color"
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        searchPlaceholder="Buscar en Matemáticas..."
      />

      <div className="container mx-auto py-8 px-4">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8">
          <TabsList className="grid w-full grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 bg-muted/50 p-2 rounded-lg">
            {tabTypes.map((type) => (
              <TabsTrigger key={type} value={type} className="data-[state=active]:bg-purple-500 data-[state=active]:text-white data-[state=active]:shadow-md transition-all duration-200">
                {getTypeDisplayName(type)}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>

        {filteredResources.length > 0 ? (
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {filteredResources.map((resource, index) => (
              <ResourceCard key={resource.id} resource={resource} />
            ))}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-16"
          >
            <Calculator className="mx-auto h-20 w-20 text-muted-foreground/50 mb-6" />
            <h2 className="text-2xl font-semibold mb-3 text-foreground">No se encontraron recursos</h2>
            <p className="text-muted-foreground max-w-md mx-auto">
              Intenta ajustar tu búsqueda o selecciona otra categoría. ¡Pronto añadiremos más contenido de matemáticas!
            </p>
            {searchTerm && (
              <Button variant="outline" className="mt-6" onClick={() => setSearchTerm('')}>
                Mostrar todos los recursos de Matemáticas
              </Button>
            )}
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default MathPage;
