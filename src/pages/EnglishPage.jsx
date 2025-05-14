
import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ResourceCard from '@/components/ResourceCard';
import SubjectHero from '@/components/SubjectHero';
import englishResourcesData from '@/data/englishResources.jsx';
import { Languages, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';

const EnglishPage = () => {
  const [activeTab, setActiveTab] = useState("todos");
  const [searchTerm, setSearchTerm] = useState("");

  const englishResources = useMemo(() => {
    return englishResourcesData;
  }, []);

  const filteredResources = useMemo(() => {
    let resources = englishResources;
    if (activeTab !== "todos") {
      resources = resources.filter(r => r.type.toLowerCase().replace(/\s+/g, '-') === activeTab);
    }
    if (searchTerm) {
      resources = resources.filter(r => r.title.toLowerCase().includes(searchTerm.toLowerCase()));
    }
    return resources;
  }, [englishResources, activeTab, searchTerm]);

  const tabTypes = useMemo(() => {
    const types = new Set(englishResources.map(r => r.type.toLowerCase().replace(/\s+/g, '-')));
    return ["todos", ...Array.from(types)];
  }, [englishResources]);

  const getTypeDisplayName = (typeKey) => {
    if (typeKey === "todos") return "Todos";
    const foundResource = englishResources.find(r => r.type.toLowerCase().replace(/\s+/g, '-') === typeKey);
    return foundResource ? foundResource.type : typeKey.charAt(0).toUpperCase() + typeKey.slice(1);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <SubjectHero
        title="Welcome to English!"
        subtitle="Improve your vocabulary, grammar, and communication skills with our engaging English resources."
        icon={<Globe />}
        gradient="english-color"
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        searchPlaceholder="Search in English..."
      />

      <div className="container mx-auto py-8 px-4">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8">
          <TabsList className="grid w-full grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 bg-muted/50 p-2 rounded-lg">
            {tabTypes.map((type) => (
              <TabsTrigger key={type} value={type} className="data-[state=active]:bg-blue-500 data-[state=active]:text-white data-[state=active]:shadow-md transition-all duration-200">
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
            <Languages className="mx-auto h-20 w-20 text-muted-foreground/50 mb-6" />
            <h2 className="text-2xl font-semibold mb-3 text-foreground">No resources found</h2>
            <p className="text-muted-foreground max-w-md mx-auto">
              Try adjusting your search or select another category. We'll be adding more English content soon!
            </p>
            {searchTerm && (
              <Button variant="outline" className="mt-6" onClick={() => setSearchTerm('')}>
                Show all English resources
              </Button>
            )}
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default EnglishPage;
