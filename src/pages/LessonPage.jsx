
import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Progress } from '@/components/ui/progress';
import { Label } from '@/components/ui/label';
import { ChevronLeft, ChevronRight, BookOpen, Download, MessageSquare, CheckCircle, HelpCircle, Lightbulb } from 'lucide-react';
import resources from '@/data/resources';

const getLessonData = (courseId, lessonId) => {
  const baseResource = resources.find(r => r.id.startsWith(courseId.split('-')[0])) || resources[0];
  return {
    id: lessonId,
    courseId: courseId,
    title: `Lección Avanzada: ${lessonId.replace('lec', '')}`,
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    content: `Este es el contenido detallado de la lección sobre ${lessonId}. Aquí aprenderás conceptos avanzados y podrás aplicar tus conocimientos. ${baseResource.content}`,
    attachments: [
      { name: 'Presentacion_Leccion.pdf', url: '#' },
      { name: 'Ejercicios_Practicos.docx', url: '#' },
    ],
    quiz: {
      title: 'Quiz de Comprensión',
      questions: [
        { id: 'q1', text: '¿Cuál es el concepto principal de esta lección?', type: 'multiple-choice', options: ['Opción A', 'Opción B', 'Opción C', 'Opción D'], correctAnswer: 'Opción A' },
        { id: 'q2', text: 'Explica brevemente la aplicación práctica de este tema.', type: 'open-ended' },
      ]
    },
    prevLesson: lessonId === 'lec1a' ? null : 'lec1a',
    nextLesson: lessonId === 'lec3b' ? null : 'lec3b',
  };
};

