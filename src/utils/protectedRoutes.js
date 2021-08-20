import React from "react";
import { Route, Redirect } from "react-router-dom";
import { ReadCookie } from "./ReadCookie";

const ProtectedRoute = ({ component: Component, ...rest }) => {
  let token = ReadCookie("token");
  let name = ReadCookie("name");
  let role = ReadCookie("role");

  return (
    <Route
      {...rest}
      render={props => {
        if (!token || !name || !role) {
          return <Redirect to="/signin" />;
        }
        return <Component {...props} />;
      }}
    />
  );
};

export default ProtectedRoute;