import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";
import useAxios from "../../hooks/useAxios";
import Loading from "../shared/Loading";
import { format } from "date-fns";
import Button from "../shared/Button";
import { useEffect, useState } from "react";
import Pagination from "../shared/Pagination";
import Container from "../shared/Container";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ZoomIn from "../shared/ZoomIn";

const AllProducts = () => {
    useEffect(() => {
        document.title = "MarketPulse - All Products";
    }, []);

    const axiosInstance = useAxios();

    const [page, setPage] = useState(1);
    const [limit] = useState(9);
    const [sortOrder, setSortOrder] = useState(""); // "asc" or "desc"
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
                const isoDate = selectedDate.toISOString().split("T")[0]; // YYYY-MM-DD
                query.append("date", isoDate);
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
        <Container>
            <h1 className="text-3xl font-bold mb-8 text-center font-heading text-secondary">
                <ZoomIn>
                    Explore Our Products Collection
                </ZoomIn>
            </h1>

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
                <DatePicker
                    selected={selectedDate}
                    onChange={(date) => {
                        setPage(1);
                        setSelectedDate(date);
                    }}
                    placeholderText="📅 Filter by Date"
                    dateFormat="yyyy-MM-dd"
                    className="border border-border rounded px-4 py-2 text-base cursor-pointer"
                    isClearable
                />
            </div>

            {/* Product Cards */}
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {products.map((product) => (
                    <ZoomIn key={product._id}>
                        <div
                            className="bg-white rounded overflow-hidden shadow-md border border-border hover:shadow-lg transition duration-300"
                        >
                            <div className="bg-bg-alt">
                                <img
                                    src={product.image}
                                    alt={product.itemName}
                                    className="h-60 w-full object-contain shadow p-6"
                                />
                            </div>
                            <div className="p-5 space-y-2">
                                <h2 className="text-xl font-semibold text-main">
                                    {product.itemName}
                                </h2>
                                <p>
                                    {product.itemDescription}
                                </p>
                                <p>
                                    <span className="font-semibold">Current Price:</span>{' '}
                                    {new Intl.NumberFormat("en-US", {
                                        style: "currency",
                                        currency: "USD",
                                    }).format(product.pricePerUnit)}{' '}
                                    /kg
                                </p>
                                <p>
                                    <span className="font-semibold">Market:</span>{" "}
                                    {product.marketName}
                                </p>
                                <p>
                                    <span className="font-semibold">Vendor:</span>{" "}
                                    {product.vendorName}
                                </p>
                                <p>
                                    <span className="font-semibold">Date:</span>{" "}
                                    {format(new Date(product.date), "PPP")}
                                </p>

                                <Link to={`/product-details/${product._id}`}>
                                    <Button className="mt-3">View Details</Button>
                                </Link>
                            </div>
                        </div>
                    </ZoomIn>
                ))}
            </div>

            {/* 🔽 Pagination */}
            <Pagination
                pages={pages}
                handlePage={handlePage}
                handleNext={handleNext}
                handlePrv={handlePrv}
                currentPage={page}
            />
        </Container>
    );
};

export default AllProducts;
