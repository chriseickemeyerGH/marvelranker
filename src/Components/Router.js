import { Route } from "react-router-dom";
import React, { useState, useEffect, useRef } from "react";
import App from "../Views/App";
import Login from "../Views/Auth/Login";
import SignUp from "../Views/Auth/SignUp";
import firebase from "../firebase";
import "../css/router.css";
import { RouterLink, RouterButton } from "./RouterLinks";
//
import SnackBar from "./SnackBar";
import Modal from "./Modal";
import TextBox from "./TextBox";

function Router() {
  const [loggedIn, isLoggedIn] = useState("");
  const [signOutSnackBar, showSignOutSnackBar] = useState(false);
  const [modalError, showModalError] = useState(false);
  const [modalErrorText, setModalErrorText] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [verifiedPassword, setVerifiedPassword] = useState("");
  const [deletionSnackBar, showDeletionSnackBar] = useState(false);

  const USER = firebase.auth().currentUser;

  useEffect(() => {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        isLoggedIn(true);
      } else {
        isLoggedIn(false);
      }
    });
  }, []);

  const onSignOut = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        isLoggedIn(false);
        showSignOutSnackBar(true);
        setTimeout(() => {
          showSignOutSnackBar(false);
        }, 2400);
      })
      .catch(error => {
        window.confirm(error.message);
      });
  };

  const onDeleteAccount = () => {
    const credential = firebase.auth.EmailAuthProvider.credential(
      USER.email,
      verifiedPassword
    );
    USER.reauthenticateWithCredential(credential)
      .then(() => {
        USER.delete()
          .then(() => {
            setShowModal(false);
            setTimeout(() => {
              showDeletionSnackBar(true);
            }, 1);
            setTimeout(() => {
              showDeletionSnackBar(false);
            }, 2400);
          })
          .catch(error => {
            if (error.code) {
              showModalError(true);
              setModalErrorText(error.message);
            }
          });
      })
      .catch(error => {
        if (error.code) {
          showModalError(true);
          setModalErrorText(error.message);
        }
      });
  };

  const closeModal = () => {
    setShowModal(false);
    showModalError(false);
    setVerifiedPassword("");
  };

  const modalComponent = () => (
    <>
      <Modal
        title="Verify Password"
        onSubmit={onDeleteAccount}
        onClose={closeModal}
        submitTitle="Delete my account"
        showModal={showModal}
      >
        <p>You must verify your password to delete your account. </p>

        {modalError && <p className="error">{modalErrorText}</p>}
        <label htmlFor="email">Email:</label>

        <TextBox
          readOnly={true}
          type="email"
          name="email"
          value={USER ? USER.email : ""}
        />
        <label htmlFor="password">Password:</label>
        <TextBox
          type="password"
          name="password"
          value={verifiedPassword}
          onChange={e => setVerifiedPassword(e.target.value)}
        />
      </Modal>
    </>
  );

  return (
    <>
      <div className="centerTheRouter routerLinkCenter">
        {!loggedIn && (
          <>
            <RouterLink to={"/"} label="Home" exact={true} />
            <RouterLink to={"/login"} label="Login" />
            <RouterLink to={"/signup"} label="Sign Up" />
          </>
        )}
      </div>
      <div className="centerTheRouter routerButtonsCenter">
        {loggedIn && (
          <>
            <RouterButton onClick={onSignOut}>Sign Out</RouterButton>
            <RouterButton onClick={() => setShowModal(true)}>
              Delete Your Account
            </RouterButton>
          </>
        )}
      </div>

      <Route exact path={"/"} component={App} />
      <Route exact path={"/login"} component={Login} />
      <Route exact path={"/signup"} component={SignUp} />

      {modalComponent()}
      <SnackBar
        snackBarVisibility={signOutSnackBar}
        text="Sign out successful"
      />
      <SnackBar snackBarVisibility={deletionSnackBar} text="Account deleted!" />
    </>
  );
}

export default Router;
