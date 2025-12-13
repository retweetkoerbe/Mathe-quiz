import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Search, Star, Trophy, ArrowRight } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { usePersistedScore } from '../hooks/usePersistedScore';
import { getNextTask, TASK_TYPES } from '../utils/gameManager';
import confetti from 'canvas-confetti';

// Game Components
import { LoveNumbers } from '../components/game/LoveNumbers';
import { CalcPath } from '../components/game/CalcPath';
import { NumberLine } from '../components/game/NumberLine';

const GamePage = () => {
  const [task, setTask] = useState(null);
  const [score, setScore] = usePersistedScore('score_mix_mode', 0);
  const [highScore, setHighScore] = usePersistedScore('highscore_mix_mode', 0);
  const [showFeedback, setShowFeedback] = useState(false); // 'correct' | 'mistake' | null
  const [feedbackMessage, setFeedbackMessage] = useState('');
  const [streak, setStreak] = useState(0);

  // Start new game session
  useEffect(() => {
    loadNextTask();
  }, []);

  // Update Highscore
  useEffect(() => {
    if (score > highScore) {
      setHighScore(score);
    }
  }, [score, highScore, setHighScore]);

  const loadNextTask = () => {
    setTask(getNextTask());
    setShowFeedback(false);
  };

  const handleCorrect = (bonusPoints = 0) => {
    const points = (task.points || 1) + bonusPoints;
    setScore(s => s + points);
    setStreak(s => s + 1);
    
    setFeedbackMessage(`Super! +${points} Punkte`);
    setShowFeedback('correct');

    // Konfetti je nach Streak
    const particleCount = Math.min(100 + streak * 10, 300);
    confetti({
      particleCount,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#22c55e', '#3b82f6', '#eab308']
    });
  };

  const handleMistake = (type = 'default') => {
    setStreak(0);
    setShowFeedback('mistake');
    
    // Positive Fehlerkultur
    const messages = [
      "Schau noch mal genau hin! 🔍",
      "Fast! Probier es noch einmal.",
      "Du schaffst das! Denk nach.",
      "Ein kleiner Fehler ist kein Problem. 🔍"
    ];
    setFeedbackMessage(messages[Math.floor(Math.random() * messages.length)]);
  };

  const handleNext = () => {
    loadNextTask();
  };

  if (!task) return <div>Lade...</div>;

  return (
    <div className="flex flex-col items-center p-4 max-w-4xl mx-auto min-h-screen relative">
      
      {/* Top Bar: Navigation & Stats */}
      <div className="w-full flex items-center justify-between mb-6 sticky top-0 bg-blue-50/90 backdrop-blur-sm z-10 py-2 border-b border-blue-100">
        <Link to="/">
          <Button variant="secondary" className="!py-2 !px-4 text-sm">
            <ArrowLeft size={16} className="mr-1" /> Pause
          </Button>
        </Link>
        
        <div className="flex gap-4">
           <div className="flex items-center gap-2 bg-white px-3 py-1 rounded-xl shadow-sm text-yellow-600 border border-yellow-100">
             <Trophy size={18} />
             <div className="flex flex-col leading-none">
                <span className="text-[10px] uppercase text-yellow-400 font-bold">Rekord</span>
                <span className="font-bold text-lg">{highScore}</span>
             </div>
           </div>

           <div className="flex items-center gap-2 bg-blue-600 px-4 py-1 rounded-xl shadow-lg text-white">
             <Star size={18} className="fill-white" />
             <div className="flex flex-col leading-none">
                <span className="text-[10px] uppercase text-blue-200 font-bold">Punkte</span>
                <span className="font-bold text-xl">{score}</span>
             </div>
           </div>
        </div>
      </div>

      {/* Title */}
      <h1 className="text-2xl font-bold text-slate-400 mb-6 flex items-center gap-2">
        {task.type === TASK_TYPES.LOVE_NUMBERS && <><span className="text-red-400">Verliebte Zahlen</span></>}
        {task.type === TASK_TYPES.CALC_PATH && <><span className="text-green-500">Der Rechenweg</span></>}
        {task.type === TASK_TYPES.NUMBER_LINE && <><span className="text-yellow-500">Zahlenstrahl</span></>}
      </h1>

      {/* Game Content */}
      <div className="w-full mb-24">
        {task.type === TASK_TYPES.LOVE_NUMBERS && (
            <LoveNumbers 
               task={task} 
               onSolve={() => !showFeedback && handleCorrect()} 
               onMistake={() => !showFeedback && handleMistake()} 
            />
        )}
        
        {task.type === TASK_TYPES.CALC_PATH && (
            <CalcPath 
               task={task} 
               onSolve={() => !showFeedback && handleCorrect()} 
               onMistake={() => !showFeedback && handleMistake()} 
            />
        )}

        {task.type === TASK_TYPES.NUMBER_LINE && (
            <NumberLine 
               task={task} 
               onSolve={(bonus) => !showFeedback && handleCorrect(bonus)} 
               onMistake={(type) => !showFeedback && handleMistake(type)} 
            />
        )}
      </div>

      {/* Feedback Overlay / Bottom Sheet */}
      {showFeedback && (
        <div className={`fixed bottom-0 left-0 right-0 p-6 rounded-t-3xl shadow-[0_-5px_20px_rgba(0,0,0,0.1)] transition-transform duration-300 z-50 flex flex-col items-center gap-4 border-t-4
            ${showFeedback === 'correct' ? 'bg-green-50 border-green-200' : 'bg-blue-50 border-blue-200'}
        `}>
            <div className="text-center">
                <div className="text-2xl font-bold mb-1 flex items-center justify-center gap-2">
                    {showFeedback === 'correct' ? (
                        <span className="text-green-600">Klasse! 🎉</span>
                    ) : (
                        <span className="text-blue-600 flex items-center gap-2">
                           <Search className="w-6 h-6" /> {feedbackMessage}
                        </span>
                    )}
                </div>
            </div>

            {showFeedback === 'correct' ? (
                <Button onClick={handleNext} variant="primary" className="!text-xl !py-3 !px-12 w-full max-w-sm animate-pulse">
                    Weiter <ArrowRight className="ml-2" />
                </Button>
            ) : (
                <Button onClick={() => setShowFeedback(false)} variant="secondary" className="w-full max-w-sm">
                    Nochmal versuchen
                </Button>
            )}
        </div>
      )}

    </div>
  );
};

export default GamePage;

