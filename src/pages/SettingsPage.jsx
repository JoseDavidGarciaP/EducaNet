
import React, { useContext, useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Settings as SettingsIcon, Palette, Bell, Shield, Lock, User, Trash2, DownloadCloud, FileText, MessageCircle, Languages as LanguageIcon, Search, Sun, Moon } from 'lucide-react'; // Importado SettingsIcon y otros iconos
import { ThemeContext } from '@/App';
import { useToast } from '@/components/ui/use-toast'; 

const SettingsPage = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const { toast } = useToast();

  const [notifications, setNotifications] = useState({
    emailNewCourse: true,
    emailAchievements: true,
    appReminders: false,
  });
  const [accessibility, setAccessibility] = useState({
    textSize: 'normal', 
    highContrast: false,
    textToSpeech: false,
  });
  const [language, setLanguage] = useState('es'); 

  const handleNotificationChange = (key) => {
    setNotifications(prev => ({ ...prev, [key]: !prev[key] }));
    toast({ title: "Configuración guardada", description: "Tus preferencias de notificación han sido actualizadas." });
  };
  
  const handleAccessibilityChange = (key, value) => {
    setAccessibility(prev => ({ ...prev, [key]: value }));
     toast({ title: "Configuración guardada", description: "Tus preferencias de accesibilidad han sido actualizadas." });
  };
  
  const handleLanguageChange = (value) => {
      setLanguage(value);
      toast({ title: "Idioma Cambiado", description: `El idioma ha sido cambiado a ${value === 'es' ? 'Español' : value === 'en' ? 'Inglés' : 'Portugués'}.`});
  }

  const settingsSections = [
    {
      id: 'appearance',
      title: 'Apariencia',
      icon: <Palette className="h-5 w-5 mr-2" />,
      content: (
        <>
          <div className="flex items-center justify-between">
            <Label htmlFor="theme-switch" className="flex flex-col space-y-1">
              <span>Tema ({theme === 'light' ? 'Claro' : 'Oscuro'})</span>
              <span className="font-normal leading-snug text-muted-foreground">
                Alterna entre el tema claro y oscuro para la interfaz.
              </span>
            </Label>
            <Button onClick={toggleTheme} variant="outline" size="icon" aria-label="Toggle theme">
              {theme === 'light' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
            </Button>
          </div>
           <div className="space-y-1.5">
            <Label htmlFor="language-select">Idioma</Label>
            <Select value={language} onValueChange={handleLanguageChange}>
              <SelectTrigger id="language-select" className="w-full md:w-[200px]">
                <SelectValue placeholder="Selecciona idioma" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="es">Español</SelectItem>
                <SelectItem value="en">English</SelectItem>
                <SelectItem value="pt">Português</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </>
      ),
    },
    {
      id: 'notifications',
      title: 'Notificaciones',
      icon: <Bell className="h-5 w-5 mr-2" />,
      content: (
        <>
          <div className="flex items-center justify-between">
            <Label htmlFor="email-new-course" className="flex flex-col space-y-1"><span>Nuevos Cursos por Email</span><span className="text-xs text-muted-foreground">Recibe un email cuando haya nuevos cursos disponibles.</span></Label>
            <Switch id="email-new-course" checked={notifications.emailNewCourse} onCheckedChange={() => handleNotificationChange('emailNewCourse')} />
          </div>
          <div className="flex items-center justify-between">
             <Label htmlFor="email-achievements" className="flex flex-col space-y-1"><span>Logros por Email</span><span className="text-xs text-muted-foreground">Recibe un email cuando desbloquees un logro.</span></Label>
            <Switch id="email-achievements" checked={notifications.emailAchievements} onCheckedChange={() => handleNotificationChange('emailAchievements')} />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="app-reminders" className="flex flex-col space-y-1"><span>Recordatorios en la App</span><span className="text-xs text-muted-foreground">Recibe notificaciones push para recordatorios.</span></Label>
            <Switch id="app-reminders" checked={notifications.appReminders} onCheckedChange={() => handleNotificationChange('appReminders')} />
          </div>
        </>
      ),
    },
    {
      id: 'accessibility',
      title: 'Accesibilidad',
      icon: <Search className="h-5 w-5 mr-2" />, 
      content: (
        <>
          <div className="space-y-1.5">
            <Label htmlFor="text-size">Tamaño del Texto</Label>
            <Select value={accessibility.textSize} onValueChange={(val) => handleAccessibilityChange('textSize', val)}>
              <SelectTrigger id="text-size" className="w-full md:w-[200px]"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="normal">Normal</SelectItem>
                <SelectItem value="large">Grande</SelectItem>
                <SelectItem value="extra-large">Extra Grande</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="high-contrast" className="flex flex-col space-y-1"><span>Alto Contraste</span><span className="text-xs text-muted-foreground">Mejora la visibilidad de los elementos.</span></Label>
            <Switch id="high-contrast" checked={accessibility.highContrast} onCheckedChange={(val) => handleAccessibilityChange('highContrast', Boolean(val))} />
          </div>
           <div className="flex items-center justify-between">
            <Label htmlFor="text-to-speech" className="flex flex-col space-y-1"><span>Texto a Voz (Lectura en Voz Alta)</span><span className="text-xs text-muted-foreground">Activa la lectura de contenido en voz alta.</span></Label>
            <Switch id="text-to-speech" checked={accessibility.textToSpeech} onCheckedChange={(val) => handleAccessibilityChange('textToSpeech', Boolean(val))} />
          </div>
        </>
      ),
    },
    {
      id: 'account',
      title: 'Cuenta',
      icon: <User className="h-5 w-5 mr-2" />,
      content: (
        <>
          <div className="space-y-1.5">
            <Label htmlFor="current-password">Contraseña Actual</Label>
            <Input id="current-password" type="password" />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="new-password">Nueva Contraseña</Label>
            <Input id="new-password" type="password" />
          </div>
           <Button className="w-full md:w-auto"><Lock className="mr-2 h-4 w-4"/>Cambiar Contraseña</Button>
          <div className="border-t border-destructive/20 pt-4 mt-4">
             <h4 className="text-destructive font-semibold mb-2">Zona Peligrosa</h4>
             <Button variant="destructive" className="w-full md:w-auto"><Trash2 className="mr-2 h-4 w-4"/>Eliminar Cuenta</Button>
             <p className="text-xs text-muted-foreground mt-1">Esta acción es irreversible y eliminará todos tus datos.</p>
          </div>
        </>
      ),
    },
    {
        id: 'data',
        title: 'Datos y Privacidad',
        icon: <Shield className="h-5 w-5 mr-2" />,
        content: (
             <>
                <Button variant="outline" className="w-full md:w-auto flex items-center justify-start"><DownloadCloud className="mr-2 h-4 w-4"/>Descargar mis datos</Button>
                <Button variant="link" className="text-primary p-0 h-auto"><FileText className="mr-2 h-4 w-4"/>Ver Política de Privacidad</Button>
                <Button variant="link" className="text-primary p-0 h-auto"><MessageCircle className="mr-2 h-4 w-4"/>Contactar Soporte</Button>
             </>
        )
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-8"
    >
      <Card className="shadow-lg">
        <CardHeader className="bg-gradient-to-r from-primary to-purple-600 text-primary-foreground p-6 rounded-t-lg">
          <CardTitle className="text-3xl flex items-center"><SettingsIcon className="h-8 w-8 mr-3"/>Configuración General</CardTitle>
          <CardDescription className="text-primary-foreground/80">Personaliza tu experiencia en EduDivertido.</CardDescription>
        </CardHeader>
      </Card>

      {settingsSections.map(section => (
        <motion.div 
          key={section.id}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: 0.1 * settingsSections.indexOf(section) }}
        >
          <Card className="shadow-md">
            <CardHeader>
              <CardTitle className="flex items-center text-xl text-primary">
                {section.icon}
                {section.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {section.content}
            </CardContent>
             <CardFooter className="border-t px-6 py-4 bg-muted/20">
                <p className="text-xs text-muted-foreground">Los cambios se guardan automáticamente al modificar una opción.</p>
            </CardFooter>
          </Card>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default SettingsPage;
