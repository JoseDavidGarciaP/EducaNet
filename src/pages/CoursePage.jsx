
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { BookOpen, Users, Clock, BarChart2, Star, PlayCircle, Download, MessageSquare } from 'lucide-react';
import resources from '@/data/resources'; // Usaremos esto para simular datos de cursos/lecciones

// Simular datos de un curso específico
const getCourseData = (courseId) => {
  // En una app real, esto vendría de una API o de datos más estructurados de cursos
  // Aquí, solo tomamos un recurso como base para el curso
  const baseResource = resources.find(r => r.id.startsWith(courseId.split('-')[0])) || resources[0];
  return {
    id: courseId,
    title: `Curso Avanzado de ${baseResource.subject.charAt(0).toUpperCase() + baseResource.subject.slice(1)}`,
    description: `Un curso completo para dominar ${baseResource.subject}. Aprende desde los fundamentos hasta técnicas avanzadas con proyectos prácticos y quizzes interactivos. Ideal para estudiantes de ${baseResource.level}.`,
    instructor: { name: 'Dr. Expert Educador', avatarUrl: 'https://avatar.vercel.sh/expert.png', bio: 'Más de 10 años enseñando y apasionado por la educación digital.' },
    modules: [
      { id: 'mod1', title: 'Introducción y Fundamentos', lessons: [{ id: 'lec1a', title: 'Conceptos Clave', duration: '15 min' }, { id: 'lec1b', title: 'Historia y Evolución', duration: '22 min' }] },
      { id: 'mod2', title: 'Técnicas Intermedias', lessons: [{ id: 'lec2a', title: 'Aplicaciones Prácticas', duration: '30 min' }, { id: 'lec2b', title: 'Estudio de Casos', duration: '25 min' }] },
      { id: 'mod3', title: 'Nivel Avanzado y Proyectos', lessons: [{ id: 'lec3a', title: 'Desarrollo de Proyecto Final', duration: '1h 15min' }, { id: 'lec3b', title: 'Evaluación y Futuro', duration: '40 min' }] },
    ],
    students: 1234,
    duration: '8 semanas',
    level: baseResource.level,
    rating: 4.8,
    totalLessons: 6, // Suma de todas las lecciones
    coverImage: 'https://images.unsplash.com/photo-1516321497487-e288fb19713f', // Placeholder
  };
};


const CoursePage = () => {
  const { courseId } = useParams();
  const course = getCourseData(courseId); // En una app real, harías fetch de los datos del curso

  if (!course) {
    return <div>Curso no encontrado.</div>; // O una página de error más elaborada
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-8"
    >
      {/* Encabezado del Curso */}
      <Card className="overflow-hidden shadow-xl">
        <div className="relative h-64 md:h-80 w-full">
          <img  src={course.coverImage} alt={`Portada del curso ${course.title}`} class="absolute inset-0 w-full h-full object-cover"  src="https://images.unsplash.com/photo-1582899073834-368dbc6ffb1e" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
          <div className="absolute bottom-0 left-0 p-6 md:p-8">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">{course.title}</h1>
            <div className="flex items-center space-x-2 text-sm text-gray-200">
              <Star className="h-5 w-5 text-yellow-400 fill-yellow-400" />
              <span>{course.rating} / 5.0</span>
              <span>•</span>
              <Users className="h-4 w-4" />
              <span>{course.students} estudiantes</span>
              <span>•</span>
              <BookOpen className="h-4 w-4" />
              <span>{course.totalLessons} lecciones</span>
            </div>
          </div>
        </div>
        <CardContent className="p-6 md:p-8">
          <div className="grid md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <h2 className="text-2xl font-semibold text-primary mb-3">Descripción del Curso</h2>
              <p className="text-muted-foreground mb-6">{course.description}</p>
              
              <h3 className="text-xl font-semibold mb-3">Instructor</h3>
              <div className="flex items-center space-x-3 p-4 bg-muted/50 rounded-lg border">
                <Avatar className="h-16 w-16">
                  <AvatarImage src={course.instructor.avatarUrl} alt={course.instructor.name} />
                  <AvatarFallback>{course.instructor.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-semibold text-foreground">{course.instructor.name}</p>
                  <p className="text-xs text-muted-foreground">{course.instructor.bio}</p>
                </div>
              </div>
            </div>
            <div className="md:col-span-1 space-y-4">
              <Button size="lg" className="w-full btn-primary text-base">
                <PlayCircle className="mr-2 h-5 w-5"/> Inscribirse Ahora / Continuar Curso
              </Button>
              <Card className="bg-muted/30">
                <CardContent className="p-4 space-y-2 text-sm">
                  <div className="flex items-center"><Clock className="h-4 w-4 mr-2 text-primary"/> Duración: {course.duration}</div>
                  <div className="flex items-center"><BarChart2 className="h-4 w-4 mr-2 text-primary"/> Nivel: {course.level}</div>
                  <div className="flex items-center"><BookOpen className="h-4 w-4 mr-2 text-primary"/> {course.totalLessons} Lecciones en total</div>
                  <div className="flex items-center"><Download className="h-4 w-4 mr-2 text-primary"/> Materiales descargables</div>
                  <div className="flex items-center"><MessageSquare className="h-4 w-4 mr-2 text-primary"/> Acceso a foro de discusión</div>
                </CardContent>
              </Card>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Módulos y Lecciones */}
      <Card>
        <CardHeader>
          <CardTitle>Contenido del Curso</CardTitle>
          <CardDescription>Explora los módulos y lecciones.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {course.modules.map((module, moduleIndex) => (
            <div key={module.id} className="p-4 border rounded-lg bg-card">
              <h3 className="text-lg font-semibold text-primary mb-3">Módulo {moduleIndex + 1}: {module.title}</h3>
              <ul className="space-y-2">
                {module.lessons.map((lesson, lessonIndex) => (
                  <li key={lesson.id} className="flex justify-between items-center p-3 bg-muted/40 hover:bg-muted/70 rounded-md transition-colors">
                    <Link to={`/curso/${courseId}/leccion/${lesson.id}`} className="flex items-center space-x-2 group">
                      <PlayCircle className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                      <span className="text-sm text-foreground group-hover:text-primary transition-colors">Lección {lessonIndex + 1}: {lesson.title}</span>
                    </Link>
                    <span className="text-xs text-muted-foreground">{lesson.duration}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </CardContent>
      </Card>
      
      {/* Sección de Comentarios/Foro (Simplificada) */}
      <Card>
        <CardHeader>
            <CardTitle>Foro del Curso</CardTitle>
            <CardDescription>Discute con otros estudiantes e instructores.</CardDescription>
        </CardHeader>
        <CardContent>
            <div className="text-center text-muted-foreground py-6">
                <MessageSquare className="mx-auto h-10 w-10 mb-2"/>
                <p>El foro de discusión estará disponible pronto.</p>
            </div>
        </CardContent>
      </Card>

    </motion.div>
  );
};

export default CoursePage;
