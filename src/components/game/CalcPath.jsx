import React, { useState, useEffect } from 'react';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';

// Dumb Component für den Rechenweg
export const CalcPath = ({ task, onSolve, onMistake }) => {
  const [step, setStep] = useState(1); // 1: Zum Zehner, 2: Rest addieren, 3: Ergebnis
  const [input1, setInput1] = useState(''); // Eingabe für Schritt 1 (diffToTen)
  const [input2, setInput2] = useState(''); // Eingabe für Schritt 2 (rest)
  const [input3, setInput3] = useState(''); // Eingabe für Schritt 3 (result)
  const [localFeedback, setLocalFeedback] = useState(null);

  // Reset bei neuer Aufgabe
  useEffect(() => {
    setStep(1);
    setInput1('');
    setInput2('');
    setInput3('');
    setLocalFeedback(null);
  }, [task]);

  const handleCheckStep1 = () => {
    const val = parseInt(input1, 10);
    if (val === task.diffToTen) {
      setStep(2);
      setLocalFeedback(null);
    } else {
      setLocalFeedback('error1');
      onMistake();
      setTimeout(() => setLocalFeedback(null), 1000);
    }
  };

  const handleCheckStep2 = () => {
    const val = parseInt(input2, 10);
    if (val === task.rest) {
      setStep(3);
      setLocalFeedback(null);
    } else {
      setLocalFeedback('error2');
      onMistake();
      setTimeout(() => setLocalFeedback(null), 1000);
    }
  };

  const handleCheckStep3 = () => {
    const val = parseInt(input3, 10);
    if (val === task.result) {
      setStep(4);
      onSolve();
    } else {
      setLocalFeedback('error3');
      onMistake();
      setTimeout(() => setLocalFeedback(null), 1000);
    }
  };

  return (
    <div className="flex flex-col items-center w-full">
      <Card className="w-full max-w-2xl border-4 border-green-100 bg-green-50/30 relative overflow-visible">
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
                          className={`w-16 p-2 text-center border-2 rounded-lg outline-none focus:border-green-500 ${localFeedback === 'error1' ? 'border-red-400 bg-red-50 animate-shake' : 'border-slate-200'}`}
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
                              className={`w-16 p-2 text-center border-2 rounded-lg outline-none focus:border-green-500 ${localFeedback === 'error2' ? 'border-red-400 bg-red-50 animate-shake' : 'border-slate-200'}`}
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
                                  className={`w-24 p-2 text-center border-2 rounded-lg outline-none focus:border-green-500 ${localFeedback === 'error3' ? 'border-red-400 bg-red-50 animate-shake' : 'border-slate-200'}`}
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
      </Card>
    </div>
  );
};

