
import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Award, CheckCircle, Lock } from 'lucide-react';

// Datos de ejemplo de logros
const achievementsList = [
  { id: 'ach001', name: 'Pionero del Saber', description: 'Completa tu primer curso.', icon: '🎓', points: 100, unlocked: true, date: '2025-03-15' },
  { id: 'ach002', name: 'Maestro de Módulos', description: 'Completa 10 módulos.', icon: '📚', points: 250, unlocked: true, date: '2025-04-01' },
  { id: 'ach003', name: 'Velocista del Aprendizaje', description: 'Completa un curso en menos de 7 días.', icon: '🚀', points: 500, unlocked: false },
  { id: 'ach004', name: 'Coleccionista de Estrellas', description: 'Obtén 5 estrellas en 5 quizzes.', icon: '🌟', points: 300, unlocked: true, date: '2025-04-20' },
  { id: 'ach005', name: 'Participante Activo', description: 'Publica 10 comentarios en foros.', icon: '💬', points: 150, unlocked: false },
  { id: 'ach006', name: 'Gurú de la Gramática', description: 'Completa todos los niveles de Español.', icon: '✍️', points: 750, unlocked: false },
  { id: 'ach007', name: 'Explorador Científico', description: 'Completa 5 experimentos de Ciencias.', icon: '🔬', points: 400, unlocked: true, date: '2025-05-01' },
  { id: 'ach008', name: 'Políglota Prometedor', description: 'Inicia cursos en 2 idiomas.', icon: '🗣️', points: 200, unlocked: false },
];

const AchievementsPage = () => {
  const unlockedAchievements = achievementsList.filter(ach => ach.unlocked);
  const lockedAchievements = achievementsList.filter(ach => !ach.unlocked);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const AchievementCard = ({ achievement }) => (
    <motion.div variants={itemVariants}>
      <Card className={`overflow-hidden h-full flex flex-col ${achievement.unlocked ? 'border-green-500/50 bg-green-500/5 dark:bg-green-500/10' : 'border-border bg-muted/30 dark:bg-muted/10 opacity-70'}`}>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 pt-4 px-4">
          <CardTitle className={`text-sm font-medium ${achievement.unlocked ? 'text-green-700 dark:text-green-400' : 'text-muted-foreground'}`}>
            {achievement.name}
          </CardTitle>
          {achievement.unlocked ? 
            <CheckCircle className="h-5 w-5 text-green-500" /> :
            <Lock className="h-5 w-5 text-muted-foreground" />
          }
        </CardHeader>
        <CardContent className="px-4 pb-4 flex-grow flex flex-col">
          <div className="text-6xl text-center py-4">{achievement.icon}</div>
          <p className="text-xs text-muted-foreground text-center flex-grow">{achievement.description}</p>
          <div className="mt-3 pt-3 border-t border-border/50 text-center">
            <span className={`text-xs font-semibold ${achievement.unlocked ? 'text-green-600 dark:text-green-500' : 'text-muted-foreground'}`}>
              {achievement.points} Puntos
            </span>
            {achievement.unlocked && achievement.date && (
              <p className="text-xs text-muted-foreground">Desbloqueado: {achievement.date}</p>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );

  return (
    <motion.div 
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="space-y-8"
    >
      <Card className="shadow-lg">
        <CardHeader className="bg-gradient-to-r from-primary to-purple-600 text-primary-foreground p-6 rounded-t-lg">
          <div className="flex items-center space-x-3">
            <Award className="h-10 w-10" />
            <div>
              <CardTitle className="text-3xl">Mis Logros</CardTitle>
              <CardDescription className="text-primary-foreground/80">¡Celebra tu progreso y dedicación!</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <p className="text-muted-foreground mb-6">
            Has desbloqueado <span className="font-bold text-primary">{unlockedAchievements.length}</span> de <span className="font-bold">{achievementsList.length}</span> logros. ¡Sigue aprendiendo para conseguir todos!
          </p>

          {unlockedAchievements.length > 0 && (
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 text-green-600 dark:text-green-400">Logros Desbloqueados</h2>
              <motion.div 
                variants={containerVariants} 
                className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
              >
                {unlockedAchievements.map(ach => <AchievementCard key={ach.id} achievement={ach} />)}
              </motion.div>
            </section>
          )}

          {lockedAchievements.length > 0 && (
            <section>
              <h2 className="text-2xl font-semibold mb-4 text-muted-foreground">Logros por Desbloquear</h2>
              <motion.div 
                variants={containerVariants}
                className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
              >
                {lockedAchievements.map(ach => <AchievementCard key={ach.id} achievement={ach} />)}
              </motion.div>
            </section>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default AchievementsPage;
