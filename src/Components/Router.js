import { Route, Switch } from "react-router-dom";
import React, { useState, useEffect } from "react";
import App from "../Views/App";
import Login from "../Views/Auth/Login";
import SignUp from "../Views/Auth/SignUp";
import NoMatchRoute from "../Views/404";
import firebase from "../firebase";
import "../css/router.css";
import { RouterLink, RouterButton } from "./RouterLinks";
import SnackBar from "./SnackBar";
import Modal from "./Modal";
import TextBox from "./TextBox";
import Footer from "./Footer";
import Button from "./Button";

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

  const onDeleteAccount = e => {
    e.preventDefault();
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
      <Modal title="Verify Password" showModal={showModal}>
        <p>You must verify your password to delete your account. </p>

        {modalError && <p className="error">{modalErrorText}</p>}
        <form>
          <label htmlFor="email">Email:</label>
          <br />

          <TextBox
            readOnly={true}
            type="email"
            name="email"
            value={USER ? USER.email : ""}
          />
          <label htmlFor="password">Password:</label>
          <br />
          <TextBox
            type="password"
            name="password"
            value={verifiedPassword}
            onChange={e => setVerifiedPassword(e.target.value)}
          />
          <span>
            <Button
              type="submit"
              className="buttonSpacer"
              onClick={onDeleteAccount}
            >
              Delete my account
            </Button>
            <Button className="buttonSpacer" onClick={closeModal}>
              Close
            </Button>
          </span>
        </form>
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
      <section id="page-container">
        <div id="content-wrap">
          <Switch>
            <Route exact path={"/"} component={App} />
            <Route path={"/login"} component={Login} />
            <Route path={"/signup"} component={SignUp} />
            <Route component={NoMatchRoute} />
          </Switch>
          {modalComponent()}
          <SnackBar
            snackBarVisibility={signOutSnackBar}
            text="Sign out successful"
          />
          <SnackBar
            snackBarVisibility={deletionSnackBar}
            text="Account deleted!"
          />
        </div>
        <Footer />
      </section>
    </>
  );
}

export default Router;
