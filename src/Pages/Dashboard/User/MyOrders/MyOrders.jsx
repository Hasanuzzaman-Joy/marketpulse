import React, { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import useAuth from "../../../../hooks/useAuth";
import Loading from "../../../shared/Loading";
import Button from "../../../shared/Button";
import { Link } from "react-router";
import { FaShoppingBag, FaBoxOpen } from "react-icons/fa";
import ZoomIn from "../../../shared/ZoomIn";

const MyOrders = () => {
  useEffect(() => {
    document.title = "MarketPulse - My Orders";
  }, []);

  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const { data: orders = [], isLoading } = useQuery({
    queryKey: ["myOrders", user?.email],
    queryFn: async () => {
      if (!user?.email) return [];
      const res = await axiosSecure.get(`/orders?email=${user?.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  if (isLoading) return <Loading />;

  return (
    <div className="overflow-x-auto bg-white rounded shadow-sm p-6 md:p-10">
      <h2 className="text-3xl text-primary font-bold mb-6 flex items-center gap-2">
        <FaShoppingBag /> My Orders
      </h2>

      {/* No Orders Found */}
      {orders.length === 0 && (
        <div className="flex flex-col items-center justify-center bg-gray-100 p-6 rounded mb-6">
          <FaBoxOpen className="text-6xl text-secondary mb-4" />
          <h3 className="text-2xl font-bold text-secondary mb-2">No Orders Found</h3>
          <p className="text-text-secondary text-lg">You haven't placed any orders yet.</p>
          <Link to="/products">
            <Button className="mt-4 flex items-center gap-2">
              <FaShoppingBag /> Shop Now
            </Button>
          </Link>
        </div>
      )}

      {/* Orders Table */}
      {orders.length > 0 && (
        <ZoomIn>
        <table className="min-w-full text-left text-base text-main">
          <thead className="bg-secondary text-white text-base font-medium">
            <tr>
              <th className="px-6 py-4">#</th>
              <th className="px-6 py-4">Product</th>
              <th className="px-6 py-4">Market Name</th>
              <th className="px-6 py-4">Price</th>
              <th className="px-6 py-4">Date</th>
              <th className="px-6 py-4">Actions</th>
            </tr>
          </thead>
          <tbody className="text-sm font-semibold">
            {orders.map((order, idx) => (
              <tr key={order._id} className="border-b border-border">
                <td className="px-6 py-4 font-bold">{idx + 1}</td>
                <td className="px-6 py-4 flex items-center gap-3">
                  <img
                    src={
                      order.productImage ||
                      "https://res.cloudinary.com/dvkiiyhaj/image/upload/v1752928833/ikhyvszgvsjzqqf8xcej.png"
                    }
                    alt={order.productName}
                    className="w-10 h-10 rounded-md object-cover border border-border p-1"
                  />
                  <span>{order.productName}</span>
                </td>
                <td className="px-6 py-4">{order.marketName}</td>
                <td className="px-6 py-4">${parseFloat(order.price).toFixed(2)}</td>
                <td className="px-6 py-4">{new Date(order.paidAt).toLocaleString()}</td>
                <td className="px-6 py-4">
                  <Link to={`/product-details/${order.product_id}`}>
                    <Button>View Details</Button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        </ZoomIn>
      )}
    </div>
  );
};

export default MyOrders;
