import { FaEye, FaCheck, FaTimes } from "react-icons/fa";

const VendorTable = ({
  vendorApplications,
  setSelectedVendor,
  updateStatus,
  isPending,
}) => {
  return (
    <div className="overflow-x-auto bg-bg rounded shadow-sm">
      <table className="min-w-full text-left text-base text-main">
        <thead className="bg-secondary text-white text-base font-medium">
          <tr>
            <th className="px-6 py-4">#</th>
            <th className="px-6 py-4">Name</th>
            <th className="px-6 py-4">Email</th>
            <th className="px-6 py-4">Application</th>
            <th className="px-6 py-4 text-center">Actions</th>
          </tr>
        </thead>
        <tbody className="text-base md:text-sm font-medium">
          {vendorApplications.map((vendor, index) => (
            <tr key={vendor._id} className="border-b border-border">
              <td className="px-6 py-4">{index + 1}</td>
              <td className="px-6 py-4">{vendor.name}</td>
              <td className="px-6 py-4 break-all">{vendor.email}</td>
              <td className="px-6 py-4 text-center">
                <button
                  onClick={() => setSelectedVendor(vendor)}
                  className="px-3 py-1 bg-secondary text-white rounded-md flex items-center gap-2 hover:bg-secondary-dark transition"
                >
                  <FaEye /> View
                </button>
              </td>
              <td className="px-6 py-4 text-center flex items-center justify-center gap-3">
                {vendor.vendor_status === "pending" ? (
                  <>
                    <button
                      onClick={() =>
                        updateStatus({
                          vendorId: vendor._id,
                          status: "approved",
                        })
                      }
                      className="px-3 py-1 bg-green-100 text-green-700 rounded-md flex items-center gap-2 hover:bg-green-200 transition"
                      disabled={isPending}
                    >
                      <FaCheck /> Approve
                    </button>
                    <button
                      onClick={() =>
                        updateStatus({
                          vendorId: vendor._id,
                          status: "rejected",
                        })
                      }
                      className="px-3 py-1 bg-red-100 text-red-700 rounded-md flex items-center gap-2 hover:bg-red-200 transition"
                      disabled={isPending}
                    >
                      <FaTimes /> Reject
                    </button>
                  </>
                ) : (
                  <span
                    className={`px-3 py-1 rounded text-base md:text-sm font-medium ${
                      vendor.vendor_status === "approved"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {vendor.vendor_status.charAt(0).toUpperCase() +
                      vendor.vendor_status.slice(1)}
                  </span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default VendorTable;
