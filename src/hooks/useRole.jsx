import React from 'react';
import { useQuery } from "@tanstack/react-query";
import useAuth from "../hooks/useAuth";
import useAxiosSecure from './useAxiosSecure';

const useRole = () => {
  const axiosSecure = useAxiosSecure();
  const { user, loading } = useAuth();

    const { data: userRole = "user", isLoading: roleLoading } = useQuery({
        queryKey: ["role", user?.email],
        enabled: !loading && !!user?.email,
        queryFn: async () => {
            const res = await axiosSecure.get(`/usersRole?email=${user.email}`);
            return res.data.role; 
        },
    });
    return {userRole, roleLoading}
};

export default useRole;