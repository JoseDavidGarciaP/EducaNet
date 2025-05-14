
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Download, Share, Star, ThumbsUp, MessageSquare, Bookmark } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
import InteractiveElement from '@/components/InteractiveElement';
import resources from '@/data/resources';

const ResourcePage = () => {
  const { id } = useParams();
  const { toast } = useToast();
  const [resource, setResource] = useState(null);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [comments, setComments] = useState([
    { id: 1, user: 'María G.', avatar: 'teacher', text: 'Excelente recurso, lo he utilizado con mis estudiantes y les encantó.', date: '2 días atrás' },
    { id: 2, user: 'Carlos R.', avatar: 'parent', text: 'Muy útil para reforzar los conocimientos de mi hijo. Gracias por compartirlo.', date: '1 semana atrás' }
  ]);
  const [newComment, setNewComment] = useState('');
  
  // Obtener el recurso según el ID
  useEffect(() => {
    const foundResource = resources.find(r => r.id === id);
    if (foundResource) {
      setResource(foundResource);
    }
  }, [id]);
  
  // Manejar el envío de un nuevo comentario
  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (newComment.trim() === '') return;
    
    const newCommentObj = {
      id: comments.length + 1,
      user: 'Usuario',
      avatar: 'user',
      text: newComment,
      date: 'Ahora'
    };
    
    setComments([...comments, newCommentObj]);
    setNewComment('');
    
    toast({
      title: "Comentario enviado",
      description: "Tu comentario ha sido publicado correctamente.",
    });
  };
  
  // Manejar el guardado del recurso
  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
    
    toast({
      title: isBookmarked ? "Recurso eliminado de favoritos" : "Recurso guardado en favoritos",
      description: isBookmarked ? "El recurso ha sido eliminado de tu lista de favoritos." : "El recurso ha sido añadido a tu lista de favoritos.",
    });
  };
  
  // Manejar la descarga del recurso
  const handleDownload = () => {
    toast({
      title: "Descarga iniciada",
      description: "El recurso se está descargando.",
    });
  };
  
  // Manejar compartir el recurso
  const handleShare = () => {
    toast({
      title: "Enlace copiado",
      description: "El enlace del recurso ha sido copiado al portapapeles.",
    });
  };
  
  if (!resource) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <h2 className="text-2xl font-bold mb-4">Recurso no encontrado</h2>
        <p className="text-gray-600 mb-6">El recurso que estás buscando no existe o ha sido eliminado.</p>
        <Link to="/">
          <Button>Volver al inicio</Button>
        </Link>
      </div>
    );
  }
  
  // Determinar el color de fondo según la materia
  const getSubjectClass = () => {
    switch (resource.subject) {
      case 'matematicas':
        return 'math-color';
      case 'espanol':
        return 'spanish-color';
      case 'ciencias':
        return 'science-color';
      case 'ingles':
        return 'english-color';
      default:
        return 'bg-gradient-to-r from-gray-500 to-gray-600';
    }
  };
  
  // Obtener el nombre de la materia
  const getSubjectName = () => {
    switch (resource.subject) {
      case 'matematicas':
        return 'Matemáticas';
      case 'espanol':
        return 'Español';
      case 'ciencias':
        return 'Ciencias Naturales';
      case 'ingles':
        return 'Inglés';
      default:
        return 'Otra materia';
    }
  };

  return (
    <div>
      {/* Encabezado */}
      <div className={`${getSubjectClass()} rounded-xl p-6 mb-8`}>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
          <div>
            <Link to={`/${resource.subject}`} className="inline-flex items-center text-white/80 hover:text-white mb-4">
              <ArrowLeft className="h-4 w-4 mr-2" />
              <span>Volver a {getSubjectName()}</span>
            </Link>
            <h1 className="text-3xl font-bold text-white mb-2">{resource.title}</h1>
            <div className="flex items-center space-x-4 text-white/90">
              <span className="bg-white/20 px-3 py-1 rounded-full text-sm">
                {resource.type.charAt(0).toUpperCase() + resource.type.slice(1)}
              </span>
              <span className="bg-white/20 px-3 py-1 rounded-full text-sm">
                Nivel: {resource.level}
              </span>
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${
                      i < resource.rating ? 'text-yellow-300 fill-yellow-300' : 'text-white/30'
                    }`}
                  />
                ))}
                <span className="ml-1 text-sm">({resource.rating}.0)</span>
              </div>
            </div>
          </div>
          
          <div className="flex space-x-2 mt-4 md:mt-0">
            <Button 
              variant="outline" 
              size="sm" 
              className="bg-white/10 border-white/20 text-white hover:bg-white/20"
              onClick={handleShare}
            >
              <Share className="h-4 w-4 mr-2" />
              Compartir
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              className={`${isBookmarked ? 'bg-white/20' : 'bg-white/10'} border-white/20 text-white hover:bg-white/20`}
              onClick={handleBookmark}
            >
              <Bookmark className={`h-4 w-4 mr-2 ${isBookmarked ? 'fill-yellow-300' : ''}`} />
              {isBookmarked ? 'Guardado' : 'Guardar'}
            </Button>
          </div>
        </div>
      </div>
      
      {/* Contenido Principal */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          {/* Imagen del recurso */}
          <div className="mb-8 rounded-xl overflow-hidden shadow-lg">
            <img  
              className="w-full h-64 object-cover" 
              alt={`Imagen principal del recurso: ${resource.title}`}
             src="https://images.unsplash.com/photo-1495131783952-d12ca8c304a8" />
          </div>
          
          {/* Pestañas de contenido */}
          <Tabs defaultValue="descripcion" className="mb-8">
            <TabsList className="w-full grid grid-cols-3 mb-4">
              <TabsTrigger value="descripcion" className="text-center">Descripción</TabsTrigger>
              <TabsTrigger value="contenido" className="text-center">Contenido</TabsTrigger>
              <TabsTrigger value="comentarios" className="text-center">Comentarios ({comments.length})</TabsTrigger>
            </TabsList>
            
            <TabsContent value="descripcion" className="p-6 bg-white rounded-xl shadow-sm">
              <h2 className="text-xl font-bold mb-4">Descripción</h2>
              <p className="text-gray-700 mb-4">{resource.description}</p>
              <p className="text-gray-700">{resource.content}</p>
              
              <div className="mt-6 pt-6 border-t border-gray-200">
                <h3 className="text-lg font-semibold mb-3">Detalles del recurso</h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start">
                    <span className="font-medium w-32">Tipo:</span>
                    <span>{resource.type.charAt(0).toUpperCase() + resource.type.slice(1)}</span>
                  </li>
                  <li className="flex items-start">
                    <span className="font-medium w-32">Nivel:</span>
                    <span>{resource.level}</span>
                  </li>
                  <li className="flex items-start">
                    <span className="font-medium w-32">Materia:</span>
                    <span>{getSubjectName()}</span>
                  </li>
                  <li className="flex items-start">
                    <span className="font-medium w-32">Calificación:</span>
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < resource.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'
                          }`}
                        />
                      ))}
                      <span className="ml-1">({resource.rating}.0)</span>
                    </div>
                  </li>
                </ul>
              </div>
            </TabsContent>
            
            <TabsContent value="contenido" className="p-6 bg-white rounded-xl shadow-sm">
              <h2 className="text-xl font-bold mb-4">Contenido del recurso</h2>
              <p className="text-gray-700 mb-6">{resource.content}</p>
              
              {resource.type === 'video' && (
                <div className="aspect-w-16 aspect-h-9 mb-6 bg-gray-100 rounded-lg flex items-center justify-center">
                  <div className="text-center p-8">
                    <p className="text-gray-500 mb-4">Vista previa del video</p>
                    <Button>Reproducir video</Button>
                  </div>
                </div>
              )}
              
              {resource.type === 'documento' && (
                <div className="border border-gray-200 rounded-lg p-4 mb-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center">
                      <div className="bg-red-100 p-2 rounded-lg mr-3">
                        <span className="text-2xl">📄</span>
                      </div>
                      <div>
                        <p className="font-medium">{resource.title}.pdf</p>
                        <p className="text-sm text-gray-500">Documento PDF - 2.4 MB</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm" onClick={handleDownload}>
                      <Download className="h-4 w-4 mr-2" />
                      Descargar
                    </Button>
                  </div>
                </div>
              )}
              
              {resource.type === 'actividad' && (
                <div className="bg-purple-50 border border-purple-200 rounded-lg p-6 mb-6">
                  <h3 className="text-lg font-semibold mb-3">Instrucciones de la actividad</h3>
                  <ol className="list-decimal pl-5 space-y-2 text-gray-700 mb-4">
                    <li>Lee detenidamente el material proporcionado.</li>
                    <li>Completa los ejercicios siguiendo las indicaciones.</li>
                    <li>Verifica tus respuestas con las soluciones proporcionadas.</li>
                    <li>Si tienes dudas, consulta la sección de ayuda o deja un comentario.</li>
                  </ol>
                  <Button className="mt-2">Comenzar actividad</Button>
                </div>
              )}
              
              {resource.type === 'juego' && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-6">
                  <h3 className="text-lg font-semibold mb-3">Sobre el juego</h3>
                  <p className="text-gray-700 mb-4">Este juego educativo te permitirá aprender de forma divertida e interactiva. Pon a prueba tus conocimientos y compite por la mejor puntuación.</p>
                  <div className="flex justify-center">
                    <InteractiveElement type="pulse">
                      <Button className="bg-gradient-to-r from-green-500 to-teal-500">
                        Jugar ahora
                      </Button>
                    </InteractiveElement>
                  </div>
                </div>
              )}
              
              {resource.type === 'quiz' && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
                  <h3 className="text-lg font-semibold mb-3">Información del quiz</h3>
                  <ul className="space-y-2 text-gray-700 mb-4">
                    <li className="flex items-center">
                      <span className="font-medium w-32">Preguntas:</span>
                      <span>10 preguntas</span>
                    </li>
                    <li className="flex items-center">
                      <span className="font-medium w-32">Tiempo:</span>
                      <span>15 minutos</span>
                    </li>
                    <li className="flex items-center">
                      <span className="font-medium w-32">Dificultad:</span>
                      <span>Media</span>
                    </li>
                  </ul>
                  <Button className="bg-gradient-to-r from-blue-500 to-cyan-500">
                    Iniciar quiz
                  </Button>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="comentarios" className="p-6 bg-white rounded-xl shadow-sm">
              <h2 className="text-xl font-bold mb-4">Comentarios ({comments.length})</h2>
              
              {/* Formulario de comentario */}
              <form onSubmit={handleCommentSubmit} className="mb-6">
                <div className="border border-gray-200 rounded-lg overflow-hidden mb-2">
                  <textarea
                    placeholder="Escribe un comentario..."
                    className="w-full p-3 outline-none resize-none"
                    rows="3"
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                  ></textarea>
                </div>
                <div className="flex justify-end">
                  <Button type="submit" disabled={newComment.trim() === ''}>
                    Publicar comentario
                  </Button>
                </div>
              </form>
              
              {/* Lista de comentarios */}
              <div className="space-y-4">
                {comments.map((comment) => (
                  <motion.div
                    key={comment.id}
                    initial={comment.id === comments.length ? { opacity: 0, y: 20 } : false}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="border border-gray-100 rounded-lg p-4"
                  >
                    <div className="flex items-start">
                      <div className="w-10 h-10 rounded-full overflow-hidden mr-3 bg-gray-200 flex-shrink-0">
                        <img  
                          className="w-full h-full object-cover" 
                          alt={`Avatar de ${comment.user}`}
                         src="https://images.unsplash.com/photo-1652841190565-b96e0acbae17" />
                      </div>
                      <div className="flex-grow">
                        <div className="flex justify-between items-center mb-1">
                          <h4 className="font-semibold">{comment.user}</h4>
                          <span className="text-xs text-gray-500">{comment.date}</span>
                        </div>
                        <p className="text-gray-700">{comment.text}</p>
                        <div className="flex items-center mt-2 text-gray-500 text-sm">
                          <button className="flex items-center hover:text-blue-600">
                            <ThumbsUp className="h-4 w-4 mr-1" />
                            <span>Me gusta</span>
                          </button>
                          <span className="mx-2">•</span>
                          <button className="flex items-center hover:text-blue-600">
                            <MessageSquare className="h-4 w-4 mr-1" />
                            <span>Responder</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
        
        {/* Sidebar */}
        <div className="md:col-span-1">
          {/* Acciones */}
          <Card className="mb-6">
            <CardContent className="p-6">
              <h3 className="text-lg font-bold mb-4">Acciones</h3>
              <div className="space-y-3">
                <Button className="w-full" onClick={handleDownload}>
                  <Download className="h-4 w-4 mr-2" />
                  Descargar recurso
                </Button>
                <Button variant="outline" className="w-full" onClick={handleShare}>
                  <Share className="h-4 w-4 mr-2" />
                  Compartir
                </Button>
                <Button 
                  variant="outline" 
                  className={`w-full ${isBookmarked ? 'bg-purple-50 text-purple-700 border-purple-200' : ''}`}
                  onClick={handleBookmark}
                >
                  <Bookmark className={`h-4 w-4 mr-2 ${isBookmarked ? 'fill-purple-500' : ''}`} />
                  {isBookmarked ? 'Guardado' : 'Guardar'}
                </Button>
              </div>
            </CardContent>
          </Card>
          
          {/* Recursos relacionados */}
          <Card className="mb-6">
            <CardContent className="p-6">
              <h3 className="text-lg font-bold mb-4">Recursos relacionados</h3>
              <div className="space-y-4">
                {resources
                  .filter(r => r.subject === resource.subject && r.id !== resource.id)
                  .slice(0, 3)
                  .map(relatedResource => (
                    <Link key={relatedResource.id} to={`/recurso/${relatedResource.id}`}>
                      <div className="flex items-start hover:bg-gray-50 p-2 rounded-lg transition-colors">
                        <div className="w-16 h-16 rounded-lg overflow-hidden mr-3 bg-gray-100 flex-shrink-0">
                          <img  
                            className="w-full h-full object-cover" 
                            alt={`Miniatura de ${relatedResource.title}`}
                           src="https://images.unsplash.com/photo-1697923760477-1fc617f2b621" />
                        </div>
                        <div>
                          <h4 className="font-medium text-sm line-clamp-2">{relatedResource.title}</h4>
                          <p className="text-xs text-gray-500 mt-1">{relatedResource.type.charAt(0).toUpperCase() + relatedResource.type.slice(1)} • {relatedResource.level}</p>
                        </div>
                      </div>
                    </Link>
                  ))}
              </div>
              <div className="mt-4 pt-4 border-t border-gray-100">
                <Link to={`/${resource.subject}`} className="text-sm text-purple-600 hover:text-purple-800 font-medium flex items-center justify-center">
                  Ver más recursos de {getSubjectName()}
                </Link>
              </div>
            </CardContent>
          </Card>
          
          {/* Etiquetas */}
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-bold mb-4">Etiquetas</h3>
              <div className="flex flex-wrap gap-2">
                <span className="bg-purple-100 text-purple-800 text-xs px-3 py-1 rounded-full">
                  {getSubjectName()}
                </span>
                <span className="bg-blue-100 text-blue-800 text-xs px-3 py-1 rounded-full">
                  {resource.level}
                </span>
                <span className="bg-green-100 text-green-800 text-xs px-3 py-1 rounded-full">
                  {resource.type.charAt(0).toUpperCase() + resource.type.slice(1)}
                </span>
                {resource.subject === 'matematicas' && (
                  <>
                    <span className="bg-yellow-100 text-yellow-800 text-xs px-3 py-1 rounded-full">
                      Números
                    </span>
                    <span className="bg-orange-100 text-orange-800 text-xs px-3 py-1 rounded-full">
                      Ejercicios
                    </span>
                  </>
                )}
                {resource.subject === 'espanol' && (
                  <>
                    <span className="bg-yellow-100 text-yellow-800 text-xs px-3 py-1 rounded-full">
                      Lectura
                    </span>
                    <span className="bg-orange-100 text-orange-800 text-xs px-3 py-1 rounded-full">
                      Gramática
                    </span>
                  </>
                )}
                {resource.subject === 'ciencias' && (
                  <>
                    <span className="bg-yellow-100 text-yellow-800 text-xs px-3 py-1 rounded-full">
                      Experimentos
                    </span>
                    <span className="bg-orange-100 text-orange-800 text-xs px-3 py-1 rounded-full">
                      Naturaleza
                    </span>
                  </>
                )}
                {resource.subject === 'ingles' && (
                  <>
                    <span className="bg-yellow-100 text-yellow-800 text-xs px-3 py-1 rounded-full">
                      Vocabulario
                    </span>
                    <span className="bg-orange-100 text-orange-800 text-xs px-3 py-1 rounded-full">
                      Conversación
                    </span>
                  </>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ResourcePage;
