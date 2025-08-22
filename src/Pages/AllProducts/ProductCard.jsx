import { Link } from "react-router";
import { format } from "date-fns";
import { FaStar, FaStarHalfAlt, FaRegStar, FaHeart } from "react-icons/fa";
import { toast } from "react-toastify";
import useAxiosSecure from "../../hooks/useAxiosSecure"; // adjust path if needed
import useAuth from "../../hooks/useAuth";
import useRole from "../../hooks/useRole";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const ProductCard = ({ products }) => {
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();
    const queryClient = useQueryClient();
    const { userRole } = useRole();

    // Wishlist mutation
    const addToWishlistMutation = useMutation({
        mutationFn: ({ productId }) =>
            axiosSecure.post(`/wishlist?email=${user?.email}`, { productId }),
        onSuccess: () => {
            toast.success("Added to watchlist");
            queryClient.invalidateQueries({ queryKey: ["wishlist"] });
        },
        onError: () => {
            toast.error("Already added to the watchlist");
        },
    });

    const handleAddToWishlist = (productId) => {
        if (!user?.email) {
            toast.error("Please login first to add to watchlist");
            return;
        }
        addToWishlistMutation.mutate({ productId });
    };

    // Render star rating
    const renderStars = (rating) => {
        const stars = [];
        for (let i = 1; i <= 5; i++) {
            if (rating >= i) {
                stars.push(<FaStar key={i} />);
            } else if (rating >= i - 0.5) {
                stars.push(<FaStarHalfAlt key={i} />);
            } else {
                stars.push(<FaRegStar key={i} />);
            }
        }
        return stars;
    };

    return (
        <>
            {products.map((product) => {
                return (
                    <div key={product._id} className="bg-gray-100/30 pb-2 border border-border rounded-2xl shadow-xl overflow-hidden transition hover:shadow">
                        {/* Upper Part */}
                        <div className="relative bg-green-400/10 h-40 flex justify-center items-center">
                            {/* Wishlist Icon */}
                            <button
                                onClick={() => handleAddToWishlist(product._id)}
                                disabled={
                                    addToWishlistMutation.isLoading ||
                                    userRole === "admin" ||
                                    userRole === "vendor"
                                }
                                className={`absolute top-3 right-3 bg-white text-accent p-2 rounded-full shadow-md hover:text-red-500 transition ${addToWishlistMutation.isLoading ||
                                        userRole === "admin" ||
                                        userRole === "vendor"
                                        ? "cursor-not-allowed text-gray-400 hover:text-gray-400"
                                        : "cursor-pointer"
                                    }`}
                                title="Add to Watchlist"
                            >
                                <FaHeart />
                            </button>

                            {/* Product Image */}
                            <img
                                src={product.image}
                                alt={product.itemName}
                                className="h-30 object-contain"
                            />
                        </div>

                        {/* Lower Part */}
                        <div className="px-5 py-5 space-y-2">
                            <div className="flex justify-between items-center">
                                <h3 className="text-xl font-heading font-bold text-primary">
                                    {product.itemName}
                                </h3>
                                {/* Star Rating with value */}
                                <div className="flex items-center text-yellow-500 space-x-1">
                                    {renderStars(Number(product.rating))}
                                    <span className="text-primary font-medium text-base">{product.rating}</span>
                                </div>
                            </div>

                            <p className="text-base text-gray-900 font-normal mt-5">
                                <span className="font-medium text-primary">Price:</span>{" "}
                                {new Intl.NumberFormat("en-US", {
                                    style: "currency",
                                    currency: "USD",
                                }).format(product.pricePerUnit)}
                            </p>
                            <p className="text-base text-gray-900 font-normal">
                                <span className="font-medium text-primary">Market:</span> {product.marketName}
                            </p>
                            <p className="text-base text-gray-900 font-normal mb-8">
                                  <span className="font-medium text-primary">Date:</span> {format(new Date(product.date), "d MMMM, yyyy")}
                            </p>
                            <Link
                                to={`/product-details/${product._id}`}
                                className="text-white px-3 py-2 rounded bg-secondary hover:bg-accent transition font-semibold cursor-pointer"
                            >
                                View Details
                            </Link>
                        </div>
                    </div>
                );
            })}
        </>
    );
};

export default ProductCard;
