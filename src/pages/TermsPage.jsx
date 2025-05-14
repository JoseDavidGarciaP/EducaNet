
import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, ShieldCheck, UserCheck } from 'lucide-react';

const TermsPage = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto py-12 px-4 md:px-6 lg:px-8"
    >
      <Card className="shadow-xl">
        <CardHeader className="bg-gradient-to-r from-primary via-purple-500 to-pink-500 text-primary-foreground p-8">
          <div className="flex items-center space-x-4">
            <FileText className="h-12 w-12" />
            <div>
              <CardTitle className="text-3xl md:text-4xl font-bold">Términos y Condiciones</CardTitle>
              <p className="text-primary-foreground/80 mt-1">Última actualización: 9 de Mayo de 2025</p>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-6 md:p-8 prose dark:prose-invert max-w-none lg:prose-lg">
          <p>Bienvenido a EduDivertido. Al acceder y utilizar nuestra plataforma, aceptas estar sujeto a los siguientes términos y condiciones. Por favor, léelos cuidadosamente.</p>

          <h2 className="flex items-center"><UserCheck className="mr-2 h-6 w-6 text-primary"/>Uso de la Plataforma</h2>
          <p>EduDivertido te concede una licencia limitada, no exclusiva, intransferible y revocable para utilizar nuestros servicios para fines personales y no comerciales, de acuerdo con estos Términos.</p>
          <ul>
            <li>No debes utilizar la plataforma para ningún propósito ilegal o no autorizado.</li>
            <li>Eres responsable de mantener la confidencialidad de tu cuenta y contraseña.</li>
            <li>Nos reservamos el derecho de suspender o cancelar tu acceso si violas estos términos.</li>
          </ul>

          <h2 className="flex items-center"><ShieldCheck className="mr-2 h-6 w-6 text-primary"/>Privacidad y Datos</h2>
          <p>Tu privacidad es importante para nosotros. Nuestra Política de Privacidad, que forma parte de estos Términos, describe cómo recopilamos, usamos y protegemos tu información personal. Al usar EduDivertido, aceptas la recopilación y uso de información de acuerdo con nuestra Política de Privacidad.</p>
          
          <h2>Contenido y Propiedad Intelectual</h2>
          <p>Todo el contenido proporcionado en EduDivertido, incluyendo textos, gráficos, logos, videos y software, es propiedad de EduDivertido o sus licenciantes y está protegido por leyes de derechos de autor y propiedad intelectual. No puedes reproducir, distribuir, modificar o crear trabajos derivados de nuestro contenido sin nuestro permiso explícito.</p>

          <h2>Limitación de Responsabilidad</h2>
          <p>EduDivertido se proporciona "tal cual" y "según disponibilidad". No garantizamos que la plataforma sea ininterrumpida, libre de errores o segura. En la máxima medida permitida por la ley, EduDivertido no será responsable de ningún daño indirecto, incidental, especial, consecuente o punitivo que surja de o esté relacionado con tu uso de la plataforma.</p>

          <h2>Modificaciones a los Términos</h2>
          <p>Nos reservamos el derecho de modificar estos Términos en cualquier momento. Te notificaremos los cambios importantes publicando los nuevos términos en la plataforma o enviándote un correo electrónico. El uso continuado de EduDivertido después de tales cambios constituirá tu aceptación de los nuevos Términos.</p>

          <h2>Ley Aplicable</h2>
          <p>Estos Términos se regirán e interpretarán de acuerdo con las leyes de [Tu Jurisdicción], sin tener en cuenta sus disposiciones sobre conflicto de leyes.</p>

          <h2>Contacto</h2>
          <p>Si tienes alguna pregunta sobre estos Términos, por favor contáctanos a través de <a href="mailto:soporte@edudivertido.com" className="text-primary hover:underline">soporte@edudivertido.com</a>.</p>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default TermsPage;
