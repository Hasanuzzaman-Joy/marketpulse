import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import Loading from "../../shared/Loading";

const roles = ["admin", "vendor", "user"];

const AllUsers = () => {
  const { loading } = useAuth();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  // Fetch all users
  const { data: users = [], isLoading } = useQuery({
    queryKey: ["all-users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      return res.data;
    },
  });

  // Role update mutation
  const { mutate: updateRole, isPending } = useMutation({
    mutationFn: async ({ userId, role }) => {
      const res = await axiosSecure.patch(`users/updateRole/${userId}`, { role });
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["all-users"]);
    },
    onError: (err) => {
      console.error("Failed to update role", err);
    },
  });

  if (loading || isLoading) return <Loading /> ;

  // Stats
  const totalUsers = users.length;
  const totalAdmins = users.filter(u => u.role === "admin").length;
  const totalVendors = users.filter(u => u.role === "vendor").length;
  const totalNormal = users.filter(u => u.role === "user").length;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-main mb-6">👥 All Users</h2>

      {/* Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-6 mb-8">
        <StatCard title="Total Users" count={totalUsers} />
        <StatCard title="Admins" count={totalAdmins} />
        <StatCard title="Vendors" count={totalVendors} />
        <StatCard title="Normal Users" count={totalNormal} />
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-white rounded-lg border shadow">
        <table className="min-w-full">
          <thead className="bg-gray-100 text-left text-sm">
            <tr>
              <th className="px-4 py-3">#</th>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">Role</th>
              <th className="px-4 py-3">Set Role</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u, idx) => (
              <tr key={u._id} className="border-t hover:bg-gray-50">
                <td className="px-4 py-2">{idx + 1}</td>
                <td className="px-4 py-2 flex items-center gap-2">
                  <img
                    src={u.photo}
                    alt={u.name}
                    className="w-8 h-8 rounded-full border"
                  />
                  {u.name}
                </td>
                <td className="px-4 py-2">{u.email}</td>
                <td className="px-4 py-2 capitalize">{u.role}</td>
                <td className="px-4 py-2">
                  <select
                    className="border border-gray-300 text-sm px-2 py-1 rounded"
                    value={u.role}
                    onChange={(e) =>
                      updateRole({ userId: u._id, role: e.target.value })
                    }
                    disabled={isPending}
                  >
                    {roles.map((roleOption) => (
                      <option key={roleOption} value={roleOption}>
                        {roleOption.charAt(0).toUpperCase() + roleOption.slice(1)}
                      </option>
                    ))}
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllUsers;

// Stat Card Component
const StatCard = ({ title, count }) => (
  <div className="bg-white border shadow p-4 rounded-lg">
    <h3 className="text-sm text-secondary font-medium">{title}</h3>
    <p className="text-2xl font-bold text-main">{count}</p>
  </div>
);
