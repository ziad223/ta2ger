import React from 'react';
import logo from '../../../public/images/home/footer-logo.png';
const Loader = () => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <img 
        src={logo} 
        alt="logo" 
        className="w-[200px] h-auto animate-pulse transform transition-all duration-500 ease-in-out" 
      />
    </div>
  );
};

export default Loader;
