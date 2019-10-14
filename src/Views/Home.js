import React, { useState, useEffect, useContext } from "react";
import firebase from "../firebase.js";
import SnackBar from "../Components/SnackBar";
import SwitchButtons from "../Components/SwitchButtons";
import { VoteView } from "../Components/VoteView";
import { UpvoteFn } from "../Components/UpvoteFn";
import { DownvoteFn } from "../Components/DownvoteFn";
import { UserContext } from "./Router";
import { HomeDescription } from "../Components/HomeDescription";
import { HomeHead } from "../Components/HomeHead";
import "../css/Views/Home.css";

const Home = () => {
  const UID = useContext(UserContext);
  const [heroesArr, setHeroesArr] = useState([]);
  const [filmArr, setFilmArr] = useState([]);
  const [charactersShowing, setCharactersShowing] = useState(true);
  const [signInSnackBar, showSignInSnackBar] = useState(false);
  const [loading, isLoading] = useState(true);
  const [lastDOC, setLastDOC] = useState("");
  const [filmPageDoc, setFilmPageDoc] = useState("");
  const db = firebase.firestore();
  // **these useEffect functions are repetitive because
  // cleanup functions cannot be returned in useCallback hooks
  // or normal functions used within useEffect

  useEffect(() => {
    const unsub = db
      .collection("characterOptions")
      .orderBy("votes", "desc")
      .limit(10)
      .onSnapshot(
        coll => {
          let pagedDoc = coll.docs[coll.docs.length - 1];
          setLastDOC(pagedDoc);
          const arr = [];
          coll.forEach(doc => {
            const { name, votes, upvoters, downvoters } = doc.data();
            arr.push({
              key: doc.id,
              doc,
              name,
              votes,
              upvoters,
              downvoters
            });
          });
          setHeroesArr(arr);
          isLoading(false);
        },
        error => {
          console.log(error);
        }
      );
    return () => unsub();
  }, [db]);

  useEffect(() => {
    const unsub = db
      .collection("filmOptions")
      .orderBy("votes", "desc")
      .limit(10)
      .onSnapshot(
        coll => {
          let pagedDoc = coll.docs[coll.docs.length - 1];
          setFilmPageDoc(pagedDoc);
          const arr = [];
          coll.forEach(doc => {
            const { name, votes, upvoters, downvoters } = doc.data();
            arr.push({
              key: doc.id,
              doc,
              name,
              votes,
              upvoters,
              downvoters
            });
          });
          setFilmArr(arr);
        },
        error => {
          console.log(error);
        }
      );
    return () => unsub();
  }, [db]);

  const onPageForward = () => {
    const query = charactersShowing
      ? db
          .collection("characterOptions")
          .orderBy("votes", "desc")
          .limit(10)
      : db
          .collection("filmOptions")
          .orderBy("votes", "desc")
          .limit(10);

    query.startAfter(charactersShowing ? lastDOC : filmPageDoc).onSnapshot(
      coll => {
        let pagedDoc = coll.docs[coll.docs.length - 1];
        charactersShowing && setLastDOC(pagedDoc);
        !charactersShowing && setFilmPageDoc(pagedDoc);
        const arr = [];
        coll.forEach(doc => {
          const { name, votes, upvoters, downvoters } = doc.data();
          arr.push({
            key: doc.id,
            doc,
            name,
            votes,
            upvoters,
            downvoters
          });
        });
        if (!arr.length) {
          query.onSnapshot(coll => {
            let pagedDoc = coll.docs[coll.docs.length - 1];
            charactersShowing && setLastDOC(pagedDoc);
            !charactersShowing && setFilmPageDoc(pagedDoc);
            const arr = [];
            coll.forEach(doc => {
              const { name, votes, upvoters, downvoters } = doc.data();
              arr.push({
                key: doc.id,
                doc,
                name,
                votes,
                upvoters,
                downvoters
              });
            });
            charactersShowing && setHeroesArr(arr);
            !charactersShowing && setFilmArr(arr);
          });
        } else {
          charactersShowing && setHeroesArr(arr);
          !charactersShowing && setFilmArr(arr);
        }
      },
      error => {
        console.log(error);
      }
    );
  };

  const storeVal = firebase.firestore.FieldValue;

  const onUpvote = i => {
    if (UID) {
      const array = charactersShowing ? heroesArr : filmArr;
      const collection = charactersShowing ? "characterOptions" : "filmOptions";
      UpvoteFn(i, array, collection, UID, storeVal, db);
    } else {
      showSignInSnackBar(true);
    }
  };
  const onDownvote = i => {
    if (UID) {
      const array = charactersShowing ? heroesArr : filmArr;
      const collection = charactersShowing ? "characterOptions" : "filmOptions";
      DownvoteFn(i, array, collection, UID, storeVal, db);
    } else {
      showSignInSnackBar(true);
    }
  };

  useEffect(() => {
    if (signInSnackBar) {
      const timeout = setTimeout(() => {
        showSignInSnackBar(false);
      }, 5000);
      return () => {
        clearTimeout(timeout);
      };
    }
  }, [signInSnackBar]);

  return (
    <>
      <HomeHead />
      <HomeDescription />
      <div className="marginBottom">
        <SwitchButtons
          switchState={charactersShowing}
          onClickLeft={() => setCharactersShowing(true)}
          onClickRight={() => setCharactersShowing(false)}
        />
        {charactersShowing ? (
          <VoteView
            onUpvote={onUpvote}
            onDownvote={onDownvote}
            array={heroesArr}
            loggedIn={UID}
            onPageForwardClick={onPageForward}
            loading={loading}
          />
        ) : (
          <VoteView
            onUpvote={onUpvote}
            onDownvote={onDownvote}
            array={filmArr}
            loggedIn={UID}
            onPageForwardClick={onPageForward}
          />
        )}
      </div>
      <SnackBar
        snackBarVisibility={signInSnackBar}
        snackBarClose={() => showSignInSnackBar(false)}
        text="You must login to vote"
      />
    </>
  );
};
export default Home;
