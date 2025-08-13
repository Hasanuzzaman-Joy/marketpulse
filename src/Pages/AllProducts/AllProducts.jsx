import { useQuery } from "@tanstack/react-query";
import useAxios from "../../hooks/useAxios";
import Loading from "../shared/Loading";
import { useEffect, useState } from "react";
import Pagination from "../shared/Pagination";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Banner from "../shared/Banner";
import ProductCard from "./ProductCard";

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

            const res = await axiosInstance.get(`/approved-products?${query.toString()}`);
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

            <div className="w-full md:max-w-screen-xl mx-auto px-4 md:py-10 py-20">
                {/* Filters & Sorting */}
                <div className="flex flex-wrap justify-between items-center gap-4 mb-6">
                    {/* Sort */}
                    <select
                        className="border border-border rounded px-4 py-2 text-base cursor-pointer"
                        value={sortOrder}
                        onChange={(e) => setSortOrder(e.target.value)}
                    >
                        <option value="">Sort by Price</option>
                        <option value="asc">Price: Low to High</option>
                        <option value="desc">Price: High to Low</option>
                    </select>

                    {/* Date Filter */}
                    <div className="relative z-10">
                        <DatePicker
                            selected={selectedDate}
                            onChange={(date) => {
                                setPage(1);
                                setSelectedDate(date);
                            }}
                            placeholderText="📅 Filter by Date"
                            dateFormat="yyyy-MM-dd"
                            className="!text-left !w-48 border border-border rounded px-4 py-2 text-base cursor-pointer"
                            isClearable
                        />
                    </div>
                </div>

                {/* Product Cards */}
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
            </div>
        </>
    );
};

export default AllProducts;
