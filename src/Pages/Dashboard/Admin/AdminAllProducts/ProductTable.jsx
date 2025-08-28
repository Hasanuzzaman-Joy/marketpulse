import {
  MdInventory,
  MdDelete,
  MdEdit,
  MdCheckCircle,
  MdCancel,
  MdVisibility,
} from "react-icons/md";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";
import Swal from "sweetalert2";

const ProductTable = ({
  products,
  onView,
  onApprove,
  onDelete,
  onEdit,
  deleteLoading,
  approveLoading,
  onReject
}) => {
  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center text-center space-y-3 min-h-[60vh] bg-gray-100 px-4">
        <MdInventory className="text-secondary text-6xl mb-2" />
        <h3 className="text-2xl md:text-3xl font-heading font-bold text-secondary leading-9">
          No products found
        </h3>
        <p className="text-text-secondary text-lg leading-7 mb-6">
          Vendors haven't added any products yet.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto bg-bg rounded shadow-sm">
      <table className="min-w-full text-left text-base text-main">
        <thead className="bg-secondary text-white text-base font-medium">
          <tr>
            <th className="px-6 py-4">#</th>
            <th className="px-6 py-4">Item Name</th>
            <th className="px-6 py-4">Vendor Email</th>
            <th className="px-6 py-4">Status</th>
            <th className="px-6 py-4 text-center">View</th>
            <th className="px-6 py-4 text-center">Actions</th>
          </tr>
        </thead>
        <tbody className="text-sm font-semibold">
          {products.map((item, index) => (
            <tr key={item._id} className="border-b border-border">
              <td className="px-6 py-4 font-bold">{index + 1}</td>
              <td className="px-5 py-2">
                <div className="flex items-center gap-3">
                  <img
                    src={
                      item.image ||
                      "https://res.cloudinary.com/dvkiiyhaj/image/upload/v1752928833/ikhyvszgvsjzqqf8xcej.png"
                    }
                    alt={item.itemName}
                    className="w-10 h-10 rounded-md object-cover border border-border p-1"
                  />
                  <span className="font-medium">{item.itemName}</span>
                </div>
              </td>
              <td className="px-6 py-4 break-all">{item.vendorEmail}</td>
              <td className="px-6 py-4">
                <span
                  className={`px-3 py-1 rounded-md text-sm font-medium ${item.status === "approved"
                    ? "bg-green-100 text-green-700"
                    : item.status === "pending"
                      ? "bg-yellow-100 text-yellow-700"
                      : "bg-red-100 text-red-600"
                    }`}
                >
                  {item.status}
                </span>
              </td>

              <td className="px-6 py-4 text-center">
                <button
                  onClick={() => onView(item)}
                  data-tooltip-id={`view-tooltip-${item._id}`}
                  data-tooltip-content="View"
                  data-tooltip-place="top"
                  className="px-3 py-1 cursor-pointer"
                >
                  <MdVisibility size={18} />
                </button>
                <Tooltip id={`view-tooltip-${item._id}`} />
              </td>

              <td className="px-6 py-4 text-center">
                <div className="flex items-center justify-end gap-4 text-xl">
                  {item.status !== "approved" && (
                    <button
                      onClick={() => onApprove(item._id)}
                      disabled={approveLoading}
                      className="text-green-600 hover:text-green-800 cursor-pointer disabled:opacity-50"
                      data-tooltip-id={`approve-tooltip-${item._id}`}
                      data-tooltip-content="Approve"
                      data-tooltip-place="top"
                    >
                      <MdCheckCircle />
                    </button>
                  )}

                  {/* Reject */}
                  {item.status === "pending"  && (
                    <button
                      onClick={() => onReject(item)}
                      className="text-red-600 hover:text-red-800 cursor-pointer"
                      data-tooltip-id={`reject-tooltip-${item._id}`}
                      data-tooltip-content="Reject"
                      data-tooltip-place="top"
                    >
                      <MdCancel />
                    </button>
                  )}

                  {/* Edit */}
                  <button
                    onClick={() => onEdit(item._id)}
                    className="text-accent hover:text-secondary cursor-pointer"
                    data-tooltip-id={`edit-tooltip-${item._id}`}
                    data-tooltip-content="Edit"
                    data-tooltip-place="top"
                  >
                    <MdEdit />
                  </button>
                  <Tooltip id={`edit-tooltip-${item._id}`} />

                  {/* Delete */}
                  <button
                    onClick={() => {
                      Swal.fire({
                        title: "Are you sure?",
                        text: "You won't be able to revert this!",
                        icon: "warning",
                        showCancelButton: true,
                        confirmButtonColor: "#0a472e",
                        cancelButtonColor: "#a8b324",
                        confirmButtonText: "Yes, delete it!",
                      }).then((result) => {
                        if (result.isConfirmed) {
                          onDelete(item._id);
                        }
                      });
                    }}
                    className="text-gray-600 hover:text-gray-800 cursor-pointer"
                    data-tooltip-id={`delete-tooltip-${item._id}`}
                    data-tooltip-content="Delete"
                    data-tooltip-place="top"
                    disabled={deleteLoading}
                  >
                    <MdDelete />
                  </button>
                  <Tooltip id={`delete-tooltip-${item._id}`} />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductTable;
