import React, { useState, useEffect } from "react";

import firebase from "./firebase.js";

function App() {
  const [heroesArr, setHeroesArr] = useState([]);
  const [userTest, setUserTest] = useState("");
  const db = firebase.firestore();

  useEffect(() => {
    db.collection("characterOptions")
      .orderBy("votes", "desc")
      .onSnapshot(coll => {
        const newHeroes = [];
        coll.forEach(doc => {
          const { Name, uidDownvoted, uidUpvoted, votes } = doc.data();
          newHeroes.push({
            key: doc.id,
            doc,
            Name,
            uidDownvoted,
            uidUpvoted,
            votes
          });
        });
        setHeroesArr(newHeroes);
      });
  }, [db]);

  const onUpVote = i => {
    const collRef = db.collection("characterOptions");
    setHeroesArr(heroesArr =>
      heroesArr.map((item, o) => {
        if (i === o && !item.uidDownvoted && !item.uidUpvoted) {
          collRef.doc(item.key).update({
            votes: firebase.firestore.FieldValue.increment(1),
            uidUpvoted: true
          });
        } else if (i === o && !item.uidDownvoted && item.uidUpvoted) {
          collRef.doc(item.key).update({
            votes: firebase.firestore.FieldValue.increment(-1),
            uidUpvoted: false
          });
        } else if (i === o && item.uidDownvoted && !item.uidUpvoted) {
          collRef.doc(item.key).update({
            votes: firebase.firestore.FieldValue.increment(2),
            uidUpvoted: true,
            uidDownvoted: false
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
        if (i === o && !item.uidDownvoted && !item.uidUpvoted) {
          collRef.doc(item.key).update({
            votes: firebase.firestore.FieldValue.increment(-1),
            uidDownvoted: true
          });
        } else if (i === o && item.uidDownvoted && !item.uidUpvoted) {
          collRef.doc(item.key).update({
            votes: firebase.firestore.FieldValue.increment(1),
            uidDownvoted: false
          });
        } else if (i === o && !item.uidDownvoted && item.uidUpvoted) {
          collRef.doc(item.key).update({
            votes: firebase.firestore.FieldValue.increment(-2),
            uidDownvoted: true,
            uidUpvoted: false
          });
        }
        return item;
      })
    );
  };

  const onSignOut = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        console.log("sign out successful");
      })
      .catch(error => {
        console.log(error);
      });
  };
  firebase.auth().onAuthStateChanged(user => {
    if (user) {
      if (user != null) {
        const person = firebase.auth().currentUser;
        const uid = person.uid;
        console.log(uid);
      }
      setUserTest(false);
    } else {
      setUserTest(true);
    }
  });

  return (
    <div className="App">
      {userTest && <button>dummy sign in</button>}
      <button onClick={onSignOut}>Sign out</button>
      {heroesArr.map((item, i) => (
        <div key={i}>
          <p>{item.Name}</p>
          <p>{item.votes}</p>
          {item.uidDownvoted && <p>this has been downvoted</p>}
          {item.uidUpvoted && <p>this has been upvoted</p>}
          <button onClick={() => onDownVote(i)}>Downvote</button>
          <button onClick={() => onUpVote(i)}>Upvote</button>
        </div>
      ))}
    </div>
  );
}

export default App;

/*
/user: check url and then get url
/add url to user data & add to url data collection
/add all portfolio/blog data to url data collection
/upon vising endpoint, use url params to query data from url collection



*/
