import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import useAuth from "../../../../hooks/useAuth";
import Loading from "../../../shared/Loading";

const MyOrders = () => {
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

  if (orders.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] bg-gray-100 px-4">
        <h3 className="text-2xl font-bold text-secondary mb-2">No orders found</h3>
        <p className="text-text-secondary">You haven't placed any orders yet.</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto bg-white rounded shadow-sm p-4">
      <table className="min-w-full text-left text-base text-main">
        <thead className="bg-secondary text-white text-sm font-medium">
          <tr>
            <th className="px-6 py-4">#</th>
            <th className="px-6 py-4">Product</th>
            <th className="px-6 py-4">Market Name</th>
            <th className="px-6 py-4">Price</th>
            <th className="px-6 py-4">Date</th>
          </tr>
        </thead>
        <tbody className="text-sm font-medium">
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
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MyOrders;
