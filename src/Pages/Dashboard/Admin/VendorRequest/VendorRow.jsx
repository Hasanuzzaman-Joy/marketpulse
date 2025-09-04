import { FaEye, FaCheck, FaTimes } from "react-icons/fa";

const VendorRow = ({
  vendor,
  index,
  setSelectedVendor,
  updateStatus,
  isPending,
}) => {
  return (
    <tr key={vendor._id} className="border-b border-border">
      <td className="px-6 py-4 font-bold">{index + 1}</td>
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
        <button
          onClick={() =>
            updateStatus({ vendorId: vendor._id, status: "approved" })
          }
          className="px-3 py-1 bg-green-100 text-green-700 rounded-md flex items-center gap-2 hover:bg-green-200 transition"
          disabled={isPending}
        >
          <FaCheck /> Approve
        </button>
        <button
          onClick={() =>
            updateStatus({ vendorId: vendor._id, status: "rejected" })
          }
          className="px-3 py-1 bg-red-100 text-red-700 rounded-md flex items-center gap-2 hover:bg-red-200 transition"
          disabled={isPending}
        >
          <FaTimes /> Reject
        </button>
      </td>
    </tr>
  );
};

export default VendorRow;
