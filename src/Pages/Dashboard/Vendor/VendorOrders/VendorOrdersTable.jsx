import { useState } from "react";
import { FaEye } from "react-icons/fa";
import VendorOrderModal from "./VendorOrderModal";

const VendorOrdersTable = ({ orders, currentPage = 1, itemsPerPage = 10 }) => {
  const [selectedBuyer, setSelectedBuyer] = useState(null);
  
  if (!orders.length) {
    return (
      <div className="flex flex-col items-center justify-center text-center space-y-3 min-h-[60vh] bg-gray-100 px-4">
        <h3 className="text-2xl md:text-3xl font-heading font-bold text-secondary leading-9">
          No orders found
        </h3>
        <p className="text-text-secondary text-lg leading-7 mb-6">
          No paid orders yet.
        </p>
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
          <tbody className="text-sm font-semibold">
            {orders.map((order, index) => (
              <tr key={order._id} className="border-b border-border">
                <td className="px-6 py-4 font-bold">
                  {(currentPage - 1) * itemsPerPage + index + 1}
                </td>

                <td className="px-6 py-4 flex items-center gap-3">
                  <img
                    src={
                      order.productImage ||
                      "https://res.cloudinary.com/dvkiiyhaj/image/upload/v1752928833/ikhyvszgvsjzqqf8xcej.png"
                    }
                    alt={order.productName || "Product Image"}
                    className="w-10 h-10 rounded-md object-cover border border-border p-1"
                  />
                  <span className="font-medium">{order.productName}</span>
                </td>

                <td className="px-6 py-4">
                  ${typeof order.price === "number" ? order.price.toFixed(2) : order.price || "N/A"}
                </td>

                <td className="px-6 py-4 break-all">{order.buyerEmail}</td>

                <td className="px-6 py-4">
                  <button
                    onClick={() => setSelectedBuyer(order)}
                    className="flex items-center gap-2 text-primary hover:text-secondary"
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
        <VendorOrderModal buyer={selectedBuyer} onClose={() => setSelectedBuyer(null)} />
      )}
    </>
  );
};

export default VendorOrdersTable;
