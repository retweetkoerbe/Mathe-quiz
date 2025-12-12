import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] p-4 text-center">
      <h1 className="text-6xl font-bold text-gray-300 mb-4">404</h1>
      <p className="text-xl text-gray-600 mb-8">Hoppla! Hier gibt es keine Aufgaben.</p>
      <Link to="/" className="btn-primary">
        Zurück zum Start
      </Link>
    </div>
  );
};

export default NotFound;

