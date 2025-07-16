import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router";
import useAuth from "../../hooks/useAuth";
import Button from "../shared/Button";
import { FiLogOut, FiMenu, FiX } from "react-icons/fi";
import { FaUserCircle } from "react-icons/fa";
import { motion, AnimatePresence } from "motion/react"
import useRole from "../../hooks/useRole";

const Navbar = () => {
  const { user, logOut } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { userRole, roleLoading } = useRole();

  // Scroll shrink effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLinkClick = () => setMenuOpen(false);

  const menuItems = (
    <>
      <li>
        <NavLink to="/" className="nav-link" onClick={handleLinkClick}>
          Home
        </NavLink>
      </li>
      <li>
        <NavLink to="/contact" className="nav-link" onClick={handleLinkClick}>
          Contact
        </NavLink>
      </li>
      {
        user &&
        <li>
          <NavLink to="/dashboard" className="nav-link" onClick={handleLinkClick}>
            Dashboard
          </NavLink>
        </li>
      }
      {
        user && !roleLoading && userRole !== "vendor" &&
        <li>
          <NavLink
            to="/apply-vendor"
            className={({ isActive }) =>
              `nav-link border-[1.5px] px-3 py-1 rounded-full ${isActive ? "border-accent text-accent" : "border-[1.5px]"
              }`
            }
            onClick={handleLinkClick}
          >
            Become A Seller
          </NavLink>
        </li>
      }
    </>
  );

  return (
    <header
      className={`w-full z-50 bg-white sticky top-0 shadow transition-all duration-500 ease-in-out ${isScrolled ? "py-3" : "py-5"
        }`}
    >
      <nav className="w-11/12 mx-auto flex items-center justify-between md:px-4 relative">
        {/* Left - Logo */}
        <Link to="/" className="flex items-center gap-2">
          <img
            src="https://i.ibb.co/CstBYsHY/trans-logo.png"
            alt="Logo"
            className="w-10 h-10"
          />
          <h1 className="text-xl md:text-2xl font-heading font-bold text-secondary">
            Market <span className="text-accent">Pulse</span>
          </h1>
        </Link>

        {/* Middle - Desktop Menu */}
        <ul className="hidden md:flex items-center gap-8 text-main text-base font-heading font-medium">
          {menuItems}
        </ul>

        {/* Right - Desktop Auth Buttons */}
        <div className="hidden md:flex items-center gap-4">
          {!user ? (
            <>
              <Link to="/login">
                <Button size="sm">Login</Button>
              </Link>
              <Link to="/register">
                <Button size="sm">Register</Button>
              </Link>
            </>
          ) : (
            <>
              {user?.photoURL ? (
                <img
                  src={user.photoURL}
                  alt="User"
                  title={user.displayName || "User"}
                  className="w-10 h-10 rounded-full border-2 border-accent cursor-pointer"
                />
              ) : (
                <FaUserCircle className="text-2xl text-textSecondary" />
              )}
              <Button onClick={logOut} className="flex items-center gap-2">
                <FiLogOut /> Logout
              </Button>
            </>
          )}
        </div>

        {/* Hamburger Icon */}
        <div className="md:hidden z-50">
          <button onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? (
              <FiX className="text-2xl text-main" />
            ) : (
              <FiMenu className="text-2xl text-main" />
            )}
          </button>
        </div>

        {/* Mobile Slide Menu with Animation */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              key="mobileMenu"
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="fixed top-0 left-0 w-3/4 sm:w-2/4 h-full bg-white shadow-lg p-6 md:hidden z-40"
            >
              {/* Close button */}
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
                <button onClick={() => setMenuOpen(false)}>
                  <FiX className="text-2xl text-main" />
                </button>
              </div>

              <ul className="flex flex-col gap-6 text-main font-medium font-heading my-10">
                {menuItems}
              </ul>

              <div className="flex flex-col gap-3">
                {!user ? (
                  <>
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
                  </>
                ) : (
                  <>
                    <div className="flex items-center gap-2 mb-2">
                      {user?.photoURL ? (
                        <img
                          src={user.photoURL}
                          alt="User"
                          title={user.displayName || "User"}
                          className="w-10 h-10 rounded-full border-2 border-accent"
                        />
                      ) : (
                        <FaUserCircle className="text-2xl text-textSecondary" />
                      )}
                      <span className="text-base font-medium font-heading">{user.displayName}</span>
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
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
};

export default Navbar;
