import { Link } from "react-router";
import { format } from "date-fns";

const ProductCard = ({products}) => {
    return (
        <>
            {products.map((product) => (
                <div key={product._id} className="bg-gray-100/30 pb-2 border border-border rounded-2xl shadow-xl overflow-hidden transition hover:shadow">
                    {/* Upper Part */}
                    <div className="relative bg-green-400/10 h-40 flex justify-center items-center">
                        {/* Product Image */}
                        <img
                            src={product.image}
                            alt={product.itemName}
                            className="h-30 object-contain"
                        />
                    </div>

                    {/* Lower Part */}
                    <div className="px-5 py-5 space-y-2">
                        <h3 className="text-xl font-heading font-bold text-primary">
                            {product.itemName}
                        </h3>
                        <p className="text-base text-gray-900 font-normal">
                            Current Price:{" "}
                            {new Intl.NumberFormat("en-US", {
                                style: "currency",
                                currency: "USD",
                            }).format(product.pricePerUnit)}{" "}
                            /kg
                        </p>
                        <p className="text-base text-gray-900 font-normal">
                            Market: {product.marketName}
                        </p>
                        <p className="text-base text-gray-900 font-normal mb-5">
                            Date: {format(new Date(product.date), "d MMMM, yyyy")}
                        </p>
                        <Link
                            to={`/product-details/${product._id}`}
                            className="text-white px-3 py-2 rounded bg-secondary hover:bg-accent transition font-semibold cursor-pointer"
                        >
                            View Details
                        </Link>
                    </div>
                </div>
            ))}
        </>
    );
};

export default ProductCard;