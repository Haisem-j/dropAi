import React from "react";
import { Routes, Route } from "react-router-dom";
import { UserProvider } from "../context/UserContext";
import { Dashboard } from "../pages/Dashboard";
import Login from "./AuthRoutes/Login";
import PrivateRoute from "./AuthRoutes/PrivateRoute";
import Register from "./AuthRoutes/Register";
import { LOGIN, REGISTER, DASHBOARD, ROOT } from "./constants";
import NotFound from "./NotFound";

export const RouterConfig: React.FC = () => {
  return (
    <>
      <Routes>
        <Route path={LOGIN} element={<Login />} />
        <Route path={REGISTER} element={<Register />} />
        <Route
          path={`/*`}
          element={
            <PrivateRoute>
              <UserProvider>
                <Dashboard />
              </UserProvider>
            </PrivateRoute>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};
