import Modal from "../../../shared/Modal";
import Button from "../../../shared/Button";
import { format } from "date-fns";

const VendorModal = ({ vendor, onClose }) => {
  if (!vendor) return null;

  return (
    <Modal isOpen={!!vendor} onClose={onClose} title={vendor.name}>
      <table className="w-full text-left border-collapse border border-border font-body text-main text-sm mb-4">
        <tbody>
          <tr className="border border-border bg-bg">
            <th className="px-4 py-2 font-heading text-secondary w-40">Name</th>
            <td className="px-4 py-2 border border-border break-all">
              {vendor.name}
            </td>
          </tr>
          <tr className="border border-border">
            <th className="px-4 py-2 font-heading text-secondary">Email</th>
            <td className="px-4 py-2 border border-border break-all">
              {vendor.email}
            </td>
          </tr>
          <tr className="border border-border bg-bg">
            <th className="px-4 py-2 font-heading text-secondary">
              Document ID
            </th>
            <td className="px-4 py-2 border border-border">
              {vendor.documentId}
            </td>
          </tr>
          <tr className="border border-border">
            <th className="px-4 py-2 font-heading text-secondary">Location</th>
            <td className="px-4 py-2 border border-border">
              {vendor.location}
            </td>
          </tr>
          <tr className="border border-border bg-bg">
            <th className="px-4 py-2 font-heading text-secondary">
              Market Name
            </th>
            <td className="px-4 py-2 border border-border">
              {vendor.marketName}
            </td>
          </tr>
          <tr className="border border-border">
            <th className="px-4 py-2 font-heading text-secondary">
              Description
            </th>
            <td className="px-4 py-2 border border-border">
              {vendor.description}
            </td>
          </tr>
          <tr className="border border-border bg-bg">
            <th className="px-4 py-2 font-heading text-secondary">Status</th>
            <td className="px-4 py-2 border border-border">
              <span
                className={`px-3 py-1 rounded text-sm font-medium ${
                  vendor.vendor_status === "approved"
                    ? "bg-green-100 text-green-700"
                    : vendor.vendor_status === "pending"
                    ? "bg-yellow-100 text-yellow-700"
                    : "bg-red-100 text-red-600"
                }`}
              >
                {vendor.vendor_status}
              </span>
            </td>
          </tr>
          <tr className="border border-border">
            <th className="px-4 py-2 font-heading text-secondary">
              Created At
            </th>
            <td className="px-4 py-2 border border-border">
              {vendor.createdAt
                ? format(new Date(vendor.createdAt), "d MMMM, yyyy")
                : "N/A"}
            </td>
          </tr>
          <tr className="border border-border">
            <th className="px-4 py-2 font-heading text-secondary">Photo</th>
            <td className="px-4 py-2 border border-border">
              <img
                src={vendor.photo}
                alt=""
                className="w-26 h-26 object-contain"
              />
            </td>
          </tr>
        </tbody>
      </table>

      <div className="flex justify-end gap-2">
        <Button onClick={onClose}>Close</Button>
      </div>
    </Modal>
  );
};

export default VendorModal;
