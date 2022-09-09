import React from "react";
import { Routes, Route } from "react-router-dom";
import { Dashboard } from "../pages/Dashboard";
import { LandingPage } from "../pages/LandingPage";
import Login from "./AuthRoutes/Login";
import PrivateRoute from "./AuthRoutes/PrivateRoute";
import Register from "./AuthRoutes/Register";
import { LOGIN, REGISTER, DASHBOARD, ROOT } from "./constants";
import NotFound from "./NotFound";

export const RouterConfig: React.FC = () => {
  return (
    <>
      <Routes>
        <Route path={ROOT} element={<LandingPage />} />
        <Route path={LOGIN} element={<Login />} />
        <Route path={REGISTER} element={<Register />} />
        <Route
          path={`${DASHBOARD}/*`}
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};
