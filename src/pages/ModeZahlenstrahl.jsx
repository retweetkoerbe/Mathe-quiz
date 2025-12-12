import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Target, Ruler } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { usePersistedScore } from '../hooks/usePersistedScore';
import { generateNumberLineTask } from '../utils/mathUtils';
import confetti from 'canvas-confetti';

const ModeZahlenstrahl = () => {
  const [targetNumber, setTargetNumber] = useState(50);
  const [sliderValue, setSliderValue] = useState(50);
  const [hasGuessed, setHasGuessed] = useState(false);
  const [score, setScore] = usePersistedScore('score_zahlenstrahl', 0);
  const [feedback, setFeedback] = useState(null); // { type: 'success'|'close'|'far', diff: number }

  useEffect(() => {
    startNewTask();
  }, []);

  const startNewTask = () => {
    setTargetNumber(generateNumberLineTask());
    setSliderValue(50);
    setHasGuessed(false);
    setFeedback(null);
  };

  const handleGuess = () => {
    const diff = Math.abs(sliderValue - targetNumber);
    let type = 'far';
    
    // Toleranzbereiche für 2. Klasse
    if (diff === 0) {
      type = 'perfect';
    } else if (diff <= 3) {
      type = 'success';
    } else if (diff <= 10) {
      type = 'close';
    }

    setFeedback({ type, diff });
    setHasGuessed(true);

    if (type === 'success' || type === 'perfect') {
      setScore(s => s + (type === 'perfect' ? 2 : 1));
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#eab308', '#facc15', '#fef08a'] // Gelbe Farben
      });
    }
  };

  const getFeedbackMessage = () => {
    if (!feedback) return null;
    const { type, diff } = feedback;
    
    if (type === 'perfect') return <span className="text-green-600 font-bold">Perfekt getroffen! Volltreffer! (2 Punkte)</span>;
    if (type === 'success') return <span className="text-green-500 font-bold">Super! Nur {diff} daneben. Das zählt! (1 Punkt)</span>;
    if (type === 'close') return <span className="text-yellow-600 font-bold">Knapp daneben! ({diff} entfernt). Versuch es genauer.</span>;
    return <span className="text-red-500 font-bold">Leider noch zu weit weg ({diff} entfernt).</span>;
  };

  return (
    <div className="flex flex-col items-center p-4 max-w-4xl mx-auto min-h-screen">
      
      {/* Header */}
      <div className="w-full flex items-center justify-between mb-8">
        <Link to="/">
          <Button variant="secondary" className="!py-2 !px-4">
            <ArrowLeft size={20} /> Zurück
          </Button>
        </Link>
        <h1 className="text-2xl md:text-3xl font-bold text-yellow-600 text-center flex-1">
          Zahlenstrahl-Detektiv
        </h1>
        <div className="w-[100px] flex justify-end">
           <div className="bg-white px-4 py-2 rounded-xl shadow text-yellow-600 font-bold border-2 border-yellow-100">
             ★ {score}
           </div>
        </div> 
      </div>

      <Card className="w-full max-w-3xl border-4 border-yellow-100 bg-yellow-50/30 mb-8 py-12 px-4 md:px-12 relative overflow-visible">
         
         {/* Aufgabenstellung */}
         <div className="text-center mb-12">
            <h2 className="text-2xl font-bold text-slate-700">
              Wo liegt die <span className="text-4xl text-yellow-600 font-extrabold mx-2">{targetNumber}</span>?
            </h2>
            <p className="text-slate-500 mt-2">Schiebe den Regler an die richtige Stelle!</p>
         </div>

         {/* Zahlenstrahl Visualisierung */}
         <div className="relative w-full h-24 mb-8 select-none">
            
            {/* Basis-Linie und Markierungen */}
            <div className="absolute top-1/2 left-0 w-full h-2 bg-slate-300 rounded-full transform -translate-y-1/2"></div>
            
            {/* Hauptmarkierungen 0, 50, 100 */}
            <div className="absolute top-1/2 left-0 h-6 w-1 bg-slate-400 transform -translate-y-1/2"></div>
            <div className="absolute top-1/2 left-1/2 h-4 w-1 bg-slate-300 transform -translate-y-1/2 -translate-x-1/2"></div>
            <div className="absolute top-1/2 right-0 h-6 w-1 bg-slate-400 transform -translate-y-1/2"></div>
            
            {/* Labels */}
            <div className="absolute top-[65%] left-0 transform -translate-x-1/2 text-slate-500 font-bold">0</div>
            <div className="absolute top-[65%] left-1/2 transform -translate-x-1/2 text-slate-400 font-bold">50</div>
            <div className="absolute top-[65%] right-0 transform -translate-x-1/2 text-slate-500 font-bold">100</div>

            {/* Ziel-Marker (nur sichtbar wenn aufgelöst) */}
            {hasGuessed && (
               <div 
                 className="absolute top-0 w-1 h-full border-l-2 border-dashed border-green-500 z-0 transition-all duration-500"
                 style={{ left: `${targetNumber}%` }}
               >
                  <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-green-100 text-green-700 px-2 py-1 rounded text-xs font-bold whitespace-nowrap">
                     Hier ist {targetNumber}
                  </div>
               </div>
            )}

            {/* Slider Input */}
            <input 
              type="range" 
              min="0" 
              max="100" 
              value={sliderValue}
              onChange={(e) => !hasGuessed && setSliderValue(parseInt(e.target.value))}
              disabled={hasGuessed}
              className="absolute top-1/2 left-0 w-full h-full opacity-0 cursor-pointer z-20"
            />

            {/* Custom Thumb Visualisierung (der Button, der sich bewegt) */}
            <div 
               className={`absolute top-1/2 w-8 h-8 md:w-10 md:h-10 bg-white border-4 rounded-full shadow-lg transform -translate-y-1/2 -translate-x-1/2 flex items-center justify-center pointer-events-none z-10 transition-all duration-75 ${
                  hasGuessed 
                    ? (feedback?.type === 'success' || feedback?.type === 'perfect' ? 'border-green-500 scale-110' : 'border-red-500') 
                    : 'border-yellow-500'
               }`}
               style={{ left: `${sliderValue}%` }}
            >
               <div className={`w-2 h-2 rounded-full ${hasGuessed ? (feedback?.type === 'success' || feedback?.type === 'perfect' ? 'bg-green-500' : 'bg-red-500') : 'bg-yellow-500'}`}></div>
               
               {/* Aktueller Wert über dem Slider beim Ziehen */}
               {!hasGuessed && (
                   <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-yellow-500 text-white font-bold py-1 px-3 rounded-lg text-lg shadow-sm">
                      {sliderValue}
                   </div>
               )}
            </div>
         </div>

         {/* Feedback Area */}
         <div className="h-16 flex items-center justify-center text-center">
             {getFeedbackMessage()}
         </div>

         {/* Controls */}
         <div className="flex justify-center mt-4">
             {!hasGuessed ? (
                 <Button onClick={handleGuess} className="!bg-yellow-500 hover:!bg-yellow-600 !text-xl !py-4 !px-12 shadow-yellow-200">
                    <Target className="mr-2" /> Loggen
                 </Button>
             ) : (
                 <Button onClick={startNewTask} variant="secondary" className="!text-xl !py-4 !px-12 border-yellow-200 text-yellow-600 hover:bg-yellow-50">
                    Nächste Zahl <ArrowRight className="ml-2" />
                 </Button>
             )}
         </div>

      </Card>

      <div className="text-center text-slate-400 text-sm max-w-lg">
         Tipp: Die 50 ist genau in der Mitte. <br/>
         Überlege, ob die Zahl näher bei der 0, 50 oder 100 liegt.
      </div>

    </div>
  );
};

export default ModeZahlenstrahl;
