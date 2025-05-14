
import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { CalendarDays, PlusCircle, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const CalendarPage = () => {
  const today = new Date();
  const daysInMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1).getDay();
  
  // Placeholder para eventos (en una app real, esto vendría de una API o estado global)
  const events = [
    { date: new Date(today.getFullYear(), today.getMonth(), 3), title: "Entrega Proyecto Matemáticas", color: "bg-purple-500" },
    { date: new Date(today.getFullYear(), today.getMonth(), 10), title: "Examen de Ciencias", color: "bg-green-500" },
    { date: new Date(today.getFullYear(), today.getMonth(), 15), title: "Sesión en vivo: Inglés Avanzado", color: "bg-blue-500" },
    { date: new Date(today.getFullYear(), today.getMonth(), 22), title: "Recordatorio: Quiz Español", color: "bg-red-500" },
  ];

  const renderDays = () => {
    const dayElements = [];
    // Espacios vacíos para los días antes del primero del mes
    for (let i = 0; i < firstDayOfMonth; i++) {
      dayElements.push(<div key={`empty-${i}`} className="border border-border/30 rounded-md p-2 h-24"></div>);
    }
    // Días del mes
    for (let day = 1; day <= daysInMonth; day++) {
      const currentDate = new Date(today.getFullYear(), today.getMonth(), day);
      const dayEvents = events.filter(event => event.date.toDateString() === currentDate.toDateString());
      const isToday = currentDate.toDateString() === new Date().toDateString();

      dayElements.push(
        <div 
          key={day} 
          className={`border border-border/30 rounded-md p-2 h-28 flex flex-col relative transition-all hover:shadow-lg hover:scale-105 ${isToday ? 'bg-primary/10 border-primary' : 'bg-card/50'}`}
        >
          <span className={`font-semibold ${isToday ? 'text-primary' : 'text-foreground'}`}>{day}</span>
          <div className="mt-1 space-y-1 overflow-y-auto text-xs">
            {dayEvents.map(event => (
              <div key={event.title} className={`p-1 rounded text-white ${event.color} truncate text-[10px]`}>
                {event.title}
              </div>
            ))}
          </div>
        </div>
      );
    }
    return dayElements;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto py-8 px-4"
    >
      <Card className="shadow-xl overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-primary via-purple-500 to-pink-500 text-primary-foreground p-6">
          <div className="flex justify-between items-center">
            <div>
                <CardTitle className="text-3xl font-bold flex items-center">
                <CalendarDays className="mr-3 h-8 w-8" /> Calendario Académico
                </CardTitle>
                <CardDescription className="text-primary-foreground/80 mt-1">
                Organiza tus tareas, eventos y sesiones en vivo.
                </CardDescription>
            </div>
            <Button variant="secondary" className="bg-white/20 hover:bg-white/30 text-white">
                <PlusCircle className="mr-2 h-5 w-5" /> Añadir Evento
            </Button>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <div className="flex justify-between items-center mb-6">
            <Button variant="outline"><ChevronLeft className="mr-2 h-4 w-4" /> Mes Anterior</Button>
            <h2 className="text-xl font-semibold text-foreground">
              {today.toLocaleString('es-ES', { month: 'long', year: 'numeric' }).replace(/^\w/, c => c.toUpperCase())}
            </h2>
            <Button variant="outline">Mes Siguiente <ChevronRight className="ml-2 h-4 w-4" /></Button>
          </div>
          
          <div className="grid grid-cols-7 gap-1 text-center font-medium text-muted-foreground mb-2 text-sm">
            <div>Dom</div>
            <div>Lun</div>
            <div>Mar</div>
            <div>Mié</div>
            <div>Jue</div>
            <div>Vie</div>
            <div>Sáb</div>
          </div>
          <div className="grid grid-cols-7 gap-2">
            {renderDays()}
          </div>
        </CardContent>
      </Card>

      <Card className="mt-8 shadow-lg">
        <CardHeader>
            <CardTitle className="text-xl">Próximos Eventos</CardTitle>
            <CardDescription>Un vistazo rápido a tus actividades programadas.</CardDescription>
        </CardHeader>
        <CardContent>
            {events.filter(e => e.date >= today).sort((a,b) => a.date - b.date).slice(0,3).map(event => (
                <div key={event.title} className={`flex items-center p-3 mb-2 rounded-md border-l-4 ${event.color.replace('bg-', 'border-')}`}>
                    <div className={`w-3 h-3 rounded-full mr-3 ${event.color}`}></div>
                    <div>
                        <p className="font-medium text-foreground">{event.title}</p>
                        <p className="text-xs text-muted-foreground">{event.date.toLocaleDateString('es-ES', { weekday: 'long', day: 'numeric', month: 'long' })}</p>
                    </div>
                </div>
            ))}
            {events.filter(e => e.date >= today).length === 0 && (
                <p className="text-muted-foreground text-sm">No tienes eventos próximos en el calendario.</p>
            )}
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default CalendarPage;
