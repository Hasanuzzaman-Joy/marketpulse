import React from "react";

const Banner = () => {
    return (
        <div className="relative w-full h-[400px] md:h-[600px] overflow-hidden">
            {/* Image */}
            <img
                src="https://res.cloudinary.com/dvkiiyhaj/image/upload/v1753277025/r4m9bf53g3nt0aus0hbt.jpg"
                alt="MarketPulse Banner"
                className="w-full h-full object-cover"
            />

            {/* Gradient  banner */}
            <div className="absolute inset-0 bg-gradient-to-tr from-black via-black/70 to-transparent z-10"></div>

            {/* Content on top */}
            <div className="md:w-11/12 mx-auto absolute inset-0 flex flex-col items-center justify-center text-center px-4 z-20">
                <h1 className="text-white text-4xl md:text-6xl font-bold drop-shadow-lg">
                    Fresh Market Prices at Your Fingertips
                </h1>
                <p className="mt-4 text-white text-lg md:text-2xl drop-shadow-md">
                    Track real-time prices of fresh produce directly from your local markets
                </p>
            </div>
        </div>
    );
};

export default Banner;
