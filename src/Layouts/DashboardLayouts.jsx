import { useState } from "react";
import { NavLink, Outlet, useLocation, Link } from "react-router";
import { FiLogOut, FiMenu, FiX } from "react-icons/fi";
import { FaUserFriends, FaClipboardList, FaBullhorn, FaShoppingBasket, FaPlusSquare, FaBoxOpen, FaAd, FaChartBar, FaChartLine, FaTools, FaListAlt } from "react-icons/fa";
import { FaUserCircle } from "react-icons/fa";
import useAuth from "../hooks/useAuth";
import Button from "../Pages/shared/Button";
import SidebarFooter from "../Pages/shared/SidebarFooter";
import { AnimatePresence, motion } from "framer-motion";
import useRole from "../hooks/useRole";
import Loading from "../Pages/shared/Loading";

const DashboardLayout = () => {
  const { user, logOut } = useAuth();
  const { userRole, roleLoading } = useRole();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const getPageTitle = () => {
    const page = location.pathname.split("/")[2] || "Dashboard";
    return page.charAt(0).toUpperCase() + page.slice(1).replace("-", " ");
  };

  if(roleLoading) return <Loading />;

  const menuItems = (
    <>
      {/* For admin */}
      {
        user && userRole === "admin" &&
        <>
          <li>
            <NavLink to="/dashboard/all-users" className="flex items-center gap-2 nav-link" onClick={() => setMenuOpen(false)}>
              <FaUserFriends /> All Users
            </NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/all-products" className="flex items-center gap-2 nav-link" onClick={() => setMenuOpen(false)}>
              <FaClipboardList /> All Products
            </NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/all-advertisement" className="flex items-center gap-2 nav-link" onClick={() => setMenuOpen(false)}>
              <FaBullhorn /> All Advertisements
            </NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/all-orders" className="flex items-center gap-2 nav-link" onClick={() => setMenuOpen(false)}>
              <FaShoppingBasket /> All Orders
            </NavLink>
          </li>
        </>
      }

      {/* For vendor */}
      {
        user && userRole === "vendor" &&
        <>
          <li>
            <NavLink to="/dashboard/my-products" className="flex items-center gap-2 nav-link" onClick={() => setMenuOpen(false)}>
              <FaBoxOpen /> My Products
            </NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/add-product" className="flex items-center gap-2 nav-link" onClick={() => setMenuOpen(false)}>
              <FaPlusSquare /> Add Product
            </NavLink>
          </li>    
          <li>
            <NavLink to="/dashboard/my-advertisements" className="flex items-center gap-2 nav-link" onClick={() => setMenuOpen(false)}>
              <FaChartBar /> My Advertisements
            </NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/add-advertisement" className="flex items-center gap-2 nav-link" onClick={() => setMenuOpen(false)}>
              <FaAd /> Add Advertisement
            </NavLink>
          </li>
        </>
      }

      {/* For seller */}
      {
        user && userRole === "user" &&
        <>
          <li>
            <NavLink to="/dashboard/price-trends" className="flex items-center gap-2 nav-link" onClick={() => setMenuOpen(false)}>
              <FaChartLine /> View Price Trends
            </NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/manage-wishlist" className="flex items-center gap-2 nav-link" onClick={() => setMenuOpen(false)}>
              <FaTools /> Manage Watchlist
            </NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/my-orders" className="flex items-center gap-2 nav-link" onClick={() => setMenuOpen(false)}>
              <FaListAlt /> My Order List
            </NavLink>
          </li>
        </>
      }
    </>
  );

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar (Desktop only) */}
      <aside className="hidden lg:flex w-64 bg-white shadow-xl border-r border-[#dcdbdb] fixed top-0 left-0 h-screen flex-col justify-between px-6 pt-4 pb-6 z-40">
        <div>
          <Link to="/" className="flex items-center gap-2 md:-ml-2 md:mt-1 mb-12">
            <img
              src="https://i.ibb.co/CstBYsHY/trans-logo.png"
              alt="Logo"
              className="w-10 h-10"
            />
            <h1 className="text-xl font-bold text-secondary font-heading">
              Market <span className="text-accent">Pulse</span>
            </h1>
          </Link>
          <ul className="space-y-4 font-medium text-main font-heading">
            {menuItems}
          </ul>
        </div>
        <Button onClick={logOut} className="flex items-center gap-2">
          <FiLogOut /> Logout
        </Button>
      </aside>

      {/* Right Panel */}
      <div className="lg:ml-64 flex flex-col w-full h-screen">
        {/* Navbar */}
        <nav
          className="fixed py-5 top-0 left-0 lg:left-64 right-0 z-30 bg-white shadow transition-all duration-500 ease-in-out px-4 md:px-6"
        >
          <div className="flex justify-between items-center">
            {/* Mobile: Logo + name */}
            <div className="flex items-center gap-2">
              <Link to="/" className="flex items-center gap-2 lg:hidden">
                <img
                  src="https://i.ibb.co/CstBYsHY/trans-logo.png"
                  alt="Logo"
                  className="w-8 h-8"
                />
                <h1 className="text-lg font-bold text-secondary font-heading">
                  Market <span className="text-accent">Pulse</span>
                </h1>
              </Link>

              {/* Desktop: Page Title */}
              <h2 className="hidden lg:block text-2xl font-heading font-bold text-main">
                {getPageTitle()}
              </h2>
            </div>

            {/* Right side: hamburger or user info */}
            <div className="flex items-center gap-3">
              {/* Mobile hamburger */}
              <button
                className="lg:hidden text-2xl text-main"
                onClick={() => setMenuOpen(true)}
              >
                <FiMenu />
              </button>

              {/* Desktop: user info */}
              <div className="hidden lg:flex items-center gap-3">
                <span className="font-medium font-heading text-base">
                  {user?.displayName || "User"}
                </span>
                {user?.photoURL ? (
                  <img
                    src={user.photoURL}
                    alt="User"
                    className="w-10 h-10 rounded-full border-2 border-accent"
                  />
                ) : (
                  <FaUserCircle className="text-2xl text-textSecondary" />
                )}
              </div>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <div className="flex flex-col flex-1 overflow-y-auto bg-[#f4f4f4] mt-[72px]">
          <main className="flex-1 p-3 md:p-6">
            <Outlet />
          </main>
          <SidebarFooter />
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ duration: 0.4 }}
            className="fixed top-0 left-0 w-3/4 sm:w-2/4 h-full bg-white z-50 p-6 shadow-md flex flex-col justify-between"
          >
            <div>
              {/* Header with Logo + Close */}
              <div className="flex justify-between items-center mb-4">
                <Link to="/" className="flex items-center gap-2">
                  <img
                    src="https://i.ibb.co/CstBYsHY/trans-logo.png"
                    alt="Logo"
                    className="w-10 h-10"
                  />
                  <h1 className="text-xl font-bold text-secondary font-heading">
                    Market <span className="text-accent">Pulse</span>
                  </h1>
                </Link>
                <button
                  onClick={() => setMenuOpen(false)}
                  className="text-2xl text-main"
                >
                  <FiX />
                </button>
              </div>

              {/* Menu Items */}
              <ul className="flex flex-col gap-6 text-main font-medium font-heading my-10">
                {menuItems}
              </ul>

              {/* User Info + Logout */}
              {user ? (
                <>
                  <div className="flex items-center gap-2 mb-4">
                    {user?.photoURL ? (
                      <img
                        src={user.photoURL}
                        alt="User"
                        className="w-10 h-10 rounded-full border-2 border-accent"
                      />
                    ) : (
                      <FaUserCircle className="text-2xl text-textSecondary" />
                    )}
                    <span className="text-base font-medium">
                      {user?.displayName}
                    </span>
                  </div>
                  <Button
                    onClick={() => {
                      logOut();
                      setMenuOpen(false);
                    }}
                    className="flex items-center gap-2 w-full"
                  >
                    <FiLogOut /> Logout
                  </Button>
                </>
              ) : (
                <div className="flex flex-col gap-3">
                  <Link to="/login" onClick={() => setMenuOpen(false)}>
                    <Button size="sm" className="w-full">
                      Login
                    </Button>
                  </Link>
                  <Link to="/register" onClick={() => setMenuOpen(false)}>
                    <Button size="sm" className="w-full">
                      Register
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default DashboardLayout;
