import React, { useEffect, useState } from "react";

const Discount = () => {
  const discountEndDate = new Date();
  discountEndDate.setDate(discountEndDate.getDate() + 5);

  const calculateTimeLeft = () => {
    const now = new Date();
    const difference = discountEndDate - now;

    let timeLeft = {
      days: "00",
      hours: "00",
      minutes: "00",
      seconds: "00",
    };

    if (difference > 0) {
      timeLeft = {
        days: String(Math.floor(difference / (1000 * 60 * 60 * 24))).padStart(2, "0"),
        hours: String(Math.floor((difference / (1000 * 60 * 60)) % 24)).padStart(2, "0"),
        minutes: String(Math.floor((difference / 1000 / 60) % 60)).padStart(2, "0"),
        seconds: String(Math.floor((difference / 1000) % 60)).padStart(2, "0"),
      };
    }
    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [calculateTimeLeft]);

  return (
    <section className="flex max-w-screen-xl mx-auto my-16 px-0 md:px-0 h-[360px]">
      {/* Left Image with gradient overlay */}
      <div className="relative w-1/4">
        <img
          src="https://res.cloudinary.com/dvkiiyhaj/image/upload/v1754466684/hytx9kfhtprd1bnabg75.jpg"
          alt="Discount Left"
          className="w-full h-full object-contain rounded-l-xl"
        />
        <div className="absolute inset-0 rounded-l-xl bg-gradient-to-t from-black/40 via-black/10 to-black/40" />
      </div>

      {/* Center Content */}
      <div className="w-1/2 bg-gray-50 rounded-none flex flex-col items-center justify-center text-center p-8 shadow-lg">
        <h2 className="text-4xl font-extrabold mb-2 text-gray-900">Winter Discount</h2>
        <p className="mb-6 text-lg font-medium text-gray-700">Limited time offer on all products!</p>

        {/* Timer */}
        <div className="flex gap-4 text-center mb-6">
          {["days", "hours", "minutes", "seconds"].map((unit) => (
            <div
              key={unit}
              className="flex flex-col items-center bg-white rounded-lg px-4 py-2 min-w-[60px] shadow"
            >
              <span className="text-3xl font-bold text-gray-900">{timeLeft[unit]}</span>
              <span className="uppercase text-xs tracking-wide text-gray-600">{unit}</span>
            </div>
          ))}
        </div>

        {/* Shop Now Button */}
        <button className="bg-indigo-600 text-white font-semibold rounded-full px-8 py-3 hover:bg-indigo-700 transition">
          Shop Now
        </button>
      </div>

      {/* Right Image with gradient overlay */}
      <div className="relative w-1/4">
        <img
          src="https://res.cloudinary.com/dvkiiyhaj/image/upload/v1754466682/we7fpyutqacqsm1wtec4.jpg"
          alt="Discount Right"
          className="w-full h-full object-contain rounded-r-xl"
        />
        <div className="absolute inset-0 rounded-r-xl bg-gradient-to-t from-black/40 via-black/10 to-black/40" />
      </div>
    </section>
  );
};

export default Discount;
