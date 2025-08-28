import ZoomIn from "../../shared/ZoomIn";
import FeatureBanner from "./FeatureBanner";

const Banner = () => {
  return (
    <div className="relative w-full h-[400px] md:h-[600px]">
      {/* Image */}
      <img
        src="https://res.cloudinary.com/dvkiiyhaj/image/upload/v1753277025/r4m9bf53g3nt0aus0hbt.jpg"
        alt="MarketPulse Banner"
        className="w-full h-full object-cover"
      />

      {/* Gradient  banner */}
      <div className="absolute inset-0 bg-gradient-to-tr from-black via-black/70 to-transparent z-10"></div>

      {/* Content on top */}
      <div className="w-full md:max-w-screen-xl mx-auto absolute inset-0 flex flex-col items-center justify-center text-center px-4 z-20">
        <ZoomIn>
          <h1 className="text-white text-4xl md:text-6xl font-bold drop-shadow-lg">
            Fresh Market Prices at Your Fingertips
          </h1>
          <p className="mt-4 text-white text-lg md:text-2xl drop-shadow-md">
            Track real-time prices of fresh produce directly from your local
            markets
          </p>
        </ZoomIn>
      </div>
      <div className="absolute left-1/2 transform -translate-x-1/2 translate-y-1/2 bottom-0 z-30 w-full">
        <FeatureBanner />
      </div>
    </div>
  );
};

export default Banner;
