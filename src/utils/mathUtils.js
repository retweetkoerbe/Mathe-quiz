// Generiert eine Aufgabe mit Zehnerübergang (z.B. 28 + 6)
export const generateStepTask = () => {
    // 1. Wähle einen Startbereich (z.B. 10-89), damit wir Platz nach oben haben
    const tens = Math.floor(Math.random() * 8) + 1; // 1..8 (10er bis 80er)
    const ones = Math.floor(Math.random() * 5) + 5; // 5..9
    
    const startNumber = tens * 10 + ones; // z.B. 28
    const nextTen = (tens + 1) * 10;      // z.B. 30
    const diffToTen = nextTen - startNumber; // z.B. 2
    
    // Summand muss größer als diffToTen sein, damit wir über den Zehner gehen
    const minAdd = diffToTen + 1;
    const maxAdd = 9;
    
    if (minAdd > maxAdd) {
        return generateStepTask(); 
    }
    
    const addNumber = Math.floor(Math.random() * (maxAdd - minAdd + 1)) + minAdd; // z.B. 6
    const rest = addNumber - diffToTen; // z.B. 4
    const result = startNumber + addNumber; // z.B. 34
    
    return {
        startNumber,
        addNumber,
        nextTen,
        diffToTen,
        rest,
        result
    };
};

// Generiert eine Aufgabe für den Zahlenstrahl
export const generateNumberLineTask = () => {
    // Zielzahl zwischen 0 und 100
    // Wir nehmen etwas Randabstand (z.B. 5-95), damit man nicht am extremen Rand klicken muss
    const target = Math.floor(Math.random() * 91) + 5; 
    return target;
};
