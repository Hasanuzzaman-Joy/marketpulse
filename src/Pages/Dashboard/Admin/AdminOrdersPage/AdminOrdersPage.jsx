import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import Loading from "../../../shared/Loading";
import Pagination from "../../../shared/Pagination";
import OrdersTable from "./OrdersTable";
import useAuth from "../../../../hooks/useAuth";
import { FaShoppingBasket } from "react-icons/fa";
import ZoomIn from "../../../shared/ZoomIn";

const AdminOrdersPage = () => {
  useEffect(() => {
    document.title = "MarketPulse - All Orders";
  }, []);

  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const [page, setPage] = useState(1);
  const [limit] = useState(7);

  // Pagination handlers
  const handlePage = (getPage) => setPage(getPage);
  const handlePrv = () => setPage((prev) => Math.max(prev - 1, 1));
  const handleNext = () => setPage((prev) => prev + 1);

  // Fetch orders with React Query
  const { data = {}, isLoading } = useQuery({
    queryKey: ["adminOrders", page, limit],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/admin/orders?email=${user?.email}&page=${page}&limit=${limit}`
      );
      return res.data;
    },
  });

  // Pagination setup
  const { orders = [], totalPages = 1 } = data;
  const pages = [...Array(totalPages).keys()].map((i) => i + 1);

  if (isLoading) return <Loading />;

  return (
    <div className="font-body text-main shadow-sm p-6 md:p-10 bg-white">
      <h1 className="text-3xl text-primary font-bold mb-6 flex items-center gap-2">
        <FaShoppingBasket /> All Paid Orders
      </h1>
      <ZoomIn>
        <OrdersTable orders={orders} currentPage={page} itemsPerPage={limit} />
      </ZoomIn>
      <Pagination
        pages={pages}
        handlePage={handlePage}
        handleNext={handleNext}
        handlePrv={handlePrv}
        currentPage={page}
      />
    </div>
  );
};

export default AdminOrdersPage;
