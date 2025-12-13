import React from 'react';
import { Link } from 'react-router-dom';
import { Play, Trophy } from 'lucide-react';
import { usePersistedScore } from '../hooks/usePersistedScore';

const Home = () => {
  const [highScore] = usePersistedScore('highscore_mix_mode', 0);

  return (
    <div className="flex flex-col items-center gap-8 p-4 min-h-[80vh] justify-center">
      
      <div className="text-center space-y-2">
        <h1 className="text-5xl font-extrabold text-blue-600 tracking-tight drop-shadow-sm">
          Mathe Superheld
        </h1>
        <p className="text-xl text-blue-400 font-medium">Dein tägliches Training</p>
      </div>

      <div className="relative group">
        <div className="absolute -inset-1 bg-gradient-to-r from-blue-400 to-green-400 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
        <Link to="/play" className="relative block">
          <button className="bg-gradient-to-b from-blue-500 to-blue-600 hover:from-blue-400 hover:to-blue-500 text-white font-bold py-8 px-12 rounded-2xl shadow-xl transform transition hover:scale-105 active:scale-95 flex flex-col items-center gap-4 min-w-[300px]">
            <Play size={80} className="fill-white" />
            <span className="text-3xl">Jetzt üben!</span>
          </button>
        </Link>
      </div>

      <div className="bg-white/80 backdrop-blur px-8 py-4 rounded-2xl shadow-sm border-2 border-yellow-100 flex items-center gap-4">
        <div className="bg-yellow-100 p-3 rounded-full">
            <Trophy size={32} className="text-yellow-600" />
        </div>
        <div className="flex flex-col">
            <span className="text-sm text-gray-400 uppercase font-bold tracking-wider">Dein Rekord</span>
            <span className="text-3xl font-bold text-slate-700">{highScore} Punkte</span>
        </div>
      </div>

      <div className="text-center text-sm text-slate-400 max-w-md mt-8">
        Im Mix-Modus erwarten dich verliebte Zahlen, Rechenwege und der Zahlenstrahl. 
        <br/>Versuche deinen Rekord zu knacken!
      </div>
    </div>
  );
};

export default Home;
