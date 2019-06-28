import React from "react";
import { Helmet } from "react-helmet";

const NoMatchRoute = ({ location }) => (
  <>
    <Helmet>
      <title>"404"</title>
      <meta name="prerender-status-code" content="404" />
    </Helmet>
    <h1 style={{ textAlign: "center", marginTop: 70 }}>
      The route <code>{location.pathname}</code> cannot be found.
    </h1>
  </>
);

export default NoMatchRoute;
