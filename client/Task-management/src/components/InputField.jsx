import React from 'react';
import './InputField.css';

const InputField = ({ type = "text", placeholder, value, onChange, name, className = "" }) => {
  return (
    <input
      className={`custom-input ${className}`}
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      name={name}
    />
  );
};

export default InputField;
