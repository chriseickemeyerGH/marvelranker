import { Route } from "react-router-dom";
import React, { useState, useEffect } from "react";
import App from "./Views/App";
import Login from "./Views/Auth/Login";
import SignUp from "./Views/Auth/SignUp";
import firebase from "./firebase";
import "./css/router.css";
import RouterActive from "./RouterActive";

function Router() {
  const [loggedIn, isLoggedIn] = useState(false);

  useEffect(() => {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        isLoggedIn(true);
      } else {
        isLoggedIn(false);
      }
    });
  }, []);

  return (
    <>
      <div className="routerCenter">
        {!loggedIn && (
          <>
            <RouterActive to={"/"} label="Home" exact={true} />
            <RouterActive to={"/login"} label="Login" />
            <RouterActive to={"/signup"} label="Sign Up" />
          </>
        )}
      </div>
      <Route exact path={"/"} component={App} />
      <Route exact path={"/login"} component={Login} />
      <Route exact path={"/signup"} component={SignUp} />
    </>
  );
}

export default Router;
