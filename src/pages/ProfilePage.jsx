
import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import { Edit3, Save, Award, BookOpen, BarChart3, Shield, Camera, Settings, Palette, Lock } from 'lucide-react';
import { ThemeContext } from '@/App';

// Placeholder para datos del usuario y progreso
const initialUserData = {
  name: 'Alex Doe',
  email: 'alex.doe@example.com',
  avatarUrl: 'https://avatar.vercel.sh/alex.png',
  bio: 'Apasionado por el aprendizaje continuo y la tecnología. Explorando el universo del conocimiento, un curso a la vez.',
  level: 12,
  points: 12580,
  coursesCompleted: 8,
  achievementsUnlocked: 15,
};

const progressData = [
  { date: '2025-04-20', activity: 'Completó el módulo "Introducción al Álgebra"' },
  { date: '2025-04-22', activity: 'Ganó el logro "Mente Matemática"' },
  { date: '2025-04-25', activity: 'Vio 5 videos de "Historia Universal"' },
  { date: '2025-05-01', activity: 'Completó el quiz "Capitales del Mundo" con 90%' },
  { date: '2025-05-05', activity: 'Subió al Nivel 12' },
];

const achievementsData = [
  { id: 1, name: "Primeros Pasos", description: "Completa tu primer lección.", icon: "👣", unlocked: true },
  { id: 2, name: "Mente Curiosa", description: "Explora 3 materias diferentes.", icon: "🧠", unlocked: true },
  { id: 3, name: "Maratón de Videos", description: "Mira 10 videos educativos.", icon: "🎬", unlocked: false },
  { id: 4, name: "Rey del Quiz", description: "Obtén 100% en un quiz.", icon: "👑", unlocked: true },
];


