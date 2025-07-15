import React from "react";
import { NavLink, Outlet, useLocation, Link } from "react-router";
import { FiLogOut, FiGrid, FiSettings, FiShoppingCart } from "react-icons/fi";
import { FaUserCircle } from "react-icons/fa";
import useAuth from "../hooks/useAuth";
import Button from "../Pages/shared/Button";
import SidebarFooter from "../Pages/shared/SidebarFooter";

const DashboardLayout = () => {
  const { user, logOut } = useAuth();
  const location = useLocation();

  // Extract current route title
  const getPageTitle = () => {
    const page = location.pathname.split("/")[2] || "Dashboard";
    return page.charAt(0).toUpperCase() + page.slice(1).replace("-", " ");
  };

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r shadow-md flex flex-col justify-between px-6 pt-4 pb-6">
        {/* Logo + Name */}
        <div>
          <Link to="/" className="flex items-center gap-2 mb-8">
            <img
              src="https://i.ibb.co/CstBYsHY/trans-logo.png"
              alt="Logo"
              className="w-10 h-10"
            />
            <h1 className="text-xl font-bold text-secondary font-heading">
              Market <span className="text-accent">Pulse</span>
            </h1>
          </Link>

          {/* Menu */}
          <ul className="space-y-4 font-medium text-main font-heading">
            <li>
              <NavLink to="/dashboard" className="flex items-center gap-2 nav-link">
                <FiGrid /> Overview
              </NavLink>
            </li>
            <li>
              <NavLink to="/dashboard/ads" className="flex items-center gap-2 nav-link">
                <FiShoppingCart /> My Ads
              </NavLink>
            </li>
            <li>
              <NavLink to="/dashboard/advertise" className="flex items-center gap-2 nav-link">
                <FiSettings /> Advertise
              </NavLink>
            </li>
          </ul>
        </div>

        {/* Logout */}
        <Button onClick={logOut} className="flex items-center gap-2">
          <FiLogOut /> Logout
        </Button>
      </aside>

      {/* Main Panel */}
      <div className="flex flex-col flex-1 min-h-screen">
        {/* Navbar */}
        <nav className="h-16 bg-white shadow px-6 flex items-center justify-between border-b">
          <h2 className="text-xl font-semibold text-main">{getPageTitle()}</h2>
          <div className="flex items-center gap-3">
            {user?.photoURL ? (
              <img
                src={user.photoURL}
                alt="User"
                className="w-10 h-10 rounded-full border-2 border-accent"
              />
            ) : (
              <FaUserCircle className="text-2xl text-textSecondary" />
            )}
            <span className="font-medium">{user?.displayName || "User"}</span>
          </div>
        </nav>

        {/* Content + Footer */}
        <div className="flex flex-col flex-1">
          <main className="flex-1 p-6 overflow-y-auto">
            <Outlet />
          </main>
          <SidebarFooter />
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
