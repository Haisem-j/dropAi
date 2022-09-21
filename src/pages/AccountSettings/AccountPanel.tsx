import React from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const AccountPanel = () => {
  const authentication = React.useContext(AuthContext);
  console.log(authentication);

  return (
    <div className="grow">
      {/* Panel body */}
      <div className="p-6 space-y-6">
        <h3 className="text-2xl text-slate-800 font-bold mb-5">My Account</h3>
        {/* Business Profile */}
        {authentication?.currentUser?.displayName && (
          <section>
            <h3 className="text-lg leading-snug text-slate-800 font-bold mb-1">
              Full Name
            </h3>
            <div className="text-sm font-light">
              {authentication?.currentUser?.displayName}
            </div>
          </section>
        )}
        {/* Email */}
        <section>
          <h3 className="text-lg leading-snug text-slate-800 font-bold mb-1">
            Email
          </h3>
          <div className="text-sm font-light">
            <span className="mr-3">{authentication?.currentUser?.email}</span>
            <div className="text-sm inline-flex font-medium bg-slate-100 text-slate-500 rounded-full text-center px-2.5 py-1">
              {authentication?.currentUser?.emailVerified
                ? "VERIFIED"
                : "UNVERIFIED"}
            </div>
          </div>
        </section>
        {/* Plan */}
        <section>
          <h3 className="text-lg leading-snug text-slate-800 font-bold mb-1">
            Plan
          </h3>
          <div className="text-sm font-light flex items-center">
            <div className="text-sm inline-flex font-medium bg-rose-100 text-rose-600 rounded-full text-center px-2.5 py-1 mr-5">
              Free
            </div>

            <div>
              <Link
                to="/app/plans"
                className="btn border-slate-200 shadow-sm bg-indigo-500 hover:bg-indigo-600 text-white"
              >
                Upgrade
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};
export default AccountPanel;
