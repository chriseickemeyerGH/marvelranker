import React from "react";
import { Route, Redirect } from "react-router-dom";

export const ProtectedRoute = ({
  component: Component,
  isLoggedIn,
  redirectTo,
  ...rest
}) => {
  return (
    <Route
      {...rest}
      render={props =>
        isLoggedIn ? <Redirect to="/" /> : <Component {...props} />
      }
    />
  );
};
