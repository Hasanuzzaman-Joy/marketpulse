import { useState } from "react";
import {
  MdInventory,
  MdDelete,
  MdEdit,
  MdCheckCircle,
  MdCancel,
  MdVisibility,
} from "react-icons/md";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import useAuth from "../../../../hooks/useAuth";
import useSuccessAlert from "../../../../hooks/useSuccessAlert";
import Loading from "../../../shared/Loading";
import Button from "../../../shared/Button";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";
import { format } from "date-fns";
import Swal from "sweetalert2";
import Modal from "../../../shared/Modal";

const AdminAllProducts = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const showSuccess = useSuccessAlert();

  // Fetch products
  const { data: products = [], isLoading } = useQuery({
    queryKey: ["all-products"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/all-products?email=${user?.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  // Mutation to update status
  const updateStatusMutation = useMutation({
    mutationFn: async ({ productId, newStatus }) => {
      const res = await axiosSecure.patch(`/approve-product/${productId}?email=${user?.email}`, {
        status: newStatus,
      });
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["all-products"] });
      setSelectedProduct(null);

      Swal.fire({
        icon: "success",
        title: "Product Approved!",
        text: "The product status has been updated to approved.",
        timer: 2000,
        showConfirmButton: false,
      });
    },
  });

  const [selectedProduct, setSelectedProduct] = useState(null);
  const closeModal = () => setSelectedProduct(null);

  // DELETE product mutation
  const deleteProductMutation = useMutation({
    mutationFn: async (productId) => {
      const res = await axiosSecure.delete(`/delete-products/${productId}?email=${user?.email}`);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["all-products"] });
      showSuccess({
        title: "Product Deleted...",
        text: "The product was successfully removed.",
      });
    },
    onError: (error) => {
      Swal.fire({
        icon: "error",
        title: "Failed to Delete...",
        text: error?.response?.data?.message || "An error occurred.",
      });
    },
  });

  return (
    <div className="p-6 md:p-10 bg-white text-main font-body">
      {/* Heading */}
      <div className="mb-8 space-y-2">
        <h2 className="text-3xl font-heading font-bold text-secondary">All Products</h2>
        <p className="text-text-secondary text-base md:text-lg">
          Overview of all vendor-created products. You can review and manage their statuses.
        </p>
      </div>

      {/* Table */}
      {isLoading ? (
        <Loading />
      ) : products.length === 0 ? (
        <div className="flex flex-col items-center justify-center text-center space-y-3 min-h-[60vh] bg-gray-100 px-4">
          <MdInventory className="text-secondary text-6xl mb-2" />
          <h3 className="text-2xl md:text-3xl font-heading font-bold text-secondary leading-9">
            No products found
          </h3>
          <p className="text-text-secondary text-lg leading-7 mb-6">
            Vendors haven't added any products yet.
          </p>
        </div>
      ) : (
        <>
          <div className="overflow-x-auto bg-bg rounded shadow-sm">
            <table className="min-w-full text-left text-base text-main">
              <thead className="bg-secondary text-white text-sm font-medium">
                <tr>
                  <th className="px-6 py-4">#</th>
                  <th className="px-6 py-4">Item Name</th>
                  <th className="px-6 py-4">Vendor Email</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 text-center">View</th>
                  <th className="px-6 py-4 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="text-sm font-medium">
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
                          className="w-10 h-10 rounded-md object-cover border border-border"
                        />
                        <span className="font-medium">{item.itemName}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 break-all">{item.vendorEmail}</td>
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

                    {/* View Button */}
                    <td className="px-6 py-4 text-center">
                      <Button
                        onClick={() => setSelectedProduct(item)}
                        data-tooltip-id={`view-tooltip-${item._id}`}
                        data-tooltip-content="View"
                        data-tooltip-place="top"
                        className="px-3 py-1"
                      >
                        <MdVisibility size={18} />
                      </Button>
                      <Tooltip id={`view-tooltip-${item._id}`} />
                    </td>

                    {/* Action Icons */}
                    <td className="px-6 py-4 text-center">
                      <div className="flex items-center justify-center gap-4 text-xl">
                        {/* Approve button only if not approved */}
                        {item.status !== "approved" && (
                          <button
                            onClick={() =>
                              updateStatusMutation.mutate({ productId: item._id, newStatus: "approved" })
                            }
                            disabled={updateStatusMutation.isLoading}
                            className="text-green-600 hover:text-green-800 cursor-pointer disabled:opacity-50"
                            data-tooltip-id={`approve-tooltip-${item._id}`}
                            data-tooltip-content="Approve"
                            data-tooltip-place="top"
                          >
                            <MdCheckCircle />
                          </button>
                        )}
                        <Tooltip id={`approve-tooltip-${item._id}`} />

                        {/* Reject button (optional) */}
                        <button
                          className="text-red-600 hover:text-red-800 cursor-pointer"
                          data-tooltip-id={`reject-tooltip-${item._id}`}
                          data-tooltip-content="Reject"
                          data-tooltip-place="top"
                        >
                          <MdCancel />
                        </button>
                        <Tooltip id={`reject-tooltip-${item._id}`} />

                        {/* Edit */}
                        <button
                          onClick={() => navigate(`/dashboard/update-product/${item._id}`)}
                          className="text-accent hover:text-secondary cursor-pointer"
                          data-tooltip-id={`edit-tooltip-${item._id}`}
                          data-tooltip-content="Edit"
                          data-tooltip-place="top"
                        >
                          <MdEdit />
                        </button>
                        <Tooltip id={`edit-tooltip-${item._id}`} />

                        {/* Delete */}
                        <button
                          onClick={() => {
                            Swal.fire({
                              title: "Are you sure?",
                              text: "You won't be able to revert this!",
                              icon: "warning",
                              showCancelButton: true,
                              confirmButtonColor: "#0a472e",
                              cancelButtonColor: "#a8b324",
                              confirmButtonText: "Yes, delete it!",
                            }).then((result) => {
                              if (result.isConfirmed) {
                                deleteProductMutation.mutate(item._id);
                              }
                            });
                          }}
                          className="text-gray-600 hover:text-gray-800 cursor-pointer"
                          data-tooltip-id={`delete-tooltip-${item._id}`}
                          data-tooltip-content="Delete"
                          data-tooltip-place="top"
                          disabled={deleteProductMutation.isLoading}
                        >
                          <MdDelete />
                        </button>
                        <Tooltip id={`delete-tooltip-${item._id}`} />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* modal */}
          {selectedProduct && (
            <Modal
              isOpen={!!selectedProduct}
              onClose={closeModal}
              title={selectedProduct.itemName}
            >
              <table className="w-full text-left border-collapse border border-border font-body text-main text-sm">
                <tbody>
                  <tr className="border border-border bg-bg">
                    <th className="px-4 py-2 font-heading text-secondary w-40">Product ID</th>
                    <td className="px-4 py-2 border border-border break-all">{selectedProduct._id}</td>
                  </tr>
                  <tr className="border border-border">
                    <th className="px-4 py-2 font-heading text-secondary">Vendor Email</th>
                    <td className="px-4 py-2 border border-border break-all">{selectedProduct.vendorEmail}</td>
                  </tr>
                  <tr className="border border-border bg-bg">
                    <th className="px-4 py-2 font-heading text-secondary">Vendor Name</th>
                    <td className="px-4 py-2 border border-border">{selectedProduct.vendorName}</td>
                  </tr>
                  <tr className="border border-border">
                    <th className="px-4 py-2 font-heading text-secondary">Market Name</th>
                    <td className="px-4 py-2 border border-border">{selectedProduct.marketName}</td>
                  </tr>
                  <tr className="border border-border bg-bg">
                    <th className="px-4 py-2 font-heading text-secondary">Date</th>
                    <td className="px-4 py-2 border border-border">
                      {selectedProduct.date
                        ? format(new Date(selectedProduct.date), "d MMMM, yyyy")
                        : "N/A"}
                    </td>
                  </tr>
                  <tr className="border border-border">
                    <th className="px-4 py-2 font-heading text-secondary">Market Description</th>
                    <td className="px-4 py-2 border border-border">{selectedProduct.marketDescription}</td>
                  </tr>
                  <tr className="border border-border bg-bg">
                    <th className="px-4 py-2 font-heading text-secondary">Item Name</th>
                    <td className="px-4 py-2 border border-border">{selectedProduct.itemName}</td>
                  </tr>
                  <tr className="border border-border">
                    <th className="px-4 py-2 font-heading text-secondary">Status</th>
                    <td className="px-4 py-2 border border-border">
                      <span
                        className={`px-3 py-1 rounded text-sm font-medium ${selectedProduct.status === "approved"
                          ? "bg-green-100 text-green-700"
                          : selectedProduct.status === "pending"
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-red-100 text-red-600"
                          }`}
                      >
                        {selectedProduct.status}
                      </span>
                    </td>
                  </tr>
                  <tr className="border border-border bg-bg">
                    <th className="px-4 py-2 font-heading text-secondary">Price Per Unit</th>
                    <td className="px-4 py-2 border border-border">{selectedProduct.pricePerUnit}</td>
                  </tr>
                  <tr className="border border-border bg-bg">
                    <th className="px-4 py-2 font-heading text-secondary">Item Description</th>
                    <td className="px-4 py-2 border border-border">
                      {selectedProduct.itemDescription || "No description"}
                    </td>
                  </tr>
                  <tr className="border border-border">
                    <th className="px-4 py-2 font-heading text-secondary">Created At</th>
                    <td className="px-4 py-2 border border-border">
                      {selectedProduct.createdAt
                        ? format(new Date(selectedProduct.createdAt), "d MMMM, yyyy")
                        : "N/A"}
                    </td>
                  </tr>
                </tbody>
              </table>
            </Modal>
          )}
        </>
      )}
    </div>
  );
};

export default AdminAllProducts;
