import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Download, ExternalLink, Star, PlayCircle, FileText, Gamepad2, Edit3, HelpCircle } from 'lucide-react';

const ResourceCard = ({ resource }) => { 
  const { id, title, description, type, level, subject, rating, image } = resource;

  const subjectConfig = {
    matematicas: {
      colorClass: 'math-color',
      iconColor: 'text-purple-300',
      buttonColor: 'bg-purple-500 hover:bg-purple-600',
      badgeColor: 'bg-purple-100 text-purple-800',
      linkClass: 'text-purple-600 hover:text-purple-800',
    },
    espanol: {
      colorClass: 'spanish-color',
      iconColor: 'text-red-300',
      buttonColor: 'bg-red-500 hover:bg-red-600',
      badgeColor: 'bg-red-100 text-red-800',
      linkClass: 'text-red-600 hover:text-red-800',
    },
    ciencias: {
      colorClass: 'science-color',
      iconColor: 'text-green-300',
      buttonColor: 'bg-green-500 hover:bg-green-600',
      badgeColor: 'bg-green-100 text-green-800',
      linkClass: 'text-green-600 hover:text-green-800',
    },
    ingles: {
      colorClass: 'english-color',
      iconColor: 'text-blue-300',
      buttonColor: 'bg-blue-500 hover:bg-blue-600',
      badgeColor: 'bg-blue-100 text-blue-800',
      linkClass: 'text-blue-600 hover:text-blue-800',
    },
    default: {
      colorClass: 'bg-gradient-to-r from-slate-500 to-slate-600',
      iconColor: 'text-slate-300',
      buttonColor: 'bg-slate-500 hover:bg-slate-600',
      badgeColor: 'bg-slate-100 text-slate-800',
      linkClass: 'text-slate-600 hover:text-slate-800',
    }
  };

  const currentSubjectConfig = subjectConfig[subject.toLowerCase()] || subjectConfig.default;

  const getTypeIcon = () => {
    const iconProps = { className: `h-6 w-6 ${currentSubjectConfig.iconColor} mr-2` };
    switch (type.toLowerCase()) {
      case 'video':
        return <PlayCircle {...iconProps} />;
      case 'documento':
        return <FileText {...iconProps} />;
      case 'juego':
        return <Gamepad2 {...iconProps} />;
      case 'actividad':
        return <Edit3 {...iconProps} />;
      case 'quiz':
        return <HelpCircle {...iconProps} />;
      default:
        return <FileText {...iconProps} />;
    }
  };

  return (
    <motion.div
      whileHover={{ y: -5, boxShadow: "0 10px 20px rgba(0,0,0,0.1)" }}
      transition={{ duration: 0.3 }}
      className="h-full"
    >
      <Card className="resource-card overflow-hidden h-full flex flex-col border-2 dark:border-slate-700">
        <CardHeader className={`${currentSubjectConfig.colorClass} p-4`}>
          <CardTitle className="text-white flex justify-between items-center">
            <span className="text-lg font-semibold">{title}</span>
            <div className="p-2 bg-white/20 rounded-full">
              {React.cloneElement(getTypeIcon(), { className: "h-5 w-5 text-white"})}
            </div>
          </CardTitle>
        </CardHeader>
        
        <div className="relative h-48 overflow-hidden group"> 
          <img
            className="w-full h-full object-cover transition-all duration-500 ease-in-out transform group-hover:scale-110"
            alt={`Miniatura del recurso: ${title}`}
            src={image || "/images/placeholder.webp"}
            onError={(e) => {
              e.target.onerror = null; 
              e.target.src = "/images/placeholder.webp"; 
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </div>

        
        <CardContent className="p-4 flex-grow flex flex-col justify-between bg-card">
          <div>
            <p className="text-sm text-muted-foreground mb-3 line-clamp-3">{description}</p>
            <div className="flex flex-wrap gap-2 mb-3">
              <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${currentSubjectConfig.badgeColor}`}>
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </span>
              <span className={`text-xs px-2.5 py-1 rounded-full font-medium bg-muted text-muted-foreground`}>
                {level}
              </span>
            </div>
          </div>
          <div className="flex items-center mt-2">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-4 w-4 ${
                  i < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300 dark:text-gray-600'
                }`}
              />
            ))}
            <span className="text-xs text-muted-foreground ml-1.5">({rating}.0)</span>
          </div>
        </CardContent>
        
        <CardFooter className="p-4 bg-card border-t dark:border-slate-700">
          <Link
            to={`/recurso/${id}`}
            className={`w-full text-sm font-semibold py-2.5 px-4 rounded-md transition-colors duration-200 flex items-center justify-center ${currentSubjectConfig.buttonColor} text-white`}
          >
            Ver Recurso
            <ExternalLink className="h-4 w-4 ml-2" />
          </Link>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default ResourceCard;