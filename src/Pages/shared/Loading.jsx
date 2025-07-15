import React from 'react';
import loadingAnimation from '../../assets/loading.json'; 
import Lottie from 'lottie-react';

const Loading = () => {
  return (
    <div className="min-h-screen w-full flex flex-col justify-center items-center">
      {/* Logo Row */}
      <div className="flex items-center gap-3 mb-6">
        <img src="https://i.ibb.co/CstBYsHY/trans-logo.png" alt="Logo" className="w-12 h-12" />
        <h1 className="text-2xl md:text-4xl font-bold font-heading tracking-wide text-secondary">
          Market <span className="text-accent">Pulse</span>
        </h1>
      </div>

      {/* Lottie Animation */}
      <div className="w-56 h-56 md:w-64 md:h-64">
        <Lottie animationData={loadingAnimation} loop={true} />
      </div>
    </div>
  );
};

export default Loading;
