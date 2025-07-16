import { createBrowserRouter } from "react-router";
import RootLayouts from "../Layouts/RootLayouts";
import Home from "../Pages/Home/Home/Home"
import Login from "../Pages/Login/Login";
import Loading from "../Pages/shared/Loading";
import Contact from "../Pages/Contact/Contact";
import Register from "../Pages/Register/Register";
import ErrorPage from "../Pages/ErrorPage/ErrorPage";
import Forbidden from "../Pages/Forbidden/Forbidden";
import DashboardLayouts from "../Layouts/DashboardLayouts";
import AllUsers from "../Pages/Dashboard/Admin/AllUsers/AllUsers";
import PrivateRoute from "./ProtectedRoutes/PrivateRoute";
import ApplyVendor from "../Pages/Dashboard/Vendor/ApplyVendor/ApplyVendor";
import AddProduct from "../Pages/Dashboard/Vendor/AddProduct/AddProduct";

const router = createBrowserRouter([
    {
        path: '/',
        element: <RootLayouts />,
        errorElement: <ErrorPage />,
        children:
            [
                {
                    index: true,
                    element: <Home />
                },
                {
                    path: '/login',
                    element: <Login />
                },
                {
                    path: '/register',
                    element: <Register />
                },
                {
                    path: '/contact',
                    element: <PrivateRoute allowedRoles={["user", "vendor", "admin"]}>
                        <Contact />
                    </PrivateRoute>
                },
                {
                    path: '/apply-vendor',
                    element: <PrivateRoute allowedRoles={["user", "admin"]}>
                        <ApplyVendor />
                    </PrivateRoute>
                },
                {
                    path: '/loading',
                    element: <Loading />
                },
                {
                    path: "/forbidden",
                    element: <Forbidden />,
                }
            ]
    },
    {
        path: '/dashboard',
        element: <PrivateRoute allowedRoles={["user", "vendor", "admin"]}>
            <DashboardLayouts />
        </PrivateRoute>,
        errorElement: <ErrorPage />,
        children: [
            {
                path: 'all-users',
                element: <PrivateRoute allowedRoles={["admin"]}>
                    <AllUsers />
                </PrivateRoute>
            },
            {
                path: 'add-product',
                element: <PrivateRoute allowedRoles={["vendor"]}>
                    <AddProduct />
                </PrivateRoute>
            }
        ]
    }
]);

export default router;