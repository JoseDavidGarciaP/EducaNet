
export const getLevelsForFilter = () => {
  const primaryGrades = ['Primero', 'Segundo', 'Tercero', 'Cuarto', 'Quinto'];
  const secondaryGrades = ['Sexto', 'Séptimo', 'Octavo', 'Noveno', 'Décimo', 'Undécimo'];
  
  const primaryLevels = primaryGrades.map(grade => `Primaria - ${grade}`);
  const secondaryLevels = secondaryGrades.map(grade => `Secundaria - ${grade}`);
  
  return [
    'Primaria', 
    'Secundaria', 
    'Bachillerato', 
    'Universidad',
    ...primaryLevels,
    ...secondaryLevels
  ];
};
