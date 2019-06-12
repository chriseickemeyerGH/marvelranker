import { Route, Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import App from "./Views/App";
import Login from "./Views/Auth/Login";
import SignUp from "./Views/Auth/SignUp";
import firebase from "./firebase";
import "./css/router.css";

const routeLinks = [
  { to: "/", name: "Home", signedIn: true },
  { to: "/login", name: "Login", signedIn: true },
  { to: "/signup", name: "Sign Up", signedIn: true }
];

function Router() {
  const [loggedIn, isLoggedIn] = useState(false);
  const [links, setLinks] = useState(routeLinks);
  const [tabID, setTabID] = useState(0);

  useEffect(() => {
    firebase.auth().onAuthStateChanged(user => {
      setLinks(prevLinks =>
        prevLinks.map(link => {
          if (user) {
            isLoggedIn(true);
            return { ...link, signedIn: true };
          } else if (!user) {
            return { ...link, signedIn: false };
          }
          return link;
        })
      );
    });
  }, []);

  const onSignOut = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        isLoggedIn(false);
      })
      .catch(error => {
        console.log(error);
      });
  };

  const isActive = i => tabID === i;

  const getActiveTab = i => {
    setTabID(i);
  };

  return (
    <>
      <div className="center">
        {links.map(
          (link, i) =>
            !link.signedIn && (
              <React.Fragment key={link.to}>
                <Link
                  className={isActive(i) ? "linkStyle active" : "linkStyle"}
                  onClick={() => getActiveTab(i)}
                  to={link.to}
                >
                  {link.name}
                </Link>
              </React.Fragment>
            )
        )}
        {loggedIn && (
          <Link className="linkStyle" to="" onClick={onSignOut}>
            Sign Out
          </Link>
        )}
      </div>
      <Route exact path={"/"} component={App} />
      <Route exact path={"/login"} component={Login} />
      <Route exact path={"/signup"} component={SignUp} />
    </>
  );
}

export default Router;
