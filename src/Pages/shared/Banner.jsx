import { Link } from "react-router";
import ZoomIn from "./ZoomIn";

const Banner = ({ bgImage, title, breadcrumbLinks = [] }) => {
  return (
    <div className="relative w-full h-40 md:h-62">
      <img
        src={bgImage}
        alt="Banner Background"
        className="absolute w-full h-full object-cover"
      />

      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/70 flex flex-col justify-center items-center text-white font-heading text-center px-4">
        {/*  Fixed bottom image */}
        <div className="absolute bottom-0">
          <img
            src="https://i.ibb.co/ynmhfN1Q/ripped-paper-slider-2.png"
            alt="Decorative bottom"
          />
        </div>
        <ZoomIn>
          <p className="text-sm mb-2">
            {breadcrumbLinks.map((item, idx) => (
              <span key={idx}>
                <Link to={item.path} className="hover:underline">
                  {item.label}
                </Link>
                {idx < breadcrumbLinks.length - 1 && " > "}
              </span>
            ))}
          </p>
        </ZoomIn>
        <ZoomIn>
          <h2 className="text-3xl md:text-4xl font-bold tracking-wide">
            {title}
          </h2>
        </ZoomIn>
      </div>
    </div>
  );
};

export default Banner;
