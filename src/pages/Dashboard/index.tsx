import React from "react";
import { Routes, Route } from "react-router-dom";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import {
  DASHBOARD,
  LANDING_PAGE_COPY,
  PRODUCT_DESCRIPTION,
  PRODUCT_NAME_GENERATOR,
  ROOT,
  SETTINGS,
  SOCIAL_MEDIA_GENERATOR,
} from "../../navigation/constants";
import NotFound from "../../navigation/NotFound";
import ProductDescription from "../ProductDescription";
import ProductNameGenerator from "../ProductNameGenerator";
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
          <Route path={LANDING_PAGE_COPY} element={<>Landing Copy</>} />
          <Route path={SOCIAL_MEDIA_GENERATOR} element={<>Social Media</>} />
          <Route path={SETTINGS} element={<>Settings</>} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </div>
  );
};
