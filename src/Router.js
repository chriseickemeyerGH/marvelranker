import { Route, Link } from "react-router-dom";
import React from "react";
import App from "./App";
import Login from "./Auth/Login";
import SignUp from "./Auth/SignUp";

function Router() {
  return (
    <>
      <Link to={"/"}>App</Link>
      <Link to={"/login"}>Log In</Link>
      <Link to={"/signup"}>Sign Up</Link>

      <Route exact path={"/"} component={App} />
      <Route exact path={"/login"} component={Login} />
      <Route exact path={"/signup"} component={SignUp} />
    </>
  );
}

export default Router;
