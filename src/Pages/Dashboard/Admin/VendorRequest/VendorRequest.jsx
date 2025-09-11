import { useState } from "react";
import { FaClipboardList } from "react-icons/fa";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import useAuth from "../../../../hooks/useAuth";
import VendorTable from "./VendorTable";
import VendorModal from "./VendorModal";
import Loading from "../../../shared/Loading";
import Swal from "sweetalert2";
import ZoomIn from "../../../shared/ZoomIn";

const VendorRequest = () => {
  const [selectedVendor, setSelectedVendor] = useState(null);
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const { user } = useAuth();

  // Fetch vendor applications
  const { data: vendorApplications = [], isLoading } = useQuery({
    queryKey: ["vendor-requests"],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/vendor-requests?email=${user?.email}`
      );
      return res.data;
    },
  });

  const { mutate: updateStatus, isPending } = useMutation({
    mutationFn: async ({ vendorId, status }) => {
      const res = await axiosSecure.patch(
        `/vendor-requests/${vendorId}?email=${user?.email}`,
        {
          status,
        }
      );
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["vendor-requests"]);
      Swal.fire({
        icon: "success",
        title: "Updated!",
        text: "Vendor status updated successfully",
        timer: 2000,
        showConfirmButton: false,
      });
    },
    onError: (err) => {
      console.error(err);
      Swal.fire({
        icon: "error",
        title: "Oops!",
        text: "Failed to update vendor status",
      });
    },
  });

  if (isLoading) return <Loading />;

  return (
    <div className="bg-white text-main font-body shadow-sm p-6 md:p-10">
      {/* Page Title */}
      <div className="mb-8 space-y-2 flex items-center gap-2">
        <FaClipboardList className="text-2xl text-secondary" />
        <h2 className="text-3xl text-primary font-bold">Vendor Applications</h2>
      </div>

      <ZoomIn>
        <VendorTable
          vendorApplications={vendorApplications}
          setSelectedVendor={setSelectedVendor}
          updateStatus={updateStatus}
          isPending={isPending}
        />
      </ZoomIn>

      <VendorModal
        vendor={selectedVendor}
        onClose={() => setSelectedVendor(null)}
      />
    </div>
  );
};

export default VendorRequest;
