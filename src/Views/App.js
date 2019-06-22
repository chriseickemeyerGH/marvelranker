import React, { useState, useEffect } from "react";
import firebase from "../firebase.js";
import SnackBar from "../Components/SnackBar";
import PositionList from "../Components/PositionList";
import VotingButtons from "../Components/VotingButtons";
import SwitchButtons from "../Components/SwitchButtons";
//import Spinner from "../Components/Spinner";
import "../css/Views/App.css";

function App() {
  const [heroesArr, setHeroesArr] = useState([]);
  const [filmArr, setFilmArr] = useState([]);
  const [loggedIn, isLoggedIn] = useState("");
  const [UID, setUID] = useState("");
  const [switchState, setSwitchState] = useState(true);
  const [signInSnackBar, showSignInSnackBar] = useState(false);

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
    db.collection("characterOptions")
      .orderBy("votes", "desc")
      .onSnapshot(
        coll => {
          const newHeroes = [];
          coll.forEach(doc => {
            const {
              name,
              votes,
              upvoters,
              downvoters,
              styles,
              totalUpvotes,
              totalDownvotes
            } = doc.data();
            newHeroes.push({
              key: doc.id,
              doc,
              name,
              votes,
              upvoters,
              downvoters,
              styles,
              totalUpvotes,
              totalDownvotes
            });
          });
          setHeroesArr(newHeroes);
        },
        error => {
          alert("Error fetching character data: ", error);
        }
      );
  }, [db]);

  useEffect(() => {
    db.collection("filmOptions")
      .orderBy("votes", "desc")
      .onSnapshot(
        coll => {
          const newFilms = [];
          coll.forEach(doc => {
            const {
              name,
              votes,
              upvoters,
              downvoters,
              styles,
              totalUpvotes,
              totalDownvotes
            } = doc.data();
            newFilms.push({
              key: doc.id,
              doc,
              name,
              votes,
              upvoters,
              downvoters,
              styles,
              totalUpvotes,
              totalDownvotes
            });
          });
          setFilmArr(newFilms);
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
            totalDownvoets: store.FieldValue.increment(1),
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

  const filmRankerMain = () => (
    <>
      <PositionList targetArray={filmArr} />

      <div className="flexMain topMar100">
        {filmArr.map((item, i) => (
          <div className={item.styles} key={item.key}>
            <b>
              <p className="titleSize">{item.name}</p>
            </b>
            <VotingButtons
              upvotes={item.totalUpvotes}
              downvotes={item.totalDownvotes}
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
          </div>
        ))}
      </div>
    </>
  );
  /*
Thanos, Iron Man, Hulk, Captain America, Thor, Loki, Ant-man, 
Doctor Strange, Spider-man, The Wasp, Cptn Marvel, Red Skull, Black Panther,
Star-Lord, Gamora, Rocket, Groot, Drax, Mantis, Vision, Hawkeye,
Black Widow, Nebula, Ebony Maw, Falcon, Winter Soldier, Ultron, VALKYRIE

  */

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

  const rankerMain = () => (
    <>
      <PositionList targetArray={heroesArr} />
      <div className="flexMain topMar100">
        <button onClick={addData}>Add data</button>
        {heroesArr.map((item, i) => (
          <div className={item.styles} key={item.key}>
            <b>
              <p className="titleSize">{item.name}</p>
            </b>
            <VotingButtons
              upvotes={item.totalUpvotes}
              downvotes={item.totalDownvotes}
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
