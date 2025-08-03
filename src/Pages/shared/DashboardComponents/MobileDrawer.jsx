import { Link } from "react-router";
import { motion } from "motion/react"
import { FiLogOut, FiX } from "react-icons/fi";
import { FaUserCircle } from "react-icons/fa";
import Button from "../Button";

const MobileDrawer = ({ menuOpen, setMenuOpen, menuItems, user, logOut }) => (
  menuOpen && (
    <motion.div
      initial={{ x: "-100%" }}
      animate={{ x: 0 }}
      exit={{ x: "-100%" }}
      transition={{ duration: 0.4 }}
      className="fixed top-0 left-0 w-3/4 sm:w-2/4 h-full bg-white z-50 p-6 shadow-md flex flex-col justify-between"
    >
      <div>
        <div className="flex justify-between items-center mb-4">
          <Link to="/" className="flex items-center gap-2">
            <img src="https://i.ibb.co/CstBYsHY/trans-logo.png" alt="Logo" className="w-10 h-10" />
            <h1 className="text-xl font-bold text-secondary font-heading">
              Market <span className="text-accent">Pulse</span>
            </h1>
          </Link>
          <button onClick={() => setMenuOpen(false)} className="text-2xl text-main cursor-pointer">
            <FiX />
          </button>
        </div>
        <ul className="flex flex-col gap-6 text-main font-medium font-heading my-10">
          {menuItems}
        </ul>
        {user ? (
          <>
            <div className="flex items-center gap-2 mb-4">
              {user?.photoURL ? (
                <img src={user.photoURL} alt="User" className="w-10 h-10 rounded-full border-2 border-accent" />
              ) : (
                <FaUserCircle className="text-2xl text-textSecondary" />
              )}
              <span className="text-base font-medium">{user?.displayName}</span>
            </div>
            <Button onClick={() => { logOut(); setMenuOpen(false); }} className="flex items-center gap-2 w-full">
              <FiLogOut /> Logout
            </Button>
          </>
        ) : (
          <div className="flex flex-col gap-3">
            <Link to="/login" onClick={() => setMenuOpen(false)}>
              <Button size="sm" className="w-full">Login</Button>
            </Link>
            <Link to="/register" onClick={() => setMenuOpen(false)}>
              <Button size="sm" className="w-full">Register</Button>
            </Link>
          </div>
        )}
      </div>
    </motion.div>
  )
);

export default MobileDrawer;
