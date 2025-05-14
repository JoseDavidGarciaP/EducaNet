
import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Send, MessageSquare, UserCircle, CornerDownLeft } from 'lucide-react';

const ChatHelpPage = () => {
  const [messages, setMessages] = useState([
    { id: 1, text: "¡Hola! Soy EduBot, tu asistente virtual. ¿Cómo puedo ayudarte hoy?", sender: "bot" },
  ]);
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  const handleSendMessage = () => {
    if (inputValue.trim() === '') return;
    const newMessage = { id: messages.length + 1, text: inputValue, sender: "user" };
    setMessages([...messages, newMessage]);
    setInputValue('');

    // Simular respuesta del bot
    setTimeout(() => {
      const botResponse = { id: messages.length + 2, text: "Gracias por tu mensaje. Estoy procesando tu consulta...", sender: "bot" };
      setMessages(prevMessages => [...prevMessages, botResponse]);
      setTimeout(() => {
        const detailedResponse = {id: messages.length + 3, text: "Actualmente estoy aprendiendo. Para consultas complejas, por favor contacta a un tutor humano. Para problemas comunes, revisa nuestra sección de FAQ.", sender: "bot"};
        setMessages(prevMessages => [...prevMessages, detailedResponse]);
      }, 1500);
    }, 1000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto py-8 px-4 flex justify-center"
    >
      <Card className="shadow-xl w-full max-w-2xl">
        <CardHeader className="bg-gradient-to-r from-primary via-purple-500 to-pink-500 text-primary-foreground p-5">
          <div className="flex items-center space-x-3">
            <MessageSquare className="h-8 w-8" />
            <div>
                <CardTitle className="text-2xl font-bold">Chat de Ayuda</CardTitle>
                <CardDescription className="text-primary-foreground/80 text-sm">Resuelve tus dudas al instante con nuestro asistente virtual.</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0 flex flex-col h-[60vh]">
          <div className="flex-grow overflow-y-auto p-4 space-y-4 bg-muted/20">
            {messages.map((msg) => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: msg.sender === 'user' ? 10 : -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className={`flex items-end space-x-2 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.sender === 'bot' && (
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="https://avatar.vercel.sh/edubot.png" alt="EduBot" />
                    <AvatarFallback>EB</AvatarFallback>
                  </Avatar>
                )}
                <div
                  className={`max-w-xs lg:max-w-md px-4 py-2.5 rounded-xl shadow ${
                    msg.sender === 'user'
                      ? 'bg-primary text-primary-foreground rounded-br-none'
                      : 'bg-card border border-border text-foreground rounded-bl-none'
                  }`}
                >
                  <p className="text-sm">{msg.text}</p>
                </div>
                 {msg.sender === 'user' && (
                  <UserCircle className="h-8 w-8 text-muted-foreground" />
                )}
              </motion.div>
            ))}
            <div ref={messagesEndRef} />
          </div>
          <div className="p-4 border-t border-border bg-background">
            <div className="flex items-center space-x-2">
              <Input
                type="text"
                placeholder="Escribe tu mensaje aquí..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                className="flex-grow focus:ring-primary"
              />
              <Button onClick={handleSendMessage} className="btn-primary shrink-0">
                <Send className="h-5 w-5 mr-0 md:mr-2" />
                <span className="hidden md:inline">Enviar</span>
              </Button>
            </div>
             <p className="text-xs text-muted-foreground mt-2 flex items-center">
              <CornerDownLeft className="w-3 h-3 mr-1"/> Presiona Enter para enviar. EduBot está en fase de aprendizaje.
            </p>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ChatHelpPage;
