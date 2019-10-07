import { Route, Switch } from "react-router-dom";
import React, { useState, useEffect } from "react";
import Home from "./Home";
import Login from "./Auth/Login";
import { ProtectedRoute } from "../Components/ProtectedRoute";
import SignUp from "./Auth/SignUp";
import NoMatchRoute from "./404";
import firebase from "../firebase";
import "../css/router.css";
import { RouterLink, RouterButton } from "../Components/RouterLinks";
import SnackBar from "../Components/SnackBar";
import Modal from "../Components/Modal";
import TextBox from "../Components/TextBox";
import Footer from "../Components/Footer";
import Button from "../Components/Button";

const UserContext = React.createContext(null);

const Router = () => {
  const [UID, setUID] = useState("");
  const [signOutSnackBar, showSignOutSnackBar] = useState(false);
  const [modalError, showModalError] = useState(false);
  const [modalErrorText, setModalErrorText] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [verifiedPassword, setVerifiedPassword] = useState("");
  const [deletionSnackBar, showDeletionSnackBar] = useState(false);

  useEffect(() => {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        setUID(user.uid);
      } else {
        setUID("");
      }
    });
  }, []);

  useEffect(() => {
    if (signOutSnackBar) {
      const timeout = setTimeout(() => {
        showSignOutSnackBar(false);
      }, 5000);
      return () => {
        clearTimeout(timeout);
      };
    }
  }, [signOutSnackBar]);

  useEffect(() => {
    if (deletionSnackBar) {
      const timeout = setTimeout(() => {
        showDeletionSnackBar(false);
      }, 5000);
      return () => {
        clearTimeout(timeout);
      };
    }
  }, [deletionSnackBar]);

  const onSignOut = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        setUID("");
        showSignOutSnackBar(true);
      })
      .catch(error => {
        alert(error.message);
      });
  };
  const USER = firebase.auth().currentUser;

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
            const truthy = true;
            showDeletionSnackBar(truthy);
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
    <UserContext.Provider value={UID}>
      <div className="centerTheRouter routerLinkCenter">
        {!UID && (
          <>
            <RouterLink to={"/"} label="Home" exact={true} />
            <RouterLink to={"/login"} label="Login" />
            <RouterLink to={"/signup"} label="Sign Up" />
          </>
        )}
      </div>
      <div className="centerTheRouter routerButtonsCenter">
        {UID && (
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
            <Route exact path="/" component={Home} />
            <ProtectedRoute isLoggedIn={UID} path="/login" component={Login} />
            <ProtectedRoute
              isLoggedIn={UID}
              path="/signup"
              component={SignUp}
            />
            <Route component={NoMatchRoute} />
          </Switch>

          {modalComponent()}
        </div>
        <Footer />
      </section>
      <SnackBar
        snackBarVisibility={signOutSnackBar}
        snackBarClose={() => showSignOutSnackBar(false)}
        text="Sign out successful"
      />
      <SnackBar
        snackBarVisibility={deletionSnackBar}
        snackBarClose={() => showDeletionSnackBar(false)}
        text="Account deleted!"
      />
    </UserContext.Provider>
  );
};

export { Router, UserContext };
