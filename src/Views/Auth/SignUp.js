import React, { useState } from "react";
import firebase from "../../firebase.js";
import PassEmailForm from "../../Components/PassEmailForm";
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
      <PassEmailForm
        title="Sign Up"
        homeRedirect={loggedIn}
        errorState={errorState}
        errorMessage={errorMessage}
        email={email}
        onEmailChange={onEmailChange}
        passWord={passWord}
        onPassWordChange={onPassWordChange}
        passWordWarning={passWordWarning}
        passWordWarningChildren="Password must at least 6 characters"
        onSubmit={onSignUp}
        disabled={passWord.length > 5 && email.length > 0 ? false : true}
        submitButtonClassName="marginTop disabled"
        onSubmitButtonChildren="Create Account and Sign In"
      />
    </>
  );
}

export default SignUp;
