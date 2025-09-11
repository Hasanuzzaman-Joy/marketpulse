import { format } from "date-fns";
import Modal from "../../../shared/Modal";
import Button from "../../../shared/Button";

const ProductModal = ({ product, onClose }) => {
  if (!product) return null;

  return (
    <Modal isOpen={!!product} onClose={onClose} title={product.itemName}>
      <table className="w-full text-left border-collapse border border-border font-body text-main text-sm mb-4">
        <tbody>
          <tr className="border border-border bg-bg">
            <th className="px-4 py-2 font-heading text-secondary w-40">
              Product ID
            </th>
            <td className="px-4 py-2 border border-border break-all">
              {product._id}
            </td>
          </tr>
          <tr className="border border-border">
            <th className="px-4 py-2 font-heading text-secondary">
              Vendor Email
            </th>
            <td className="px-4 py-2 border border-border break-all">
              {product.vendorEmail}
            </td>
          </tr>
          <tr className="border border-border bg-bg">
            <th className="px-4 py-2 font-heading text-secondary">
              Vendor Name
            </th>
            <td className="px-4 py-2 border border-border">
              {product.vendorName}
            </td>
          </tr>
          <tr className="border border-border">
            <th className="px-4 py-2 font-heading text-secondary">
              Market Name
            </th>
            <td className="px-4 py-2 border border-border">
              {product.marketName}
            </td>
          </tr>
          <tr className="border border-border bg-bg">
            <th className="px-4 py-2 font-heading text-secondary">Date</th>
            <td className="px-4 py-2 border border-border">
              {product.date
                ? format(new Date(product.date), "d MMMM, yyyy")
                : "N/A"}
            </td>
          </tr>
          <tr className="border border-border">
            <th className="px-4 py-2 font-heading text-secondary">
              Market Description
            </th>
            <td className="px-4 py-2 border border-border">
              {product.marketDescription}
            </td>
          </tr>
          <tr className="border border-border bg-bg">
            <th className="px-4 py-2 font-heading text-secondary">Item Name</th>
            <td className="px-4 py-2 border border-border">
              {product.itemName}
            </td>
          </tr>
          <tr className="border border-border">
            <th className="px-4 py-2 font-heading text-secondary">Status</th>
            <td className="px-4 py-2 border border-border">
              <span
                className={`px-3 py-1 rounded text-sm font-medium ${
                  product.status === "approved"
                    ? "bg-green-100 text-green-700"
                    : product.status === "pending"
                    ? "bg-yellow-100 text-yellow-700"
                    : "bg-red-100 text-red-600"
                }`}
              >
                {product.status}
              </span>
            </td>
          </tr>
          <tr className="border border-border bg-bg">
            <th className="px-4 py-2 font-heading text-secondary">
              Price Per Unit
            </th>
            <td className="px-4 py-2 border border-border">
              {product.pricePerUnit}
            </td>
          </tr>
          <tr className="border border-border bg-bg">
            <th className="px-4 py-2 font-heading text-secondary">
              Item Description
            </th>
            <td className="px-4 py-2 border border-border">
              {product.itemDescription || "No description"}
            </td>
          </tr>
          <tr className="border border-border">
            <th className="px-4 py-2 font-heading text-secondary">
              Created At
            </th>
            <td className="px-4 py-2 border border-border">
              {product.createdAt
                ? format(new Date(product.createdAt), "d MMMM, yyyy")
                : "N/A"}
            </td>
          </tr>
        </tbody>
      </table>

      {/* Action Buttons */}
      <div className="flex justify-end gap-2">
        <Button onClick={onClose}>Close</Button>
      </div>
    </Modal>
  );
};

export default ProductModal;
