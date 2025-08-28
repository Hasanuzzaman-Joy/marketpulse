import { useState } from "react";
import { NavLink, Outlet, useNavigation } from "react-router";
import { FaUserFriends, FaClipboardList, FaBullhorn, FaShoppingBasket, FaPlusSquare, FaBoxOpen, FaAd,FaChartBar, FaChartLine, FaTools, FaListAlt } from "react-icons/fa";
import useAuth from "../hooks/useAuth";
import useRole from "../hooks/useRole";
import ScrollToTop from "../Pages/shared/ScrollToTop";
import SidebarFooter from "../Pages/shared/SidebarFooter";
import Loading from "../Pages/shared/Loading";
import Sidebar from "../Pages/shared/DashboardComponents/Sidebar";
import MobileDrawer from "../Pages/shared/DashboardComponents/MobileDrawer";
import DashboardNavbar from "../Pages/shared/DashboardComponents/DashboardNavbar";
import { AnimatePresence } from "framer-motion";

const DashboardLayout = () => {
  const { user, logOut } = useAuth();
  const { userRole, roleLoading } = useRole();
  const [menuOpen, setMenuOpen] = useState(false);
  const navigation = useNavigation();

  if (roleLoading) return <Loading />;

  const menuItems = (
    <>
      {user && userRole === "admin" && (
        <>
          <li><NavLink to="/dashboard/all-users" className="flex items-center gap-2 nav-link" onClick={() => setMenuOpen(false)}><FaUserFriends /> All Users</NavLink></li>

          <li><NavLink to="/dashboard/all-products" className="flex items-center gap-2 nav-link" onClick={() => setMenuOpen(false)}><FaClipboardList /> All Products</NavLink></li>

          <li><NavLink to="/dashboard/all-advertisement" className="flex items-center gap-2 nav-link" onClick={() => setMenuOpen(false)}><FaBullhorn /> All Advertisements</NavLink></li>

          <li><NavLink to="/dashboard/all-orders" className="flex items-center gap-2 nav-link" onClick={() => setMenuOpen(false)}><FaShoppingBasket /> All Orders</NavLink></li>
        </>
      )}

      {user && userRole === "vendor" && (
        <>
          <li><NavLink to="/dashboard/my-products" className="flex items-center gap-2 nav-link" onClick={() => setMenuOpen(false)}><FaBoxOpen /> My Products</NavLink></li>

          <li><NavLink to="/dashboard/add-product" className="flex items-center gap-2 nav-link" onClick={() => setMenuOpen(false)}><FaPlusSquare /> Add Product</NavLink></li>

          <li><NavLink to="/dashboard/my-advertisements" className="flex items-center gap-2 nav-link" onClick={() => setMenuOpen(false)}><FaChartBar /> My Advertisements</NavLink></li>

          <li><NavLink to="/dashboard/add-advertisement" className="flex items-center gap-2 nav-link" onClick={() => setMenuOpen(false)}><FaAd /> Add Advertisement</NavLink></li>
        </>
      )}

      {user && userRole === "user" && (
        <>
          <li><NavLink to="/dashboard/price-trends" className="flex items-center gap-2 nav-link" onClick={() => setMenuOpen(false)}><FaChartLine /> View Price Trends</NavLink></li>

          <li><NavLink to="/dashboard/manage-watchlist" className="flex items-center gap-2 nav-link" onClick={() => setMenuOpen(false)}><FaTools /> Manage Watchlist</NavLink></li>
          
          <li><NavLink to="/dashboard/my-orders" className="flex items-center gap-2 nav-link" onClick={() => setMenuOpen(false)}><FaListAlt /> My Order List</NavLink></li>
        </>
      )}
    </>
  );

  return (
    <div className="flex h-screen overflow-hidden">
      {navigation.state === "loading" && <Loading />}
      <ScrollToTop />
      <Sidebar menuItems={menuItems} logOut={logOut} />
      <div className="lg:ml-64 flex flex-col w-full h-screen">
        <DashboardNavbar user={user} setMenuOpen={setMenuOpen} />
        <div className="flex flex-col flex-1 overflow-y-auto bg-[#f4f4f4] mt-[72px]">
          <main className="flex-1 p-3 md:p-6">
            <Outlet />
          </main>
          <SidebarFooter />
        </div>
      </div>
      <AnimatePresence>
        <MobileDrawer
          menuOpen={menuOpen}
          setMenuOpen={setMenuOpen}
          menuItems={menuItems}
          user={user}
          logOut={logOut}
        />
      </AnimatePresence>
    </div>
  );
};

export default DashboardLayout;
