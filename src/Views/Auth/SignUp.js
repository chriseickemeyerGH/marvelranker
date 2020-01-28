import React, { useState, useContext } from "react";
//import firebase from "../../firebase.js";
import { FirebaseContext } from ".././Router";
import "../../css/Components/signUp.css";
import { AuthInputs } from "../../Components/AuthInputs";
import GoogleButton from "../../Components/GoogleButton";
import { Button } from "../../Components/Button";
import { Helmet } from "react-helmet";

function SignUp() {
  const firebase = useContext(FirebaseContext);
  const [email, setEmail] = useState("");
  const [passWord, setPassWord] = useState("");
  const [passWordWarning, setPassWordWarning] = useState(false);
  const [errorMessage, showErrorMessage] = useState("");

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
        showErrorMessage(error.message);
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
        <h1>Sign Up</h1>
        <>{errorMessage && <p className="error">{errorMessage}</p>}</>
        <form>
          <AuthInputs
            emailVal={email}
            emailOnChange={onEmailChange}
            passwordVal={passWord}
            passwordOnChange={onPassWordChange}
          />
          <br />
          {passWordWarning && <p>Password must be at least 6 characters</p>}

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
        <GoogleButton firebase={firebase} />
        <p>After completing Google sign-in, you will be redirected shortly</p>
      </div>
    </>
  );
}

export default SignUp;
