import React from "react";
import { isMobile } from "react-device-detect";
import { Routes, Route } from "react-router-dom";
import Header from "../../components/Header";
import ModalBasic from "../../components/ModalBasic";
import Sidebar from "../../components/Sidebar";
import { AuthContext } from "../../context/AuthContext";
import { UserContext } from "../../context/UserContext";
import {
  ACCOUNT_PANEL,
  BILLING,
  CHECKOUT_SUCCESS,
  LANDING_DESCRIPTION,
  LANDING_TAGLINE,
  PLANS_PANEL,
  PRODUCT_BENEFITS_GENERATOR,
  PRODUCT_DESCRIPTION,
  PRODUCT_NAME_GENERATOR,
  ROOT,
  SETTINGS,
  SOCIAL_MEDIA_GENERATOR,
} from "../../navigation/constants";
import NotFound from "../../navigation/NotFound";
import AccountSettings from "../AccountSettings";
import AccountPanel from "../AccountSettings/AccountPanel";
import Billing from "../AccountSettings/Billing";
import Checkout from "../Checkout/Checkout";
import LandingDescription from "../LandingDescription";
import LandingTaglines from "../LandingTaglines";
import PlansPanel from "../PlansPanel";
import ProductBenefits from "../ProductBenefits";
import ProductDescription from "../ProductDescription";
import ProductNameGenerator from "../ProductNameGenerator";
import SocialMedia from "../SocialMedia";
import Home from "./Home";

export const Dashboard = () => {
  const [sidebarState, setSidebarState] = React.useState(true);
  const [loading, setLoading] = React.useState(false);
  const [modalOpen, setModalOpen] = React.useState(false);
  const setSidebarOpen = (open: boolean) => setSidebarState(open);
  const authentication = React.useContext(AuthContext);
  const user = React.useContext(UserContext);

  React.useEffect(() => {
    if (authentication?.currentUser?.emailVerified) {
      setModalOpen(false);
    } else {
      setModalOpen(true);
    }
  }, [authentication?.currentUser?.emailVerified]);

  React.useEffect(() => {}, [user]);
  const resendEmailVerification = async () => {
    try {
      if (user?.user && authentication?.currentUser) {
        setLoading(true);
        await authentication?.verifyEmail(authentication?.currentUser);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div
      className={`flex h-screen overflow-hidden ${
        sidebarState ? "sidebar-expanded" : ""
      }`}
    >
      <ModalBasic
        id="basic-modal"
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        title="Email Verification Required"
      >
        {/* Modal content */}
        <div className="px-5 pt-4 pb-1">
          <div className="text-sm">
            <div className="space-y-2">
              <p>
                To have access to the features, please verify you email by
                clicking the verification link sent
              </p>
            </div>
          </div>
        </div>
        {/* Modal footer */}
        <div className="px-5 py-4">
          <div className="flex flex-wrap justify-end space-x-2">
            <button
              className="btn-sm bg-indigo-500 hover:bg-indigo-600 text-white cursor-pointer disabled:border-slate-200 disabled:bg-slate-100 disabled:text-slate-400 disabled:cursor-not-allowed shadow-none mt-auto"
              disabled={loading}
              onClick={() => resendEmailVerification()}
            >
              {!loading && "Re-Send Verification Email"}
              {loading && (
                <div className="flex items-center justify-center">
                  <svg
                    className="animate-spin w-4 h-4 fill-current shrink-0"
                    viewBox="0 0 16 16"
                  >
                    <path d="M8 16a7.928 7.928 0 01-3.428-.77l.857-1.807A6.006 6.006 0 0014 8c0-3.309-2.691-6-6-6a6.006 6.006 0 00-5.422 8.572l-1.806.859A7.929 7.929 0 010 8c0-4.411 3.589-8 8-8s8 3.589 8 8-3.589 8-8 8z" />
                  </svg>
                  <span className="ml-2">Loading</span>
                </div>
              )}
            </button>
          </div>
        </div>
      </ModalBasic>
      <Sidebar sidebarOpen={sidebarState} setSidebarOpen={setSidebarOpen} />
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        <Header sidebarOpen={sidebarState} setSidebarOpen={setSidebarOpen} />
        <Routes>
          <Route path={ROOT} element={<Home />} />
          <Route path={PRODUCT_DESCRIPTION} element={<ProductDescription />} />
          <Route
            path={PRODUCT_NAME_GENERATOR}
            element={<ProductNameGenerator />}
          />
          <Route
            path={PRODUCT_BENEFITS_GENERATOR}
            element={<ProductBenefits />}
          />
          <Route path={LANDING_TAGLINE} element={<LandingTaglines />} />
          <Route path={LANDING_DESCRIPTION} element={<LandingDescription />} />
          <Route path={SOCIAL_MEDIA_GENERATOR} element={<SocialMedia />} />
          <Route path={SETTINGS} element={<AccountSettings />}>
            <Route path="account" element={<AccountPanel />} />
            <Route path={"billing"} element={<Billing />} />
            <Route path="*" element={<NotFound />} />
          </Route>

          <Route path={PLANS_PANEL} element={<PlansPanel />} />
          <Route path={CHECKOUT_SUCCESS} element={<Checkout />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </div>
  );
};
