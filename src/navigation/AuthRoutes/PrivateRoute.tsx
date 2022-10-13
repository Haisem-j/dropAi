import React from "react";
import { Route, Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

export default function PrivateRoute({ children }: { children: any }) {
  const authentication = React.useContext(AuthContext);
  const location = useLocation();
  let redirectPath = "";
  // Check location object for pathname
  if (location.pathname === "/plans") {
    // should look like ?ref=plans&key=payments&val= (mo || yr)
    redirectPath =
      "?ref=plans&key=payments&val=" + location.search.split("=")[1];
  } else {
    // otherwise this ?ref= current pathname
    redirectPath = "?ref=" + location.pathname;
  }
  return authentication?.currentUser ? (
    children
  ) : (
    <Navigate to={`/register${redirectPath}`} />
  );
}
