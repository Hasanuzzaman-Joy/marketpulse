import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";
import useAxios from "../../hooks/useAxios";
import Loading from "../shared/Loading";
import { format } from "date-fns";
import Button from "../shared/Button";
import { useState } from "react";
import Pagination from "../shared/Pagination";
import Container from "../shared/Container";

const AllProducts = () => {
    const axiosInstance = useAxios();

    const [page, setPage] = useState(1);
    const [limit] = useState(9);

    const handlePage = (getPage) => {
        setPage(getPage);
    }

    const handlePrv = () =>{
        setPage(prv => prv - 1);
    }

    const handleNext = () =>{
        setPage(prv => prv + 1);
    }

    const { data = {}, isLoading } = useQuery({
        queryKey: ["approved-products", page, limit],
        queryFn: async () => {
            const res = await axiosInstance.get(`/approved-products?page=${page}&limit=${limit}`);
            return res.data;
        },
    });

    const { products = [], totalPages = 1 } = data;

    const pages = [...Array(totalPages).keys()].map(i => i + 1);

    if (isLoading) return <Loading />;

    return (
        <Container>
            <h1 className="text-3xl font-semibold mb-8 text-center font-heading text-primary">
                All Approved Products
            </h1>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {products.map((product) => (
                    <div
                        key={product._id}
                        className="bg-white rounded overflow-hidden shadow-md border border-border hover:shadow-lg transition duration-300"
                    >
                        <div className="bg-bg-alt">
                            <img
                                src={product.image}
                                alt={product.itemName}
                                className="h-60 w-full object-contain shadow  p-6"
                            />
                        </div>
                        <div className="p-5 space-y-2">
                            <h2 className="text-xl font-semibold text-main">
                                {product.itemName}
                            </h2>
                            <p className="text-text-secondary">
                                {product.itemDescription}
                            </p>
                            <p className="text-text-secondary">
                                <span className="font-semibold">Current Price:</span> ৳
                                {product.pricePerUnit}/kg
                            </p>
                            <p className="text-text-secondary">
                                <span className="font-semibold">Market:</span> {product.marketName}
                            </p>
                            <p className="text-text-secondary">
                                <span className="font-semibold">Vendor:</span> {product.vendorName}
                            </p>
                            <p className="text-text-secondary">
                                <span className="font-semibold">Date:</span>{" "}
                                {format(new Date(product.date), "PPP")}
                            </p>

                            <Link to={`/product-details/${product._id}`}>
                                <Button>
                                    View Details
                                </Button>
                            </Link>
                        </div>
                    </div>
                ))}
            </div> 

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
