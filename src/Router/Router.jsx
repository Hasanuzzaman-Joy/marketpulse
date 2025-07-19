import { createBrowserRouter } from "react-router";
import RootLayouts from "../Layouts/RootLayouts";
import Home from "../Pages/Home/Home/Home";
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
import AddAdvertisement from "../Pages/Dashboard/Vendor/AddAdvertisement/AddAdvertisement ";
import MyProducts from "../Pages/Dashboard/Vendor/MyProducts/MyProducts";
import UpdateProduct from "../Pages/Dashboard/Vendor/UpdateProduct/UpdateProduct";
import DashboardHome from "../Pages/Dashboard/DashboardHome";
import MyAdvertisements from "../Pages/Dashboard/Vendor/MyAdvertisements/MyAdvertisements";
import AdminAllProducts from "../Pages/Dashboard/Admin/AdminAllProducts/AdminAllProducts";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayouts />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/contact",
        element: (
          <PrivateRoute allowedRoles={["user", "vendor", "admin"]}>
            <Contact />
          </PrivateRoute>
        )
      },
      {
        path: "/apply-vendor",
        element: (
          <PrivateRoute allowedRoles={["user", "admin"]}>
            <ApplyVendor />
          </PrivateRoute>
        )
      },
      {
        path: "/loading",
        element: <Loading />,
      },
      {
        path: "/forbidden",
        element: <Forbidden />,
      },
    ],
  },
  {
    path: "dashboard",
    element: (
      <PrivateRoute allowedRoles={["user", "vendor", "admin"]}>
        <DashboardLayouts />
      </PrivateRoute>
    ),
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: (
          <PrivateRoute allowedRoles={["admin", "vendor", "user"]}>
            <DashboardHome />
          </PrivateRoute>
        )
      },
      {
        path: "all-users",
        element: (
          <PrivateRoute allowedRoles={["admin"]}>
            <AllUsers />
          </PrivateRoute>
        )
      },
      {
        path: "all-products",
        element: (
          <PrivateRoute allowedRoles={["admin"]}>
            <AdminAllProducts />
          </PrivateRoute>
        )
      },
      {
        path: "add-product",
        element: (
          <PrivateRoute allowedRoles={["vendor"]}>
            <AddProduct />
          </PrivateRoute>
        )
      },
      {
        path: "add-advertisement",
        element: (
          <PrivateRoute allowedRoles={["vendor"]}>
            <AddAdvertisement />
          </PrivateRoute>
        )
      },
      {
        path: "update-product/:id",
        element: (
          <PrivateRoute allowedRoles={["admin", "vendor"]}>
            <UpdateProduct />
          </PrivateRoute>
        )
      },
      {
        path: "my-products",
        element: (
          <PrivateRoute allowedRoles={["vendor"]}>
            <MyProducts />
          </PrivateRoute>
        )
      },
      {
        path: "my-advertisements",
        element: (
          <PrivateRoute allowedRoles={["vendor"]}>
            <MyAdvertisements />
          </PrivateRoute>
        )
      }
    ],
  },
]);

export default router;
