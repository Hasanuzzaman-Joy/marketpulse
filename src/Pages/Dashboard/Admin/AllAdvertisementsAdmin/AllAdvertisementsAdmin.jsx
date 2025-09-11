import { useEffect, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import useAuth from "../../../../hooks/useAuth";
import useSuccessAlert from "../../../../hooks/useSuccessAlert";
import Swal from "sweetalert2";
import Loading from "../../../shared/Loading";
import AdvertisementTable from "./AdvertisementTable";
import RejectAdModal from "./RejectAdModal";
import AdvertisementModal from "./AdvertisementModal";
import { FaBullhorn } from "react-icons/fa";

const AdminAllAdvertisements = () => {
  useEffect(() => {
    document.title = "MarketPulse - All Advertisements";
  }, []);
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const showSuccess = useSuccessAlert();

  const [selectedAd, setSelectedAd] = useState(null);
  const [rejectAd, setRejectAd] = useState(null);

  const { data: ads = [], isLoading } = useQuery({
    queryKey: ["all-ads"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/my-advertisements`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  // Approve Mutation
  const approveAdMutation = useMutation({
    mutationFn: async ({ adId }) => {
      const res = await axiosSecure.patch(
        `/approve-ad/${adId}?email=${user?.email}`,
        { status: "approved" }
      );
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["all-ads"]);
      setSelectedAd(null);
      showSuccess({
        title: "Ad Approved",
        text: "The advertisement has been approved.",
      });
    },
  });

  // Reject Mutation
  const rejectAdMutation = useMutation({
    mutationFn: async ({ adId, reason, feedback }) => {
      const res = await axiosSecure.patch(
        `/reject-ad/${adId}?email=${user?.email}`,
        {
          reason,
          feedback,
        }
      );
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["all-ads"]);
      setRejectAd(null);
      showSuccess({
        title: "Ad Rejected",
        text: "The advertisement was rejected.",
      });
    },
    onError: () => {
      Swal.fire({
        icon: "error",
        title: "Rejection Failed",
        text: "Something went wrong.",
      });
    },
  });

  // Delete Mutation
  const deleteAdMutation = useMutation({
    mutationFn: async (adId) => {
      const res = await axiosSecure.delete(
        `/delete-ad/${adId}?email=${user?.email}`
      );
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["all-ads"]);
      showSuccess({
        title: "Ad Deleted",
        text: "The advertisement has been removed.",
      });
    },
  });

  return (
    <div className="p-6 md:p-10 bg-white text-main font-body">
      <div className="mb-8 space-y-2">
        <h2 className="text-3xl text-primary font-bold mb-2 flex items-center gap-2">
          <FaBullhorn /> All Advertisements
        </h2>
        <p className="text-text-secondary text-base md:text-lg mb-6">
          Manage and review advertisements submitted by vendors.
        </p>
      </div>

      {isLoading ? (
        <Loading />
      ) : (
        <AdvertisementTable
          ads={ads}
          onView={setSelectedAd}
          onApprove={(id) => approveAdMutation.mutate({ adId: id })}
          onDelete={(id) => deleteAdMutation.mutate(id)}
          onReject={(ad) => setRejectAd(ad)}
          approveLoading={approveAdMutation.isLoading}
          deleteLoading={deleteAdMutation.isLoading}
        />
      )}

      {selectedAd && (
        <AdvertisementModal
          advertisement={selectedAd}
          isOpen={true}
          onClose={() => setSelectedAd(null)}
        />
      )}

      {/* Reject Modal */}
      {rejectAd && (
        <RejectAdModal ad={rejectAd} onClose={() => setRejectAd(null)} />
      )}
    </div>
  );
};

export default AdminAllAdvertisements;
