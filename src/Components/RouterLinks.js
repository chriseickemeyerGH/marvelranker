import React from "react";
import { Route, Link } from "react-router-dom";

const RouterLink = ({ label, to, exact, onClick }) => {
  return (
    <Route
      path={to}
      exact={exact}
      children={({ match }) => (
        <Link
          onClick={onClick}
          className={match ? "linkStyle active" : "linkStyle"}
          to={to}
        >
          {label}
        </Link>
      )}
    />
  );
};

const RouterButton = ({ ...props }) => (
  <button {...props} className="linkStyle routerButton" />
);

export { RouterLink, RouterButton };
