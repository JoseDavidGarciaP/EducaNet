
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Users, MessageSquare, ThumbsUp, Send, Search } from 'lucide-react';

// Datos de ejemplo para foros y discusiones
const forumTopics = [
  { id: 'topic1', title: 'Dudas sobre Álgebra Lineal', posts: 25, lastPost: 'hace 2 horas', author: 'Ana Perez', category: 'Matemáticas' },
  { id: 'topic2', title: 'Mejores técnicas para aprender vocabulario en Inglés', posts: 42, lastPost: 'hace 55 minutos', author: 'John Doe', category: 'Inglés' },
  { id: 'topic3', title: 'Experimentos de Química en casa: ¡Ideas y seguridad!', posts: 18, lastPost: 'ayer', author: 'Sofia Chen', category: 'Ciencias' },
  { id: 'topic4', title: 'Análisis literario de "Cien Años de Soledad"', posts: 33, lastPost: 'hace 3 horas', author: 'Carlos Ruiz', category: 'Español' },
];

const initialPosts = [
    { id: 'post1', topicId: 'topic1', author: 'Carlos G.', avatarText: 'CG', text: 'Hola, estoy teniendo problemas con los vectores propios, ¿alguien podría ayudarme?', likes: 5, replies: 2, timestamp: 'hace 1h' },
    { id: 'post2', topicId: 'topic1', author: 'Laura M.', avatarText: 'LM', text: '¡Claro! ¿Qué parte específica no entiendes? Puedo intentar explicarlo.', likes: 3, replies: 0, timestamp: 'hace 45m' },
];

const CommunityPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [posts, setPosts] = useState(initialPosts);
  const [newPostText, setNewPostText] = useState('');

  const filteredTopics = forumTopics.filter(topic => 
    topic.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    topic.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handlePostSubmit = (e) => {
    e.preventDefault();
    if (!newPostText.trim() || !selectedTopic) return;
    const newPost = {
        id: `post${posts.length + 1}`,
        topicId: selectedTopic.id,
        author: 'Usuario Actual', // Simulado
        avatarText: 'UA',
        text: newPostText,
        likes: 0,
        replies: 0,
        timestamp: 'justo ahora'
    };
    setPosts(prev => [newPost, ...prev.filter(p => p.topicId === selectedTopic.id)]);
    setNewPostText('');
  };
  
  const topicPosts = selectedTopic ? posts.filter(p => p.topicId === selectedTopic.id) : [];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-8"
    >
      <Card className="shadow-lg">
        <CardHeader className="bg-gradient-to-r from-secondary to-teal-600 text-primary-foreground p-6 rounded-t-lg">
          <div className="flex items-center space-x-3">
            <Users className="h-10 w-10" />
            <div>
              <CardTitle className="text-3xl">Comunidad EducaNet</CardTitle>
              <CardDescription className="text-primary-foreground/80">Conéctate, comparte y aprende con otros estudiantes.</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <div className="mb-6 flex flex-col sm:flex-row gap-4">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input 
                type="text"
                placeholder="Buscar temas o categorías..."
                className="pl-10 w-full"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button className="btn-primary"><MessageSquare className="mr-2 h-4 w-4" />Nuevo Tema</Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Lista de Temas del Foro */}
            <div className="md:col-span-1 space-y-3 max-h-[600px] overflow-y-auto pr-2">
              {filteredTopics.length > 0 ? filteredTopics.map(topic => (
                <motion.div
                  key={topic.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card 
                    className={`hover:shadow-md transition-shadow cursor-pointer ${selectedTopic?.id === topic.id ? 'border-primary ring-2 ring-primary' : 'border-border'}`}
                    onClick={() => setSelectedTopic(topic)}
                  >
                    <CardContent className="p-4">
                      <h3 className="font-semibold text-primary mb-1">{topic.title}</h3>
                      <p className="text-xs text-muted-foreground">
                        <span className={`px-1.5 py-0.5 rounded-full text-xs mr-1 ${
                          topic.category === 'Matemáticas' ? 'bg-purple-100 text-purple-700' :
                          topic.category === 'Inglés' ? 'bg-blue-100 text-blue-700' :
                          topic.category === 'Ciencias' ? 'bg-green-100 text-green-700' :
                          'bg-red-100 text-red-700' // Español
                        }`}>{topic.category}</span>
                         • {topic.posts} mensajes • Último: {topic.lastPost} por {topic.author}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              )) : (
                 <p className="text-muted-foreground text-center py-4">No se encontraron temas.</p>
              )}
            </div>

            {/* Visualización de Tema Seleccionado y Posts */}
            <div className="md:col-span-2">
              {selectedTopic ? (
                <Card className="h-full flex flex-col">
                  <CardHeader>
                    <CardTitle className="text-xl text-primary">{selectedTopic.title}</CardTitle>
                    <CardDescription>Discusión sobre: {selectedTopic.category}</CardDescription>
                  </CardHeader>
                  <CardContent className="flex-grow space-y-4 overflow-y-auto max-h-[400px] pr-2">
                    {topicPosts.map(post => (
                      <div key={post.id} className="p-3 rounded-lg bg-muted/50 border border-border/70">
                        <div className="flex items-start space-x-3">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={`https://avatar.vercel.sh/${post.author}.png`} />
                            <AvatarFallback>{post.avatarText}</AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="flex items-center space-x-2">
                              <p className="font-semibold text-sm">{post.author}</p>
                              <p className="text-xs text-muted-foreground">{post.timestamp}</p>
                            </div>
                            <p className="text-sm mt-1">{post.text}</p>
                             <div className="flex items-center space-x-3 mt-2 text-xs">
                                <Button variant="ghost" size="xs" className="text-muted-foreground hover:text-primary p-1 h-auto">
                                    <ThumbsUp className="h-3.5 w-3.5 mr-1"/> {post.likes} Me gusta
                                </Button>
                                <Button variant="ghost" size="xs" className="text-muted-foreground hover:text-primary p-1 h-auto">
                                    <MessageSquare className="h-3.5 w-3.5 mr-1"/> {post.replies} Responder
                                </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                  <CardFooter className="border-t pt-4">
                    <form onSubmit={handlePostSubmit} className="w-full flex items-center gap-2">
                       <Avatar className="h-8 w-8 hidden sm:flex">
                            <AvatarImage src={`https://avatar.vercel.sh/currentUser.png`} />
                            <AvatarFallback>UA</AvatarFallback>
                        </Avatar>
                      <Input 
                        placeholder="Escribe tu comentario..." 
                        className="flex-grow"
                        value={newPostText}
                        onChange={(e) => setNewPostText(e.target.value)}
                      />
                      <Button type="submit" size="icon" className="btn-primary" disabled={!newPostText.trim()}>
                        <Send className="h-4 w-4" />
                      </Button>
                    </form>
                  </CardFooter>
                </Card>
              ) : (
                <div className="flex flex-col items-center justify-center h-full p-8 text-center bg-muted/30 rounded-lg border-2 border-dashed border-border">
                  <Users className="h-16 w-16 text-muted-foreground mb-4" />
                  <h3 className="text-xl font-semibold text-foreground">Selecciona un tema</h3>
                  <p className="text-muted-foreground">Elige un tema del foro para ver las discusiones o crea uno nuevo.</p>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default CommunityPage;
