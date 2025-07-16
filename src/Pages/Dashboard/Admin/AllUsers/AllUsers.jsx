import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import useAuth from "../../../../hooks/useAuth";
import Loading from "../../../shared/Loading";
import Swal from "sweetalert2";
import StatCard from "../../../shared/StatCard";
import { FaUsers } from "react-icons/fa";

const roles = ["admin", "vendor", "user"];

const AllUsers = () => {
  const { loading, user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  // Fetch all users
  const { data: users = [], isLoading } = useQuery({
    queryKey: ["all-users"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users?email=${user?.email}`);
      return res.data;
    },
    enabled: !loading && !!user?.email,
  });

  // Role update mutation
  const { mutate: updateRole, isPending } = useMutation({
    mutationFn: async ({ userId, role }) => {
      const res = await axiosSecure.patch(`users/updateRole/${userId}?email=${user?.email}`, { role });
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["all-users"]);
      Swal.fire({
        icon: "success",
        title: "Role Updated!",
        text: "User role has been successfully updated.",
        timer: 2000,
        showConfirmButton: false,
      });
    },
    onError: (err) => {
      console.error("Failed to update role", err);
      Swal.fire({
        icon: "error",
        title: "Oops!",
        text: "Failed to update user role.",
      });
    },
  });

  if (loading || isLoading) return <Loading />;

  // Stats
  const totalUsers = users.length;
  const totalAdmins = users.filter((u) => u.role === "admin").length;
  const totalVendors = users.filter((u) => u.role === "vendor").length;
  const totalNormal = users.filter((u) => u.role === "user").length;

  return (
    <div className="font-body text-main">
      <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
        <FaUsers className="text-primary" /> All Users
      </h2>

      {/* Stat Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-8">
        <StatCard title="Total Users" count={totalUsers} bg="bg-green-100" />
        <StatCard title="Admins" count={totalAdmins} bg="bg-pink-100" />
        <StatCard title="Vendors" count={totalVendors} bg="bg-blue-100" />
        <StatCard title="Normal Users" count={totalNormal} bg="bg-yellow-100" />
      </div>

      {/* User Table */}
      <div className="overflow-x-auto bg-white rounded-lg border border-border shadow-md">
        <table className="min-w-full text-sm text-left text-main">
          <thead className="bg-secondary font-heading text-white uppercase tracking-wide">
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
              <tr
                key={u._id}
                className="border-t text-base border-gray-200 hover:bg-gray-50 transition"
              >
                <td className="px-4 py-4 font-bold">{idx + 1}</td>
                <td className="px-4 py-4 flex items-center gap-2">
                  <img
                    src={u.photo}
                    alt={u.name}
                    className="w-8 h-8 rounded-full border-2 border-accent"
                  />
                  {u.name}
                </td>
                <td className="px-4 py-4">{u.email}</td>
                <td className="px-4 py-4 capitalize">{u.role}</td>
                <td className="px-4 py-4">
                  <select
                    className="border border-border px-3 py-2 rounded focus:ring-2 focus:ring-accent text-main cursor-pointer hover:border-accent transition-all duration-200"
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
