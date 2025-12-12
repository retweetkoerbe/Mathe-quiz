import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, CheckCircle, HelpCircle, RefreshCw } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { usePersistedScore } from '../hooks/usePersistedScore';
import { generateStepTask } from '../utils/mathUtils';
import confetti from 'canvas-confetti';

const ModeRechenweg = () => {
  const [task, setTask] = useState(null);
  const [step, setStep] = useState(1); // 1: Zum Zehner, 2: Rest addieren, 3: Ergebnis
  const [input1, setInput1] = useState(''); // Eingabe für Schritt 1 (diffToTen)
  const [input2, setInput2] = useState(''); // Eingabe für Schritt 2 (rest)
  const [input3, setInput3] = useState(''); // Eingabe für Schritt 3 (result)
  const [feedback, setFeedback] = useState(null); // 'correct', 'error', null
  const [score, setScore] = usePersistedScore('score_rechenweg', 0);

  useEffect(() => {
    startNewTask();
  }, []);

  const startNewTask = () => {
    setTask(generateStepTask());
    setStep(1);
    setInput1('');
    setInput2('');
    setInput3('');
    setFeedback(null);
  };

  const handleCheckStep1 = () => {
    const val = parseInt(input1, 10);
    if (val === task.diffToTen) {
      setStep(2);
      setFeedback(null);
    } else {
      setFeedback('error');
      setTimeout(() => setFeedback(null), 1000);
    }
  };

  const handleCheckStep2 = () => {
    const val = parseInt(input2, 10);
    if (val === task.rest) {
      setStep(3);
      setFeedback(null);
    } else {
      setFeedback('error');
      setTimeout(() => setFeedback(null), 1000);
    }
  };

  const handleCheckStep3 = () => {
    const val = parseInt(input3, 10);
    if (val === task.result) {
      setStep(4); // Fertig
      setScore(s => s + 1);
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#22c55e', '#4ade80', '#86efac'] // Grüne Farben
      });
    } else {
      setFeedback('error');
      setTimeout(() => setFeedback(null), 1000);
    }
  };

  if (!task) return null;

  return (
    <div className="flex flex-col items-center p-4 max-w-4xl mx-auto min-h-screen">
      
      {/* Header */}
      <div className="w-full flex items-center justify-between mb-8">
        <Link to="/">
          <Button variant="secondary" className="!py-2 !px-4">
            <ArrowLeft size={20} /> Zurück
          </Button>
        </Link>
        <h1 className="text-2xl md:text-3xl font-bold text-green-600 text-center flex-1">
          Der Rechenweg
        </h1>
        <div className="w-[100px] flex justify-end">
           <div className="bg-white px-4 py-2 rounded-xl shadow text-green-600 font-bold border-2 border-green-100">
             ★ {score}
           </div>
        </div> 
      </div>

      {/* Main Task Display */}
      <Card className="w-full max-w-2xl border-4 border-green-100 bg-green-50/30 mb-8 relative overflow-visible">
         <div className="text-center mb-8">
            <span className="text-gray-500 text-sm uppercase tracking-wider font-bold">Die Aufgabe</span>
            <div className="text-5xl font-bold text-slate-700 mt-2 flex items-center justify-center gap-4">
               <div>{task.startNumber}</div>
               <div className="text-green-500">+</div>
               <div>{task.addNumber}</div>
               <div className="text-green-300">=</div>
               <div className="w-20 border-b-4 border-dashed border-slate-300 text-green-600">
                 {step === 4 ? task.result : '?'}
               </div>
            </div>
         </div>

         {/* Visualisierung der Schritte */}
         <div className="flex flex-col gap-4">
            
            {/* Schritt 1: Bis zum Zehner */}
            <div className={`transition-all duration-500 p-4 rounded-xl border-2 ${step >= 1 ? 'bg-white border-green-200 shadow-sm opacity-100' : 'opacity-50 blur-[1px]'}`}>
                <div className="flex items-center gap-3 text-xl md:text-2xl font-bold text-slate-600 flex-wrap">
                    <span className="text-sm bg-green-100 text-green-700 px-2 py-1 rounded">1.</span>
                    <span>{task.startNumber}</span>
                    <span>+</span>
                    {step === 1 ? (
                        <input 
                          type="number" 
                          value={input1}
                          onChange={(e) => setInput1(e.target.value)}
                          className={`w-16 p-2 text-center border-2 rounded-lg outline-none focus:border-green-500 ${feedback === 'error' ? 'border-red-400 bg-red-50 animate-shake' : 'border-slate-200'}`}
                          autoFocus
                        />
                    ) : (
                        <span className="text-green-600 border-b-2 border-green-200 px-2">{task.diffToTen}</span>
                    )}
                    <span>=</span>
                    <span className="text-green-700">{task.nextTen}</span>
                    
                    {step === 1 && (
                        <Button variant="success" className="ml-auto !py-1 !px-4 text-sm" onClick={handleCheckStep1}>
                           OK
                        </Button>
                    )}
                </div>
                {step === 1 && <div className="text-xs text-slate-400 mt-2 ml-10">Wie viel fehlt bis zur {task.nextTen}?</div>}
            </div>

            {/* Schritt 2: Rest dazu */}
            {step >= 2 && (
                <div className={`transition-all duration-500 p-4 rounded-xl border-2 ${step >= 2 ? 'bg-white border-green-200 shadow-sm opacity-100' : 'opacity-50'}`}>
                    <div className="flex items-center gap-3 text-xl md:text-2xl font-bold text-slate-600 flex-wrap">
                        <span className="text-sm bg-green-100 text-green-700 px-2 py-1 rounded">2.</span>
                        <span>{task.nextTen}</span>
                        <span>+</span>
                        {step === 2 ? (
                            <input 
                              type="number" 
                              value={input2}
                              onChange={(e) => setInput2(e.target.value)}
                              className={`w-16 p-2 text-center border-2 rounded-lg outline-none focus:border-green-500 ${feedback === 'error' ? 'border-red-400 bg-red-50 animate-shake' : 'border-slate-200'}`}
                              autoFocus
                            />
                        ) : (
                            <span className="text-green-600 border-b-2 border-green-200 px-2">{task.rest}</span>
                        )}
                        <span>=</span>
                        <span className={`transition-colors ${step > 2 ? 'text-green-700' : 'text-slate-300'}`}>?</span>

                        {step === 2 && (
                            <Button variant="success" className="ml-auto !py-1 !px-4 text-sm" onClick={handleCheckStep2}>
                               OK
                            </Button>
                        )}
                    </div>
                    {step === 2 && <div className="text-xs text-slate-400 mt-2 ml-10">Du hast schon {task.diffToTen} addiert. Wie viel von der {task.addNumber} fehlt noch?</div>}
                </div>
            )}

            {/* Schritt 3: Ergebnis eintragen */}
            {step >= 3 && (
                <div className={`transition-all duration-500 p-4 rounded-xl border-2 ${step >= 3 ? 'bg-green-50 border-green-300 shadow-md opacity-100' : 'opacity-50'}`}>
                    <div className="flex items-center gap-3 text-xl md:text-2xl font-bold text-slate-600 flex-wrap justify-center">
                        <span className="text-sm bg-green-500 text-white px-2 py-1 rounded">Ergebnis:</span>
                        
                        {step === 3 ? (
                            <>
                                <input 
                                  type="number" 
                                  value={input3}
                                  onChange={(e) => setInput3(e.target.value)}
                                  className={`w-24 p-2 text-center border-2 rounded-lg outline-none focus:border-green-500 ${feedback === 'error' ? 'border-red-400 bg-red-50 animate-shake' : 'border-slate-200'}`}
                                  autoFocus
                                />
                                <Button variant="success" className="ml-2 !py-2 !px-6" onClick={handleCheckStep3}>
                                   Prüfen
                                </Button>
                            </>
                        ) : (
                            <span className="text-3xl text-green-600">{task.result}</span>
                        )}
                    </div>
                </div>
            )}

         </div>
         
         {/* Success State */}
         {step === 4 && (
             <div className="mt-8 flex justify-center animate-bounce">
                 <Button onClick={startNewTask} variant="primary" className="!text-xl !py-4 !px-12 bg-green-500 hover:bg-green-600">
                     Nächste Aufgabe <ArrowRight className="ml-2" />
                 </Button>
             </div>
         )}

      </Card>

      {/* Erklärung/Hilfe Visualisierung (optional) */}
      <div className="mt-8 text-center text-slate-400 text-sm max-w-lg">
         Tipp: Rechne immer erst bis zum nächsten Zehner ({task.nextTen}).<br/>
         Der Rest kommt dann einfach dazu!
      </div>

    </div>
  );
};

export default ModeRechenweg;

