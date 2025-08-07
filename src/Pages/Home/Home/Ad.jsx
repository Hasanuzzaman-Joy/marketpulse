import React from "react";
import { FaShoppingCart, FaFireAlt, FaLeaf } from "react-icons/fa";

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
        <section className="w-full max-w-screen-xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 mt-20">
            {adsData.map((ad) => (
                <div
                    key={ad.id}
                    className={`flex items-center justify-between p-6 rounded-2xl shadow-sm ${ad.bgColor}`}
                >
                    {/* Text Content */}
                    <div className="space-y-2 max-w-[60%]">
                        <div className="flex items-center gap-2 text-sm font-semibold">
                            {ad.icon}
                            <span>{ad.title}</span>
                        </div>
                        <h3 className="text-lg font-bold leading-tight">{ad.subtitle}</h3>
                        <p className="text-sm text-gray-600">{ad.discount}</p>
                        <button className="mt-3 px-4 py-2 text-sm bg-black text-white rounded-full hover:bg-gray-800 transition">
                            <FaShoppingCart className="inline-block mr-1 w-4 h-4" />
                            Shop Now
                        </button>
                    </div>

                    {/* Image */}
                    <div className="max-w-[40%]">
                        <img
                            src={ad.image}
                            alt={ad.title}
                            className="object-contain w-full h-auto"
                        />
                    </div>
                </div>
            ))}
        </section>
    );
}
