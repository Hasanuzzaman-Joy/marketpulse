import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import useAuth from "../../../../hooks/useAuth";
import { useNavigate } from "react-router";
import Loading from "../../../shared/Loading";
import { format } from "date-fns";
import Swal from "sweetalert2";
import { FaHeart, FaPlus, FaTrashAlt, FaBoxOpen, FaShoppingBag } from "react-icons/fa";
import Button from "../../../shared/Button";
import { useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import ZoomIn from "../../../shared/ZoomIn";

const ManageWishlist = () => {
    useEffect(() => {
        document.title = "MarketPulse - Wishlist"
    }, [])
    const { user, loading } = useAuth();
    const axiosSecure = useAxiosSecure();
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    // Fetch Wishlist
    const { data: wishlist = [], isLoading } = useQuery({
        queryKey: ["wishlist", user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/get-wishlist?email=${user?.email}`);
            return res.data;
        },
        enabled: !loading && !!user?.email,
    });

    // Mutation to delete wishlist item
    const deleteWishlistMutation = useMutation({
        mutationFn: async (productId) => {
            const res = await axiosSecure.delete(`/delete-wishlist/${productId}?email=${user?.email}`);
            return res.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["wishlist", user?.email] });
            toast.success("Product successfully removed from watchlist")
        },
        onError: () => {
            Swal.fire({
                icon: "error",
                title: "Error",
                text: "Failed to remove item from watchlist.",
            });
        },
    });

    const handleDelete = (productId) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You want to remove this item from your watchlist?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#0a472e",
            cancelButtonColor: "#a8b324",
            confirmButtonText: "Yes, remove it!",
        }).then((result) => {
            if (result.isConfirmed) {
                deleteWishlistMutation.mutate(productId);
            }
        });
    };

    if (loading || isLoading) return <Loading />;

    return (
        <div className="font-body text-main p-6 md:p-10 bg-white">
            <h2 className="text-3xl text-primary font-bold mb-6 flex items-center gap-2">
                <FaHeart /> Manage Watchlist
            </h2>


            {/* Wishlist Table */}
            {
                wishlist.length === 0 ?
                    (
                        <div className="flex flex-col items-center justify-center min-h-[40vh] bg-gray-100 p-6 md:p-10 rounded">
                            <FaBoxOpen className="text-6xl text-secondary mb-4" />
                            <h3 className="text-2xl font-bold text-secondary mb-2">No Products Found</h3>
                            <p className="text-text-secondary text-lg mb-4">Your watchlist is empty.</p>
                        </div>
                    ) :
                    <>
                    <ZoomIn>
                        <div className="overflow-x-auto bg-bg rounded shadow-sm">
                            <table className="min-w-full text-left text-base text-main">
                                <thead className="bg-secondary text-white text-base font-medium">
                                    <tr>
                                        <th className="px-6 py-4">#</th>
                                        <th className="px-6 py-4">Product</th>
                                        <th className="px-6 py-4">Market</th>
                                        <th className="px-6 py-4">Date</th>
                                        <th className="px-6 py-4">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="text-sm font-semibold">
                                    {wishlist.map((item, idx) => (
                                        <tr key={item._id} className="border-b border-border hover:bg-gray-50 transition">
                                            <td className="px-6 py-4 font-bold">{idx + 1}</td>
                                            <td className="px-5 py-2">
                                                <div className="flex items-center gap-3">
                                                    <img
                                                        src={
                                                            item.image ||
                                                            "https://res.cloudinary.com/dvkiiyhaj/image/upload/v1752928833/ikhyvszgvsjzqqf8xcej.png"
                                                        }
                                                        alt={item.itemName}
                                                        className="w-12 h-12 rounded-md object-cover border border-border p-1"
                                                    />
                                                    <span className="font-medium">{item.itemName}</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">{item.marketName}</td>
                                            <td className="px-6 py-4">{format(new Date(item.date), "dd MMMM, yyyy")}</td>
                                            <td className="px-6 py-4 flex gap-3">
                                                <button
                                                    onClick={() => navigate("/products")}
                                                    className="flex items-center gap-1 text-white px-3 py-2 rounded bg-accent hover:bg-secondary transition font-semibold cursor-pointer"
                                                >
                                                    <FaPlus /> Add More
                                                </button>
                                                <Button
                                                    className="flex items-center gap-1"
                                                    onClick={() => handleDelete(item._id)}
                                                >
                                                    <FaTrashAlt /> Remove
                                                </Button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        </ZoomIn>
                    </>
            }
            <ToastContainer />
        </div>
    );
};

export default ManageWishlist;
