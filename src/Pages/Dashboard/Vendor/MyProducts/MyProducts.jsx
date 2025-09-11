import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import useSuccessAlert from "../../../../hooks/useSuccessAlert";
import useAuth from "../../../../hooks/useAuth";
import { Link } from "react-router";
import Swal from "sweetalert2";
import { MdInventory } from "react-icons/md";
import Button from "../../../shared/Button";
import Loading from "../../../shared/Loading";
import RejectionModal from "../../../shared/RejectionModal";
import { FaBoxOpen } from "react-icons/fa";
import ZoomIn from "../../../shared/ZoomIn";
import { format } from "date-fns";

const MyProducts = () => {
  useEffect(() => {
    document.title = "MarketPulse - My Products";
  }, []);
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const showSuccess = useSuccessAlert();

  const [showRejectModal, setShowRejectModal] = useState(false);
  const [selectedRejectionReason, setSelectedRejectionReason] = useState("");
  const [selectedRejectionFeedback, setSelectedRejectionFeedback] =
    useState("");

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

  // Delete Product
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
          text: "Your product has been deleted.",
        });
        refetch();
      } catch (err) {
        console.error("Delete failed:", err);
      }
    }
  };

  // Rejection Modal Handlers
  const openRejectionModal = (reason, feedback) => {
    setSelectedRejectionReason(reason);
    setSelectedRejectionFeedback(feedback);
    setShowRejectModal(true);
  };

  // Close Rejection Modal
  const closeRejectionModal = () => {
    setShowRejectModal(false);
    setSelectedRejectionReason("");
    setSelectedRejectionFeedback("");
  };

  return (
    <div className="p-6 md:p-10 bg-white text-main font-body">
      {/* Page Heading */}
      <div className="mb-8 space-y-2">
        <h2 className="text-3xl text-primary font-bold flex items-center gap-2">
          <FaBoxOpen /> My Products
        </h2>
        <p className="text-text-secondary text-base md:text-lg mb-6">
          Manage all your market listings here. You can update details or remove
          products anytime.
        </p>
      </div>

      {/* Content */}
      {isLoading ? (
        <Loading />
      ) : products.length === 0 ? (
        <div className="flex flex-col items-center justify-center text-center space-y-3 min-h-[60vh] bg-gray-100 px-4">
          <MdInventory className="text-secondary text-6xl mb-2" />
          <h3 className="text-2xl md:text-3xl font-heading font-bold text-secondary leading-9">
            You haven’t added any products yet
          </h3>
          <p className="text-text-secondary text-lg leading-7 mb-6">
            Start adding your products to keep track of your market listings and
            manage their status with ease.
          </p>
          <Link to="/dashboard/add-product">
            <Button>Add Your First Product</Button>
          </Link>
        </div>
      ) : (
        <ZoomIn>
          <div className="overflow-x-auto bg-bg rounded shadow-sm">
            <table className="min-w-full text-left text-base text-main">
              <thead className="bg-secondary text-white text-base font-medium">
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
              <tbody className="text-base md:text-sm font-medium">
                {products.map((item, index) => (
                  <tr key={item._id} className="border-b border-border">
                    <td className="px-6 py-4 font-bold">{index + 1}</td>
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
                        <span>{item.itemName}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">${item.pricePerUnit}</td>
                    <td className="px-6 py-4">{item.marketName}</td>
                    <td className="px-6 py-4">
                      {format(new Date(item.date), "dd MMMM, yyyy")}
                    </td>

                    {/* Status */}
                    <td className="px-6 py-4">
                      <span
                        className={`px-3 py-1 rounded-md ${
                          item.status === "approved"
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
                    <td className="px-6 py-4 space-x-2 flex justify-start items-center gap-2">
                      {item.status === "rejected" ? (
                        <>
                          <Button
                            className="bg-red-600 text-white px-3 py-2 rounded cursor-pointer"
                            onClick={() =>
                              openRejectionModal(
                                item.rejectionReason,
                                item.rejectionFeedback
                              )
                            }
                          >
                            Feedback
                          </Button>
                          <Button onClick={() => handleDelete(item._id)}>
                            Delete
                          </Button>
                        </>
                      ) : (
                        <>
                          <Link to={`/dashboard/update-product/${item._id}`}>
                            <button className="text-white px-3 py-2 rounded bg-accent hover:bg-secondary transition font-semibold cursor-pointer">
                              Update
                            </button>
                          </Link>
                          <Button onClick={() => handleDelete(item._id)}>
                            Delete
                          </Button>
                        </>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </ZoomIn>
      )}

      {/* Rejection Modal */}
      <RejectionModal
        isOpen={showRejectModal}
        onClose={closeRejectionModal}
        rejectionReason={selectedRejectionReason}
        rejectionFeedback={selectedRejectionFeedback}
      />
    </div>
  );
};

export default MyProducts;
