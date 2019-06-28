import React, { useState, useEffect } from "react";
import firebase from "../firebase.js";
import SnackBar from "../Components/SnackBar";
import VotingButtons from "../Components/VotingButtons";
import SwitchButtons from "../Components/SwitchButtons";
import Spinner from "../Components/Spinner";
import Button from "../Components/Button";
import "../css/Views/App.css";
import { Helmet } from "react-helmet";

function App() {
  const [heroesArr, setHeroesArr] = useState([]);
  const [filmArr, setFilmArr] = useState([]);
  const [loggedIn, isLoggedIn] = useState("");
  const [UID, setUID] = useState("");
  const [switchState, setSwitchState] = useState(true);
  const [signInSnackBar, showSignInSnackBar] = useState(false);
  const [loading, isLoading] = useState("");
  const [filmState, setFilmState] = useState(true);
  const [charState, setCharState] = useState(true);

  const [db] = useState(firebase.firestore());

  useEffect(() => {
    const listener = firebase.auth().onAuthStateChanged(user => {
      if (user) {
        setUID(user.uid);
        isLoggedIn(true);
      } else {
        isLoggedIn(false);
      }
    });
    return () => {
      listener();
    };
  }, []);

  useEffect(() => {
    if (charState) {
      isLoading(true);
      const unsubscribe = db
        .collection("characterOptions")
        .orderBy("votes", "desc")
        .onSnapshot(
          coll => {
            const newHeroes = [];
            coll.forEach(doc => {
              const { name, votes, upvoters, downvoters } = doc.data();
              newHeroes.push({
                key: doc.id,
                doc,
                name,
                votes,
                upvoters,
                downvoters
              });
            });
            setHeroesArr(newHeroes);
            isLoading(false);
          },
          error => {
            alert("Error fetching character data: ", error);
          }
        );
      return () => {
        unsubscribe();
      };
    }
  }, [db, charState]);

  useEffect(() => {
    if (!charState) {
      isLoading(true);
      const unsubscribe = db
        .collection("characterOptions")
        .orderBy("name", "asc")
        .onSnapshot(
          coll => {
            const newHeroes = [];
            coll.forEach(doc => {
              const { name, votes, upvoters, downvoters } = doc.data();
              newHeroes.push({
                key: doc.id,
                doc,
                name,
                votes,
                upvoters,
                downvoters
              });
            });
            setHeroesArr(newHeroes);
            isLoading(false);
          },
          error => {
            alert("Error fetching character data: ", error);
          }
        );
      return () => {
        unsubscribe();
      };
    }
  }, [db, charState]);

  useEffect(() => {
    if (filmState) {
      isLoading(true);
      const unsubscribe = db
        .collection("filmOptions")
        .orderBy("votes", "desc")
        .onSnapshot(
          coll => {
            const newFilms = [];
            coll.forEach(doc => {
              const { name, votes, upvoters, downvoters } = doc.data();
              newFilms.push({
                key: doc.id,
                doc,
                name,
                votes,
                upvoters,
                downvoters
              });
            });
            setFilmArr(newFilms);
            isLoading(false);
          },
          error => {
            alert("Error fetching character data: ", error);
          }
        );
      return () => {
        unsubscribe();
      };
    }
  }, [db, filmState]);

  useEffect(() => {
    if (!filmState) {
      isLoading(true);
      const unsubscribe = db
        .collection("filmOptions")
        .orderBy("name", "asc")
        .onSnapshot(
          coll => {
            const newFilms = [];
            coll.forEach(doc => {
              const { name, votes, upvoters, downvoters } = doc.data();
              newFilms.push({
                key: doc.id,
                doc,
                name,
                votes,
                upvoters,
                downvoters
              });
            });
            setFilmArr(newFilms);
            isLoading(false);
          },
          error => {
            alert("Error fetching character data: ", error);
          }
        );
      return () => {
        unsubscribe();
      };
    }
  }, [db, filmState]);

  const storeVal = firebase.firestore.FieldValue;

  const onCharacterUpVote = i => {
    const collRef = db.collection("characterOptions");
    setHeroesArr(heroesArr =>
      heroesArr.map((item, o) => {
        if (
          i === o &&
          !item.downvoters.includes(UID) &&
          !item.upvoters.includes(UID)
        ) {
          collRef.doc(item.key).update({
            votes: storeVal.increment(1),
            upvoters: storeVal.arrayUnion(UID),
            totalUpvotes: storeVal.increment(1)
          });
        } else if (
          i === o &&
          !item.downvoters.includes(UID) &&
          item.upvoters.includes(UID)
        ) {
          collRef.doc(item.key).update({
            votes: storeVal.increment(-1),
            upvoters: storeVal.arrayRemove(UID),
            totalUpvotes: storeVal.increment(-1)
          });
        } else if (
          i === o &&
          item.downvoters.includes(UID) &&
          !item.upvoters.includes(UID)
        ) {
          collRef.doc(item.key).update({
            votes: storeVal.increment(2),
            upvoters: storeVal.arrayUnion(UID),
            downvoters: storeVal.arrayRemove(UID),
            totalUpvotes: storeVal.increment(1),
            totalDownvotes: storeVal.increment(-1)
          });
        }
        return item;
      })
    );
  };

  const onCharacterDownVote = i => {
    const collRef = db.collection("characterOptions");
    setHeroesArr(heroesArr =>
      heroesArr.map((item, o) => {
        if (
          i === o &&
          !item.downvoters.includes(UID) &&
          !item.upvoters.includes(UID)
        ) {
          collRef.doc(item.key).update({
            votes: storeVal.increment(-1),
            downvoters: storeVal.arrayUnion(UID),
            totalDownvotes: storeVal.increment(1)
          });
        } else if (
          i === o &&
          item.downvoters.includes(UID) &&
          !item.upvoters.includes(UID)
        ) {
          collRef.doc(item.key).update({
            votes: storeVal.increment(1),
            downvoters: storeVal.arrayRemove(UID),
            totalDownvotes: storeVal.increment(-1)
          });
        } else if (
          i === o &&
          !item.downvoters.includes(UID) &&
          item.upvoters.includes(UID)
        ) {
          collRef.doc(item.key).update({
            votes: storeVal.increment(-2),
            downvoters: storeVal.arrayUnion(UID),
            upvoters: storeVal.arrayRemove(UID),
            totalDownvotes: storeVal.increment(1),
            totalUpvotes: storeVal.increment(-1)
          });
        }
        return item;
      })
    );
  };

  const onFilmUpvote = i => {
    const collRef = db.collection("filmOptions");
    setFilmArr(prevFilmArr =>
      prevFilmArr.map((item, o) => {
        if (
          i === o &&
          !item.downvoters.includes(UID) &&
          !item.upvoters.includes(UID)
        ) {
          collRef.doc(item.key).update({
            votes: storeVal.increment(1),
            upvoters: storeVal.arrayUnion(UID),
            totalUpvotes: storeVal.increment(1)
          });
        } else if (
          i === o &&
          !item.downvoters.includes(UID) &&
          item.upvoters.includes(UID)
        ) {
          collRef.doc(item.key).update({
            votes: storeVal.increment(-1),
            upvoters: storeVal.arrayRemove(UID),
            totalUpvotes: storeVal.increment(-1)
          });
        } else if (
          i === o &&
          item.downvoters.includes(UID) &&
          !item.upvoters.includes(UID)
        ) {
          collRef.doc(item.key).update({
            votes: storeVal.increment(2),
            upvoters: storeVal.arrayUnion(UID),
            downvoters: storeVal.arrayRemove(UID),
            totalUpvotes: storeVal.increment(1),
            totalDownvotes: storeVal.increment(-1)
          });
        }
        return item;
      })
    );
  };

  const onFilmDownvote = i => {
    const collRef = db.collection("filmOptions");
    setFilmArr(prevFilmArr =>
      prevFilmArr.map((item, o) => {
        if (
          i === o &&
          !item.downvoters.includes(UID) &&
          !item.upvoters.includes(UID)
        ) {
          collRef.doc(item.key).update({
            votes: storeVal.increment(-1),
            downvoters: storeVal.arrayUnion(UID),
            totalDownvotes: storeVal.increment(1)
          });
        } else if (
          i === o &&
          item.downvoters.includes(UID) &&
          !item.upvoters.includes(UID)
        ) {
          collRef.doc(item.key).update({
            votes: storeVal.increment(1),
            downvoters: storeVal.arrayRemove(UID),
            totalDownvotes: storeVal.increment(-1)
          });
        } else if (
          i === o &&
          !item.downvoters.includes(UID) &&
          item.upvoters.includes(UID)
        ) {
          collRef.doc(item.key).update({
            votes: storeVal.increment(-2),
            downvoters: storeVal.arrayUnion(UID),
            upvoters: storeVal.arrayRemove(UID),
            totalDownvotes: storeVal.increment(1),
            totalUpvotes: storeVal.increment(-1)
          });
        }
        return item;
      })
    );
  };

  const signOutVote = () => {
    showSignInSnackBar(true);
    setTimeout(() => {
      showSignInSnackBar(false);
    }, 2400);
  };

  const rankerMain = () => (
    <>
      {loading && <Spinner />}

      <div className="centerButton">
        <Button onClick={() => setCharState(!charState)}>
          {charState ? "Sort by Name" : "Sort by Score"}
        </Button>
      </div>
      <div className="flexMain">
        {heroesArr.map((item, i) => (
          <div className="flexMainChild" key={item.key}>
            <VotingButtons
              loggedIn={loggedIn}
              loggedInUpvote={() => onCharacterUpVote(i)}
              loggedInDownvote={() => onCharacterDownVote(i)}
              upvoteClass={
                item.upvoters.includes(UID) ? "icon iconActive" : "icon"
              }
              downvoteClass={
                item.downvoters.includes(UID) ? "icon iconActive" : "icon"
              }
              votes={item.votes}
              signedOutVote={signOutVote}
            />
            <b className="inline titleSize">
              <p>{charState ? `${i + 1}. ${item.name}` : item.name}</p>
            </b>
          </div>
        ))}
      </div>
    </>
  );
  //tester
  const filmRankerMain = () => (
    <>
      {loading && <Spinner />}
      <div className=" centerButton">
        <Button onClick={() => setFilmState(!filmState)}>
          {filmState ? "Sort by Name" : "Sort by Score"}
        </Button>{" "}
      </div>
      <div className="flexMain">
        {filmArr.map((item, i) => (
          <div className="flexMainChild" key={item.key}>
            <VotingButtons
              loggedIn={loggedIn}
              loggedInUpvote={() => onFilmUpvote(i)}
              loggedInDownvote={() => onFilmDownvote(i)}
              upvoteClass={
                item.upvoters.includes(UID) ? "icon iconActive" : "icon"
              }
              downvoteClass={
                item.downvoters.includes(UID) ? "icon iconActive" : "icon"
              }
              votes={item.votes}
              signedOutVote={signOutVote}
            />

            <b className="inline titleSize">
              <p>{filmState ? `${i + 1}. ${item.name}` : item.name}</p>
            </b>
          </div>
        ))}
      </div>
    </>
  );

  return (
    <>
      <Helmet>
        <title>
          Marvel Cinemative Universe/Avengers Character and Film Ranker
        </title>
        <meta
          name="description"
          content="Rank all your favorite MCU/Avengers films and characters in order of most-liked to least-liked."
        />
      </Helmet>
      <div className="textCenter headerTop">
        <h1>Marvel Cinemative Universe/Avengers Character and Film Ranker</h1>
        <p>
          Using a Reddit-like upvote and downvote system, rank the MCU
          characters and movies in order from best to worst, or from most-liked
          to least-liked. The lists update in real-time!
        </p>
      </div>
      <div className="marginBottom ">
        <SwitchButtons
          switchState={switchState}
          onClickLeft={() => setSwitchState(true)}
          onClickRight={() => setSwitchState(false)}
        />

        {switchState && rankerMain()}
        {!switchState && filmRankerMain()}
        <SnackBar
          snackBarVisibility={signInSnackBar}
          text="You must login to vote"
        />
      </div>
    </>
  );
}

export default App;
