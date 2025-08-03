import { Link } from "react-router";
import { FiMenu } from "react-icons/fi";
import { FaUserCircle } from "react-icons/fa";

const DashboardNavbar = ({ user, setMenuOpen }) => (
  <nav className="fixed py-5 top-0 left-0 right-0 z-30 bg-white shadow px-4 md:px-6 flex justify-between items-center">
    <div className="flex items-center gap-2">
      <Link to="/" className="flex items-center gap-2">
        <img src="https://i.ibb.co/CstBYsHY/trans-logo.png" alt="Logo" className="w-10 h-10 -ml-2" />
        <h1 className="text-xl font-bold text-secondary font-heading">
          Market <span className="text-accent">Pulse</span>
        </h1>
      </Link>
    </div>
    <div className="flex items-center gap-3">
      <button className="lg:hidden text-2xl text-main cursor-pointer" onClick={() => setMenuOpen(true)}>
        <FiMenu />
      </button>
      <div className="hidden lg:flex items-center gap-3">
        <span className="font-medium font-heading text-base">Welcome, {user?.displayName || "User"}</span>
        {user?.photoURL ? (
          <img src={user.photoURL} alt="User" className="w-10 h-10 rounded-full border-2 border-accent" />
        ) : (
          <FaUserCircle className="text-2xl text-textSecondary" />
        )}
      </div>
    </div>
  </nav>
);

export default DashboardNavbar;