
import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { User, Mail, Lock, AlertCircle, Eye, EyeOff } from 'lucide-react';
import { Checkbox } from "@/components/ui/checkbox";
import { ThemeContext } from '@/App';

const RegisterPage = ({ register }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();
  const { theme } = useContext(ThemeContext);
  const siteName = "EducaNet";
  const logoUrl = "public/LogoEducaNet.webp";
  const googleLogoUrl = "public/logo_google.webp";
  const facebookLogoUrl = "public/logo_facebook.webp";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!name || !email || !password || !confirmPassword) {
      setError('Por favor, completa todos los campos.');
      return;
    }
    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden.');
      return;
    }
    if (password.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres.');
      return;
    }
    if (!agreedToTerms) {
      setError('Debes aceptar los términos y condiciones.');
      return;
    }

    try {
      register({ email, name, avatarUrl: "" }); 
      navigate('/'); 
    } catch (err) {
      setError(err.message || 'Ocurrió un error al registrar la cuenta.');
    }
  };
  
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } }
  };

  return (
    <div className={`min-h-screen flex items-center justify-center p-4 bg-gradient-to-br ${theme === 'dark' ? 'from-slate-900 to-purple-900' : 'from-purple-100 to-indigo-200'}`}>
      <motion.div variants={containerVariants} initial="hidden" animate="visible" className="w-full max-w-md">
        <Card className="shadow-2xl overflow-hidden glassmorphism">
          <CardHeader className="text-center bg-primary/10 dark:bg-primary/20 p-6">
            <Link to="/" className="mx-auto flex items-center justify-center space-x-2 mb-4">
                <img src={logoUrl} alt={`${siteName} Logo`} className="h-10 w-auto" />
                <span className="text-2xl font-bold text-foreground">{siteName}</span>
            </Link>
            <CardTitle className="text-3xl font-bold text-primary">Crea tu Cuenta</CardTitle>
            <CardDescription className="text-muted-foreground">¡Únete a {siteName} y comienza tu aventura de aprendizaje!</CardDescription>
          </CardHeader>
          <CardContent className="p-6 space-y-5">
            {error && (
              <Alert variant="destructive" className="bg-red-500/10 border-red-500/50 text-red-700 dark:text-red-400">
                <AlertCircle className="h-4 w-4 !text-red-700 dark:!text-red-400" />
                <AlertTitle>Error de Registro</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-1.5">
                <Label htmlFor="name">Nombre Completo</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input id="name" placeholder="Tu Nombre" value={name} onChange={(e) => setName(e.target.value)} required className="pl-10 bg-background dark:bg-slate-800" />
                </div>
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="email-register">Correo Electrónico</Label>
                 <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input id="email-register" type="email" placeholder="tu@correo.com" value={email} onChange={(e) => setEmail(e.target.value)} required className="pl-10 bg-background dark:bg-slate-800" />
                </div>
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="password-register">Contraseña</Label>
                 <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input id="password-register" type={showPassword ? "text" : "password"} placeholder="Mínimo 6 caracteres" value={password} onChange={(e) => setPassword(e.target.value)} required className="pl-10 pr-10 bg-background dark:bg-slate-800" />
                   <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground hover:text-primary">
                    {showPassword ? <EyeOff /> : <Eye />}
                  </button>
                </div>
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="confirm-password">Confirmar Contraseña</Label>
                 <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input id="confirm-password" type={showConfirmPassword ? "text" : "password"} placeholder="Repite tu contraseña" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required className="pl-10 pr-10 bg-background dark:bg-slate-800" />
                  <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground hover:text-primary">
                    {showConfirmPassword ? <EyeOff /> : <Eye />}
                  </button>
                </div>
              </div>
              <div className="flex items-center space-x-2 pt-2">
                <Checkbox id="terms" checked={agreedToTerms} onCheckedChange={setAgreedToTerms} />
                <Label htmlFor="terms" className="text-sm font-normal text-muted-foreground">
                  Acepto los <Link to="/terminos" className="underline text-primary hover:text-primary/80">términos y condiciones</Link>.
                </Label>
              </div>
              <Button type="submit" className="w-full btn-primary text-base py-3 mt-2">
                Crear Cuenta
              </Button>
            </form>
            <div className="relative my-5">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-border" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="px-2 text-foreground">O continúa con</span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Button variant="outline" className="w-full flex items-center justify-center py-3 text-sm bg-background dark:bg-slate-800 hover:bg-muted dark:hover:bg-slate-700">
                <img src={googleLogoUrl} alt="Google logo" className="h-5 w-5 mr-2" />
                Google
              </Button>
              <Button variant="outline" className="w-full flex items-center justify-center py-3 text-sm bg-background dark:bg-slate-800 hover:bg-muted dark:hover:bg-slate-700">
                 <img src={facebookLogoUrl} alt="Facebook logo" className="h-5 w-5 mr-2" />
                Facebook
              </Button>
            </div>
          </CardContent>
          <CardFooter className="p-6 justify-center bg-muted/30 dark:bg-muted/10">
            <p className="text-sm text-muted-foreground">
              ¿Ya tienes una cuenta?{' '}
              <Link to="/login" className="font-semibold text-primary hover:underline">
                Inicia sesión aquí
              </Link>
            </p>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
};

export default RegisterPage;
