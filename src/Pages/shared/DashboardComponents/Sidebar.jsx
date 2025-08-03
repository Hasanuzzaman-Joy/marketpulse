import Button from "../Button";
import { FiLogOut } from "react-icons/fi";

const Sidebar = ({ menuItems, logOut }) => (
  <aside
    className="hidden lg:flex w-64 bg-white shadow-xl border-t border-r border-[#dcdbdb] fixed left-0 px-6 pt-4 pb-6 z-40 flex-col justify-between"
    style={{ top: "80px", height: "calc(100vh - 72px)" }}
  >
    <ul className="space-y-4 font-medium text-main font-heading">
      {menuItems}
    </ul>
    <Button onClick={logOut} className="flex items-center gap-2">
      <FiLogOut /> Logout
    </Button>
  </aside>
);

export default Sidebar;
