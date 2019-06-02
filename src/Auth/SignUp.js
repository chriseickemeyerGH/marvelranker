import React, { useState } from "react";
import firebase from "../firebase.js";
import { Redirect } from "react-router-dom";
import "../css/SignUp.css";

function SignUp() {
  const [redirect, setRedirect] = useState(false);
  const [email, setEmail] = useState("");
  const [passWord, setPassWord] = useState("");
  const [passWordWarning, setPassWordWarning] = useState(false);
  const [emailTaken, showEmailTaken] = useState(false);
  const [emailInvalid, showEmailInvalid] = useState(false);

  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      setRedirect(true);
    }
  });

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
        if (error.code === "auth/email-already-in-use") {
          showEmailTaken(true);
        }
        if (error.code === "auth/invalid-email") {
          showEmailInvalid(true);
        }
        if (passWord.length < 6) {
          alert("Your password must be at least 6 characters");
        }
        setPassWord("");
        setEmail("");
        console.log(error);
      });
  };

  return (
    <div>
      <h1>Sign Up</h1>{" "}
      {emailInvalid && <p className="error">Invalid email address</p>}
      {emailTaken && (
        <p className="error">This email address is already in use</p>
      )}
      <form>
        <label>Email</label>
        <input
          type="text"
          name="email"
          value={email}
          required
          onChange={onEmailChange}
        />
        <br />
        <label>Password</label>
        <input
          type="password"
          name="password"
          value={passWord}
          onChange={onPassWordChange}
          required
        />
        {passWordWarning && <p>Password must at least 6 characters</p>}
        <button
          type="submit"
          disabled={passWord.length > 5 && email.length > 0 ? false : true}
          onClick={onSignUp}
        >
          Create Account and Sign In
        </button>
      </form>
      {redirect && <Redirect to="/" />}
    </div>
  );
}

export default SignUp;
