import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import useAuth from "../../../../hooks/useAuth";
import { MdCampaign } from "react-icons/md";
import Button from "../../../shared/Button";
import Loading from "../../../shared/Loading";
import AdvertisementForm from "../../../shared/AdvertisementForm";
import Modal from "../../../shared/Modal";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import RejectionModal from "../../shared/RejectionModal";
import Swal from "sweetalert2";
import { FaChartBar } from "react-icons/fa";
import ZoomIn from "../../../shared/ZoomIn";

const MyAdvertisements = () => {
  useEffect(() => {
    document.title = "MarketPulse - My Advertisements";
  }, []);
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const [selectedAd, setSelectedAd] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [rejectionData, setRejectionData] = useState({});

  const {
    data: ads = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["my-ads", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/my-advertisements?email=${user?.email}`
      );
      return res.data;
    },
    enabled: !!user?.email,
  });

  const handleDelete = async (id) => {
    const res = await Swal.fire({
      title: "Are you sure?",
      text: "This will permanently delete your advertisement!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#0a472e",
      cancelButtonColor: "#a8b324",
      confirmButtonText: "Yes, delete it!",
    });

    if (res.isConfirmed) {
      try {
        await axiosSecure.delete(`/delete-ad/${id}?email=${user?.email}`);
        toast.success("Your advertisement has been deleted");
        refetch();
      } catch (err) {
        console.error("Delete failed:", err);
      }
    }
  };

  const handleUpdateClick = (ad) => {
    const { _id, description, image, title } = ad;
    setSelectedAd({ _id, description, image, title });
    setModalOpen(true);
  };

  const handleUpdateSubmit = async (formData) => {
    const updatedData = {
      ...formData,
      image: formData.image || selectedAd.image,
    };

    const hasChanges =
      updatedData.title !== selectedAd.title ||
      updatedData.description !== selectedAd.description ||
      updatedData.image !== selectedAd.image;

    if (!hasChanges) {
      toast.error("No changes detected");
      return;
    }

    setLoading(true);
    try {
      await axiosSecure.patch(
        `/update-ad/${selectedAd._id}?email=${user?.email}`,
        updatedData
      );
      toast.success("Your advertisement has been updated successfully...");
      setModalOpen(false);
      refetch();
    } catch (err) {
      toast.error("Failed to update advertisement. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleRejectionView = (ad) => {
    setRejectionData({
      rejectionReason: ad.rejectionReason || "Not provided",
      rejectionFeedback: ad.rejectionFeedback || "Not provided",
    });
    setShowRejectModal(true);
  };

  return (
    <div className="p-6 md:p-10 bg-white text-main font-body">
      <div className="mb-8 space-y-2">
        <h2 className="text-3xl text-primary font-bold flex items-center gap-2">
          <FaChartBar /> My Advertisements
        </h2>
        <p className="text-text-secondary text-base md:text-lg mb-6">
          Manage all your ad listings here. You can update or remove them
          anytime.
        </p>
      </div>

      {isLoading ? (
        <Loading />
      ) : ads.length === 0 ? (
        <div className="flex flex-col items-center justify-center text-center space-y-3 min-h-[60vh] bg-gray-100 px-4">
          <MdCampaign className="text-secondary text-6xl mb-2" />
          <h3 className="text-2xl md:text-3xl font-heading font-bold text-secondary leading-9">
            You haven’t posted any advertisements yet
          </h3>
          <p className="text-text-secondary text-lg leading-7 mb-6">
            Start promoting your products by adding advertisements.
          </p>
          <a href="/dashboard/add-advertisement">
            <Button>Add Your First Ad</Button>
          </a>
        </div>
      ) : (
        <ZoomIn>
          <div className="overflow-x-auto bg-bg rounded shadow-sm">
            <table className="min-w-full text-left text-base text-main">
              <thead className="bg-secondary text-white text-base font-medium">
                <tr>
                  <th className="px-6 py-4">#</th>
                  <th className="px-6 py-4">Ad Title</th>
                  <th className="px-6 py-4">Short Description</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4">Actions</th>
                </tr>
              </thead>
              <tbody className="text-sm font-semibold">
                {ads.map((ad, index) => (
                  <tr key={ad._id} className="border-b border-border">
                    <td className="px-6 py-4 font-bold">{index + 1}</td>
                    <td className="px-5 py-2">
                      <div className="flex items-center gap-3">
                        <img
                          src={
                            ad.image ||
                            "https://res.cloudinary.com/dvkiiyhaj/image/upload/v1752928833/ikhyvszgvsjzqqf8xcej.png"
                          }
                          alt={ad.title}
                          className="w-10 h-10 rounded-md object-cover border border-border"
                        />
                        <span className="font-medium">{ad.title}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      {ad.description.length > 40
                        ? ad.description.slice(0, 40) + "..."
                        : ad.description}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-3 py-1 rounded-md text-sm font-medium ${
                          ad.status === "approved"
                            ? "bg-green-100 text-green-700"
                            : ad.status === "pending"
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-red-100 text-red-600"
                        }`}
                      >
                        {ad.status || "pending"}
                      </span>
                    </td>
                    <td className="px-6 py-4 space-x-2 flex justify-start items-center gap-2">
                      {ad.status === "rejected" ? (
                        <Button onClick={() => handleRejectionView(ad)}>
                          View Rejection
                        </Button>
                      ) : (
                        <>
                          <button
                            className="text-white px-3 py-2 rounded bg-accent hover:bg-secondary transition font-semibold cursor-pointer"
                            onClick={() => handleUpdateClick(ad)}
                          >
                            Update
                          </button>
                          <Button onClick={() => handleDelete(ad._id)}>
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

      <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)}>
        <h3 className="text-2xl font-bold text-secondary mb-4">
          {selectedAd
            ? `Update Advertisement: ${selectedAd.title}`
            : "Update Advertisement"}
        </h3>
        <AdvertisementForm
          defaultValues={selectedAd || {}}
          onSubmit={handleUpdateSubmit}
          mode="update"
          loading={loading}
        />
      </Modal>

      <RejectionModal
        isOpen={showRejectModal}
        onClose={() => setShowRejectModal(false)}
        rejectionReason={rejectionData.rejectionReason}
        rejectionFeedback={rejectionData.rejectionFeedback}
      />

      <ToastContainer />
    </div>
  );
};

export default MyAdvertisements;
