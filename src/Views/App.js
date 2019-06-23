import React, { useState, useEffect } from "react";
import firebase from "../firebase.js";
import SnackBar from "../Components/SnackBar";

import VotingButtons from "../Components/VotingButtons";
import SwitchButtons from "../Components/SwitchButtons";
import Spinner from "../Components/Spinner";
import "../css/Views/App.css";

function App() {
  const [heroesArr, setHeroesArr] = useState([]);
  const [filmArr, setFilmArr] = useState([]);
  const [loggedIn, isLoggedIn] = useState("");
  const [UID, setUID] = useState("");
  const [switchState, setSwitchState] = useState(true);
  const [signInSnackBar, showSignInSnackBar] = useState(false);
  const [loading, isLoading] = useState("");

  const db = firebase.firestore();

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
    isLoading(true);
    db.collection("characterOptions")
      .orderBy("votes", "desc")
      .onSnapshot(
        coll => {
          const newHeroes = [];
          coll.forEach(doc => {
            const { name, votes, upvoters, downvoters, styles } = doc.data();
            newHeroes.push({
              key: doc.id,
              doc,
              name,
              votes,
              upvoters,
              downvoters,
              styles
            });
          });
          setHeroesArr(newHeroes);
          isLoading(false);
        },
        error => {
          alert("Error fetching character data: ", error);
        }
      );
  }, [db]);

  useEffect(() => {
    isLoading(true);
    db.collection("filmOptions")
      .orderBy("votes", "desc")
      .onSnapshot(
        coll => {
          const newFilms = [];
          coll.forEach(doc => {
            const { name, votes, upvoters, downvoters, styles } = doc.data();
            newFilms.push({
              key: doc.id,
              doc,
              name,
              votes,
              upvoters,
              downvoters,
              styles
            });
          });
          setFilmArr(newFilms);
          isLoading(false);
        },
        error => {
          alert("Error fetching film data: ", error);
        }
      );
  }, [db]);

  const store = firebase.firestore;

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
            votes: store.FieldValue.increment(1),
            upvoters: [...item.upvoters, UID],
            totalUpvotes: store.FieldValue.increment(1)
          });
        } else if (
          i === o &&
          !item.downvoters.includes(UID) &&
          item.upvoters.includes(UID)
        ) {
          collRef.doc(item.key).update({
            votes: store.FieldValue.increment(-1),
            upvoters: item.upvoters.filter(val => val !== UID),
            totalUpvotes: store.FieldValue.increment(-1)
          });
        } else if (
          i === o &&
          item.downvoters.includes(UID) &&
          !item.upvoters.includes(UID)
        ) {
          collRef.doc(item.key).update({
            votes: store.FieldValue.increment(2),
            upvoters: [...item.upvoters, UID],
            downvoters: item.downvoters.filter(val => val !== UID),
            totalUpvotes: store.FieldValue.increment(1),
            totalDownvotes: store.FieldValue.increment(-1)
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
            votes: store.FieldValue.increment(-1),
            downvoters: [...item.downvoters, UID],
            totalDownvotes: store.FieldValue.increment(1)
          });
        } else if (
          i === o &&
          item.downvoters.includes(UID) &&
          !item.upvoters.includes(UID)
        ) {
          collRef.doc(item.key).update({
            votes: store.FieldValue.increment(1),
            downvoters: item.downvoters.filter(val => val !== UID),
            totalDownvotes: store.FieldValue.increment(-1)
          });
        } else if (
          i === o &&
          !item.downvoters.includes(UID) &&
          item.upvoters.includes(UID)
        ) {
          collRef.doc(item.key).update({
            votes: store.FieldValue.increment(-2),
            downvoters: [...item.downvoters, UID],
            upvoters: item.upvoters.filter(val => val !== UID),
            totalDownvotes: store.FieldValue.increment(1),
            totalUpvotes: store.FieldValue.increment(-1)
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
            votes: store.FieldValue.increment(1),
            upvoters: [...item.upvoters, UID],
            totalUpvotes: store.FieldValue.increment(1)
          });
        } else if (
          i === o &&
          !item.downvoters.includes(UID) &&
          item.upvoters.includes(UID)
        ) {
          collRef.doc(item.key).update({
            votes: store.FieldValue.increment(-1),
            upvoters: item.upvoters.filter(val => val !== UID),
            totalUpvotes: store.FieldValue.increment(-1)
          });
        } else if (
          i === o &&
          item.downvoters.includes(UID) &&
          !item.upvoters.includes(UID)
        ) {
          collRef.doc(item.key).update({
            votes: store.FieldValue.increment(2),
            upvoters: [...item.upvoters, UID],
            downvoters: item.downvoters.filter(val => val !== UID),
            totalUpvotes: store.FieldValue.increment(1),
            totalDownvotes: store.FieldValue.increment(-1)
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
            votes: store.FieldValue.increment(-1),
            downvoters: [...item.downvoters, UID],
            totalDownvotes: store.FieldValue.increment(1)
          });
        } else if (
          i === o &&
          item.downvoters.includes(UID) &&
          !item.upvoters.includes(UID)
        ) {
          collRef.doc(item.key).update({
            votes: store.FieldValue.increment(1),
            downvoters: item.downvoters.filter(val => val !== UID),
            totalDownvotes: store.FieldValue.increment(-1)
          });
        } else if (
          i === o &&
          !item.downvoters.includes(UID) &&
          item.upvoters.includes(UID)
        ) {
          collRef.doc(item.key).update({
            votes: store.FieldValue.increment(-2),
            downvoters: [...item.downvoters, UID],
            upvoters: item.upvoters.filter(val => val !== UID),
            totalDownvotes: store.FieldValue.increment(1),
            totalUpvotes: store.FieldValue.increment(-1)
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

  /*
Thanos, Iron Man, Hulk, Captain America, Thor, Loki, Ant-man, 
Doctor Strange, Spider-man, The Wasp, Cptn Marvel, Red Skull, Black Panther,
Star-Lord, Gamora, Rocket, Groot, Drax, Mantis, Vision, Hawkeye,
Black Widow, Nebula, Ebony Maw, Falcon, Winter Soldier, Ultron, Valkyrie, 
Nick Fury, Erik Killmonger, Yon-Rogg, The Vulture, Scarlet Witch


  */
  /*
  const addData = () => {
    db.collection("filmOptions")
      .doc("Avengers 4")
      .set({
        name: "Avengers: Endgame (2019)",
        upvoters: [],
        downvoters: [],
        totalUpvotes: 0,
        totalDownvotes: 0,
        votes: 0,
        styles: "na"
      })
      .then(function() {
        console.log("Document successfully written!");
      })
      .catch(function(error) {
        console.error("Error writing document: ", error);
      });
  };

  */
  const rankerMain = () => (
    <>
      {loading && <Spinner />}
      <div className="flexMain topMar100">
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
              <p>{`${i + 1}. ${item.name}`}</p>
            </b>
          </div>
        ))}
      </div>
    </>
  );

  const filmRankerMain = () => (
    <>
      {loading && <Spinner />}
      <div className="flexMain topMar100">
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
              <p>{`${i + 1}. ${item.name}`}</p>
            </b>
          </div>
        ))}
      </div>
    </>
  );

  return (
    <>
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
