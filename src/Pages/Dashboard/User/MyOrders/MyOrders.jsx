import React, { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import useAuth from "../../../../hooks/useAuth";
import Loading from "../../../shared/Loading";
import Button from "../../../shared/Button";
import { Link } from "react-router";
import { FaShoppingBag, FaBoxOpen, FaBoxes } from "react-icons/fa";
import ZoomIn from "../../../shared/ZoomIn";
import { format } from "date-fns";

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

      // Normalize backend data for frontend rendering
      return res.data.map((order) => {
        if (order.type === "multiple") {
          return {
            ...order,
            products: order.items || [],
            totalAmount: order.totalAmount || order.amount,
            paidAt: order.paidAt || order.items[0]?.paidAt,
          };
        } else if (order.type === "single") {
          const item = order.items[0] || {};
          return {
            ...order,
            product_id: item.product_id,
            productName: item.productName,
            marketName: item.marketName,
            productImage: item.productImage,
            price: item.price,
            paidAt: order.paidAt || item.paidAt,
          };
        }
        return order;
      });
    },
    enabled: !!user?.email,
  });

  if (isLoading) return <Loading />;

  // Calculate total number of items
  const totalItems = orders.reduce((total, order) => {
    if (order.type === "multiple") {
      return total + (order.products?.length || 0);
    }
    return total + 1;
  }, 0);

  return (
    <div className="overflow-x-auto bg-white rounded shadow-sm p-6 md:p-10">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <h2 className="text-3xl text-primary font-bold flex items-center gap-2">
          <FaShoppingBag /> My Orders
        </h2>
        {orders.length > 0 && (
          <div className="mt-2 md:mt-0 text-lg text-text-secondary">
            {orders.length} order{orders.length !== 1 ? "s" : ""} • {totalItems}{" "}
            item{totalItems !== 1 ? "s" : ""}
          </div>
        )}
      </div>

      {/* No Orders Found */}
      {orders.length === 0 && (
        <div className="flex flex-col items-center justify-center bg-gray-100 p-6 rounded mb-6">
          <FaBoxOpen className="text-6xl text-secondary mb-4" />
          <h3 className="text-2xl font-bold text-secondary mb-2">
            No Orders Found
          </h3>
          <p className="text-text-secondary text-lg">
            You haven't placed any orders yet.
          </p>
          <Link to="/products">
            <Button className="mt-4 flex items-center gap-2">
              <FaShoppingBag /> Shop Now
            </Button>
          </Link>
        </div>
      )}

      {/* Orders List */}
      {orders.length > 0 && (
        <div className="space-y-6">
          {orders.map((order, idx) => (
            <ZoomIn key={order._id}>
              <div className="border border-gray-300 rounded-lg overflow-hidden">
                {/* Order Header */}
                <div className="bg-secondary px-6 py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <span className="font-semibold text-white">
                      Order #{orders.length - idx}
                    </span>
                    <span className="text-white mx-2">•</span>
                    <span className="text-white">
                      {format(new Date(order.paidAt), "dd MMMM, yyyy")}
                    </span>
                    <span className="text-white mx-2">•</span>
                    <span className="text-white">
                      {new Date(order.paidAt).toLocaleTimeString()}
                    </span>
                  </div>
                  <div className="mt-2 sm:mt-0 flex items-center gap-2">
                    {order.type === "multiple" ? (
                      <>
                        <FaBoxes className="text-white" />
                        <span className="text-white">
                          {order.products.length} items
                        </span>
                      </>
                    ) : (
                      <>
                        <FaShoppingBag className="text-white" />
                        <span className="text-white">1 item</span>
                      </>
                    )}
                  </div>
                </div>

                {/* Order Content */}
                <div className="p-6">
                  {order.type === "single" ? (
                    // Single Product Order
                    <div className="flex flex-col md:flex-row md:items-center gap-4">
                      <img
                        src={order.productImage}
                        alt={order.productName}
                        className="w-20 h-20 rounded-md object-contain border border-border p-1"
                      />
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg">
                          {order.productName}
                        </h3>
                        <p className="text-text-secondary">
                          {order.marketName}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-lg">
                          ${parseFloat(order.price).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  ) : (
                    // Multiple Products Order
                    <div>
                      <div className="space-y-4">
                        {order.products.map((product, productIdx) => (
                          <div
                            key={productIdx}
                            className="flex flex-col md:flex-row md:items-center gap-4 pb-4 border-b border-gray-300 last:border-b-0"
                          >
                            <img
                              src={product.productImage}
                              alt={product.productName}
                              className="w-20 h-20 rounded-md object-contain border border-border p-1"
                            />
                            <div className="flex-1">
                              <h3 className="font-semibold text-lg">
                                {product.productName}
                              </h3>
                              <p className="text-text-secondary">
                                {product.marketName}
                              </p>
                              <p className="text-text-secondary">
                                Quantity: {product.quantity}
                              </p>
                            </div>
                            <div className="text-right">
                              <p className="font-bold text-lg">
                                ${parseFloat(product.price).toFixed(2)}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Order Total */}
                      <div className="flex justify-between items-center mt-6 pt-4 border-t border-gray-300">
                        <span className="text-lg font-bold">Order Total:</span>
                        <span className="text-xl font-bold text-primary">
                          ${parseFloat(order.totalAmount).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </ZoomIn>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyOrders;
