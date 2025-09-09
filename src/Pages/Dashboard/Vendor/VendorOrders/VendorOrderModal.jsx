import Modal from "../../../shared/Modal";
import Button from "../../../shared/Button";

const BuyerModal = ({ buyer, onClose }) => {
  if (!buyer) return null;

  return (
    <Modal isOpen={!!buyer} onClose={onClose} title="Buyer Details">
      <table className="w-full text-left border-collapse border border-border font-body text-main text-sm mb-4">
        <tbody>
          <tr className="border border-border bg-bg">
            <th className="px-4 py-2 font-heading text-secondary w-40">Name</th>
            <td className="px-4 py-2 border border-border">{buyer.buyerName || "N/A"}</td>
          </tr>
          <tr className="border border-border">
            <th className="px-4 py-2 font-heading text-secondary">Email</th>
            <td className="px-4 py-2 border border-border">{buyer.buyerEmail}</td>
          </tr>
          <tr className="border border-border bg-bg">
            <th className="px-4 py-2 font-heading text-secondary">Address</th>
            <td className="px-4 py-2 border border-border">{buyer.buyerAddress || "N/A"}</td>
          </tr>
          <tr className="border border-border">
            <th className="px-4 py-2 font-heading text-secondary">Product Name</th>
            <td className="px-4 py-2 border border-border">{buyer.productName || "N/A"}</td>
          </tr>
          <tr className="border border-border bg-bg">
            <th className="px-4 py-2 font-heading text-secondary">Product Image</th>
            <td className="px-4 py-2 border border-border">
              <img
                src={buyer.productImage}
                alt="product-img"
                className="w-40 h-40 object-contain"
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

export default BuyerModal;