const LessonPage = () => {
  const { courseId, lessonId } = useParams();
  const navigate = useNavigate();
  const lesson = getLessonData(courseId, lessonId);
  
  const [quizAnswers, setQuizAnswers] = useState({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [quizScore, setQuizScore] = useState(0);

  const handleQuizChange = (questionId, answer) => {
    setQuizAnswers(prev => ({ ...prev, [questionId]: answer }));
  };

  const handleQuizSubmit = () => {
    let score = 0;
    lesson.quiz.questions.forEach(q => {
      if (q.type === 'multiple-choice' && quizAnswers[q.id] === q.correctAnswer) {
        score++;
      }
    });
    const mcQuestionsCount = lesson.quiz.questions.filter(q => q.type === 'multiple-choice').length;
    setQuizScore(mcQuestionsCount > 0 ? (score / mcQuestionsCount) * 100 : 0);
    setQuizSubmitted(true);
  };

  if (!lesson) {
    return <div>Lección no encontrada.</div>;
  }
  
  const currentLessonIndex = parseInt(lessonId.replace(/\D/g,'')) -1 || 0;
  const totalLessonsInCourse = 6; 
  const courseProgress = ((currentLessonIndex + 1) / totalLessonsInCourse) * 100;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto py-8"
    >
      {/* Navegación y Progreso del Curso */}
      <Card className="mb-6 shadow-md">
        <CardContent className="p-4 flex flex-col sm:flex-row justify-between items-center gap-4">
          <Button variant="outline" onClick={() => navigate(`/curso/${courseId}`)} className="w-full sm:w-auto">
            <ChevronLeft className="mr-2 h-4 w-4" /> Volver al Curso
          </Button>
          <div className="w-full sm:w-1/2">
            <Label htmlFor="course-progress" className="text-sm text-muted-foreground mb-1 block">Progreso del Curso</Label>
            <Progress value={courseProgress} id="course-progress" aria-label={`Progreso del curso: ${courseProgress}%`} />
          </div>
          <div className="flex gap-2 w-full sm:w-auto">
            {lesson.prevLesson && (
              <Button variant="outline" onClick={() => navigate(`/curso/${courseId}/leccion/${lesson.prevLesson}`)} className="flex-1">
                <ChevronLeft className="mr-2 h-4 w-4" /> Anterior
              </Button>
            )}
            {lesson.nextLesson && (
              <Button variant="outline" onClick={() => navigate(`/curso/${courseId}/leccion/${lesson.nextLesson}`)} className="flex-1">
                Siguiente <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Contenido de la Lección */}
      <div className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="text-3xl text-primary">{lesson.title}</CardTitle>
            </CardHeader>
            <CardContent>
              {lesson.videoUrl && (
                <div className="aspect-video mb-6 rounded-lg overflow-hidden shadow-inner border">
                  <iframe
                    width="100%"
                    height="100%"
                    src={lesson.videoUrl}
                    title={`Video: ${lesson.title}`}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
              )}
              <Tabs defaultValue="contenido" className="w-full">
                <TabsList className="grid w-full grid-cols-3 mb-4">
                  <TabsTrigger value="contenido"><BookOpen className="mr-2 h-4 w-4 inline-block"/>Contenido</TabsTrigger>
                  <TabsTrigger value="quiz"><HelpCircle className="mr-2 h-4 w-4 inline-block"/>Quiz</TabsTrigger>
                  <TabsTrigger value="foro"><MessageSquare className="mr-2 h-4 w-4 inline-block"/>Foro</TabsTrigger>
                </TabsList>
                <TabsContent value="contenido">
                  <article className="prose dark:prose-invert max-w-none text-foreground/90 leading-relaxed" dangerouslySetInnerHTML={{ __html: lesson.content }} />
                </TabsContent>
                <TabsContent value="quiz">
                  <h3 className="text-xl font-semibold mb-4">{lesson.quiz.title}</h3>
                  {!quizSubmitted ? (
                    <form onSubmit={(e) => { e.preventDefault(); handleQuizSubmit(); }} className="space-y-4">
                      {lesson.quiz.questions.map(q => (
                        <div key={q.id} className="p-3 border rounded-md bg-muted/30">
                          <p className="font-medium mb-2">{q.text}</p>
                          {q.type === 'multiple-choice' && q.options.map(opt => (
                            <div key={opt} className="flex items-center space-x-2 mb-1">
                              <Checkbox
                                id={`${q.id}-${opt}`}
                                onCheckedChange={(checked) => checked && handleQuizChange(q.id, opt)}
                                checked={quizAnswers[q.id] === opt}
                              />
                              <Label htmlFor={`${q.id}-${opt}`} className="font-normal">{opt}</Label>
                            </div>
                          ))}
                          {q.type === 'open-ended' && (
                            <Textarea placeholder="Tu respuesta..." onChange={(e) => handleQuizChange(q.id, e.target.value)} />
                          )}
                        </div>
                      ))}
                      <Button type="submit" className="btn-primary">Enviar Quiz</Button>
                    </form>
                  ) : (
                    <div className="p-4 bg-green-500/10 border border-green-500/30 rounded-md text-green-700 dark:text-green-300">
                      <CheckCircle className="h-6 w-6 mr-2 inline-block"/>
                      ¡Quiz completado! Tu puntaje (opción múltiple): {quizScore.toFixed(0)}%
                      <Button variant="link" onClick={() => setQuizSubmitted(false)} className="ml-2 text-green-700 dark:text-green-300">Intentar de nuevo</Button>
                    </div>
                  )}
                </TabsContent>
                <TabsContent value="foro">
                  <div className="text-center text-muted-foreground py-8">
                    <MessageSquare className="mx-auto h-12 w-12 mb-2"/>
                    <p>El foro de discusión para esta lección estará disponible pronto.</p>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar de la Lección */}
        <div className="md:col-span-1 space-y-6">
          <Card className="shadow-md">
            <CardHeader>
              <CardTitle className="text-lg">Recursos Adicionales</CardTitle>
            </CardHeader>
            <CardContent>
              {lesson.attachments.length > 0 ? (
                <ul className="space-y-2">
                  {lesson.attachments.map(att => (
                    <li key={att.name}>
                      <Button variant="outline" asChild className="w-full justify-start">
                        <a href={att.url} download>
                          <Download className="mr-2 h-4 w-4"/> {att.name}
                        </a>
                      </Button>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-muted-foreground">No hay recursos adicionales para esta lección.</p>
              )}
            </CardContent>
          </Card>
          <Card className="shadow-md bg-yellow-500/10 border-yellow-500/30">
             <CardContent className="p-4">
                <div className="flex items-start space-x-3">
                    <Lightbulb className="h-6 w-6 text-yellow-600 dark:text-yellow-400 mt-1"/>
                    <div>
                        <h4 className="font-semibold text-yellow-700 dark:text-yellow-300">¡Consejo!</h4>
                        <p className="text-xs text-yellow-600 dark:text-yellow-400">Repasa los conceptos clave antes de tomar el quiz para mejores resultados.</p>
                    </div>
                </div>
             </CardContent>
          </Card>
        </div>
      </div>
    </motion.div>
  );
};

export default LessonPage;
