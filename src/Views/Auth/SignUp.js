import React, { useState, useEffect } from "react";
import firebase from "../../firebase.js";
import { Redirect } from "react-router-dom";
import "../../css/Views/SignUp.css";
import TextBox from "../../Components/TextBox";
import Button from "../../Components/Button";

function SignUp() {
  const [redirect, setRedirect] = useState(false);
  const [email, setEmail] = useState("");
  const [passWord, setPassWord] = useState("");
  const [passWordWarning, setPassWordWarning] = useState(false);

  const [errorState, showErrorState] = useState(false);
  const [errorMessage, showErrorMessage] = useState("");

  useEffect(() => {
    const listener = firebase.auth().onAuthStateChanged(user => {
      if (user) {
        setRedirect(true);
      }
    });
    return () => {
      listener();
    };
  }, []);

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

  const onGoogleSignIn = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithRedirect(provider);
  };

  return (
    <div className="flexParent">
      {redirect && <Redirect to="/" />}
      <h1>Sign Up</h1>
      <>{errorState && <p className="error">{errorMessage}</p>}</>
      <form>
        <label>Email</label>
        <br />
        <TextBox
          type="text"
          name="email"
          value={email}
          required
          onChange={onEmailChange}
        />
        <br />
        <label>Password</label>
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
          className="marginTop"
        >
          Create Account and Sign In
        </Button>
      </form>
      <h2>Or</h2>
      <Button onClick={onGoogleSignIn}>Sign in with Google</Button>
      <p>After completing Google sign-in, you will be redirected shortly</p>
    </div>
  );
}

export default SignUp;
