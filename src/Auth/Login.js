import React, { useState } from "react";
import firebase from "../firebase.js";
import { Redirect, Link } from "react-router-dom";

function Login() {
  const [redirect, setRedirect] = useState(false);
  const [userName, setUserName] = useState("");
  const [passWord, setPassWord] = useState("");
  const [passWordWarning, setPassWordWarning] = useState(false);
  const [email, setEmail] = useState("");

  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      setRedirect(true);
    }
  });
  const onLogin = e => {
    e.preventDefault();
  };

  const onGoogleSignIn = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithRedirect(provider);
  };

  return (
    <>
      <div>
        <button onClick={onGoogleSignIn}>Google Sign in</button>
        <button>
          <Link to={"/signup"}>Don't have an account? Sign Up</Link>
        </button>
        <form>
          <label>Email</label>
          <input
            type="text"
            name="email"
            value={email}
            required
            onChange={e => setEmail(e.target.value)}
          />
          <br />
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={passWord}
            onChange={e => setPassWord(e.target.value)}
            required
          />

          <button type="submit" onClick={onLogin}>
            Sign In
          </button>
        </form>
        <p>After completing sign-in, you will be redirected shortly</p>
      </div>
      {redirect && <Redirect to="/" />}
    </>
  );
}
export default Login;
