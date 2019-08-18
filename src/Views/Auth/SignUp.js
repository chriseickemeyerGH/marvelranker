import React, { useState } from "react";
import firebase from "../../firebase.js";
import "../../css/Components/signUp.css";
import TextBox from "../../Components/TextBox";
import GoogleButton from "../../Components/GoogleButton";
import Button from "../../Components/Button";
import { Redirect } from "react-router-dom";

import { useBasicAuthHook } from "../../Hooks/authHook";
import { Helmet } from "react-helmet";

function SignUp() {
  const [email, setEmail] = useState("");
  const [passWord, setPassWord] = useState("");
  const [passWordWarning, setPassWordWarning] = useState(false);
  const [errorState, showErrorState] = useState(false);
  const [errorMessage, showErrorMessage] = useState("");

  const loggedIn = useBasicAuthHook();

  const onPassWordChange = e => {
    const newPassWord = e.target.value;
    setPassWord(newPassWord);
    if (newPassWord.length < 6) {
      setPassWordWarning(true);
    } else if (newPassWord.length > 5) {
      setPassWordWarning(false);
    }
  };

  const onEmailChange = e => {
    const newEmail = e.target.value;
    setEmail(newEmail);
  };

  const onSignUp = e => {
    e.preventDefault();
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, passWord)
      .catch(error => {
        if (error.code) {
          showErrorState(true);
          showErrorMessage(error.message);
        }
        setPassWord("");
        setEmail("");
      });
  };

  return (
    <>
      <Helmet>
        <title>Sign Up to create an account</title>
        <meta
          name="description"
          content="Sign Up to create an account and start ranking the MCU"
        />
      </Helmet>

      <div className="flexParent bodyTopMargin">
        {loggedIn && <Redirect to="/" />}
        <h1>Sign Up</h1>
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
          {passWordWarning && <p>Password must at least 6 characters</p>}

          <Button
            type="submit"
            disabled={passWord.length > 5 && email.length > 0 ? false : true}
            onClick={onSignUp}
            className="marginTop disabled"
          >
            Create Account and Sign In
          </Button>
        </form>
        <h2>Or</h2>
        <GoogleButton />
        <p>After completing Google sign-in, you will be redirected shortly</p>
      </div>
    </>
  );
}

export default SignUp;
