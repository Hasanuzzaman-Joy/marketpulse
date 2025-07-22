import { FaHeart } from "react-icons/fa";
import { format } from "date-fns";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import { toast, ToastContainer } from "react-toastify";
import { Link } from "react-router";

const FeaturedProducts = ({ products }) => {
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();
    const queryClient = useQueryClient();

    // Mutation to add wishlist
    const addToWishlistMutation = useMutation({
        mutationFn: ({ productId }) =>
            axiosSecure.post(`/wishlist?email=${user?.email}`, { productId }),

        onSuccess: () => {
            toast.success("Added to wishlist");
            queryClient.invalidateQueries({ queryKey: ["wishlist"] });
        },

        onError: () => {
            toast.error("Failed to add to wishlist");
        },
    });
    const handleAddToWishlist = (productId) => {
        if (!user?.email) {
            toast.error("Please login first to add to wishlist");
            return;
        }
        addToWishlistMutation.mutate({ productId });
    };

    return (
        <section className="mb-12">
            <h2 className="text-3xl font-heading font-bold text-secondary mb-6">
                Featured Products
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {products.slice(0, 8).map((product) => (
                    <div
                        key={product._id}
                        className="bg-white border border-border rounded shadow overflow-hidden transition hover:shadow"
                    >
                        {/* Upper Part */}
                        <div className="relative bg-bg-alt h-40 flex justify-center items-center">
                            {/* Wishlist Icon */}
                            <button
                                onClick={() => handleAddToWishlist(product._id)}
                                disabled={addToWishlistMutation.isLoading}
                                className="absolute top-3 right-3 bg-white text-accent p-2 rounded-full shadow-md hover:text-red-500 transition cursor-pointer"
                                title="Add to Wishlist"
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
                        <div className="px-5 py-5">
                            <h3 className="text-xl font-heading font-bold text-primary">
                                {product.itemName}
                            </h3>
                            <p className="text-base font-medium py-1">
                                Price : $ {product.pricePerUnit}
                            </p>
                            <p className="text-base font-medium">{product.marketName}</p>
                            <p className="text-base font-medium py-1">
                                {format(new Date(product.date), "dd MMMM, yyyy")}
                            </p>
                            <Link to={`/product-details/${product._id}`} className="text-white px-3 py-1 rounded bg-secondary hover:bg-accent transition font-semibold cursor-pointer mt-5">
                                View Details
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
            <ToastContainer />
        </section>
    );
};

export default FeaturedProducts;
