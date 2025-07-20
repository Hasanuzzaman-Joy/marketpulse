import { format } from "date-fns";
import Modal from "../../../shared/Modal";
import Button from "../../../shared/Button";

const AdvertisementModal = ({ advertisement, onClose, isOpen }) => {
  if (!advertisement) return null;

  const {
    title,
    description,
    image,
    status,
    adCreatedBy,
    createdAt,
  } = advertisement;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title}>
      <table className="w-full text-left border-collapse border border-border font-body text-main text-sm mb-4">
        <tbody>
          <tr className="border border-border bg-bg">
            <th className="px-4 py-2 font-heading text-secondary w-40">Title</th>
            <td className="px-4 py-2 border border-border break-all">{title}</td>
          </tr>
          <tr className="border border-border">
            <th className="px-4 py-2 font-heading text-secondary">Description</th>
            <td className="px-4 py-2 border border-border">{description}</td>
          </tr>
          <tr className="border border-border bg-bg">
            <th className="px-4 py-2 font-heading text-secondary">Created By</th>
            <td className="px-4 py-2 border border-border break-all">{adCreatedBy}</td>
          </tr>
          <tr className="border border-border">
            <th className="px-4 py-2 font-heading text-secondary">Status</th>
            <td className="px-4 py-2 border border-border">
              <span
                className={`px-3 py-1 rounded text-sm font-medium ${
                  status === "approved"
                    ? "bg-green-100 text-green-700"
                    : status === "pending"
                    ? "bg-yellow-100 text-yellow-700"
                    : "bg-red-100 text-red-600"
                }`}
              >
                {status}
              </span>
            </td>
          </tr>
          <tr className="border border-border bg-bg">
            <th className="px-4 py-2 font-heading text-secondary">Created At</th>
            <td className="px-4 py-2 border border-border">
              {createdAt ? format(new Date(createdAt), "d MMMM, yyyy") : "N/A"}
            </td>
          </tr>
          {image && (
            <tr className="border border-border">
              <th className="px-4 py-2 font-heading text-secondary">Image</th>
              <td className="px-4 py-2 border border-border">
                <img
                  src={image}
                  alt="Advertisement"
                  className="w-full max-w-xs h-auto rounded shadow border border-gray-300"
                />
              </td>
            </tr>
          )}
        </tbody>
      </table>

      <div className="flex justify-end gap-2">
        <Button onClick={onClose}>Close</Button>
      </div>
    </Modal>
  );
};

export default AdvertisementModal;
