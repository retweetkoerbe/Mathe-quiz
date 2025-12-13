import { generateStepTask, generateNumberLineTask } from './mathUtils';

export const TASK_TYPES = {
  LOVE_NUMBERS: 'LOVE_NUMBERS',
  CALC_PATH: 'CALC_PATH',
  NUMBER_LINE: 'NUMBER_LINE',
};

// Generiert eine Aufgabe für "Verliebte Zahlen"
const generateLoveNumbersTask = () => {
  // Zufällig bis 10 oder bis 100 (50/50 Chance)
  const target = Math.random() < 0.5 ? 10 : 100;
  const given = Math.floor(Math.random() * (target + 1));
  const missing = target - given;
  
  return {
    type: TASK_TYPES.LOVE_NUMBERS,
    target,
    given,
    missing,
    points: 1 // Einfache Aufgabe
  };
};

// Generiert eine Aufgabe für "Rechenweg"
const generateCalcPathTaskWrapper = () => {
  const taskData = generateStepTask();
  return {
    type: TASK_TYPES.CALC_PATH,
    ...taskData,
    points: 3 // Schwere Aufgabe (viele Schritte)
  };
};

// Generiert eine Aufgabe für "Zahlenstrahl"
const generateNumberLineTaskWrapper = () => {
  const target = generateNumberLineTask();
  return {
    type: TASK_TYPES.NUMBER_LINE,
    target,
    points: 2 // Mittlere Aufgabe
  };
};

export const getNextTask = () => {
  const rand = Math.random();
  
  // Gewichtung:
  // 40% Verliebte Zahlen (Grundlagen)
  // 30% Zahlenstrahl (Vorstellung)
  // 30% Rechenweg (Komplex)
  
  if (rand < 0.4) {
    return generateLoveNumbersTask();
  } else if (rand < 0.7) {
    return generateNumberLineTaskWrapper();
  } else {
    return generateCalcPathTaskWrapper();
  }
};

