import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Heart, RefreshCw, CheckCircle, XCircle } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { usePersistedScore } from '../hooks/usePersistedScore';
import confetti from 'canvas-confetti';

const ModeLiebesZahlen = () => {
  const [target, setTarget] = useState(10); // Standard: Verliebte Zahlen bis 10
  const [givenNumber, setGivenNumber] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [feedback, setFeedback] = useState(null); // 'correct', 'incorrect', null
  const [score, setScore] = usePersistedScore('score_liebeszahlen', 0);

  // Initialisiere Aufgabe beim Start
  useEffect(() => {
    generateNewTask();
  }, [target]);

  const generateNewTask = () => {
    const newGiven = Math.floor(Math.random() * (target + 1));
    setGivenNumber(newGiven);
    setUserAnswer('');
    setFeedback(null);
  };

  const handleCheck = (e) => {
    e.preventDefault();
    if (userAnswer === '') return;

    const num = parseInt(userAnswer, 10);
    if (num + givenNumber === target) {
      setFeedback('correct');
      setScore(s => s + 1);
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#ef4444', '#f87171', '#fca5a5'] // Rote Herzfarben
      });
      // Automatisch neue Aufgabe nach kurzer Verzögerung? Optional.
      // setTimeout(generateNewTask, 2000); 
    } else {
      setFeedback('incorrect');
    }
  };

  const handleNext = () => {
    generateNewTask();
  };

  const handleKeyPress = (num) => {
    if (feedback === 'correct') return; // Eingabe blockieren wenn schon gelöst
    if (userAnswer.length >= 2 && target === 10) return; // Max 2 Stellen bei 10 (für 10 Eingabe)
    if (userAnswer.length >= 3 && target === 100) return;
    
    setUserAnswer(prev => prev + num);
  };

  const handleBackspace = () => {
    if (feedback === 'correct') return;
    setUserAnswer(prev => prev.slice(0, -1));
  };

  return (
    <div className="flex flex-col items-center p-4 max-w-4xl mx-auto">
      {/* Header Navigation */}
      <div className="w-full flex items-center justify-between mb-8">
        <Link to="/">
          <Button variant="secondary" className="!py-2 !px-4">
            <ArrowLeft size={20} /> Zurück
          </Button>
        </Link>
        <h1 className="text-3xl font-bold text-red-500 text-center flex-1">Verliebte Zahlen</h1>
        <div className="w-[100px] flex justify-end">
             {/* Platzhalter oder Score-Anzeige */}
             <div className="bg-white px-4 py-2 rounded-xl shadow text-red-500 font-bold border-2 border-red-100">
               ★ {score}
             </div>
        </div> 
      </div>

      {/* Mode Switcher */}
      <div className="flex gap-4 mb-8">
         <Button 
           variant={target === 10 ? 'primary' : 'secondary'} 
           onClick={() => setTarget(10)}
           className={target === 10 ? '!bg-red-500 hover:!bg-red-600' : ''}
         >
           Bis 10
         </Button>
         <Button 
           variant={target === 100 ? 'primary' : 'secondary'} 
           onClick={() => setTarget(100)}
           className={target === 100 ? '!bg-red-500 hover:!bg-red-600' : ''}
         >
           Bis 100
         </Button>
      </div>

      {/* Main Game Card */}
      <Card className="w-full max-w-lg flex flex-col items-center gap-8 py-10 border-4 border-red-100 relative overflow-visible">
        
        {/* Visualisierung: Herz */}
        <div className="relative w-64 h-56 flex items-center justify-center">
            <Heart 
              className={`w-full h-full text-red-100 fill-red-100 drop-shadow-sm transition-all duration-500 ${feedback === 'correct' ? 'scale-110 text-red-500 fill-red-500' : ''}`} 
              strokeWidth={1.5}
            />
            
            <div className="absolute inset-0 flex items-center justify-center gap-2 text-4xl font-bold text-red-800">
               <div className="w-20 text-center">{givenNumber}</div>
               <div className="text-red-300">+</div>
               <div className={`w-20 text-center border-b-4 border-dashed border-red-300 ${feedback === 'correct' ? 'border-transparent' : ''}`}>
                 {userAnswer || '?'}
               </div>
               <div className="text-red-300">=</div>
               <div className="w-16 text-center">{target}</div>
            </div>
        </div>

        {/* Feedback Message */}
        <div className="h-8">
            {feedback === 'correct' && (
                <div className="flex items-center gap-2 text-green-500 font-bold text-xl animate-bounce">
                    <CheckCircle /> Super gemacht!
                </div>
            )}
            {feedback === 'incorrect' && (
                <div className="flex items-center gap-2 text-red-500 font-bold text-xl animate-shake">
                    <XCircle /> Versuch es nochmal!
                </div>
            )}
        </div>

        {/* Controls */}
        <div className="w-full flex flex-col gap-4">
            
            {/* Wenn gelöst: Weiter Button, Sonst: Numpad */}
            {feedback === 'correct' ? (
                 <Button onClick={handleNext} variant="success" className="w-full text-2xl py-4 animate-pulse">
                    Nächste Aufgabe <ArrowLeft className="rotate-180" />
                 </Button>
            ) : (
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
            )}
        </div>

      </Card>
    </div>
  );
};

export default ModeLiebesZahlen;
