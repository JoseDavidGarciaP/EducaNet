
import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, SelectGroup, SelectLabel } from "@/components/ui/select";
import { BookOpen, Search, Filter, Star, Users, BarChart3, Tag, Palette } from 'lucide-react';
import resourcesData from '@/data/resources'; 
import { getLevelsForFilter } from '@/data/levels';
import { formatSubject } from '@/utils/subject';


const CourseCard = ({ course, index }) => {
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        delay: index * 0.05,
        duration: 0.4,
        ease: "easeOut",
      },
    },
  };

  return (
    <motion.div variants={cardVariants} initial="hidden" animate="visible" className="h-full">
      <Card className={`resource-card overflow-hidden h-full flex flex-col group border-2 border-transparent hover:border-primary/50 hover:shadow-primary/20 ${course.color || 'bg-card'}`}>
        <CardHeader className="p-0">
          <div className="relative aspect-[16/10] overflow-hidden">
            <img  
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              alt={`Portada del curso ${course.title}`} 
              src={course.image || 'https://images.unsplash.com/photo-1692984501845-a344a7fe38a8'} 
            />
            <div className={`absolute top-3 right-3 p-2.5 rounded-full bg-white/90 backdrop-blur-sm shadow-lg`}>
              {React.cloneElement(course.icon || <BookOpen />, { className: `w-7 h-7 ${course.iconColor || 'text-primary'}`})}
            </div>
            <div className="absolute bottom-0 left-0 w-full p-3 bg-gradient-to-t from-black/70 to-transparent">
                <h3 className="text-lg font-semibold text-white [text-shadow:_0_1px_3px_rgb(0_0_0_/_80%)]">
                  {course.title}</h3>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-5 flex-grow flex flex-col">
          <CardDescription className="text-sm text-muted-foreground mb-3 flex-grow line-clamp-3">{course.description}</CardDescription>
          <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-xs text-muted-foreground mb-4">
            <div className="flex items-center"><Users className="w-3.5 h-3.5 mr-1.5 text-primary/70"/> {course.students || Math.floor(Math.random() * 500 + 50)} Estudiantes</div>
            <div className="flex items-center"><Star className="w-3.5 h-3.5 mr-1.5 text-yellow-500"/> {course.rating || (Math.random() * 1.5 + 3.5).toFixed(1)}/5.0</div>
            <div className="flex items-center"><BarChart3 className="w-3.5 h-3.5 mr-1.5 text-primary/70"/> {Array.isArray(course.levels) ? course.levels.join(', ') : course.levels}</div>
            <div className="flex items-center"><Tag className="w-3.5 h-3.5 mr-1.5 text-primary/70"/> {course.lessonCount} Lecciones</div>
          </div>
        </CardContent>
        <div className="p-5 pt-0">
            <Button asChild className="w-full btn-primary text-base">
            <Link to={`/curso/${course.id}`}>Ver Curso</Link>
            </Button>
        </div>
      </Card>
    </motion.div>
  );
};


const CoursesPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('all');
  const [selectedLevel, setSelectedLevel] = useState('all');

  const subjects = useMemo(() => ['all', ...new Set(resourcesData.map(r => r.subject))], []);
  const levelsForFilter = useMemo(() => getLevelsForFilter(), []);
  
  const courses = useMemo(() => {
    return resourcesData.reduce((acc, resource) => {
      const existingCourse = acc.find(c => c.subject === resource.subject);
      if (existingCourse) {
        existingCourse.lessonCount += 1;
        const resourceLevels = Array.isArray(resource.level) ? resource.level : [resource.level];
        resourceLevels.forEach(level => {
          if (!existingCourse.levels.includes(level)) {
            existingCourse.levels.push(level);
          }
        });
      } else {
        let iconComponent;
        let iconColorClass = 'text-primary';
        let courseColorClass = 'bg-card';

        switch (resource.subject.toLowerCase()) {
            case 'matematicas':
                iconComponent = <BookOpen />;
                iconColorClass = 'text-purple-500';
                courseColorClass = 'math-color-light';
                break;
            case 'espanol':
                iconComponent = <BookOpen />;
                iconColorClass = 'text-red-500';
                courseColorClass = 'spanish-color-light';
                break;
            case 'ciencias':
                iconComponent = <BookOpen />;
                iconColorClass = 'text-green-500';
                courseColorClass = 'science-color-light';
                break;
            case 'ingles':
                iconComponent = <BookOpen />;
                iconColorClass = 'text-blue-500';
                courseColorClass = 'english-color-light';
                break;
            default:
                iconComponent = <BookOpen />;
        }


        acc.push({
          id: `curso-${resource.subject.toLowerCase().replace(/\s+/g, '-')}`,
          title: `Curso de ${formatSubject(resource.subject)}`,
          description: `Aprende todo sobre ${formatSubject(resource.subject)} con nuestros módulos interactivos, cubriendo desde lo básico hasta temas avanzados. Ideal para estudiantes de todos los niveles.`,
          subject: resource.subject,
          lessonCount: 1,
          levels: Array.isArray(resource.level) ? resource.level : [resource.level],
          icon: iconComponent, 
          color: courseColorClass,
          iconColor: iconColorClass,
          image: resource.image || 'https://images.unsplash.com/photo-1532012197267-da84d127e765'
        });
      }
      return acc;
    }, []).filter(course => {
      const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) || course.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesSubject = selectedSubject === 'all' || course.subject === selectedSubject;
      const courseLevels = Array.isArray(course.levels) ? course.levels : [course.levels];
      const matchesLevel = selectedLevel === 'all' || courseLevels.some(level => level.includes(selectedLevel) || selectedLevel.includes(level));
      
      if (selectedLevel !== 'all') {
        if (selectedLevel.startsWith('Primaria -') || selectedLevel.startsWith('Secundaria -')) {
            return matchesSearch && matchesSubject && courseLevels.includes(selectedLevel);
        } else if (selectedLevel === 'Primaria' || selectedLevel === 'Secundaria') {
            return matchesSearch && matchesSubject && courseLevels.some(l => l.startsWith(selectedLevel));
        }
      }
      return matchesSearch && matchesSubject && matchesLevel;
    });
  }, [searchTerm, selectedSubject, selectedLevel]);


  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto py-8 px-4"
    >
      <div className="text-center mb-12">
        <motion.h1 
          initial={{ opacity:0, y: -30 }}
          animate={{ opacity:1, y: 0 }}
          transition={{ duration:0.6, ease: "circOut" }}
          className="text-4xl md:text-5xl font-extrabold mb-4 bg-gradient-to-r from-primary via-purple-500 to-pink-500 bg-clip-text text-transparent"
        >
          Explora Nuestros Cursos
        </motion.h1>
        <motion.p 
          initial={{ opacity:0, y: 20 }}
          animate={{ opacity:1, y: 0 }}
          transition={{ duration:0.5, delay: 0.2 }}
          className="text-lg text-muted-foreground max-w-2xl mx-auto"
        >
          Encuentra el curso perfecto para ti y comienza tu aventura de aprendizaje. Desde matemáticas hasta inglés, ¡tenemos algo para todos!
        </motion.p>
      </div>

      <Card className="mb-8 p-6 shadow-lg bg-card/80 backdrop-blur-sm">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
          <div className="md:col-span-1">
            <label htmlFor="search-courses" className="block text-sm font-medium text-muted-foreground mb-1">Buscar Curso</label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input 
                id="search-courses"
                type="text" 
                placeholder="Ej: Álgebra, Gramática..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-lg border-input bg-background focus:ring-2 focus:ring-primary outline-none"
              />
            </div>
          </div>
          <div>
            <label htmlFor="filter-subject" className="block text-sm font-medium text-muted-foreground mb-1">Materia</label>
            <Select value={selectedSubject} onValueChange={setSelectedSubject}>
              <SelectTrigger id="filter-subject" className="w-full py-2.5 bg-background">
                <Palette className="w-4 h-4 mr-2 text-muted-foreground" />
                <SelectValue placeholder="Todas las materias" />
              </SelectTrigger>
              <SelectContent>
                {subjects.map(subject => (
                  <SelectItem key={subject} value={subject}>
                    {formatSubject(subject)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <label htmlFor="filter-level" className="block text-sm font-medium text-muted-foreground mb-1">Nivel</label>
            <Select value={selectedLevel} onValueChange={setSelectedLevel}>
              <SelectTrigger id="filter-level" className="w-full py-2.5 bg-background">
                <BarChart3 className="w-4 h-4 mr-2 text-muted-foreground" />
                <SelectValue placeholder="Todos los niveles" />
              </SelectTrigger>
              <SelectContent position="popper" sideOffset={5} className="max-h-80 overflow-y-auto">
                <SelectItem value="all">Todos los niveles</SelectItem>
                <SelectGroup>
                  <SelectLabel>General</SelectLabel>
                  <SelectItem value="Primaria">Primaria (General)</SelectItem>
                  <SelectItem value="Secundaria">Secundaria (General)</SelectItem>
                  <SelectItem value="Bachillerato">Bachillerato</SelectItem>
                  <SelectItem value="Universidad">Universidad</SelectItem>
                </SelectGroup>
                <SelectGroup>
                  <SelectLabel>Primaria (Grados)</SelectLabel>
                  {levelsForFilter.filter(l => l.startsWith('Primaria -')).map(level => (
                    <SelectItem key={level} value={level}>{level}</SelectItem>
                  ))}
                </SelectGroup>
                <SelectGroup>
                  <SelectLabel>Secundaria (Grados)</SelectLabel>
                  {levelsForFilter.filter(l => l.startsWith('Secundaria -')).map(level => (
                    <SelectItem key={level} value={level}>{level}</SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
      </Card>

      {courses.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
          {courses.map((course, index) => (
            <CourseCard key={course.id} course={course} index={index} />
          ))}
        </div>
      ) : (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-16"
        >
          <BookOpen className="mx-auto h-20 w-20 text-muted-foreground/50 mb-6" />
          <h2 className="text-2xl font-semibold mb-3 text-foreground">No se encontraron cursos</h2>
          <p className="text-muted-foreground max-w-md mx-auto">
            Intenta ajustar tus filtros de búsqueda o revisa más tarde. ¡Estamos añadiendo nuevo contenido constantemente!
          </p>
          <Button variant="outline" className="mt-6" onClick={() => { setSearchTerm(''); setSelectedLevel('all'); setSelectedSubject('all');}}>
            Limpiar Filtros
          </Button>
        </motion.div>
      )}
    </motion.div>
  );
};

export default CoursesPage;
