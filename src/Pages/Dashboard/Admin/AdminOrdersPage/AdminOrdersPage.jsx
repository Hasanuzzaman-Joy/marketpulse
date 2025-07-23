import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import Loading from "../../../shared/Loading";
import OrdersTable from "./OrdersTable";
import useAuth from "../../../../hooks/useAuth";

const AdminOrdersPage = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const { data: orders = [], isLoading } = useQuery({
    queryKey: ["adminOrders"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/admin/orders?email=${user?.email}`);
      return res.data;
    },
  });

  if (isLoading) return <Loading />;


  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">All Paid Orders</h1>
      <OrdersTable orders={orders} />
    </div>
  );
};

export default AdminOrdersPage;
