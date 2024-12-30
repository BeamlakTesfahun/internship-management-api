import React from 'react';
import './button.css';

const Button = ({ text, onClick, type = "button", className = "" }) => {
  return (
    <button 
      className={`custom-button ${className}`} 
      onClick={onClick} 
      type={type}
    >
      {text}
    </button>
  );
};

export default Button;
