import React from "react";
import UserMenu from "../UserMenu";
import Tooltip from "../Tooltip";
import { UserContext } from "../../context/UserContext";

interface HeaderProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}
const Header = ({ sidebarOpen, setSidebarOpen }: HeaderProps) => {
  const user = React.useContext(UserContext);
  return (
    <header className="sticky top-0 bg-white border-b border-slate-200 z-30">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 -mb-px">
          {/* Header: Left side */}
          <div className="flex">
            {/* Hamburger button */}
            <button
              className="text-slate-500 hover:text-slate-600 lg:hidden"
              aria-controls="sidebar"
              aria-expanded={sidebarOpen}
              onClick={(e) => {
                e.stopPropagation();
                setSidebarOpen(!sidebarOpen);
              }}
            >
              <span className="sr-only">Open sidebar</span>
              <svg
                className="w-6 h-6 fill-current"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect x="4" y="5" width="16" height="2" />
                <rect x="4" y="11" width="16" height="2" />
                <rect x="4" y="17" width="16" height="2" />
              </svg>
            </button>
          </div>

          {/* Header: Right side */}
          <div className="flex items-center space-x-3">
            <div className="flex items-center">
              <Tooltip
                className="ml-2"
                bg="dark"
                size="sm"
                position={"bottom"}
                icon={
                  <div className="text-sm inline-flex font-medium bg-slate-100 text-slate-500 rounded-full text-center px-2.5 py-1 cursor-pointer hover:bg-slate-200">
                    {user?.getTokens()}
                  </div>
                }
              >
                <div className="text-sm text-slate-200">
                  Tokens available to use for requests.
                </div>
              </Tooltip>
            </div>

            <UserMenu align="right" />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
