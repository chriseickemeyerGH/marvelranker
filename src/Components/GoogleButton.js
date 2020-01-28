import React from "react";

import googleIcon from "../googlesignin.png";
import "../css/Components/googleButton.css";

const GoogleButton = ({ firebase }) => {
  const onGoogleSignIn = () => {
    firebase.auth().getRedirectResult();
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithRedirect(provider);
  };
  return (
    <img
      src={googleIcon}
      alt="Google brand sign in button"
      onClick={onGoogleSignIn}
    />
  );
};
export default GoogleButton;
