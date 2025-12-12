import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Footprints, Ruler } from 'lucide-react';

const Home = () => {
  return (
    <div className="flex flex-col items-center gap-6 p-4">
      <h1 className="text-4xl font-extrabold text-blue-600 mb-8 text-center">
        Mathe Superheld
      </h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl">
        <Link to="/liebes-zahlen" className="bg-red-100 hover:bg-red-200 border-4 border-red-300 rounded-2xl p-6 flex flex-col items-center gap-4 transition-transform hover:scale-105 active:scale-95 shadow-xl">
          <Heart size={64} className="text-red-500 fill-red-500" />
          <span className="text-2xl font-bold text-red-700 text-center">Verliebte Zahlen</span>
        </Link>

        <Link to="/rechenweg" className="bg-green-100 hover:bg-green-200 border-4 border-green-300 rounded-2xl p-6 flex flex-col items-center gap-4 transition-transform hover:scale-105 active:scale-95 shadow-xl">
          <Footprints size={64} className="text-green-600" />
          <span className="text-2xl font-bold text-green-800 text-center">Der Rechenweg</span>
        </Link>

        <Link to="/zahlenstrahl" className="bg-yellow-100 hover:bg-yellow-200 border-4 border-yellow-300 rounded-2xl p-6 flex flex-col items-center gap-4 transition-transform hover:scale-105 active:scale-95 shadow-xl">
          <Ruler size={64} className="text-yellow-600" />
          <span className="text-2xl font-bold text-yellow-800 text-center">Zahlenstrahl</span>
        </Link>
      </div>
    </div>
  );
};

export default Home;

