import React, { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import useAuth from "../../../../hooks/useAuth";
import Loading from "../../../shared/Loading";
import Button from "../../../shared/Button";
import { Link } from "react-router";
import { FaShoppingBag, FaBoxOpen, FaBoxes } from "react-icons/fa";
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

      // Normalize backend data for frontend rendering
      return res.data.map(order => {
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
            {orders.length} order{orders.length !== 1 ? 's' : ''} • {totalItems} item{totalItems !== 1 ? 's' : ''}
          </div>
        )}
      </div>

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

      {/* Orders List */}
      {orders.length > 0 && (
        <div className="space-y-6">
          {orders.map((order, idx) => (
            <ZoomIn key={order._id}>
              <div className="border border-border rounded-lg overflow-hidden">
                {/* Order Header */}
                <div className="bg-gray-50 px-6 py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <span className="font-semibold">Order #{orders.length - idx}</span>
                    <span className="text-text-secondary mx-2">•</span>
                    <span className="text-text-secondary">
                      {new Date(order.paidAt).toLocaleDateString()}
                    </span>
                    <span className="text-text-secondary mx-2">•</span>
                    <span className="text-text-secondary">
                      {new Date(order.paidAt).toLocaleTimeString()}
                    </span>
                  </div>
                  <div className="mt-2 sm:mt-0 flex items-center gap-2">
                    {order.type === "multiple" ? (
                      <>
                        <FaBoxes className="text-secondary" />
                        <span className="text-text-secondary">
                          {order.products.length} items
                        </span>
                      </>
                    ) : (
                      <>
                        <FaShoppingBag className="text-secondary" />
                        <span className="text-text-secondary">1 item</span>
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
                        src={
                          order.productImage ||
                          "https://res.cloudinary.com/dvkiiyhaj/image/upload/v1752928833/ikhyvszgvsjzqqf8xcej.png"
                        }
                        alt={order.productName}
                        className="w-16 h-16 rounded-md object-cover border border-border p-1"
                      />
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg">{order.productName}</h3>
                        <p className="text-text-secondary">{order.marketName}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-lg">${parseFloat(order.price).toFixed(2)}</p>
                        <Link to={`/product-details/${order.product_id}`}>
                          <Button className="mt-2">View Details</Button>
                        </Link>
                      </div>
                    </div>
                  ) : (
                    // Multiple Products Order
                    <div>
                      <div className="space-y-4">
                        {order.products.map((product, productIdx) => (
                          <div key={productIdx} className="flex flex-col md:flex-row md:items-center gap-4 pb-4 border-b border-border last:border-b-0">
                            <img
                              src={
                                product.productImage ||
                                "https://res.cloudinary.com/dvkiiyhaj/image/upload/v1752928833/ikhyvszgvsjzqqf8xcej.png"
                              }
                              alt={product.productName}
                              className="w-16 h-16 rounded-md object-cover border border-border p-1"
                            />
                            <div className="flex-1">
                              <h3 className="font-semibold text-lg">{product.productName}</h3>
                              <p className="text-text-secondary">{product.marketName}</p>
                              <p className="text-text-secondary">Qty: {product.quantity}</p>
                            </div>
                            <div className="text-right">
                              <p className="font-bold text-lg">${parseFloat(product.price).toFixed(2)}</p>
                              <Link to={`/product-details/${product.product_id}`}>
                                <Button className="mt-2">View Details</Button>
                              </Link>
                            </div>
                          </div>
                        ))}
                      </div>
                      
                      {/* Order Total */}
                      <div className="flex justify-between items-center mt-6 pt-4 border-t border-border">
                        <span className="text-lg font-semibold">Order Total:</span>
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
