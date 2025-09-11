import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import useAuth from "../../../../hooks/useAuth";
import SynchronizedLineChart from "./SynchronizedLineChart";
import Loading from "../../../shared/Loading";
import { FaChartLine } from "react-icons/fa";

const ViewPriceTrends = () => {
  useEffect(() => {
    document.title = "MarketPulse - Price Trends";
  }, []);

  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  // Fetch all products for the user
  const { data: products = [], isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/all-products?email=${user?.email}`);
      return res.data;
    },
  });

  const [selectedProductId, setSelectedProductId] = useState("");
  const selectedProduct = products.find((p) => p._id === selectedProductId);

  // Set default selected product when products load
  useEffect(() => {
    if (products.length && !selectedProductId) {
      setSelectedProductId(products[0]._id);
    }
  }, [products, selectedProductId]);

  if (isLoading) return <Loading />;

  return (
    <div className="font-body text-main p-6 md:p-10 bg-white ">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-start gap-6 mb-8">
        {/* Title Section */}
        <div>
          <h2 className="text-3xl text-primary font-bold mb-6 flex items-center gap-2">
            <FaChartLine /> Price Trends
          </h2>
          <p className="text-text-secondary text-sm md:text-base">
            {selectedProduct
              ? `Tracking price trends for ${selectedProduct.itemName}.`
              : "Select a product to view price trends."}
          </p>
        </div>

        {/* Product Selector */}
        <div className="w-full md:w-64">
          <label className="block text-base font-medium text-main">
            Select Product
          </label>
          <select
            value={selectedProductId}
            onChange={(e) => setSelectedProductId(e.target.value)}
            className="mt-2 w-full px-2 py-3 border border-border rounded-md text-base focus:outline-none focus:ring-2 focus:ring-accent bg-white text-main cursor-pointer"
          >
            {products.map((product) => (
              <option
                key={product._id}
                value={product._id}
                className="cursor-pointer py-1"
              >
                {product.itemName}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Chart or Message */}
      {selectedProduct?.prices?.length > 0 ? (
        <SynchronizedLineChart data={formatChartData(selectedProduct.prices)} />
      ) : (
        <div className="text-center text-gray-500 mt-12 text-sm">
          No price data available for this product.
        </div>
      )}
    </div>
  );
};

// format date to "Apr 1", "Jul 2", etc.
function formatChartData(prices) {
  return prices.map((item) => {
    const date = new Date(item.date);
    const formattedDate = date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
    return { ...item, date: formattedDate };
  });
}

export default ViewPriceTrends;
