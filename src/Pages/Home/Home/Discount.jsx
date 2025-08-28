import React, { useEffect, useState } from "react";
import Button from "../../shared/Button";
import ZoomIn from "../../shared/ZoomIn";

const Discount = () => {
  const discountEndDate = new Date("2025-10-15T23:59:59");

  const calculateTimeLeft = () => {
    const now = new Date();
    const difference = discountEndDate - now;

    if (difference <= 0) {
      return { days: "00", hours: "00", minutes: "00", seconds: "00" };
    }

    return {
      days: String(Math.floor(difference / (1000 * 60 * 60 * 24))).padStart(
        2,
        "0"
      ),
      hours: String(Math.floor((difference / (1000 * 60 * 60)) % 24)).padStart(
        2,
        "0"
      ),
      minutes: String(Math.floor((difference / 1000 / 60) % 60)).padStart(
        2,
        "0"
      ),
      seconds: String(Math.floor((difference / 1000) % 60)).padStart(2, "0"),
    };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="w-full md:max-w-screen-xl mx-auto mt-24 px-4">
      <ZoomIn>
        <div className="flex h-[360px] overflow-hidden rounded-xl shadow-lg">
          {/* Left Image with gradient overlay */}
          <div className="relative w-1/4 h-full">
            <img
              src="https://res.cloudinary.com/dvkiiyhaj/image/upload/v1754823519/n4mjicozxi0csehbewvx.jpg"
              alt="Discount Left"
              className="w-full h-full object-cover rounded-l-xl"
            />
            <div className="absolute inset-0 rounded-l-xl bg-gradient-to-t from-black/40 via-black/10 to-black/40" />
          </div>

          {/* Center Content */}
          <div className="w-1/2 bg-gray-50 flex flex-col items-center justify-center text-center p-8">
            <h2 className="text-2xl md:text-4xl font-heading font-extrabold text-secondary">
              Winter Discount
            </h2>
            <p className="text-lg text-gray-600 text-center mt-2 mb-4">
              Limited time offer on all products
            </p>

            <div className="flex gap-4 text-center mb-6">
              {["days", "hours", "minutes", "seconds"].map((unit) => (
                <div
                  key={unit}
                  className="flex flex-col items-center bg-secondary text-white rounded-xl px-4 py-2 min-w-[60px] shadow"
                >
                  <span className="text-2xl font-bold">{timeLeft[unit]}</span>
                  <span className="uppercase text-xs tracking-wide">
                    {unit}
                  </span>
                </div>
              ))}
            </div>

            <Button>Shop Now</Button>
          </div>

          {/* Right Image with gradient overlay */}
          <div className="relative w-1/4 h-full">
            <img
              src="https://res.cloudinary.com/dvkiiyhaj/image/upload/v1754823519/prvmyunoskxhpcai6sid.jpg"
              alt="Discount Right"
              className="w-full h-full object-cover rounded-r-xl"
            />
            <div className="absolute inset-0 rounded-r-xl bg-gradient-to-t from-black/40 via-black/10 to-black/40" />
          </div>
        </div>
      </ZoomIn>
    </section>
  );
};

export default Discount;
