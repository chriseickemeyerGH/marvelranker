import React, { useState, useEffect, useContext, useCallback } from "react";
import firebase from "../firebase.js";
import SnackBar from "../Components/SnackBar";
import VotingButtons from "../Components/VotingButtons";
import SwitchButtons from "../Components/SwitchButtons";
import Spinner from "../Components/Spinner";
//import Button from "../Components/Button";
import { UpvoteFn } from "../Components/UpvoteFn";
import { DownvoteFn } from "../Components/DownvoteFn";
import { PageForwardButton } from "../Components/PageForwardButton";
import { UserContext } from "./Router";
import { HomeDescription } from "../Components/HomeDescription";
//import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NameScoreToggleButton } from "../Components/NameScoreToggleButton";
import { Helmet } from "react-helmet";
import "../css/Views/Home.css";

const Home = () => {
  const UID = useContext(UserContext);
  const [db] = useState(firebase.firestore());
  const [heroesArr, setHeroesArr] = useState([]);
  const [filmArr, setFilmArr] = useState([]);
  const [switchState, setSwitchState] = useState(true);
  const [signInSnackBar, showSignInSnackBar] = useState(false);
  const [loading, isLoading] = useState(true);
  const [charState, setCharState] = useState(true);
  const [charNameState, setCharNameState] = useState(false);
  const [filmState, setFilmState] = useState(true);
  const [filmNameState, setFilmNameState] = useState(false);
  const [lastDOC, setLastDOC] = useState("");
  const [firstQuery, setFirstQuery] = useState(true);
  const [secondQuery, setSecondQuery] = useState(true);

  const populateArrays = useCallback(
    array => {
      if (switchState) setHeroesArr(array);
      if (!switchState) setFilmArr(array);
    },
    [switchState]
  );

  useEffect(() => {
    const query =
      (charState &&
        switchState &&
        db.collection("characterOptions").orderBy("votes", "desc")) ||
      (charNameState &&
        switchState &&
        db.collection("characterOptions").orderBy("name", "asc")) ||
      (filmState &&
        !switchState &&
        db.collection("filmOptions").orderBy("votes", "desc")) ||
      (filmNameState &&
        !switchState &&
        db.collection("filmOptions").orderBy("name", "asc"));
    if (charState && switchState && firstQuery) {
      isLoading(true);
      setFirstQuery(false);
    }
    if (filmState && !switchState && secondQuery) {
      isLoading(true);
      setSecondQuery(false);
    }
    if (window.innerWidth <= 1300) {
      const unsub = query.limit(10).onSnapshot(
        coll => {
          let pagedDoc = coll.docs[coll.docs.length - 1];
          console.log(pagedDoc);
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
          populateArrays(arr);
          isLoading(false);
        },
        error => {
          console.log(error);
        }
      );
      return () => {
        unsub();
      };
    } else {
      const unsubscribe = query.onSnapshot(
        coll => {
          setLastDOC(coll.docs[coll.docs.length - 1]);
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
          populateArrays(arr);
          isLoading(false);
        },
        error => {
          console.log(error);
        }
      );
      return () => {
        unsubscribe();
      };
    }
  }, [
    db,
    charState,
    firstQuery,
    charNameState,
    filmState,
    filmNameState,
    switchState,
    secondQuery,
    populateArrays
  ]);

  // lastDoc (also 'query') was making useEffect run on endless loop, thus the repetition here
  //useCallback -> could not return snapshot listener in useEffect
  const onPageForward = () => {
    const query =
      (charState &&
        switchState &&
        db.collection("characterOptions").orderBy("votes", "desc")) ||
      (charNameState &&
        switchState &&
        db.collection("characterOptions").orderBy("name", "asc")) ||
      (filmState &&
        !switchState &&
        db.collection("filmOptions").orderBy("votes", "desc")) ||
      (filmNameState &&
        !switchState &&
        db.collection("filmOptions").orderBy("name", "asc"));

    let query10 = query.limit(10);

    query10.startAfter(lastDOC).onSnapshot(
      coll => {
        setLastDOC(coll.docs[coll.docs.length - 1]);
        const newArr = [];
        coll.forEach(doc => {
          const { name, votes, upvoters, downvoters } = doc.data();
          newArr.push({
            key: doc.id,
            doc,
            name,
            votes,
            upvoters,
            downvoters
          });
        });

        if (!newArr.length) {
          query10.onSnapshot(
            coll => {
              setLastDOC(coll.docs[coll.docs.length - 1]);
              const newArr = [];
              coll.forEach(doc => {
                const { name, votes, upvoters, downvoters } = doc.data();
                newArr.push({
                  key: doc.id,
                  doc,
                  name,
                  votes,
                  upvoters,
                  downvoters
                });
              });
              populateArrays(newArr);
            },
            error => {
              console.log(error);
            }
          );
        } else {
          populateArrays(newArr);
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
      switchState &&
        UpvoteFn(i, heroesArr, "characterOptions", UID, storeVal, db);
      !switchState && UpvoteFn(i, filmArr, "filmOptions", UID, storeVal, db);
    } else {
      showSignInSnackBar(true);
    }
  };
  const onDownvote = i => {
    if (UID) {
      switchState &&
        DownvoteFn(i, heroesArr, "characterOptions", UID, storeVal, db);
      !switchState && DownvoteFn(i, filmArr, "filmOptions", UID, storeVal, db);
    } else {
      showSignInSnackBar(true);
    }
  };

  const voteNameToggle = () => {
    if (switchState) {
      setCharState(!charState);
      setCharNameState(!charNameState);
    } else {
      setFilmState(!filmState);
      setFilmNameState(!filmNameState);
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

  const rankerMain = () => (
    <>
      <NameScoreToggleButton state={charState} onToggle={voteNameToggle} />
      {loading && <Spinner />}
      <div className="flexMain">
        {heroesArr.map((item, i) => (
          <div className="flexMainChild" key={item.key}>
            <VotingButtons
              loggedIn={UID}
              onUpvote={() => onUpvote(i)}
              onDownvote={() => onDownvote(i)}
              upvoteClass={
                UID && item.upvoters.includes(UID) ? "icon iconActive" : "icon"
              }
              downvoteClass={
                UID && item.downvoters.includes(UID)
                  ? "icon iconActive"
                  : "icon"
              }
              votes={item.votes}
            />
            <b className="inline titleSize">
              <p>{item.name}</p>
            </b>
          </div>
        ))}
      </div>
      <PageForwardButton onClick={onPageForward} />}
    </>
  );

  const filmRankerMain = () => (
    <>
      <NameScoreToggleButton state={filmState} onToggle={voteNameToggle} />

      {loading && <Spinner />}
      <div className="flexMain">
        {filmArr.map((item, i) => (
          <div className="flexMainChild" key={item.key}>
            <VotingButtons
              loggedIn={UID}
              onUpvote={() => onUpvote(i)}
              onDownvote={() => onDownvote(i)}
              upvoteClass={
                UID && item.upvoters.includes(UID) ? "icon iconActive" : "icon"
              }
              downvoteClass={
                UID && item.downvoters.includes(UID)
                  ? "icon iconActive"
                  : "icon"
              }
              votes={item.votes}
            />

            <b className="inline titleSize">
              <p>{item.name}</p>
            </b>
          </div>
        ))}
      </div>
      <PageForwardButton onClick={onPageForward} />
    </>
  );

  return (
    <>
      <Helmet>
        <title>Rank the Marvel Cinemative Universe</title>
        <meta
          name="description"
          content="Rank all your favorite MCU/Avengers films and characters in order of most-liked to least-liked."
        />
      </Helmet>
      <HomeDescription />
      <div className="marginBottom ">
        <SwitchButtons
          switchState={switchState}
          onClickLeft={() => setSwitchState(true)}
          onClickRight={() => setSwitchState(false)}
        />

        {switchState && rankerMain()}
        {!switchState && filmRankerMain()}
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
