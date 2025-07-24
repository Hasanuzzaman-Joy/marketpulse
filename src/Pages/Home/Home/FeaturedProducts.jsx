import { FaHeart } from "react-icons/fa";
import { format } from "date-fns";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import useRole from "../../../hooks/useRole";
import { toast, ToastContainer } from "react-toastify";
import { Link } from "react-router";
import Loading from "../../shared/Loading";
import ZoomIn from "../../shared/ZoomIn";

const FeaturedProducts = ({ products }) => {
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();
    const queryClient = useQueryClient();
    const { userRole, authLoading } = useRole();

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

    if (authLoading) return <Loading />

    return (
        <section className="mb-12 my-10">
            <h2 className="text-3xl font-heading font-bold text-secondary mb-6">
                Featured Products
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.slice(0, 6).map((product) => (
                    <ZoomIn key={product._id}>
                    <div
                        className="bg-white border border-border rounded shadow overflow-hidden transition hover:shadow"
                    >
                        {/* Upper Part */}
                        <div className="relative bg-bg-alt h-40 flex justify-center items-center">
                            {/* Wishlist Icon */}
                            <button
                                onClick={() => handleAddToWishlist(product._id)}
                                disabled={addToWishlistMutation.isLoading || userRole === "admin" || userRole === "vendor"}
                                className={`absolute top-3 right-3 bg-white text-accent p-2 rounded-full shadow-md hover:text-red-500 transition ${addToWishlistMutation.isLoading || userRole === "admin" || userRole === "vendor"
                                        ? "cursor-not-allowed text-gray-400 hover:text-gray-400"
                                        : "cursor-pointer"
                                    }`}
                                title="Add to Wishlist"
                            >
                                <FaHeart />
                            </button>

                            {/* Product Image */}
                            <img
                                src={product.image}
                                alt={product.itemName}
                                className="h-32 object-contain"
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
                            <p className="text-base font-medium py-1 mb-5">
                                {format(new Date(product.date), "dd MMMM, yyyy")}
                            </p>
                            <Link to={`/product-details/${product._id}`} className="text-white px-3 py-2 rounded bg-secondary hover:bg-accent transition font-semibold cursor-pointer">
                                View Details
                            </Link>
                        </div>
                    </div>
                    </ZoomIn>
                ))}
            </div>
            <ToastContainer />
        </section>
    );
};

export default FeaturedProducts;
