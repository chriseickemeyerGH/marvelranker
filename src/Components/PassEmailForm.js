import React from "react";
import { Redirect } from "react-router-dom";
import TextBox from "./TextBox";
import Button from "./Button";
import googleIcon from "../googlesignin.png";
import firebase from "../firebase";
import "../css/Components/passEmailForm.css";

const PassEmailForm = ({
  title,
  homeRedirect,
  errorState,
  errorMessage,
  email,
  onEmailChange,
  passWord,
  onPassWordChange,
  passWordWarning,
  passWordWarningChildren,
  onSubmit,
  disabled,
  submitButtonClassName,
  onSubmitButtonChildren
}) => {
  const onGoogleSignIn = () => {
    firebase.auth().getRedirectResult();
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithRedirect(provider);
  };

  return (
    <div className="marginOffset">
      <div className="flexParent bodyTopMargin ">
        {homeRedirect && <Redirect to="/" />}
        <h1>{title}</h1>
        <>{errorState && <p className="error">{errorMessage}</p>}</>
        <form>
          <label htmlFor="email">Email:</label>
          <br />
          <TextBox
            type="email"
            name="email"
            value={email}
            required
            onChange={onEmailChange}
          />
          <br />
          <label htmlFor="password">Password:</label>
          <br />
          <TextBox
            type="password"
            name="password"
            value={passWord}
            onChange={onPassWordChange}
            required
          />
          <br />
          {passWordWarning && <p>{passWordWarningChildren}</p>}

          <Button
            type="submit"
            disabled={disabled}
            onClick={onSubmit}
            className={submitButtonClassName}
          >
            {onSubmitButtonChildren}
          </Button>
        </form>
        <h2>Or</h2>
        <img
          src={googleIcon}
          alt="Google brand sign in button"
          onClick={onGoogleSignIn}
        />
        <p>After completing Google sign-in, you will be redirected shortly</p>
      </div>
    </div>
  );
};

export default PassEmailForm;
