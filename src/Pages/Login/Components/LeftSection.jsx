import React from "react";

const LeftSection = () => (
  <div className="flex items-center justify-center p-6 bg-gradient-to-tr from-secondary to-accent">
    <div className="text-white text-center space-y-4">
      <div className="flex flex-col items-center justify-center gap-3">
        <img
          src="https://i.ibb.co/CstBYsHY/trans-logo.png"
          alt="Logo"
          className="w-20 h-20"
        />
        <h1
          className="text-3xl md:text-5xl font-heading font-bold"
          style={{ WebkitTextStroke: "1px #fff" }}
        >
          Market <span className="text-accent">Pulse</span>
        </h1>
      </div>
      <p className="text-lg w-full md:w-[90%] lg:w-[80%] mx-auto leading-8">
        Get instant access to real-time market prices, expert insights, and
        exclusive tools to help you stay ahead — every day, every trade.
      </p>
    </div>
  </div>
);

export default LeftSection;
