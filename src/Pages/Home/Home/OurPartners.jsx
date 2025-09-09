import Marquee from "react-fast-marquee";
import ZoomIn from "../../shared/ZoomIn";

const partners = [
  "https://res.cloudinary.com/dvkiiyhaj/image/upload/v1754822649/i061ul10h1mxqsm4pruj.webp",
  "https://res.cloudinary.com/dvkiiyhaj/image/upload/v1754822649/kaz64wsykgyic2otrul7.png",
  "https://res.cloudinary.com/dvkiiyhaj/image/upload/v1754822649/q9dqzqcrhxdny1wks37v.png",
  "https://res.cloudinary.com/dvkiiyhaj/image/upload/v1754822648/skufxloqrfyykprsf8gf.png",
  "https://res.cloudinary.com/dvkiiyhaj/image/upload/v1754822649/fxwodrcr50mnafukgajr.png",
  "https://res.cloudinary.com/dvkiiyhaj/image/upload/v1754822649/l1rgsgkbjbiz2b6xnlgx.png",
  "https://res.cloudinary.com/dvkiiyhaj/image/upload/v1754822649/glvopaxi0mfpf23ker9r.png",
  "https://res.cloudinary.com/dvkiiyhaj/image/upload/v1754822649/lb35gup0gboga1digjed.png",
];

const OurPartners = () => {
  return (
    <section className="w-full md:max-w-screen-xl mx-auto px-4">
      <h2 className="text-2xl md:text-3xl font-heading font-bold text-primary text-center mb-2">
        Our Partners
      </h2>
      <p className="text-base text-gray-600 text-center mb-6">
        Trusted brands and suppliers powering our marketplace
      </p>
      <Marquee gradient={false} speed={50}>
        {[...partners, ...partners].map((logo, idx) => (
          <ZoomIn>
            <div
              key={idx}
              className="flex items-center justify-center w-24 h-24 mx-4"
            >
              <img
                src={logo}
                alt={`Partner logo ${idx + 1}`}
                className="w-20 h-20 object-contain"
              />
            </div>
          </ZoomIn>
        ))}
      </Marquee>
    </section>
  );
};

export default OurPartners;
