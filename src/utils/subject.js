export function formatSubject(subject) {
    const map = {
        all: "Todas las materias",
        ingles: "Inglés",
        espanol: "Español",
        matematicas: "Matemáticas",
        ciencias: "Ciencias",
        biologia: "Biología",
    };
    
    return map[subject.toLowerCase()] || subject.charAt(0).toUpperCase() + subject.slice(1);
}
