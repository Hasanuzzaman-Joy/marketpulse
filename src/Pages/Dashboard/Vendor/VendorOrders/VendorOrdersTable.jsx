import { useState } from "react";
import { FaEye, FaBoxOpen } from "react-icons/fa";
import VendorOrderModal from "./VendorOrderModal";

const VendorOrdersTable = ({ orders, currentPage = 1, itemsPerPage = 10 }) => {
  const [selectedBuyer, setSelectedBuyer] = useState(null);

  // Handle empty state
  if (!orders.length) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[40vh] bg-gray-100 p-6 md:p-10 rounded text-center">
        <FaBoxOpen className="text-6xl text-secondary mb-4" />
        <h3 className="text-2xl md:text-3xl font-bold text-secondary mb-2">
          No Orders Found
        </h3>
        <p className="text-text-secondary text-lg mb-4">No paid orders yet.</p>
      </div>
    );
  }

  return (
    <>
      <div className="overflow-x-auto bg-white rounded shadow-sm">
        <table className="min-w-full text-left text-base text-main">
          <thead className="bg-secondary text-white text-base font-medium">
            <tr>
              <th className="px-6 py-4">#</th>
              <th className="px-6 py-4">Product</th>
              <th className="px-6 py-4">Price</th>
              <th className="px-6 py-4">Buyer Email</th>
              <th className="px-6 py-4">Action</th>
            </tr>
          </thead>
          <tbody className="text-base md:text-sm font-medium">
            {orders.map((order, index) => (
              <tr key={order._id} className="border-b border-border transition">
                <td className="px-6 py-4 font-bold">
                  {(currentPage - 1) * itemsPerPage + index + 1}
                </td>

                <td className="px-6 py-4 flex items-center gap-3">
                  <img
                    src={order.productImage}
                    alt={order.productName || "Product Image"}
                    className="w-12 h-12 rounded-md object-cover border border-border p-1"
                  />
                  <span>{order.productName}</span>
                </td>

                <td className="px-6 py-4">
                  $
                  {typeof order.price === "number"
                    ? order.price.toFixed(2)
                    : order.price || "N/A"}{" "}
                  USD
                </td>

                <td className="px-6 py-4 break-all">{order.buyerEmail}</td>

                <td className="px-6 py-4">
                  <button
                    onClick={() => setSelectedBuyer(order)}
                    className="flex items-center gap-2 bg-accent hover:bg-secondary text-white px-3 py-2 rounded font-semibold cursor-pointer duration-300 transition-all"
                  >
                    <FaEye /> View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Buyer Info Modal */}
      {selectedBuyer && (
        <VendorOrderModal
          buyer={selectedBuyer}
          onClose={() => setSelectedBuyer(null)}
        />
      )}
    </>
  );
};

export default VendorOrdersTable;
