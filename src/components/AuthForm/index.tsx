import React from "react";
import { Link } from "react-router-dom";
import LogoIcon from "../../logos/png/IconBlack.png";
const AuthForm = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="bg-slate-100">
      <div className="relative md:flex ">
        {/* Content */}
        <div className="w-full">
          <div className="min-h-screen h-full flex flex-col after:flex-1">
            {/* Header */}
            <div className="flex-1">
              <div className="flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
                {/* Logo */}
                <a className="block" href="https://dropai.app">
                  <img src={LogoIcon} height={32} width={32} />
                </a>
              </div>
            </div>
            {children}
          </div>
        </div>
      </div>
    </main>
  );
};

export default AuthForm;
