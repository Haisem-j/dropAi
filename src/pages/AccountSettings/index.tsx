import React from "react";
import moment from "moment";
import { Outlet } from "react-router-dom";

import WarningBanner from "../../components/WarningBanner";
import SettingsSidebar from "./SettingsSidebar";
import { UserContext } from "../../context/UserContext";

const AccountSettings = () => {
  const [accounCanceled, setAccountCanceled] = React.useState<boolean>(false);
  const user = React.useContext(UserContext);

  React.useEffect(() => {
    if (user?.user && user?.user?.endOfCycle) {
      const endOfCycle = user?.user?.endOfCycle;
      const currentDate = moment().format("YYYYMMDD");
      const EOC = moment.unix(Number(endOfCycle)).format("YYYYMMDD");
      const isBefore = moment(currentDate).isBefore(EOC);

      if (endOfCycle) {
        isBefore && setAccountCanceled(true);
      }
    }
  }, [user?.user]);

  const handleBanner = (b: boolean) => {
    setAccountCanceled(b);
  };
  return (
    <main className="h-full bg-slate-100">
      <div className="mb-3">
        {accounCanceled && (
          <WarningBanner hideBanner={handleBanner}>
            Account will switch to free tier at{" "}
            {moment
              .unix(Number(user?.user?.endOfCycle))
              .format("MMMM Do, YYYY")}
          </WarningBanner>
        )}
      </div>
      <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
        {/* Page header */}
        <div className="mb-8">
          {/* Title */}
          <h1 className="text-2xl md:text-3xl text-slate-800 font-bold">
            Account Settings
          </h1>
        </div>

        {/* Content */}
        <div className="bg-white shadow-lg rounded-sm mb-8">
          <div className="flex flex-col md:flex-row md:-mr-px h-[500px]">
            <SettingsSidebar />
            <Outlet />
          </div>
        </div>
      </div>
    </main>
  );
};

export default AccountSettings;
