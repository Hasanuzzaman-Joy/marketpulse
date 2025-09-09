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
import DashboardHome from "../Pages/Dashboard/DashboardHome/DashboardHome";
import MyAdvertisements from "../Pages/Dashboard/Vendor/MyAdvertisements/MyAdvertisements";
import AdminAllProducts from "../Pages/Dashboard/Admin/AdminAllProducts/AdminAllProducts";
import AllAdvertisementsAdmin from "../Pages/Dashboard/Admin/AllAdvertisementsAdmin/AllAdvertisementsAdmin";
import ViewPriceTrends from "../Pages/Dashboard/User/PriceTrends/ViewPriceTrends";
import ManageWishlist from "../Pages/Dashboard/User/ManageWishlist/ManageWishlist";
import ProductDetails from "../Pages/DetailsPage/ProductDetails";
import AllProducts from "../Pages/AllProducts/AllProducts";
import PaymentPage from "../Pages/DetailsPage/PaymentPage";
import AdminOrdersPage from "../Pages/Dashboard/Admin/AdminOrdersPage/AdminOrdersPage";
import MyOrders from "../Pages/Dashboard/User/MyOrders/MyOrders";
import ManageCart from "../Pages/DetailsPage/Cart/ManageCart";
import Profile from "../Pages/Dashboard/Profile/Profile";
import VendorRequest from "../Pages/Dashboard/Admin/VendorRequest/VendorRequest";
import CartCheckout from "../Pages/DetailsPage/Cart/CartCheckout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayouts />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true, element: <Home />,
      },
      {
        path: "/login", element: <Login />,
      },
      {
        path: "/register", element: <Register />,
      },
      {
        path: "/product-details/:id",
        element: (
          <PrivateRoute allowedRoles={["user", "vendor", "admin"]}>
            <ProductDetails />
          </PrivateRoute>
        )
      },
      {
        path: "/products", element: <AllProducts />,
      },
      {
        path: "/cart-checkout",  
        element: (
          <PrivateRoute allowedRoles={["user"]}>
            <CartCheckout />
          </PrivateRoute>
        )
      },
      {
        path: "/payment/:productId",
        element: (
          <PrivateRoute allowedRoles={["user"]}>
            <PaymentPage />
          </PrivateRoute>
        )
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
        path: "/cart",
        element: (
          <PrivateRoute allowedRoles={["user"]}>
            <ManageCart />
          </PrivateRoute>
        )
      },
      {
        path: "/loading", element: <Loading />,
      },
      {
        path: "/forbidden", element: <Forbidden />,
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
        path: "all-advertisement",
        element: (
          <PrivateRoute allowedRoles={["admin"]}>
            <AllAdvertisementsAdmin />
          </PrivateRoute>
        )
      },
      {
        path: "all-orders",
        element: (
          <PrivateRoute allowedRoles={["admin"]}>
            <AdminOrdersPage />
          </PrivateRoute>
        )
      },
      {
        path: "vendor-requests",
        element: (
          <PrivateRoute allowedRoles={["admin"]}>
            <VendorRequest />
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
      },
      {
        path: "price-trends",
        element: (
          <PrivateRoute allowedRoles={["user"]}>
            <ViewPriceTrends />
          </PrivateRoute>
        )
      },
      {
        path: "manage-watchlist",
        element: (
          <PrivateRoute allowedRoles={["user"]}>
            <ManageWishlist />
          </PrivateRoute>
        )
      },
      {
        path: "my-orders",
        element: (
          <PrivateRoute allowedRoles={["user"]}>
            <MyOrders />
          </PrivateRoute>
        )
      },
      {
        path: "profile",
        element: <Profile />
      }
    ],
  },
]);

export default router;
