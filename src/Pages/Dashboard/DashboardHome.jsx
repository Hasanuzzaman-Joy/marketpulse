import React, { useEffect } from 'react';
import useAuth from '../../hooks/useAuth';
import { useNavigate } from 'react-router';
import useRole from '../../hooks/useRole';
import Loading from '../shared/Loading';

const DashboardHome = () => {

    const { user, loading } = useAuth();
    const navigate = useNavigate();
    const { userRole, roleLoading } = useRole()

    useEffect(() => {
        if (!loading && !roleLoading && user && userRole) {
            if (userRole === "admin") {
                return navigate("/dashboard/all-users")
            }else if (userRole === "vendor") {
                navigate("/dashboard/my-products");
            } else if (userRole === "user") {
                navigate("/apply-vendor");
            } else {
                navigate("/forbidden");
            }
        }
    }, [loading, roleLoading, navigate, user, userRole])

    return <Loading />
};

export default DashboardHome;