import React, { useState } from "react";
import firebase from "../../firebase.js";
import PassEmailForm from "../../Components/PassEmailForm";
import { useBasicAuthHook } from "../../Hooks/authHook";

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
        if (error.code) {
          showErrorState(true);
          showErrorMessage(error.message);
        }
        setPassWord("");
        setEmail("");
      });
  };

  return (
    <PassEmailForm
      title="Login"
      homeRedirect={loggedIn}
      errorState={errorState}
      errorMessage={errorMessage}
      email={email}
      onEmailChange={e => setEmail(e.target.value)}
      passWord={passWord}
      onPassWordChange={e => setPassWord(e.target.value)}
      // passWordWarning
      // passWordWarningChildren
      onSubmit={onLogin}
      //  disabled
      submitButtonClassName="marginTop"
      onSubmitButtonChildren="Sign In"
    />
  );
}
export default Login;