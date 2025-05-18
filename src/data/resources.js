
// Datos de ejemplo para los recursos educativos
const resources = [
  // Matemáticas
  {
    id: 'math-1',
    title: 'Fracciones Divertidas',
    description: 'Aprende a sumar y restar fracciones con ejemplos visuales interactivos.',
    type: 'actividad',
    level: 'Primaria',
    subject: 'matematicas',
    rating: 5,
    content: 'Este recurso incluye actividades interactivas para aprender fracciones de manera divertida. Los estudiantes podrán visualizar fracciones, compararlas y realizar operaciones básicas.',
    image: '/images/matematicas/matematicas-1.webp'
  },
  {
    id: 'math-2',
    title: 'Geometría Básica',
    description: 'Explora las formas geométricas y sus propiedades con ejemplos 3D.',
    type: 'video',
    level: 'Primaria',
    subject: 'matematicas',
    rating: 4,
    content: 'Video educativo que explica los conceptos básicos de geometría, incluyendo formas, ángulos y propiedades. Incluye ejemplos visuales en 3D para mejor comprensión.',
    image: '/images/matematicas/matematicas-2.webp'
  },
  {
    id: 'math-3',
    title: 'Álgebra para Principiantes',
    description: 'Introducción a ecuaciones y variables para estudiantes de secundaria.',
    type: 'documento',
    level: 'Secundaria',
    subject: 'matematicas',
    rating: 5,
    content: 'Documento completo que introduce los conceptos básicos del álgebra, ecuaciones de primer grado, variables y resolución de problemas algebraicos simples.',
    image: '/images/matematicas/matematicas-3.webp'
  },
  {
    id: 'math-4',
    title: 'Juego de Multiplicación',
    description: 'Practica las tablas de multiplicar con este juego interactivo.',
    type: 'juego',
    level: 'Primaria',
    subject: 'matematicas',
    rating: 5,
    content: 'Juego educativo para practicar las tablas de multiplicar. Los estudiantes pueden competir contra el reloj o contra otros jugadores para mejorar sus habilidades.',
    image: '/images/matematicas/matematicas-4.webp'
  },

  // Español
  {
    id: 'spanish-1',
    title: 'Ortografía Correcta',
    description: 'Mejora tu ortografía con ejercicios prácticos y reglas claras.',
    type: 'actividad',
    level: 'Primaria',
    subject: 'espanol',
    rating: 4,
    content: 'Serie de ejercicios para mejorar la ortografía, incluyendo reglas de acentuación, uso de b/v, h, g/j y más. Incluye ejemplos y práctica interactiva.',
    image: '/images/espanol/espanol-1.webp'
  },
  {
    id: 'spanish-2',
    title: 'Comprensión Lectora',
    description: 'Textos cortos con preguntas para mejorar la comprensión de lectura.',
    type: 'documento',
    level: 'Secundaria',
    subject: 'espanol',
    rating: 5,
    content: 'Colección de textos cortos de diferentes géneros con preguntas de comprensión lectora. Incluye estrategias para identificar ideas principales, inferencias y análisis crítico.',
    image: '/images/espanol/espanol-2.webp'
  },
  {
    id: 'spanish-3',
    title: 'Gramática Española',
    description: 'Aprende sobre verbos, sustantivos, adjetivos y estructura de oraciones.',
    type: 'video',
    level: 'Primaria',
    subject: 'espanol',
    rating: 4,
    content: 'Video educativo que explica los conceptos básicos de gramática española, incluyendo las partes de la oración, conjugación de verbos y estructura sintáctica.',
    image: '/images/espanol/espanol-3.webp'
  },
  {
    id: 'spanish-4',
    title: 'Quiz de Sinónimos y Antónimos',
    description: 'Pon a prueba tu vocabulario con este divertido cuestionario.',
    type: 'quiz',
    level: 'Secundaria',
    subject: 'espanol',
    rating: 4,
    content: 'Cuestionario interactivo para evaluar el conocimiento de sinónimos y antónimos. Incluye diferentes niveles de dificultad y explicaciones para cada respuesta.',
    image: '/images/espanol/espanol-4.webp'
  },

  // Ciencias Naturales
  {
    id: 'science-1',
    title: 'El Cuerpo Humano',
    description: 'Explora los sistemas del cuerpo humano con animaciones interactivas.',
    type: 'actividad',
    level: 'Primaria',
    subject: 'ciencias',
    rating: 5,
    content: 'Actividad interactiva que permite explorar los diferentes sistemas del cuerpo humano, incluyendo el digestivo, respiratorio, circulatorio y nervioso, con animaciones detalladas.',
    image: '/images/ciencias/ciencias-1.webp'
  },
  {
    id: 'science-2',
    title: 'Ecosistemas del Mundo',
    description: 'Conoce los diferentes ecosistemas y su biodiversidad.',
    type: 'video',
    level: 'Secundaria',
    subject: 'ciencias',
    rating: 4,
    content: 'Video educativo que muestra los principales ecosistemas del mundo, explicando sus características, clima, flora y fauna, así como la importancia de su conservación.',
    image: '/images/ciencias/ciencias-2.webp'
  },
  {
    id: 'science-3',
    title: 'Experimentos Caseros',
    description: 'Colección de experimentos científicos que puedes hacer en casa.',
    type: 'documento',
    level: 'Primaria',
    subject: 'ciencias',
    rating: 5,
    content: 'Guía completa de experimentos científicos sencillos que se pueden realizar en casa con materiales comunes. Incluye explicaciones de los principios científicos detrás de cada experimento.',
    image: '/images/ciencias/ciencias-3.webp'
  },
  {
    id: 'science-4',
    title: 'Ciclo del Agua',
    description: 'Aprende sobre el ciclo del agua con esta simulación interactiva.',
    type: 'juego',
    level: 'Primaria',
    subject: 'ciencias',
    rating: 4,
    content: 'Simulación interactiva que muestra el ciclo del agua en la naturaleza. Los estudiantes pueden manipular variables como temperatura y presión para ver cómo afectan al ciclo.',
    image: '/images/ciencias/ciencias-4.webp'
  },

  // Inglés
  {
    id: 'english-1',
    title: 'Vocabulario Básico',
    description: 'Aprende palabras comunes en inglés con pronunciación y ejemplos.',
    type: 'actividad',
    level: 'Primaria',
    subject: 'ingles',
    rating: 5,
    content: 'Actividad interactiva para aprender vocabulario básico en inglés, organizado por temas como colores, números, animales, etc. Incluye pronunciación y ejemplos de uso.',
    image:'/images/ingles/ingles-1.webp'
  },
  {
    id: 'english-2',
    title: 'Gramática Inglesa',
    description: 'Guía completa de gramática inglesa para nivel intermedio.',
    type: 'documento',
    level: 'Secundaria',
    subject: 'ingles',
    rating: 4,
    content: 'Documento completo que cubre los aspectos fundamentales de la gramática inglesa, incluyendo tiempos verbales, estructura de oraciones, artículos, preposiciones y más.',
    image:'/images/ingles/ingles-2.webp'
  },
  {
    id: 'english-3',
    title: 'Conversación en Inglés',
    description: 'Practica diálogos comunes para mejorar tu fluidez.',
    type: 'video',
    level: 'Secundaria',
    subject: 'ingles',
    rating: 5,
    content: 'Video con diálogos comunes en situaciones cotidianas como presentarse, pedir direcciones, ordenar en un restaurante, etc. Incluye subtítulos y explicaciones de vocabulario.',
    image:'/images/ingles/ingles-3.webp'
  },
  {
    id: 'english-4',
    title: 'Juego de Verbos Irregulares',
    description: 'Aprende los verbos irregulares en inglés de forma divertida.',
    type: 'juego',
    level: 'Secundaria',
    subject: 'ingles',
    rating: 4,
    content: 'Juego educativo para aprender y practicar los verbos irregulares en inglés. Incluye diferentes modos de juego como memorama, completar oraciones y conjugación.',
    image:'/images/ingles/ingles-4.webp'
  }
];

export default resources;