const ProfilePage = ({ user: propUser }) => {
  const currentUser = propUser || initialUserData; // Usa el usuario de props o el de placeholder
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState(currentUser);
  const [avatarFile, setAvatarFile] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(currentUser.avatarUrl);
  const { theme, toggleTheme } = useContext(ThemeContext); // Agregado toggleTheme

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData(prev => ({ ...prev, [name]: value }));
  };

  const handleAvatarChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setAvatarFile(file);
      setAvatarPreview(URL.createObjectURL(file));
    }
  };

  const handleSave = () => {
    // Aquí iría la lógica para guardar los datos del usuario y el avatar
    // Por ejemplo, subir el avatar a un servicio de almacenamiento y actualizar la BD
    console.log("Datos guardados:", userData);
    if (avatarFile) {
      console.log("Nuevo avatar:", avatarFile.name);
      // Simular actualización de avatarUrl
      // setUserData(prev => ({...prev, avatarUrl: avatarPreview})); 
    }
    setIsEditing(false);
    // Podrías mostrar un toast de éxito aquí
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-8"
    >
      {/* Encabezado del Perfil */}
      <Card className="overflow-hidden shadow-xl glassmorphism">
        <CardHeader className={`p-6 md:p-8 bg-gradient-to-br ${theme === 'dark' ? 'from-slate-800 to-purple-900' : 'from-purple-100 via-indigo-100 to-pink-100'} `}>
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="relative group">
              <Avatar className="h-32 w-32 md:h-40 md:w-40 border-4 border-background shadow-lg">
                <AvatarImage src={avatarPreview} alt={userData.name} />
                <AvatarFallback className="text-5xl">{userData.name ? userData.name.charAt(0).toUpperCase() : 'U'}</AvatarFallback>
              </Avatar>
              {isEditing && (
                <label htmlFor="avatarUpload" className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-full cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity">
                  <Camera className="h-8 w-8 text-white" />
                  <input id="avatarUpload" type="file" accept="image/*" className="sr-only" onChange={handleAvatarChange} />
                </label>
              )}
            </div>
            <div className="text-center md:text-left">
              {isEditing ? (
                <Input name="name" value={userData.name} onChange={handleInputChange} className="text-3xl font-bold mb-1 w-full md:w-auto bg-transparent border-primary" />
              ) : (
                <h1 className="text-3xl md:text-4xl font-bold text-primary">{userData.name}</h1>
              )}
              <p className="text-muted-foreground">{userData.email}</p>
              {isEditing ? (
                <textarea name="bio" value={userData.bio} onChange={handleInputChange} rows="3" className="mt-2 text-sm text-foreground/80 w-full p-2 rounded-md bg-transparent border border-input focus:border-primary resize-none" placeholder="Cuéntanos sobre ti..."></textarea>
              ) : (
                <p className="mt-2 text-sm text-foreground/80 max-w-xl">{userData.bio}</p>
              )}
              <div className="mt-4 flex flex-wrap gap-4 justify-center md:justify-start">
                <div className="flex items-center space-x-1.5 p-2 bg-primary/10 rounded-lg">
                  <Award className="h-5 w-5 text-primary" /> 
                  <span className="text-sm font-medium text-primary">Nivel {userData.level}</span>
                </div>
                <div className="flex items-center space-x-1.5 p-2 bg-secondary/10 rounded-lg">
                   <BarChart3 className="h-5 w-5 text-secondary" /> 
                   <span className="text-sm font-medium text-secondary">{userData.points} Puntos</span>
                </div>
              </div>
            </div>
            <div className="md:ml-auto">
              {isEditing ? (
                <Button onClick={handleSave} className="btn-primary"><Save className="mr-2 h-4 w-4" />Guardar Cambios</Button>
              ) : (
                <Button variant="outline" onClick={() => setIsEditing(true)}><Edit3 className="mr-2 h-4 w-4" />Editar Perfil</Button>
              )}
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Pestañas de Contenido */}
      <Tabs defaultValue="progreso" className="w-full">
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 gap-2 p-1.5 bg-muted rounded-xl">
          <TabsTrigger value="progreso" className="py-2.5 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-lg rounded-lg transition-all">
            <BarChart3 className="mr-2 h-4 w-4" />Progreso
          </TabsTrigger>
          <TabsTrigger value="cursos" className="py-2.5 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-lg rounded-lg transition-all">
            <BookOpen className="mr-2 h-4 w-4" />Mis Cursos
          </TabsTrigger>
          <TabsTrigger value="logros" className="py-2.5 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-lg rounded-lg transition-all">
            <Award className="mr-2 h-4 w-4" />Logros
          </TabsTrigger>
          <TabsTrigger value="configuracion" className="py-2.5 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-lg rounded-lg transition-all">
            <Settings className="mr-2 h-4 w-4" />Configuración
          </TabsTrigger>
        </TabsList>

        <TabsContent value="progreso" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Historial de Progreso</CardTitle>
              <CardDescription>Tu línea de tiempo de actividades y logros recientes.</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-4">
                {progressData.map((item, index) => (
                  <li key={index} className="flex items-start space-x-3 pb-3 border-b border-border last:border-b-0">
                    <div className={`mt-1 flex-shrink-0 h-3 w-3 rounded-full ${index === 0 ? 'bg-primary animate-ping' : 'bg-muted-foreground/50'}`}></div>
                    <div>
                      <p className="text-sm text-muted-foreground">{item.date}</p>
                      <p className="font-medium text-foreground">{item.activity}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="cursos" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Mis Cursos ({userData.coursesCompleted})</CardTitle>
              <CardDescription>Cursos en los que estás inscrito o has completado.</CardDescription>
            </CardHeader>
            <CardContent>
              {/* Placeholder para lista de cursos */}
              <div className="text-center py-8 text-muted-foreground">
                <BookOpen className="mx-auto h-12 w-12 mb-2" />
                <p>Aún no te has inscrito a ningún curso.</p>
                <Button asChild variant="link" className="text-primary mt-2">
                  <Link to="/cursos">Explorar cursos</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="logros" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Logros Desbloqueados ({achievementsData.filter(a=>a.unlocked).length}/{achievementsData.length})</CardTitle>
              <CardDescription>¡Todas tus medallas y reconocimientos!</CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {achievementsData.map(ach => (
                <Card key={ach.id} className={`p-4 flex items-center space-x-3 ${ach.unlocked ? 'bg-green-500/10 border-green-500/30' : 'bg-muted/50 border-border opacity-70'}`}>
                  <span className={`text-3xl ${ach.unlocked ? '' : 'grayscale'}`}>{ach.icon}</span>
                  <div>
                    <h4 className={`font-semibold ${ach.unlocked ? 'text-green-700 dark:text-green-400' : 'text-muted-foreground'}`}>{ach.name}</h4>
                    <p className="text-xs text-muted-foreground">{ach.description}</p>
                  </div>
                </Card>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="configuracion" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Configuración de la Cuenta</CardTitle>
              <CardDescription>Administra tus preferencias y seguridad.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="theme-toggle">Tema de la Interfaz</Label>
                 <Button variant="outline" onClick={toggleTheme} className="w-full md:w-auto flex items-center justify-start">
                  <Palette className="mr-2 h-4 w-4"/> Cambiar a Tema {theme === 'light' ? 'Oscuro' : 'Claro'}
                </Button>
              </div>
              <div className="space-y-2">
                <Label htmlFor="passwordChange">Cambiar Contraseña</Label>
                <Button variant="outline" className="w-full md:w-auto flex items-center justify-start"><Lock className="mr-2 h-4 w-4"/>Cambiar Contraseña</Button>
              </div>
               <div className="space-y-2">
                <Label>Notificaciones</Label>
                <div className="flex items-center space-x-2">
                  <Checkbox id="emailNotifications" />
                  <Label htmlFor="emailNotifications" className="font-normal">Recibir notificaciones por correo</Label>
                </div>
                 <div className="flex items-center space-x-2">
                  <Checkbox id="appNotifications" />
                  <Label htmlFor="appNotifications" className="font-normal">Recibir notificaciones en la app</Label>
                </div>
              </div>
              <div className="space-y-2">
                <Label>Privacidad</Label>
                <Button variant="outline" className="w-full md:w-auto flex items-center justify-start"><Shield className="mr-2 h-4 w-4"/>Administrar Privacidad</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </motion.div>
  );
};

export default ProfilePage;
