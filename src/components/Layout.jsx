import React from 'react';
import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <div className="min-h-screen bg-blue-50 py-8 px-4">
      <main className="container mx-auto">
        <Outlet />
      </main>
      <footer className="mt-12 text-center text-blue-300 text-sm">
        Mathe-Quiz für die 2. Klasse
      </footer>
    </div>
  );
};

export default Layout;

