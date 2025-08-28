import { FaShippingFast } from "react-icons/fa";
import { RiSecurePaymentFill } from "react-icons/ri";
import { TbCashBanknote } from "react-icons/tb";
import ZoomIn from "../../shared/ZoomIn";

const FeatureBanner = () => {
  const items = [
    {
      icon: <FaShippingFast className="text-3xl text-indigo-600" />,
      title: "Free Shipping",
      subtitle: "Fast & free delivery on all orders",
    },
    {
      icon: <RiSecurePaymentFill className="text-3xl text-green-600" />,
      title: "100% Secure Payment",
      subtitle: "Your transactions are safe with us",
    },
    {
      icon: <TbCashBanknote className="text-3xl text-red-600" />,
      title: "Money Back Guarantee",
      subtitle: "Full refund within 7 days",
    },
  ];

  return (
    <div className="w-full md:max-w-screen-xl h-[100px] flex border border-gray-300 divide-x divide-gray-300 bg-white shadow-lg rounded-md mx-auto px-4">
      {items.map((item, idx) => (
        <div key={idx} className="flex-1 flex flex-col justify-center px-4">
          <ZoomIn>
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 flex items-center justify-center bg-green-100 rounded-full">
                {item.icon}
              </div>
              <div>
                <h3 className="text-lg font-semibold font-heading mb-1">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-500">{item.subtitle}</p>
              </div>
            </div>
          </ZoomIn>
        </div>
      ))}
    </div>
  );
};

export default FeatureBanner;
