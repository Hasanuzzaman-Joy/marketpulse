import { useState } from "react";
import { NavLink, Outlet, useLocation, Link } from "react-router";
import {
  FiLogOut,
  FiGrid,
  FiSettings,
  FiShoppingCart,
  FiMenu,
  FiX,
} from "react-icons/fi";
import { FaUserCircle } from "react-icons/fa";
import useAuth from "../hooks/useAuth";
import Button from "../Pages/shared/Button";
import SidebarFooter from "../Pages/shared/SidebarFooter";
import { AnimatePresence, motion } from "framer-motion";

const DashboardLayout = () => {
  const { user, logOut } = useAuth();
  const location = useLocation();

  const [menuOpen, setMenuOpen] = useState(false);

  const getPageTitle = () => {
    const page = location.pathname.split("/")[2] || "Dashboard";
    return page.charAt(0).toUpperCase() + page.slice(1).replace("-", " ");
  };

  const menuItems = (
    <>
      <li>
        <NavLink
          to="/dashboard"
          className="flex items-center gap-2 nav-link"
          onClick={() => setMenuOpen(false)}
        >
          <FiGrid /> Overview
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/dashboard/ads"
          className="flex items-center gap-2 nav-link"
          onClick={() => setMenuOpen(false)}
        >
          <FiShoppingCart /> My Ads
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/dashboard/advertise"
          className="flex items-center gap-2 nav-link"
          onClick={() => setMenuOpen(false)}
        >
          <FiSettings /> Advertise
        </NavLink>
      </li>
    </>
  );

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar (Desktop only) */}
      <aside className="hidden md:flex w-64 bg-white shadow-xl border-r border-[#dcdbdb] fixed top-0 left-0 h-screen flex-col justify-between px-6 pt-4 pb-6 z-40">
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
      <div className="md:ml-64 flex flex-col w-full h-screen">
        {/* Navbar */}
        <nav
          className="fixed py-5 top-0 left-0 md:left-64 right-0 z-30 bg-white shadow transition-all duration-500 ease-in-out px-4 md:px-6"
        >
          <div className="flex justify-between items-center">
            {/* Mobile: Logo + name */}
            <div className="flex items-center gap-2">
              <Link to="/" className="flex items-center gap-2 md:hidden">
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
              <h2 className="hidden md:block text-2xl font-heading font-bold text-main">
                {getPageTitle()}
              </h2>
            </div>

            {/* Right side: hamburger or user info */}
            <div className="flex items-center gap-3">
              {/* Mobile hamburger */}
              <button
                className="md:hidden text-2xl text-main"
                onClick={() => setMenuOpen(true)}
              >
                <FiMenu />
              </button>

              {/* Desktop: user info */}
              <div className="hidden md:flex items-center gap-3">
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
        <div className="flex flex-col flex-1 overflow-y-auto mt-[80px]">
          <main className="flex-1 p-6">
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
