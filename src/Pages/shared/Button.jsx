import React from 'react';

const Button = ({ type = 'button', children, onClick, className = '' }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`text-white px-6 py-2 rounded bg-[--color-secondary] hover:bg-[--color-accent] transition font-semibold cursor-pointer ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
