import { useEffect, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import useAuth from "../../../../hooks/useAuth";
import useSuccessAlert from "../../../../hooks/useSuccessAlert";
import Swal from "sweetalert2";
import Loading from "../../../shared/Loading";
import ProductTable from "./ProductTable";
import ProductModal from "./ProductModal";
import RejectProductModal from "./RejectProductModal";
import { FaClipboardList } from "react-icons/fa";
import ZoomIn from "../../../shared/ZoomIn";

const AdminAllProducts = () => {
  useEffect(() => {
    document.title = "MarketPulse - All Products";
  }, []);
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const showSuccess = useSuccessAlert();

  const [selectedProduct, setSelectedProduct] = useState(null);
  const [rejectProduct, setRejectProduct] = useState(null);

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
      const res = await axiosSecure.patch(
        `/approve-product/${productId}?email=${user?.email}`,
        {
          status: newStatus,
        }
      );
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["all-products"] });
      setSelectedProduct(null);
      showSuccess({
        title: "Product Approved...",
        text: "The product status has been updated to approved.",
      });
    },
  });

  // Reject mutation
  const rejectProductMutation = useMutation({
    mutationFn: async ({ productId, reason, feedback }) => {
      const res = await axiosSecure.patch(
        `/reject-product/${productId}?email=${user?.email}`,
        {
          reason,
          feedback,
        }
      );
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["all-products"] });
      setRejectProduct(null);
      showSuccess({
        title: "Product Rejected",
        text: "The product was successfully marked as rejected.",
      });
    },
    onError: (error) => {
      Swal.fire({
        icon: "error",
        title: "Rejection Failed",
        text: error?.response?.data?.message || "Something went wrong.",
      });
    },
  });

  // Mutation to delete product
  const deleteProductMutation = useMutation({
    mutationFn: async (productId) => {
      const res = await axiosSecure.delete(
        `/delete-products/${productId}?email=${user?.email}`
      );
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
    <div className="bg-white text-main font-body shadow-sm p-6 md:p-10">
      <div className="mb-8 space-y-2">
        <h2 className="text-3xl text-primary font-bold mb-2 flex items-center gap-2">
          <FaClipboardList /> All Products
        </h2>
        <p className="text-text-secondary text-base md:text-lg mb-6">
          Overview of all vendor-created products. You can review and manage
          their statuses.
        </p>
      </div>

      {isLoading ? (
        <Loading />
      ) : (
        <ZoomIn>
          <ProductTable
            products={products}
            onView={setSelectedProduct}
            onApprove={(id) =>
              updateStatusMutation.mutate({
                productId: id,
                newStatus: "approved",
              })
            }
            onDelete={(id) => deleteProductMutation.mutate(id)}
            onEdit={(id) => navigate(`/dashboard/update-product/${id}`)}
            deleteLoading={deleteProductMutation.isLoading}
            approveLoading={updateStatusMutation.isLoading}
            onReject={(product) => setRejectProduct(product)}
          />
        </ZoomIn>
      )}

      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}

      {/* Reject Modal */}
      {rejectProduct && (
        <RejectProductModal
          product={rejectProduct}
          onClose={() => setRejectProduct(null)}
          onSubmit={rejectProductMutation.mutate}
          loading={rejectProductMutation.isLoading}
        />
      )}
    </div>
  );
};

export default AdminAllProducts;
