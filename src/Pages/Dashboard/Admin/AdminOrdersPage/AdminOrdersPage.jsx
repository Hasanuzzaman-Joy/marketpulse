import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import Loading from "../../../shared/Loading";
import Pagination from "../../../shared/Pagination";
import OrdersTable from "./OrdersTable";
import useAuth from "../../../../hooks/useAuth";

const AdminOrdersPage = () => {
  useEffect(() => {
    document.title = "MarketPulse - All Orders";
  }, []);

  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const [page, setPage] = useState(1);
  const [limit] = useState(7);

  const handlePage = (getPage) => setPage(getPage);
  const handlePrv = () => setPage((prev) => Math.max(prev - 1, 1));
  const handleNext = () => setPage((prev) => prev + 1);

  const { data = {}, isLoading } = useQuery({
    queryKey: ["adminOrders", page, limit],
    queryFn: async () => {
      const res = await axiosSecure.get(`/admin/orders?email=${user?.email}&page=${page}&limit=${limit}`);
      return res.data;
    },
  });

  const { orders = [], totalPages = 1 } = data;
  const pages = [...Array(totalPages).keys()].map((i) => i + 1);

  if (isLoading) return <Loading />;

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">All Paid Orders</h1>
      <OrdersTable
        orders={orders}
        currentPage={page}
        itemsPerPage={limit}
      />
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
