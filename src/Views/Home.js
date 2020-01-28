import React, { useState, useEffect, useContext } from "react";
import firebase from "../firebase.js";
import { Snackbar } from "../Components/SnackBar";
import { SwitchButtons } from "../Components/SwitchButtons";
import { VoteView } from "../Components/VoteView";
import { UpvoteFn } from "../Components/UpvoteFn";
import { DownvoteFn } from "../Components/DownvoteFn";
import { UserContext } from "./Router";
import { HomeDescription } from "../Components/HomeDescription";
import { HomeHead } from "../Components/HomeHead";
import { Spinner } from "../Components/Spinner";
import "../css/Views/Home.css";

const Home = () => {
  const UID = useContext(UserContext);
  const [heroesArr, setHeroesArr] = useState([]);
  const [filmArr, setFilmArr] = useState([]);
  const [charactersShowing, setCharactersShowing] = useState(true);
  const [signInSnackBar, showSignInSnackBar] = useState(false);
  const [lastDOC, setLastDOC] = useState("");
  const [filmPageDoc, setFilmPageDoc] = useState("");
  const [dataFetched, isDataFetched] = useState(false);
  const db = firebase.firestore();
  const [charQuery] = useState(
    db
      .collection("characterOptions")
      .orderBy("votes", "desc")
      .limit(10)
  );
  const [filmQuery] = useState(
    db
      .collection("filmOptions")
      .orderBy("votes", "desc")
      .limit(10)
  );

  useEffect(() => {
    const unsub = charQuery.onSnapshot(
      coll => {
        const pagedDoc = coll.docs[coll.docs.length - 1];
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
        isDataFetched(true);
      },
      error => {
        console.log(error);
      }
    );
    return () => unsub();
  }, [charQuery]);

  useEffect(() => {
    const unsub = filmQuery.onSnapshot(
      coll => {
        const pagedDoc = coll.docs[coll.docs.length - 1];
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
  }, [filmQuery]);

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

  const onPageForward = () => {
    const query = charactersShowing ? charQuery : filmQuery;
    const startAfterDoc = charactersShowing ? lastDOC : filmPageDoc;

    const choosePageDoc = coll => {
      const pagedDoc = coll.docs[coll.docs.length - 1];
      charactersShowing ? setLastDOC(pagedDoc) : setFilmPageDoc(pagedDoc);
    };

    query.startAfter(startAfterDoc).onSnapshot(
      coll => {
        choosePageDoc(coll);
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
            choosePageDoc(coll);
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
            charactersShowing ? setHeroesArr(arr) : setFilmArr(arr);
          });
        } else {
          charactersShowing ? setHeroesArr(arr) : setFilmArr(arr);
        }
      },
      error => {
        console.log(error);
      }
    );
  };

  const storeVal = firebase.firestore.FieldValue;
  const array = charactersShowing ? heroesArr : filmArr;
  const collection = charactersShowing ? "characterOptions" : "filmOptions";

  const onUpvote = i => {
    if (UID) {
      UpvoteFn(i, array, collection, UID, storeVal, db);
    } else {
      showSignInSnackBar(true);
    }
  };
  const onDownvote = i => {
    if (UID) {
      DownvoteFn(i, array, collection, UID, storeVal, db);
    } else {
      showSignInSnackBar(true);
    }
  };

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

        {dataFetched ? (
          <VoteView
            onUpvote={onUpvote}
            onDownvote={onDownvote}
            array={charactersShowing ? heroesArr : filmArr}
            loggedIn={UID}
            onPageForwardClick={onPageForward}
            dataFetched={dataFetched}
          />
        ) : (
          <Spinner />
        )}
      </div>
      <Snackbar
        snackBarVisibility={signInSnackBar}
        snackBarClose={() => showSignInSnackBar(false)}
        text="You must login to vote"
      />
    </>
  );
};
export default Home;
