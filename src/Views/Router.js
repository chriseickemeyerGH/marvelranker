import React, { useState, useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./Home";
import Login from "./Auth/Login";
import { PasswordVerifyModal } from "../Components/PasswordVerifyModal";
import { ProtectedRoute } from "../Components/ProtectedRoute";
import SignUp from "./Auth/SignUp";
import NoMatchRoute from "./404";
import firebase from "../firebase";
import "../css/router.css";
import { RouterButtonGroup } from "../Components/RouterButtonGroup";
import { RouterLinkGroup } from "../Components/RouterLinkGroup";
import { Snackbar } from "../Components/SnackBar";

import Footer from "../Components/Footer";

const UserContext = React.createContext(null);
const FirebaseContext = React.createContext(null);

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
      user ? setUID(user.uid) : setUID("");
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

  const closeModal = e => {
    e.preventDefault();
    setShowModal(false);
    showModalError(false);
    setVerifiedPassword("");
  };

  return (
    <FirebaseContext.Provider value={firebase}>
      <UserContext.Provider value={UID}>
        {!UID && <RouterLinkGroup />}

        {UID && (
          <RouterButtonGroup
            onSignOut={onSignOut}
            onDeleteAccountClick={() => setShowModal(true)}
          />
        )}

        <div id="page-container">
          <div id="content-wrap">
            <Switch>
              <Route exact path="/" component={Home} />
              <ProtectedRoute
                isLoggedIn={UID}
                path="/login"
                component={Login}
              />
              <ProtectedRoute
                isLoggedIn={UID}
                path="/signup"
                component={SignUp}
              />
              <Route component={NoMatchRoute} />
            </Switch>
            <PasswordVerifyModal
              title="Verify Password"
              showModal={showModal}
              modalErrorState={modalError}
              modalErrorText={modalErrorText}
              currentEmailVal={USER ? USER.email : ""}
              passwordVal={verifiedPassword}
              passwordOnChange={e => setVerifiedPassword(e.target.value)}
              onSubmit={onDeleteAccount}
              onModalClose={closeModal}
            />
          </div>
          <Footer />
        </div>
        <Snackbar
          snackBarVisibility={signOutSnackBar}
          snackBarClose={() => showSignOutSnackBar(false)}
          text="Sign out successful"
        />
        <Snackbar
          snackBarVisibility={deletionSnackBar}
          snackBarClose={() => showDeletionSnackBar(false)}
          text="Account deleted!"
        />
      </UserContext.Provider>
    </FirebaseContext.Provider>
  );
};

export { Router, UserContext, FirebaseContext };
