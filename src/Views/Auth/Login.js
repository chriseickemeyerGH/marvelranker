import React, { useState } from "react";
import firebase from "../../firebase.js";
import "../../css/Components/login.css";
import GoogleButton from "../../Components/GoogleButton";
import Button from "../../Components/Button";

import { Helmet } from "react-helmet";
import { AuthInputs } from "../../Components/AuthInputs";

function Login() {
  const [passWord, setPassWord] = useState("");
  const [email, setEmail] = useState("");
  const [errorMessage, showErrorMessage] = useState("");

  const onLogin = e => {
    e.preventDefault();
    firebase
      .auth()
      .signInWithEmailAndPassword(email, passWord)
      .catch(error => {
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
        <h1>Login</h1>
        <>{errorMessage && <p className="error">{errorMessage}</p>}</>
        <form>
          <AuthInputs
            emailVal={email}
            emailOnChange={e => setEmail(e.target.value)}
            passwordVal={passWord}
            passwordOnChange={e => setPassWord(e.target.value)}
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
