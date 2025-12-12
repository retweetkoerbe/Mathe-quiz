import React from 'react';

export const Card = ({ children, className = '', ...props }) => {
  return (
    <div className={`bg-white rounded-2xl shadow-xl p-6 ${className}`} {...props}>
      {children}
    </div>
  );
};

