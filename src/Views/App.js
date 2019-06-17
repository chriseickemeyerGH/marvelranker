import React, { useState, useEffect } from "react";
import Button from "../Components/Button";
import firebase from "../firebase.js";
import Modal from "../Components/Modal";
import TextBox from "../Components/TextBox";
import SnackBar from "../Components/SnackBar";
import "../css/Views/App.css";

function App() {
  const [heroesArr, setHeroesArr] = useState([]);
  const [loggedIn, isLoggedIn] = useState(false);
  const [UID, setUID] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [verifiedPassword, setVerifiedPassword] = useState("");
  const [deletionSnackBar, showDeletionSnackBar] = useState(false);
  const [signOutSnackBar, showSignOutSnackBar] = useState(false);
  const [modalError, showModalError] = useState(false);
  const [modalErrorText, setModalErrorText] = useState("");
  //firebase variables
  const USER = firebase.auth().currentUser;
  const db = firebase.firestore();

  useEffect(() => {
    const listener = firebase.auth().onAuthStateChanged(user => {
      if (user) {
        setUID(user.uid);
        console.log(UID);
        isLoggedIn(true);
      } else {
        isLoggedIn(false);
      }
    });
    return () => {
      listener();
    };
  }, [UID]);

  useEffect(() => {
    db.collection("characterOptions")
      .orderBy("votes", "desc")
      .onSnapshot(coll => {
        const newHeroes = [];
        coll.forEach(doc => {
          const { Name, votes, upvoters, downvoters } = doc.data();
          newHeroes.push({
            key: doc.id,
            doc,
            Name,
            votes,
            upvoters,
            downvoters
          });
        });
        setHeroesArr(newHeroes);
        console.log(newHeroes);
      });
  }, [UID, db]);

  const onUpVote = i => {
    const collRef = db.collection("characterOptions");
    setHeroesArr(heroesArr =>
      heroesArr.map((item, o) => {
        if (
          i === o &&
          !item.downvoters.includes(UID) &&
          !item.upvoters.includes(UID)
        ) {
          collRef.doc(item.key).update({
            votes: firebase.firestore.FieldValue.increment(1),
            upvoters: [...item.upvoters, UID]
          });
        } else if (
          i === o &&
          !item.downvoters.includes(UID) &&
          item.upvoters.includes(UID)
        ) {
          collRef.doc(item.key).update({
            votes: firebase.firestore.FieldValue.increment(-1),
            upvoters: item.upvoters.filter(val => val !== UID)
          });
        } else if (
          i === o &&
          item.downvoters.includes(UID) &&
          !item.upvoters.includes(UID)
        ) {
          collRef.doc(item.key).update({
            votes: firebase.firestore.FieldValue.increment(2),
            upvoters: [...item.upvoters, UID],
            downvoters: item.downvoters.filter(val => val !== UID)
          });
        }
        return item;
      })
    );
  };

  const onDownVote = i => {
    const collRef = db.collection("characterOptions");
    setHeroesArr(heroesArr =>
      heroesArr.map((item, o) => {
        if (
          i === o &&
          !item.downvoters.includes(UID) &&
          !item.upvoters.includes(UID)
        ) {
          collRef.doc(item.key).update({
            votes: firebase.firestore.FieldValue.increment(-1),
            downvoters: [...item.downvoters, UID]
          });
        } else if (
          i === o &&
          item.downvoters.includes(UID) &&
          !item.upvoters.includes(UID)
        ) {
          collRef.doc(item.key).update({
            votes: firebase.firestore.FieldValue.increment(1),
            downvoters: item.downvoters.filter(val => val !== UID)
          });
        } else if (
          i === o &&
          !item.downvoters.includes(UID) &&
          item.upvoters.includes(UID)
        ) {
          collRef.doc(item.key).update({
            votes: firebase.firestore.FieldValue.increment(-2),
            downvoters: [...item.downvoters, UID],
            upvoters: item.upvoters.filter(val => val !== UID)
          });
        }
        return item;
      })
    );
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
        console.log(error);
      });
  };
  const closeModal = () => {
    setShowModal(false);
    showModalError(false);
    setVerifiedPassword("");
  };

  const snackBars = () => (
    <>
      <SnackBar
        snackBarVisibility={deletionSnackBar}
        text="Your account has been successfully deleted"
      />
      <SnackBar
        snackBarVisibility={signOutSnackBar}
        text="Sign-out successful"
      />
    </>
  );

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
      {loggedIn && (
        <>
          <div className="appCenter">
            <button className="appDirectives" onClick={onSignOut}>
              Sign Out
            </button>
            <button
              className="appDirectives"
              onClick={() => setShowModal(true)}
            >
              Delete Your Account
            </button>
          </div>
        </>
      )}
      <div className="topMar100">
        {heroesArr.map((item, i) => (
          <React.Fragment key={i}>
            <p>{item.Name}</p>
            <p>{item.votes}</p>
            {item.downvoters.includes(UID) && <p>this has been downvoted</p>}
            {item.upvoters.includes(UID) && <p>this has been upvoted</p>}
            {loggedIn && (
              <>
                <Button onClick={() => onDownVote(i)}>Downvote</Button>
                <button onClick={() => onUpVote(i)}>Upvote</button>
              </>
            )}

            {!loggedIn && <Button>User signed out</Button>}
          </React.Fragment>
        ))}
      </div>
      {modalComponent()}
      {snackBars()}
    </>
  );
}

export default App;

/*
/user: check url and then get url
/add url to user data & add to url data collection
/add all portfolio/blog data to url data collection
/upon vising endpoint, use url params to query data from url collection

*/
