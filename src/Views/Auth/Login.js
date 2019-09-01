import React, { useState } from "react";
import firebase from "../../firebase.js";

import "../../css/Components/login.css";
import GoogleButton from "../../Components/GoogleButton";
import Button from "../../Components/Button";
import TextBox from "../../Components/TextBox";
import { Redirect } from "react-router-dom";

import { useBasicAuthHook } from "../../Hooks/authHook";
import { Helmet } from "react-helmet";

function Login() {
  const [passWord, setPassWord] = useState("");
  const [email, setEmail] = useState("");
  const [errorState, showErrorState] = useState(false);
  const [errorMessage, showErrorMessage] = useState("");

  const loggedIn = useBasicAuthHook();

  const onLogin = e => {
    e.preventDefault();
    firebase
      .auth()
      .signInWithEmailAndPassword(email, passWord)
      .catch(error => {
        showErrorState(true);
        showErrorMessage(error.message);
        setPassWord("");
        setEmail("");
      });
  };

  return (
    <>
      <Helmet>
        <title>Login to the application</title>
        <meta name="description" content="Login to start ranking the MCU" />
      </Helmet>

      <div className="flexParent bodyTopMargin">
        {loggedIn && <Redirect to="/" />}
        <h1>Login</h1>
        <>{errorState && <p className="error">{errorMessage}</p>}</>
        <form>
          <label htmlFor="email">Email:</label>
          <br />
          <TextBox
            type="email"
            name="email"
            value={email}
            required
            onChange={e => setEmail(e.target.value)}
          />
          <br />
          <label htmlFor="password">Password:</label>
          <br />
          <TextBox
            type="password"
            name="password"
            value={passWord}
            onChange={e => setPassWord(e.target.value)}
            required
          />
          <br />

          <Button type="submit" onClick={onLogin} className="marginTop">
            Sign In
          </Button>
        </form>
        <h2>Or</h2>
        <GoogleButton />
        <p>After completing Google sign-in, you will be redirected shortly</p>
      </div>
    </>
  );
}
export default Login;
