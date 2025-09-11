import { useQuery } from "@tanstack/react-query";
import useAxios from "../../hooks/useAxios";
import Loading from "../shared/Loading";
import { useEffect, useState } from "react";
import Pagination from "../shared/Pagination";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Banner from "../shared/Banner";
import ProductCard from "./ProductCard";
import { FaSortAmountDownAlt, FaCalendarAlt, FaBoxOpen } from "react-icons/fa";

const AllProducts = () => {
  useEffect(() => {
    document.title = "MarketPulse - All Products";
  }, []);

  const axiosInstance = useAxios();

  const [page, setPage] = useState(1);
  const [limit] = useState(12);
  const [sortOrder, setSortOrder] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);

  const handlePage = (getPage) => {
    setPage(getPage);
  };

  const handlePrv = () => {
    setPage((prv) => prv - 1);
  };

  const handleNext = () => {
    setPage((prv) => prv + 1);
  };

  // Fetch approved products with pagination, sorting, and date filtering
  const { data = {}, isLoading } = useQuery({
    queryKey: ["approved-products", page, limit, sortOrder, selectedDate],
    queryFn: async () => {
      const query = new URLSearchParams({
        page,
        limit,
      });

      if (sortOrder) query.append("sort", sortOrder);
      if (selectedDate) {
        query.append("date", selectedDate.toISOString().split("T")[0]);
      }

      const res = await axiosInstance.get(
        `/approved-products?${query.toString()}`
      );
      return res.data;
    },
  });

  const { products = [], totalPages = 1 } = data;
  const pages = [...Array(totalPages).keys()].map((i) => i + 1);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [page]);

  if (isLoading) return <Loading />;

  return (
    <>
      {/* Banner  */}
      <Banner
        bgImage="https://i.ibb.co/TMJmZN8w/contact.jpg"
        title=" Explore Our Products Collection"
        breadcrumbLinks={[
          { label: "Home", path: "/" },
          { label: "Products", path: "/products" },
        ]}
      />

      <div className="w-full md:max-w-screen-xl mx-auto px-4 py-16 md:py-22">
        {/* Filters & Sorting */}
        <div className="flex md:flex-wrap justify-between items-center gap-4 mb-6">
          {/* Sort */}
          <div className="relative w-54">
            <FaSortAmountDownAlt className="absolute left-3 top-1/2 -translate-y-1/2 text-[#2c2b2b]" />
            <select
              className="w-full pl-8 pr-4 py-3 border-gray-300 border rounded-md text-[#2c2b2b] text-base font-medium focus:outline-none focus:ring-2 focus:ring-accent cursor-pointer"
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
            >
              <option value="">Sort by Price</option>
              <option value="asc">Price: Low to High</option>
              <option value="desc">Price: High to Low</option>
            </select>
          </div>

          {/* Date Filter */}
          <div className="relative w-48">
            <FaCalendarAlt className="absolute left-3 top-1/2 -translate-y-1/2 text-[#383737]" />
            <DatePicker
              selected={selectedDate}
              onChange={(date) => {
                setPage(1);
                setSelectedDate(date);
              }}
              placeholderText="Filter by Date"
              dateFormat="yyyy-MM-dd"
              className="w-full pl-8 pr-4 py-3 border-gray-300 border rounded-md placeholder-[#2c2b2b] text-base font-medium focus:outline-none focus:ring-2 focus:ring-accent cursor-pointer"
              isClearable
            />
          </div>
        </div>

        {/* Product Cards */}
        {products.length === 0 ? (
          <div className="flex flex-col items-center justify-center min-h-[40vh] bg-gray-100 p-6 md:p-10 rounded">
            <FaBoxOpen className="text-6xl text-secondary mb-4" />
            <h3 className="text-2xl font-bold text-secondary mb-2">
              No Products Found
            </h3>
            <p className="text-text-secondary text-lg mb-4">
              No products found for the selected date.
            </p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
              <ProductCard products={products} />
            </div>

            {/* Pagination */}
            <Pagination
              pages={pages}
              handlePage={handlePage}
              handleNext={handleNext}
              handlePrv={handlePrv}
              currentPage={page}
            />
          </>
        )}
      </div>
    </>
  );
};

export default AllProducts;
