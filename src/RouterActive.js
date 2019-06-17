import React from "react";
import { Route, Link } from "react-router-dom";

const RouterActive = ({ label, to, exact }) => {
  return (
    <Route
      path={to}
      exact={exact}
      children={({ match }) => (
        <Link className={match ? "linkStyle active" : "linkStyle"} to={to}>
          {label}
        </Link>
      )}
    />
  );
};

export default RouterActive;
