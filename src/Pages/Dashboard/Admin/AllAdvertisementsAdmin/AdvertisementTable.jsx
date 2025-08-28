import {
  MdDelete,
  MdEdit,
  MdCheckCircle,
  MdCancel,
  MdVisibility,
  MdCampaign,
} from "react-icons/md";
import { Tooltip } from "react-tooltip";
import Swal from "sweetalert2";

const AdvertisementTable = ({
  ads,
  onView,
  onApprove,
  onDelete,
  onReject,
  approveLoading,
  deleteLoading,
}) => {
  if (!ads.length) {
    return (
      <div className="flex flex-col items-center justify-center text-center space-y-3 min-h-[60vh] bg-gray-100 px-4">
        <MdCampaign className="text-secondary text-6xl mb-2" />
        <h3 className="text-3xl font-heading font-bold text-secondary">No Ads Found</h3>
        <p className="text-text-secondary text-lg">No advertisements have been submitted yet.</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto bg-bg rounded shadow-sm">
      <table className="min-w-full text-left text-base text-main">
        <thead className="bg-secondary text-white text-base font-medium">
          <tr>
            <th className="px-6 py-4">#</th>
            <th className="px-6 py-4">Ad Title</th>
            <th className="px-6 py-4">Vendor Email</th>
            <th className="px-6 py-4">Status</th>
            <th className="px-6 py-4 text-center">View</th>
            <th className="px-6 py-4 text-center">Actions</th>
          </tr>
        </thead>
        <tbody className="text-sm font-semibold">
          {ads.map((ad, index) => (
            <tr key={ad._id} className="border-b border-border">
              <td className="px-6 py-4 font-bold">{index + 1}</td>
              <td className="px-6 py-4">{ad.title}</td>
              <td className="px-6 py-4 break-all">{ad.adCreatedBy}</td>
              <td className="px-6 py-4">
                <span className={`px-3 py-1 rounded text-sm font-medium ${
                  ad.status === "approved" ? "bg-green-100 text-green-700" :
                  ad.status === "pending" ? "bg-yellow-100 text-yellow-700" :
                  "bg-red-100 text-red-600"
                }`}>
                  {ad.status}
                </span>
              </td>
              <td className="px-6 py-4 text-center">
                <button
                  onClick={() => onView(ad)}
                  className="px-3 py-1 cursor-pointer"
                  data-tooltip-id={`view-ad-${ad._id}`}
                  data-tooltip-content="View"
                  data-tooltip-place="top"
                >
                  <MdVisibility size={18} />
                </button>
                <Tooltip id={`view-ad-${ad._id}`} />
              </td>
              <td className="px-6 py-4 text-center">
                <div className="flex items-center justify-center gap-4 text-xl">
                  {/* Approve button */}
                  {ad.status !== "approved" && (
                    <button
                      onClick={() => onApprove(ad._id)}
                      className="text-green-600 hover:text-green-800 cursor-pointer"
                      disabled={approveLoading}
                      data-tooltip-id={`approve-ad-${ad._id}`}
                      data-tooltip-content="Approve"
                      data-tooltip-place="top"
                    >
                      <MdCheckCircle />
                    </button>
                  )}
                  {/* Reject Button */}
                  {ad.status === "pending" && (
                    <button
                      onClick={() => onReject(ad)}
                      className="text-red-600 hover:text-red-800 cursor-pointer"
                      data-tooltip-id={`reject-ad-${ad._id}`}
                      data-tooltip-content="Reject"
                      data-tooltip-place="top"
                    >
                      <MdCancel />
                    </button>
                  )}
                  {/* Delete Button */}
                  <button
                    onClick={() => {
                      Swal.fire({
                        title: "Are you sure?",
                        text: "This ad will be deleted!",
                        icon: "warning",
                        showCancelButton: true,
                        confirmButtonColor: "#0a472e",
                        cancelButtonColor: "#a8b324",
                        confirmButtonText: "Yes, delete it!",
                      }).then((result) => {
                        if (result.isConfirmed) {
                          onDelete(ad._id);
                        }
                      });
                    }}
                    className="text-gray-600 hover:text-gray-800 cursor-pointer"
                    disabled={deleteLoading}
                  >
                    <MdDelete />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdvertisementTable;
