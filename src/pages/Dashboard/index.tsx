import React from "react";
import { Routes, Route } from "react-router-dom";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import {
  ACCOUNT_PANEL,
  BILLING,
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

  const setSidebarOpen = (open: boolean) => setSidebarState(open);

  return (
    <div
      className={`flex h-screen overflow-hidden ${
        sidebarState ? "sidebar-expanded" : ""
      }`}
    >
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
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </div>
  );
};
