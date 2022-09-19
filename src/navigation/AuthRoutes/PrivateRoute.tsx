import React from "react";
import { Route, Navigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

export default function PrivateRoute({ children }: { children: any }) {
  const authentication = React.useContext(AuthContext);

  return authentication?.currentUser ? children : <Navigate to="/login" />;
}
