
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { ShieldQuestion, Lightbulb, FileText, Zap, Loader2 } from 'lucide-react';

const AiHelperPage = () => {
  const [query, setQuery] = useState('');
  const [response, setResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [suggestionType, setSuggestionType] = useState(null);

  const handleSubmitQuery = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    setIsLoading(true);
    setResponse('');
    setSuggestionType(null);

    // Simulación de llamada a API de IA
    await new Promise(resolve => setTimeout(resolve, 1500));

    let aiResponse = `Respuesta simulada para: "${query}".\n\n`;
    if (query.toLowerCase().includes("explicacion") || query.toLowerCase().includes("explícame")) {
      aiResponse += "Claro, puedo ayudarte con eso. Un concepto clave relacionado podría ser [CONCEPTO ALEATORIO]. Este se refiere a [DEFINICIÓN BREVE]. ¿Te gustaría profundizar en algún aspecto particular o ver un ejemplo?";
      setSuggestionType('explanation');
    } else if (query.toLowerCase().includes("recomienda") || query.toLowerCase().includes("sugiere")) {
      aiResponse += "Basado en tu progreso y dudas frecuentes, te recomiendo revisar la Lección X sobre [TEMA RELACIONADO] o el Módulo Y sobre [OTRO TEMA]. También podrías encontrar útil este recurso externo: [ENLACE SIMULADO].";
      setSuggestionType('recommendation');
    } else if (query.toLowerCase().includes("resumen") || query.toLowerCase().includes("resume")) {
      aiResponse += "Aquí tienes un resumen simulado del tema que mencionaste: [PUNTO CLAVE 1], [PUNTO CLAVE 2], [PUNTO CLAVE 3]. Este es un resumen conciso, si necesitas más detalles, no dudes en preguntar.";
      setSuggestionType('summary');
    } else {
      aiResponse += "Entendido. Estoy buscando la mejor información para tu consulta. Normalmente, te proporcionaría detalles específicos, ejemplos y recursos adicionales. Por ahora, esta es una respuesta genérica.";
      setSuggestionType(null);
    }
    
    setResponse(aiResponse);
    setIsLoading(false);
  };

  const quickActions = [
    { label: "Explícame un tema", queryPrefix: "Explícame en detalle sobre ", icon: <Lightbulb className="w-5 h-5 mr-2" />},
    { label: "Recomiéndame contenido", queryPrefix: "Recomiéndame contenido similar a ", icon: <Zap className="w-5 h-5 mr-2" />},
    { label: "Resume un texto", queryPrefix: "Resume el siguiente texto: ", icon: <FileText className="w-5 h-5 mr-2" />},
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto py-8 px-4"
    >
      <Card className="shadow-xl overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-sky-500 via-cyan-500 to-teal-500 text-white p-6">
          <div className="flex items-center space-x-3">
            <ShieldQuestion className="h-10 w-10" />
            <div>
              <CardTitle className="text-3xl font-bold">Asistente IA EducaNet</CardTitle>
              <CardDescription className="text-white/80 mt-1">
                Obtén ayuda personalizada, explicaciones y recomendaciones de contenido.
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <form onSubmit={handleSubmitQuery} className="space-y-6">
            <div>
              <Label htmlFor="ai-query" className="text-lg font-semibold mb-2 block text-foreground">¿En qué puedo ayudarte hoy?</Label>
              <Textarea
                id="ai-query"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Ej: Explícame la fotosíntesis, recomiéndame un curso de álgebra, resume este párrafo..."
                className="min-h-[120px] text-base focus:ring-primary"
                required
              />
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
                {quickActions.map(action => (
                    <Button 
                        key={action.label}
                        type="button" 
                        variant="outline" 
                        className="flex-1 justify-start"
                        onClick={() => setQuery(action.queryPrefix)}
                    >
                        {action.icon} {action.label}
                    </Button>
                ))}
            </div>
            <Button type="submit" className="w-full sm:w-auto btn-primary text-base py-3" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" /> Procesando...
                </>
              ) : (
                "Obtener Ayuda IA"
              )}
            </Button>
          </form>

          {response && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="mt-8 p-6 bg-muted/30 border border-border rounded-lg shadow"
            >
              <h3 className="text-xl font-semibold text-primary mb-3">Respuesta de la IA:</h3>
              <pre className="whitespace-pre-wrap text-foreground/90 text-sm leading-relaxed font-sans">{response}</pre>
              
              {suggestionType === 'explanation' && (
                <div className="mt-4 p-3 bg-yellow-500/10 border-l-4 border-yellow-500 rounded">
                    <Lightbulb className="inline mr-2 h-5 w-5 text-yellow-600"/>
                    <span className="text-sm text-yellow-700">¿Quieres que te muestre ejemplos o recursos relacionados con este tema?</span>
                </div>
              )}
               {suggestionType === 'recommendation' && (
                <div className="mt-4 p-3 bg-blue-500/10 border-l-4 border-blue-500 rounded">
                    <Zap className="inline mr-2 h-5 w-5 text-blue-600"/>
                    <span className="text-sm text-blue-700">Estos cursos y módulos podrían interesarte. ¡Explóralos!</span>
                </div>
              )}
            </motion.div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
};

const Label = ({ htmlFor, children, className }) => (
  <label htmlFor={htmlFor} className={className}>
    {children}
  </label>
);


export default AiHelperPage;
