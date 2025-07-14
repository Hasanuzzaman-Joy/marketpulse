import React from "react";
import { Link } from "react-router";

const Forbidden = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-bg-light font-body px-4 text-center">
      {/* Image */}
      <div className="max-w-md w-full mb-6">
        <img
          src="https://res.cloudinary.com/dvkiiyhaj/image/upload/v1752493469/ucdk5c7trpabmcgtgnzr.png"
          alt="403 Forbidden"
          className="w-full md:w-[80%] mx-auto"
        />
      </div>

      {/* Text */}
      <h2 className="text-2xl md:text-4xl font-bold text-main mb-4">
        403 - Forbidden Access 🚫
      </h2>
      <p className="text-text-secondary text-base md:text-lg mb-6 w-full md:w-2/3 lg:w-2/4">
        You don’t have permission to view this page. Please check your
        credentials or contact support if you believe this is a mistake.
      </p>

      {/* Button */}
      <Link
        to="/"
        className="bg-secondary text-white mb-10 px-6 py-2 rounded hover:bg-accent transition font-medium"
      >
        Go to Homepage
      </Link>
    </div>
  );
};

export default Forbidden;
