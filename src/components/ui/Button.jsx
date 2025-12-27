'use client';

import React from 'react';

export const Button = ({ children, variant = 'primary', className = '', ...props }) => {
  const baseStyles = 'cursor-pointer transition-transform active:scale-95 font-bold py-3 px-6 rounded-xl text-lg flex items-center justify-center gap-2';
  const variants = {
    primary: 'bg-blue-500 hover:bg-blue-600 text-white shadow-lg',
    secondary: 'bg-white hover:bg-slate-50 text-blue-500 shadow-md border-2 border-blue-100',
    ghost: 'bg-transparent hover:bg-slate-100 text-slate-600',
    success: 'bg-green-500 hover:bg-green-600 text-white shadow-lg',
    danger: 'bg-red-500 hover:bg-red-600 text-white shadow-lg',
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${className}`} 
      {...props}
    >
      {children}
    </button>
  );
};

