import { useState, useEffect } from "react";
import firebase from "../firebase";
//no longer using
export const useBasicAuthHook = () => {
  const [loggedIn, isLoggedIn] = useState("");
  useEffect(() => {
    const listener = firebase.auth().onAuthStateChanged(user => {
      if (user) {
        isLoggedIn(true);
      } else {
        isLoggedIn(false);
      }
    });
    return () => {
      listener();
    };
  }, []);

  return loggedIn;
};
