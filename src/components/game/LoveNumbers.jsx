import React, { useState, useEffect } from 'react';
import { Heart, ArrowLeft } from 'lucide-react';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';

// Dumb Component für Verliebte Zahlen
// Erhält `task` (Objekt), `onSolve` (Callback bei Erfolg), `onMistake` (Callback bei Fehler)
// `task` Format erwartet: { type: 'LOVE_NUMBERS', target: 10, given: 4, missing: 6 }
export const LoveNumbers = ({ task, onSolve, onMistake }) => {
  const [userAnswer, setUserAnswer] = useState('');
  
  // Wenn sich die Aufgabe ändert, Eingabe zurücksetzen
  useEffect(() => {
    setUserAnswer('');
  }, [task]);

  const handleKeyPress = (num) => {
    // Verhindere zu lange Eingaben
    if (userAnswer.length >= 3) return;
    setUserAnswer(prev => prev + num);
  };

  const handleBackspace = () => {
    setUserAnswer(prev => prev.slice(0, -1));
  };

  const handleCheck = () => {
    if (userAnswer === '') return;
    
    const num = parseInt(userAnswer, 10);
    if (num === task.missing) {
      onSolve();
    } else {
      onMistake();
      setUserAnswer(''); // Reset bei Fehler für neuen Versuch
    }
  };

  return (
    <div className="flex flex-col items-center w-full">
      <Card className="w-full max-w-lg flex flex-col items-center gap-8 py-10 border-4 border-red-100 relative overflow-visible">
        
        {/* Visualisierung: Herz */}
        <div className="relative w-64 h-56 flex items-center justify-center">
            <Heart 
              className="w-full h-full text-red-100 fill-red-100 drop-shadow-sm" 
              strokeWidth={1.5}
            />
            
            <div className="absolute inset-0 flex items-center justify-center gap-2 text-4xl font-bold text-red-800">
               <div className="w-20 text-center">{task.given}</div>
               <div className="text-red-300">+</div>
               <div className="w-20 text-center border-b-4 border-dashed border-red-300">
                 {userAnswer || '?'}
               </div>
               <div className="text-red-300">=</div>
               <div className="w-16 text-center">{task.target}</div>
            </div>
        </div>

        {/* Numpad Controls */}
        <div className="w-full flex flex-col gap-4">
            <div className="grid grid-cols-3 gap-3 w-full max-w-xs mx-auto">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                    <button
                        key={num}
                        onClick={() => handleKeyPress(num.toString())}
                        className="bg-white hover:bg-red-50 text-red-500 font-bold text-2xl py-4 rounded-xl shadow-md border-b-4 border-red-100 active:border-b-0 active:translate-y-1 transition-all"
                    >
                        {num}
                    </button>
                ))}
                <button
                    onClick={handleBackspace}
                    className="bg-red-50 hover:bg-red-100 text-red-400 font-bold text-xl py-4 rounded-xl shadow-sm border-b-4 border-red-100 active:border-b-0 active:translate-y-1 transition-all flex items-center justify-center"
                >
                    ⌫
                </button>
                <button
                    onClick={() => handleKeyPress('0')}
                    className="bg-white hover:bg-red-50 text-red-500 font-bold text-2xl py-4 rounded-xl shadow-md border-b-4 border-red-100 active:border-b-0 active:translate-y-1 transition-all"
                >
                    0
                </button>
                <button
                    onClick={handleCheck}
                    className="bg-red-500 hover:bg-red-600 text-white font-bold text-xl py-4 rounded-xl shadow-md border-b-4 border-red-700 active:border-b-0 active:translate-y-1 transition-all flex items-center justify-center"
                >
                    OK
                </button>
            </div>
        </div>
      </Card>
      
      <div className="mt-4 text-center text-slate-400 text-sm">
         Finde die Partnerzahl, damit zusammen {task.target} herauskommt!
      </div>
    </div>
  );
};

