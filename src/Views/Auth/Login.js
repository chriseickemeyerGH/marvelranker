import React, { useState, useEffect } from "react";
import firebase from "../../firebase.js";
import { Redirect } from "react-router-dom";
import TextBox from "../../Components/TextBox";
import Button from "../../Components/Button";
import "../../css/Views/Login.css";

function Login() {
  const [redirect, setRedirect] = useState(false);
  const [passWord, setPassWord] = useState("");
  const [email, setEmail] = useState("");
  const [errorState, showErrorState] = useState(false);
  const [errorMessage, showErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

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

  const onGoogleSignIn = () => {
    firebase.auth().getRedirectResult();
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithRedirect(provider);
    setLoading(true);
  };

  return (
    <div className="flexParent">
      {redirect && <Redirect to="/" />}
      <h1>Login</h1>

      <>{errorState && <p className="error">{errorMessage}</p>}</>
      <form>
        <label>Email</label>
        <br />
        <TextBox
          type="text"
          name="email"
          value={email}
          required
          onChange={e => setEmail(e.target.value)}
        />
        <br />
        <label>Password</label>
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
      <Button onClick={onGoogleSignIn}>Sign in with Google</Button>
      <p>After completing Google sign-in, you will be redirected shortly</p>
    </div>
  );
}
export default Login;
