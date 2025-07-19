import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import useSuccessAlert from "../../../../hooks/useSuccessAlert";
import useAuth from "../../../../hooks/useAuth";
import { Link } from "react-router";
import Swal from "sweetalert2";
import Container from "@mui/material/Container";
import { MdInventory } from "react-icons/md";
import Button from "../../../shared/Button";
import Loading from "../../../shared/Loading";

const MyProducts = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const showSuccess = useSuccessAlert();

    const {
        data: products = [],
        refetch,
        isLoading,
    } = useQuery({
        queryKey: ["my-products", user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/my-products?email=${user?.email}`);
            return res.data;
        },
        enabled: !!user?.email,
    });

    const handleDelete = async (id) => {
        const res = await Swal.fire({
            title: "Are you sure?",
            text: "You will not be able to recover this product!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#0a472e",
            cancelButtonColor: "#a8b324",
            confirmButtonText: "Yes, delete it!",
        });

        if (res.isConfirmed) {
            try {
                await axiosSecure.delete(`/delete-products/${id}?email=${user?.email}`);
                showSuccess({
                    title: "Deleted...",
                    text: "Your product has been deleted."
                });
                refetch(); 
            } catch (err) {
                console.error("Delete failed:", err);
            }
        }
    };

    return (
        <div className="p-6 md:p-10 bg-white text-main font-body">
            {/* Page Heading */}
            <div className="mb-8 space-y-2">
                <h2 className="text-3xl font-heading font-bold text-secondary">
                    My Products
                </h2>
                <p className="text-text-secondary text-base md:text-lg">
                    Manage all your market listings here. You can update details or remove products anytime.
                </p>
            </div>

            {/* Content */}
            {isLoading ? (
                <Loading />
            ) : products.length === 0 ? (
                <div className="flex flex-col items-center justify-center text-center space-y-3 min-h-[60vh] bg-gray-100 px-4">
                    <MdInventory className="text-secondary text-6xl mb-2" />
                    <h3 className="text-2xl md:text-3xl font-heading font-bold text-secondary  leading-9">
                        You haven’t added any products yet
                    </h3>
                    <p className="text-text-secondary text-lg leading-7 mb-6">
                        Start adding your products to keep track of your market listings and manage their status with ease.
                    </p>
                    <Link to="/dashboard/add-product">
                        <Button>Add Your First Product</Button>
                    </Link>
                </div>
            ) : (
                <div className="overflow-x-auto bg-bg rounded shadow-sm">
                    <table className="min-w-full text-left text-base text-main">
                        <thead className="bg-secondary text-white text-sm font-medium">
                            <tr>
                                <th className="px-6 py-4">#</th>
                                <th className="px-6 py-4">Item Name</th>
                                <th className="px-6 py-4">Price/Unit</th>
                                <th className="px-6 py-4">Market Name</th>
                                <th className="px-6 py-4">Date</th>
                                <th className="px-6 py-4">Status</th>
                                <th className="px-6 py-4">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="text-sm font-medium">
                            {products.map((item, index) => (
                                <tr key={item._id} className="border-b border-border">
                                    <td className="px-6 py-4 font-bold">{index}</td>
                                    <td className="px-5 py-2">
                                        <div className="flex items-center gap-3">
                                            <img
                                                src={item.image || "https://res.cloudinary.com/dvkiiyhaj/image/upload/v1752928833/ikhyvszgvsjzqqf8xcej.png"}
                                                alt={item.itemName}
                                                className="w-10 h-10 rounded-md object-cover border border-border"
                                            />
                                            <span className="font-medium">{item.itemName}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">{item.pricePerUnit}</td>
                                    <td className="px-6 py-4">{item.marketName}</td>
                                    <td className="px-6 py-4">
                                        {new Date(item.date).toLocaleDateString()}
                                    </td>

                                    {/* Status */}
                                    <td className="px-6 py-4">
                                        <span
                                            className={`px-3 py-1 rounded-md text-sm font-medium ${item.status === "approved"
                                                ? "bg-green-100 text-green-700"
                                                : item.status === "pending"
                                                    ? "bg-yellow-100 text-yellow-700"
                                                    : "bg-red-100 text-red-600"
                                                }`}
                                        >
                                            {item.status}
                                        </span>
                                    </td>

                                    {/* Actions */}
                                    <td className="px-6 py-4 space-x-2 flex justify-center items-center gap-2">
                                        <Link to={`/dashboard/update-product/${item._id}`}>
                                            <button className="text-white px-3 py-2 rounded bg-accent hover:bg-secondary transition font-semibold cursor-pointer">Update</button>
                                        </Link>
                                        <Button
                                            onClick={() => handleDelete(item._id)}
                                        >
                                            Delete
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default MyProducts;
