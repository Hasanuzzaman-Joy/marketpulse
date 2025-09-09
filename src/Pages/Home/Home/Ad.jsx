import Button from "../../shared/Button";
import { FaShoppingCart, FaFireAlt, FaLeaf } from "react-icons/fa";
import ZoomIn from "../../shared/ZoomIn";

const adsData = [
  {
    id: 1,
    title: "New Arrival",
    icon: <FaLeaf className="text-green-600 w-5 h-5" />,
    subtitle: "Organic raw green beans & seed",
    discount: "Get 40% discount for new arrival",
    image:
      "https://res.cloudinary.com/dvkiiyhaj/image/upload/v1754464056/qyf8pk3hpj1nrfs2pvds.png",
    bgColor: "bg-green-50",
  },
  {
    id: 2,
    title: "Hot Deals",
    icon: <FaFireAlt className="text-orange-500 w-5 h-5" />,
    subtitle: "Organic Fruits and vegetables",
    discount: "Get 30% discount for new arrival",
    image:
      "https://res.cloudinary.com/dvkiiyhaj/image/upload/v1754464057/kwaamjj8ss1gdh7helzj.png",
    bgColor: "bg-orange-50",
  },
];

export default function Ad() {
  return (
    <section className="w-full md:max-w-screen-xl mx-auto px-4 grid md:grid-cols-1 lg:grid-cols-2 gap-8 md:gap-8 mt-20">
      {adsData.map((ad) => (
        <ZoomIn key={ad.id}>
          {/* Single Ad Card */}
          <div
            className={`flex h-auto md:h-70 items-center justify-between p-4 md:p-6 border-[1px] border-border rounded-2xl shadow-xl ${ad.bgColor}`}
          >
            {/* Text Content */}
            <div className="space-y-2 max-w-[60%]">
              <div className="flex items-center gap-2 text-base font-semibold">
                {ad.icon}
                <span>{ad.title}</span>
              </div>
              <h3 className="text-2xl md:text-3xl text-primary font-bold leading-tight">
                {ad.subtitle}
              </h3>
              <p className="text-base text-gray-600">{ad.discount}</p>
              <Button className="mt-5 flex justify-center items-center gap-1">
                <FaShoppingCart className="inline-block mr-1 w-4 h-4" />
                Shop Now
              </Button>
            </div>

            {/* Image */}
            <div className="md:max-w-[40%] lg:max-w-[60%]">
              <img
                src={ad.image}
                alt={ad.title}
                className="object-contain w-full h-auto"
              />
            </div>
          </div>
        </ZoomIn>
      ))}
    </section>
  );
}
