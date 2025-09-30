import React from 'react';

const Input = ({ placeholder }) => {
  return (
    <input
      type="text"
      placeholder={placeholder}
      className="outline-none h-[40px] border px-3 rounded-lg"
    />
  );
}

export default Input;
