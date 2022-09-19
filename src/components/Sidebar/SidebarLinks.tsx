import { useContext } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

interface SidebarLinksProps {
  title: string;
  path: string;
  children: React.ReactNode;
}

const SidebarLinks = ({ title, path, children }: SidebarLinksProps) => {
  const location = useLocation();
  const authentication = useContext(AuthContext);
  const navigate = useNavigate();

  const { pathname } = location;
  const handleLogout = async () => {
    try {
      await authentication?.logout();
      navigate("/login");
    } catch {
      console.log("Failed to log out");
    }
  };
  return path === "Logout" ? (
    <li
      className={`cursor-pointer px-3 py-2 rounded-sm mb-0.5 last:mb-0 ${
        pathname === path && "bg-slate-900"
      }`}
      onClick={handleLogout}
    >
      <div
        className={`block text-slate-200 hover:text-white truncate transition duration-150 ${
          pathname === path && "hover:text-slate-200"
        }`}
      >
        <div className="flex items-center">
          {children}
          <span className="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200 text-slate-200 hover:text-white">
            {title}
          </span>
        </div>
      </div>
    </li>
  ) : (
    <li
      className={`px-3 py-2 rounded-sm mb-0.5 last:mb-0 ${
        pathname === path && "bg-slate-900"
      }`}
    >
      <NavLink
        end
        to={path}
        className={`block text-slate-200 hover:text-white truncate transition duration-150 ${
          pathname === path && "hover:text-slate-200"
        }`}
      >
        <div className="flex items-center">
          {children}
          <span className="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
            {title}
          </span>
        </div>
      </NavLink>
    </li>
  );
};
export default SidebarLinks;
