import React from "react";
import Marquee from "react-fast-marquee";

const partners = [
  "https://via.placeholder.com/80?text=A",
  "https://via.placeholder.com/80?text=B",
  "https://via.placeholder.com/80?text=C",
  "https://via.placeholder.com/80?text=D",
  "https://via.placeholder.com/80?text=E",
  "https://via.placeholder.com/80?text=F",
  "https://via.placeholder.com/80?text=G",
];

const OurPartners = () => {
  return (
    <section className="w-full mx-auto my-16 px-4">
      <h2 className="text-3xl font-semibold text-center mb-8">Our Partners</h2>
      <Marquee gradient={false} speed={50} pauseOnHover={true}>
        {/* Use inline-flex and no gap on container */}
        <div className="inline-flex">
          {partners.map((logo, idx) => (
            <div
              key={idx}
              className="flex items-center justify-center w-24 h-24 rounded-full bg-gray-100 shadow-md mx-4"
            >
              <img
                src={logo}
                alt={`Partner logo ${idx + 1}`}
                className="w-16 h-16 object-contain"
              />
            </div>
          ))}
        </div>
      </Marquee>
    </section>
  );
};

export default OurPartners;
