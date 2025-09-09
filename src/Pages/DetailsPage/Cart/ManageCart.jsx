import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import Loading from "../../shared/Loading";
import Button from "../../shared/Button";
import { FaTrashAlt } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router";

const ManageCart = () => {
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  // Fetch cart items
  const { data: cartItems = [], isLoading } = useQuery({
    queryKey: ["cart", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/get-cart?email=${user?.email}`);
      return res.data;
    },
    enabled: !!user?.email && !loading,
  });

  // Mutation for updating item quantity
  const updateQuantityMutation = useMutation({
    mutationFn: ({ itemId, action }) =>
      axiosSecure.patch(
        `/cart/update/${itemId}?email=${user?.email}&action=${action}`
      ),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart", user?.email] });
    },
    onError: () => {
      toast.error("Failed to update cart");
    },
  });

  // Handler for decreasing quantity
  const handleDecrease = (item) => {
    if (item.quantity > 1) {
      updateQuantityMutation.mutate({ itemId: item._id, action: "decrease" });
    }
  };

  // Handler for increasing quantity
  const handleIncrease = (item) => {
    updateQuantityMutation.mutate({ itemId: item._id, action: "increase" });
  };

  // Mutation for removing an item
  const removeItemMutation = useMutation({
    mutationFn: (itemId) =>
      axiosSecure.delete(`/delete-productCart/${itemId}?email=${user?.email}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart", user?.email] });
      toast.success("Item removed from cart");
    },
    onError: () => {
      toast.error("Failed to remove item");
    },
  });

  const handleRemoveItem = (itemId) => {
    removeItemMutation.mutate(itemId);
  };

  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.pricePerUnit * item.quantity,
    0
  );

  if (loading || isLoading) return <Loading />;

  // New handler for Proceed to Checkout
  const handleProceedToCheckout = () => {
    if (cartItems.length === 0) {
      toast.error("Your cart is empty.");
      return;
    }

    // Navigate to the CartCheckout page
    navigate("/cart-checkout", {
      state: {
        cartItems: cartItems,
        totalPrice: totalPrice,
      },
    });
  };

  return (
    <section className="w-full md:max-w-screen-xl mx-auto px-4 text-main font-body py-6 md:py-10 bg-white">
      {/* Title & Subtitle */}
      <div className="mb-8 text-center">
        <h2 className="text-4xl font-bold text-secondary mb-2">
          Your Shopping Cart
        </h2>
        <p className="text-text-secondary text-lg">
          Review your items and enter your details to proceed with checkout.
        </p>
      </div>

      {/* Table + Form */}
      <div className="flex flex-col lg:flex-row gap-8 items-start">
        {/* Cart Table */}
        <div className="w-full lg:w-[65%] overflow-x-auto bg-gray-100 rounded shadow-sm">
          {cartItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-gray-600">
              <FaTrashAlt className="text-6xl mb-4 text-secondary" />
              <h3 className="text-2xl font-bold">Your cart is empty</h3>
              <p className="mt-2 text-base">
                Add some products to get started.
              </p>
            </div>
          ) : (
            <table className="min-w-full text-left text-base text-main">
              <thead className="bg-secondary text-white text-sm font-medium">
                <tr>
                  <th className="px-6 py-4">#</th>
                  <th className="px-6 py-4">Product</th>
                  <th className="px-6 py-4">Price/Unit</th>
                  <th className="px-6 py-4">Quantity</th>
                  <th className="px-6 py-4">Total</th>
                  <th className="px-6 py-4">Actions</th>
                </tr>
              </thead>
              <tbody className="text-sm font-medium">
                {cartItems.map((item, idx) => (
                  <tr
                    key={item._id}
                    className="border-b border-border hover:bg-gray-50 transition"
                  >
                    <td className="px-6 py-4 font-bold">{idx + 1}</td>
                    <td className="px-5 py-2 flex items-center gap-3">
                      <img
                        src={item.image}
                        alt={item.itemName}
                        className="w-12 h-12 rounded-md object-cover border border-border p-1"
                      />
                      <span className="font-medium">{item.itemName}</span>
                    </td>
                    <td className="px-6 py-4">
                      ${parseFloat(item.pricePerUnit).toFixed(2)}
                    </td>
                    <td className="px-6 py-4 flex items-center gap-2">
                      <Button
                        onClick={() => handleDecrease(item)}
                        disabled={item.quantity === 1}
                        className={
                          item.quantity === 1
                            ? "opacity-50 cursor-not-allowed"
                            : ""
                        }
                      >
                        -
                      </Button>
                      <span>{item.quantity}</span>
                      <Button onClick={() => handleIncrease(item)}>+</Button>
                    </td>
                    <td className="px-6 py-4">
                      ${(item.pricePerUnit * item.quantity).toFixed(2)}
                    </td>
                    <td className="px-6 py-4">
                      <Button
                        className="flex items-center gap-2"
                        onClick={() => handleRemoveItem(item._id)}
                      >
                        <FaTrashAlt /> Remove
                      </Button>
                    </td>
                  </tr>
                ))}
                <tr className="font-medium bg-secondary text-white text-lg">
                  <td colSpan={4} className="px-6 py-4 text-right">
                    Total Price:
                  </td>
                  <td className="px-6 py-4">${totalPrice.toFixed(2)}</td>
                  <td></td>
                </tr>
              </tbody>
            </table>
          )}
        </div>

        {/* Customer Form */}
        <div className="w-full lg:w-[35%] p-6 bg-secondary rounded shadow-xl">
          <h3 className="text-3xl font-bold mb-4 text-white">
            Customer Information
          </h3>
          <p className="text-white mb-8 leading-relaxed">
            Confirm your details below to proceed with checkout.
          </p>
          <form className="space-y-4">
            <input
              type="text"
              name="name"
              value={user?.displayName}
              readOnly
              placeholder="Full Name"
              className="w-full px-3 py-2 bg-white text-gray-600 rounded border-none focus:ring-2 focus:ring-accent focus:outline-none"
            />
            <input
              type="email"
              name="email"
              value={user?.email}
              readOnly
              placeholder="Email"
              className="w-full px-3 py-2 bg-white text-gray-600 rounded border-none focus:ring-2 focus:ring-accent focus:outline-none"
            />
            <button
              type="button"
              onClick={handleProceedToCheckout}
              className="w-full text-white px-3 py-2 rounded bg-accent hover:bg-secondary border-[1px] border-white transition font-semibold cursor-pointer"
            >
              Proceed to Checkout (${totalPrice.toFixed(2)})
            </button>
          </form>
        </div>
      </div>
      <ToastContainer />
    </section>
  );
};

export default ManageCart;
