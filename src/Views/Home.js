import React, { useState, useEffect } from "react";
import firebase from "../firebase.js";
import SnackBar from "../Components/SnackBar";
import VotingButtons from "../Components/VotingButtons";
import SwitchButtons from "../Components/SwitchButtons";
import Spinner from "../Components/Spinner";
import Button from "../Components/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Helmet } from "react-helmet";
import "../css/Views/Home.css";

function Home() {
  const [db] = useState(firebase.firestore());
  const [heroesArr, setHeroesArr] = useState([]);
  const [filmArr, setFilmArr] = useState([]);
  const [loggedIn, isLoggedIn] = useState("");
  const [UID, setUID] = useState("");
  const [switchState, setSwitchState] = useState(true);
  const [signInSnackBar, showSignInSnackBar] = useState(false);
  const [loading, isLoading] = useState("");
  const [charState, setCharState] = useState(true);
  const [charNameState, setCharNameState] = useState(false);
  const [filmState, setFilmState] = useState(false);
  const [filmNameState, setFilmNameState] = useState(false);
  const [lastDOC, setLastDOC] = useState("");
  const [firstCharQuery, setFirstCharQuery] = useState(true);
  const [firstFilmQuery, setFirstFilmQuery] = useState(true);

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
      const query = db.collection("characterOptions").orderBy("votes", "desc");
      if (firstCharQuery) {
        isLoading(true);
      }
      //pagination/list size contingent upon screen width
      if (window.innerWidth <= 1300) {
        const unsub = query.limit(10).onSnapshot(
          coll => {
            setLastDOC(coll.docs[coll.docs.length - 1]);
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
            setFirstCharQuery(false);
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
            setFirstCharQuery(false);
          },
          error => {
            console.log(error);
          }
        );
        return () => {
          unsubscribe();
        };
      }
    }
  }, [db, charState, firstCharQuery]);

  useEffect(() => {
    if (charNameState) {
      const query = db.collection("characterOptions").orderBy("name", "asc");
      // isLoading(true);
      if (window.innerWidth <= 1300) {
        const unsub = query.limit(10).onSnapshot(
          coll => {
            setLastDOC(coll.docs[coll.docs.length - 1]);
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
            //  isLoading(false);
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
            console.log(error);
          }
        );
        return () => {
          unsubscribe();
        };
      }
    }
  }, [charNameState, db]);

  useEffect(() => {
    if (filmState) {
      const query = db.collection("filmOptions").orderBy("votes", "desc");
      if (firstFilmQuery) {
        isLoading(true);
      }

      if (window.innerWidth <= 1300) {
        const unsub = query.limit(10).onSnapshot(
          coll => {
            setLastDOC(coll.docs[coll.docs.length - 1]);
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
            setFilmArr(newHeroes);
            isLoading(false);
            setFirstFilmQuery(false);
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
            setFilmArr(newHeroes);
            isLoading(false);
            setFirstFilmQuery(false);
          },
          error => {
            console.log(error);
          }
        );
        return () => {
          unsubscribe();
        };
      }
    }
  }, [filmState, firstFilmQuery, db]);

  useEffect(() => {
    if (filmNameState) {
      const query = db.collection("filmOptions").orderBy("name", "asc");
      //  isLoading(true);
      if (window.innerWidth <= 1300) {
        const unsub = query.limit(10).onSnapshot(
          coll => {
            setLastDOC(coll.docs[coll.docs.length - 1]);
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
            setFilmArr(newHeroes);
            //    isLoading(false);
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
            setFilmArr(newHeroes);
            //   isLoading(false);
          },
          error => {
            console.log(error);
          }
        );
        return () => {
          unsubscribe();
        };
      }
    }
  }, [filmNameState, db]);

  function charPageForward() {
    const query = db
      .collection("characterOptions")
      .orderBy("votes", "desc")
      .limit(10);
    query.startAfter(lastDOC).onSnapshot(function(querySnapshot) {
      setLastDOC(querySnapshot.docs[querySnapshot.docs.length - 1]);
      const newArr = [];
      querySnapshot.forEach(function(doc) {
        const { name, votes, upvoters, downvoters } = doc.data();
        newArr.push({ key: doc.id, doc, name, votes, upvoters, downvoters });
      });
      setHeroesArr(newArr);
      if (!newArr.length) {
        query.onSnapshot(
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
            setHeroesArr(newArr);
          },
          error => {
            console.log(error);
          }
        );
      }
    });
  }
  function charNamePageForward() {
    const query = db
      .collection("characterOptions")
      .orderBy("name", "asc")
      .limit(10);
    query.startAfter(lastDOC).onSnapshot(function(querySnapshot) {
      setLastDOC(querySnapshot.docs[querySnapshot.docs.length - 1]);
      const newArr = [];
      querySnapshot.forEach(function(doc) {
        const { name, votes, upvoters, downvoters } = doc.data();
        newArr.push({ key: doc.id, doc, name, votes, upvoters, downvoters });
      });
      setHeroesArr(newArr);
      if (!newArr.length) {
        query.onSnapshot(
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
            setHeroesArr(newArr);
          },
          error => {
            console.log(error);
          }
        );
      }
    });
  }

  function filmPageForward() {
    const query = db
      .collection("filmOptions")
      .orderBy("votes", "desc")
      .limit(10);
    query.startAfter(lastDOC).onSnapshot(function(querySnapshot) {
      setLastDOC(querySnapshot.docs[querySnapshot.docs.length - 1]);
      const newArr = [];
      querySnapshot.forEach(function(doc) {
        const { name, votes, upvoters, downvoters } = doc.data();
        newArr.push({ key: doc.id, doc, name, votes, upvoters, downvoters });
      });
      setFilmArr(newArr);
      if (!newArr.length) {
        query.onSnapshot(
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
            setFilmArr(newArr);
          },
          error => {
            console.log(error);
          }
        );
      }
    });
  }

  function filmNameStateForward() {
    const query = db
      .collection("filmOptions")
      .orderBy("name", "asc")
      .limit(10);
    query.startAfter(lastDOC).onSnapshot(function(querySnapshot) {
      setLastDOC(querySnapshot.docs[querySnapshot.docs.length - 1]);
      const newArr = [];
      querySnapshot.forEach(function(doc) {
        const { name, votes, upvoters, downvoters } = doc.data();
        newArr.push({ key: doc.id, doc, name, votes, upvoters, downvoters });
      });
      setFilmArr(newArr);
      if (!newArr.length) {
        query.onSnapshot(
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
            setFilmArr(newArr);
          },
          error => {
            console.log(error);
          }
        );
      }
    });
  }

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
  };
  const charToggle = () => {
    setCharState(!charState);
    setCharNameState(!charNameState);
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

  const closeSnackbar = () => {
    showSignInSnackBar(false);
  };

  const rankerMain = () => (
    <>
      <div className="centerButton">
        <Button onClick={charToggle}>
          {charState ? "Sort by Name" : "Sort by Score"}
        </Button>
      </div>
      {loading && <Spinner />}
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
              <p>{item.name}</p>
            </b>
          </div>
        ))}
      </div>
      <div className="buttonContainer">
        <Button onClick={charState ? charPageForward : charNamePageForward}>
          Next{" "}
          <FontAwesomeIcon
            title="Next Results"
            aria-hidden="true"
            icon="arrow-right"
          />
        </Button>
      </div>
    </>
  );

  const filmToggle = () => {
    if (!filmState && !filmNameState) {
      setFilmState(true);
    }

    if (filmState) {
      setFilmState(false);
      setFilmNameState(true);
    }
    if (filmNameState) {
      setFilmNameState(false);
      setFilmState(true);
    }
  };

  const filmRankerMain = () => (
    <>
      <div className="centerButton">
        <Button onClick={filmToggle}>
          {filmState ? "Sort by Name" : "Sort by Score"}
        </Button>{" "}
      </div>
      {loading && <Spinner />}
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
              <p>{item.name}</p>
            </b>
          </div>
        ))}
      </div>

      <div className="buttonContainer">
        <Button onClick={filmState ? filmPageForward : filmNameStateForward}>
          Next{" "}
          <FontAwesomeIcon
            title="Next Results"
            aria-hidden="true"
            icon="arrow-right"
          />
        </Button>
      </div>
    </>
  );

  const stateSwitch = () => {
    setSwitchState(false);
    if (filmNameState) {
      return;
    } else {
      setFilmState(true);
    }
  };

  return (
    <>
      <Helmet>
        <title>Rank the Marvel Cinemative Universe</title>
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
          onClickRight={stateSwitch}
        />

        {switchState && rankerMain()}
        {!switchState && filmRankerMain()}
      </div>
      <SnackBar
        snackBarVisibility={signInSnackBar}
        snackBarClose={closeSnackbar}
        text="You must login to vote"
      />
    </>
  );
}

export default Home;

/*
package-lock.json
{
  "name": "marvel-ranker",
  "version": "0.1.0",
  "lockfileVersion": 1,
  "requires": true,
  "dependencies": {
    "@babel/code-frame": {
      "version": "7.5.5",
      "resolved": "https://registry.npmjs.org/@babel/code-frame/-/code-frame-7.5.5.tgz",
      "integrity": "sha512-27d4lZoomVyo51VegxI20xZPuSHusqbQag/ztrBC7wegWoQ1nLREPVSKSW8byhTlzTKyNE4ifaTA6lCp7JjpFw==",
      "requires": {
        "@babel/highlight": "^7.0.0"
      }
    },
    "@babel/core": {
      "version": "7.4.3",
      "resolved": "https://registry.npmjs.org/@babel/core/-/core-7.4.3.tgz",
      "integrity": "sha512-oDpASqKFlbspQfzAE7yaeTmdljSH2ADIvBlb0RwbStltTuWa0+7CCI1fYVINNv9saHPa1W7oaKeuNuKj+RQCvA==",
      "requires": {
        "@babel/code-frame": "^7.0.0",
        "@babel/generator": "^7.4.0",
        "@babel/helpers": "^7.4.3",
        "@babel/parser": "^7.4.3",
        "@babel/template": "^7.4.0",
        "@babel/traverse": "^7.4.3",
        "@babel/types": "^7.4.0",
        "convert-source-map": "^1.1.0",
        "debug": "^4.1.0",
        "json5": "^2.1.0",
        "lodash": "^4.17.11",
        "resolve": "^1.3.2",
        "semver": "^5.4.1",
        "source-map": "^0.5.0"
      },
      "dependencies": {
        "debug": {
          "version": "4.1.1",
          "resolved": "https://registry.npmjs.org/debug/-/debug-4.1.1.tgz",
          "integrity": "sha512-pYAIzeRo8J6KPEaJ0VWOh5Pzkbw/RetuzehGM7QRRX5he4fPHx2rdKMB256ehJCkX+XRQm16eZLqLNS8RSZXZw==",
          "requires": {
            "ms": "^2.1.1"
          }
        },
        "ms": {
          "version": "2.1.2",
          "resolved": "https://registry.npmjs.org/ms/-/ms-2.1.2.tgz",
          "integrity": "sha512-sGkPx+VjMtmA6MX27oA4FBFELFCZZ4S4XqeGOXCv68tT+jb3vk/RyaKWP0PTKyWtmLSM0b+adUTEvbs1PEaH2w=="
        }
      }
    },
    "@babel/generator": {
      "version": "7.5.5",
      "resolved": "https://registry.npmjs.org/@babel/generator/-/generator-7.5.5.tgz",
      "integrity": "sha512-ETI/4vyTSxTzGnU2c49XHv2zhExkv9JHLTwDAFz85kmcwuShvYG2H08FwgIguQf4JC75CBnXAUM5PqeF4fj0nQ==",
      "requires": {
        "@babel/types": "^7.5.5",
        "jsesc": "^2.5.1",
        "lodash": "^4.17.13",
        "source-map": "^0.5.0",
        "trim-right": "^1.0.1"
      }
    },
    "@babel/helper-annotate-as-pure": {
      "version": "7.0.0",
      "resolved": "https://registry.npmjs.org/@babel/helper-annotate-as-pure/-/helper-annotate-as-pure-7.0.0.tgz",
      "integrity": "sha512-3UYcJUj9kvSLbLbUIfQTqzcy5VX7GRZ/CCDrnOaZorFFM01aXp1+GJwuFGV4NDDoAS+mOUyHcO6UD/RfqOks3Q==",
      "requires": {
        "@babel/types": "^7.0.0"
      }
    },
    "@babel/helper-builder-binary-assignment-operator-visitor": {
      "version": "7.1.0",
      "resolved": "https://registry.npmjs.org/@babel/helper-builder-binary-assignment-operator-visitor/-/helper-builder-binary-assignment-operator-visitor-7.1.0.tgz",
      "integrity": "sha512-qNSR4jrmJ8M1VMM9tibvyRAHXQs2PmaksQF7c1CGJNipfe3D8p+wgNwgso/P2A2r2mdgBWAXljNWR0QRZAMW8w==",
      "requires": {
        "@babel/helper-explode-assignable-expression": "^7.1.0",
        "@babel/types": "^7.0.0"
      }
    },
    "@babel/helper-builder-react-jsx": {
      "version": "7.3.0",
      "resolved": "https://registry.npmjs.org/@babel/helper-builder-react-jsx/-/helper-builder-react-jsx-7.3.0.tgz",
      "integrity": "sha512-MjA9KgwCuPEkQd9ncSXvSyJ5y+j2sICHyrI0M3L+6fnS4wMSNDc1ARXsbTfbb2cXHn17VisSnU/sHFTCxVxSMw==",
      "requires": {
        "@babel/types": "^7.3.0",
        "esutils": "^2.0.0"
      }
    },
    "@babel/helper-call-delegate": {
      "version": "7.4.4",
      "resolved": "https://registry.npmjs.org/@babel/helper-call-delegate/-/helper-call-delegate-7.4.4.tgz",
      "integrity": "sha512-l79boDFJ8S1c5hvQvG+rc+wHw6IuH7YldmRKsYtpbawsxURu/paVy57FZMomGK22/JckepaikOkY0MoAmdyOlQ==",
      "requires": {
        "@babel/helper-hoist-variables": "^7.4.4",
        "@babel/traverse": "^7.4.4",
        "@babel/types": "^7.4.4"
      }
    },
    "@babel/helper-create-class-features-plugin": {
      "version": "7.5.5",
      "resolved": "https://registry.npmjs.org/@babel/helper-create-class-features-plugin/-/helper-create-class-features-plugin-7.5.5.tgz",
      "integrity": "sha512-ZsxkyYiRA7Bg+ZTRpPvB6AbOFKTFFK4LrvTet8lInm0V468MWCaSYJE+I7v2z2r8KNLtYiV+K5kTCnR7dvyZjg==",
      "requires": {
        "@babel/helper-function-name": "^7.1.0",
        "@babel/helper-member-expression-to-functions": "^7.5.5",
        "@babel/helper-optimise-call-expression": "^7.0.0",
        "@babel/helper-plugin-utils": "^7.0.0",
        "@babel/helper-replace-supers": "^7.5.5",
        "@babel/helper-split-export-declaration": "^7.4.4"
      }
    },
    "@babel/helper-define-map": {
      "version": "7.5.5",
      "resolved": "https://registry.npmjs.org/@babel/helper-define-map/-/helper-define-map-7.5.5.tgz",
      "integrity": "sha512-fTfxx7i0B5NJqvUOBBGREnrqbTxRh7zinBANpZXAVDlsZxYdclDp467G1sQ8VZYMnAURY3RpBUAgOYT9GfzHBg==",
      "requires": {
        "@babel/helper-function-name": "^7.1.0",
        "@babel/types": "^7.5.5",
        "lodash": "^4.17.13"
      }
    },
    "@babel/helper-explode-assignable-expression": {
      "version": "7.1.0",
      "resolved": "https://registry.npmjs.org/@babel/helper-explode-assignable-expression/-/helper-explode-assignable-expression-7.1.0.tgz",
      "integrity": "sha512-NRQpfHrJ1msCHtKjbzs9YcMmJZOg6mQMmGRB+hbamEdG5PNpaSm95275VD92DvJKuyl0s2sFiDmMZ+EnnvufqA==",
      "requires": {
        "@babel/traverse": "^7.1.0",
        "@babel/types": "^7.0.0"
      }
    },
    "@babel/helper-function-name": {
      "version": "7.1.0",
      "resolved": "https://registry.npmjs.org/@babel/helper-function-name/-/helper-function-name-7.1.0.tgz",
      "integrity": "sha512-A95XEoCpb3TO+KZzJ4S/5uW5fNe26DjBGqf1o9ucyLyCmi1dXq/B3c8iaWTfBk3VvetUxl16e8tIrd5teOCfGw==",
      "requires": {
        "@babel/helper-get-function-arity": "^7.0.0",
        "@babel/template": "^7.1.0",
        "@babel/types": "^7.0.0"
      }
    },
    "@babel/helper-get-function-arity": {
      "version": "7.0.0",
      "resolved": "https://registry.npmjs.org/@babel/helper-get-function-arity/-/helper-get-function-arity-7.0.0.tgz",
      "integrity": "sha512-r2DbJeg4svYvt3HOS74U4eWKsUAMRH01Z1ds1zx8KNTPtpTL5JAsdFv8BNyOpVqdFhHkkRDIg5B4AsxmkjAlmQ==",
      "requires": {
        "@babel/types": "^7.0.0"
      }
    },
    "@babel/helper-hoist-variables": {
      "version": "7.4.4",
      "resolved": "https://registry.npmjs.org/@babel/helper-hoist-variables/-/helper-hoist-variables-7.4.4.tgz",
      "integrity": "sha512-VYk2/H/BnYbZDDg39hr3t2kKyifAm1W6zHRfhx8jGjIHpQEBv9dry7oQ2f3+J703TLu69nYdxsovl0XYfcnK4w==",
      "requires": {
        "@babel/types": "^7.4.4"
      }
    },
    "@babel/helper-member-expression-to-functions": {
      "version": "7.5.5",
      "resolved": "https://registry.npmjs.org/@babel/helper-member-expression-to-functions/-/helper-member-expression-to-functions-7.5.5.tgz",
      "integrity": "sha512-5qZ3D1uMclSNqYcXqiHoA0meVdv+xUEex9em2fqMnrk/scphGlGgg66zjMrPJESPwrFJ6sbfFQYUSa0Mz7FabA==",
      "requires": {
        "@babel/types": "^7.5.5"
      }
    },
    "@babel/helper-module-imports": {
      "version": "7.0.0",
      "resolved": "https://registry.npmjs.org/@babel/helper-module-imports/-/helper-module-imports-7.0.0.tgz",
      "integrity": "sha512-aP/hlLq01DWNEiDg4Jn23i+CXxW/owM4WpDLFUbpjxe4NS3BhLVZQ5i7E0ZrxuQ/vwekIeciyamgB1UIYxxM6A==",
      "requires": {
        "@babel/types": "^7.0.0"
      }
    },
    "@babel/helper-module-transforms": {
      "version": "7.5.5",
      "resolved": "https://registry.npmjs.org/@babel/helper-module-transforms/-/helper-module-transforms-7.5.5.tgz",
      "integrity": "sha512-jBeCvETKuJqeiaCdyaheF40aXnnU1+wkSiUs/IQg3tB85up1LyL8x77ClY8qJpuRJUcXQo+ZtdNESmZl4j56Pw==",
      "requires": {
        "@babel/helper-module-imports": "^7.0.0",
        "@babel/helper-simple-access": "^7.1.0",
        "@babel/helper-split-export-declaration": "^7.4.4",
        "@babel/template": "^7.4.4",
        "@babel/types": "^7.5.5",
        "lodash": "^4.17.13"
      }
    },
    "@babel/helper-optimise-call-expression": {
      "version": "7.0.0",
      "resolved": "https://registry.npmjs.org/@babel/helper-optimise-call-expression/-/helper-optimise-call-expression-7.0.0.tgz",
      "integrity": "sha512-u8nd9NQePYNQV8iPWu/pLLYBqZBa4ZaY1YWRFMuxrid94wKI1QNt67NEZ7GAe5Kc/0LLScbim05xZFWkAdrj9g==",
      "requires": {
        "@babel/types": "^7.0.0"
      }
    },
    "@babel/helper-plugin-utils": {
      "version": "7.0.0",
      "resolved": "https://registry.npmjs.org/@babel/helper-plugin-utils/-/helper-plugin-utils-7.0.0.tgz",
      "integrity": "sha512-CYAOUCARwExnEixLdB6sDm2dIJ/YgEAKDM1MOeMeZu9Ld/bDgVo8aiWrXwcY7OBh+1Ea2uUcVRcxKk0GJvW7QA=="
    },
    "@babel/helper-regex": {
      "version": "7.5.5",
      "resolved": "https://registry.npmjs.org/@babel/helper-regex/-/helper-regex-7.5.5.tgz",
      "integrity": "sha512-CkCYQLkfkiugbRDO8eZn6lRuR8kzZoGXCg3149iTk5se7g6qykSpy3+hELSwquhu+TgHn8nkLiBwHvNX8Hofcw==",
      "requires": {
        "lodash": "^4.17.13"
      }
    },
    "@babel/helper-remap-async-to-generator": {
      "version": "7.1.0",
      "resolved": "https://registry.npmjs.org/@babel/helper-remap-async-to-generator/-/helper-remap-async-to-generator-7.1.0.tgz",
      "integrity": "sha512-3fOK0L+Fdlg8S5al8u/hWE6vhufGSn0bN09xm2LXMy//REAF8kDCrYoOBKYmA8m5Nom+sV9LyLCwrFynA8/slg==",
      "requires": {
        "@babel/helper-annotate-as-pure": "^7.0.0",
        "@babel/helper-wrap-function": "^7.1.0",
        "@babel/template": "^7.1.0",
        "@babel/traverse": "^7.1.0",
        "@babel/types": "^7.0.0"
      }
    },
    "@babel/helper-replace-supers": {
      "version": "7.5.5",
      "resolved": "https://registry.npmjs.org/@babel/helper-replace-supers/-/helper-replace-supers-7.5.5.tgz",
      "integrity": "sha512-XvRFWrNnlsow2u7jXDuH4jDDctkxbS7gXssrP4q2nUD606ukXHRvydj346wmNg+zAgpFx4MWf4+usfC93bElJg==",
      "requires": {
        "@babel/helper-member-expression-to-functions": "^7.5.5",
        "@babel/helper-optimise-call-expression": "^7.0.0",
        "@babel/traverse": "^7.5.5",
        "@babel/types": "^7.5.5"
      }
    },
    "@babel/helper-simple-access": {
      "version": "7.1.0",
      "resolved": "https://registry.npmjs.org/@babel/helper-simple-access/-/helper-simple-access-7.1.0.tgz",
      "integrity": "sha512-Vk+78hNjRbsiu49zAPALxTb+JUQCz1aolpd8osOF16BGnLtseD21nbHgLPGUwrXEurZgiCOUmvs3ExTu4F5x6w==",
      "requires": {
        "@babel/template": "^7.1.0",
        "@babel/types": "^7.0.0"
      }
    },
    "@babel/helper-split-export-declaration": {
      "version": "7.4.4",
      "resolved": "https://registry.npmjs.org/@babel/helper-split-export-declaration/-/helper-split-export-declaration-7.4.4.tgz",
      "integrity": "sha512-Ro/XkzLf3JFITkW6b+hNxzZ1n5OQ80NvIUdmHspih1XAhtN3vPTuUFT4eQnela+2MaZ5ulH+iyP513KJrxbN7Q==",
      "requires": {
        "@babel/types": "^7.4.4"
      }
    },
    "@babel/helper-wrap-function": {
      "version": "7.2.0",
      "resolved": "https://registry.npmjs.org/@babel/helper-wrap-function/-/helper-wrap-function-7.2.0.tgz",
      "integrity": "sha512-o9fP1BZLLSrYlxYEYyl2aS+Flun5gtjTIG8iln+XuEzQTs0PLagAGSXUcqruJwD5fM48jzIEggCKpIfWTcR7pQ==",
      "requires": {
        "@babel/helper-function-name": "^7.1.0",
        "@babel/template": "^7.1.0",
        "@babel/traverse": "^7.1.0",
        "@babel/types": "^7.2.0"
      }
    },
    "@babel/helpers": {
      "version": "7.5.5",
      "resolved": "https://registry.npmjs.org/@babel/helpers/-/helpers-7.5.5.tgz",
      "integrity": "sha512-nRq2BUhxZFnfEn/ciJuhklHvFOqjJUD5wpx+1bxUF2axL9C+v4DE/dmp5sT2dKnpOs4orZWzpAZqlCy8QqE/7g==",
      "requires": {
        "@babel/template": "^7.4.4",
        "@babel/traverse": "^7.5.5",
        "@babel/types": "^7.5.5"
      }
    },
    "@babel/highlight": {
      "version": "7.5.0",
      "resolved": "https://registry.npmjs.org/@babel/highlight/-/highlight-7.5.0.tgz",
      "integrity": "sha512-7dV4eu9gBxoM0dAnj/BCFDW9LFU0zvTrkq0ugM7pnHEgguOEeOz1so2ZghEdzviYzQEED0r4EAgpsBChKy1TRQ==",
      "requires": {
        "chalk": "^2.0.0",
        "esutils": "^2.0.2",
        "js-tokens": "^4.0.0"
      },
      "dependencies": {
        "ansi-styles": {
          "version": "3.2.1",
          "resolved": "https://registry.npmjs.org/ansi-styles/-/ansi-styles-3.2.1.tgz",
          "integrity": "sha512-VT0ZI6kZRdTh8YyJw3SMbYm/u+NqfsAxEpWO0Pf9sq8/e94WxxOpPKx9FR1FlyCtOVDNOQ+8ntlqFxiRc+r5qA==",
          "requires": {
            "color-convert": "^1.9.0"
          }
        },
        "chalk": {
          "version": "2.4.2",
          "resolved": "https://registry.npmjs.org/chalk/-/chalk-2.4.2.tgz",
          "integrity": "sha512-Mti+f9lpJNcwF4tWV8/OrTTtF1gZi+f8FqlyAdouralcFWFQWF2+NgCHShjkCb+IFBLq9buZwE1xckQU4peSuQ==",
          "requires": {
            "ansi-styles": "^3.2.1",
            "escape-string-regexp": "^1.0.5",
            "supports-color": "^5.3.0"
          }
        },
        "supports-color": {
          "version": "5.5.0",
          "resolved": "https://registry.npmjs.org/supports-color/-/supports-color-5.5.0.tgz",
          "integrity": "sha512-QjVjwdXIt408MIiAqCX4oUKsgU2EqAGzs2Ppkm4aQYbjm+ZEWEcW4SfFNTr4uMNZma0ey4f5lgLrkB0aX0QMow==",
          "requires": {
            "has-flag": "^3.0.0"
          }
        }
      }
    },
    "@babel/parser": {
      "version": "7.5.5",
      "resolved": "https://registry.npmjs.org/@babel/parser/-/parser-7.5.5.tgz",
      "integrity": "sha512-E5BN68cqR7dhKan1SfqgPGhQ178bkVKpXTPEXnFJBrEt8/DKRZlybmy+IgYLTeN7tp1R5Ccmbm2rBk17sHYU3g=="
    },
    "@babel/plugin-proposal-async-generator-functions": {
      "version": "7.2.0",
      "resolved": "https://registry.npmjs.org/@babel/plugin-proposal-async-generator-functions/-/plugin-proposal-async-generator-functions-7.2.0.tgz",
      "integrity": "sha512-+Dfo/SCQqrwx48ptLVGLdE39YtWRuKc/Y9I5Fy0P1DDBB9lsAHpjcEJQt+4IifuSOSTLBKJObJqMvaO1pIE8LQ==",
      "requires": {
        "@babel/helper-plugin-utils": "^7.0.0",
        "@babel/helper-remap-async-to-generator": "^7.1.0",
        "@babel/plugin-syntax-async-generators": "^7.2.0"
      }
    },
    "@babel/plugin-proposal-class-properties": {
      "version": "7.5.5",
      "resolved": "https://registry.npmjs.org/@babel/plugin-proposal-class-properties/-/plugin-proposal-class-properties-7.5.5.tgz",
      "integrity": "sha512-AF79FsnWFxjlaosgdi421vmYG6/jg79bVD0dpD44QdgobzHKuLZ6S3vl8la9qIeSwGi8i1fS0O1mfuDAAdo1/A==",
      "requires": {
        "@babel/helper-create-class-features-plugin": "^7.5.5",
        "@babel/helper-plugin-utils": "^7.0.0"
      }
    },
    "@babel/plugin-proposal-decorators": {
      "version": "7.4.4",
      "resolved": "https://registry.npmjs.org/@babel/plugin-proposal-decorators/-/plugin-proposal-decorators-7.4.4.tgz",
      "integrity": "sha512-z7MpQz3XC/iQJWXH9y+MaWcLPNSMY9RQSthrLzak8R8hCj0fuyNk+Dzi9kfNe/JxxlWQ2g7wkABbgWjW36MTcw==",
      "requires": {
        "@babel/helper-create-class-features-plugin": "^7.4.4",
        "@babel/helper-plugin-utils": "^7.0.0",
        "@babel/plugin-syntax-decorators": "^7.2.0"
      }
    },
    "@babel/plugin-proposal-dynamic-import": {
      "version": "7.5.0",
      "resolved": "https://registry.npmjs.org/@babel/plugin-proposal-dynamic-import/-/plugin-proposal-dynamic-import-7.5.0.tgz",
      "integrity": "sha512-x/iMjggsKTFHYC6g11PL7Qy58IK8H5zqfm9e6hu4z1iH2IRyAp9u9dL80zA6R76yFovETFLKz2VJIC2iIPBuFw==",
      "requires": {
        "@babel/helper-plugin-utils": "^7.0.0",
        "@babel/plugin-syntax-dynamic-import": "^7.2.0"
      }
    },
    "@babel/plugin-proposal-json-strings": {
      "version": "7.2.0",
      "resolved": "https://registry.npmjs.org/@babel/plugin-proposal-json-strings/-/plugin-proposal-json-strings-7.2.0.tgz",
      "integrity": "sha512-MAFV1CA/YVmYwZG0fBQyXhmj0BHCB5egZHCKWIFVv/XCxAeVGIHfos3SwDck4LvCllENIAg7xMKOG5kH0dzyUg==",
      "requires": {
        "@babel/helper-plugin-utils": "^7.0.0",
        "@babel/plugin-syntax-json-strings": "^7.2.0"
      }
    },
    "@babel/plugin-proposal-object-rest-spread": {
      "version": "7.5.5",
      "resolved": "https://registry.npmjs.org/@babel/plugin-proposal-object-rest-spread/-/plugin-proposal-object-rest-spread-7.5.5.tgz",
      "integrity": "sha512-F2DxJJSQ7f64FyTVl5cw/9MWn6naXGdk3Q3UhDbFEEHv+EilCPoeRD3Zh/Utx1CJz4uyKlQ4uH+bJPbEhMV7Zw==",
      "requires": {
        "@babel/helper-plugin-utils": "^7.0.0",
        "@babel/plugin-syntax-object-rest-spread": "^7.2.0"
      }
    },
    "@babel/plugin-proposal-optional-catch-binding": {
      "version": "7.2.0",
      "resolved": "https://registry.npmjs.org/@babel/plugin-proposal-optional-catch-binding/-/plugin-proposal-optional-catch-binding-7.2.0.tgz",
      "integrity": "sha512-mgYj3jCcxug6KUcX4OBoOJz3CMrwRfQELPQ5560F70YQUBZB7uac9fqaWamKR1iWUzGiK2t0ygzjTScZnVz75g==",
      "requires": {
        "@babel/helper-plugin-utils": "^7.0.0",
        "@babel/plugin-syntax-optional-catch-binding": "^7.2.0"
      }
    },
    "@babel/plugin-proposal-unicode-property-regex": {
      "version": "7.4.4",
      "resolved": "https://registry.npmjs.org/@babel/plugin-proposal-unicode-property-regex/-/plugin-proposal-unicode-property-regex-7.4.4.tgz",
      "integrity": "sha512-j1NwnOqMG9mFUOH58JTFsA/+ZYzQLUZ/drqWUqxCYLGeu2JFZL8YrNC9hBxKmWtAuOCHPcRpgv7fhap09Fb4kA==",
      "requires": {
        "@babel/helper-plugin-utils": "^7.0.0",
        "@babel/helper-regex": "^7.4.4",
        "regexpu-core": "^4.5.4"
      }
    },
    "@babel/plugin-syntax-async-generators": {
      "version": "7.2.0",
      "resolved": "https://registry.npmjs.org/@babel/plugin-syntax-async-generators/-/plugin-syntax-async-generators-7.2.0.tgz",
      "integrity": "sha512-1ZrIRBv2t0GSlcwVoQ6VgSLpLgiN/FVQUzt9znxo7v2Ov4jJrs8RY8tv0wvDmFN3qIdMKWrmMMW6yZ0G19MfGg==",
      "requires": {
        "@babel/helper-plugin-utils": "^7.0.0"
      }
    },
    "@babel/plugin-syntax-decorators": {
      "version": "7.2.0",
      "resolved": "https://registry.npmjs.org/@babel/plugin-syntax-decorators/-/plugin-syntax-decorators-7.2.0.tgz",
      "integrity": "sha512-38QdqVoXdHUQfTpZo3rQwqQdWtCn5tMv4uV6r2RMfTqNBuv4ZBhz79SfaQWKTVmxHjeFv/DnXVC/+agHCklYWA==",
      "requires": {
        "@babel/helper-plugin-utils": "^7.0.0"
      }
    },
    "@babel/plugin-syntax-dynamic-import": {
      "version": "7.2.0",
      "resolved": "https://registry.npmjs.org/@babel/plugin-syntax-dynamic-import/-/plugin-syntax-dynamic-import-7.2.0.tgz",
      "integrity": "sha512-mVxuJ0YroI/h/tbFTPGZR8cv6ai+STMKNBq0f8hFxsxWjl94qqhsb+wXbpNMDPU3cfR1TIsVFzU3nXyZMqyK4w==",
      "requires": {
        "@babel/helper-plugin-utils": "^7.0.0"
      }
    },
    "@babel/plugin-syntax-flow": {
      "version": "7.2.0",
      "resolved": "https://registry.npmjs.org/@babel/plugin-syntax-flow/-/plugin-syntax-flow-7.2.0.tgz",
      "integrity": "sha512-r6YMuZDWLtLlu0kqIim5o/3TNRAlWb073HwT3e2nKf9I8IIvOggPrnILYPsrrKilmn/mYEMCf/Z07w3yQJF6dg==",
      "requires": {
        "@babel/helper-plugin-utils": "^7.0.0"
      }
    },
    "@babel/plugin-syntax-json-strings": {
      "version": "7.2.0",
      "resolved": "https://registry.npmjs.org/@babel/plugin-syntax-json-strings/-/plugin-syntax-json-strings-7.2.0.tgz",
      "integrity": "sha512-5UGYnMSLRE1dqqZwug+1LISpA403HzlSfsg6P9VXU6TBjcSHeNlw4DxDx7LgpF+iKZoOG/+uzqoRHTdcUpiZNg==",
      "requires": {
        "@babel/helper-plugin-utils": "^7.0.0"
      }
    },
    "@babel/plugin-syntax-jsx": {
      "version": "7.2.0",
      "resolved": "https://registry.npmjs.org/@babel/plugin-syntax-jsx/-/plugin-syntax-jsx-7.2.0.tgz",
      "integrity": "sha512-VyN4QANJkRW6lDBmENzRszvZf3/4AXaj9YR7GwrWeeN9tEBPuXbmDYVU9bYBN0D70zCWVwUy0HWq2553VCb6Hw==",
      "requires": {
        "@babel/helper-plugin-utils": "^7.0.0"
      }
    },
    "@babel/plugin-syntax-object-rest-spread": {
      "version": "7.2.0",
      "resolved": "https://registry.npmjs.org/@babel/plugin-syntax-object-rest-spread/-/plugin-syntax-object-rest-spread-7.2.0.tgz",
      "integrity": "sha512-t0JKGgqk2We+9may3t0xDdmneaXmyxq0xieYcKHxIsrJO64n1OiMWNUtc5gQK1PA0NpdCRrtZp4z+IUaKugrSA==",
      "requires": {
        "@babel/helper-plugin-utils": "^7.0.0"
      }
    },
    "@babel/plugin-syntax-optional-catch-binding": {
      "version": "7.2.0",
      "resolved": "https://registry.npmjs.org/@babel/plugin-syntax-optional-catch-binding/-/plugin-syntax-optional-catch-binding-7.2.0.tgz",
      "integrity": "sha512-bDe4xKNhb0LI7IvZHiA13kff0KEfaGX/Hv4lMA9+7TEc63hMNvfKo6ZFpXhKuEp+II/q35Gc4NoMeDZyaUbj9w==",
      "requires": {
        "@babel/helper-plugin-utils": "^7.0.0"
      }
    },
    "@babel/plugin-syntax-typescript": {
      "version": "7.3.3",
      "resolved": "https://registry.npmjs.org/@babel/plugin-syntax-typescript/-/plugin-syntax-typescript-7.3.3.tgz",
      "integrity": "sha512-dGwbSMA1YhVS8+31CnPR7LB4pcbrzcV99wQzby4uAfrkZPYZlQ7ImwdpzLqi6Z6IL02b8IAL379CaMwo0x5Lag==",
      "requires": {
        "@babel/helper-plugin-utils": "^7.0.0"
      }
    },
    "@babel/plugin-transform-arrow-functions": {
      "version": "7.2.0",
      "resolved": "https://registry.npmjs.org/@babel/plugin-transform-arrow-functions/-/plugin-transform-arrow-functions-7.2.0.tgz",
      "integrity": "sha512-ER77Cax1+8/8jCB9fo4Ud161OZzWN5qawi4GusDuRLcDbDG+bIGYY20zb2dfAFdTRGzrfq2xZPvF0R64EHnimg==",
      "requires": {
        "@babel/helper-plugin-utils": "^7.0.0"
      }
    },
    "@babel/plugin-transform-async-to-generator": {
      "version": "7.5.0",
      "resolved": "https://registry.npmjs.org/@babel/plugin-transform-async-to-generator/-/plugin-transform-async-to-generator-7.5.0.tgz",
      "integrity": "sha512-mqvkzwIGkq0bEF1zLRRiTdjfomZJDV33AH3oQzHVGkI2VzEmXLpKKOBvEVaFZBJdN0XTyH38s9j/Kiqr68dggg==",
      "requires": {
        "@babel/helper-module-imports": "^7.0.0",
        "@babel/helper-plugin-utils": "^7.0.0",
        "@babel/helper-remap-async-to-generator": "^7.1.0"
      }
    },
    "@babel/plugin-transform-block-scoped-functions": {
      "version": "7.2.0",
      "resolved": "https://registry.npmjs.org/@babel/plugin-transform-block-scoped-functions/-/plugin-transform-block-scoped-functions-7.2.0.tgz",
      "integrity": "sha512-ntQPR6q1/NKuphly49+QiQiTN0O63uOwjdD6dhIjSWBI5xlrbUFh720TIpzBhpnrLfv2tNH/BXvLIab1+BAI0w==",
      "requires": {
        "@babel/helper-plugin-utils": "^7.0.0"
      }
    },
    "@babel/plugin-transform-block-scoping": {
      "version": "7.5.5",
      "resolved": "https://registry.npmjs.org/@babel/plugin-transform-block-scoping/-/plugin-transform-block-scoping-7.5.5.tgz",
      "integrity": "sha512-82A3CLRRdYubkG85lKwhZB0WZoHxLGsJdux/cOVaJCJpvYFl1LVzAIFyRsa7CvXqW8rBM4Zf3Bfn8PHt5DP0Sg==",
      "requires": {
        "@babel/helper-plugin-utils": "^7.0.0",
        "lodash": "^4.17.13"
      }
    },
    "@babel/plugin-transform-classes": {
      "version": "7.5.5",
      "resolved": "https://registry.npmjs.org/@babel/plugin-transform-classes/-/plugin-transform-classes-7.5.5.tgz",
      "integrity": "sha512-U2htCNK/6e9K7jGyJ++1p5XRU+LJjrwtoiVn9SzRlDT2KubcZ11OOwy3s24TjHxPgxNwonCYP7U2K51uVYCMDg==",
      "requires": {
        "@babel/helper-annotate-as-pure": "^7.0.0",
        "@babel/helper-define-map": "^7.5.5",
        "@babel/helper-function-name": "^7.1.0",
        "@babel/helper-optimise-call-expression": "^7.0.0",
        "@babel/helper-plugin-utils": "^7.0.0",
        "@babel/helper-replace-supers": "^7.5.5",
        "@babel/helper-split-export-declaration": "^7.4.4",
        "globals": "^11.1.0"
      },
      "dependencies": {
        "globals": {
          "version": "11.12.0",
          "resolved": "https://registry.npmjs.org/globals/-/globals-11.12.0.tgz",
          "integrity": "sha512-WOBp/EEGUiIsJSp7wcv/y6MO+lV9UoncWqxuFfm8eBwzWNgyfBd6Gz+IeKQ9jCmyhoH99g15M3T+QaVHFjizVA=="
        }
      }
    },
    "@babel/plugin-transform-computed-properties": {
      "version": "7.2.0",
      "resolved": "https://registry.npmjs.org/@babel/plugin-transform-computed-properties/-/plugin-transform-computed-properties-7.2.0.tgz",
      "integrity": "sha512-kP/drqTxY6Xt3NNpKiMomfgkNn4o7+vKxK2DDKcBG9sHj51vHqMBGy8wbDS/J4lMxnqs153/T3+DmCEAkC5cpA==",
      "requires": {
        "@babel/helper-plugin-utils": "^7.0.0"
      }
    },
    "@babel/plugin-transform-destructuring": {
      "version": "7.5.0",
      "resolved": "https://registry.npmjs.org/@babel/plugin-transform-destructuring/-/plugin-transform-destructuring-7.5.0.tgz",
      "integrity": "sha512-YbYgbd3TryYYLGyC7ZR+Tq8H/+bCmwoaxHfJHupom5ECstzbRLTch6gOQbhEY9Z4hiCNHEURgq06ykFv9JZ/QQ==",
      "requires": {
        "@babel/helper-plugin-utils": "^7.0.0"
      }
    },
    "@babel/plugin-transform-dotall-regex": {
      "version": "7.4.4",
      "resolved": "https://registry.npmjs.org/@babel/plugin-transform-dotall-regex/-/plugin-transform-dotall-regex-7.4.4.tgz",
      "integrity": "sha512-P05YEhRc2h53lZDjRPk/OektxCVevFzZs2Gfjd545Wde3k+yFDbXORgl2e0xpbq8mLcKJ7Idss4fAg0zORN/zg==",
      "requires": {
        "@babel/helper-plugin-utils": "^7.0.0",
        "@babel/helper-regex": "^7.4.4",
        "regexpu-core": "^4.5.4"
      }
    },
    "@babel/plugin-transform-duplicate-keys": {
      "version": "7.5.0",
      "resolved": "https://registry.npmjs.org/@babel/plugin-transform-duplicate-keys/-/plugin-transform-duplicate-keys-7.5.0.tgz",
      "integrity": "sha512-igcziksHizyQPlX9gfSjHkE2wmoCH3evvD2qR5w29/Dk0SMKE/eOI7f1HhBdNhR/zxJDqrgpoDTq5YSLH/XMsQ==",
      "requires": {
        "@babel/helper-plugin-utils": "^7.0.0"
      }
    },
    "@babel/plugin-transform-exponentiation-operator": {
      "version": "7.2.0",
      "resolved": "https://registry.npmjs.org/@babel/plugin-transform-exponentiation-operator/-/plugin-transform-exponentiation-operator-7.2.0.tgz",
      "integrity": "sha512-umh4hR6N7mu4Elq9GG8TOu9M0bakvlsREEC+ialrQN6ABS4oDQ69qJv1VtR3uxlKMCQMCvzk7vr17RHKcjx68A==",
      "requires": {
        "@babel/helper-builder-binary-assignment-operator-visitor": "^7.1.0",
        "@babel/helper-plugin-utils": "^7.0.0"
      }
    },
    "@babel/plugin-transform-flow-strip-types": {
      "version": "7.4.4",
      "resolved": "https://registry.npmjs.org/@babel/plugin-transform-flow-strip-types/-/plugin-transform-flow-strip-types-7.4.4.tgz",
      "integrity": "sha512-WyVedfeEIILYEaWGAUWzVNyqG4sfsNooMhXWsu/YzOvVGcsnPb5PguysjJqI3t3qiaYj0BR8T2f5njdjTGe44Q==",
      "requires": {
        "@babel/helper-plugin-utils": "^7.0.0",
        "@babel/plugin-syntax-flow": "^7.2.0"
      }
    },
    "@babel/plugin-transform-for-of": {
      "version": "7.4.4",
      "resolved": "https://registry.npmjs.org/@babel/plugin-transform-for-of/-/plugin-transform-for-of-7.4.4.tgz",
      "integrity": "sha512-9T/5Dlr14Z9TIEXLXkt8T1DU7F24cbhwhMNUziN3hB1AXoZcdzPcTiKGRn/6iOymDqtTKWnr/BtRKN9JwbKtdQ==",
      "requires": {
        "@babel/helper-plugin-utils": "^7.0.0"
      }
    },
    "@babel/plugin-transform-function-name": {
      "version": "7.4.4",
      "resolved": "https://registry.npmjs.org/@babel/plugin-transform-function-name/-/plugin-transform-function-name-7.4.4.tgz",
      "integrity": "sha512-iU9pv7U+2jC9ANQkKeNF6DrPy4GBa4NWQtl6dHB4Pb3izX2JOEvDTFarlNsBj/63ZEzNNIAMs3Qw4fNCcSOXJA==",
      "requires": {
        "@babel/helper-function-name": "^7.1.0",
        "@babel/helper-plugin-utils": "^7.0.0"
      }
    },
    "@babel/plugin-transform-literals": {
      "version": "7.2.0",
      "resolved": "https://registry.npmjs.org/@babel/plugin-transform-literals/-/plugin-transform-literals-7.2.0.tgz",
      "integrity": "sha512-2ThDhm4lI4oV7fVQ6pNNK+sx+c/GM5/SaML0w/r4ZB7sAneD/piDJtwdKlNckXeyGK7wlwg2E2w33C/Hh+VFCg==",
      "requires": {
        "@babel/helper-plugin-utils": "^7.0.0"
      }
    },
    "@babel/plugin-transform-member-expression-literals": {
      "version": "7.2.0",
      "resolved": "https://registry.npmjs.org/@babel/plugin-transform-member-expression-literals/-/plugin-transform-member-expression-literals-7.2.0.tgz",
      "integrity": "sha512-HiU3zKkSU6scTidmnFJ0bMX8hz5ixC93b4MHMiYebmk2lUVNGOboPsqQvx5LzooihijUoLR/v7Nc1rbBtnc7FA==",
      "requires": {
        "@babel/helper-plugin-utils": "^7.0.0"
      }
    },
    "@babel/plugin-transform-modules-amd": {
      "version": "7.5.0",
      "resolved": "https://registry.npmjs.org/@babel/plugin-transform-modules-amd/-/plugin-transform-modules-amd-7.5.0.tgz",
      "integrity": "sha512-n20UsQMKnWrltocZZm24cRURxQnWIvsABPJlw/fvoy9c6AgHZzoelAIzajDHAQrDpuKFFPPcFGd7ChsYuIUMpg==",
      "requires": {
        "@babel/helper-module-transforms": "^7.1.0",
        "@babel/helper-plugin-utils": "^7.0.0",
        "babel-plugin-dynamic-import-node": "^2.3.0"
      }
    },
    "@babel/plugin-transform-modules-commonjs": {
      "version": "7.5.0",
      "resolved": "https://registry.npmjs.org/@babel/plugin-transform-modules-commonjs/-/plugin-transform-modules-commonjs-7.5.0.tgz",
      "integrity": "sha512-xmHq0B+ytyrWJvQTc5OWAC4ii6Dhr0s22STOoydokG51JjWhyYo5mRPXoi+ZmtHQhZZwuXNN+GG5jy5UZZJxIQ==",
      "requires": {
        "@babel/helper-module-transforms": "^7.4.4",
        "@babel/helper-plugin-utils": "^7.0.0",
        "@babel/helper-simple-access": "^7.1.0",
        "babel-plugin-dynamic-import-node": "^2.3.0"
      }
    },
    "@babel/plugin-transform-modules-systemjs": {
      "version": "7.5.0",
      "resolved": "https://registry.npmjs.org/@babel/plugin-transform-modules-systemjs/-/plugin-transform-modules-systemjs-7.5.0.tgz",
      "integrity": "sha512-Q2m56tyoQWmuNGxEtUyeEkm6qJYFqs4c+XyXH5RAuYxObRNz9Zgj/1g2GMnjYp2EUyEy7YTrxliGCXzecl/vJg==",
      "requires": {
        "@babel/helper-hoist-variables": "^7.4.4",
        "@babel/helper-plugin-utils": "^7.0.0",
        "babel-plugin-dynamic-import-node": "^2.3.0"
      }
    },
    "@babel/plugin-transform-modules-umd": {
      "version": "7.2.0",
      "resolved": "https://registry.npmjs.org/@babel/plugin-transform-modules-umd/-/plugin-transform-modules-umd-7.2.0.tgz",
      "integrity": "sha512-BV3bw6MyUH1iIsGhXlOK6sXhmSarZjtJ/vMiD9dNmpY8QXFFQTj+6v92pcfy1iqa8DeAfJFwoxcrS/TUZda6sw==",
      "requires": {
        "@babel/helper-module-transforms": "^7.1.0",
        "@babel/helper-plugin-utils": "^7.0.0"
      }
    },
    "@babel/plugin-transform-named-capturing-groups-regex": {
      "version": "7.4.5",
      "resolved": "https://registry.npmjs.org/@babel/plugin-transform-named-capturing-groups-regex/-/plugin-transform-named-capturing-groups-regex-7.4.5.tgz",
      "integrity": "sha512-z7+2IsWafTBbjNsOxU/Iv5CvTJlr5w4+HGu1HovKYTtgJ362f7kBcQglkfmlspKKZ3bgrbSGvLfNx++ZJgCWsg==",
      "requires": {
        "regexp-tree": "^0.1.6"
      }
    },
    "@babel/plugin-transform-new-target": {
      "version": "7.4.4",
      "resolved": "https://registry.npmjs.org/@babel/plugin-transform-new-target/-/plugin-transform-new-target-7.4.4.tgz",
      "integrity": "sha512-r1z3T2DNGQwwe2vPGZMBNjioT2scgWzK9BCnDEh+46z8EEwXBq24uRzd65I7pjtugzPSj921aM15RpESgzsSuA==",
      "requires": {
        "@babel/helper-plugin-utils": "^7.0.0"
      }
    },
    "@babel/plugin-transform-object-super": {
      "version": "7.5.5",
      "resolved": "https://registry.npmjs.org/@babel/plugin-transform-object-super/-/plugin-transform-object-super-7.5.5.tgz",
      "integrity": "sha512-un1zJQAhSosGFBduPgN/YFNvWVpRuHKU7IHBglLoLZsGmruJPOo6pbInneflUdmq7YvSVqhpPs5zdBvLnteltQ==",
      "requires": {
        "@babel/helper-plugin-utils": "^7.0.0",
        "@babel/helper-replace-supers": "^7.5.5"
      }
    },
    "@babel/plugin-transform-parameters": {
      "version": "7.4.4",
      "resolved": "https://registry.npmjs.org/@babel/plugin-transform-parameters/-/plugin-transform-parameters-7.4.4.tgz",
      "integrity": "sha512-oMh5DUO1V63nZcu/ZVLQFqiihBGo4OpxJxR1otF50GMeCLiRx5nUdtokd+u9SuVJrvvuIh9OosRFPP4pIPnwmw==",
      "requires": {
        "@babel/helper-call-delegate": "^7.4.4",
        "@babel/helper-get-function-arity": "^7.0.0",
        "@babel/helper-plugin-utils": "^7.0.0"
      }
    },
    "@babel/plugin-transform-property-literals": {
      "version": "7.2.0",
      "resolved": "https://registry.npmjs.org/@babel/plugin-transform-property-literals/-/plugin-transform-property-literals-7.2.0.tgz",
      "integrity": "sha512-9q7Dbk4RhgcLp8ebduOpCbtjh7C0itoLYHXd9ueASKAG/is5PQtMR5VJGka9NKqGhYEGn5ITahd4h9QeBMylWQ==",
      "requires": {
        "@babel/helper-plugin-utils": "^7.0.0"
      }
    },
    "@babel/plugin-transform-react-constant-elements": {
      "version": "7.5.0",
      "resolved": "https://registry.npmjs.org/@babel/plugin-transform-react-constant-elements/-/plugin-transform-react-constant-elements-7.5.0.tgz",
      "integrity": "sha512-c5Ba8cpybZFp1Izkf2sWGuNjOxoQ32tFgBvvYvwGhi4+9f6vGiSK9Gex4uVuO/Va6YJFu41aAh1MzMjUWkp0IQ==",
      "requires": {
        "@babel/helper-annotate-as-pure": "^7.0.0",
        "@babel/helper-plugin-utils": "^7.0.0"
      }
    },
    "@babel/plugin-transform-react-display-name": {
      "version": "7.2.0",
      "resolved": "https://registry.npmjs.org/@babel/plugin-transform-react-display-name/-/plugin-transform-react-display-name-7.2.0.tgz",
      "integrity": "sha512-Htf/tPa5haZvRMiNSQSFifK12gtr/8vwfr+A9y69uF0QcU77AVu4K7MiHEkTxF7lQoHOL0F9ErqgfNEAKgXj7A==",
      "requires": {
        "@babel/helper-plugin-utils": "^7.0.0"
      }
    },
    "@babel/plugin-transform-react-jsx": {
      "version": "7.3.0",
      "resolved": "https://registry.npmjs.org/@babel/plugin-transform-react-jsx/-/plugin-transform-react-jsx-7.3.0.tgz",
      "integrity": "sha512-a/+aRb7R06WcKvQLOu4/TpjKOdvVEKRLWFpKcNuHhiREPgGRB4TQJxq07+EZLS8LFVYpfq1a5lDUnuMdcCpBKg==",
      "requires": {
        "@babel/helper-builder-react-jsx": "^7.3.0",
        "@babel/helper-plugin-utils": "^7.0.0",
        "@babel/plugin-syntax-jsx": "^7.2.0"
      }
    },
    "@babel/plugin-transform-react-jsx-self": {
      "version": "7.2.0",
      "resolved": "https://registry.npmjs.org/@babel/plugin-transform-react-jsx-self/-/plugin-transform-react-jsx-self-7.2.0.tgz",
      "integrity": "sha512-v6S5L/myicZEy+jr6ielB0OR8h+EH/1QFx/YJ7c7Ua+7lqsjj/vW6fD5FR9hB/6y7mGbfT4vAURn3xqBxsUcdg==",
      "requires": {
        "@babel/helper-plugin-utils": "^7.0.0",
        "@babel/plugin-syntax-jsx": "^7.2.0"
      }
    },
    "@babel/plugin-transform-react-jsx-source": {
      "version": "7.5.0",
      "resolved": "https://registry.npmjs.org/@babel/plugin-transform-react-jsx-source/-/plugin-transform-react-jsx-source-7.5.0.tgz",
      "integrity": "sha512-58Q+Jsy4IDCZx7kqEZuSDdam/1oW8OdDX8f+Loo6xyxdfg1yF0GE2XNJQSTZCaMol93+FBzpWiPEwtbMloAcPg==",
      "requires": {
        "@babel/helper-plugin-utils": "^7.0.0",
        "@babel/plugin-syntax-jsx": "^7.2.0"
      }
    },
    "@babel/plugin-transform-regenerator": {
      "version": "7.4.5",
      "resolved": "https://registry.npmjs.org/@babel/plugin-transform-regenerator/-/plugin-transform-regenerator-7.4.5.tgz",
      "integrity": "sha512-gBKRh5qAaCWntnd09S8QC7r3auLCqq5DI6O0DlfoyDjslSBVqBibrMdsqO+Uhmx3+BlOmE/Kw1HFxmGbv0N9dA==",
      "requires": {
        "regenerator-transform": "^0.14.0"
      }
    },
    "@babel/plugin-transform-reserved-words": {
      "version": "7.2.0",
      "resolved": "https://registry.npmjs.org/@babel/plugin-transform-reserved-words/-/plugin-transform-reserved-words-7.2.0.tgz",
      "integrity": "sha512-fz43fqW8E1tAB3DKF19/vxbpib1fuyCwSPE418ge5ZxILnBhWyhtPgz8eh1RCGGJlwvksHkyxMxh0eenFi+kFw==",
      "requires": {
        "@babel/helper-plugin-utils": "^7.0.0"
      }
    },
    "@babel/plugin-transform-runtime": {
      "version": "7.5.5",
      "resolved": "https://registry.npmjs.org/@babel/plugin-transform-runtime/-/plugin-transform-runtime-7.5.5.tgz",
      "integrity": "sha512-6Xmeidsun5rkwnGfMOp6/z9nSzWpHFNVr2Jx7kwoq4mVatQfQx5S56drBgEHF+XQbKOdIaOiMIINvp/kAwMN+w==",
      "requires": {
        "@babel/helper-module-imports": "^7.0.0",
        "@babel/helper-plugin-utils": "^7.0.0",
        "resolve": "^1.8.1",
        "semver": "^5.5.1"
      }
    },
    "@babel/plugin-transform-shorthand-properties": {
      "version": "7.2.0",
      "resolved": "https://registry.npmjs.org/@babel/plugin-transform-shorthand-properties/-/plugin-transform-shorthand-properties-7.2.0.tgz",
      "integrity": "sha512-QP4eUM83ha9zmYtpbnyjTLAGKQritA5XW/iG9cjtuOI8s1RuL/3V6a3DeSHfKutJQ+ayUfeZJPcnCYEQzaPQqg==",
      "requires": {
        "@babel/helper-plugin-utils": "^7.0.0"
      }
    },
    "@babel/plugin-transform-spread": {
      "version": "7.2.2",
      "resolved": "https://registry.npmjs.org/@babel/plugin-transform-spread/-/plugin-transform-spread-7.2.2.tgz",
      "integrity": "sha512-KWfky/58vubwtS0hLqEnrWJjsMGaOeSBn90Ezn5Jeg9Z8KKHmELbP1yGylMlm5N6TPKeY9A2+UaSYLdxahg01w==",
      "requires": {
        "@babel/helper-plugin-utils": "^7.0.0"
      }
    },
    "@babel/plugin-transform-sticky-regex": {
      "version": "7.2.0",
      "resolved": "https://registry.npmjs.org/@babel/plugin-transform-sticky-regex/-/plugin-transform-sticky-regex-7.2.0.tgz",
      "integrity": "sha512-KKYCoGaRAf+ckH8gEL3JHUaFVyNHKe3ASNsZ+AlktgHevvxGigoIttrEJb8iKN03Q7Eazlv1s6cx2B2cQ3Jabw==",
      "requires": {
        "@babel/helper-plugin-utils": "^7.0.0",
        "@babel/helper-regex": "^7.0.0"
      }
    },
    "@babel/plugin-transform-template-literals": {
      "version": "7.4.4",
      "resolved": "https://registry.npmjs.org/@babel/plugin-transform-template-literals/-/plugin-transform-template-literals-7.4.4.tgz",
      "integrity": "sha512-mQrEC4TWkhLN0z8ygIvEL9ZEToPhG5K7KDW3pzGqOfIGZ28Jb0POUkeWcoz8HnHvhFy6dwAT1j8OzqN8s804+g==",
      "requires": {
        "@babel/helper-annotate-as-pure": "^7.0.0",
        "@babel/helper-plugin-utils": "^7.0.0"
      }
    },
    "@babel/plugin-transform-typeof-symbol": {
      "version": "7.2.0",
      "resolved": "https://registry.npmjs.org/@babel/plugin-transform-typeof-symbol/-/plugin-transform-typeof-symbol-7.2.0.tgz",
      "integrity": "sha512-2LNhETWYxiYysBtrBTqL8+La0jIoQQnIScUJc74OYvUGRmkskNY4EzLCnjHBzdmb38wqtTaixpo1NctEcvMDZw==",
      "requires": {
        "@babel/helper-plugin-utils": "^7.0.0"
      }
    },
    "@babel/plugin-transform-typescript": {
      "version": "7.5.5",
      "resolved": "https://registry.npmjs.org/@babel/plugin-transform-typescript/-/plugin-transform-typescript-7.5.5.tgz",
      "integrity": "sha512-pehKf4m640myZu5B2ZviLaiBlxMCjSZ1qTEO459AXKX5GnPueyulJeCqZFs1nz/Ya2dDzXQ1NxZ/kKNWyD4h6w==",
      "requires": {
        "@babel/helper-create-class-features-plugin": "^7.5.5",
        "@babel/helper-plugin-utils": "^7.0.0",
        "@babel/plugin-syntax-typescript": "^7.2.0"
      }
    },
    "@babel/plugin-transform-unicode-regex": {
      "version": "7.4.4",
      "resolved": "https://registry.npmjs.org/@babel/plugin-transform-unicode-regex/-/plugin-transform-unicode-regex-7.4.4.tgz",
      "integrity": "sha512-il+/XdNw01i93+M9J9u4T7/e/Ue/vWfNZE4IRUQjplu2Mqb/AFTDimkw2tdEdSH50wuQXZAbXSql0UphQke+vA==",
      "requires": {
        "@babel/helper-plugin-utils": "^7.0.0",
        "@babel/helper-regex": "^7.4.4",
        "regexpu-core": "^4.5.4"
      }
    },
    "@babel/preset-env": {
      "version": "7.5.5",
      "resolved": "https://registry.npmjs.org/@babel/preset-env/-/preset-env-7.5.5.tgz",
      "integrity": "sha512-GMZQka/+INwsMz1A5UEql8tG015h5j/qjptpKY2gJ7giy8ohzU710YciJB5rcKsWGWHiW3RUnHib0E5/m3Tp3A==",
      "requires": {
        "@babel/helper-module-imports": "^7.0.0",
        "@babel/helper-plugin-utils": "^7.0.0",
        "@babel/plugin-proposal-async-generator-functions": "^7.2.0",
        "@babel/plugin-proposal-dynamic-import": "^7.5.0",
        "@babel/plugin-proposal-json-strings": "^7.2.0",
        "@babel/plugin-proposal-object-rest-spread": "^7.5.5",
        "@babel/plugin-proposal-optional-catch-binding": "^7.2.0",
        "@babel/plugin-proposal-unicode-property-regex": "^7.4.4",
        "@babel/plugin-syntax-async-generators": "^7.2.0",
        "@babel/plugin-syntax-dynamic-import": "^7.2.0",
        "@babel/plugin-syntax-json-strings": "^7.2.0",
        "@babel/plugin-syntax-object-rest-spread": "^7.2.0",
        "@babel/plugin-syntax-optional-catch-binding": "^7.2.0",
        "@babel/plugin-transform-arrow-functions": "^7.2.0",
        "@babel/plugin-transform-async-to-generator": "^7.5.0",
        "@babel/plugin-transform-block-scoped-functions": "^7.2.0",
        "@babel/plugin-transform-block-scoping": "^7.5.5",
        "@babel/plugin-transform-classes": "^7.5.5",
        "@babel/plugin-transform-computed-properties": "^7.2.0",
        "@babel/plugin-transform-destructuring": "^7.5.0",
        "@babel/plugin-transform-dotall-regex": "^7.4.4",
        "@babel/plugin-transform-duplicate-keys": "^7.5.0",
        "@babel/plugin-transform-exponentiation-operator": "^7.2.0",
        "@babel/plugin-transform-for-of": "^7.4.4",
        "@babel/plugin-transform-function-name": "^7.4.4",
        "@babel/plugin-transform-literals": "^7.2.0",
        "@babel/plugin-transform-member-expression-literals": "^7.2.0",
        "@babel/plugin-transform-modules-amd": "^7.5.0",
        "@babel/plugin-transform-modules-commonjs": "^7.5.0",
        "@babel/plugin-transform-modules-systemjs": "^7.5.0",
        "@babel/plugin-transform-modules-umd": "^7.2.0",
        "@babel/plugin-transform-named-capturing-groups-regex": "^7.4.5",
        "@babel/plugin-transform-new-target": "^7.4.4",
        "@babel/plugin-transform-object-super": "^7.5.5",
        "@babel/plugin-transform-parameters": "^7.4.4",
        "@babel/plugin-transform-property-literals": "^7.2.0",
        "@babel/plugin-transform-regenerator": "^7.4.5",
        "@babel/plugin-transform-reserved-words": "^7.2.0",
        "@babel/plugin-transform-shorthand-properties": "^7.2.0",
        "@babel/plugin-transform-spread": "^7.2.0",
        "@babel/plugin-transform-sticky-regex": "^7.2.0",
        "@babel/plugin-transform-template-literals": "^7.4.4",
        "@babel/plugin-transform-typeof-symbol": "^7.2.0",
        "@babel/plugin-transform-unicode-regex": "^7.4.4",
        "@babel/types": "^7.5.5",
        "browserslist": "^4.6.0",
        "core-js-compat": "^3.1.1",
        "invariant": "^2.2.2",
        "js-levenshtein": "^1.1.3",
        "semver": "^5.5.0"
      }
    },
    "@babel/preset-react": {
      "version": "7.0.0",
      "resolved": "https://registry.npmjs.org/@babel/preset-react/-/preset-react-7.0.0.tgz",
      "integrity": "sha512-oayxyPS4Zj+hF6Et11BwuBkmpgT/zMxyuZgFrMeZID6Hdh3dGlk4sHCAhdBCpuCKW2ppBfl2uCCetlrUIJRY3w==",
      "requires": {
        "@babel/helper-plugin-utils": "^7.0.0",
        "@babel/plugin-transform-react-display-name": "^7.0.0",
        "@babel/plugin-transform-react-jsx": "^7.0.0",
        "@babel/plugin-transform-react-jsx-self": "^7.0.0",
        "@babel/plugin-transform-react-jsx-source": "^7.0.0"
      }
    },
    "@babel/preset-typescript": {
      "version": "7.3.3",
      "resolved": "https://registry.npmjs.org/@babel/preset-typescript/-/preset-typescript-7.3.3.tgz",
      "integrity": "sha512-mzMVuIP4lqtn4du2ynEfdO0+RYcslwrZiJHXu4MGaC1ctJiW2fyaeDrtjJGs7R/KebZ1sgowcIoWf4uRpEfKEg==",
      "requires": {
        "@babel/helper-plugin-utils": "^7.0.0",
        "@babel/plugin-transform-typescript": "^7.3.2"
      }
    },
    "@babel/runtime": {
      "version": "7.5.5",
      "resolved": "https://registry.npmjs.org/@babel/runtime/-/runtime-7.5.5.tgz",
      "integrity": "sha512-28QvEGyQyNkB0/m2B4FU7IEZGK2NUrcMtT6BZEFALTguLk+AUT6ofsHtPk5QyjAdUkpMJ+/Em+quwz4HOt30AQ==",
      "requires": {
        "regenerator-runtime": "^0.13.2"
      }
    },
    "@babel/template": {
      "version": "7.4.4",
      "resolved": "https://registry.npmjs.org/@babel/template/-/template-7.4.4.tgz",
      "integrity": "sha512-CiGzLN9KgAvgZsnivND7rkA+AeJ9JB0ciPOD4U59GKbQP2iQl+olF1l76kJOupqidozfZ32ghwBEJDhnk9MEcw==",
      "requires": {
        "@babel/code-frame": "^7.0.0",
        "@babel/parser": "^7.4.4",
        "@babel/types": "^7.4.4"
      }
    },
    "@babel/traverse": {
      "version": "7.5.5",
      "resolved": "https://registry.npmjs.org/@babel/traverse/-/traverse-7.5.5.tgz",
      "integrity": "sha512-MqB0782whsfffYfSjH4TM+LMjrJnhCNEDMDIjeTpl+ASaUvxcjoiVCo/sM1GhS1pHOXYfWVCYneLjMckuUxDaQ==",
      "requires": {
        "@babel/code-frame": "^7.5.5",
        "@babel/generator": "^7.5.5",
        "@babel/helper-function-name": "^7.1.0",
        "@babel/helper-split-export-declaration": "^7.4.4",
        "@babel/parser": "^7.5.5",
        "@babel/types": "^7.5.5",
        "debug": "^4.1.0",
        "globals": "^11.1.0",
        "lodash": "^4.17.13"
      },
      "dependencies": {
        "debug": {
          "version": "4.1.1",
          "resolved": "https://registry.npmjs.org/debug/-/debug-4.1.1.tgz",
          "integrity": "sha512-pYAIzeRo8J6KPEaJ0VWOh5Pzkbw/RetuzehGM7QRRX5he4fPHx2rdKMB256ehJCkX+XRQm16eZLqLNS8RSZXZw==",
          "requires": {
            "ms": "^2.1.1"
          }
        },
        "globals": {
          "version": "11.12.0",
          "resolved": "https://registry.npmjs.org/globals/-/globals-11.12.0.tgz",
          "integrity": "sha512-WOBp/EEGUiIsJSp7wcv/y6MO+lV9UoncWqxuFfm8eBwzWNgyfBd6Gz+IeKQ9jCmyhoH99g15M3T+QaVHFjizVA=="
        },
        "ms": {
          "version": "2.1.2",
          "resolved": "https://registry.npmjs.org/ms/-/ms-2.1.2.tgz",
          "integrity": "sha512-sGkPx+VjMtmA6MX27oA4FBFELFCZZ4S4XqeGOXCv68tT+jb3vk/RyaKWP0PTKyWtmLSM0b+adUTEvbs1PEaH2w=="
        }
      }
    },
    "@babel/types": {
      "version": "7.5.5",
      "resolved": "https://registry.npmjs.org/@babel/types/-/types-7.5.5.tgz",
      "integrity": "sha512-s63F9nJioLqOlW3UkyMd+BYhXt44YuaFm/VV0VwuteqjYwRrObkU7ra9pY4wAJR3oXi8hJrMcrcJdO/HH33vtw==",
      "requires": {
        "esutils": "^2.0.2",
        "lodash": "^4.17.13",
        "to-fast-properties": "^2.0.0"
      }
    },
    "@cnakazawa/watch": {
      "version": "1.0.3",
      "resolved": "https://registry.npmjs.org/@cnakazawa/watch/-/watch-1.0.3.tgz",
      "integrity": "sha512-r5160ogAvGyHsal38Kux7YYtodEKOj89RGb28ht1jh3SJb08VwRwAKKJL0bGb04Zd/3r9FL3BFIc3bBidYffCA==",
      "requires": {
        "exec-sh": "^0.3.2",
        "minimist": "^1.2.0"
      },
      "dependencies": {
        "minimist": {
          "version": "1.2.0",
          "resolved": "https://registry.npmjs.org/minimist/-/minimist-1.2.0.tgz",
          "integrity": "sha1-o1AIsg9BOD7sH7kU9M1d95omQoQ="
        }
      }
    },
    "@csstools/convert-colors": {
      "version": "1.4.0",
      "resolved": "https://registry.npmjs.org/@csstools/convert-colors/-/convert-colors-1.4.0.tgz",
      "integrity": "sha512-5a6wqoJV/xEdbRNKVo6I4hO3VjyDq//8q2f9I6PBAvMesJHFauXDorcNCsr9RzvsZnaWi5NYCcfyqP1QeFHFbw=="
    },
    "@csstools/normalize.css": {
      "version": "9.0.1",
      "resolved": "https://registry.npmjs.org/@csstools/normalize.css/-/normalize.css-9.0.1.tgz",
      "integrity": "sha512-6It2EVfGskxZCQhuykrfnALg7oVeiI6KclWSmGDqB0AiInVrTGB9Jp9i4/Ad21u9Jde/voVQz6eFX/eSg/UsPA=="
    },
    "@firebase/app": {
      "version": "0.4.4",
      "resolved": "https://registry.npmjs.org/@firebase/app/-/app-0.4.4.tgz",
      "integrity": "sha512-RcRFIafRHcXGNC5iXFeFX6NGHyx+LLidhpj5JPlcc+sgScjg80lFvYERKugHITQjklmHEzwzAhWxmfZEDAzmyQ==",
      "requires": {
        "@firebase/app-types": "0.4.0",
        "@firebase/logger": "0.1.15",
        "@firebase/util": "0.2.18",
        "dom-storage": "2.1.0",
        "tslib": "1.9.3",
        "xmlhttprequest": "1.8.0"
      }
    },
    "@firebase/app-types": {
      "version": "0.4.0",
      "resolved": "https://registry.npmjs.org/@firebase/app-types/-/app-types-0.4.0.tgz",
      "integrity": "sha512-8erNMHc0V26gA6Nj4W9laVrQrXHsj9K2TEM7eL2IQogGSHLL4vet3UNekYfcGQ2cjfvwUjMzd+BNS/8S7GnfiA=="
    },
    "@firebase/auth": {
      "version": "0.11.3",
      "resolved": "https://registry.npmjs.org/@firebase/auth/-/auth-0.11.3.tgz",
      "integrity": "sha512-MFjnQGzZM89pqQItHNf8QPbCj0PjaFomd3JGUpnyxVwMyuovsRxVmBofi8mq/eiwzy7qwvRHFB8ngevWkkdAMA==",
      "requires": {
        "@firebase/auth-types": "0.7.0"
      }
    },
    "@firebase/auth-types": {
      "version": "0.7.0",
      "resolved": "https://registry.npmjs.org/@firebase/auth-types/-/auth-types-0.7.0.tgz",
      "integrity": "sha512-QEG9azYwssGWcb4NaKFHe3Piez0SG46nRlu76HM4/ob0sjjNpNTY1Z5C3IoeJYknp2kMzuQi0TTW8tjEgkUAUA=="
    },
    "@firebase/database": {
      "version": "0.4.4",
      "resolved": "https://registry.npmjs.org/@firebase/database/-/database-0.4.4.tgz",
      "integrity": "sha512-za3q2adxozScSS9GbXbWnP0CiX4zQULxhh6Oa0p1+wDieD9N4p8SNpmhFwUkY239WO11Ffkhp6mQ6Hjibc/ZDg==",
      "requires": {
        "@firebase/database-types": "0.4.0",
        "@firebase/logger": "0.1.15",
        "@firebase/util": "0.2.18",
        "faye-websocket": "0.11.1",
        "tslib": "1.9.3"
      }
    },
    "@firebase/database-types": {
      "version": "0.4.0",
      "resolved": "https://registry.npmjs.org/@firebase/database-types/-/database-types-0.4.0.tgz",
      "integrity": "sha512-2piRYW7t+2s/P1NPpcI/3+8Y5l2WnJhm9KACoXW5zmoAPlya8R1aEaR2dNHLNePTMHdg04miEDD9fEz4xUqzZA=="
    },
    "@firebase/firestore": {
      "version": "1.3.5",
      "resolved": "https://registry.npmjs.org/@firebase/firestore/-/firestore-1.3.5.tgz",
      "integrity": "sha512-iEwfCFwj5bC1ZuM3z//y45Gwz7pr8LGLR0dAHW0YJNP9oTHoKJrh+gda35i1qQuuOSt5DPNsdB4XPVLS9C+IUA==",
      "requires": {
        "@firebase/firestore-types": "1.3.0",
        "@firebase/logger": "0.1.15",
        "@firebase/webchannel-wrapper": "0.2.20",
        "@grpc/proto-loader": "^0.5.0",
        "grpc": "1.20.3",
        "tslib": "1.9.3"
      }
    },
    "@firebase/firestore-types": {
      "version": "1.3.0",
      "resolved": "https://registry.npmjs.org/@firebase/firestore-types/-/firestore-types-1.3.0.tgz",
      "integrity": "sha512-XPnfAaYsKgYivgl/U1+M5ulBG9Hxv52zrZR5TuaoKCU791t/E3K85rT1ZGtEHu9Fj4CPTep2NSl8I30MQpUlHA=="
    },
    "@firebase/functions": {
      "version": "0.4.9",
      "resolved": "https://registry.npmjs.org/@firebase/functions/-/functions-0.4.9.tgz",
      "integrity": "sha512-0K6loEAiSYQC22Z0SK58lnTF32z1QmApj4yWDs+RwoZ0H6NgIAWEqYhh0ZVywngOusTeh2yDVUmDnTXrkYNZlQ==",
      "requires": {
        "@firebase/functions-types": "0.3.5",
        "@firebase/messaging-types": "0.3.0",
        "isomorphic-fetch": "2.2.1",
        "tslib": "1.9.3"
      }
    },
    "@firebase/functions-types": {
      "version": "0.3.5",
      "resolved": "https://registry.npmjs.org/@firebase/functions-types/-/functions-types-0.3.5.tgz",
      "integrity": "sha512-3hTMqfSugCfxzT6vZPbzQ58G4941rsFr99fWKXGKFAl2QpdMBCnKmEKdg/p5M47xIPyzIQn6NMF5kCo/eICXhA=="
    },
    "@firebase/installations": {
      "version": "0.1.5",
      "resolved": "https://registry.npmjs.org/@firebase/installations/-/installations-0.1.5.tgz",
      "integrity": "sha512-dI4DCu8zRyhqTsVh1hwBgmg4uBZ8qGrDRuXiSS45MqnyX7qh8+v6UqY4VZpnErU3hj1FnMPDdgOKIaM2sujNCg==",
      "requires": {
        "@firebase/installations-types": "0.1.1",
        "@firebase/util": "0.2.18",
        "idb": "3.0.2",
        "tslib": "1.9.3"
      }
    },
    "@firebase/installations-types": {
      "version": "0.1.1",
      "resolved": "https://registry.npmjs.org/@firebase/installations-types/-/installations-types-0.1.1.tgz",
      "integrity": "sha512-M+plQIOt6p+/j/ExUgsfXe1JFAKymhBU0K3+cp7hzj52vLSpklOqNJi4LkFl41pgRFPZeKf7MrTkMhVowg3Ukw=="
    },
    "@firebase/logger": {
      "version": "0.1.15",
      "resolved": "https://registry.npmjs.org/@firebase/logger/-/logger-0.1.15.tgz",
      "integrity": "sha512-Xq8CdlPPZCAwZ1yspfyTO2YIoIlTV3QpjjCcBuOGR7q90457wdN5/2X8S2DjSiFfPtyPP/nTIT6Bs3Fi+upPTw=="
    },
    "@firebase/messaging": {
      "version": "0.4.1",
      "resolved": "https://registry.npmjs.org/@firebase/messaging/-/messaging-0.4.1.tgz",
      "integrity": "sha512-USLPkKGmSNJao/Iq0mHad7YI87Cnf0ODag1d2pGFrcxMKIuFQs8xZ6BU05+5EmbSegeCWmlhZZAILxKqN0EEFA==",
      "requires": {
        "@firebase/messaging-types": "0.3.0",
        "@firebase/util": "0.2.18",
        "tslib": "1.9.3"
      }
    },
    "@firebase/messaging-types": {
      "version": "0.3.0",
      "resolved": "https://registry.npmjs.org/@firebase/messaging-types/-/messaging-types-0.3.0.tgz",
      "integrity": "sha512-xCFMPy4C+WXFcshTnQEyddmqM6ZkzpTeJq7RUhrAvUnjlfFzOB92HOfKtjT6IpNk5W+jNbTTrqgrgReuPXsM2A=="
    },
    "@firebase/performance": {
      "version": "0.2.6",
      "resolved": "https://registry.npmjs.org/@firebase/performance/-/performance-0.2.6.tgz",
      "integrity": "sha512-6yHIIMPs8knok1LnqsBscRUbq5LbHK703OJg9R68MqqXiablLwcGeG6l2AiIjDsDN7tP4wRr691HGWX6IkqKFg==",
      "requires": {
        "@firebase/installations": "0.1.5",
        "@firebase/logger": "0.1.15",
        "@firebase/performance-types": "0.0.2",
        "@firebase/util": "0.2.18",
        "tslib": "1.9.3"
      }
    },
    "@firebase/performance-types": {
      "version": "0.0.2",
      "resolved": "https://registry.npmjs.org/@firebase/performance-types/-/performance-types-0.0.2.tgz",
      "integrity": "sha512-nIZMVqc3tAGqRmNUU43yQ/WKY5Sypysa4Xg6J5F0q+QqxPpgwDh5xiPLEvD+/k6rswVTYQ9tsuIWqcJNpbA9zw=="
    },
    "@firebase/polyfill": {
      "version": "0.3.14",
      "resolved": "https://registry.npmjs.org/@firebase/polyfill/-/polyfill-0.3.14.tgz",
      "integrity": "sha512-MnJRIS2iqGfQ4SGFFZ441B1VBHgmHiGznpA3gN+FzSdqg9di4sIHw2gM0VOGS6e7jRJxYeyHL3rwzzU43kP+UQ==",
      "requires": {
        "core-js": "3.0.1",
        "promise-polyfill": "8.1.0",
        "whatwg-fetch": "2.0.4"
      },
      "dependencies": {
        "whatwg-fetch": {
          "version": "2.0.4",
          "resolved": "https://registry.npmjs.org/whatwg-fetch/-/whatwg-fetch-2.0.4.tgz",
          "integrity": "sha512-dcQ1GWpOD/eEQ97k66aiEVpNnapVj90/+R+SXTPYGHpYBBypfKJEQjLrvMZ7YXbKm21gXd4NcuxUTjiv1YtLng=="
        }
      }
    },
    "@firebase/storage": {
      "version": "0.3.1",
      "resolved": "https://registry.npmjs.org/@firebase/storage/-/storage-0.3.1.tgz",
      "integrity": "sha512-kcsDmDGJ9QAcVC/1M53+zH3YpYH+zoeD2gZvxcFi1tiZq1dOT1yrz92xz40WZkwqVKf4MyxNnneqoAZad/OeKA==",
      "requires": {
        "@firebase/storage-types": "0.3.0",
        "tslib": "1.9.3"
      }
    },
    "@firebase/storage-types": {
      "version": "0.3.0",
      "resolved": "https://registry.npmjs.org/@firebase/storage-types/-/storage-types-0.3.0.tgz",
      "integrity": "sha512-zy24QU3xPXIOIAussB51fLID9F7j5NttKbs+3SqhKexU8kmNdwi1Lg91acSBuR1Oa/T8RRk5El9Jtd4dlTXjyQ=="
    },
    "@firebase/util": {
      "version": "0.2.18",
      "resolved": "https://registry.npmjs.org/@firebase/util/-/util-0.2.18.tgz",
      "integrity": "sha512-I17vZZ/xRQu3hYvj/RikySSQFlfej+xXwh+yfdB6VhQavb4H5+NbX/5Tp3jSPp+7obFstVgqkM+yHjX/Z9+DXw==",
      "requires": {
        "tslib": "1.9.3"
      }
    },
    "@firebase/webchannel-wrapper": {
      "version": "0.2.20",
      "resolved": "https://registry.npmjs.org/@firebase/webchannel-wrapper/-/webchannel-wrapper-0.2.20.tgz",
      "integrity": "sha512-TpqR1qCn117fY4mrxSGqv/CT/iAM58sHdlS8ujj0Roa7DoleAHJzqOhNNoHCNncwvNDWcvygLsEiTBuDQZsv3A=="
    },
    "@fortawesome/fontawesome-common-types": {
      "version": "0.2.21",
      "resolved": "https://registry.npmjs.org/@fortawesome/fontawesome-common-types/-/fontawesome-common-types-0.2.21.tgz",
      "integrity": "sha512-iJtcrU2BtF9Wyr0zm3tHEJy3HqA6sADExhCqCv3SKaJJKKp4ORJ40t4nyHvcWXSVFtd7r1gcdqcRsAfoREGTFA=="
    },
    "@fortawesome/fontawesome-svg-core": {
      "version": "1.2.19",
      "resolved": "https://registry.npmjs.org/@fortawesome/fontawesome-svg-core/-/fontawesome-svg-core-1.2.19.tgz",
      "integrity": "sha512-D4ICXg9oU08eF9o7Or392gPpjmwwgJu8ecCFusthbID95CLVXOgIyd4mOKD9Nud5Ckz+Ty59pqkNtThDKR0erA==",
      "requires": {
        "@fortawesome/fontawesome-common-types": "^0.2.19"
      }
    },
    "@fortawesome/free-brands-svg-icons": {
      "version": "5.9.0",
      "resolved": "https://registry.npmjs.org/@fortawesome/free-brands-svg-icons/-/free-brands-svg-icons-5.9.0.tgz",
      "integrity": "sha512-sOz1wFyslaHUak8tY6IEhSAV1mAWbCLssBR8yFQV6f065k8nUCkjyrcxW4RVl9+wiLXmeG1CJUABUJV9DiW+7Q==",
      "requires": {
        "@fortawesome/fontawesome-common-types": "^0.2.19"
      }
    },
    "@fortawesome/free-solid-svg-icons": {
      "version": "5.9.0",
      "resolved": "https://registry.npmjs.org/@fortawesome/free-solid-svg-icons/-/free-solid-svg-icons-5.9.0.tgz",
      "integrity": "sha512-U8YXPfWcSozsCW0psCtlRGKjjRs5+Am5JJwLOUmVHFZbIEWzaz4YbP84EoPwUsVmSAKrisu3QeNcVOtmGml0Xw==",
      "requires": {
        "@fortawesome/fontawesome-common-types": "^0.2.19"
      }
    },
    "@fortawesome/react-fontawesome": {
      "version": "0.1.4",
      "resolved": "https://registry.npmjs.org/@fortawesome/react-fontawesome/-/react-fontawesome-0.1.4.tgz",
      "integrity": "sha512-GwmxQ+TK7PEdfSwvxtGnMCqrfEm0/HbRHArbUudsYiy9KzVCwndxa2KMcfyTQ8El0vROrq8gOOff09RF1oQe8g==",
      "requires": {
        "humps": "^2.0.1",
        "prop-types": "^15.5.10"
      }
    },
    "@grpc/proto-loader": {
      "version": "0.5.1",
      "resolved": "https://registry.npmjs.org/@grpc/proto-loader/-/proto-loader-0.5.1.tgz",
      "integrity": "sha512-3y0FhacYAwWvyXshH18eDkUI40wT/uGio7MAegzY8lO5+wVsc19+1A7T0pPptae4kl7bdITL+0cHpnAPmryBjQ==",
      "requires": {
        "lodash.camelcase": "^4.3.0",
        "protobufjs": "^6.8.6"
      }
    },
    "@hapi/address": {
      "version": "2.0.0",
      "resolved": "https://registry.npmjs.org/@hapi/address/-/address-2.0.0.tgz",
      "integrity": "sha512-mV6T0IYqb0xL1UALPFplXYQmR0twnXG0M6jUswpquqT2sD12BOiCiLy3EvMp/Fy7s3DZElC4/aPjEjo2jeZpvw=="
    },
    "@hapi/bourne": {
      "version": "1.3.2",
      "resolved": "https://registry.npmjs.org/@hapi/bourne/-/bourne-1.3.2.tgz",
      "integrity": "sha512-1dVNHT76Uu5N3eJNTYcvxee+jzX4Z9lfciqRRHCU27ihbUcYi+iSc2iml5Ke1LXe1SyJCLA0+14Jh4tXJgOppA=="
    },
    "@hapi/hoek": {
      "version": "8.2.1",
      "resolved": "https://registry.npmjs.org/@hapi/hoek/-/hoek-8.2.1.tgz",
      "integrity": "sha512-JPiBy+oSmsq3St7XlipfN5pNA6bDJ1kpa73PrK/zR29CVClDVqy04AanM/M/qx5bSF+I61DdCfAvRrujau+zRg=="
    },
    "@hapi/joi": {
      "version": "15.1.1",
      "resolved": "https://registry.npmjs.org/@hapi/joi/-/joi-15.1.1.tgz",
      "integrity": "sha512-entf8ZMOK8sc+8YfeOlM8pCfg3b5+WZIKBfUaaJT8UsjAAPjartzxIYm3TIbjvA4u+u++KbcXD38k682nVHDAQ==",
      "requires": {
        "@hapi/address": "2.x.x",
        "@hapi/bourne": "1.x.x",
        "@hapi/hoek": "8.x.x",
        "@hapi/topo": "3.x.x"
      }
    },
    "@hapi/topo": {
      "version": "3.1.3",
      "resolved": "https://registry.npmjs.org/@hapi/topo/-/topo-3.1.3.tgz",
      "integrity": "sha512-JmS9/vQK6dcUYn7wc2YZTqzIKubAQcJKu2KCKAru6es482U5RT5fP1EXCPtlXpiK7PR0On/kpQKI4fRKkzpZBQ==",
      "requires": {
        "@hapi/hoek": "8.x.x"
      }
    },
    "@jest/console": {
      "version": "24.9.0",
      "resolved": "https://registry.npmjs.org/@jest/console/-/console-24.9.0.tgz",
      "integrity": "sha512-Zuj6b8TnKXi3q4ymac8EQfc3ea/uhLeCGThFqXeC8H9/raaH8ARPUTdId+XyGd03Z4In0/VjD2OYFcBF09fNLQ==",
      "requires": {
        "@jest/source-map": "^24.9.0",
        "chalk": "^2.0.1",
        "slash": "^2.0.0"
      },
      "dependencies": {
        "ansi-styles": {
          "version": "3.2.1",
          "resolved": "https://registry.npmjs.org/ansi-styles/-/ansi-styles-3.2.1.tgz",
          "integrity": "sha512-VT0ZI6kZRdTh8YyJw3SMbYm/u+NqfsAxEpWO0Pf9sq8/e94WxxOpPKx9FR1FlyCtOVDNOQ+8ntlqFxiRc+r5qA==",
          "requires": {
            "color-convert": "^1.9.0"
          }
        },
        "chalk": {
          "version": "2.4.2",
          "resolved": "https://registry.npmjs.org/chalk/-/chalk-2.4.2.tgz",
          "integrity": "sha512-Mti+f9lpJNcwF4tWV8/OrTTtF1gZi+f8FqlyAdouralcFWFQWF2+NgCHShjkCb+IFBLq9buZwE1xckQU4peSuQ==",
          "requires": {
            "ansi-styles": "^3.2.1",
            "escape-string-regexp": "^1.0.5",
            "supports-color": "^5.3.0"
          }
        },
        "supports-color": {
          "version": "5.5.0",
          "resolved": "https://registry.npmjs.org/supports-color/-/supports-color-5.5.0.tgz",
          "integrity": "sha512-QjVjwdXIt408MIiAqCX4oUKsgU2EqAGzs2Ppkm4aQYbjm+ZEWEcW4SfFNTr4uMNZma0ey4f5lgLrkB0aX0QMow==",
          "requires": {
            "has-flag": "^3.0.0"
          }
        }
      }
    },
    "@jest/core": {
      "version": "24.9.0",
      "resolved": "https://registry.npmjs.org/@jest/core/-/core-24.9.0.tgz",
      "integrity": "sha512-Fogg3s4wlAr1VX7q+rhV9RVnUv5tD7VuWfYy1+whMiWUrvl7U3QJSJyWcDio9Lq2prqYsZaeTv2Rz24pWGkJ2A==",
      "requires": {
        "@jest/console": "^24.7.1",
        "@jest/reporters": "^24.9.0",
        "@jest/test-result": "^24.9.0",
        "@jest/transform": "^24.9.0",
        "@jest/types": "^24.9.0",
        "ansi-escapes": "^3.0.0",
        "chalk": "^2.0.1",
        "exit": "^0.1.2",
        "graceful-fs": "^4.1.15",
        "jest-changed-files": "^24.9.0",
        "jest-config": "^24.9.0",
        "jest-haste-map": "^24.9.0",
        "jest-message-util": "^24.9.0",
        "jest-regex-util": "^24.3.0",
        "jest-resolve": "^24.9.0",
        "jest-resolve-dependencies": "^24.9.0",
        "jest-runner": "^24.9.0",
        "jest-runtime": "^24.9.0",
        "jest-snapshot": "^24.9.0",
        "jest-util": "^24.9.0",
        "jest-validate": "^24.9.0",
        "jest-watcher": "^24.9.0",
        "micromatch": "^3.1.10",
        "p-each-series": "^1.0.0",
        "realpath-native": "^1.1.0",
        "rimraf": "^2.5.4",
        "slash": "^2.0.0",
        "strip-ansi": "^5.0.0"
      },
      "dependencies": {
        "ansi-regex": {
          "version": "4.1.0",
          "resolved": "https://registry.npmjs.org/ansi-regex/-/ansi-regex-4.1.0.tgz",
          "integrity": "sha512-1apePfXM1UOSqw0o9IiFAovVz9M5S1Dg+4TrDwfMewQ6p/rmMueb7tWZjQ1rx4Loy1ArBggoqGpfqqdI4rondg=="
        },
        "ansi-styles": {
          "version": "3.2.1",
          "resolved": "https://registry.npmjs.org/ansi-styles/-/ansi-styles-3.2.1.tgz",
          "integrity": "sha512-VT0ZI6kZRdTh8YyJw3SMbYm/u+NqfsAxEpWO0Pf9sq8/e94WxxOpPKx9FR1FlyCtOVDNOQ+8ntlqFxiRc+r5qA==",
          "requires": {
            "color-convert": "^1.9.0"
          }
        },
        "chalk": {
          "version": "2.4.2",
          "resolved": "https://registry.npmjs.org/chalk/-/chalk-2.4.2.tgz",
          "integrity": "sha512-Mti+f9lpJNcwF4tWV8/OrTTtF1gZi+f8FqlyAdouralcFWFQWF2+NgCHShjkCb+IFBLq9buZwE1xckQU4peSuQ==",
          "requires": {
            "ansi-styles": "^3.2.1",
            "escape-string-regexp": "^1.0.5",
            "supports-color": "^5.3.0"
          }
        },
        "jest-resolve": {
          "version": "24.9.0",
          "resolved": "https://registry.npmjs.org/jest-resolve/-/jest-resolve-24.9.0.tgz",
          "integrity": "sha512-TaLeLVL1l08YFZAt3zaPtjiVvyy4oSA6CRe+0AFPPVX3Q/VI0giIWWoAvoS5L96vj9Dqxj4fB5p2qrHCmTU/MQ==",
          "requires": {
            "@jest/types": "^24.9.0",
            "browser-resolve": "^1.11.3",
            "chalk": "^2.0.1",
            "jest-pnp-resolver": "^1.2.1",
            "realpath-native": "^1.1.0"
          }
        },
        "strip-ansi": {
          "version": "5.2.0",
          "resolved": "https://registry.npmjs.org/strip-ansi/-/strip-ansi-5.2.0.tgz",
          "integrity": "sha512-DuRs1gKbBqsMKIZlrffwlug8MHkcnpjs5VPmL1PAh+mA30U0DTotfDZ0d2UUsXpPmPmMMJ6W773MaA3J+lbiWA==",
          "requires": {
            "ansi-regex": "^4.1.0"
          }
        },
        "supports-color": {
          "version": "5.5.0",
          "resolved": "https://registry.npmjs.org/supports-color/-/supports-color-5.5.0.tgz",
          "integrity": "sha512-QjVjwdXIt408MIiAqCX4oUKsgU2EqAGzs2Ppkm4aQYbjm+ZEWEcW4SfFNTr4uMNZma0ey4f5lgLrkB0aX0QMow==",
          "requires": {
            "has-flag": "^3.0.0"
          }
        }
      }
    },
    "@jest/environment": {
      "version": "24.9.0",
      "resolved": "https://registry.npmjs.org/@jest/environment/-/environment-24.9.0.tgz",
      "integrity": "sha512-5A1QluTPhvdIPFYnO3sZC3smkNeXPVELz7ikPbhUj0bQjB07EoE9qtLrem14ZUYWdVayYbsjVwIiL4WBIMV4aQ==",
      "requires": {
        "@jest/fake-timers": "^24.9.0",
        "@jest/transform": "^24.9.0",
        "@jest/types": "^24.9.0",
        "jest-mock": "^24.9.0"
      }
    },
    "@jest/fake-timers": {
      "version": "24.9.0",
      "resolved": "https://registry.npmjs.org/@jest/fake-timers/-/fake-timers-24.9.0.tgz",
      "integrity": "sha512-eWQcNa2YSwzXWIMC5KufBh3oWRIijrQFROsIqt6v/NS9Io/gknw1jsAC9c+ih/RQX4A3O7SeWAhQeN0goKhT9A==",
      "requires": {
        "@jest/types": "^24.9.0",
        "jest-message-util": "^24.9.0",
        "jest-mock": "^24.9.0"
      }
    },
    "@jest/reporters": {
      "version": "24.9.0",
      "resolved": "https://registry.npmjs.org/@jest/reporters/-/reporters-24.9.0.tgz",
      "integrity": "sha512-mu4X0yjaHrffOsWmVLzitKmmmWSQ3GGuefgNscUSWNiUNcEOSEQk9k3pERKEQVBb0Cnn88+UESIsZEMH3o88Gw==",
      "requires": {
        "@jest/environment": "^24.9.0",
        "@jest/test-result": "^24.9.0",
        "@jest/transform": "^24.9.0",
        "@jest/types": "^24.9.0",
        "chalk": "^2.0.1",
        "exit": "^0.1.2",
        "glob": "^7.1.2",
        "istanbul-lib-coverage": "^2.0.2",
        "istanbul-lib-instrument": "^3.0.1",
        "istanbul-lib-report": "^2.0.4",
        "istanbul-lib-source-maps": "^3.0.1",
        "istanbul-reports": "^2.2.6",
        "jest-haste-map": "^24.9.0",
        "jest-resolve": "^24.9.0",
        "jest-runtime": "^24.9.0",
        "jest-util": "^24.9.0",
        "jest-worker": "^24.6.0",
        "node-notifier": "^5.4.2",
        "slash": "^2.0.0",
        "source-map": "^0.6.0",
        "string-length": "^2.0.0"
      },
      "dependencies": {
        "ansi-regex": {
          "version": "3.0.0",
          "resolved": "https://registry.npmjs.org/ansi-regex/-/ansi-regex-3.0.0.tgz",
          "integrity": "sha1-7QMXwyIGT3lGbAKWa922Bas32Zg="
        },
        "ansi-styles": {
          "version": "3.2.1",
          "resolved": "https://registry.npmjs.org/ansi-styles/-/ansi-styles-3.2.1.tgz",
          "integrity": "sha512-VT0ZI6kZRdTh8YyJw3SMbYm/u+NqfsAxEpWO0Pf9sq8/e94WxxOpPKx9FR1FlyCtOVDNOQ+8ntlqFxiRc+r5qA==",
          "requires": {
            "color-convert": "^1.9.0"
          }
        },
        "chalk": {
          "version": "2.4.2",
          "resolved": "https://registry.npmjs.org/chalk/-/chalk-2.4.2.tgz",
          "integrity": "sha512-Mti+f9lpJNcwF4tWV8/OrTTtF1gZi+f8FqlyAdouralcFWFQWF2+NgCHShjkCb+IFBLq9buZwE1xckQU4peSuQ==",
          "requires": {
            "ansi-styles": "^3.2.1",
            "escape-string-regexp": "^1.0.5",
            "supports-color": "^5.3.0"
          }
        },
        "jest-resolve": {
          "version": "24.9.0",
          "resolved": "https://registry.npmjs.org/jest-resolve/-/jest-resolve-24.9.0.tgz",
          "integrity": "sha512-TaLeLVL1l08YFZAt3zaPtjiVvyy4oSA6CRe+0AFPPVX3Q/VI0giIWWoAvoS5L96vj9Dqxj4fB5p2qrHCmTU/MQ==",
          "requires": {
            "@jest/types": "^24.9.0",
            "browser-resolve": "^1.11.3",
            "chalk": "^2.0.1",
            "jest-pnp-resolver": "^1.2.1",
            "realpath-native": "^1.1.0"
          }
        },
        "source-map": {
          "version": "0.6.1",
          "resolved": "https://registry.npmjs.org/source-map/-/source-map-0.6.1.tgz",
          "integrity": "sha512-UjgapumWlbMhkBgzT7Ykc5YXUT46F0iKu8SGXq0bcwP5dz/h0Plj6enJqjz1Zbq2l5WaqYnrVbwWOWMyF3F47g=="
        },
        "string-length": {
          "version": "2.0.0",
          "resolved": "https://registry.npmjs.org/string-length/-/string-length-2.0.0.tgz",
          "integrity": "sha1-1A27aGo6zpYMHP/KVivyxF+DY+0=",
          "requires": {
            "astral-regex": "^1.0.0",
            "strip-ansi": "^4.0.0"
          }
        },
        "strip-ansi": {
          "version": "4.0.0",
          "resolved": "https://registry.npmjs.org/strip-ansi/-/strip-ansi-4.0.0.tgz",
          "integrity": "sha1-qEeQIusaw2iocTibY1JixQXuNo8=",
          "requires": {
            "ansi-regex": "^3.0.0"
          }
        },
        "supports-color": {
          "version": "5.5.0",
          "resolved": "https://registry.npmjs.org/supports-color/-/supports-color-5.5.0.tgz",
          "integrity": "sha512-QjVjwdXIt408MIiAqCX4oUKsgU2EqAGzs2Ppkm4aQYbjm+ZEWEcW4SfFNTr4uMNZma0ey4f5lgLrkB0aX0QMow==",
          "requires": {
            "has-flag": "^3.0.0"
          }
        }
      }
    },
    "@jest/source-map": {
      "version": "24.9.0",
      "resolved": "https://registry.npmjs.org/@jest/source-map/-/source-map-24.9.0.tgz",
      "integrity": "sha512-/Xw7xGlsZb4MJzNDgB7PW5crou5JqWiBQaz6xyPd3ArOg2nfn/PunV8+olXbbEZzNl591o5rWKE9BRDaFAuIBg==",
      "requires": {
        "callsites": "^3.0.0",
        "graceful-fs": "^4.1.15",
        "source-map": "^0.6.0"
      },
      "dependencies": {
        "callsites": {
          "version": "3.1.0",
          "resolved": "https://registry.npmjs.org/callsites/-/callsites-3.1.0.tgz",
          "integrity": "sha512-P8BjAsXvZS+VIDUI11hHCQEv74YT67YUi5JJFNWIqL235sBmjX4+qx9Muvls5ivyNENctx46xQLQ3aTuE7ssaQ=="
        },
        "source-map": {
          "version": "0.6.1",
          "resolved": "https://registry.npmjs.org/source-map/-/source-map-0.6.1.tgz",
          "integrity": "sha512-UjgapumWlbMhkBgzT7Ykc5YXUT46F0iKu8SGXq0bcwP5dz/h0Plj6enJqjz1Zbq2l5WaqYnrVbwWOWMyF3F47g=="
        }
      }
    },
    "@jest/test-result": {
      "version": "24.9.0",
      "resolved": "https://registry.npmjs.org/@jest/test-result/-/test-result-24.9.0.tgz",
      "integrity": "sha512-XEFrHbBonBJ8dGp2JmF8kP/nQI/ImPpygKHwQ/SY+es59Z3L5PI4Qb9TQQMAEeYsThG1xF0k6tmG0tIKATNiiA==",
      "requires": {
        "@jest/console": "^24.9.0",
        "@jest/types": "^24.9.0",
        "@types/istanbul-lib-coverage": "^2.0.0"
      }
    },
    "@jest/test-sequencer": {
      "version": "24.9.0",
      "resolved": "https://registry.npmjs.org/@jest/test-sequencer/-/test-sequencer-24.9.0.tgz",
      "integrity": "sha512-6qqsU4o0kW1dvA95qfNog8v8gkRN9ph6Lz7r96IvZpHdNipP2cBcb07J1Z45mz/VIS01OHJ3pY8T5fUY38tg4A==",
      "requires": {
        "@jest/test-result": "^24.9.0",
        "jest-haste-map": "^24.9.0",
        "jest-runner": "^24.9.0",
        "jest-runtime": "^24.9.0"
      }
    },
    "@jest/transform": {
      "version": "24.9.0",
      "resolved": "https://registry.npmjs.org/@jest/transform/-/transform-24.9.0.tgz",
      "integrity": "sha512-TcQUmyNRxV94S0QpMOnZl0++6RMiqpbH/ZMccFB/amku6Uwvyb1cjYX7xkp5nGNkbX4QPH/FcB6q1HBTHynLmQ==",
      "requires": {
        "@babel/core": "^7.1.0",
        "@jest/types": "^24.9.0",
        "babel-plugin-istanbul": "^5.1.0",
        "chalk": "^2.0.1",
        "convert-source-map": "^1.4.0",
        "fast-json-stable-stringify": "^2.0.0",
        "graceful-fs": "^4.1.15",
        "jest-haste-map": "^24.9.0",
        "jest-regex-util": "^24.9.0",
        "jest-util": "^24.9.0",
        "micromatch": "^3.1.10",
        "pirates": "^4.0.1",
        "realpath-native": "^1.1.0",
        "slash": "^2.0.0",
        "source-map": "^0.6.1",
        "write-file-atomic": "2.4.1"
      },
      "dependencies": {
        "ansi-styles": {
          "version": "3.2.1",
          "resolved": "https://registry.npmjs.org/ansi-styles/-/ansi-styles-3.2.1.tgz",
          "integrity": "sha512-VT0ZI6kZRdTh8YyJw3SMbYm/u+NqfsAxEpWO0Pf9sq8/e94WxxOpPKx9FR1FlyCtOVDNOQ+8ntlqFxiRc+r5qA==",
          "requires": {
            "color-convert": "^1.9.0"
          }
        },
        "chalk": {
          "version": "2.4.2",
          "resolved": "https://registry.npmjs.org/chalk/-/chalk-2.4.2.tgz",
          "integrity": "sha512-Mti+f9lpJNcwF4tWV8/OrTTtF1gZi+f8FqlyAdouralcFWFQWF2+NgCHShjkCb+IFBLq9buZwE1xckQU4peSuQ==",
          "requires": {
            "ansi-styles": "^3.2.1",
            "escape-string-regexp": "^1.0.5",
            "supports-color": "^5.3.0"
          }
        },
        "source-map": {
          "version": "0.6.1",
          "resolved": "https://registry.npmjs.org/source-map/-/source-map-0.6.1.tgz",
          "integrity": "sha512-UjgapumWlbMhkBgzT7Ykc5YXUT46F0iKu8SGXq0bcwP5dz/h0Plj6enJqjz1Zbq2l5WaqYnrVbwWOWMyF3F47g=="
        },
        "supports-color": {
          "version": "5.5.0",
          "resolved": "https://registry.npmjs.org/supports-color/-/supports-color-5.5.0.tgz",
          "integrity": "sha512-QjVjwdXIt408MIiAqCX4oUKsgU2EqAGzs2Ppkm4aQYbjm+ZEWEcW4SfFNTr4uMNZma0ey4f5lgLrkB0aX0QMow==",
          "requires": {
            "has-flag": "^3.0.0"
          }
        },
        "write-file-atomic": {
          "version": "2.4.1",
          "resolved": "https://registry.npmjs.org/write-file-atomic/-/write-file-atomic-2.4.1.tgz",
          "integrity": "sha512-TGHFeZEZMnv+gBFRfjAcxL5bPHrsGKtnb4qsFAws7/vlh+QfwAaySIw4AXP9ZskTTh5GWu3FLuJhsWVdiJPGvg==",
          "requires": {
            "graceful-fs": "^4.1.11",
            "imurmurhash": "^0.1.4",
            "signal-exit": "^3.0.2"
          }
        }
      }
    },
    "@jest/types": {
      "version": "24.9.0",
      "resolved": "https://registry.npmjs.org/@jest/types/-/types-24.9.0.tgz",
      "integrity": "sha512-XKK7ze1apu5JWQ5eZjHITP66AX+QsLlbaJRBGYr8pNzwcAE2JVkwnf0yqjHTsDRcjR0mujy/NmZMXw5kl+kGBw==",
      "requires": {
        "@types/istanbul-lib-coverage": "^2.0.0",
        "@types/istanbul-reports": "^1.1.1",
        "@types/yargs": "^13.0.0"
      }
    },
    "@mrmlnc/readdir-enhanced": {
      "version": "2.2.1",
      "resolved": "https://registry.npmjs.org/@mrmlnc/readdir-enhanced/-/readdir-enhanced-2.2.1.tgz",
      "integrity": "sha512-bPHp6Ji8b41szTOcaP63VlnbbO5Ny6dwAATtY6JTjh5N2OLrb5Qk/Th5cRkRQhkWCt+EJsYrNB0MiL+Gpn6e3g==",
      "requires": {
        "call-me-maybe": "^1.0.1",
        "glob-to-regexp": "^0.3.0"
      }
    },
    "@nodelib/fs.stat": {
      "version": "1.1.3",
      "resolved": "https://registry.npmjs.org/@nodelib/fs.stat/-/fs.stat-1.1.3.tgz",
      "integrity": "sha512-shAmDyaQC4H92APFoIaVDHCx5bStIocgvbwQyxPRrbUY20V1EYTbSDchWbuwlMG3V17cprZhA6+78JfB+3DTPw=="
    },
    "@protobufjs/aspromise": {
      "version": "1.1.2",
      "resolved": "https://registry.npmjs.org/@protobufjs/aspromise/-/aspromise-1.1.2.tgz",
      "integrity": "sha1-m4sMxmPWaafY9vXQiToU00jzD78="
    },
    "@protobufjs/base64": {
      "version": "1.1.2",
      "resolved": "https://registry.npmjs.org/@protobufjs/base64/-/base64-1.1.2.tgz",
      "integrity": "sha512-AZkcAA5vnN/v4PDqKyMR5lx7hZttPDgClv83E//FMNhR2TMcLUhfRUBHCmSl0oi9zMgDDqRUJkSxO3wm85+XLg=="
    },
    "@protobufjs/codegen": {
      "version": "2.0.4",
      "resolved": "https://registry.npmjs.org/@protobufjs/codegen/-/codegen-2.0.4.tgz",
      "integrity": "sha512-YyFaikqM5sH0ziFZCN3xDC7zeGaB/d0IUb9CATugHWbd1FRFwWwt4ld4OYMPWu5a3Xe01mGAULCdqhMlPl29Jg=="
    },
    "@protobufjs/eventemitter": {
      "version": "1.1.0",
      "resolved": "https://registry.npmjs.org/@protobufjs/eventemitter/-/eventemitter-1.1.0.tgz",
      "integrity": "sha1-NVy8mLr61ZePntCV85diHx0Ga3A="
    },
    "@protobufjs/fetch": {
      "version": "1.1.0",
      "resolved": "https://registry.npmjs.org/@protobufjs/fetch/-/fetch-1.1.0.tgz",
      "integrity": "sha1-upn7WYYUr2VwDBYZ/wbUVLDYTEU=",
      "requires": {
        "@protobufjs/aspromise": "^1.1.1",
        "@protobufjs/inquire": "^1.1.0"
      }
    },
    "@protobufjs/float": {
      "version": "1.0.2",
      "resolved": "https://registry.npmjs.org/@protobufjs/float/-/float-1.0.2.tgz",
      "integrity": "sha1-Xp4avctz/Ap8uLKR33jIy9l7h9E="
    },
    "@protobufjs/inquire": {
      "version": "1.1.0",
      "resolved": "https://registry.npmjs.org/@protobufjs/inquire/-/inquire-1.1.0.tgz",
      "integrity": "sha1-/yAOPnzyQp4tyvwRQIKOjMY48Ik="
    },
    "@protobufjs/path": {
      "version": "1.1.2",
      "resolved": "https://registry.npmjs.org/@protobufjs/path/-/path-1.1.2.tgz",
      "integrity": "sha1-bMKyDFya1q0NzP0hynZz2Nf79o0="
    },
    "@protobufjs/pool": {
      "version": "1.1.0",
      "resolved": "https://registry.npmjs.org/@protobufjs/pool/-/pool-1.1.0.tgz",
      "integrity": "sha1-Cf0V8tbTq/qbZbw2ZQbWrXhG/1Q="
    },
    "@protobufjs/utf8": {
      "version": "1.1.0",
      "resolved": "https://registry.npmjs.org/@protobufjs/utf8/-/utf8-1.1.0.tgz",
      "integrity": "sha1-p3c2C1s5oaLlEG+OhY8v0tBgxXA="
    },
    "@svgr/babel-plugin-add-jsx-attribute": {
      "version": "4.2.0",
      "resolved": "https://registry.npmjs.org/@svgr/babel-plugin-add-jsx-attribute/-/babel-plugin-add-jsx-attribute-4.2.0.tgz",
      "integrity": "sha512-j7KnilGyZzYr/jhcrSYS3FGWMZVaqyCG0vzMCwzvei0coIkczuYMcniK07nI0aHJINciujjH11T72ICW5eL5Ig=="
    },
    "@svgr/babel-plugin-remove-jsx-attribute": {
      "version": "4.2.0",
      "resolved": "https://registry.npmjs.org/@svgr/babel-plugin-remove-jsx-attribute/-/babel-plugin-remove-jsx-attribute-4.2.0.tgz",
      "integrity": "sha512-3XHLtJ+HbRCH4n28S7y/yZoEQnRpl0tvTZQsHqvaeNXPra+6vE5tbRliH3ox1yZYPCxrlqaJT/Mg+75GpDKlvQ=="
    },
    "@svgr/babel-plugin-remove-jsx-empty-expression": {
      "version": "4.2.0",
      "resolved": "https://registry.npmjs.org/@svgr/babel-plugin-remove-jsx-empty-expression/-/babel-plugin-remove-jsx-empty-expression-4.2.0.tgz",
      "integrity": "sha512-yTr2iLdf6oEuUE9MsRdvt0NmdpMBAkgK8Bjhl6epb+eQWk6abBaX3d65UZ3E3FWaOwePyUgNyNCMVG61gGCQ7w=="
    },
    "@svgr/babel-plugin-replace-jsx-attribute-value": {
      "version": "4.2.0",
      "resolved": "https://registry.npmjs.org/@svgr/babel-plugin-replace-jsx-attribute-value/-/babel-plugin-replace-jsx-attribute-value-4.2.0.tgz",
      "integrity": "sha512-U9m870Kqm0ko8beHawRXLGLvSi/ZMrl89gJ5BNcT452fAjtF2p4uRzXkdzvGJJJYBgx7BmqlDjBN/eCp5AAX2w=="
    },
    "@svgr/babel-plugin-svg-dynamic-title": {
      "version": "4.3.1",
      "resolved": "https://registry.npmjs.org/@svgr/babel-plugin-svg-dynamic-title/-/babel-plugin-svg-dynamic-title-4.3.1.tgz",
      "integrity": "sha512-p6z6JJroP989jHWcuraeWpzdejehTmLUpyC9smhTBWyPN0VVGe2phbYxpPTV7Vh8XzmFrcG55idrnfWn/2oQEw=="
    },
    "@svgr/babel-plugin-svg-em-dimensions": {
      "version": "4.2.0",
      "resolved": "https://registry.npmjs.org/@svgr/babel-plugin-svg-em-dimensions/-/babel-plugin-svg-em-dimensions-4.2.0.tgz",
      "integrity": "sha512-C0Uy+BHolCHGOZ8Dnr1zXy/KgpBOkEUYY9kI/HseHVPeMbluaX3CijJr7D4C5uR8zrc1T64nnq/k63ydQuGt4w=="
    },
    "@svgr/babel-plugin-transform-react-native-svg": {
      "version": "4.2.0",
      "resolved": "https://registry.npmjs.org/@svgr/babel-plugin-transform-react-native-svg/-/babel-plugin-transform-react-native-svg-4.2.0.tgz",
      "integrity": "sha512-7YvynOpZDpCOUoIVlaaOUU87J4Z6RdD6spYN4eUb5tfPoKGSF9OG2NuhgYnq4jSkAxcpMaXWPf1cePkzmqTPNw=="
    },
    "@svgr/babel-plugin-transform-svg-component": {
      "version": "4.2.0",
      "resolved": "https://registry.npmjs.org/@svgr/babel-plugin-transform-svg-component/-/babel-plugin-transform-svg-component-4.2.0.tgz",
      "integrity": "sha512-hYfYuZhQPCBVotABsXKSCfel2slf/yvJY8heTVX1PCTaq/IgASq1IyxPPKJ0chWREEKewIU/JMSsIGBtK1KKxw=="
    },
    "@svgr/babel-preset": {
      "version": "4.3.1",
      "resolved": "https://registry.npmjs.org/@svgr/babel-preset/-/babel-preset-4.3.1.tgz",
      "integrity": "sha512-rPFKLmyhlh6oeBv3j2vEAj2nd2QbWqpoJLKzBLjwQVt+d9aeXajVaPNEqrES2spjXKR4OxfgSs7U0NtmAEkr0Q==",
      "requires": {
        "@svgr/babel-plugin-add-jsx-attribute": "^4.2.0",
        "@svgr/babel-plugin-remove-jsx-attribute": "^4.2.0",
        "@svgr/babel-plugin-remove-jsx-empty-expression": "^4.2.0",
        "@svgr/babel-plugin-replace-jsx-attribute-value": "^4.2.0",
        "@svgr/babel-plugin-svg-dynamic-title": "^4.3.1",
        "@svgr/babel-plugin-svg-em-dimensions": "^4.2.0",
        "@svgr/babel-plugin-transform-react-native-svg": "^4.2.0",
        "@svgr/babel-plugin-transform-svg-component": "^4.2.0"
      }
    },
    "@svgr/core": {
      "version": "4.3.2",
      "resolved": "https://registry.npmjs.org/@svgr/core/-/core-4.3.2.tgz",
      "integrity": "sha512-N+tP5CLFd1hP9RpO83QJPZY3NL8AtrdqNbuhRgBkjE/49RnMrrRsFm1wY8pueUfAGvzn6tSXUq29o6ah8RuR5w==",
      "requires": {
        "@svgr/plugin-jsx": "^4.3.2",
        "camelcase": "^5.3.1",
        "cosmiconfig": "^5.2.1"
      },
      "dependencies": {
        "camelcase": {
          "version": "5.3.1",
          "resolved": "https://registry.npmjs.org/camelcase/-/camelcase-5.3.1.tgz",
          "integrity": "sha512-L28STB170nwWS63UjtlEOE3dldQApaJXZkOI1uMFfzf3rRuPegHaHesyee+YxQ+W6SvRDQV6UrdOdRiR153wJg=="
        }
      }
    },
    "@svgr/hast-util-to-babel-ast": {
      "version": "4.3.2",
      "resolved": "https://registry.npmjs.org/@svgr/hast-util-to-babel-ast/-/hast-util-to-babel-ast-4.3.2.tgz",
      "integrity": "sha512-JioXclZGhFIDL3ddn4Kiq8qEqYM2PyDKV0aYno8+IXTLuYt6TOgHUbUAAFvqtb0Xn37NwP0BTHglejFoYr8RZg==",
      "requires": {
        "@babel/types": "^7.4.4"
      }
    },
    "@svgr/plugin-jsx": {
      "version": "4.3.2",
      "resolved": "https://registry.npmjs.org/@svgr/plugin-jsx/-/plugin-jsx-4.3.2.tgz",
      "integrity": "sha512-+1GW32RvmNmCsOkMoclA/TppNjHPLMnNZG3/Ecscxawp051XJ2MkO09Hn11VcotdC2EPrDfT8pELGRo+kbZ1Eg==",
      "requires": {
        "@babel/core": "^7.4.5",
        "@svgr/babel-preset": "^4.3.1",
        "@svgr/hast-util-to-babel-ast": "^4.3.2",
        "svg-parser": "^2.0.0"
      },
      "dependencies": {
        "@babel/core": {
          "version": "7.5.5",
          "resolved": "https://registry.npmjs.org/@babel/core/-/core-7.5.5.tgz",
          "integrity": "sha512-i4qoSr2KTtce0DmkuuQBV4AuQgGPUcPXMr9L5MyYAtk06z068lQ10a4O009fe5OB/DfNV+h+qqT7ddNV8UnRjg==",
          "requires": {
            "@babel/code-frame": "^7.5.5",
            "@babel/generator": "^7.5.5",
            "@babel/helpers": "^7.5.5",
            "@babel/parser": "^7.5.5",
            "@babel/template": "^7.4.4",
            "@babel/traverse": "^7.5.5",
            "@babel/types": "^7.5.5",
            "convert-source-map": "^1.1.0",
            "debug": "^4.1.0",
            "json5": "^2.1.0",
            "lodash": "^4.17.13",
            "resolve": "^1.3.2",
            "semver": "^5.4.1",
            "source-map": "^0.5.0"
          }
        },
        "debug": {
          "version": "4.1.1",
          "resolved": "https://registry.npmjs.org/debug/-/debug-4.1.1.tgz",
          "integrity": "sha512-pYAIzeRo8J6KPEaJ0VWOh5Pzkbw/RetuzehGM7QRRX5he4fPHx2rdKMB256ehJCkX+XRQm16eZLqLNS8RSZXZw==",
          "requires": {
            "ms": "^2.1.1"
          }
        },
        "ms": {
          "version": "2.1.2",
          "resolved": "https://registry.npmjs.org/ms/-/ms-2.1.2.tgz",
          "integrity": "sha512-sGkPx+VjMtmA6MX27oA4FBFELFCZZ4S4XqeGOXCv68tT+jb3vk/RyaKWP0PTKyWtmLSM0b+adUTEvbs1PEaH2w=="
        }
      }
    },
    "@svgr/plugin-svgo": {
      "version": "4.3.1",
      "resolved": "https://registry.npmjs.org/@svgr/plugin-svgo/-/plugin-svgo-4.3.1.tgz",
      "integrity": "sha512-PrMtEDUWjX3Ea65JsVCwTIXuSqa3CG9px+DluF1/eo9mlDrgrtFE7NE/DjdhjJgSM9wenlVBzkzneSIUgfUI/w==",
      "requires": {
        "cosmiconfig": "^5.2.1",
        "merge-deep": "^3.0.2",
        "svgo": "^1.2.2"
      }
    },
    "@svgr/webpack": {
      "version": "4.1.0",
      "resolved": "https://registry.npmjs.org/@svgr/webpack/-/webpack-4.1.0.tgz",
      "integrity": "sha512-d09ehQWqLMywP/PT/5JvXwPskPK9QCXUjiSkAHehreB381qExXf5JFCBWhfEyNonRbkIneCeYM99w+Ud48YIQQ==",
      "requires": {
        "@babel/core": "^7.1.6",
        "@babel/plugin-transform-react-constant-elements": "^7.0.0",
        "@babel/preset-env": "^7.1.6",
        "@babel/preset-react": "^7.0.0",
        "@svgr/core": "^4.1.0",
        "@svgr/plugin-jsx": "^4.1.0",
        "@svgr/plugin-svgo": "^4.0.3",
        "loader-utils": "^1.1.0"
      }
    },
    "@types/babel__core": {
      "version": "7.1.2",
      "resolved": "https://registry.npmjs.org/@types/babel__core/-/babel__core-7.1.2.tgz",
      "integrity": "sha512-cfCCrFmiGY/yq0NuKNxIQvZFy9kY/1immpSpTngOnyIbD4+eJOG5mxphhHDv3CHL9GltO4GcKr54kGBg3RNdbg==",
      "requires": {
        "@babel/parser": "^7.1.0",
        "@babel/types": "^7.0.0",
        "@types/babel__generator": "*",
        "@types/babel__template": "*",
        "@types/babel__traverse": "*"
      }
    },
    "@types/babel__generator": {
      "version": "7.0.2",
      "resolved": "https://registry.npmjs.org/@types/babel__generator/-/babel__generator-7.0.2.tgz",
      "integrity": "sha512-NHcOfab3Zw4q5sEE2COkpfXjoE7o+PmqD9DQW4koUT3roNxwziUdXGnRndMat/LJNUtePwn1TlP4do3uoe3KZQ==",
      "requires": {
        "@babel/types": "^7.0.0"
      }
    },
    "@types/babel__template": {
      "version": "7.0.2",
      "resolved": "https://registry.npmjs.org/@types/babel__template/-/babel__template-7.0.2.tgz",
      "integrity": "sha512-/K6zCpeW7Imzgab2bLkLEbz0+1JlFSrUMdw7KoIIu+IUdu51GWaBZpd3y1VXGVXzynvGa4DaIaxNZHiON3GXUg==",
      "requires": {
        "@babel/parser": "^7.1.0",
        "@babel/types": "^7.0.0"
      }
    },
    "@types/babel__traverse": {
      "version": "7.0.7",
      "resolved": "https://registry.npmjs.org/@types/babel__traverse/-/babel__traverse-7.0.7.tgz",
      "integrity": "sha512-CeBpmX1J8kWLcDEnI3Cl2Eo6RfbGvzUctA+CjZUhOKDFbLfcr7fc4usEqLNWetrlJd7RhAkyYe2czXop4fICpw==",
      "requires": {
        "@babel/types": "^7.3.0"
      }
    },
    "@types/istanbul-lib-coverage": {
      "version": "2.0.1",
      "resolved": "https://registry.npmjs.org/@types/istanbul-lib-coverage/-/istanbul-lib-coverage-2.0.1.tgz",
      "integrity": "sha512-hRJD2ahnnpLgsj6KWMYSrmXkM3rm2Dl1qkx6IOFD5FnuNPXJIG5L0dhgKXCYTRMGzU4n0wImQ/xfmRc4POUFlg=="
    },
    "@types/istanbul-lib-report": {
      "version": "1.1.1",
      "resolved": "https://registry.npmjs.org/@types/istanbul-lib-report/-/istanbul-lib-report-1.1.1.tgz",
      "integrity": "sha512-3BUTyMzbZa2DtDI2BkERNC6jJw2Mr2Y0oGI7mRxYNBPxppbtEK1F66u3bKwU2g+wxwWI7PAoRpJnOY1grJqzHg==",
      "requires": {
        "@types/istanbul-lib-coverage": "*"
      }
    },
    "@types/istanbul-reports": {
      "version": "1.1.1",
      "resolved": "https://registry.npmjs.org/@types/istanbul-reports/-/istanbul-reports-1.1.1.tgz",
      "integrity": "sha512-UpYjBi8xefVChsCoBpKShdxTllC9pwISirfoZsUa2AAdQg/Jd2KQGtSbw+ya7GPo7x/wAPlH6JBhKhAsXUEZNA==",
      "requires": {
        "@types/istanbul-lib-coverage": "*",
        "@types/istanbul-lib-report": "*"
      }
    },
    "@types/long": {
      "version": "4.0.0",
      "resolved": "https://registry.npmjs.org/@types/long/-/long-4.0.0.tgz",
      "integrity": "sha512-1w52Nyx4Gq47uuu0EVcsHBxZFJgurQ+rTKS3qMHxR1GY2T8c2AJYd6vZoZ9q1rupaDjU0yT+Jc2XTyXkjeMA+Q=="
    },
    "@types/node": {
      "version": "10.14.15",
      "resolved": "https://registry.npmjs.org/@types/node/-/node-10.14.15.tgz",
      "integrity": "sha512-CBR5avlLcu0YCILJiDIXeU2pTw7UK/NIxfC63m7d7CVamho1qDEzXKkOtEauQRPMy6MI8mLozth+JJkas7HY6g=="
    },
    "@types/q": {
      "version": "1.5.2",
      "resolved": "https://registry.npmjs.org/@types/q/-/q-1.5.2.tgz",
      "integrity": "sha512-ce5d3q03Ex0sy4R14722Rmt6MT07Ua+k4FwDfdcToYJcMKNtRVQvJ6JCAPdAmAnbRb6CsX6aYb9m96NGod9uTw=="
    },
    "@types/stack-utils": {
      "version": "1.0.1",
      "resolved": "https://registry.npmjs.org/@types/stack-utils/-/stack-utils-1.0.1.tgz",
      "integrity": "sha512-l42BggppR6zLmpfU6fq9HEa2oGPEI8yrSPL3GITjfRInppYFahObbIQOQK3UGxEnyQpltZLaPe75046NOZQikw=="
    },
    "@types/yargs": {
      "version": "13.0.2",
      "resolved": "https://registry.npmjs.org/@types/yargs/-/yargs-13.0.2.tgz",
      "integrity": "sha512-lwwgizwk/bIIU+3ELORkyuOgDjCh7zuWDFqRtPPhhVgq9N1F7CvLNKg1TX4f2duwtKQ0p044Au9r1PLIXHrIzQ==",
      "requires": {
        "@types/yargs-parser": "*"
      }
    },
    "@types/yargs-parser": {
      "version": "13.0.0",
      "resolved": "https://registry.npmjs.org/@types/yargs-parser/-/yargs-parser-13.0.0.tgz",
      "integrity": "sha512-wBlsw+8n21e6eTd4yVv8YD/E3xq0O6nNnJIquutAsFGE7EyMKz7W6RNT6BRu1SmdgmlCZ9tb0X+j+D6HGr8pZw=="
    },
    "@typescript-eslint/eslint-plugin": {
      "version": "1.6.0",
      "resolved": "https://registry.npmjs.org/@typescript-eslint/eslint-plugin/-/eslint-plugin-1.6.0.tgz",
      "integrity": "sha512-U224c29E2lo861TQZs6GSmyC0OYeRNg6bE9UVIiFBxN2MlA0nq2dCrgIVyyRbC05UOcrgf2Wk/CF2gGOPQKUSQ==",
      "requires": {
        "@typescript-eslint/parser": "1.6.0",
        "@typescript-eslint/typescript-estree": "1.6.0",
        "requireindex": "^1.2.0",
        "tsutils": "^3.7.0"
      }
    },
    "@typescript-eslint/parser": {
      "version": "1.6.0",
      "resolved": "https://registry.npmjs.org/@typescript-eslint/parser/-/parser-1.6.0.tgz",
      "integrity": "sha512-VB9xmSbfafI+/kI4gUK3PfrkGmrJQfh0N4EScT1gZXSZyUxpsBirPL99EWZg9MmPG0pzq/gMtgkk7/rAHj4aQw==",
      "requires": {
        "@typescript-eslint/typescript-estree": "1.6.0",
        "eslint-scope": "^4.0.0",
        "eslint-visitor-keys": "^1.0.0"
      },
      "dependencies": {
        "eslint-scope": {
          "version": "4.0.3",
          "resolved": "https://registry.npmjs.org/eslint-scope/-/eslint-scope-4.0.3.tgz",
          "integrity": "sha512-p7VutNr1O/QrxysMo3E45FjYDTeXBy0iTltPFNSqKAIfjDSXC+4dj+qfyuD8bfAXrW/y6lW3O76VaYNPKfpKrg==",
          "requires": {
            "esrecurse": "^4.1.0",
            "estraverse": "^4.1.1"
          }
        }
      }
    },
    "@typescript-eslint/typescript-estree": {
      "version": "1.6.0",
      "resolved": "https://registry.npmjs.org/@typescript-eslint/typescript-estree/-/typescript-estree-1.6.0.tgz",
      "integrity": "sha512-A4CanUwfaG4oXobD5y7EXbsOHjCwn8tj1RDd820etpPAjH+Icjc2K9e/DQM1Hac5zH2BSy+u6bjvvF2wwREvYA==",
      "requires": {
        "lodash.unescape": "4.0.1",
        "semver": "5.5.0"
      },
      "dependencies": {
        "semver": {
          "version": "5.5.0",
          "resolved": "https://registry.npmjs.org/semver/-/semver-5.5.0.tgz",
          "integrity": "sha512-4SJ3dm0WAwWy/NVeioZh5AntkdJoWKxHxcmyP622fOkgHa4z3R0TdBJICINyaSDE6uNwVc8gZr+ZinwZAH4xIA=="
        }
      }
    },
    "@webassemblyjs/ast": {
      "version": "1.8.5",
      "resolved": "https://registry.npmjs.org/@webassemblyjs/ast/-/ast-1.8.5.tgz",
      "integrity": "sha512-aJMfngIZ65+t71C3y2nBBg5FFG0Okt9m0XEgWZ7Ywgn1oMAT8cNwx00Uv1cQyHtidq0Xn94R4TAywO+LCQ+ZAQ==",
      "requires": {
        "@webassemblyjs/helper-module-context": "1.8.5",
        "@webassemblyjs/helper-wasm-bytecode": "1.8.5",
        "@webassemblyjs/wast-parser": "1.8.5"
      }
    },
    "@webassemblyjs/floating-point-hex-parser": {
      "version": "1.8.5",
      "resolved": "https://registry.npmjs.org/@webassemblyjs/floating-point-hex-parser/-/floating-point-hex-parser-1.8.5.tgz",
      "integrity": "sha512-9p+79WHru1oqBh9ewP9zW95E3XAo+90oth7S5Re3eQnECGq59ly1Ri5tsIipKGpiStHsUYmY3zMLqtk3gTcOtQ=="
    },
    "@webassemblyjs/helper-api-error": {
      "version": "1.8.5",
      "resolved": "https://registry.npmjs.org/@webassemblyjs/helper-api-error/-/helper-api-error-1.8.5.tgz",
      "integrity": "sha512-Za/tnzsvnqdaSPOUXHyKJ2XI7PDX64kWtURyGiJJZKVEdFOsdKUCPTNEVFZq3zJ2R0G5wc2PZ5gvdTRFgm81zA=="
    },
    "@webassemblyjs/helper-buffer": {
      "version": "1.8.5",
      "resolved": "https://registry.npmjs.org/@webassemblyjs/helper-buffer/-/helper-buffer-1.8.5.tgz",
      "integrity": "sha512-Ri2R8nOS0U6G49Q86goFIPNgjyl6+oE1abW1pS84BuhP1Qcr5JqMwRFT3Ah3ADDDYGEgGs1iyb1DGX+kAi/c/Q=="
    },
    "@webassemblyjs/helper-code-frame": {
      "version": "1.8.5",
      "resolved": "https://registry.npmjs.org/@webassemblyjs/helper-code-frame/-/helper-code-frame-1.8.5.tgz",
      "integrity": "sha512-VQAadSubZIhNpH46IR3yWO4kZZjMxN1opDrzePLdVKAZ+DFjkGD/rf4v1jap744uPVU6yjL/smZbRIIJTOUnKQ==",
      "requires": {
        "@webassemblyjs/wast-printer": "1.8.5"
      }
    },
    "@webassemblyjs/helper-fsm": {
      "version": "1.8.5",
      "resolved": "https://registry.npmjs.org/@webassemblyjs/helper-fsm/-/helper-fsm-1.8.5.tgz",
      "integrity": "sha512-kRuX/saORcg8se/ft6Q2UbRpZwP4y7YrWsLXPbbmtepKr22i8Z4O3V5QE9DbZK908dh5Xya4Un57SDIKwB9eow=="
    },
    "@webassemblyjs/helper-module-context": {
      "version": "1.8.5",
      "resolved": "https://registry.npmjs.org/@webassemblyjs/helper-module-context/-/helper-module-context-1.8.5.tgz",
      "integrity": "sha512-/O1B236mN7UNEU4t9X7Pj38i4VoU8CcMHyy3l2cV/kIF4U5KoHXDVqcDuOs1ltkac90IM4vZdHc52t1x8Yfs3g==",
      "requires": {
        "@webassemblyjs/ast": "1.8.5",
        "mamacro": "^0.0.3"
      }
    },
    "@webassemblyjs/helper-wasm-bytecode": {
      "version": "1.8.5",
      "resolved": "https://registry.npmjs.org/@webassemblyjs/helper-wasm-bytecode/-/helper-wasm-bytecode-1.8.5.tgz",
      "integrity": "sha512-Cu4YMYG3Ddl72CbmpjU/wbP6SACcOPVbHN1dI4VJNJVgFwaKf1ppeFJrwydOG3NDHxVGuCfPlLZNyEdIYlQ6QQ=="
    },
    "@webassemblyjs/helper-wasm-section": {
      "version": "1.8.5",
      "resolved": "https://registry.npmjs.org/@webassemblyjs/helper-wasm-section/-/helper-wasm-section-1.8.5.tgz",
      "integrity": "sha512-VV083zwR+VTrIWWtgIUpqfvVdK4ff38loRmrdDBgBT8ADXYsEZ5mPQ4Nde90N3UYatHdYoDIFb7oHzMncI02tA==",
      "requires": {
        "@webassemblyjs/ast": "1.8.5",
        "@webassemblyjs/helper-buffer": "1.8.5",
        "@webassemblyjs/helper-wasm-bytecode": "1.8.5",
        "@webassemblyjs/wasm-gen": "1.8.5"
      }
    },
    "@webassemblyjs/ieee754": {
      "version": "1.8.5",
      "resolved": "https://registry.npmjs.org/@webassemblyjs/ieee754/-/ieee754-1.8.5.tgz",
      "integrity": "sha512-aaCvQYrvKbY/n6wKHb/ylAJr27GglahUO89CcGXMItrOBqRarUMxWLJgxm9PJNuKULwN5n1csT9bYoMeZOGF3g==",
      "requires": {
        "@xtuc/ieee754": "^1.2.0"
      }
    },
    "@webassemblyjs/leb128": {
      "version": "1.8.5",
      "resolved": "https://registry.npmjs.org/@webassemblyjs/leb128/-/leb128-1.8.5.tgz",
      "integrity": "sha512-plYUuUwleLIziknvlP8VpTgO4kqNaH57Y3JnNa6DLpu/sGcP6hbVdfdX5aHAV716pQBKrfuU26BJK29qY37J7A==",
      "requires": {
        "@xtuc/long": "4.2.2"
      }
    },
    "@webassemblyjs/utf8": {
      "version": "1.8.5",
      "resolved": "https://registry.npmjs.org/@webassemblyjs/utf8/-/utf8-1.8.5.tgz",
      "integrity": "sha512-U7zgftmQriw37tfD934UNInokz6yTmn29inT2cAetAsaU9YeVCveWEwhKL1Mg4yS7q//NGdzy79nlXh3bT8Kjw=="
    },
    "@webassemblyjs/wasm-edit": {
      "version": "1.8.5",
      "resolved": "https://registry.npmjs.org/@webassemblyjs/wasm-edit/-/wasm-edit-1.8.5.tgz",
      "integrity": "sha512-A41EMy8MWw5yvqj7MQzkDjU29K7UJq1VrX2vWLzfpRHt3ISftOXqrtojn7nlPsZ9Ijhp5NwuODuycSvfAO/26Q==",
      "requires": {
        "@webassemblyjs/ast": "1.8.5",
        "@webassemblyjs/helper-buffer": "1.8.5",
        "@webassemblyjs/helper-wasm-bytecode": "1.8.5",
        "@webassemblyjs/helper-wasm-section": "1.8.5",
        "@webassemblyjs/wasm-gen": "1.8.5",
        "@webassemblyjs/wasm-opt": "1.8.5",
        "@webassemblyjs/wasm-parser": "1.8.5",
        "@webassemblyjs/wast-printer": "1.8.5"
      }
    },
    "@webassemblyjs/wasm-gen": {
      "version": "1.8.5",
      "resolved": "https://registry.npmjs.org/@webassemblyjs/wasm-gen/-/wasm-gen-1.8.5.tgz",
      "integrity": "sha512-BCZBT0LURC0CXDzj5FXSc2FPTsxwp3nWcqXQdOZE4U7h7i8FqtFK5Egia6f9raQLpEKT1VL7zr4r3+QX6zArWg==",
      "requires": {
        "@webassemblyjs/ast": "1.8.5",
        "@webassemblyjs/helper-wasm-bytecode": "1.8.5",
        "@webassemblyjs/ieee754": "1.8.5",
        "@webassemblyjs/leb128": "1.8.5",
        "@webassemblyjs/utf8": "1.8.5"
      }
    },
    "@webassemblyjs/wasm-opt": {
      "version": "1.8.5",
      "resolved": "https://registry.npmjs.org/@webassemblyjs/wasm-opt/-/wasm-opt-1.8.5.tgz",
      "integrity": "sha512-HKo2mO/Uh9A6ojzu7cjslGaHaUU14LdLbGEKqTR7PBKwT6LdPtLLh9fPY33rmr5wcOMrsWDbbdCHq4hQUdd37Q==",
      "requires": {
        "@webassemblyjs/ast": "1.8.5",
        "@webassemblyjs/helper-buffer": "1.8.5",
        "@webassemblyjs/wasm-gen": "1.8.5",
        "@webassemblyjs/wasm-parser": "1.8.5"
      }
    },
    "@webassemblyjs/wasm-parser": {
      "version": "1.8.5",
      "resolved": "https://registry.npmjs.org/@webassemblyjs/wasm-parser/-/wasm-parser-1.8.5.tgz",
      "integrity": "sha512-pi0SYE9T6tfcMkthwcgCpL0cM9nRYr6/6fjgDtL6q/ZqKHdMWvxitRi5JcZ7RI4SNJJYnYNaWy5UUrHQy998lw==",
      "requires": {
        "@webassemblyjs/ast": "1.8.5",
        "@webassemblyjs/helper-api-error": "1.8.5",
        "@webassemblyjs/helper-wasm-bytecode": "1.8.5",
        "@webassemblyjs/ieee754": "1.8.5",
        "@webassemblyjs/leb128": "1.8.5",
        "@webassemblyjs/utf8": "1.8.5"
      }
    },
    "@webassemblyjs/wast-parser": {
      "version": "1.8.5",
      "resolved": "https://registry.npmjs.org/@webassemblyjs/wast-parser/-/wast-parser-1.8.5.tgz",
      "integrity": "sha512-daXC1FyKWHF1i11obK086QRlsMsY4+tIOKgBqI1lxAnkp9xe9YMcgOxm9kLe+ttjs5aWV2KKE1TWJCN57/Btsg==",
      "requires": {
        "@webassemblyjs/ast": "1.8.5",
        "@webassemblyjs/floating-point-hex-parser": "1.8.5",
        "@webassemblyjs/helper-api-error": "1.8.5",
        "@webassemblyjs/helper-code-frame": "1.8.5",
        "@webassemblyjs/helper-fsm": "1.8.5",
        "@xtuc/long": "4.2.2"
      }
    },
    "@webassemblyjs/wast-printer": {
      "version": "1.8.5",
      "resolved": "https://registry.npmjs.org/@webassemblyjs/wast-printer/-/wast-printer-1.8.5.tgz",
      "integrity": "sha512-w0U0pD4EhlnvRyeJzBqaVSJAo9w/ce7/WPogeXLzGkO6hzhr4GnQIZ4W4uUt5b9ooAaXPtnXlj0gzsXEOUNYMg==",
      "requires": {
        "@webassemblyjs/ast": "1.8.5",
        "@webassemblyjs/wast-parser": "1.8.5",
        "@xtuc/long": "4.2.2"
      }
    },
    "@xtuc/ieee754": {
      "version": "1.2.0",
      "resolved": "https://registry.npmjs.org/@xtuc/ieee754/-/ieee754-1.2.0.tgz",
      "integrity": "sha512-DX8nKgqcGwsc0eJSqYt5lwP4DH5FlHnmuWWBRy7X0NcaGR0ZtuyeESgMwTYVEtxmsNGY+qit4QYT/MIYTOTPeA=="
    },
    "@xtuc/long": {
      "version": "4.2.2",
      "resolved": "https://registry.npmjs.org/@xtuc/long/-/long-4.2.2.tgz",
      "integrity": "sha512-NuHqBY1PB/D8xU6s/thBgOAiAP7HOYDQ32+BFZILJ8ivkUkAHQnWfn6WhL79Owj1qmUnoN/YPhktdIoucipkAQ=="
    },
    "JSONStream": {
      "version": "1.3.5",
      "resolved": "https://registry.npmjs.org/JSONStream/-/JSONStream-1.3.5.tgz",
      "integrity": "sha512-E+iruNOY8VV9s4JEbe1aNEm6MiszPRr/UfcHMz0TQh1BXSxHK+ASV1R6W4HpjBhSeS+54PIsAMCBmwD06LLsqQ==",
      "requires": {
        "jsonparse": "^1.2.0",
        "through": ">=2.2.7 <3"
      }
    },
    "abab": {
      "version": "2.0.0",
      "resolved": "https://registry.npmjs.org/abab/-/abab-2.0.0.tgz",
      "integrity": "sha512-sY5AXXVZv4Y1VACTtR11UJCPHHudgY5i26Qj5TypE6DKlIApbwb5uqhXcJ5UUGbvZNRh7EeIoW+LrJumBsKp7w=="
    },
    "accepts": {
      "version": "1.3.7",
      "resolved": "https://registry.npmjs.org/accepts/-/accepts-1.3.7.tgz",
      "integrity": "sha512-Il80Qs2WjYlJIBNzNkK6KYqlVMTbZLXgHx2oT0pU/fjRHyEp+PEfEPY0R3WCwAGVOtauxh1hOxNgIf5bv7dQpA==",
      "requires": {
        "mime-types": "~2.1.24",
        "negotiator": "0.6.2"
      }
    },
    "acorn": {
      "version": "5.7.3",
      "resolved": "https://registry.npmjs.org/acorn/-/acorn-5.7.3.tgz",
      "integrity": "sha512-T/zvzYRfbVojPWahDsE5evJdHb3oJoQfFbsrKM7w5Zcs++Tr257tia3BmMP8XYVjp1S9RZXQMh7gao96BlqZOw=="
    },
    "acorn-dynamic-import": {
      "version": "4.0.0",
      "resolved": "https://registry.npmjs.org/acorn-dynamic-import/-/acorn-dynamic-import-4.0.0.tgz",
      "integrity": "sha512-d3OEjQV4ROpoflsnUA8HozoIR504TFxNivYEUi6uwz0IYhBkTDXGuWlNdMtybRt3nqVx/L6XqMt0FxkXuWKZhw=="
    },
    "acorn-globals": {
      "version": "4.3.3",
      "resolved": "https://registry.npmjs.org/acorn-globals/-/acorn-globals-4.3.3.tgz",
      "integrity": "sha512-vkR40VwS2SYO98AIeFvzWWh+xyc2qi9s7OoXSFEGIP/rOJKzjnhykaZJNnHdoq4BL2gGxI5EZOU16z896EYnOQ==",
      "requires": {
        "acorn": "^6.0.1",
        "acorn-walk": "^6.0.1"
      },
      "dependencies": {
        "acorn": {
          "version": "6.3.0",
          "resolved": "https://registry.npmjs.org/acorn/-/acorn-6.3.0.tgz",
          "integrity": "sha512-/czfa8BwS88b9gWQVhc8eknunSA2DoJpJyTQkhheIf5E48u1N0R4q/YxxsAeqRrmK9TQ/uYfgLDfZo91UlANIA=="
        }
      }
    },
    "acorn-jsx": {
      "version": "3.0.1",
      "resolved": "https://registry.npmjs.org/acorn-jsx/-/acorn-jsx-3.0.1.tgz",
      "integrity": "sha1-r9+UiPsezvyDSPb7IvRk4ypYs2s=",
      "requires": {
        "acorn": "^3.0.4"
      },
      "dependencies": {
        "acorn": {
          "version": "3.3.0",
          "resolved": "https://registry.npmjs.org/acorn/-/acorn-3.3.0.tgz",
          "integrity": "sha1-ReN/s56No/JbruP/U2niu18iAXo="
        }
      }
    },
    "acorn-walk": {
      "version": "6.2.0",
      "resolved": "https://registry.npmjs.org/acorn-walk/-/acorn-walk-6.2.0.tgz",
      "integrity": "sha512-7evsyfH1cLOCdAzZAd43Cic04yKydNx0cF+7tiA19p1XnLLPU4dpCQOqpjqwokFe//vS0QqfqqjCS2JkiIs0cA=="
    },
    "address": {
      "version": "1.1.0",
      "resolved": "https://registry.npmjs.org/address/-/address-1.1.0.tgz",
      "integrity": "sha512-4diPfzWbLEIElVG4AnqP+00SULlPzNuyJFNnmMrLgyaxG6tZXJ1sn7mjBu4fHrJE+Yp/jgylOweJn2xsLMFggQ=="
    },
    "ajv": {
      "version": "6.10.2",
      "resolved": "https://registry.npmjs.org/ajv/-/ajv-6.10.2.tgz",
      "integrity": "sha512-TXtUUEYHuaTEbLZWIKUr5pmBuhDLy+8KYtPYdcV8qC+pOZL+NKqYwvWSRrVXHn+ZmRRAu8vJTAznH7Oag6RVRw==",
      "requires": {
        "fast-deep-equal": "^2.0.1",
        "fast-json-stable-stringify": "^2.0.0",
        "json-schema-traverse": "^0.4.1",
        "uri-js": "^4.2.2"
      }
    },
    "ajv-errors": {
      "version": "1.0.1",
      "resolved": "https://registry.npmjs.org/ajv-errors/-/ajv-errors-1.0.1.tgz",
      "integrity": "sha512-DCRfO/4nQ+89p/RK43i8Ezd41EqdGIU4ld7nGF8OQ14oc/we5rEntLCUa7+jrn3nn83BosfwZA0wb4pon2o8iQ=="
    },
    "ajv-keywords": {
      "version": "3.4.1",
      "resolved": "https://registry.npmjs.org/ajv-keywords/-/ajv-keywords-3.4.1.tgz",
      "integrity": "sha512-RO1ibKvd27e6FEShVFfPALuHI3WjSVNeK5FIsmme/LYRNxjKuNj+Dt7bucLa6NdSv3JcVTyMlm9kGR84z1XpaQ=="
    },
    "alphanum-sort": {
      "version": "1.0.2",
      "resolved": "https://registry.npmjs.org/alphanum-sort/-/alphanum-sort-1.0.2.tgz",
      "integrity": "sha1-l6ERlkmyEa0zaR2fn0hqjsn74KM="
    },
    "ansi-align": {
      "version": "2.0.0",
      "resolved": "https://registry.npmjs.org/ansi-align/-/ansi-align-2.0.0.tgz",
      "integrity": "sha1-w2rsy6VjuJzrVW82kPCx2eNUf38=",
      "requires": {
        "string-width": "^2.0.0"
      }
    },
    "ansi-colors": {
      "version": "3.2.4",
      "resolved": "https://registry.npmjs.org/ansi-colors/-/ansi-colors-3.2.4.tgz",
      "integrity": "sha512-hHUXGagefjN2iRrID63xckIvotOXOojhQKWIPUZ4mNUZ9nLZW+7FMNoE1lOkEhNWYsx/7ysGIuJYCiMAA9FnrA=="
    },
    "ansi-escapes": {
      "version": "3.2.0",
      "resolved": "https://registry.npmjs.org/ansi-escapes/-/ansi-escapes-3.2.0.tgz",
      "integrity": "sha512-cBhpre4ma+U0T1oM5fXg7Dy1Jw7zzwv7lt/GoCpr+hDQJoYnKVPLL4dCvSEFMmQurOQvSrwT7SL/DAlhBI97RQ=="
    },
    "ansi-html": {
      "version": "0.0.7",
      "resolved": "https://registry.npmjs.org/ansi-html/-/ansi-html-0.0.7.tgz",
      "integrity": "sha1-gTWEAhliqenm/QOflA0S9WynhZ4="
    },
    "ansi-regex": {
      "version": "2.1.1",
      "resolved": "https://registry.npmjs.org/ansi-regex/-/ansi-regex-2.1.1.tgz",
      "integrity": "sha1-w7M6te42DYbg5ijwRorn7yfWVN8="
    },
    "ansi-styles": {
      "version": "2.2.1",
      "resolved": "https://registry.npmjs.org/ansi-styles/-/ansi-styles-2.2.1.tgz",
      "integrity": "sha1-tDLdM1i2NM914eRmQ2gkBTPB3b4="
    },
    "anymatch": {
      "version": "2.0.0",
      "resolved": "https://registry.npmjs.org/anymatch/-/anymatch-2.0.0.tgz",
      "integrity": "sha512-5teOsQWABXHHBFP9y3skS5P3d/WfWXpv3FUpy+LorMrNYaT9pI4oLMQX7jzQ2KklNpGpWHzdCXTDT2Y3XGlZBw==",
      "requires": {
        "micromatch": "^3.1.4",
        "normalize-path": "^2.1.1"
      }
    },
    "aproba": {
      "version": "1.2.0",
      "resolved": "https://registry.npmjs.org/aproba/-/aproba-1.2.0.tgz",
      "integrity": "sha512-Y9J6ZjXtoYh8RnXVCMOU/ttDmk1aBjunq9vO0ta5x85WDQiQfUF9sIPBITdbiiIVcBo03Hi3jMxigBtsddlXRw=="
    },
    "archiver": {
      "version": "2.1.1",
      "resolved": "https://registry.npmjs.org/archiver/-/archiver-2.1.1.tgz",
      "integrity": "sha1-/2YrSnggFJSj7lRNOjP+dJZQnrw=",
      "requires": {
        "archiver-utils": "^1.3.0",
        "async": "^2.0.0",
        "buffer-crc32": "^0.2.1",
        "glob": "^7.0.0",
        "lodash": "^4.8.0",
        "readable-stream": "^2.0.0",
        "tar-stream": "^1.5.0",
        "zip-stream": "^1.2.0"
      }
    },
    "archiver-utils": {
      "version": "1.3.0",
      "resolved": "https://registry.npmjs.org/archiver-utils/-/archiver-utils-1.3.0.tgz",
      "integrity": "sha1-5QtMCccL89aA4y/xt5lOn52JUXQ=",
      "requires": {
        "glob": "^7.0.0",
        "graceful-fs": "^4.1.0",
        "lazystream": "^1.0.0",
        "lodash": "^4.8.0",
        "normalize-path": "^2.0.0",
        "readable-stream": "^2.0.0"
      }
    },
    "argparse": {
      "version": "1.0.10",
      "resolved": "https://registry.npmjs.org/argparse/-/argparse-1.0.10.tgz",
      "integrity": "sha512-o5Roy6tNG4SL/FOkCAN6RzjiakZS25RLYFrcMttJqbdd8BWrnA+fGz57iN5Pb06pvBGvl5gQ0B48dJlslXvoTg==",
      "requires": {
        "sprintf-js": "~1.0.2"
      }
    },
    "aria-query": {
      "version": "0.7.1",
      "resolved": "https://registry.npmjs.org/aria-query/-/aria-query-0.7.1.tgz",
      "integrity": "sha1-Jsu1r/ZBRLCoJb4YRuCxbPoAsR4=",
      "requires": {
        "ast-types-flow": "0.0.7",
        "commander": "^2.11.0"
      }
    },
    "arr-diff": {
      "version": "4.0.0",
      "resolved": "https://registry.npmjs.org/arr-diff/-/arr-diff-4.0.0.tgz",
      "integrity": "sha1-1kYQdP6/7HHn4VI1dhoyml3HxSA="
    },
    "arr-flatten": {
      "version": "1.1.0",
      "resolved": "https://registry.npmjs.org/arr-flatten/-/arr-flatten-1.1.0.tgz",
      "integrity": "sha512-L3hKV5R/p5o81R7O02IGnwpDmkp6E982XhtbuwSe3O4qOtMMMtodicASA1Cny2U+aCXcNpml+m4dPsvsJ3jatg=="
    },
    "arr-union": {
      "version": "3.1.0",
      "resolved": "https://registry.npmjs.org/arr-union/-/arr-union-3.1.0.tgz",
      "integrity": "sha1-45sJrqne+Gao8gbiiK9jkZuuOcQ="
    },
    "array-equal": {
      "version": "1.0.0",
      "resolved": "https://registry.npmjs.org/array-equal/-/array-equal-1.0.0.tgz",
      "integrity": "sha1-jCpe8kcv2ep0KwTHenUJO6J1fJM="
    },
    "array-filter": {
      "version": "0.0.1",
      "resolved": "https://registry.npmjs.org/array-filter/-/array-filter-0.0.1.tgz",
      "integrity": "sha1-fajPLiZijtcygDWB/SH2fKzS7uw="
    },
    "array-flatten": {
      "version": "1.1.1",
      "resolved": "https://registry.npmjs.org/array-flatten/-/array-flatten-1.1.1.tgz",
      "integrity": "sha1-ml9pkFGx5wczKPKgCJaLZOopVdI="
    },
    "array-includes": {
      "version": "3.0.3",
      "resolved": "https://registry.npmjs.org/array-includes/-/array-includes-3.0.3.tgz",
      "integrity": "sha1-GEtI9i2S10UrsxsyMWXH+L0CJm0=",
      "requires": {
        "define-properties": "^1.1.2",
        "es-abstract": "^1.7.0"
      }
    },
    "array-map": {
      "version": "0.0.0",
      "resolved": "https://registry.npmjs.org/array-map/-/array-map-0.0.0.tgz",
      "integrity": "sha1-iKK6tz0c97zVwbEYoAP2b2ZfpmI="
    },
    "array-reduce": {
      "version": "0.0.0",
      "resolved": "https://registry.npmjs.org/array-reduce/-/array-reduce-0.0.0.tgz",
      "integrity": "sha1-FziZ0//Rx9k4PkR5Ul2+J4yrXys="
    },
    "array-union": {
      "version": "1.0.2",
      "resolved": "https://registry.npmjs.org/array-union/-/array-union-1.0.2.tgz",
      "integrity": "sha1-mjRBDk9OPaI96jdb5b5w8kd47Dk=",
      "requires": {
        "array-uniq": "^1.0.1"
      }
    },
    "array-uniq": {
      "version": "1.0.3",
      "resolved": "https://registry.npmjs.org/array-uniq/-/array-uniq-1.0.3.tgz",
      "integrity": "sha1-r2rId6Jcx/dOBYiUdThY39sk/bY="
    },
    "array-unique": {
      "version": "0.3.2",
      "resolved": "https://registry.npmjs.org/array-unique/-/array-unique-0.3.2.tgz",
      "integrity": "sha1-qJS3XUvE9s1nnvMkSp/Y9Gri1Cg="
    },
    "arrify": {
      "version": "1.0.1",
      "resolved": "https://registry.npmjs.org/arrify/-/arrify-1.0.1.tgz",
      "integrity": "sha1-iYUI2iIm84DfkEcoRWhJwVAaSw0="
    },
    "as-array": {
      "version": "2.0.0",
      "resolved": "https://registry.npmjs.org/as-array/-/as-array-2.0.0.tgz",
      "integrity": "sha1-TwSAXYf4/OjlEbwhCPjl46KH1Uc="
    },
    "asap": {
      "version": "2.0.6",
      "resolved": "https://registry.npmjs.org/asap/-/asap-2.0.6.tgz",
      "integrity": "sha1-5QNHYR1+aQlDIIu9r+vLwvuGbUY="
    },
    "ascli": {
      "version": "1.0.1",
      "resolved": "https://registry.npmjs.org/ascli/-/ascli-1.0.1.tgz",
      "integrity": "sha1-vPpZdKYvGOgcq660lzKrSoj5Brw=",
      "requires": {
        "colour": "~0.7.1",
        "optjs": "~3.2.2"
      }
    },
    "asn1": {
      "version": "0.2.4",
      "resolved": "https://registry.npmjs.org/asn1/-/asn1-0.2.4.tgz",
      "integrity": "sha512-jxwzQpLQjSmWXgwaCZE9Nz+glAG01yF1QnWgbhGwHI5A6FRIEY6IVqtHhIepHqI7/kyEyQEagBC5mBEFlIYvdg==",
      "requires": {
        "safer-buffer": "~2.1.0"
      }
    },
    "asn1.js": {
      "version": "4.10.1",
      "resolved": "https://registry.npmjs.org/asn1.js/-/asn1.js-4.10.1.tgz",
      "integrity": "sha512-p32cOF5q0Zqs9uBiONKYLm6BClCoBCM5O9JfeUSlnQLBTxYdTK+pW+nXflm8UkKd2UYlEbYz5qEi0JuZR9ckSw==",
      "requires": {
        "bn.js": "^4.0.0",
        "inherits": "^2.0.1",
        "minimalistic-assert": "^1.0.0"
      }
    },
    "assert": {
      "version": "1.5.0",
      "resolved": "https://registry.npmjs.org/assert/-/assert-1.5.0.tgz",
      "integrity": "sha512-EDsgawzwoun2CZkCgtxJbv392v4nbk9XDD06zI+kQYoBM/3RBWLlEyJARDOmhAAosBjWACEkKL6S+lIZtcAubA==",
      "requires": {
        "object-assign": "^4.1.1",
        "util": "0.10.3"
      },
      "dependencies": {
        "inherits": {
          "version": "2.0.1",
          "resolved": "https://registry.npmjs.org/inherits/-/inherits-2.0.1.tgz",
          "integrity": "sha1-sX0I0ya0Qj5Wjv9xn5GwscvfafE="
        },
        "util": {
          "version": "0.10.3",
          "resolved": "https://registry.npmjs.org/util/-/util-0.10.3.tgz",
          "integrity": "sha1-evsa/lCAUkZInj23/g7TeTNqwPk=",
          "requires": {
            "inherits": "2.0.1"
          }
        }
      }
    },
    "assert-plus": {
      "version": "1.0.0",
      "resolved": "https://registry.npmjs.org/assert-plus/-/assert-plus-1.0.0.tgz",
      "integrity": "sha1-8S4PPF13sLHN2RRpQuTpbB5N1SU="
    },
    "assign-symbols": {
      "version": "1.0.0",
      "resolved": "https://registry.npmjs.org/assign-symbols/-/assign-symbols-1.0.0.tgz",
      "integrity": "sha1-WWZ/QfrdTyDMvCu5a41Pf3jsA2c="
    },
    "ast-types-flow": {
      "version": "0.0.7",
      "resolved": "https://registry.npmjs.org/ast-types-flow/-/ast-types-flow-0.0.7.tgz",
      "integrity": "sha1-9wtzXGvKGlycItmCw+Oef+ujva0="
    },
    "astral-regex": {
      "version": "1.0.0",
      "resolved": "https://registry.npmjs.org/astral-regex/-/astral-regex-1.0.0.tgz",
      "integrity": "sha512-+Ryf6g3BKoRc7jfp7ad8tM4TtMiaWvbF/1/sQcZPkkS7ag3D5nMBCe2UfOTONtAkaG0tO0ij3C5Lwmf1EiyjHg=="
    },
    "async": {
      "version": "2.6.3",
      "resolved": "https://registry.npmjs.org/async/-/async-2.6.3.tgz",
      "integrity": "sha512-zflvls11DCy+dQWzTW2dzuilv8Z5X/pjfmZOWba6TNIVDm+2UDaJmXSOXlasHKfNBs8oo3M0aT50fDEWfKZjXg==",
      "requires": {
        "lodash": "^4.17.14"
      }
    },
    "async-each": {
      "version": "1.0.3",
      "resolved": "https://registry.npmjs.org/async-each/-/async-each-1.0.3.tgz",
      "integrity": "sha512-z/WhQ5FPySLdvREByI2vZiTWwCnF0moMJ1hK9YQwDTHKh6I7/uSckMetoRGb5UBZPC1z0jlw+n/XCgjeH7y1AQ=="
    },
    "async-limiter": {
      "version": "1.0.1",
      "resolved": "https://registry.npmjs.org/async-limiter/-/async-limiter-1.0.1.tgz",
      "integrity": "sha512-csOlWGAcRFJaI6m+F2WKdnMKr4HhdhFVBk0H/QbJFMCr+uO2kwohwXQPxw/9OCxp05r5ghVBFSyioixx3gfkNQ=="
    },
    "asynckit": {
      "version": "0.4.0",
      "resolved": "https://registry.npmjs.org/asynckit/-/asynckit-0.4.0.tgz",
      "integrity": "sha1-x57Zf380y48robyXkLzDZkdLS3k="
    },
    "atob": {
      "version": "2.1.2",
      "resolved": "https://registry.npmjs.org/atob/-/atob-2.1.2.tgz",
      "integrity": "sha512-Wm6ukoaOGJi/73p/cl2GvLjTI5JM1k/O14isD73YML8StrH/7/lRFgmg8nICZgD3bZZvjwCGxtMOD3wWNAu8cg=="
    },
    "autoprefixer": {
      "version": "9.6.1",
      "resolved": "https://registry.npmjs.org/autoprefixer/-/autoprefixer-9.6.1.tgz",
      "integrity": "sha512-aVo5WxR3VyvyJxcJC3h4FKfwCQvQWb1tSI5VHNibddCVWrcD1NvlxEweg3TSgiPztMnWfjpy2FURKA2kvDE+Tw==",
      "requires": {
        "browserslist": "^4.6.3",
        "caniuse-lite": "^1.0.30000980",
        "chalk": "^2.4.2",
        "normalize-range": "^0.1.2",
        "num2fraction": "^1.2.2",
        "postcss": "^7.0.17",
        "postcss-value-parser": "^4.0.0"
      },
      "dependencies": {
        "ansi-styles": {
          "version": "3.2.1",
          "resolved": "https://registry.npmjs.org/ansi-styles/-/ansi-styles-3.2.1.tgz",
          "integrity": "sha512-VT0ZI6kZRdTh8YyJw3SMbYm/u+NqfsAxEpWO0Pf9sq8/e94WxxOpPKx9FR1FlyCtOVDNOQ+8ntlqFxiRc+r5qA==",
          "requires": {
            "color-convert": "^1.9.0"
          }
        },
        "chalk": {
          "version": "2.4.2",
          "resolved": "https://registry.npmjs.org/chalk/-/chalk-2.4.2.tgz",
          "integrity": "sha512-Mti+f9lpJNcwF4tWV8/OrTTtF1gZi+f8FqlyAdouralcFWFQWF2+NgCHShjkCb+IFBLq9buZwE1xckQU4peSuQ==",
          "requires": {
            "ansi-styles": "^3.2.1",
            "escape-string-regexp": "^1.0.5",
            "supports-color": "^5.3.0"
          }
        },
        "postcss-value-parser": {
          "version": "4.0.2",
          "resolved": "https://registry.npmjs.org/postcss-value-parser/-/postcss-value-parser-4.0.2.tgz",
          "integrity": "sha512-LmeoohTpp/K4UiyQCwuGWlONxXamGzCMtFxLq4W1nZVGIQLYvMCJx3yAF9qyyuFpflABI9yVdtJAqbihOsCsJQ=="
        },
        "supports-color": {
          "version": "5.5.0",
          "resolved": "https://registry.npmjs.org/supports-color/-/supports-color-5.5.0.tgz",
          "integrity": "sha512-QjVjwdXIt408MIiAqCX4oUKsgU2EqAGzs2Ppkm4aQYbjm+ZEWEcW4SfFNTr4uMNZma0ey4f5lgLrkB0aX0QMow==",
          "requires": {
            "has-flag": "^3.0.0"
          }
        }
      }
    },
    "aws-sign2": {
      "version": "0.7.0",
      "resolved": "https://registry.npmjs.org/aws-sign2/-/aws-sign2-0.7.0.tgz",
      "integrity": "sha1-tG6JCTSpWR8tL2+G1+ap8bP+dqg="
    },
    "aws4": {
      "version": "1.8.0",
      "resolved": "https://registry.npmjs.org/aws4/-/aws4-1.8.0.tgz",
      "integrity": "sha512-ReZxvNHIOv88FlT7rxcXIIC0fPt4KZqZbOlivyWtXLt8ESx84zd3kMC6iK5jVeS2qt+g7ftS7ye4fi06X5rtRQ=="
    },
    "axobject-query": {
      "version": "0.1.0",
      "resolved": "https://registry.npmjs.org/axobject-query/-/axobject-query-0.1.0.tgz",
      "integrity": "sha1-YvWdvFnJ+SQnWco0mWDnov48NsA=",
      "requires": {
        "ast-types-flow": "0.0.7"
      }
    },
    "babel-code-frame": {
      "version": "6.26.0",
      "resolved": "https://registry.npmjs.org/babel-code-frame/-/babel-code-frame-6.26.0.tgz",
      "integrity": "sha1-Y/1D99weO7fONZR9uP42mj9Yx0s=",
      "requires": {
        "chalk": "^1.1.3",
        "esutils": "^2.0.2",
        "js-tokens": "^3.0.2"
      },
      "dependencies": {
        "js-tokens": {
          "version": "3.0.2",
          "resolved": "https://registry.npmjs.org/js-tokens/-/js-tokens-3.0.2.tgz",
          "integrity": "sha1-mGbfOVECEw449/mWvOtlRDIJwls="
        }
      }
    },
    "babel-eslint": {
      "version": "10.0.1",
      "resolved": "https://registry.npmjs.org/babel-eslint/-/babel-eslint-10.0.1.tgz",
      "integrity": "sha512-z7OT1iNV+TjOwHNLLyJk+HN+YVWX+CLE6fPD2SymJZOZQBs+QIexFjhm4keGTm8MW9xr4EC9Q0PbaLB24V5GoQ==",
      "requires": {
        "@babel/code-frame": "^7.0.0",
        "@babel/parser": "^7.0.0",
        "@babel/traverse": "^7.0.0",
        "@babel/types": "^7.0.0",
        "eslint-scope": "3.7.1",
        "eslint-visitor-keys": "^1.0.0"
      },
      "dependencies": {
        "eslint-scope": {
          "version": "3.7.1",
          "resolved": "https://registry.npmjs.org/eslint-scope/-/eslint-scope-3.7.1.tgz",
          "integrity": "sha1-PWPD7f2gLgbgGkUq2IyqzHzctug=",
          "requires": {
            "esrecurse": "^4.1.0",
            "estraverse": "^4.1.1"
          }
        }
      }
    },
    "babel-extract-comments": {
      "version": "1.0.0",
      "resolved": "https://registry.npmjs.org/babel-extract-comments/-/babel-extract-comments-1.0.0.tgz",
      "integrity": "sha512-qWWzi4TlddohA91bFwgt6zO/J0X+io7Qp184Fw0m2JYRSTZnJbFR8+07KmzudHCZgOiKRCrjhylwv9Xd8gfhVQ==",
      "requires": {
        "babylon": "^6.18.0"
      }
    },
    "babel-jest": {
      "version": "24.9.0",
      "resolved": "https://registry.npmjs.org/babel-jest/-/babel-jest-24.9.0.tgz",
      "integrity": "sha512-ntuddfyiN+EhMw58PTNL1ph4C9rECiQXjI4nMMBKBaNjXvqLdkXpPRcMSr4iyBrJg/+wz9brFUD6RhOAT6r4Iw==",
      "requires": {
        "@jest/transform": "^24.9.0",
        "@jest/types": "^24.9.0",
        "@types/babel__core": "^7.1.0",
        "babel-plugin-istanbul": "^5.1.0",
        "babel-preset-jest": "^24.9.0",
        "chalk": "^2.4.2",
        "slash": "^2.0.0"
      },
      "dependencies": {
        "ansi-styles": {
          "version": "3.2.1",
          "resolved": "https://registry.npmjs.org/ansi-styles/-/ansi-styles-3.2.1.tgz",
          "integrity": "sha512-VT0ZI6kZRdTh8YyJw3SMbYm/u+NqfsAxEpWO0Pf9sq8/e94WxxOpPKx9FR1FlyCtOVDNOQ+8ntlqFxiRc+r5qA==",
          "requires": {
            "color-convert": "^1.9.0"
          }
        },
        "chalk": {
          "version": "2.4.2",
          "resolved": "https://registry.npmjs.org/chalk/-/chalk-2.4.2.tgz",
          "integrity": "sha512-Mti+f9lpJNcwF4tWV8/OrTTtF1gZi+f8FqlyAdouralcFWFQWF2+NgCHShjkCb+IFBLq9buZwE1xckQU4peSuQ==",
          "requires": {
            "ansi-styles": "^3.2.1",
            "escape-string-regexp": "^1.0.5",
            "supports-color": "^5.3.0"
          }
        },
        "supports-color": {
          "version": "5.5.0",
          "resolved": "https://registry.npmjs.org/supports-color/-/supports-color-5.5.0.tgz",
          "integrity": "sha512-QjVjwdXIt408MIiAqCX4oUKsgU2EqAGzs2Ppkm4aQYbjm+ZEWEcW4SfFNTr4uMNZma0ey4f5lgLrkB0aX0QMow==",
          "requires": {
            "has-flag": "^3.0.0"
          }
        }
      }
    },
    "babel-loader": {
      "version": "8.0.5",
      "resolved": "https://registry.npmjs.org/babel-loader/-/babel-loader-8.0.5.tgz",
      "integrity": "sha512-NTnHnVRd2JnRqPC0vW+iOQWU5pchDbYXsG2E6DMXEpMfUcQKclF9gmf3G3ZMhzG7IG9ji4coL0cm+FxeWxDpnw==",
      "requires": {
        "find-cache-dir": "^2.0.0",
        "loader-utils": "^1.0.2",
        "mkdirp": "^0.5.1",
        "util.promisify": "^1.0.0"
      }
    },
    "babel-plugin-dynamic-import-node": {
      "version": "2.3.0",
      "resolved": "https://registry.npmjs.org/babel-plugin-dynamic-import-node/-/babel-plugin-dynamic-import-node-2.3.0.tgz",
      "integrity": "sha512-o6qFkpeQEBxcqt0XYlWzAVxNCSCZdUgcR8IRlhD/8DylxjjO4foPcvTW0GGKa/cVt3rvxZ7o5ippJ+/0nvLhlQ==",
      "requires": {
        "object.assign": "^4.1.0"
      }
    },
    "babel-plugin-istanbul": {
      "version": "5.2.0",
      "resolved": "https://registry.npmjs.org/babel-plugin-istanbul/-/babel-plugin-istanbul-5.2.0.tgz",
      "integrity": "sha512-5LphC0USA8t4i1zCtjbbNb6jJj/9+X6P37Qfirc/70EQ34xKlMW+a1RHGwxGI+SwWpNwZ27HqvzAobeqaXwiZw==",
      "requires": {
        "@babel/helper-plugin-utils": "^7.0.0",
        "find-up": "^3.0.0",
        "istanbul-lib-instrument": "^3.3.0",
        "test-exclude": "^5.2.3"
      },
      "dependencies": {
        "find-up": {
          "version": "3.0.0",
          "resolved": "https://registry.npmjs.org/find-up/-/find-up-3.0.0.tgz",
          "integrity": "sha512-1yD6RmLI1XBfxugvORwlck6f75tYL+iR0jqwsOrOxMZyGYqUuDhJ0l4AXdO1iX/FTs9cBAMEk1gWSEx1kSbylg==",
          "requires": {
            "locate-path": "^3.0.0"
          }
        },
        "locate-path": {
          "version": "3.0.0",
          "resolved": "https://registry.npmjs.org/locate-path/-/locate-path-3.0.0.tgz",
          "integrity": "sha512-7AO748wWnIhNqAuaty2ZWHkQHRSNfPVIsPIfwEOWO22AmaoVrWavlOcMR5nzTLNYvp36X220/maaRsrec1G65A==",
          "requires": {
            "p-locate": "^3.0.0",
            "path-exists": "^3.0.0"
          }
        },
        "p-limit": {
          "version": "2.2.1",
          "resolved": "https://registry.npmjs.org/p-limit/-/p-limit-2.2.1.tgz",
          "integrity": "sha512-85Tk+90UCVWvbDavCLKPOLC9vvY8OwEX/RtKF+/1OADJMVlFfEHOiMTPVyxg7mk/dKa+ipdHm0OUkTvCpMTuwg==",
          "requires": {
            "p-try": "^2.0.0"
          }
        },
        "p-locate": {
          "version": "3.0.0",
          "resolved": "https://registry.npmjs.org/p-locate/-/p-locate-3.0.0.tgz",
          "integrity": "sha512-x+12w/To+4GFfgJhBEpiDcLozRJGegY+Ei7/z0tSLkMmxGZNybVMSfWj9aJn8Z5Fc7dBUNJOOVgPv2H7IwulSQ==",
          "requires": {
            "p-limit": "^2.0.0"
          }
        },
        "p-try": {
          "version": "2.2.0",
          "resolved": "https://registry.npmjs.org/p-try/-/p-try-2.2.0.tgz",
          "integrity": "sha512-R4nPAVTAU0B9D35/Gk3uJf/7XYbQcyohSKdvAxIRSNghFl4e71hVoGnBNQz9cWaXxO2I10KTC+3jMdvvoKw6dQ=="
        }
      }
    },
    "babel-plugin-jest-hoist": {
      "version": "24.9.0",
      "resolved": "https://registry.npmjs.org/babel-plugin-jest-hoist/-/babel-plugin-jest-hoist-24.9.0.tgz",
      "integrity": "sha512-2EMA2P8Vp7lG0RAzr4HXqtYwacfMErOuv1U3wrvxHX6rD1sV6xS3WXG3r8TRQ2r6w8OhvSdWt+z41hQNwNm3Xw==",
      "requires": {
        "@types/babel__traverse": "^7.0.6"
      }
    },
    "babel-plugin-macros": {
      "version": "2.6.1",
      "resolved": "https://registry.npmjs.org/babel-plugin-macros/-/babel-plugin-macros-2.6.1.tgz",
      "integrity": "sha512-6W2nwiXme6j1n2erPOnmRiWfObUhWH7Qw1LMi9XZy8cj+KtESu3T6asZvtk5bMQQjX8te35o7CFueiSdL/2NmQ==",
      "requires": {
        "@babel/runtime": "^7.4.2",
        "cosmiconfig": "^5.2.0",
        "resolve": "^1.10.0"
      }
    },
    "babel-plugin-named-asset-import": {
      "version": "0.3.3",
      "resolved": "https://registry.npmjs.org/babel-plugin-named-asset-import/-/babel-plugin-named-asset-import-0.3.3.tgz",
      "integrity": "sha512-1XDRysF4894BUdMChT+2HHbtJYiO7zx5Be7U6bT8dISy7OdyETMGIAQBMPQCsY1YRf0xcubwnKKaDr5bk15JTA=="
    },
    "babel-plugin-syntax-object-rest-spread": {
      "version": "6.13.0",
      "resolved": "https://registry.npmjs.org/babel-plugin-syntax-object-rest-spread/-/babel-plugin-syntax-object-rest-spread-6.13.0.tgz",
      "integrity": "sha1-/WU28rzhODb/o6VFjEkDpZe7O/U="
    },
    "babel-plugin-transform-object-rest-spread": {
      "version": "6.26.0",
      "resolved": "https://registry.npmjs.org/babel-plugin-transform-object-rest-spread/-/babel-plugin-transform-object-rest-spread-6.26.0.tgz",
      "integrity": "sha1-DzZpLVD+9rfi1LOsFHgTepY7ewY=",
      "requires": {
        "babel-plugin-syntax-object-rest-spread": "^6.8.0",
        "babel-runtime": "^6.26.0"
      }
    },
    "babel-plugin-transform-react-remove-prop-types": {
      "version": "0.4.24",
      "resolved": "https://registry.npmjs.org/babel-plugin-transform-react-remove-prop-types/-/babel-plugin-transform-react-remove-prop-types-0.4.24.tgz",
      "integrity": "sha512-eqj0hVcJUR57/Ug2zE1Yswsw4LhuqqHhD+8v120T1cl3kjg76QwtyBrdIk4WVwK+lAhBJVYCd/v+4nc4y+8JsA=="
    },
    "babel-preset-jest": {
      "version": "24.9.0",
      "resolved": "https://registry.npmjs.org/babel-preset-jest/-/babel-preset-jest-24.9.0.tgz",
      "integrity": "sha512-izTUuhE4TMfTRPF92fFwD2QfdXaZW08qvWTFCI51V8rW5x00UuPgc3ajRoWofXOuxjfcOM5zzSYsQS3H8KGCAg==",
      "requires": {
        "@babel/plugin-syntax-object-rest-spread": "^7.0.0",
        "babel-plugin-jest-hoist": "^24.9.0"
      }
    },
    "babel-preset-react-app": {
      "version": "9.0.1",
      "resolved": "https://registry.npmjs.org/babel-preset-react-app/-/babel-preset-react-app-9.0.1.tgz",
      "integrity": "sha512-v7MeY+QxdBhM9oU5uOQCIHLsErYkEbbjctXsb10II+KAnttbe0rvprvP785dRxfa9dI4ZbsGXsRU07Qdi5BtOw==",
      "requires": {
        "@babel/core": "7.5.5",
        "@babel/plugin-proposal-class-properties": "7.5.5",
        "@babel/plugin-proposal-decorators": "7.4.4",
        "@babel/plugin-proposal-object-rest-spread": "7.5.5",
        "@babel/plugin-syntax-dynamic-import": "7.2.0",
        "@babel/plugin-transform-destructuring": "7.5.0",
        "@babel/plugin-transform-flow-strip-types": "7.4.4",
        "@babel/plugin-transform-react-display-name": "7.2.0",
        "@babel/plugin-transform-runtime": "7.5.5",
        "@babel/preset-env": "7.5.5",
        "@babel/preset-react": "7.0.0",
        "@babel/preset-typescript": "7.3.3",
        "@babel/runtime": "7.5.5",
        "babel-plugin-dynamic-import-node": "2.3.0",
        "babel-plugin-macros": "2.6.1",
        "babel-plugin-transform-react-remove-prop-types": "0.4.24"
      },
      "dependencies": {
        "@babel/core": {
          "version": "7.5.5",
          "resolved": "https://registry.npmjs.org/@babel/core/-/core-7.5.5.tgz",
          "integrity": "sha512-i4qoSr2KTtce0DmkuuQBV4AuQgGPUcPXMr9L5MyYAtk06z068lQ10a4O009fe5OB/DfNV+h+qqT7ddNV8UnRjg==",
          "requires": {
            "@babel/code-frame": "^7.5.5",
            "@babel/generator": "^7.5.5",
            "@babel/helpers": "^7.5.5",
            "@babel/parser": "^7.5.5",
            "@babel/template": "^7.4.4",
            "@babel/traverse": "^7.5.5",
            "@babel/types": "^7.5.5",
            "convert-source-map": "^1.1.0",
            "debug": "^4.1.0",
            "json5": "^2.1.0",
            "lodash": "^4.17.13",
            "resolve": "^1.3.2",
            "semver": "^5.4.1",
            "source-map": "^0.5.0"
          }
        },
        "debug": {
          "version": "4.1.1",
          "resolved": "https://registry.npmjs.org/debug/-/debug-4.1.1.tgz",
          "integrity": "sha512-pYAIzeRo8J6KPEaJ0VWOh5Pzkbw/RetuzehGM7QRRX5he4fPHx2rdKMB256ehJCkX+XRQm16eZLqLNS8RSZXZw==",
          "requires": {
            "ms": "^2.1.1"
          }
        },
        "ms": {
          "version": "2.1.2",
          "resolved": "https://registry.npmjs.org/ms/-/ms-2.1.2.tgz",
          "integrity": "sha512-sGkPx+VjMtmA6MX27oA4FBFELFCZZ4S4XqeGOXCv68tT+jb3vk/RyaKWP0PTKyWtmLSM0b+adUTEvbs1PEaH2w=="
        }
      }
    },
    "babel-runtime": {
      "version": "6.26.0",
      "resolved": "https://registry.npmjs.org/babel-runtime/-/babel-runtime-6.26.0.tgz",
      "integrity": "sha1-llxwWGaOgrVde/4E/yM3vItWR/4=",
      "requires": {
        "core-js": "^2.4.0",
        "regenerator-runtime": "^0.11.0"
      },
      "dependencies": {
        "core-js": {
          "version": "2.6.9",
          "resolved": "https://registry.npmjs.org/core-js/-/core-js-2.6.9.tgz",
          "integrity": "sha512-HOpZf6eXmnl7la+cUdMnLvUxKNqLUzJvgIziQ0DiF3JwSImNphIqdGqzj6hIKyX04MmV0poclQ7+wjWvxQyR2A=="
        },
        "regenerator-runtime": {
          "version": "0.11.1",
          "resolved": "https://registry.npmjs.org/regenerator-runtime/-/regenerator-runtime-0.11.1.tgz",
          "integrity": "sha512-MguG95oij0fC3QV3URf4V2SDYGJhJnJGqvIIgdECeODCT98wSWDAJ94SSuVpYQUoTcGUIL6L4yNB7j1DFFHSBg=="
        }
      }
    },
    "babylon": {
      "version": "6.18.0",
      "resolved": "https://registry.npmjs.org/babylon/-/babylon-6.18.0.tgz",
      "integrity": "sha512-q/UEjfGJ2Cm3oKV71DJz9d25TPnq5rhBVL2Q4fA5wcC3jcrdn7+SssEybFIxwAvvP+YCsCYNKughoF33GxgycQ=="
    },
    "balanced-match": {
      "version": "1.0.0",
      "resolved": "https://registry.npmjs.org/balanced-match/-/balanced-match-1.0.0.tgz",
      "integrity": "sha1-ibTRmasr7kneFk6gK4nORi1xt2c="
    },
    "base": {
      "version": "0.11.2",
      "resolved": "https://registry.npmjs.org/base/-/base-0.11.2.tgz",
      "integrity": "sha512-5T6P4xPgpp0YDFvSWwEZ4NoE3aM4QBQXDzmVbraCkFj8zHM+mba8SyqB5DbZWyR7mYHo6Y7BdQo3MoA4m0TeQg==",
      "requires": {
        "cache-base": "^1.0.1",
        "class-utils": "^0.3.5",
        "component-emitter": "^1.2.1",
        "define-property": "^1.0.0",
        "isobject": "^3.0.1",
        "mixin-deep": "^1.2.0",
        "pascalcase": "^0.1.1"
      },
      "dependencies": {
        "define-property": {
          "version": "1.0.0",
          "resolved": "https://registry.npmjs.org/define-property/-/define-property-1.0.0.tgz",
          "integrity": "sha1-dp66rz9KY6rTr56NMEybvnm/sOY=",
          "requires": {
            "is-descriptor": "^1.0.0"
          }
        },
        "is-accessor-descriptor": {
          "version": "1.0.0",
          "resolved": "https://registry.npmjs.org/is-accessor-descriptor/-/is-accessor-descriptor-1.0.0.tgz",
          "integrity": "sha512-m5hnHTkcVsPfqx3AKlyttIPb7J+XykHvJP2B9bZDjlhLIoEq4XoK64Vg7boZlVWYK6LUY94dYPEE7Lh0ZkZKcQ==",
          "requires": {
            "kind-of": "^6.0.0"
          }
        },
        "is-data-descriptor": {
          "version": "1.0.0",
          "resolved": "https://registry.npmjs.org/is-data-descriptor/-/is-data-descriptor-1.0.0.tgz",
          "integrity": "sha512-jbRXy1FmtAoCjQkVmIVYwuuqDFUbaOeDjmed1tOGPrsMhtJA4rD9tkgA0F1qJ3gRFRXcHYVkdeaP50Q5rE/jLQ==",
          "requires": {
            "kind-of": "^6.0.0"
          }
        },
        "is-descriptor": {
          "version": "1.0.2",
          "resolved": "https://registry.npmjs.org/is-descriptor/-/is-descriptor-1.0.2.tgz",
          "integrity": "sha512-2eis5WqQGV7peooDyLmNEPUrps9+SXX5c9pL3xEB+4e9HnGuDa7mB7kHxHw4CbqS9k1T2hOH3miL8n8WtiYVtg==",
          "requires": {
            "is-accessor-descriptor": "^1.0.0",
            "is-data-descriptor": "^1.0.0",
            "kind-of": "^6.0.2"
          }
        }
      }
    },
    "base64-js": {
      "version": "1.3.1",
      "resolved": "https://registry.npmjs.org/base64-js/-/base64-js-1.3.1.tgz",
      "integrity": "sha512-mLQ4i2QO1ytvGWFWmcngKO//JXAQueZvwEKtjgQFM4jIK0kU+ytMfplL8j+n5mspOfjHwoAg+9yhb7BwAHm36g=="
    },
    "basic-auth": {
      "version": "2.0.1",
      "resolved": "https://registry.npmjs.org/basic-auth/-/basic-auth-2.0.1.tgz",
      "integrity": "sha512-NF+epuEdnUYVlGuhaxbbq+dvJttwLnGY+YixlXlME5KpQ5W3CnXA5cVTneY3SPbPDRkcjMbifrwmFYcClgOZeg==",
      "requires": {
        "safe-buffer": "5.1.2"
      }
    },
    "basic-auth-connect": {
      "version": "1.0.0",
      "resolved": "https://registry.npmjs.org/basic-auth-connect/-/basic-auth-connect-1.0.0.tgz",
      "integrity": "sha1-/bC0OWLKe0BFanwrtI/hc9otISI="
    },
    "batch": {
      "version": "0.6.1",
      "resolved": "https://registry.npmjs.org/batch/-/batch-0.6.1.tgz",
      "integrity": "sha1-3DQxT05nkxgJP8dgJyUl+UvyXBY="
    },
    "bcrypt-pbkdf": {
      "version": "1.0.2",
      "resolved": "https://registry.npmjs.org/bcrypt-pbkdf/-/bcrypt-pbkdf-1.0.2.tgz",
      "integrity": "sha1-pDAdOJtqQ/m2f/PKEaP2Y342Dp4=",
      "requires": {
        "tweetnacl": "^0.14.3"
      }
    },
    "big.js": {
      "version": "5.2.2",
      "resolved": "https://registry.npmjs.org/big.js/-/big.js-5.2.2.tgz",
      "integrity": "sha512-vyL2OymJxmarO8gxMr0mhChsO9QGwhynfuu4+MHTAW6czfq9humCB7rKpUjDd9YUiDPU4mzpyupFSvOClAwbmQ=="
    },
    "binary-extensions": {
      "version": "1.13.1",
      "resolved": "https://registry.npmjs.org/binary-extensions/-/binary-extensions-1.13.1.tgz",
      "integrity": "sha512-Un7MIEDdUC5gNpcGDV97op1Ywk748MpHcFTHoYs6qnj1Z3j7I53VG3nwZhKzoBZmbdRNnb6WRdFlwl7tSDuZGw=="
    },
    "bl": {
      "version": "1.2.2",
      "resolved": "https://registry.npmjs.org/bl/-/bl-1.2.2.tgz",
      "integrity": "sha512-e8tQYnZodmebYDWGH7KMRvtzKXaJHx3BbilrgZCfvyLUYdKpK1t5PSPmpkny/SgiTSCnjfLW7v5rlONXVFkQEA==",
      "requires": {
        "readable-stream": "^2.3.5",
        "safe-buffer": "^5.1.1"
      }
    },
    "bluebird": {
      "version": "3.5.5",
      "resolved": "https://registry.npmjs.org/bluebird/-/bluebird-3.5.5.tgz",
      "integrity": "sha512-5am6HnnfN+urzt4yfg7IgTbotDjIT/u8AJpEt0sIU9FtXfVeezXAPKswrG+xKUCOYAINpSdgZVDU6QFh+cuH3w=="
    },
    "bn.js": {
      "version": "4.11.8",
      "resolved": "https://registry.npmjs.org/bn.js/-/bn.js-4.11.8.tgz",
      "integrity": "sha512-ItfYfPLkWHUjckQCk8xC+LwxgK8NYcXywGigJgSwOP8Y2iyWT4f2vsZnoOXTTbo+o5yXmIUJ4gn5538SO5S3gA=="
    },
    "body-parser": {
      "version": "1.19.0",
      "resolved": "https://registry.npmjs.org/body-parser/-/body-parser-1.19.0.tgz",
      "integrity": "sha512-dhEPs72UPbDnAQJ9ZKMNTP6ptJaionhP5cBb541nXPlW60Jepo9RV/a4fX4XWW9CuFNK22krhrj1+rgzifNCsw==",
      "requires": {
        "bytes": "3.1.0",
        "content-type": "~1.0.4",
        "debug": "2.6.9",
        "depd": "~1.1.2",
        "http-errors": "1.7.2",
        "iconv-lite": "0.4.24",
        "on-finished": "~2.3.0",
        "qs": "6.7.0",
        "raw-body": "2.4.0",
        "type-is": "~1.6.17"
      }
    },
    "bonjour": {
      "version": "3.5.0",
      "resolved": "https://registry.npmjs.org/bonjour/-/bonjour-3.5.0.tgz",
      "integrity": "sha1-jokKGD2O6aI5OzhExpGkK897yfU=",
      "requires": {
        "array-flatten": "^2.1.0",
        "deep-equal": "^1.0.1",
        "dns-equal": "^1.0.0",
        "dns-txt": "^2.0.2",
        "multicast-dns": "^6.0.1",
        "multicast-dns-service-types": "^1.1.0"
      },
      "dependencies": {
        "array-flatten": {
          "version": "2.1.2",
          "resolved": "https://registry.npmjs.org/array-flatten/-/array-flatten-2.1.2.tgz",
          "integrity": "sha512-hNfzcOV8W4NdualtqBFPyVO+54DSJuZGY9qT4pRroB6S9e3iiido2ISIC5h9R2sPJ8H3FHCIiEnsv1lPXO3KtQ=="
        }
      }
    },
    "boolbase": {
      "version": "1.0.0",
      "resolved": "https://registry.npmjs.org/boolbase/-/boolbase-1.0.0.tgz",
      "integrity": "sha1-aN/1++YMUes3cl6p4+0xDcwed24="
    },
    "boxen": {
      "version": "1.3.0",
      "resolved": "https://registry.npmjs.org/boxen/-/boxen-1.3.0.tgz",
      "integrity": "sha512-TNPjfTr432qx7yOjQyaXm3dSR0MH9vXp7eT1BFSl/C51g+EFnOR9hTg1IreahGBmDNCehscshe45f+C1TBZbLw==",
      "requires": {
        "ansi-align": "^2.0.0",
        "camelcase": "^4.0.0",
        "chalk": "^2.0.1",
        "cli-boxes": "^1.0.0",
        "string-width": "^2.0.0",
        "term-size": "^1.2.0",
        "widest-line": "^2.0.0"
      },
      "dependencies": {
        "ansi-styles": {
          "version": "3.2.1",
          "resolved": "https://registry.npmjs.org/ansi-styles/-/ansi-styles-3.2.1.tgz",
          "integrity": "sha512-VT0ZI6kZRdTh8YyJw3SMbYm/u+NqfsAxEpWO0Pf9sq8/e94WxxOpPKx9FR1FlyCtOVDNOQ+8ntlqFxiRc+r5qA==",
          "requires": {
            "color-convert": "^1.9.0"
          }
        },
        "camelcase": {
          "version": "4.1.0",
          "resolved": "https://registry.npmjs.org/camelcase/-/camelcase-4.1.0.tgz",
          "integrity": "sha1-1UVjW+HjPFQmScaRc+Xeas+uNN0="
        },
        "chalk": {
          "version": "2.4.2",
          "resolved": "https://registry.npmjs.org/chalk/-/chalk-2.4.2.tgz",
          "integrity": "sha512-Mti+f9lpJNcwF4tWV8/OrTTtF1gZi+f8FqlyAdouralcFWFQWF2+NgCHShjkCb+IFBLq9buZwE1xckQU4peSuQ==",
          "requires": {
            "ansi-styles": "^3.2.1",
            "escape-string-regexp": "^1.0.5",
            "supports-color": "^5.3.0"
          }
        },
        "supports-color": {
          "version": "5.5.0",
          "resolved": "https://registry.npmjs.org/supports-color/-/supports-color-5.5.0.tgz",
          "integrity": "sha512-QjVjwdXIt408MIiAqCX4oUKsgU2EqAGzs2Ppkm4aQYbjm+ZEWEcW4SfFNTr4uMNZma0ey4f5lgLrkB0aX0QMow==",
          "requires": {
            "has-flag": "^3.0.0"
          }
        }
      }
    },
    "brace-expansion": {
      "version": "1.1.11",
      "resolved": "https://registry.npmjs.org/brace-expansion/-/brace-expansion-1.1.11.tgz",
      "integrity": "sha512-iCuPHDFgrHX7H2vEI/5xpz07zSHB00TpugqhmYtVmMO6518mCuRMoOYFldEBl0g187ufozdaHgWKcYFb61qGiA==",
      "requires": {
        "balanced-match": "^1.0.0",
        "concat-map": "0.0.1"
      }
    },
    "braces": {
      "version": "2.3.2",
      "resolved": "https://registry.npmjs.org/braces/-/braces-2.3.2.tgz",
      "integrity": "sha512-aNdbnj9P8PjdXU4ybaWLK2IF3jc/EoDYbC7AazW6to3TRsfXxscC9UXOB5iDiEQrkyIbWp2SLQda4+QAa7nc3w==",
      "requires": {
        "arr-flatten": "^1.1.0",
        "array-unique": "^0.3.2",
        "extend-shallow": "^2.0.1",
        "fill-range": "^4.0.0",
        "isobject": "^3.0.1",
        "repeat-element": "^1.1.2",
        "snapdragon": "^0.8.1",
        "snapdragon-node": "^2.0.1",
        "split-string": "^3.0.2",
        "to-regex": "^3.0.1"
      },
      "dependencies": {
        "extend-shallow": {
          "version": "2.0.1",
          "resolved": "https://registry.npmjs.org/extend-shallow/-/extend-shallow-2.0.1.tgz",
          "integrity": "sha1-Ua99YUrZqfYQ6huvu5idaxxWiQ8=",
          "requires": {
            "is-extendable": "^0.1.0"
          }
        }
      }
    },
    "brorand": {
      "version": "1.1.0",
      "resolved": "https://registry.npmjs.org/brorand/-/brorand-1.1.0.tgz",
      "integrity": "sha1-EsJe/kCkXjwyPrhnWgoM5XsiNx8="
    },
    "browser-process-hrtime": {
      "version": "0.1.3",
      "resolved": "https://registry.npmjs.org/browser-process-hrtime/-/browser-process-hrtime-0.1.3.tgz",
      "integrity": "sha512-bRFnI4NnjO6cnyLmOV/7PVoDEMJChlcfN0z4s1YMBY989/SvlfMI1lgCnkFUs53e9gQF+w7qu7XdllSTiSl8Aw=="
    },
    "browser-resolve": {
      "version": "1.11.3",
      "resolved": "https://registry.npmjs.org/browser-resolve/-/browser-resolve-1.11.3.tgz",
      "integrity": "sha512-exDi1BYWB/6raKHmDTCicQfTkqwN5fioMFV4j8BsfMU4R2DK/QfZfK7kOVkmWCNANf0snkBzqGqAJBao9gZMdQ==",
      "requires": {
        "resolve": "1.1.7"
      },
      "dependencies": {
        "resolve": {
          "version": "1.1.7",
          "resolved": "https://registry.npmjs.org/resolve/-/resolve-1.1.7.tgz",
          "integrity": "sha1-IDEU2CrSxe2ejgQRs5ModeiJ6Xs="
        }
      }
    },
    "browserify-aes": {
      "version": "1.2.0",
      "resolved": "https://registry.npmjs.org/browserify-aes/-/browserify-aes-1.2.0.tgz",
      "integrity": "sha512-+7CHXqGuspUn/Sl5aO7Ea0xWGAtETPXNSAjHo48JfLdPWcMng33Xe4znFvQweqc/uzk5zSOI3H52CYnjCfb5hA==",
      "requires": {
        "buffer-xor": "^1.0.3",
        "cipher-base": "^1.0.0",
        "create-hash": "^1.1.0",
        "evp_bytestokey": "^1.0.3",
        "inherits": "^2.0.1",
        "safe-buffer": "^5.0.1"
      }
    },
    "browserify-cipher": {
      "version": "1.0.1",
      "resolved": "https://registry.npmjs.org/browserify-cipher/-/browserify-cipher-1.0.1.tgz",
      "integrity": "sha512-sPhkz0ARKbf4rRQt2hTpAHqn47X3llLkUGn+xEJzLjwY8LRs2p0v7ljvI5EyoRO/mexrNunNECisZs+gw2zz1w==",
      "requires": {
        "browserify-aes": "^1.0.4",
        "browserify-des": "^1.0.0",
        "evp_bytestokey": "^1.0.0"
      }
    },
    "browserify-des": {
      "version": "1.0.2",
      "resolved": "https://registry.npmjs.org/browserify-des/-/browserify-des-1.0.2.tgz",
      "integrity": "sha512-BioO1xf3hFwz4kc6iBhI3ieDFompMhrMlnDFC4/0/vd5MokpuAc3R+LYbwTA9A5Yc9pq9UYPqffKpW2ObuwX5A==",
      "requires": {
        "cipher-base": "^1.0.1",
        "des.js": "^1.0.0",
        "inherits": "^2.0.1",
        "safe-buffer": "^5.1.2"
      }
    },
    "browserify-rsa": {
      "version": "4.0.1",
      "resolved": "https://registry.npmjs.org/browserify-rsa/-/browserify-rsa-4.0.1.tgz",
      "integrity": "sha1-IeCr+vbyApzy+vsTNWenAdQTVSQ=",
      "requires": {
        "bn.js": "^4.1.0",
        "randombytes": "^2.0.1"
      }
    },
    "browserify-sign": {
      "version": "4.0.4",
      "resolved": "https://registry.npmjs.org/browserify-sign/-/browserify-sign-4.0.4.tgz",
      "integrity": "sha1-qk62jl17ZYuqa/alfmMMvXqT0pg=",
      "requires": {
        "bn.js": "^4.1.1",
        "browserify-rsa": "^4.0.0",
        "create-hash": "^1.1.0",
        "create-hmac": "^1.1.2",
        "elliptic": "^6.0.0",
        "inherits": "^2.0.1",
        "parse-asn1": "^5.0.0"
      }
    },
    "browserify-zlib": {
      "version": "0.2.0",
      "resolved": "https://registry.npmjs.org/browserify-zlib/-/browserify-zlib-0.2.0.tgz",
      "integrity": "sha512-Z942RysHXmJrhqk88FmKBVq/v5tqmSkDz7p54G/MGyjMnCFFnC79XWNbg+Vta8W6Wb2qtSZTSxIGkJrRpCFEiA==",
      "requires": {
        "pako": "~1.0.5"
      }
    },
    "browserslist": {
      "version": "4.6.6",
      "resolved": "https://registry.npmjs.org/browserslist/-/browserslist-4.6.6.tgz",
      "integrity": "sha512-D2Nk3W9JL9Fp/gIcWei8LrERCS+eXu9AM5cfXA8WEZ84lFks+ARnZ0q/R69m2SV3Wjma83QDDPxsNKXUwdIsyA==",
      "requires": {
        "caniuse-lite": "^1.0.30000984",
        "electron-to-chromium": "^1.3.191",
        "node-releases": "^1.1.25"
      }
    },
    "bser": {
      "version": "2.1.0",
      "resolved": "https://registry.npmjs.org/bser/-/bser-2.1.0.tgz",
      "integrity": "sha512-8zsjWrQkkBoLK6uxASk1nJ2SKv97ltiGDo6A3wA0/yRPz+CwmEyDo0hUrhIuukG2JHpAl3bvFIixw2/3Hi0DOg==",
      "requires": {
        "node-int64": "^0.4.0"
      }
    },
    "buffer": {
      "version": "5.4.0",
      "resolved": "https://registry.npmjs.org/buffer/-/buffer-5.4.0.tgz",
      "integrity": "sha512-Xpgy0IwHK2N01ncykXTy6FpCWuM+CJSHoPVBLyNqyrWxsedpLvwsYUhf0ME3WRFNUhos0dMamz9cOS/xRDtU5g==",
      "requires": {
        "base64-js": "^1.0.2",
        "ieee754": "^1.1.4"
      }
    },
    "buffer-alloc": {
      "version": "1.2.0",
      "resolved": "https://registry.npmjs.org/buffer-alloc/-/buffer-alloc-1.2.0.tgz",
      "integrity": "sha512-CFsHQgjtW1UChdXgbyJGtnm+O/uLQeZdtbDo8mfUgYXCHSM1wgrVxXm6bSyrUuErEb+4sYVGCzASBRot7zyrow==",
      "requires": {
        "buffer-alloc-unsafe": "^1.1.0",
        "buffer-fill": "^1.0.0"
      }
    },
    "buffer-alloc-unsafe": {
      "version": "1.1.0",
      "resolved": "https://registry.npmjs.org/buffer-alloc-unsafe/-/buffer-alloc-unsafe-1.1.0.tgz",
      "integrity": "sha512-TEM2iMIEQdJ2yjPJoSIsldnleVaAk1oW3DBVUykyOLsEsFmEc9kn+SFFPz+gl54KQNxlDnAwCXosOS9Okx2xAg=="
    },
    "buffer-crc32": {
      "version": "0.2.13",
      "resolved": "https://registry.npmjs.org/buffer-crc32/-/buffer-crc32-0.2.13.tgz",
      "integrity": "sha1-DTM+PwDqxQqhRUq9MO+MKl2ackI="
    },
    "buffer-equal-constant-time": {
      "version": "1.0.1",
      "resolved": "https://registry.npmjs.org/buffer-equal-constant-time/-/buffer-equal-constant-time-1.0.1.tgz",
      "integrity": "sha1-+OcRMvf/5uAaXJaXpMbz5I1cyBk="
    },
    "buffer-fill": {
      "version": "1.0.0",
      "resolved": "https://registry.npmjs.org/buffer-fill/-/buffer-fill-1.0.0.tgz",
      "integrity": "sha1-+PeLdniYiO858gXNY39o5wISKyw="
    },
    "buffer-from": {
      "version": "1.1.1",
      "resolved": "https://registry.npmjs.org/buffer-from/-/buffer-from-1.1.1.tgz",
      "integrity": "sha512-MQcXEUbCKtEo7bhqEs6560Hyd4XaovZlO/k9V3hjVUF/zwW7KBVdSK4gIt/bzwS9MbR5qob+F5jusZsb0YQK2A=="
    },
    "buffer-indexof": {
      "version": "1.1.1",
      "resolved": "https://registry.npmjs.org/buffer-indexof/-/buffer-indexof-1.1.1.tgz",
      "integrity": "sha512-4/rOEg86jivtPTeOUUT61jJO1Ya1TrR/OkqCSZDyq84WJh3LuuiphBYJN+fm5xufIk4XAFcEwte/8WzC8If/1g=="
    },
    "buffer-xor": {
      "version": "1.0.3",
      "resolved": "https://registry.npmjs.org/buffer-xor/-/buffer-xor-1.0.3.tgz",
      "integrity": "sha1-JuYe0UIvtw3ULm42cp7VHYVf6Nk="
    },
    "builtin-modules": {
      "version": "1.1.1",
      "resolved": "https://registry.npmjs.org/builtin-modules/-/builtin-modules-1.1.1.tgz",
      "integrity": "sha1-Jw8HbFpywC9bZaR9+Uxf46J4iS8="
    },
    "builtin-status-codes": {
      "version": "3.0.0",
      "resolved": "https://registry.npmjs.org/builtin-status-codes/-/builtin-status-codes-3.0.0.tgz",
      "integrity": "sha1-hZgoeOIbmOHGZCXgPQF0eI9Wnug="
    },
    "bytebuffer": {
      "version": "5.0.1",
      "resolved": "https://registry.npmjs.org/bytebuffer/-/bytebuffer-5.0.1.tgz",
      "integrity": "sha1-WC7qSxqHO20CCkjVjfhfC7ps/d0=",
      "requires": {
        "long": "~3"
      },
      "dependencies": {
        "long": {
          "version": "3.2.0",
          "resolved": "https://registry.npmjs.org/long/-/long-3.2.0.tgz",
          "integrity": "sha1-2CG3E4yhy1gcFymQ7xTbIAtcR0s="
        }
      }
    },
    "bytes": {
      "version": "3.1.0",
      "resolved": "https://registry.npmjs.org/bytes/-/bytes-3.1.0.tgz",
      "integrity": "sha512-zauLjrfCG+xvoyaqLoV8bLVXXNGC4JqlxFCutSDWA6fJrTo2ZuvLYTqZ7aHBLZSMOopbzwv8f+wZcVzfVTI2Dg=="
    },
    "cacache": {
      "version": "11.3.3",
      "resolved": "https://registry.npmjs.org/cacache/-/cacache-11.3.3.tgz",
      "integrity": "sha512-p8WcneCytvzPxhDvYp31PD039vi77I12W+/KfR9S8AZbaiARFBCpsPJS+9uhWfeBfeAtW7o/4vt3MUqLkbY6nA==",
      "requires": {
        "bluebird": "^3.5.5",
        "chownr": "^1.1.1",
        "figgy-pudding": "^3.5.1",
        "glob": "^7.1.4",
        "graceful-fs": "^4.1.15",
        "lru-cache": "^5.1.1",
        "mississippi": "^3.0.0",
        "mkdirp": "^0.5.1",
        "move-concurrently": "^1.0.1",
        "promise-inflight": "^1.0.1",
        "rimraf": "^2.6.3",
        "ssri": "^6.0.1",
        "unique-filename": "^1.1.1",
        "y18n": "^4.0.0"
      },
      "dependencies": {
        "lru-cache": {
          "version": "5.1.1",
          "resolved": "https://registry.npmjs.org/lru-cache/-/lru-cache-5.1.1.tgz",
          "integrity": "sha512-KpNARQA3Iwv+jTA0utUVVbrh+Jlrr1Fv0e56GGzAFOXN7dk/FviaDW8LHmK52DlcH4WP2n6gI8vN1aesBFgo9w==",
          "requires": {
            "yallist": "^3.0.2"
          }
        },
        "y18n": {
          "version": "4.0.0",
          "resolved": "https://registry.npmjs.org/y18n/-/y18n-4.0.0.tgz",
          "integrity": "sha512-r9S/ZyXu/Xu9q1tYlpsLIsa3EeLXXk0VwlxqTcFRfg9EhMW+17kbt9G0NrgCmhGb5vT2hyhJZLfDGx+7+5Uj/w=="
        },
        "yallist": {
          "version": "3.0.3",
          "resolved": "https://registry.npmjs.org/yallist/-/yallist-3.0.3.tgz",
          "integrity": "sha512-S+Zk8DEWE6oKpV+vI3qWkaK+jSbIK86pCwe2IF/xwIpQ8jEuxpw9NyaGjmp9+BoJv5FV2piqCDcoCtStppiq2A=="
        }
      }
    },
    "cache-base": {
      "version": "1.0.1",
      "resolved": "https://registry.npmjs.org/cache-base/-/cache-base-1.0.1.tgz",
      "integrity": "sha512-AKcdTnFSWATd5/GCPRxr2ChwIJ85CeyrEyjRHlKxQ56d4XJMGym0uAiKn0xbLOGOl3+yRpOTi484dVCEc5AUzQ==",
      "requires": {
        "collection-visit": "^1.0.0",
        "component-emitter": "^1.2.1",
        "get-value": "^2.0.6",
        "has-value": "^1.0.0",
        "isobject": "^3.0.1",
        "set-value": "^2.0.0",
        "to-object-path": "^0.3.0",
        "union-value": "^1.0.0",
        "unset-value": "^1.0.0"
      }
    },
    "call-me-maybe": {
      "version": "1.0.1",
      "resolved": "https://registry.npmjs.org/call-me-maybe/-/call-me-maybe-1.0.1.tgz",
      "integrity": "sha1-JtII6onje1y95gJQoV8DHBak1ms="
    },
    "caller-callsite": {
      "version": "2.0.0",
      "resolved": "https://registry.npmjs.org/caller-callsite/-/caller-callsite-2.0.0.tgz",
      "integrity": "sha1-hH4PzgoiN1CpoCfFSzNzGtMVQTQ=",
      "requires": {
        "callsites": "^2.0.0"
      },
      "dependencies": {
        "callsites": {
          "version": "2.0.0",
          "resolved": "https://registry.npmjs.org/callsites/-/callsites-2.0.0.tgz",
          "integrity": "sha1-BuuE8A7qQT2oav/vrL/7Ngk7PFA="
        }
      }
    },
    "caller-path": {
      "version": "0.1.0",
      "resolved": "https://registry.npmjs.org/caller-path/-/caller-path-0.1.0.tgz",
      "integrity": "sha1-lAhe9jWB7NPaqSREqP6U6CV3dR8=",
      "requires": {
        "callsites": "^0.2.0"
      }
    },
    "callsites": {
      "version": "0.2.0",
      "resolved": "https://registry.npmjs.org/callsites/-/callsites-0.2.0.tgz",
      "integrity": "sha1-r6uWJikQp/M8GaV3WCXGnzTjUMo="
    },
    "camel-case": {
      "version": "3.0.0",
      "resolved": "https://registry.npmjs.org/camel-case/-/camel-case-3.0.0.tgz",
      "integrity": "sha1-yjw2iKTpzzpM2nd9xNy8cTJJz3M=",
      "requires": {
        "no-case": "^2.2.0",
        "upper-case": "^1.1.1"
      }
    },
    "camelcase": {
      "version": "2.1.1",
      "resolved": "https://registry.npmjs.org/camelcase/-/camelcase-2.1.1.tgz",
      "integrity": "sha1-fB0W1nmhu+WcoCys7PsBHiAfWh8="
    },
    "caniuse-api": {
      "version": "3.0.0",
      "resolved": "https://registry.npmjs.org/caniuse-api/-/caniuse-api-3.0.0.tgz",
      "integrity": "sha512-bsTwuIg/BZZK/vreVTYYbSWoe2F+71P7K5QGEX+pT250DZbfU1MQ5prOKpPR+LL6uWKK3KMwMCAS74QB3Um1uw==",
      "requires": {
        "browserslist": "^4.0.0",
        "caniuse-lite": "^1.0.0",
        "lodash.memoize": "^4.1.2",
        "lodash.uniq": "^4.5.0"
      }
    },
    "caniuse-lite": {
      "version": "1.0.30000989",
      "resolved": "https://registry.npmjs.org/caniuse-lite/-/caniuse-lite-1.0.30000989.tgz",
      "integrity": "sha512-vrMcvSuMz16YY6GSVZ0dWDTJP8jqk3iFQ/Aq5iqblPwxSVVZI+zxDyTX0VPqtQsDnfdrBDcsmhgTEOh5R8Lbpw=="
    },
    "capture-exit": {
      "version": "2.0.0",
      "resolved": "https://registry.npmjs.org/capture-exit/-/capture-exit-2.0.0.tgz",
      "integrity": "sha512-PiT/hQmTonHhl/HFGN+Lx3JJUznrVYJ3+AQsnthneZbvW7x+f08Tk7yLJTLEOUvBTbduLeeBkxEaYXUOUrRq6g==",
      "requires": {
        "rsvp": "^4.8.4"
      },
      "dependencies": {
        "rsvp": {
          "version": "4.8.5",
          "resolved": "https://registry.npmjs.org/rsvp/-/rsvp-4.8.5.tgz",
          "integrity": "sha512-nfMOlASu9OnRJo1mbEk2cz0D56a1MBNrJ7orjRZQG10XDyuvwksKbuXNp6qa+kbn839HwjwhBzhFmdsaEAfauA=="
        }
      }
    },
    "capture-stack-trace": {
      "version": "1.0.1",
      "resolved": "https://registry.npmjs.org/capture-stack-trace/-/capture-stack-trace-1.0.1.tgz",
      "integrity": "sha512-mYQLZnx5Qt1JgB1WEiMCf2647plpGeQ2NMR/5L0HNZzGQo4fuSPnK+wjfPnKZV0aiJDgzmWqqkV/g7JD+DW0qw=="
    },
    "case-sensitive-paths-webpack-plugin": {
      "version": "2.2.0",
      "resolved": "https://registry.npmjs.org/case-sensitive-paths-webpack-plugin/-/case-sensitive-paths-webpack-plugin-2.2.0.tgz",
      "integrity": "sha512-u5ElzokS8A1pm9vM3/iDgTcI3xqHxuCao94Oz8etI3cf0Tio0p8izkDYbTIn09uP3yUUr6+veaE6IkjnTYS46g=="
    },
    "caseless": {
      "version": "0.12.0",
      "resolved": "https://registry.npmjs.org/caseless/-/caseless-0.12.0.tgz",
      "integrity": "sha1-G2gcIf+EAzyCZUMJBolCDRhxUdw="
    },
    "chalk": {
      "version": "1.1.3",
      "resolved": "https://registry.npmjs.org/chalk/-/chalk-1.1.3.tgz",
      "integrity": "sha1-qBFcVeSnAv5NFQq9OHKCKn4J/Jg=",
      "requires": {
        "ansi-styles": "^2.2.1",
        "escape-string-regexp": "^1.0.2",
        "has-ansi": "^2.0.0",
        "strip-ansi": "^3.0.0",
        "supports-color": "^2.0.0"
      }
    },
    "char-spinner": {
      "version": "1.0.1",
      "resolved": "https://registry.npmjs.org/char-spinner/-/char-spinner-1.0.1.tgz",
      "integrity": "sha1-5upnvSR+EHESmDt6sEee02KAAIE="
    },
    "chardet": {
      "version": "0.4.2",
      "resolved": "https://registry.npmjs.org/chardet/-/chardet-0.4.2.tgz",
      "integrity": "sha1-tUc7M9yXxCTl2Y3IfVXU2KKci/I="
    },
    "chokidar": {
      "version": "2.1.6",
      "resolved": "https://registry.npmjs.org/chokidar/-/chokidar-2.1.6.tgz",
      "integrity": "sha512-V2jUo67OKkc6ySiRpJrjlpJKl9kDuG+Xb8VgsGzb+aEouhgS1D0weyPU4lEzdAcsCAvrih2J2BqyXqHWvVLw5g==",
      "requires": {
        "anymatch": "^2.0.0",
        "async-each": "^1.0.1",
        "braces": "^2.3.2",
        "fsevents": "^1.2.7",
        "glob-parent": "^3.1.0",
        "inherits": "^2.0.3",
        "is-binary-path": "^1.0.0",
        "is-glob": "^4.0.0",
        "normalize-path": "^3.0.0",
        "path-is-absolute": "^1.0.0",
        "readdirp": "^2.2.1",
        "upath": "^1.1.1"
      },
      "dependencies": {
        "normalize-path": {
          "version": "3.0.0",
          "resolved": "https://registry.npmjs.org/normalize-path/-/normalize-path-3.0.0.tgz",
          "integrity": "sha512-6eZs5Ls3WtCisHWp9S2GUy8dqkpGi4BVSz3GaqiE6ezub0512ESztXUwUB6C6IKbQkY2Pnb/mD4WYojCRwcwLA=="
        }
      }
    },
    "chownr": {
      "version": "1.1.2",
      "resolved": "https://registry.npmjs.org/chownr/-/chownr-1.1.2.tgz",
      "integrity": "sha512-GkfeAQh+QNy3wquu9oIZr6SS5x7wGdSgNQvD10X3r+AZr1Oys22HW8kAmDMvNg2+Dm0TeGaEuO8gFwdBXxwO8A=="
    },
    "chrome-trace-event": {
      "version": "1.0.2",
      "resolved": "https://registry.npmjs.org/chrome-trace-event/-/chrome-trace-event-1.0.2.tgz",
      "integrity": "sha512-9e/zx1jw7B4CO+c/RXoCsfg/x1AfUBioy4owYH0bJprEYAx5hRFLRhWBqHAG57D0ZM4H7vxbP7bPe0VwhQRYDQ==",
      "requires": {
        "tslib": "^1.9.0"
      }
    },
    "ci-info": {
      "version": "1.6.0",
      "resolved": "https://registry.npmjs.org/ci-info/-/ci-info-1.6.0.tgz",
      "integrity": "sha512-vsGdkwSCDpWmP80ncATX7iea5DWQemg1UgCW5J8tqjU3lYw4FBYuj89J0CTVomA7BEfvSZd84GmHko+MxFQU2A=="
    },
    "cipher-base": {
      "version": "1.0.4",
      "resolved": "https://registry.npmjs.org/cipher-base/-/cipher-base-1.0.4.tgz",
      "integrity": "sha512-Kkht5ye6ZGmwv40uUDZztayT2ThLQGfnj/T71N/XzeZeo3nf8foyW7zGTsPYkEya3m5f3cAypH+qe7YOrM1U2Q==",
      "requires": {
        "inherits": "^2.0.1",
        "safe-buffer": "^5.0.1"
      }
    },
    "circular-json": {
      "version": "0.3.3",
      "resolved": "https://registry.npmjs.org/circular-json/-/circular-json-0.3.3.tgz",
      "integrity": "sha512-UZK3NBx2Mca+b5LsG7bY183pHWt5Y1xts4P3Pz7ENTwGVnJOUWbRb3ocjvX7hx9tq/yTAdclXm9sZ38gNuem4A=="
    },
    "cjson": {
      "version": "0.3.3",
      "resolved": "https://registry.npmjs.org/cjson/-/cjson-0.3.3.tgz",
      "integrity": "sha1-qS2ceG5b+bkwgGMp7gXV0yYbSvo=",
      "requires": {
        "json-parse-helpfulerror": "^1.0.3"
      }
    },
    "class-utils": {
      "version": "0.3.6",
      "resolved": "https://registry.npmjs.org/class-utils/-/class-utils-0.3.6.tgz",
      "integrity": "sha512-qOhPa/Fj7s6TY8H8esGu5QNpMMQxz79h+urzrNYN6mn+9BnxlDGf5QZ+XeCDsxSjPqsSR56XOZOJmpeurnLMeg==",
      "requires": {
        "arr-union": "^3.1.0",
        "define-property": "^0.2.5",
        "isobject": "^3.0.0",
        "static-extend": "^0.1.1"
      },
      "dependencies": {
        "define-property": {
          "version": "0.2.5",
          "resolved": "https://registry.npmjs.org/define-property/-/define-property-0.2.5.tgz",
          "integrity": "sha1-w1se+RjsPJkPmlvFe+BKrOxcgRY=",
          "requires": {
            "is-descriptor": "^0.1.0"
          }
        }
      }
    },
    "clean-css": {
      "version": "4.2.1",
      "resolved": "https://registry.npmjs.org/clean-css/-/clean-css-4.2.1.tgz",
      "integrity": "sha512-4ZxI6dy4lrY6FHzfiy1aEOXgu4LIsW2MhwG0VBKdcoGoH/XLFgaHSdLTGr4O8Be6A8r3MOphEiI8Gc1n0ecf3g==",
      "requires": {
        "source-map": "~0.6.0"
      },
      "dependencies": {
        "source-map": {
          "version": "0.6.1",
          "resolved": "https://registry.npmjs.org/source-map/-/source-map-0.6.1.tgz",
          "integrity": "sha512-UjgapumWlbMhkBgzT7Ykc5YXUT46F0iKu8SGXq0bcwP5dz/h0Plj6enJqjz1Zbq2l5WaqYnrVbwWOWMyF3F47g=="
        }
      }
    },
    "cli-boxes": {
      "version": "1.0.0",
      "resolved": "https://registry.npmjs.org/cli-boxes/-/cli-boxes-1.0.0.tgz",
      "integrity": "sha1-T6kXw+WclKAEzWH47lCdplFocUM="
    },
    "cli-color": {
      "version": "1.4.0",
      "resolved": "https://registry.npmjs.org/cli-color/-/cli-color-1.4.0.tgz",
      "integrity": "sha512-xu6RvQqqrWEo6MPR1eixqGPywhYBHRs653F9jfXB2Hx4jdM/3WxiNE1vppRmxtMIfl16SFYTpYlrnqH/HsK/2w==",
      "requires": {
        "ansi-regex": "^2.1.1",
        "d": "1",
        "es5-ext": "^0.10.46",
        "es6-iterator": "^2.0.3",
        "memoizee": "^0.4.14",
        "timers-ext": "^0.1.5"
      }
    },
    "cli-cursor": {
      "version": "2.1.0",
      "resolved": "https://registry.npmjs.org/cli-cursor/-/cli-cursor-2.1.0.tgz",
      "integrity": "sha1-s12sN2R5+sw+lHR9QdDQ9SOP/LU=",
      "requires": {
        "restore-cursor": "^2.0.0"
      }
    },
    "cli-spinners": {
      "version": "0.1.2",
      "resolved": "https://registry.npmjs.org/cli-spinners/-/cli-spinners-0.1.2.tgz",
      "integrity": "sha1-u3ZNiOGF+54eaiofGXcjGPYF4xw="
    },
    "cli-table": {
      "version": "0.3.1",
      "resolved": "https://registry.npmjs.org/cli-table/-/cli-table-0.3.1.tgz",
      "integrity": "sha1-9TsFJmqLGguTSz0IIebi3FkUriM=",
      "requires": {
        "colors": "1.0.3"
      }
    },
    "cli-width": {
      "version": "2.2.0",
      "resolved": "https://registry.npmjs.org/cli-width/-/cli-width-2.2.0.tgz",
      "integrity": "sha1-/xnt6Kml5XkyQUewwR8PvLq+1jk="
    },
    "cliui": {
      "version": "3.2.0",
      "resolved": "https://registry.npmjs.org/cliui/-/cliui-3.2.0.tgz",
      "integrity": "sha1-EgYBU3qRbSmUD5NNo7SNWFo5IT0=",
      "requires": {
        "string-width": "^1.0.1",
        "strip-ansi": "^3.0.1",
        "wrap-ansi": "^2.0.0"
      },
      "dependencies": {
        "is-fullwidth-code-point": {
          "version": "1.0.0",
          "resolved": "https://registry.npmjs.org/is-fullwidth-code-point/-/is-fullwidth-code-point-1.0.0.tgz",
          "integrity": "sha1-754xOG8DGn8NZDr4L95QxFfvAMs=",
          "requires": {
            "number-is-nan": "^1.0.0"
          }
        },
        "string-width": {
          "version": "1.0.2",
          "resolved": "https://registry.npmjs.org/string-width/-/string-width-1.0.2.tgz",
          "integrity": "sha1-EYvfW4zcUaKn5w0hHgfisLmxB9M=",
          "requires": {
            "code-point-at": "^1.0.0",
            "is-fullwidth-code-point": "^1.0.0",
            "strip-ansi": "^3.0.0"
          }
        }
      }
    },
    "clone-deep": {
      "version": "0.2.4",
      "resolved": "https://registry.npmjs.org/clone-deep/-/clone-deep-0.2.4.tgz",
      "integrity": "sha1-TnPdCen7lxzDhnDF3O2cGJZIHMY=",
      "requires": {
        "for-own": "^0.1.3",
        "is-plain-object": "^2.0.1",
        "kind-of": "^3.0.2",
        "lazy-cache": "^1.0.3",
        "shallow-clone": "^0.1.2"
      },
      "dependencies": {
        "kind-of": {
          "version": "3.2.2",
          "resolved": "https://registry.npmjs.org/kind-of/-/kind-of-3.2.2.tgz",
          "integrity": "sha1-MeohpzS6ubuw8yRm2JOupR5KPGQ=",
          "requires": {
            "is-buffer": "^1.1.5"
          }
        }
      }
    },
    "co": {
      "version": "4.6.0",
      "resolved": "https://registry.npmjs.org/co/-/co-4.6.0.tgz",
      "integrity": "sha1-bqa989hTrlTMuOR7+gvz+QMfsYQ="
    },
    "coa": {
      "version": "2.0.2",
      "resolved": "https://registry.npmjs.org/coa/-/coa-2.0.2.tgz",
      "integrity": "sha512-q5/jG+YQnSy4nRTV4F7lPepBJZ8qBNJJDBuJdoejDyLXgmL7IEo+Le2JDZudFTFt7mrCqIRaSjws4ygRCTCAXA==",
      "requires": {
        "@types/q": "^1.5.1",
        "chalk": "^2.4.1",
        "q": "^1.1.2"
      },
      "dependencies": {
        "ansi-styles": {
          "version": "3.2.1",
          "resolved": "https://registry.npmjs.org/ansi-styles/-/ansi-styles-3.2.1.tgz",
          "integrity": "sha512-VT0ZI6kZRdTh8YyJw3SMbYm/u+NqfsAxEpWO0Pf9sq8/e94WxxOpPKx9FR1FlyCtOVDNOQ+8ntlqFxiRc+r5qA==",
          "requires": {
            "color-convert": "^1.9.0"
          }
        },
        "chalk": {
          "version": "2.4.2",
          "resolved": "https://registry.npmjs.org/chalk/-/chalk-2.4.2.tgz",
          "integrity": "sha512-Mti+f9lpJNcwF4tWV8/OrTTtF1gZi+f8FqlyAdouralcFWFQWF2+NgCHShjkCb+IFBLq9buZwE1xckQU4peSuQ==",
          "requires": {
            "ansi-styles": "^3.2.1",
            "escape-string-regexp": "^1.0.5",
            "supports-color": "^5.3.0"
          }
        },
        "supports-color": {
          "version": "5.5.0",
          "resolved": "https://registry.npmjs.org/supports-color/-/supports-color-5.5.0.tgz",
          "integrity": "sha512-QjVjwdXIt408MIiAqCX4oUKsgU2EqAGzs2Ppkm4aQYbjm+ZEWEcW4SfFNTr4uMNZma0ey4f5lgLrkB0aX0QMow==",
          "requires": {
            "has-flag": "^3.0.0"
          }
        }
      }
    },
    "code-point-at": {
      "version": "1.1.0",
      "resolved": "https://registry.npmjs.org/code-point-at/-/code-point-at-1.1.0.tgz",
      "integrity": "sha1-DQcLTQQ6W+ozovGkDi7bPZpMz3c="
    },
    "collection-visit": {
      "version": "1.0.0",
      "resolved": "https://registry.npmjs.org/collection-visit/-/collection-visit-1.0.0.tgz",
      "integrity": "sha1-S8A3PBZLwykbTTaMgpzxqApZ3KA=",
      "requires": {
        "map-visit": "^1.0.0",
        "object-visit": "^1.0.0"
      }
    },
    "color": {
      "version": "3.1.2",
      "resolved": "https://registry.npmjs.org/color/-/color-3.1.2.tgz",
      "integrity": "sha512-vXTJhHebByxZn3lDvDJYw4lR5+uB3vuoHsuYA5AKuxRVn5wzzIfQKGLBmgdVRHKTJYeK5rvJcHnrd0Li49CFpg==",
      "requires": {
        "color-convert": "^1.9.1",
        "color-string": "^1.5.2"
      }
    },
    "color-convert": {
      "version": "1.9.3",
      "resolved": "https://registry.npmjs.org/color-convert/-/color-convert-1.9.3.tgz",
      "integrity": "sha512-QfAUtd+vFdAtFQcC8CCyYt1fYWxSqAiK2cSD6zDB8N3cpsEBAvRxp9zOGg6G/SHHJYAT88/az/IuDGALsNVbGg==",
      "requires": {
        "color-name": "1.1.3"
      }
    },
    "color-name": {
      "version": "1.1.3",
      "resolved": "https://registry.npmjs.org/color-name/-/color-name-1.1.3.tgz",
      "integrity": "sha1-p9BVi9icQveV3UIyj3QIMcpTvCU="
    },
    "color-string": {
      "version": "1.5.3",
      "resolved": "https://registry.npmjs.org/color-string/-/color-string-1.5.3.tgz",
      "integrity": "sha512-dC2C5qeWoYkxki5UAXapdjqO672AM4vZuPGRQfO8b5HKuKGBbKWpITyDYN7TOFKvRW7kOgAn3746clDBMDJyQw==",
      "requires": {
        "color-name": "^1.0.0",
        "simple-swizzle": "^0.2.2"
      }
    },
    "colors": {
      "version": "1.0.3",
      "resolved": "https://registry.npmjs.org/colors/-/colors-1.0.3.tgz",
      "integrity": "sha1-BDP0TYCWgP3rYO0mDxsMJi6CpAs="
    },
    "colour": {
      "version": "0.7.1",
      "resolved": "https://registry.npmjs.org/colour/-/colour-0.7.1.tgz",
      "integrity": "sha1-nLFpkX7F0SwHNtPoaFdG3xyt93g="
    },
    "combined-stream": {
      "version": "1.0.8",
      "resolved": "https://registry.npmjs.org/combined-stream/-/combined-stream-1.0.8.tgz",
      "integrity": "sha512-FQN4MRfuJeHf7cBbBMJFXhKSDq+2kAArBlmRBvcvFE5BB1HZKXtSFASDhdlz9zOYwxh8lDdnvmMOe/+5cdoEdg==",
      "requires": {
        "delayed-stream": "~1.0.0"
      }
    },
    "commander": {
      "version": "2.20.0",
      "resolved": "https://registry.npmjs.org/commander/-/commander-2.20.0.tgz",
      "integrity": "sha512-7j2y+40w61zy6YC2iRNpUe/NwhNyoXrYpHMrSunaMG64nRnaf96zO/KMQR4OyN/UnE5KLyEBnKHd4aG3rskjpQ=="
    },
    "common-tags": {
      "version": "1.8.0",
      "resolved": "https://registry.npmjs.org/common-tags/-/common-tags-1.8.0.tgz",
      "integrity": "sha512-6P6g0uetGpW/sdyUy/iQQCbFF0kWVMSIVSyYz7Zgjcgh8mgw8PQzDNZeyZ5DQ2gM7LBoZPHmnjz8rUthkBG5tw=="
    },
    "commondir": {
      "version": "1.0.1",
      "resolved": "https://registry.npmjs.org/commondir/-/commondir-1.0.1.tgz",
      "integrity": "sha1-3dgA2gxmEnOTzKWVDqloo6rxJTs="
    },
    "compare-semver": {
      "version": "1.1.0",
      "resolved": "https://registry.npmjs.org/compare-semver/-/compare-semver-1.1.0.tgz",
      "integrity": "sha1-fAp5onu4C2xplERfgpWCWdPQIVM=",
      "requires": {
        "semver": "^5.0.1"
      }
    },
    "component-emitter": {
      "version": "1.3.0",
      "resolved": "https://registry.npmjs.org/component-emitter/-/component-emitter-1.3.0.tgz",
      "integrity": "sha512-Rd3se6QB+sO1TwqZjscQrurpEPIfO0/yYnSin6Q/rD3mOutHvUrCAhJub3r90uNb+SESBuE0QYoB90YdfatsRg=="
    },
    "compress-commons": {
      "version": "1.2.2",
      "resolved": "https://registry.npmjs.org/compress-commons/-/compress-commons-1.2.2.tgz",
      "integrity": "sha1-UkqfEJA/OoEzibAiXSfEi7dRiQ8=",
      "requires": {
        "buffer-crc32": "^0.2.1",
        "crc32-stream": "^2.0.0",
        "normalize-path": "^2.0.0",
        "readable-stream": "^2.0.0"
      }
    },
    "compressible": {
      "version": "2.0.17",
      "resolved": "https://registry.npmjs.org/compressible/-/compressible-2.0.17.tgz",
      "integrity": "sha512-BGHeLCK1GV7j1bSmQQAi26X+GgWcTjLr/0tzSvMCl3LH1w1IJ4PFSPoV5316b30cneTziC+B1a+3OjoSUcQYmw==",
      "requires": {
        "mime-db": ">= 1.40.0 < 2"
      }
    },
    "compression": {
      "version": "1.7.4",
      "resolved": "https://registry.npmjs.org/compression/-/compression-1.7.4.tgz",
      "integrity": "sha512-jaSIDzP9pZVS4ZfQ+TzvtiWhdpFhE2RDHz8QJkpX9SIpLq88VueF5jJw6t+6CUQcAoA6t+x89MLrWAqpfDE8iQ==",
      "requires": {
        "accepts": "~1.3.5",
        "bytes": "3.0.0",
        "compressible": "~2.0.16",
        "debug": "2.6.9",
        "on-headers": "~1.0.2",
        "safe-buffer": "5.1.2",
        "vary": "~1.1.2"
      },
      "dependencies": {
        "bytes": {
          "version": "3.0.0",
          "resolved": "https://registry.npmjs.org/bytes/-/bytes-3.0.0.tgz",
          "integrity": "sha1-0ygVQE1olpn4Wk6k+odV3ROpYEg="
        }
      }
    },
    "concat-map": {
      "version": "0.0.1",
      "resolved": "https://registry.npmjs.org/concat-map/-/concat-map-0.0.1.tgz",
      "integrity": "sha1-2Klr13/Wjfd5OnMDajug1UBdR3s="
    },
    "concat-stream": {
      "version": "1.6.2",
      "resolved": "https://registry.npmjs.org/concat-stream/-/concat-stream-1.6.2.tgz",
      "integrity": "sha512-27HBghJxjiZtIk3Ycvn/4kbJk/1uZuJFfuPEns6LaEvpvG1f0hTea8lilrouyo9mVc2GWdcEZ8OLoGmSADlrCw==",
      "requires": {
        "buffer-from": "^1.0.0",
        "inherits": "^2.0.3",
        "readable-stream": "^2.2.2",
        "typedarray": "^0.0.6"
      }
    },
    "configstore": {
      "version": "1.4.0",
      "resolved": "https://registry.npmjs.org/configstore/-/configstore-1.4.0.tgz",
      "integrity": "sha1-w1eB0FAdJowlxUuLF/YkDopPsCE=",
      "requires": {
        "graceful-fs": "^4.1.2",
        "mkdirp": "^0.5.0",
        "object-assign": "^4.0.1",
        "os-tmpdir": "^1.0.0",
        "osenv": "^0.1.0",
        "uuid": "^2.0.1",
        "write-file-atomic": "^1.1.2",
        "xdg-basedir": "^2.0.0"
      },
      "dependencies": {
        "uuid": {
          "version": "2.0.3",
          "resolved": "https://registry.npmjs.org/uuid/-/uuid-2.0.3.tgz",
          "integrity": "sha1-Z+LoY3lyFVMN/zGOW/nc6/1Hsho="
        }
      }
    },
    "confusing-browser-globals": {
      "version": "1.0.8",
      "resolved": "https://registry.npmjs.org/confusing-browser-globals/-/confusing-browser-globals-1.0.8.tgz",
      "integrity": "sha512-lI7asCibVJ6Qd3FGU7mu4sfG4try4LX3+GVS+Gv8UlrEf2AeW57piecapnog2UHZSbcX/P/1UDWVaTsblowlZg=="
    },
    "connect": {
      "version": "3.7.0",
      "resolved": "https://registry.npmjs.org/connect/-/connect-3.7.0.tgz",
      "integrity": "sha512-ZqRXc+tZukToSNmh5C2iWMSoV3X1YUcPbqEM4DkEG5tNQXrQUZCNVGGv3IuicnkMtPfGf3Xtp8WCXs295iQ1pQ==",
      "requires": {
        "debug": "2.6.9",
        "finalhandler": "1.1.2",
        "parseurl": "~1.3.3",
        "utils-merge": "1.0.1"
      }
    },
    "connect-history-api-fallback": {
      "version": "1.6.0",
      "resolved": "https://registry.npmjs.org/connect-history-api-fallback/-/connect-history-api-fallback-1.6.0.tgz",
      "integrity": "sha512-e54B99q/OUoH64zYYRf3HBP5z24G38h5D3qXu23JGRoigpX5Ss4r9ZnDk3g0Z8uQC2x2lPaJ+UlWBc1ZWBWdLg=="
    },
    "connect-query": {
      "version": "1.0.0",
      "resolved": "https://registry.npmjs.org/connect-query/-/connect-query-1.0.0.tgz",
      "integrity": "sha1-3kT1dyCdokBNH8BGktGkEY5YIRk=",
      "requires": {
        "qs": "~6.4.0"
      },
      "dependencies": {
        "qs": {
          "version": "6.4.0",
          "resolved": "https://registry.npmjs.org/qs/-/qs-6.4.0.tgz",
          "integrity": "sha1-E+JtKK1rD/qpExLNO/cI7TUecjM="
        }
      }
    },
    "console-browserify": {
      "version": "1.1.0",
      "resolved": "https://registry.npmjs.org/console-browserify/-/console-browserify-1.1.0.tgz",
      "integrity": "sha1-8CQcRXMKn8YyOyBtvzjtx0HQuxA=",
      "requires": {
        "date-now": "^0.1.4"
      }
    },
    "constants-browserify": {
      "version": "1.0.0",
      "resolved": "https://registry.npmjs.org/constants-browserify/-/constants-browserify-1.0.0.tgz",
      "integrity": "sha1-wguW2MYXdIqvHBYCF2DNJ/y4y3U="
    },
    "contains-path": {
      "version": "0.1.0",
      "resolved": "https://registry.npmjs.org/contains-path/-/contains-path-0.1.0.tgz",
      "integrity": "sha1-/ozxhP9mcLa67wGp1IYaXL7EEgo="
    },
    "content-disposition": {
      "version": "0.5.3",
      "resolved": "https://registry.npmjs.org/content-disposition/-/content-disposition-0.5.3.tgz",
      "integrity": "sha512-ExO0774ikEObIAEV9kDo50o+79VCUdEB6n6lzKgGwupcVeRlhrj3qGAfwq8G6uBJjkqLrhT0qEYFcWng8z1z0g==",
      "requires": {
        "safe-buffer": "5.1.2"
      }
    },
    "content-type": {
      "version": "1.0.4",
      "resolved": "https://registry.npmjs.org/content-type/-/content-type-1.0.4.tgz",
      "integrity": "sha512-hIP3EEPs8tB9AT1L+NUqtwOAps4mk2Zob89MWXMHjHWg9milF/j4osnnQLXBCBFBk/tvIG/tUc9mOUJiPBhPXA=="
    },
    "convert-source-map": {
      "version": "1.6.0",
      "resolved": "https://registry.npmjs.org/convert-source-map/-/convert-source-map-1.6.0.tgz",
      "integrity": "sha512-eFu7XigvxdZ1ETfbgPBohgyQ/Z++C0eEhTor0qRwBw9unw+L0/6V8wkSuGgzdThkiS5lSpdptOQPD8Ak40a+7A==",
      "requires": {
        "safe-buffer": "~5.1.1"
      }
    },
    "cookie": {
      "version": "0.4.0",
      "resolved": "https://registry.npmjs.org/cookie/-/cookie-0.4.0.tgz",
      "integrity": "sha512-+Hp8fLp57wnUSt0tY0tHEXh4voZRDnoIrZPqlo3DPiI4y9lwg/jqx+1Om94/W6ZaPDOUbnjOt/99w66zk+l1Xg=="
    },
    "cookie-signature": {
      "version": "1.0.6",
      "resolved": "https://registry.npmjs.org/cookie-signature/-/cookie-signature-1.0.6.tgz",
      "integrity": "sha1-4wOogrNCzD7oylE6eZmXNNqzriw="
    },
    "copy-concurrently": {
      "version": "1.0.5",
      "resolved": "https://registry.npmjs.org/copy-concurrently/-/copy-concurrently-1.0.5.tgz",
      "integrity": "sha512-f2domd9fsVDFtaFcbaRZuYXwtdmnzqbADSwhSWYxYB/Q8zsdUUFMXVRwXGDMWmbEzAn1kdRrtI1T/KTFOL4X2A==",
      "requires": {
        "aproba": "^1.1.1",
        "fs-write-stream-atomic": "^1.0.8",
        "iferr": "^0.1.5",
        "mkdirp": "^0.5.1",
        "rimraf": "^2.5.4",
        "run-queue": "^1.0.0"
      }
    },
    "copy-descriptor": {
      "version": "0.1.1",
      "resolved": "https://registry.npmjs.org/copy-descriptor/-/copy-descriptor-0.1.1.tgz",
      "integrity": "sha1-Z29us8OZl8LuGsOpJP1hJHSPV40="
    },
    "core-js": {
      "version": "3.0.1",
      "resolved": "https://registry.npmjs.org/core-js/-/core-js-3.0.1.tgz",
      "integrity": "sha512-sco40rF+2KlE0ROMvydjkrVMMG1vYilP2ALoRXcYR4obqbYIuV3Bg+51GEDW+HF8n7NRA+iaA4qD0nD9lo9mew=="
    },
    "core-js-compat": {
      "version": "3.2.1",
      "resolved": "https://registry.npmjs.org/core-js-compat/-/core-js-compat-3.2.1.tgz",
      "integrity": "sha512-MwPZle5CF9dEaMYdDeWm73ao/IflDH+FjeJCWEADcEgFSE9TLimFKwJsfmkwzI8eC0Aj0mgvMDjeQjrElkz4/A==",
      "requires": {
        "browserslist": "^4.6.6",
        "semver": "^6.3.0"
      },
      "dependencies": {
        "semver": {
          "version": "6.3.0",
          "resolved": "https://registry.npmjs.org/semver/-/semver-6.3.0.tgz",
          "integrity": "sha512-b39TBaTSfV6yBrapU89p5fKekE2m/NwnDocOVruQFS1/veMgdzuPcnOM34M6CwxW8jH/lxEa5rBoDeUwu5HHTw=="
        }
      }
    },
    "core-util-is": {
      "version": "1.0.2",
      "resolved": "https://registry.npmjs.org/core-util-is/-/core-util-is-1.0.2.tgz",
      "integrity": "sha1-tf1UIgqivFq1eqtxQMlAdUUDwac="
    },
    "cosmiconfig": {
      "version": "5.2.1",
      "resolved": "https://registry.npmjs.org/cosmiconfig/-/cosmiconfig-5.2.1.tgz",
      "integrity": "sha512-H65gsXo1SKjf8zmrJ67eJk8aIRKV5ff2D4uKZIBZShbhGSpEmsQOPW/SKMKYhSTrqR7ufy6RP69rPogdaPh/kA==",
      "requires": {
        "import-fresh": "^2.0.0",
        "is-directory": "^0.3.1",
        "js-yaml": "^3.13.1",
        "parse-json": "^4.0.0"
      },
      "dependencies": {
        "parse-json": {
          "version": "4.0.0",
          "resolved": "https://registry.npmjs.org/parse-json/-/parse-json-4.0.0.tgz",
          "integrity": "sha1-vjX1Qlvh9/bHRxhPmKeIy5lHfuA=",
          "requires": {
            "error-ex": "^1.3.1",
            "json-parse-better-errors": "^1.0.1"
          }
        }
      }
    },
    "crc": {
      "version": "3.8.0",
      "resolved": "https://registry.npmjs.org/crc/-/crc-3.8.0.tgz",
      "integrity": "sha512-iX3mfgcTMIq3ZKLIsVFAbv7+Mc10kxabAGQb8HvjA1o3T1PIYprbakQ65d3I+2HGHt6nSKkM9PYjgoJO2KcFBQ==",
      "requires": {
        "buffer": "^5.1.0"
      }
    },
    "crc32-stream": {
      "version": "2.0.0",
      "resolved": "https://registry.npmjs.org/crc32-stream/-/crc32-stream-2.0.0.tgz",
      "integrity": "sha1-483TtN8xaN10494/u8t7KX/pCPQ=",
      "requires": {
        "crc": "^3.4.4",
        "readable-stream": "^2.0.0"
      }
    },
    "create-ecdh": {
      "version": "4.0.3",
      "resolved": "https://registry.npmjs.org/create-ecdh/-/create-ecdh-4.0.3.tgz",
      "integrity": "sha512-GbEHQPMOswGpKXM9kCWVrremUcBmjteUaQ01T9rkKCPDXfUHX0IoP9LpHYo2NPFampa4e+/pFDc3jQdxrxQLaw==",
      "requires": {
        "bn.js": "^4.1.0",
        "elliptic": "^6.0.0"
      }
    },
    "create-error-class": {
      "version": "3.0.2",
      "resolved": "https://registry.npmjs.org/create-error-class/-/create-error-class-3.0.2.tgz",
      "integrity": "sha1-Br56vvlHo/FKMP1hBnHUAbyot7Y=",
      "requires": {
        "capture-stack-trace": "^1.0.0"
      }
    },
    "create-hash": {
      "version": "1.2.0",
      "resolved": "https://registry.npmjs.org/create-hash/-/create-hash-1.2.0.tgz",
      "integrity": "sha512-z00bCGNHDG8mHAkP7CtT1qVu+bFQUPjYq/4Iv3C3kWjTFV10zIjfSoeqXo9Asws8gwSHDGj/hl2u4OGIjapeCg==",
      "requires": {
        "cipher-base": "^1.0.1",
        "inherits": "^2.0.1",
        "md5.js": "^1.3.4",
        "ripemd160": "^2.0.1",
        "sha.js": "^2.4.0"
      }
    },
    "create-hmac": {
      "version": "1.1.7",
      "resolved": "https://registry.npmjs.org/create-hmac/-/create-hmac-1.1.7.tgz",
      "integrity": "sha512-MJG9liiZ+ogc4TzUwuvbER1JRdgvUFSB5+VR/g5h82fGaIRWMWddtKBHi7/sVhfjQZ6SehlyhvQYrcYkaUIpLg==",
      "requires": {
        "cipher-base": "^1.0.3",
        "create-hash": "^1.1.0",
        "inherits": "^2.0.1",
        "ripemd160": "^2.0.0",
        "safe-buffer": "^5.0.1",
        "sha.js": "^2.4.8"
      }
    },
    "cross-env": {
      "version": "5.2.0",
      "resolved": "https://registry.npmjs.org/cross-env/-/cross-env-5.2.0.tgz",
      "integrity": "sha512-jtdNFfFW1hB7sMhr/H6rW1Z45LFqyI431m3qU6bFXcQ3Eh7LtBuG3h74o7ohHZ3crrRkkqHlo4jYHFPcjroANg==",
      "requires": {
        "cross-spawn": "^6.0.5",
        "is-windows": "^1.0.0"
      },
      "dependencies": {
        "cross-spawn": {
          "version": "6.0.5",
          "resolved": "https://registry.npmjs.org/cross-spawn/-/cross-spawn-6.0.5.tgz",
          "integrity": "sha512-eTVLrBSt7fjbDygz805pMnstIs2VTBNkRm0qxZd+M7A5XDdxVRWO5MxGBXZhjY4cqLYLdtrGqRf8mBPmzwSpWQ==",
          "requires": {
            "nice-try": "^1.0.4",
            "path-key": "^2.0.1",
            "semver": "^5.5.0",
            "shebang-command": "^1.2.0",
            "which": "^1.2.9"
          }
        }
      }
    },
    "cross-spawn": {
      "version": "4.0.2",
      "resolved": "https://registry.npmjs.org/cross-spawn/-/cross-spawn-4.0.2.tgz",
      "integrity": "sha1-e5JHYhwjrf3ThWAEqCPL45dCTUE=",
      "requires": {
        "lru-cache": "^4.0.1",
        "which": "^1.2.9"
      }
    },
    "crypto-browserify": {
      "version": "3.12.0",
      "resolved": "https://registry.npmjs.org/crypto-browserify/-/crypto-browserify-3.12.0.tgz",
      "integrity": "sha512-fz4spIh+znjO2VjL+IdhEpRJ3YN6sMzITSBijk6FK2UvTqruSQW+/cCZTSNsMiZNvUeq0CqurF+dAbyiGOY6Wg==",
      "requires": {
        "browserify-cipher": "^1.0.0",
        "browserify-sign": "^4.0.0",
        "create-ecdh": "^4.0.0",
        "create-hash": "^1.1.0",
        "create-hmac": "^1.1.0",
        "diffie-hellman": "^5.0.0",
        "inherits": "^2.0.1",
        "pbkdf2": "^3.0.3",
        "public-encrypt": "^4.0.0",
        "randombytes": "^2.0.0",
        "randomfill": "^1.0.3"
      }
    },
    "crypto-random-string": {
      "version": "1.0.0",
      "resolved": "https://registry.npmjs.org/crypto-random-string/-/crypto-random-string-1.0.0.tgz",
      "integrity": "sha1-ojD2T1aDEOFJgAmUB5DsmVRbyn4="
    },
    "css-blank-pseudo": {
      "version": "0.1.4",
      "resolved": "https://registry.npmjs.org/css-blank-pseudo/-/css-blank-pseudo-0.1.4.tgz",
      "integrity": "sha512-LHz35Hr83dnFeipc7oqFDmsjHdljj3TQtxGGiNWSOsTLIAubSm4TEz8qCaKFpk7idaQ1GfWscF4E6mgpBysA1w==",
      "requires": {
        "postcss": "^7.0.5"
      }
    },
    "css-color-names": {
      "version": "0.0.4",
      "resolved": "https://registry.npmjs.org/css-color-names/-/css-color-names-0.0.4.tgz",
      "integrity": "sha1-gIrcLnnPhHOAabZGyyDsJ762KeA="
    },
    "css-declaration-sorter": {
      "version": "4.0.1",
      "resolved": "https://registry.npmjs.org/css-declaration-sorter/-/css-declaration-sorter-4.0.1.tgz",
      "integrity": "sha512-BcxQSKTSEEQUftYpBVnsH4SF05NTuBokb19/sBt6asXGKZ/6VP7PLG1CBCkFDYOnhXhPh0jMhO6xZ71oYHXHBA==",
      "requires": {
        "postcss": "^7.0.1",
        "timsort": "^0.3.0"
      }
    },
    "css-has-pseudo": {
      "version": "0.10.0",
      "resolved": "https://registry.npmjs.org/css-has-pseudo/-/css-has-pseudo-0.10.0.tgz",
      "integrity": "sha512-Z8hnfsZu4o/kt+AuFzeGpLVhFOGO9mluyHBaA2bA8aCGTwah5sT3WV/fTHH8UNZUytOIImuGPrl/prlb4oX4qQ==",
      "requires": {
        "postcss": "^7.0.6",
        "postcss-selector-parser": "^5.0.0-rc.4"
      },
      "dependencies": {
        "cssesc": {
          "version": "2.0.0",
          "resolved": "https://registry.npmjs.org/cssesc/-/cssesc-2.0.0.tgz",
          "integrity": "sha512-MsCAG1z9lPdoO/IUMLSBWBSVxVtJ1395VGIQ+Fc2gNdkQ1hNDnQdw3YhA71WJCBW1vdwA0cAnk/DnW6bqoEUYg=="
        },
        "postcss-selector-parser": {
          "version": "5.0.0",
          "resolved": "https://registry.npmjs.org/postcss-selector-parser/-/postcss-selector-parser-5.0.0.tgz",
          "integrity": "sha512-w+zLE5Jhg6Liz8+rQOWEAwtwkyqpfnmsinXjXg6cY7YIONZZtgvE0v2O0uhQBs0peNomOJwWRKt6JBfTdTd3OQ==",
          "requires": {
            "cssesc": "^2.0.0",
            "indexes-of": "^1.0.1",
            "uniq": "^1.0.1"
          }
        }
      }
    },
    "css-loader": {
      "version": "2.1.1",
      "resolved": "https://registry.npmjs.org/css-loader/-/css-loader-2.1.1.tgz",
      "integrity": "sha512-OcKJU/lt232vl1P9EEDamhoO9iKY3tIjY5GU+XDLblAykTdgs6Ux9P1hTHve8nFKy5KPpOXOsVI/hIwi3841+w==",
      "requires": {
        "camelcase": "^5.2.0",
        "icss-utils": "^4.1.0",
        "loader-utils": "^1.2.3",
        "normalize-path": "^3.0.0",
        "postcss": "^7.0.14",
        "postcss-modules-extract-imports": "^2.0.0",
        "postcss-modules-local-by-default": "^2.0.6",
        "postcss-modules-scope": "^2.1.0",
        "postcss-modules-values": "^2.0.0",
        "postcss-value-parser": "^3.3.0",
        "schema-utils": "^1.0.0"
      },
      "dependencies": {
        "camelcase": {
          "version": "5.3.1",
          "resolved": "https://registry.npmjs.org/camelcase/-/camelcase-5.3.1.tgz",
          "integrity": "sha512-L28STB170nwWS63UjtlEOE3dldQApaJXZkOI1uMFfzf3rRuPegHaHesyee+YxQ+W6SvRDQV6UrdOdRiR153wJg=="
        },
        "normalize-path": {
          "version": "3.0.0",
          "resolved": "https://registry.npmjs.org/normalize-path/-/normalize-path-3.0.0.tgz",
          "integrity": "sha512-6eZs5Ls3WtCisHWp9S2GUy8dqkpGi4BVSz3GaqiE6ezub0512ESztXUwUB6C6IKbQkY2Pnb/mD4WYojCRwcwLA=="
        }
      }
    },
    "css-prefers-color-scheme": {
      "version": "3.1.1",
      "resolved": "https://registry.npmjs.org/css-prefers-color-scheme/-/css-prefers-color-scheme-3.1.1.tgz",
      "integrity": "sha512-MTu6+tMs9S3EUqzmqLXEcgNRbNkkD/TGFvowpeoWJn5Vfq7FMgsmRQs9X5NXAURiOBmOxm/lLjsDNXDE6k9bhg==",
      "requires": {
        "postcss": "^7.0.5"
      }
    },
    "css-select": {
      "version": "2.0.2",
      "resolved": "https://registry.npmjs.org/css-select/-/css-select-2.0.2.tgz",
      "integrity": "sha512-dSpYaDVoWaELjvZ3mS6IKZM/y2PMPa/XYoEfYNZePL4U/XgyxZNroHEHReDx/d+VgXh9VbCTtFqLkFbmeqeaRQ==",
      "requires": {
        "boolbase": "^1.0.0",
        "css-what": "^2.1.2",
        "domutils": "^1.7.0",
        "nth-check": "^1.0.2"
      }
    },
    "css-select-base-adapter": {
      "version": "0.1.1",
      "resolved": "https://registry.npmjs.org/css-select-base-adapter/-/css-select-base-adapter-0.1.1.tgz",
      "integrity": "sha512-jQVeeRG70QI08vSTwf1jHxp74JoZsr2XSgETae8/xC8ovSnL2WF87GTLO86Sbwdt2lK4Umg4HnnwMO4YF3Ce7w=="
    },
    "css-tree": {
      "version": "1.0.0-alpha.33",
      "resolved": "https://registry.npmjs.org/css-tree/-/css-tree-1.0.0-alpha.33.tgz",
      "integrity": "sha512-SPt57bh5nQnpsTBsx/IXbO14sRc9xXu5MtMAVuo0BaQQmyf0NupNPPSoMaqiAF5tDFafYsTkfeH4Q/HCKXkg4w==",
      "requires": {
        "mdn-data": "2.0.4",
        "source-map": "^0.5.3"
      }
    },
    "css-unit-converter": {
      "version": "1.1.1",
      "resolved": "https://registry.npmjs.org/css-unit-converter/-/css-unit-converter-1.1.1.tgz",
      "integrity": "sha1-2bkoGtz9jO2TW9urqDeGiX9k6ZY="
    },
    "css-what": {
      "version": "2.1.3",
      "resolved": "https://registry.npmjs.org/css-what/-/css-what-2.1.3.tgz",
      "integrity": "sha512-a+EPoD+uZiNfh+5fxw2nO9QwFa6nJe2Or35fGY6Ipw1R3R4AGz1d1TEZrCegvw2YTmZ0jXirGYlzxxpYSHwpEg=="
    },
    "cssdb": {
      "version": "4.4.0",
      "resolved": "https://registry.npmjs.org/cssdb/-/cssdb-4.4.0.tgz",
      "integrity": "sha512-LsTAR1JPEM9TpGhl/0p3nQecC2LJ0kD8X5YARu1hk/9I1gril5vDtMZyNxcEpxxDj34YNck/ucjuoUd66K03oQ=="
    },
    "cssesc": {
      "version": "3.0.0",
      "resolved": "https://registry.npmjs.org/cssesc/-/cssesc-3.0.0.tgz",
      "integrity": "sha512-/Tb/JcjK111nNScGob5MNtsntNM1aCNUDipB/TkwZFhyDrrE47SOx/18wF2bbjgc3ZzCSKW1T5nt5EbFoAz/Vg=="
    },
    "cssnano": {
      "version": "4.1.10",
      "resolved": "https://registry.npmjs.org/cssnano/-/cssnano-4.1.10.tgz",
      "integrity": "sha512-5wny+F6H4/8RgNlaqab4ktc3e0/blKutmq8yNlBFXA//nSFFAqAngjNVRzUvCgYROULmZZUoosL/KSoZo5aUaQ==",
      "requires": {
        "cosmiconfig": "^5.0.0",
        "cssnano-preset-default": "^4.0.7",
        "is-resolvable": "^1.0.0",
        "postcss": "^7.0.0"
      }
    },
    "cssnano-preset-default": {
      "version": "4.0.7",
      "resolved": "https://registry.npmjs.org/cssnano-preset-default/-/cssnano-preset-default-4.0.7.tgz",
      "integrity": "sha512-x0YHHx2h6p0fCl1zY9L9roD7rnlltugGu7zXSKQx6k2rYw0Hi3IqxcoAGF7u9Q5w1nt7vK0ulxV8Lo+EvllGsA==",
      "requires": {
        "css-declaration-sorter": "^4.0.1",
        "cssnano-util-raw-cache": "^4.0.1",
        "postcss": "^7.0.0",
        "postcss-calc": "^7.0.1",
        "postcss-colormin": "^4.0.3",
        "postcss-convert-values": "^4.0.1",
        "postcss-discard-comments": "^4.0.2",
        "postcss-discard-duplicates": "^4.0.2",
        "postcss-discard-empty": "^4.0.1",
        "postcss-discard-overridden": "^4.0.1",
        "postcss-merge-longhand": "^4.0.11",
        "postcss-merge-rules": "^4.0.3",
        "postcss-minify-font-values": "^4.0.2",
        "postcss-minify-gradients": "^4.0.2",
        "postcss-minify-params": "^4.0.2",
        "postcss-minify-selectors": "^4.0.2",
        "postcss-normalize-charset": "^4.0.1",
        "postcss-normalize-display-values": "^4.0.2",
        "postcss-normalize-positions": "^4.0.2",
        "postcss-normalize-repeat-style": "^4.0.2",
        "postcss-normalize-string": "^4.0.2",
        "postcss-normalize-timing-functions": "^4.0.2",
        "postcss-normalize-unicode": "^4.0.1",
        "postcss-normalize-url": "^4.0.1",
        "postcss-normalize-whitespace": "^4.0.2",
        "postcss-ordered-values": "^4.1.2",
        "postcss-reduce-initial": "^4.0.3",
        "postcss-reduce-transforms": "^4.0.2",
        "postcss-svgo": "^4.0.2",
        "postcss-unique-selectors": "^4.0.1"
      }
    },
    "cssnano-util-get-arguments": {
      "version": "4.0.0",
      "resolved": "https://registry.npmjs.org/cssnano-util-get-arguments/-/cssnano-util-get-arguments-4.0.0.tgz",
      "integrity": "sha1-7ToIKZ8h11dBsg87gfGU7UnMFQ8="
    },
    "cssnano-util-get-match": {
      "version": "4.0.0",
      "resolved": "https://registry.npmjs.org/cssnano-util-get-match/-/cssnano-util-get-match-4.0.0.tgz",
      "integrity": "sha1-wOTKB/U4a7F+xeUiULT1lhNlFW0="
    },
    "cssnano-util-raw-cache": {
      "version": "4.0.1",
      "resolved": "https://registry.npmjs.org/cssnano-util-raw-cache/-/cssnano-util-raw-cache-4.0.1.tgz",
      "integrity": "sha512-qLuYtWK2b2Dy55I8ZX3ky1Z16WYsx544Q0UWViebptpwn/xDBmog2TLg4f+DBMg1rJ6JDWtn96WHbOKDWt1WQA==",
      "requires": {
        "postcss": "^7.0.0"
      }
    },
    "cssnano-util-same-parent": {
      "version": "4.0.1",
      "resolved": "https://registry.npmjs.org/cssnano-util-same-parent/-/cssnano-util-same-parent-4.0.1.tgz",
      "integrity": "sha512-WcKx5OY+KoSIAxBW6UBBRay1U6vkYheCdjyVNDm85zt5K9mHoGOfsOsqIszfAqrQQFIIKgjh2+FDgIj/zsl21Q=="
    },
    "csso": {
      "version": "3.5.1",
      "resolved": "https://registry.npmjs.org/csso/-/csso-3.5.1.tgz",
      "integrity": "sha512-vrqULLffYU1Q2tLdJvaCYbONStnfkfimRxXNaGjxMldI0C7JPBC4rB1RyjhfdZ4m1frm8pM9uRPKH3d2knZ8gg==",
      "requires": {
        "css-tree": "1.0.0-alpha.29"
      },
      "dependencies": {
        "css-tree": {
          "version": "1.0.0-alpha.29",
          "resolved": "https://registry.npmjs.org/css-tree/-/css-tree-1.0.0-alpha.29.tgz",
          "integrity": "sha512-sRNb1XydwkW9IOci6iB2xmy8IGCj6r/fr+JWitvJ2JxQRPzN3T4AGGVWCMlVmVwM1gtgALJRmGIlWv5ppnGGkg==",
          "requires": {
            "mdn-data": "~1.1.0",
            "source-map": "^0.5.3"
          }
        },
        "mdn-data": {
          "version": "1.1.4",
          "resolved": "https://registry.npmjs.org/mdn-data/-/mdn-data-1.1.4.tgz",
          "integrity": "sha512-FSYbp3lyKjyj3E7fMl6rYvUdX0FBXaluGqlFoYESWQlyUTq8R+wp0rkFxoYFqZlHCvsUXGjyJmLQSnXToYhOSA=="
        }
      }
    },
    "cssom": {
      "version": "0.3.8",
      "resolved": "https://registry.npmjs.org/cssom/-/cssom-0.3.8.tgz",
      "integrity": "sha512-b0tGHbfegbhPJpxpiBPU2sCkigAqtM9O121le6bbOlgyV+NyGyCmVfJ6QW9eRjz8CpNfWEOYBIMIGRYkLwsIYg=="
    },
    "cssstyle": {
      "version": "1.4.0",
      "resolved": "https://registry.npmjs.org/cssstyle/-/cssstyle-1.4.0.tgz",
      "integrity": "sha512-GBrLZYZ4X4x6/QEoBnIrqb8B/f5l4+8me2dkom/j1Gtbxy0kBv6OGzKuAsGM75bkGwGAFkt56Iwg28S3XTZgSA==",
      "requires": {
        "cssom": "0.3.x"
      }
    },
    "csv-streamify": {
      "version": "3.0.4",
      "resolved": "https://registry.npmjs.org/csv-streamify/-/csv-streamify-3.0.4.tgz",
      "integrity": "sha1-TLYUxX4/KZzKF7Y/3LStFnd39Ho=",
      "requires": {
        "through2": "2.0.1"
      }
    },
    "cycle": {
      "version": "1.0.3",
      "resolved": "https://registry.npmjs.org/cycle/-/cycle-1.0.3.tgz",
      "integrity": "sha1-IegLK+hYD5i0aPN5QwZisEbDStI="
    },
    "cyclist": {
      "version": "0.2.2",
      "resolved": "https://registry.npmjs.org/cyclist/-/cyclist-0.2.2.tgz",
      "integrity": "sha1-GzN5LhHpFKL9bW7WRHRkRE5fpkA="
    },
    "d": {
      "version": "1.0.1",
      "resolved": "https://registry.npmjs.org/d/-/d-1.0.1.tgz",
      "integrity": "sha512-m62ShEObQ39CfralilEQRjH6oAMtNCV1xJyEx5LpRYUVN+EviphDgUc/F3hnYbADmkiNs67Y+3ylmlG7Lnu+FA==",
      "requires": {
        "es5-ext": "^0.10.50",
        "type": "^1.0.1"
      }
    },
    "damerau-levenshtein": {
      "version": "1.0.5",
      "resolved": "https://registry.npmjs.org/damerau-levenshtein/-/damerau-levenshtein-1.0.5.tgz",
      "integrity": "sha512-CBCRqFnpu715iPmw1KrdOrzRqbdFwQTwAWyyyYS42+iAgHCuXZ+/TdMgQkUENPomxEz9z1BEzuQU2Xw0kUuAgA=="
    },
    "dashdash": {
      "version": "1.14.1",
      "resolved": "https://registry.npmjs.org/dashdash/-/dashdash-1.14.1.tgz",
      "integrity": "sha1-hTz6D3y+L+1d4gMmuN1YEDX24vA=",
      "requires": {
        "assert-plus": "^1.0.0"
      }
    },
    "data-urls": {
      "version": "1.1.0",
      "resolved": "https://registry.npmjs.org/data-urls/-/data-urls-1.1.0.tgz",
      "integrity": "sha512-YTWYI9se1P55u58gL5GkQHW4P6VJBJ5iBT+B5a7i2Tjadhv52paJG0qHX4A0OR6/t52odI64KP2YvFpkDOi3eQ==",
      "requires": {
        "abab": "^2.0.0",
        "whatwg-mimetype": "^2.2.0",
        "whatwg-url": "^7.0.0"
      },
      "dependencies": {
        "whatwg-url": {
          "version": "7.0.0",
          "resolved": "https://registry.npmjs.org/whatwg-url/-/whatwg-url-7.0.0.tgz",
          "integrity": "sha512-37GeVSIJ3kn1JgKyjiYNmSLP1yzbpb29jdmwBSgkD9h40/hyrR/OifpVUndji3tmwGgD8qpw7iQu3RSbCrBpsQ==",
          "requires": {
            "lodash.sortby": "^4.7.0",
            "tr46": "^1.0.1",
            "webidl-conversions": "^4.0.2"
          }
        }
      }
    },
    "date-now": {
      "version": "0.1.4",
      "resolved": "https://registry.npmjs.org/date-now/-/date-now-0.1.4.tgz",
      "integrity": "sha1-6vQ5/U1ISK105cx9vvIAZyueNFs="
    },
    "debug": {
      "version": "2.6.9",
      "resolved": "https://registry.npmjs.org/debug/-/debug-2.6.9.tgz",
      "integrity": "sha512-bC7ElrdJaJnPbAP+1EotYvqZsb3ecl5wi6Bfi6BJTUcNowp6cvspg0jXznRTKDjm/E7AdgFBVeAPVMNcKGsHMA==",
      "requires": {
        "ms": "2.0.0"
      }
    },
    "decamelize": {
      "version": "1.2.0",
      "resolved": "https://registry.npmjs.org/decamelize/-/decamelize-1.2.0.tgz",
      "integrity": "sha1-9lNNFRSCabIDUue+4m9QH5oZEpA="
    },
    "decode-uri-component": {
      "version": "0.2.0",
      "resolved": "https://registry.npmjs.org/decode-uri-component/-/decode-uri-component-0.2.0.tgz",
      "integrity": "sha1-6zkTMzRYd1y4TNGh+uBiEGu4dUU="
    },
    "deep-equal": {
      "version": "1.0.1",
      "resolved": "https://registry.npmjs.org/deep-equal/-/deep-equal-1.0.1.tgz",
      "integrity": "sha1-9dJgKStmDghO/0zbyfCK0yR0SLU="
    },
    "deep-extend": {
      "version": "0.6.0",
      "resolved": "https://registry.npmjs.org/deep-extend/-/deep-extend-0.6.0.tgz",
      "integrity": "sha512-LOHxIOaPYdHlJRtCQfDIVZtfw/ufM8+rVj649RIHzcm/vGwQRXFt6OPqIFWsm2XEMrNIEtWR64sY1LEKD2vAOA=="
    },
    "deep-is": {
      "version": "0.1.3",
      "resolved": "https://registry.npmjs.org/deep-is/-/deep-is-0.1.3.tgz",
      "integrity": "sha1-s2nW+128E+7PUk+RsHD+7cNXzzQ="
    },
    "default-gateway": {
      "version": "4.2.0",
      "resolved": "https://registry.npmjs.org/default-gateway/-/default-gateway-4.2.0.tgz",
      "integrity": "sha512-h6sMrVB1VMWVrW13mSc6ia/DwYYw5MN6+exNu1OaJeFac5aSAvwM7lZ0NVfTABuSkQelr4h5oebg3KB1XPdjgA==",
      "requires": {
        "execa": "^1.0.0",
        "ip-regex": "^2.1.0"
      },
      "dependencies": {
        "cross-spawn": {
          "version": "6.0.5",
          "resolved": "https://registry.npmjs.org/cross-spawn/-/cross-spawn-6.0.5.tgz",
          "integrity": "sha512-eTVLrBSt7fjbDygz805pMnstIs2VTBNkRm0qxZd+M7A5XDdxVRWO5MxGBXZhjY4cqLYLdtrGqRf8mBPmzwSpWQ==",
          "requires": {
            "nice-try": "^1.0.4",
            "path-key": "^2.0.1",
            "semver": "^5.5.0",
            "shebang-command": "^1.2.0",
            "which": "^1.2.9"
          }
        },
        "execa": {
          "version": "1.0.0",
          "resolved": "https://registry.npmjs.org/execa/-/execa-1.0.0.tgz",
          "integrity": "sha512-adbxcyWV46qiHyvSp50TKt05tB4tK3HcmF7/nxfAdhnox83seTDbwnaqKO4sXRy7roHAIFqJP/Rw/AuEbX61LA==",
          "requires": {
            "cross-spawn": "^6.0.0",
            "get-stream": "^4.0.0",
            "is-stream": "^1.1.0",
            "npm-run-path": "^2.0.0",
            "p-finally": "^1.0.0",
            "signal-exit": "^3.0.0",
            "strip-eof": "^1.0.0"
          }
        },
        "get-stream": {
          "version": "4.1.0",
          "resolved": "https://registry.npmjs.org/get-stream/-/get-stream-4.1.0.tgz",
          "integrity": "sha512-GMat4EJ5161kIy2HevLlr4luNjBgvmj413KaQA7jt4V8B4RDsfpHk7WQ9GVqfYyyx8OS/L66Kox+rJRNklLK7w==",
          "requires": {
            "pump": "^3.0.0"
          }
        }
      }
    },
    "define-properties": {
      "version": "1.1.3",
      "resolved": "https://registry.npmjs.org/define-properties/-/define-properties-1.1.3.tgz",
      "integrity": "sha512-3MqfYKj2lLzdMSf8ZIZE/V+Zuy+BgD6f164e8K2w7dgnpKArBDerGYpM46IYYcjnkdPNMjPk9A6VFB8+3SKlXQ==",
      "requires": {
        "object-keys": "^1.0.12"
      }
    },
    "define-property": {
      "version": "2.0.2",
      "resolved": "https://registry.npmjs.org/define-property/-/define-property-2.0.2.tgz",
      "integrity": "sha512-jwK2UV4cnPpbcG7+VRARKTZPUWowwXA8bzH5NP6ud0oeAxyYPuGZUAC7hMugpCdz4BeSZl2Dl9k66CHJ/46ZYQ==",
      "requires": {
        "is-descriptor": "^1.0.2",
        "isobject": "^3.0.1"
      },
      "dependencies": {
        "is-accessor-descriptor": {
          "version": "1.0.0",
          "resolved": "https://registry.npmjs.org/is-accessor-descriptor/-/is-accessor-descriptor-1.0.0.tgz",
          "integrity": "sha512-m5hnHTkcVsPfqx3AKlyttIPb7J+XykHvJP2B9bZDjlhLIoEq4XoK64Vg7boZlVWYK6LUY94dYPEE7Lh0ZkZKcQ==",
          "requires": {
            "kind-of": "^6.0.0"
          }
        },
        "is-data-descriptor": {
          "version": "1.0.0",
          "resolved": "https://registry.npmjs.org/is-data-descriptor/-/is-data-descriptor-1.0.0.tgz",
          "integrity": "sha512-jbRXy1FmtAoCjQkVmIVYwuuqDFUbaOeDjmed1tOGPrsMhtJA4rD9tkgA0F1qJ3gRFRXcHYVkdeaP50Q5rE/jLQ==",
          "requires": {
            "kind-of": "^6.0.0"
          }
        },
        "is-descriptor": {
          "version": "1.0.2",
          "resolved": "https://registry.npmjs.org/is-descriptor/-/is-descriptor-1.0.2.tgz",
          "integrity": "sha512-2eis5WqQGV7peooDyLmNEPUrps9+SXX5c9pL3xEB+4e9HnGuDa7mB7kHxHw4CbqS9k1T2hOH3miL8n8WtiYVtg==",
          "requires": {
            "is-accessor-descriptor": "^1.0.0",
            "is-data-descriptor": "^1.0.0",
            "kind-of": "^6.0.2"
          }
        }
      }
    },
    "del": {
      "version": "3.0.0",
      "resolved": "https://registry.npmjs.org/del/-/del-3.0.0.tgz",
      "integrity": "sha1-U+z2mf/LyzljdpGrE7rxYIGXZuU=",
      "requires": {
        "globby": "^6.1.0",
        "is-path-cwd": "^1.0.0",
        "is-path-in-cwd": "^1.0.0",
        "p-map": "^1.1.1",
        "pify": "^3.0.0",
        "rimraf": "^2.2.8"
      },
      "dependencies": {
        "globby": {
          "version": "6.1.0",
          "resolved": "https://registry.npmjs.org/globby/-/globby-6.1.0.tgz",
          "integrity": "sha1-9abXDoOV4hyFj7BInWTfAkJNUGw=",
          "requires": {
            "array-union": "^1.0.1",
            "glob": "^7.0.3",
            "object-assign": "^4.0.1",
            "pify": "^2.0.0",
            "pinkie-promise": "^2.0.0"
          },
          "dependencies": {
            "pify": {
              "version": "2.3.0",
              "resolved": "https://registry.npmjs.org/pify/-/pify-2.3.0.tgz",
              "integrity": "sha1-7RQaasBDqEnqWISY59yosVMw6Qw="
            }
          }
        },
        "pify": {
          "version": "3.0.0",
          "resolved": "https://registry.npmjs.org/pify/-/pify-3.0.0.tgz",
          "integrity": "sha1-5aSs0sEB/fPZpNB/DbxNtJ3SgXY="
        }
      }
    },
    "delayed-stream": {
      "version": "1.0.0",
      "resolved": "https://registry.npmjs.org/delayed-stream/-/delayed-stream-1.0.0.tgz",
      "integrity": "sha1-3zrhmayt+31ECqrgsp4icrJOxhk="
    },
    "depd": {
      "version": "1.1.2",
      "resolved": "https://registry.npmjs.org/depd/-/depd-1.1.2.tgz",
      "integrity": "sha1-m81S4UwJd2PnSbJ0xDRu0uVgtak="
    },
    "des.js": {
      "version": "1.0.0",
      "resolved": "https://registry.npmjs.org/des.js/-/des.js-1.0.0.tgz",
      "integrity": "sha1-wHTS4qpqipoH29YfmhXCzYPsjsw=",
      "requires": {
        "inherits": "^2.0.1",
        "minimalistic-assert": "^1.0.0"
      }
    },
    "destroy": {
      "version": "1.0.4",
      "resolved": "https://registry.npmjs.org/destroy/-/destroy-1.0.4.tgz",
      "integrity": "sha1-l4hXRCxEdJ5CBmE+N5RiBYJqvYA="
    },
    "detect-newline": {
      "version": "2.1.0",
      "resolved": "https://registry.npmjs.org/detect-newline/-/detect-newline-2.1.0.tgz",
      "integrity": "sha1-9B8cEL5LAOh7XxPaaAdZ8sW/0+I="
    },
    "detect-node": {
      "version": "2.0.4",
      "resolved": "https://registry.npmjs.org/detect-node/-/detect-node-2.0.4.tgz",
      "integrity": "sha512-ZIzRpLJrOj7jjP2miAtgqIfmzbxa4ZOr5jJc601zklsfEx9oTzmmj2nVpIPRpNlRTIh8lc1kyViIY7BWSGNmKw=="
    },
    "detect-port-alt": {
      "version": "1.1.6",
      "resolved": "https://registry.npmjs.org/detect-port-alt/-/detect-port-alt-1.1.6.tgz",
      "integrity": "sha512-5tQykt+LqfJFBEYaDITx7S7cR7mJ/zQmLXZ2qt5w04ainYZw6tBf9dBunMjVeVOdYVRUzUOE4HkY5J7+uttb5Q==",
      "requires": {
        "address": "^1.0.1",
        "debug": "^2.6.0"
      }
    },
    "didyoumean": {
      "version": "1.2.1",
      "resolved": "https://registry.npmjs.org/didyoumean/-/didyoumean-1.2.1.tgz",
      "integrity": "sha1-6S7f2tplN9SE1zwBcv0eugxJdv8="
    },
    "diff-sequences": {
      "version": "24.9.0",
      "resolved": "https://registry.npmjs.org/diff-sequences/-/diff-sequences-24.9.0.tgz",
      "integrity": "sha512-Dj6Wk3tWyTE+Fo1rW8v0Xhwk80um6yFYKbuAxc9c3EZxIHFDYwbi34Uk42u1CdnIiVorvt4RmlSDjIPyzGC2ew=="
    },
    "diffie-hellman": {
      "version": "5.0.3",
      "resolved": "https://registry.npmjs.org/diffie-hellman/-/diffie-hellman-5.0.3.tgz",
      "integrity": "sha512-kqag/Nl+f3GwyK25fhUMYj81BUOrZ9IuJsjIcDE5icNM9FJHAVm3VcUDxdLPoQtTuUylWm6ZIknYJwwaPxsUzg==",
      "requires": {
        "bn.js": "^4.1.0",
        "miller-rabin": "^4.0.0",
        "randombytes": "^2.0.0"
      }
    },
    "dir-glob": {
      "version": "2.0.0",
      "resolved": "https://registry.npmjs.org/dir-glob/-/dir-glob-2.0.0.tgz",
      "integrity": "sha512-37qirFDz8cA5fimp9feo43fSuRo2gHwaIn6dXL8Ber1dGwUosDrGZeCCXq57WnIqE4aQ+u3eQZzsk1yOzhdwag==",
      "requires": {
        "arrify": "^1.0.1",
        "path-type": "^3.0.0"
      },
      "dependencies": {
        "path-type": {
          "version": "3.0.0",
          "resolved": "https://registry.npmjs.org/path-type/-/path-type-3.0.0.tgz",
          "integrity": "sha512-T2ZUsdZFHgA3u4e5PfPbjd7HDDpxPnQb5jN0SrDsjNSuVXHJqtwTnWqG0B1jZrgmJ/7lj1EmVIByWt1gxGkWvg==",
          "requires": {
            "pify": "^3.0.0"
          }
        },
        "pify": {
          "version": "3.0.0",
          "resolved": "https://registry.npmjs.org/pify/-/pify-3.0.0.tgz",
          "integrity": "sha1-5aSs0sEB/fPZpNB/DbxNtJ3SgXY="
        }
      }
    },
    "dns-equal": {
      "version": "1.0.0",
      "resolved": "https://registry.npmjs.org/dns-equal/-/dns-equal-1.0.0.tgz",
      "integrity": "sha1-s55/HabrCnW6nBcySzR1PEfgZU0="
    },
    "dns-packet": {
      "version": "1.3.1",
      "resolved": "https://registry.npmjs.org/dns-packet/-/dns-packet-1.3.1.tgz",
      "integrity": "sha512-0UxfQkMhYAUaZI+xrNZOz/as5KgDU0M/fQ9b6SpkyLbk3GEswDi6PADJVaYJradtRVsRIlF1zLyOodbcTCDzUg==",
      "requires": {
        "ip": "^1.1.0",
        "safe-buffer": "^5.0.1"
      }
    },
    "dns-txt": {
      "version": "2.0.2",
      "resolved": "https://registry.npmjs.org/dns-txt/-/dns-txt-2.0.2.tgz",
      "integrity": "sha1-uR2Ab10nGI5Ks+fRB9iBocxGQrY=",
      "requires": {
        "buffer-indexof": "^1.0.0"
      }
    },
    "doctrine": {
      "version": "2.1.0",
      "resolved": "https://registry.npmjs.org/doctrine/-/doctrine-2.1.0.tgz",
      "integrity": "sha512-35mSku4ZXK0vfCuHEDAwt55dg2jNajHZ1odvF+8SSr82EsZY4QmXfuWso8oEd8zRhVObSN18aM0CjSdoBX7zIw==",
      "requires": {
        "esutils": "^2.0.2"
      }
    },
    "dom-converter": {
      "version": "0.2.0",
      "resolved": "https://registry.npmjs.org/dom-converter/-/dom-converter-0.2.0.tgz",
      "integrity": "sha512-gd3ypIPfOMr9h5jIKq8E3sHOTCjeirnl0WK5ZdS1AW0Odt0b1PaWaHdJ4Qk4klv+YB9aJBS7mESXjFoDQPu6DA==",
      "requires": {
        "utila": "~0.4"
      }
    },
    "dom-serializer": {
      "version": "0.2.1",
      "resolved": "https://registry.npmjs.org/dom-serializer/-/dom-serializer-0.2.1.tgz",
      "integrity": "sha512-sK3ujri04WyjwQXVoK4PU3y8ula1stq10GJZpqHIUgoGZdsGzAGu65BnU3d08aTVSvO7mGPZUc0wTEDL+qGE0Q==",
      "requires": {
        "domelementtype": "^2.0.1",
        "entities": "^2.0.0"
      },
      "dependencies": {
        "domelementtype": {
          "version": "2.0.1",
          "resolved": "https://registry.npmjs.org/domelementtype/-/domelementtype-2.0.1.tgz",
          "integrity": "sha512-5HOHUDsYZWV8FGWN0Njbr/Rn7f/eWSQi1v7+HsUVwXgn8nWWlL64zKDkS0n8ZmQ3mlWOMuXOnR+7Nx/5tMO5AQ=="
        }
      }
    },
    "dom-storage": {
      "version": "2.1.0",
      "resolved": "https://registry.npmjs.org/dom-storage/-/dom-storage-2.1.0.tgz",
      "integrity": "sha512-g6RpyWXzl0RR6OTElHKBl7nwnK87GUyZMYC7JWsB/IA73vpqK2K6LT39x4VepLxlSsWBFrPVLnsSR5Jyty0+2Q=="
    },
    "dom-walk": {
      "version": "0.1.1",
      "resolved": "https://registry.npmjs.org/dom-walk/-/dom-walk-0.1.1.tgz",
      "integrity": "sha1-ZyIm3HTI95mtNTB9+TaroRrNYBg="
    },
    "domain-browser": {
      "version": "1.2.0",
      "resolved": "https://registry.npmjs.org/domain-browser/-/domain-browser-1.2.0.tgz",
      "integrity": "sha512-jnjyiM6eRyZl2H+W8Q/zLMA481hzi0eszAaBUzIVnmYVDBbnLxVNnfu1HgEBvCbL+71FrxMl3E6lpKH7Ge3OXA=="
    },
    "domelementtype": {
      "version": "1.3.1",
      "resolved": "https://registry.npmjs.org/domelementtype/-/domelementtype-1.3.1.tgz",
      "integrity": "sha512-BSKB+TSpMpFI/HOxCNr1O8aMOTZ8hT3pM3GQ0w/mWRmkhEDSFJkkyzz4XQsBV44BChwGkrDfMyjVD0eA2aFV3w=="
    },
    "domexception": {
      "version": "1.0.1",
      "resolved": "https://registry.npmjs.org/domexception/-/domexception-1.0.1.tgz",
      "integrity": "sha512-raigMkn7CJNNo6Ihro1fzG7wr3fHuYVytzquZKX5n0yizGsTcYgzdIUwj1X9pK0VvjeihV+XiclP+DjwbsSKug==",
      "requires": {
        "webidl-conversions": "^4.0.2"
      }
    },
    "domhandler": {
      "version": "2.4.2",
      "resolved": "https://registry.npmjs.org/domhandler/-/domhandler-2.4.2.tgz",
      "integrity": "sha512-JiK04h0Ht5u/80fdLMCEmV4zkNh2BcoMFBmZ/91WtYZ8qVXSKjiw7fXMgFPnHcSZgOo3XdinHvmnDUeMf5R4wA==",
      "requires": {
        "domelementtype": "1"
      }
    },
    "domutils": {
      "version": "1.7.0",
      "resolved": "https://registry.npmjs.org/domutils/-/domutils-1.7.0.tgz",
      "integrity": "sha512-Lgd2XcJ/NjEw+7tFvfKxOzCYKZsdct5lczQ2ZaQY8Djz7pfAD3Gbp8ySJWtreII/vDlMVmxwa6pHmdxIYgttDg==",
      "requires": {
        "dom-serializer": "0",
        "domelementtype": "1"
      }
    },
    "dot-prop": {
      "version": "4.2.0",
      "resolved": "https://registry.npmjs.org/dot-prop/-/dot-prop-4.2.0.tgz",
      "integrity": "sha512-tUMXrxlExSW6U2EXiiKGSBVdYgtV8qlHL+C10TsW4PURY/ic+eaysnSkwB4kA/mBlCyy/IKDJ+Lc3wbWeaXtuQ==",
      "requires": {
        "is-obj": "^1.0.0"
      }
    },
    "dotenv": {
      "version": "6.2.0",
      "resolved": "https://registry.npmjs.org/dotenv/-/dotenv-6.2.0.tgz",
      "integrity": "sha512-HygQCKUBSFl8wKQZBSemMywRWcEDNidvNbjGVyZu3nbZ8qq9ubiPoGLMdRDpfSrpkkm9BXYFkpKxxFX38o/76w=="
    },
    "dotenv-expand": {
      "version": "4.2.0",
      "resolved": "https://registry.npmjs.org/dotenv-expand/-/dotenv-expand-4.2.0.tgz",
      "integrity": "sha1-3vHxyl1gWdJKdm5YeULCEQbOEnU="
    },
    "duplexer": {
      "version": "0.1.1",
      "resolved": "https://registry.npmjs.org/duplexer/-/duplexer-0.1.1.tgz",
      "integrity": "sha1-rOb/gIwc5mtX0ev5eXessCM0z8E="
    },
    "duplexer3": {
      "version": "0.1.4",
      "resolved": "https://registry.npmjs.org/duplexer3/-/duplexer3-0.1.4.tgz",
      "integrity": "sha1-7gHdHKwO08vH/b6jfcCo8c4ALOI="
    },
    "duplexify": {
      "version": "3.7.1",
      "resolved": "https://registry.npmjs.org/duplexify/-/duplexify-3.7.1.tgz",
      "integrity": "sha512-07z8uv2wMyS51kKhD1KsdXJg5WQ6t93RneqRxUHnskXVtlYYkLqM0gqStQZ3pj073g687jPCHrqNfCzawLYh5g==",
      "requires": {
        "end-of-stream": "^1.0.0",
        "inherits": "^2.0.1",
        "readable-stream": "^2.0.0",
        "stream-shift": "^1.0.0"
      }
    },
    "ecc-jsbn": {
      "version": "0.1.2",
      "resolved": "https://registry.npmjs.org/ecc-jsbn/-/ecc-jsbn-0.1.2.tgz",
      "integrity": "sha1-OoOpBOVDUyh4dMVkt1SThoSamMk=",
      "requires": {
        "jsbn": "~0.1.0",
        "safer-buffer": "^2.1.0"
      }
    },
    "ecdsa-sig-formatter": {
      "version": "1.0.11",
      "resolved": "https://registry.npmjs.org/ecdsa-sig-formatter/-/ecdsa-sig-formatter-1.0.11.tgz",
      "integrity": "sha512-nagl3RYrbNv6kQkeJIpt6NJZy8twLB/2vtz6yN9Z4vRKHN4/QZJIEbqohALSgwKdnksuY3k5Addp5lg8sVoVcQ==",
      "requires": {
        "safe-buffer": "^5.0.1"
      }
    },
    "ee-first": {
      "version": "1.1.1",
      "resolved": "https://registry.npmjs.org/ee-first/-/ee-first-1.1.1.tgz",
      "integrity": "sha1-WQxhFWsK4vTwJVcyoViyZrxWsh0="
    },
    "electron-to-chromium": {
      "version": "1.3.234",
      "resolved": "https://registry.npmjs.org/electron-to-chromium/-/electron-to-chromium-1.3.234.tgz",
      "integrity": "sha512-SVXY503NJLFAqBx8VdJaO47G+qUQggHgRjZnyjH9/SZ1w0CJpeBrEssNPk71TeKU8OGHdYjjNNHeJ6v+TJoCBg=="
    },
    "elliptic": {
      "version": "6.5.0",
      "resolved": "https://registry.npmjs.org/elliptic/-/elliptic-6.5.0.tgz",
      "integrity": "sha512-eFOJTMyCYb7xtE/caJ6JJu+bhi67WCYNbkGSknu20pmM8Ke/bqOfdnZWxyoGN26JgfxTbXrsCkEw4KheCT/KGg==",
      "requires": {
        "bn.js": "^4.4.0",
        "brorand": "^1.0.1",
        "hash.js": "^1.0.0",
        "hmac-drbg": "^1.0.0",
        "inherits": "^2.0.1",
        "minimalistic-assert": "^1.0.0",
        "minimalistic-crypto-utils": "^1.0.0"
      }
    },
    "emoji-regex": {
      "version": "6.5.1",
      "resolved": "https://registry.npmjs.org/emoji-regex/-/emoji-regex-6.5.1.tgz",
      "integrity": "sha512-PAHp6TxrCy7MGMFidro8uikr+zlJJKJ/Q6mm2ExZ7HwkyR9lSVFfE3kt36qcwa24BQL7y0G9axycGjK1A/0uNQ=="
    },
    "emojis-list": {
      "version": "2.1.0",
      "resolved": "https://registry.npmjs.org/emojis-list/-/emojis-list-2.1.0.tgz",
      "integrity": "sha1-TapNnbAPmBmIDHn6RXrlsJof04k="
    },
    "encodeurl": {
      "version": "1.0.2",
      "resolved": "https://registry.npmjs.org/encodeurl/-/encodeurl-1.0.2.tgz",
      "integrity": "sha1-rT/0yG7C0CkyL1oCw6mmBslbP1k="
    },
    "encoding": {
      "version": "0.1.12",
      "resolved": "https://registry.npmjs.org/encoding/-/encoding-0.1.12.tgz",
      "integrity": "sha1-U4tm8+5izRq1HsMjgp0flIDHS+s=",
      "requires": {
        "iconv-lite": "~0.4.13"
      }
    },
    "end-of-stream": {
      "version": "1.4.1",
      "resolved": "https://registry.npmjs.org/end-of-stream/-/end-of-stream-1.4.1.tgz",
      "integrity": "sha512-1MkrZNvWTKCaigbn+W15elq2BB/L22nqrSY5DKlo3X6+vclJm8Bb5djXJBmEX6fS3+zCh/F4VBK5Z2KxJt4s2Q==",
      "requires": {
        "once": "^1.4.0"
      }
    },
    "enhanced-resolve": {
      "version": "4.1.0",
      "resolved": "https://registry.npmjs.org/enhanced-resolve/-/enhanced-resolve-4.1.0.tgz",
      "integrity": "sha512-F/7vkyTtyc/llOIn8oWclcB25KdRaiPBpZYDgJHgh/UHtpgT2p2eldQgtQnLtUvfMKPKxbRaQM/hHkvLHt1Vng==",
      "requires": {
        "graceful-fs": "^4.1.2",
        "memory-fs": "^0.4.0",
        "tapable": "^1.0.0"
      }
    },
    "entities": {
      "version": "2.0.0",
      "resolved": "https://registry.npmjs.org/entities/-/entities-2.0.0.tgz",
      "integrity": "sha512-D9f7V0JSRwIxlRI2mjMqufDrRDnx8p+eEOz7aUM9SuvF8gsBzra0/6tbjl1m8eQHrZlYj6PxqE00hZ1SAIKPLw=="
    },
    "errno": {
      "version": "0.1.7",
      "resolved": "https://registry.npmjs.org/errno/-/errno-0.1.7.tgz",
      "integrity": "sha512-MfrRBDWzIWifgq6tJj60gkAwtLNb6sQPlcFrSOflcP1aFmmruKQ2wRnze/8V6kgyz7H3FF8Npzv78mZ7XLLflg==",
      "requires": {
        "prr": "~1.0.1"
      }
    },
    "error-ex": {
      "version": "1.3.2",
      "resolved": "https://registry.npmjs.org/error-ex/-/error-ex-1.3.2.tgz",
      "integrity": "sha512-7dFHNmqeFSEt2ZBsCriorKnn3Z2pj+fd9kmI6QoWw4//DL+icEBfc0U7qJCisqrTsKTjw4fNFy2pW9OqStD84g==",
      "requires": {
        "is-arrayish": "^0.2.1"
      }
    },
    "es-abstract": {
      "version": "1.13.0",
      "resolved": "https://registry.npmjs.org/es-abstract/-/es-abstract-1.13.0.tgz",
      "integrity": "sha512-vDZfg/ykNxQVwup/8E1BZhVzFfBxs9NqMzGcvIJrqg5k2/5Za2bWo40dK2J1pgLngZ7c+Shh8lwYtLGyrwPutg==",
      "requires": {
        "es-to-primitive": "^1.2.0",
        "function-bind": "^1.1.1",
        "has": "^1.0.3",
        "is-callable": "^1.1.4",
        "is-regex": "^1.0.4",
        "object-keys": "^1.0.12"
      }
    },
    "es-to-primitive": {
      "version": "1.2.0",
      "resolved": "https://registry.npmjs.org/es-to-primitive/-/es-to-primitive-1.2.0.tgz",
      "integrity": "sha512-qZryBOJjV//LaxLTV6UC//WewneB3LcXOL9NP++ozKVXsIIIpm/2c13UDiD9Jp2eThsecw9m3jPqDwTyobcdbg==",
      "requires": {
        "is-callable": "^1.1.4",
        "is-date-object": "^1.0.1",
        "is-symbol": "^1.0.2"
      }
    },
    "es5-ext": {
      "version": "0.10.50",
      "resolved": "https://registry.npmjs.org/es5-ext/-/es5-ext-0.10.50.tgz",
      "integrity": "sha512-KMzZTPBkeQV/JcSQhI5/z6d9VWJ3EnQ194USTUwIYZ2ZbpN8+SGXQKt1h68EX44+qt+Fzr8DO17vnxrw7c3agw==",
      "requires": {
        "es6-iterator": "~2.0.3",
        "es6-symbol": "~3.1.1",
        "next-tick": "^1.0.0"
      }
    },
    "es6-iterator": {
      "version": "2.0.3",
      "resolved": "https://registry.npmjs.org/es6-iterator/-/es6-iterator-2.0.3.tgz",
      "integrity": "sha1-p96IkUGgWpSwhUQDstCg+/qY87c=",
      "requires": {
        "d": "1",
        "es5-ext": "^0.10.35",
        "es6-symbol": "^3.1.1"
      }
    },
    "es6-symbol": {
      "version": "3.1.1",
      "resolved": "https://registry.npmjs.org/es6-symbol/-/es6-symbol-3.1.1.tgz",
      "integrity": "sha1-vwDvT9q2uhtG7Le2KbTH7VcVzHc=",
      "requires": {
        "d": "1",
        "es5-ext": "~0.10.14"
      }
    },
    "es6-weak-map": {
      "version": "2.0.3",
      "resolved": "https://registry.npmjs.org/es6-weak-map/-/es6-weak-map-2.0.3.tgz",
      "integrity": "sha512-p5um32HOTO1kP+w7PRnB+5lQ43Z6muuMuIMffvDN8ZB4GcnjLBV6zGStpbASIMk4DCAvEaamhe2zhyCb/QXXsA==",
      "requires": {
        "d": "1",
        "es5-ext": "^0.10.46",
        "es6-iterator": "^2.0.3",
        "es6-symbol": "^3.1.1"
      }
    },
    "escape-html": {
      "version": "1.0.3",
      "resolved": "https://registry.npmjs.org/escape-html/-/escape-html-1.0.3.tgz",
      "integrity": "sha1-Aljq5NPQwJdN4cFpGI7wBR0dGYg="
    },
    "escape-string-regexp": {
      "version": "1.0.5",
      "resolved": "https://registry.npmjs.org/escape-string-regexp/-/escape-string-regexp-1.0.5.tgz",
      "integrity": "sha1-G2HAViGQqN/2rjuyzwIAyhMLhtQ="
    },
    "escodegen": {
      "version": "1.12.0",
      "resolved": "https://registry.npmjs.org/escodegen/-/escodegen-1.12.0.tgz",
      "integrity": "sha512-TuA+EhsanGcme5T3R0L80u4t8CpbXQjegRmf7+FPTJrtCTErXFeelblRgHQa1FofEzqYYJmJ/OqjTwREp9qgmg==",
      "requires": {
        "esprima": "^3.1.3",
        "estraverse": "^4.2.0",
        "esutils": "^2.0.2",
        "optionator": "^0.8.1",
        "source-map": "~0.6.1"
      },
      "dependencies": {
        "esprima": {
          "version": "3.1.3",
          "resolved": "https://registry.npmjs.org/esprima/-/esprima-3.1.3.tgz",
          "integrity": "sha1-/cpRzuYTOJXjyI1TXOSdv/YqRjM="
        },
        "source-map": {
          "version": "0.6.1",
          "resolved": "https://registry.npmjs.org/source-map/-/source-map-0.6.1.tgz",
          "integrity": "sha512-UjgapumWlbMhkBgzT7Ykc5YXUT46F0iKu8SGXq0bcwP5dz/h0Plj6enJqjz1Zbq2l5WaqYnrVbwWOWMyF3F47g==",
          "optional": true
        }
      }
    },
    "eslint": {
      "version": "4.1.1",
      "resolved": "https://registry.npmjs.org/eslint/-/eslint-4.1.1.tgz",
      "integrity": "sha1-+svfz+Pg+s06i4DcmMTmwTrlgt8=",
      "requires": {
        "babel-code-frame": "^6.22.0",
        "chalk": "^1.1.3",
        "concat-stream": "^1.6.0",
        "debug": "^2.6.8",
        "doctrine": "^2.0.0",
        "eslint-scope": "^3.7.1",
        "espree": "^3.4.3",
        "esquery": "^1.0.0",
        "estraverse": "^4.2.0",
        "esutils": "^2.0.2",
        "file-entry-cache": "^2.0.0",
        "glob": "^7.1.2",
        "globals": "^9.17.0",
        "ignore": "^3.3.3",
        "imurmurhash": "^0.1.4",
        "inquirer": "^3.0.6",
        "is-my-json-valid": "^2.16.0",
        "is-resolvable": "^1.0.0",
        "js-yaml": "^3.8.4",
        "json-stable-stringify": "^1.0.1",
        "levn": "^0.3.0",
        "lodash": "^4.17.4",
        "minimatch": "^3.0.2",
        "mkdirp": "^0.5.1",
        "natural-compare": "^1.4.0",
        "optionator": "^0.8.2",
        "path-is-inside": "^1.0.2",
        "pluralize": "^4.0.0",
        "progress": "^2.0.0",
        "require-uncached": "^1.0.3",
        "strip-json-comments": "~2.0.1",
        "table": "^4.0.1",
        "text-table": "~0.2.0"
      }
    },
    "eslint-config-react-app": {
      "version": "4.0.1",
      "resolved": "https://registry.npmjs.org/eslint-config-react-app/-/eslint-config-react-app-4.0.1.tgz",
      "integrity": "sha512-ZsaoXUIGsK8FCi/x4lT2bZR5mMkL/Kgj+Lnw690rbvvUr/uiwgFiD8FcfAhkCycm7Xte6O5lYz4EqMx2vX7jgw==",
      "requires": {
        "confusing-browser-globals": "^1.0.7"
      }
    },
    "eslint-import-resolver-node": {
      "version": "0.2.3",
      "resolved": "https://registry.npmjs.org/eslint-import-resolver-node/-/eslint-import-resolver-node-0.2.3.tgz",
      "integrity": "sha1-Wt2BBujJKNssuiMrzZ76hG49oWw=",
      "requires": {
        "debug": "^2.2.0",
        "object-assign": "^4.0.1",
        "resolve": "^1.1.6"
      }
    },
    "eslint-loader": {
      "version": "2.1.2",
      "resolved": "https://registry.npmjs.org/eslint-loader/-/eslint-loader-2.1.2.tgz",
      "integrity": "sha512-rA9XiXEOilLYPOIInvVH5S/hYfyTPyxag6DZhoQOduM+3TkghAEQ3VcFO8VnX4J4qg/UIBzp72aOf/xvYmpmsg==",
      "requires": {
        "loader-fs-cache": "^1.0.0",
        "loader-utils": "^1.0.2",
        "object-assign": "^4.0.1",
        "object-hash": "^1.1.4",
        "rimraf": "^2.6.1"
      }
    },
    "eslint-module-utils": {
      "version": "2.4.1",
      "resolved": "https://registry.npmjs.org/eslint-module-utils/-/eslint-module-utils-2.4.1.tgz",
      "integrity": "sha512-H6DOj+ejw7Tesdgbfs4jeS4YMFrT8uI8xwd1gtQqXssaR0EQ26L+2O/w6wkYFy2MymON0fTwHmXBvvfLNZVZEw==",
      "requires": {
        "debug": "^2.6.8",
        "pkg-dir": "^2.0.0"
      }
    },
    "eslint-plugin-flowtype": {
      "version": "2.34.1",
      "resolved": "https://registry.npmjs.org/eslint-plugin-flowtype/-/eslint-plugin-flowtype-2.34.1.tgz",
      "integrity": "sha512-xwXpTW7Xv+wfuQdfPILmFl9HWBdWbDjE1aZWWQ4EgCpQtMzymEkDQfyD1ME0VA8C0HTXV7cufypQRvLi+Hk/og==",
      "requires": {
        "lodash": "^4.15.0"
      }
    },
    "eslint-plugin-import": {
      "version": "2.6.0",
      "resolved": "https://registry.npmjs.org/eslint-plugin-import/-/eslint-plugin-import-2.6.0.tgz",
      "integrity": "sha512-JdkYDmMMjhxW6X/IVclD+vQXO6e2nJJT4cKcyTw95mvBCWkr8THXKFhc+WCvGvOscjGuLQzUB7tBeJddrg2jig==",
      "requires": {
        "builtin-modules": "^1.1.1",
        "contains-path": "^0.1.0",
        "debug": "^2.6.8",
        "doctrine": "1.5.0",
        "eslint-import-resolver-node": "^0.2.0",
        "eslint-module-utils": "^2.0.0",
        "has": "^1.0.1",
        "lodash.cond": "^4.3.0",
        "minimatch": "^3.0.3",
        "read-pkg-up": "^2.0.0"
      },
      "dependencies": {
        "doctrine": {
          "version": "1.5.0",
          "resolved": "https://registry.npmjs.org/doctrine/-/doctrine-1.5.0.tgz",
          "integrity": "sha1-N53Ocw9hZvds76TmcHoVmwLFpvo=",
          "requires": {
            "esutils": "^2.0.2",
            "isarray": "^1.0.0"
          }
        }
      }
    },
    "eslint-plugin-jsx-a11y": {
      "version": "5.1.1",
      "resolved": "https://registry.npmjs.org/eslint-plugin-jsx-a11y/-/eslint-plugin-jsx-a11y-5.1.1.tgz",
      "integrity": "sha512-5I9SpoP7gT4wBFOtXT8/tXNPYohHBVfyVfO17vkbC7r9kEIxYJF12D3pKqhk8+xnk12rfxKClS3WCFpVckFTPQ==",
      "requires": {
        "aria-query": "^0.7.0",
        "array-includes": "^3.0.3",
        "ast-types-flow": "0.0.7",
        "axobject-query": "^0.1.0",
        "damerau-levenshtein": "^1.0.0",
        "emoji-regex": "^6.1.0",
        "jsx-ast-utils": "^1.4.0"
      }
    },
    "eslint-plugin-react": {
      "version": "7.1.0",
      "resolved": "https://registry.npmjs.org/eslint-plugin-react/-/eslint-plugin-react-7.1.0.tgz",
      "integrity": "sha1-J3cKzzn1/UnNCvQIPOWBBOs5DUw=",
      "requires": {
        "doctrine": "^2.0.0",
        "has": "^1.0.1",
        "jsx-ast-utils": "^1.4.1"
      }
    },
    "eslint-plugin-react-hooks": {
      "version": "1.7.0",
      "resolved": "https://registry.npmjs.org/eslint-plugin-react-hooks/-/eslint-plugin-react-hooks-1.7.0.tgz",
      "integrity": "sha512-iXTCFcOmlWvw4+TOE8CLWj6yX1GwzT0Y6cUfHHZqWnSk144VmVIRcVGtUAzrLES7C798lmvnt02C7rxaOX1HNA=="
    },
    "eslint-scope": {
      "version": "3.7.3",
      "resolved": "https://registry.npmjs.org/eslint-scope/-/eslint-scope-3.7.3.tgz",
      "integrity": "sha512-W+B0SvF4gamyCTmUc+uITPY0989iXVfKvhwtmJocTaYoc/3khEHmEmvfY/Gn9HA9VV75jrQECsHizkNw1b68FA==",
      "requires": {
        "esrecurse": "^4.1.0",
        "estraverse": "^4.1.1"
      }
    },
    "eslint-utils": {
      "version": "1.4.0",
      "resolved": "https://registry.npmjs.org/eslint-utils/-/eslint-utils-1.4.0.tgz",
      "integrity": "sha512-7ehnzPaP5IIEh1r1tkjuIrxqhNkzUJa9z3R92tLJdZIVdWaczEhr3EbhGtsMrVxi1KeR8qA7Off6SWc5WNQqyQ==",
      "requires": {
        "eslint-visitor-keys": "^1.0.0"
      }
    },
    "eslint-visitor-keys": {
      "version": "1.1.0",
      "resolved": "https://registry.npmjs.org/eslint-visitor-keys/-/eslint-visitor-keys-1.1.0.tgz",
      "integrity": "sha512-8y9YjtM1JBJU/A9Kc+SbaOV4y29sSWckBwMHa+FGtVj5gN/sbnKDf6xJUl+8g7FAij9LVaP8C24DUiH/f/2Z9A=="
    },
    "espree": {
      "version": "3.5.4",
      "resolved": "https://registry.npmjs.org/espree/-/espree-3.5.4.tgz",
      "integrity": "sha512-yAcIQxtmMiB/jL32dzEp2enBeidsB7xWPLNiw3IIkpVds1P+h7qF9YwJq1yUNzp2OKXgAprs4F61ih66UsoD1A==",
      "requires": {
        "acorn": "^5.5.0",
        "acorn-jsx": "^3.0.0"
      }
    },
    "esprima": {
      "version": "4.0.1",
      "resolved": "https://registry.npmjs.org/esprima/-/esprima-4.0.1.tgz",
      "integrity": "sha512-eGuFFw7Upda+g4p+QHvnW0RyTX/SVeJBDM/gCtMARO0cLuT2HcEKnTPvhjV6aGeqrCB/sbNop0Kszm0jsaWU4A=="
    },
    "esquery": {
      "version": "1.0.1",
      "resolved": "https://registry.npmjs.org/esquery/-/esquery-1.0.1.tgz",
      "integrity": "sha512-SmiyZ5zIWH9VM+SRUReLS5Q8a7GxtRdxEBVZpm98rJM7Sb+A9DVCndXfkeFUd3byderg+EbDkfnevfCwynWaNA==",
      "requires": {
        "estraverse": "^4.0.0"
      }
    },
    "esrecurse": {
      "version": "4.2.1",
      "resolved": "https://registry.npmjs.org/esrecurse/-/esrecurse-4.2.1.tgz",
      "integrity": "sha512-64RBB++fIOAXPw3P9cy89qfMlvZEXZkqqJkjqqXIvzP5ezRZjW+lPWjw35UX/3EhUPFYbg5ER4JYgDw4007/DQ==",
      "requires": {
        "estraverse": "^4.1.0"
      }
    },
    "estraverse": {
      "version": "4.3.0",
      "resolved": "https://registry.npmjs.org/estraverse/-/estraverse-4.3.0.tgz",
      "integrity": "sha512-39nnKffWz8xN1BU/2c79n9nB9HDzo0niYUqx6xyqUnyoAnQyyWpOTdZEeiCch8BBu515t4wp9ZmgVfVhn9EBpw=="
    },
    "esutils": {
      "version": "2.0.3",
      "resolved": "https://registry.npmjs.org/esutils/-/esutils-2.0.3.tgz",
      "integrity": "sha512-kVscqXk4OCp68SZ0dkgEKVi6/8ij300KBWTJq32P/dYeWTSwK41WyTxalN1eRmA5Z9UU/LX9D7FWSmV9SAYx6g=="
    },
    "etag": {
      "version": "1.8.1",
      "resolved": "https://registry.npmjs.org/etag/-/etag-1.8.1.tgz",
      "integrity": "sha1-Qa4u62XvpiJorr/qg6x9eSmbCIc="
    },
    "event-emitter": {
      "version": "0.3.5",
      "resolved": "https://registry.npmjs.org/event-emitter/-/event-emitter-0.3.5.tgz",
      "integrity": "sha1-34xp7vFkeSPHFXuc6DhAYQsCzDk=",
      "requires": {
        "d": "1",
        "es5-ext": "~0.10.14"
      }
    },
    "eventemitter3": {
      "version": "3.1.2",
      "resolved": "https://registry.npmjs.org/eventemitter3/-/eventemitter3-3.1.2.tgz",
      "integrity": "sha512-tvtQIeLVHjDkJYnzf2dgVMxfuSGJeM/7UCG17TT4EumTfNtF+0nebF/4zWOIkCreAbtNqhGEboB6BWrwqNaw4Q=="
    },
    "events": {
      "version": "3.0.0",
      "resolved": "https://registry.npmjs.org/events/-/events-3.0.0.tgz",
      "integrity": "sha512-Dc381HFWJzEOhQ+d8pkNon++bk9h6cdAoAj4iE6Q4y6xgTzySWXlKn05/TVNpjnfRqi/X0EpJEJohPjNI3zpVA=="
    },
    "eventsource": {
      "version": "1.0.7",
      "resolved": "https://registry.npmjs.org/eventsource/-/eventsource-1.0.7.tgz",
      "integrity": "sha512-4Ln17+vVT0k8aWq+t/bF5arcS3EpT9gYtW66EPacdj/mAFevznsnyoHLPy2BA8gbIQeIHoPsvwmfBftfcG//BQ==",
      "requires": {
        "original": "^1.0.0"
      }
    },
    "evp_bytestokey": {
      "version": "1.0.3",
      "resolved": "https://registry.npmjs.org/evp_bytestokey/-/evp_bytestokey-1.0.3.tgz",
      "integrity": "sha512-/f2Go4TognH/KvCISP7OUsHn85hT9nUkxxA9BEWxFn+Oj9o8ZNLm/40hdlgSLyuOimsrTKLUMEorQexp/aPQeA==",
      "requires": {
        "md5.js": "^1.3.4",
        "safe-buffer": "^5.1.1"
      }
    },
    "exec-sh": {
      "version": "0.3.2",
      "resolved": "https://registry.npmjs.org/exec-sh/-/exec-sh-0.3.2.tgz",
      "integrity": "sha512-9sLAvzhI5nc8TpuQUh4ahMdCrWT00wPWz7j47/emR5+2qEfoZP5zzUXvx+vdx+H6ohhnsYC31iX04QLYJK8zTg=="
    },
    "execa": {
      "version": "0.7.0",
      "resolved": "https://registry.npmjs.org/execa/-/execa-0.7.0.tgz",
      "integrity": "sha1-lEvs00zEHuMqY6n68nrVpl/Fl3c=",
      "requires": {
        "cross-spawn": "^5.0.1",
        "get-stream": "^3.0.0",
        "is-stream": "^1.1.0",
        "npm-run-path": "^2.0.0",
        "p-finally": "^1.0.0",
        "signal-exit": "^3.0.0",
        "strip-eof": "^1.0.0"
      },
      "dependencies": {
        "cross-spawn": {
          "version": "5.1.0",
          "resolved": "https://registry.npmjs.org/cross-spawn/-/cross-spawn-5.1.0.tgz",
          "integrity": "sha1-6L0O/uWPz/b4+UUQoKVUu/ojVEk=",
          "requires": {
            "lru-cache": "^4.0.1",
            "shebang-command": "^1.2.0",
            "which": "^1.2.9"
          }
        }
      }
    },
    "exenv": {
      "version": "1.2.2",
      "resolved": "https://registry.npmjs.org/exenv/-/exenv-1.2.2.tgz",
      "integrity": "sha1-KueOhdmJQVhnCwPUe+wfA72Ru50="
    },
    "exit": {
      "version": "0.1.2",
      "resolved": "https://registry.npmjs.org/exit/-/exit-0.1.2.tgz",
      "integrity": "sha1-BjJjj42HfMghB9MKD/8aF8uhzQw="
    },
    "exit-code": {
      "version": "1.0.2",
      "resolved": "https://registry.npmjs.org/exit-code/-/exit-code-1.0.2.tgz",
      "integrity": "sha1-zhZYEcnxF69qX4gpQLlq5/muzDQ="
    },
    "exit-hook": {
      "version": "1.1.1",
      "resolved": "https://registry.npmjs.org/exit-hook/-/exit-hook-1.1.1.tgz",
      "integrity": "sha1-8FyiM7SMBdVP/wd2XfhQfpXAL/g="
    },
    "expand-brackets": {
      "version": "2.1.4",
      "resolved": "https://registry.npmjs.org/expand-brackets/-/expand-brackets-2.1.4.tgz",
      "integrity": "sha1-t3c14xXOMPa27/D4OwQVGiJEliI=",
      "requires": {
        "debug": "^2.3.3",
        "define-property": "^0.2.5",
        "extend-shallow": "^2.0.1",
        "posix-character-classes": "^0.1.0",
        "regex-not": "^1.0.0",
        "snapdragon": "^0.8.1",
        "to-regex": "^3.0.1"
      },
      "dependencies": {
        "define-property": {
          "version": "0.2.5",
          "resolved": "https://registry.npmjs.org/define-property/-/define-property-0.2.5.tgz",
          "integrity": "sha1-w1se+RjsPJkPmlvFe+BKrOxcgRY=",
          "requires": {
            "is-descriptor": "^0.1.0"
          }
        },
        "extend-shallow": {
          "version": "2.0.1",
          "resolved": "https://registry.npmjs.org/extend-shallow/-/extend-shallow-2.0.1.tgz",
          "integrity": "sha1-Ua99YUrZqfYQ6huvu5idaxxWiQ8=",
          "requires": {
            "is-extendable": "^0.1.0"
          }
        }
      }
    },
    "expect": {
      "version": "24.9.0",
      "resolved": "https://registry.npmjs.org/expect/-/expect-24.9.0.tgz",
      "integrity": "sha512-wvVAx8XIol3Z5m9zvZXiyZOQ+sRJqNTIm6sGjdWlaZIeupQGO3WbYI+15D/AmEwZywL6wtJkbAbJtzkOfBuR0Q==",
      "requires": {
        "@jest/types": "^24.9.0",
        "ansi-styles": "^3.2.0",
        "jest-get-type": "^24.9.0",
        "jest-matcher-utils": "^24.9.0",
        "jest-message-util": "^24.9.0",
        "jest-regex-util": "^24.9.0"
      },
      "dependencies": {
        "ansi-styles": {
          "version": "3.2.1",
          "resolved": "https://registry.npmjs.org/ansi-styles/-/ansi-styles-3.2.1.tgz",
          "integrity": "sha512-VT0ZI6kZRdTh8YyJw3SMbYm/u+NqfsAxEpWO0Pf9sq8/e94WxxOpPKx9FR1FlyCtOVDNOQ+8ntlqFxiRc+r5qA==",
          "requires": {
            "color-convert": "^1.9.0"
          }
        }
      }
    },
    "express": {
      "version": "4.17.1",
      "resolved": "https://registry.npmjs.org/express/-/express-4.17.1.tgz",
      "integrity": "sha512-mHJ9O79RqluphRrcw2X/GTh3k9tVv8YcoyY4Kkh4WDMUYKRZUq0h1o0w2rrrxBqM7VoeUVqgb27xlEMXTnYt4g==",
      "requires": {
        "accepts": "~1.3.7",
        "array-flatten": "1.1.1",
        "body-parser": "1.19.0",
        "content-disposition": "0.5.3",
        "content-type": "~1.0.4",
        "cookie": "0.4.0",
        "cookie-signature": "1.0.6",
        "debug": "2.6.9",
        "depd": "~1.1.2",
        "encodeurl": "~1.0.2",
        "escape-html": "~1.0.3",
        "etag": "~1.8.1",
        "finalhandler": "~1.1.2",
        "fresh": "0.5.2",
        "merge-descriptors": "1.0.1",
        "methods": "~1.1.2",
        "on-finished": "~2.3.0",
        "parseurl": "~1.3.3",
        "path-to-regexp": "0.1.7",
        "proxy-addr": "~2.0.5",
        "qs": "6.7.0",
        "range-parser": "~1.2.1",
        "safe-buffer": "5.1.2",
        "send": "0.17.1",
        "serve-static": "1.14.1",
        "setprototypeof": "1.1.1",
        "statuses": "~1.5.0",
        "type-is": "~1.6.18",
        "utils-merge": "1.0.1",
        "vary": "~1.1.2"
      },
      "dependencies": {
        "path-to-regexp": {
          "version": "0.1.7",
          "resolved": "https://registry.npmjs.org/path-to-regexp/-/path-to-regexp-0.1.7.tgz",
          "integrity": "sha1-32BBeABfUi8V60SQ5yR6G/qmf4w="
        }
      }
    },
    "extend": {
      "version": "3.0.2",
      "resolved": "https://registry.npmjs.org/extend/-/extend-3.0.2.tgz",
      "integrity": "sha512-fjquC59cD7CyW6urNXK0FBufkZcoiGG80wTuPujX590cB5Ttln20E2UB4S/WARVqhXffZl2LNgS+gQdPIIim/g=="
    },
    "extend-shallow": {
      "version": "3.0.2",
      "resolved": "https://registry.npmjs.org/extend-shallow/-/extend-shallow-3.0.2.tgz",
      "integrity": "sha1-Jqcarwc7OfshJxcnRhMcJwQCjbg=",
      "requires": {
        "assign-symbols": "^1.0.0",
        "is-extendable": "^1.0.1"
      },
      "dependencies": {
        "is-extendable": {
          "version": "1.0.1",
          "resolved": "https://registry.npmjs.org/is-extendable/-/is-extendable-1.0.1.tgz",
          "integrity": "sha512-arnXMxT1hhoKo9k1LZdmlNyJdDDfy2v0fXjFlmok4+i8ul/6WlbVge9bhM74OpNPQPMGUToDtz+KXa1PneJxOA==",
          "requires": {
            "is-plain-object": "^2.0.4"
          }
        }
      }
    },
    "external-editor": {
      "version": "2.2.0",
      "resolved": "https://registry.npmjs.org/external-editor/-/external-editor-2.2.0.tgz",
      "integrity": "sha512-bSn6gvGxKt+b7+6TKEv1ZycHleA7aHhRHyAqJyp5pbUFuYYNIzpZnQDk7AsYckyWdEnTeAnay0aCy2aV6iTk9A==",
      "requires": {
        "chardet": "^0.4.0",
        "iconv-lite": "^0.4.17",
        "tmp": "^0.0.33"
      }
    },
    "extglob": {
      "version": "2.0.4",
      "resolved": "https://registry.npmjs.org/extglob/-/extglob-2.0.4.tgz",
      "integrity": "sha512-Nmb6QXkELsuBr24CJSkilo6UHHgbekK5UiZgfE6UHD3Eb27YC6oD+bhcT+tJ6cl8dmsgdQxnWlcry8ksBIBLpw==",
      "requires": {
        "array-unique": "^0.3.2",
        "define-property": "^1.0.0",
        "expand-brackets": "^2.1.4",
        "extend-shallow": "^2.0.1",
        "fragment-cache": "^0.2.1",
        "regex-not": "^1.0.0",
        "snapdragon": "^0.8.1",
        "to-regex": "^3.0.1"
      },
      "dependencies": {
        "define-property": {
          "version": "1.0.0",
          "resolved": "https://registry.npmjs.org/define-property/-/define-property-1.0.0.tgz",
          "integrity": "sha1-dp66rz9KY6rTr56NMEybvnm/sOY=",
          "requires": {
            "is-descriptor": "^1.0.0"
          }
        },
        "extend-shallow": {
          "version": "2.0.1",
          "resolved": "https://registry.npmjs.org/extend-shallow/-/extend-shallow-2.0.1.tgz",
          "integrity": "sha1-Ua99YUrZqfYQ6huvu5idaxxWiQ8=",
          "requires": {
            "is-extendable": "^0.1.0"
          }
        },
        "is-accessor-descriptor": {
          "version": "1.0.0",
          "resolved": "https://registry.npmjs.org/is-accessor-descriptor/-/is-accessor-descriptor-1.0.0.tgz",
          "integrity": "sha512-m5hnHTkcVsPfqx3AKlyttIPb7J+XykHvJP2B9bZDjlhLIoEq4XoK64Vg7boZlVWYK6LUY94dYPEE7Lh0ZkZKcQ==",
          "requires": {
            "kind-of": "^6.0.0"
          }
        },
        "is-data-descriptor": {
          "version": "1.0.0",
          "resolved": "https://registry.npmjs.org/is-data-descriptor/-/is-data-descriptor-1.0.0.tgz",
          "integrity": "sha512-jbRXy1FmtAoCjQkVmIVYwuuqDFUbaOeDjmed1tOGPrsMhtJA4rD9tkgA0F1qJ3gRFRXcHYVkdeaP50Q5rE/jLQ==",
          "requires": {
            "kind-of": "^6.0.0"
          }
        },
        "is-descriptor": {
          "version": "1.0.2",
          "resolved": "https://registry.npmjs.org/is-descriptor/-/is-descriptor-1.0.2.tgz",
          "integrity": "sha512-2eis5WqQGV7peooDyLmNEPUrps9+SXX5c9pL3xEB+4e9HnGuDa7mB7kHxHw4CbqS9k1T2hOH3miL8n8WtiYVtg==",
          "requires": {
            "is-accessor-descriptor": "^1.0.0",
            "is-data-descriptor": "^1.0.0",
            "kind-of": "^6.0.2"
          }
        }
      }
    },
    "extsprintf": {
      "version": "1.3.0",
      "resolved": "https://registry.npmjs.org/extsprintf/-/extsprintf-1.3.0.tgz",
      "integrity": "sha1-lpGEQOMEGnpBT4xS48V06zw+HgU="
    },
    "eyes": {
      "version": "0.1.8",
      "resolved": "https://registry.npmjs.org/eyes/-/eyes-0.1.8.tgz",
      "integrity": "sha1-Ys8SAjTGg3hdkCNIqADvPgzCC8A="
    },
    "fast-deep-equal": {
      "version": "2.0.1",
      "resolved": "https://registry.npmjs.org/fast-deep-equal/-/fast-deep-equal-2.0.1.tgz",
      "integrity": "sha1-ewUhjd+WZ79/Nwv3/bLLFf3Qqkk="
    },
    "fast-glob": {
      "version": "2.2.7",
      "resolved": "https://registry.npmjs.org/fast-glob/-/fast-glob-2.2.7.tgz",
      "integrity": "sha512-g1KuQwHOZAmOZMuBtHdxDtju+T2RT8jgCC9aANsbpdiDDTSnjgfuVsIBNKbUeJI3oKMRExcfNDtJl4OhbffMsw==",
      "requires": {
        "@mrmlnc/readdir-enhanced": "^2.2.1",
        "@nodelib/fs.stat": "^1.1.2",
        "glob-parent": "^3.1.0",
        "is-glob": "^4.0.0",
        "merge2": "^1.2.3",
        "micromatch": "^3.1.10"
      }
    },
    "fast-json-stable-stringify": {
      "version": "2.0.0",
      "resolved": "https://registry.npmjs.org/fast-json-stable-stringify/-/fast-json-stable-stringify-2.0.0.tgz",
      "integrity": "sha1-1RQsDK7msRifh9OnYREGT4bIu/I="
    },
    "fast-levenshtein": {
      "version": "2.0.6",
      "resolved": "https://registry.npmjs.org/fast-levenshtein/-/fast-levenshtein-2.0.6.tgz",
      "integrity": "sha1-PYpcZog6FqMMqGQ+hR8Zuqd5eRc="
    },
    "fast-url-parser": {
      "version": "1.1.3",
      "resolved": "https://registry.npmjs.org/fast-url-parser/-/fast-url-parser-1.1.3.tgz",
      "integrity": "sha1-9K8+qfNNiicc9YrSs3WfQx8LMY0=",
      "requires": {
        "punycode": "^1.3.2"
      },
      "dependencies": {
        "punycode": {
          "version": "1.4.1",
          "resolved": "https://registry.npmjs.org/punycode/-/punycode-1.4.1.tgz",
          "integrity": "sha1-wNWmOycYgArY4esPpSachN1BhF4="
        }
      }
    },
    "faye-websocket": {
      "version": "0.11.1",
      "resolved": "https://registry.npmjs.org/faye-websocket/-/faye-websocket-0.11.1.tgz",
      "integrity": "sha1-8O/hjE9W5PQK/H4Gxxn9XuYYjzg=",
      "requires": {
        "websocket-driver": ">=0.5.1"
      }
    },
    "fb-watchman": {
      "version": "2.0.0",
      "resolved": "https://registry.npmjs.org/fb-watchman/-/fb-watchman-2.0.0.tgz",
      "integrity": "sha1-VOmr99+i8mzZsWNsWIwa/AXeXVg=",
      "requires": {
        "bser": "^2.0.0"
      }
    },
    "figgy-pudding": {
      "version": "3.5.1",
      "resolved": "https://registry.npmjs.org/figgy-pudding/-/figgy-pudding-3.5.1.tgz",
      "integrity": "sha512-vNKxJHTEKNThjfrdJwHc7brvM6eVevuO5nTj6ez8ZQ1qbXTvGthucRF7S4vf2cr71QVnT70V34v0S1DyQsti0w=="
    },
    "figures": {
      "version": "2.0.0",
      "resolved": "https://registry.npmjs.org/figures/-/figures-2.0.0.tgz",
      "integrity": "sha1-OrGi0qYsi/tDGgyUy3l6L84nyWI=",
      "requires": {
        "escape-string-regexp": "^1.0.5"
      }
    },
    "file-entry-cache": {
      "version": "2.0.0",
      "resolved": "https://registry.npmjs.org/file-entry-cache/-/file-entry-cache-2.0.0.tgz",
      "integrity": "sha1-w5KZDD5oR4PYOLjISkXYoEhFg2E=",
      "requires": {
        "flat-cache": "^1.2.1",
        "object-assign": "^4.0.1"
      }
    },
    "file-loader": {
      "version": "3.0.1",
      "resolved": "https://registry.npmjs.org/file-loader/-/file-loader-3.0.1.tgz",
      "integrity": "sha512-4sNIOXgtH/9WZq4NvlfU3Opn5ynUsqBwSLyM+I7UOwdGigTBYfVVQEwe/msZNX/j4pCJTIM14Fsw66Svo1oVrw==",
      "requires": {
        "loader-utils": "^1.0.2",
        "schema-utils": "^1.0.0"
      }
    },
    "filesize": {
      "version": "3.6.1",
      "resolved": "https://registry.npmjs.org/filesize/-/filesize-3.6.1.tgz",
      "integrity": "sha512-7KjR1vv6qnicaPMi1iiTcI85CyYwRO/PSFCu6SvqL8jN2Wjt/NIYQTFtFs7fSDCYOstUkEWIQGFUg5YZQfjlcg=="
    },
    "fill-range": {
      "version": "4.0.0",
      "resolved": "https://registry.npmjs.org/fill-range/-/fill-range-4.0.0.tgz",
      "integrity": "sha1-1USBHUKPmOsGpj3EAtJAPDKMOPc=",
      "requires": {
        "extend-shallow": "^2.0.1",
        "is-number": "^3.0.0",
        "repeat-string": "^1.6.1",
        "to-regex-range": "^2.1.0"
      },
      "dependencies": {
        "extend-shallow": {
          "version": "2.0.1",
          "resolved": "https://registry.npmjs.org/extend-shallow/-/extend-shallow-2.0.1.tgz",
          "integrity": "sha1-Ua99YUrZqfYQ6huvu5idaxxWiQ8=",
          "requires": {
            "is-extendable": "^0.1.0"
          }
        }
      }
    },
    "finalhandler": {
      "version": "1.1.2",
      "resolved": "https://registry.npmjs.org/finalhandler/-/finalhandler-1.1.2.tgz",
      "integrity": "sha512-aAWcW57uxVNrQZqFXjITpW3sIUQmHGG3qSb9mUah9MgMC4NeWhNOlNjXEYq3HjRAvL6arUviZGGJsBg6z0zsWA==",
      "requires": {
        "debug": "2.6.9",
        "encodeurl": "~1.0.2",
        "escape-html": "~1.0.3",
        "on-finished": "~2.3.0",
        "parseurl": "~1.3.3",
        "statuses": "~1.5.0",
        "unpipe": "~1.0.0"
      }
    },
    "find-cache-dir": {
      "version": "2.1.0",
      "resolved": "https://registry.npmjs.org/find-cache-dir/-/find-cache-dir-2.1.0.tgz",
      "integrity": "sha512-Tq6PixE0w/VMFfCgbONnkiQIVol/JJL7nRMi20fqzA4NRs9AfeqMGeRdPi3wIhYkxjeBaWh2rxwapn5Tu3IqOQ==",
      "requires": {
        "commondir": "^1.0.1",
        "make-dir": "^2.0.0",
        "pkg-dir": "^3.0.0"
      },
      "dependencies": {
        "find-up": {
          "version": "3.0.0",
          "resolved": "https://registry.npmjs.org/find-up/-/find-up-3.0.0.tgz",
          "integrity": "sha512-1yD6RmLI1XBfxugvORwlck6f75tYL+iR0jqwsOrOxMZyGYqUuDhJ0l4AXdO1iX/FTs9cBAMEk1gWSEx1kSbylg==",
          "requires": {
            "locate-path": "^3.0.0"
          }
        },
        "locate-path": {
          "version": "3.0.0",
          "resolved": "https://registry.npmjs.org/locate-path/-/locate-path-3.0.0.tgz",
          "integrity": "sha512-7AO748wWnIhNqAuaty2ZWHkQHRSNfPVIsPIfwEOWO22AmaoVrWavlOcMR5nzTLNYvp36X220/maaRsrec1G65A==",
          "requires": {
            "p-locate": "^3.0.0",
            "path-exists": "^3.0.0"
          }
        },
        "make-dir": {
          "version": "2.1.0",
          "resolved": "https://registry.npmjs.org/make-dir/-/make-dir-2.1.0.tgz",
          "integrity": "sha512-LS9X+dc8KLxXCb8dni79fLIIUA5VyZoyjSMCwTluaXA0o27cCK0bhXkpgw+sTXVpPy/lSO57ilRixqk0vDmtRA==",
          "requires": {
            "pify": "^4.0.1",
            "semver": "^5.6.0"
          }
        },
        "p-limit": {
          "version": "2.2.1",
          "resolved": "https://registry.npmjs.org/p-limit/-/p-limit-2.2.1.tgz",
          "integrity": "sha512-85Tk+90UCVWvbDavCLKPOLC9vvY8OwEX/RtKF+/1OADJMVlFfEHOiMTPVyxg7mk/dKa+ipdHm0OUkTvCpMTuwg==",
          "requires": {
            "p-try": "^2.0.0"
          }
        },
        "p-locate": {
          "version": "3.0.0",
          "resolved": "https://registry.npmjs.org/p-locate/-/p-locate-3.0.0.tgz",
          "integrity": "sha512-x+12w/To+4GFfgJhBEpiDcLozRJGegY+Ei7/z0tSLkMmxGZNybVMSfWj9aJn8Z5Fc7dBUNJOOVgPv2H7IwulSQ==",
          "requires": {
            "p-limit": "^2.0.0"
          }
        },
        "p-try": {
          "version": "2.2.0",
          "resolved": "https://registry.npmjs.org/p-try/-/p-try-2.2.0.tgz",
          "integrity": "sha512-R4nPAVTAU0B9D35/Gk3uJf/7XYbQcyohSKdvAxIRSNghFl4e71hVoGnBNQz9cWaXxO2I10KTC+3jMdvvoKw6dQ=="
        },
        "pify": {
          "version": "4.0.1",
          "resolved": "https://registry.npmjs.org/pify/-/pify-4.0.1.tgz",
          "integrity": "sha512-uB80kBFb/tfd68bVleG9T5GGsGPjJrLAUpR5PZIrhBnIaRTQRjqdJSsIKkOP6OAIFbj7GOrcudc5pNjZ+geV2g=="
        },
        "pkg-dir": {
          "version": "3.0.0",
          "resolved": "https://registry.npmjs.org/pkg-dir/-/pkg-dir-3.0.0.tgz",
          "integrity": "sha512-/E57AYkoeQ25qkxMj5PBOVgF8Kiu/h7cYS30Z5+R7WaiCCBfLq58ZI/dSeaEKb9WVJV5n/03QwrN3IeWIFllvw==",
          "requires": {
            "find-up": "^3.0.0"
          }
        }
      }
    },
    "find-up": {
      "version": "2.1.0",
      "resolved": "https://registry.npmjs.org/find-up/-/find-up-2.1.0.tgz",
      "integrity": "sha1-RdG35QbHF93UgndaK3eSCjwMV6c=",
      "requires": {
        "locate-path": "^2.0.0"
      }
    },
    "firebase": {
      "version": "6.1.1",
      "resolved": "https://registry.npmjs.org/firebase/-/firebase-6.1.1.tgz",
      "integrity": "sha512-RB8ZGcj28tU1of6l/l7TBu0By/ewmsIZtrDSlxTp/C6uawN8QtDkGbW3mWV73nkjkFYP6PwMmzCoXtdKxHpRmQ==",
      "requires": {
        "@firebase/app": "0.4.4",
        "@firebase/app-types": "0.4.0",
        "@firebase/auth": "0.11.3",
        "@firebase/database": "0.4.4",
        "@firebase/firestore": "1.3.5",
        "@firebase/functions": "0.4.9",
        "@firebase/installations": "0.1.5",
        "@firebase/messaging": "0.4.1",
        "@firebase/performance": "0.2.6",
        "@firebase/polyfill": "0.3.14",
        "@firebase/storage": "0.3.1",
        "@firebase/util": "0.2.18"
      }
    },
    "firebase-tools": {
      "version": "7.0.2",
      "resolved": "https://registry.npmjs.org/firebase-tools/-/firebase-tools-7.0.2.tgz",
      "integrity": "sha512-1VwYdgnsQ+UT7QcEPPSsRRA8ExGeKWhGiruQ8FI6xmE6pGMbVXatg1RGu6RBaPS+7Dwjn9TtjBNJL0jYYjNexQ==",
      "requires": {
        "JSONStream": "^1.2.1",
        "archiver": "^2.1.1",
        "body-parser": "^1.19.0",
        "chokidar": "^2.1.5",
        "cjson": "^0.3.1",
        "cli-color": "^1.2.0",
        "cli-table": "^0.3.1",
        "commander": "^2.8.1",
        "configstore": "^1.2.0",
        "cross-env": "^5.1.3",
        "cross-spawn": "^4.0.0",
        "csv-streamify": "^3.0.4",
        "didyoumean": "^1.2.1",
        "exit-code": "^1.0.2",
        "express": "^4.16.4",
        "filesize": "^3.1.3",
        "fs-extra": "^0.23.1",
        "glob": "^7.1.2",
        "google-auto-auth": "^0.7.2",
        "inquirer": "~6.3.1",
        "jsonschema": "^1.0.2",
        "jsonwebtoken": "^8.2.1",
        "lodash": "^4.17.10",
        "minimatch": "^3.0.4",
        "open": "^6.3.0",
        "ora": "0.2.3",
        "portfinder": "^1.0.13",
        "progress": "^2.0.0",
        "request": "^2.87.0",
        "semver": "^5.0.3",
        "superstatic": "^6.0.1",
        "tar": "^4.3.0",
        "tmp": "0.0.33",
        "universal-analytics": "^0.4.16",
        "update-notifier": "^2.5.0",
        "uuid": "^3.0.0",
        "winston": "^1.0.1"
      },
      "dependencies": {
        "ansi-regex": {
          "version": "4.1.0",
          "resolved": "https://registry.npmjs.org/ansi-regex/-/ansi-regex-4.1.0.tgz",
          "integrity": "sha512-1apePfXM1UOSqw0o9IiFAovVz9M5S1Dg+4TrDwfMewQ6p/rmMueb7tWZjQ1rx4Loy1ArBggoqGpfqqdI4rondg=="
        },
        "ansi-styles": {
          "version": "3.2.1",
          "resolved": "https://registry.npmjs.org/ansi-styles/-/ansi-styles-3.2.1.tgz",
          "integrity": "sha512-VT0ZI6kZRdTh8YyJw3SMbYm/u+NqfsAxEpWO0Pf9sq8/e94WxxOpPKx9FR1FlyCtOVDNOQ+8ntlqFxiRc+r5qA==",
          "requires": {
            "color-convert": "^1.9.0"
          }
        },
        "chalk": {
          "version": "2.4.2",
          "resolved": "https://registry.npmjs.org/chalk/-/chalk-2.4.2.tgz",
          "integrity": "sha512-Mti+f9lpJNcwF4tWV8/OrTTtF1gZi+f8FqlyAdouralcFWFQWF2+NgCHShjkCb+IFBLq9buZwE1xckQU4peSuQ==",
          "requires": {
            "ansi-styles": "^3.2.1",
            "escape-string-regexp": "^1.0.5",
            "supports-color": "^5.3.0"
          }
        },
        "chardet": {
          "version": "0.7.0",
          "resolved": "https://registry.npmjs.org/chardet/-/chardet-0.7.0.tgz",
          "integrity": "sha512-mT8iDcrh03qDGRRmoA2hmBJnxpllMR+0/0qlzjqZES6NdiWDcZkCNAk4rPFZ9Q85r27unkiNNg8ZOiwZXBHwcA=="
        },
        "external-editor": {
          "version": "3.1.0",
          "resolved": "https://registry.npmjs.org/external-editor/-/external-editor-3.1.0.tgz",
          "integrity": "sha512-hMQ4CX1p1izmuLYyZqLMO/qGNw10wSv9QDCPfzXfyFrOaCSSoRfqE1Kf1s5an66J5JZC62NewG+mK49jOCtQew==",
          "requires": {
            "chardet": "^0.7.0",
            "iconv-lite": "^0.4.24",
            "tmp": "^0.0.33"
          }
        },
        "inquirer": {
          "version": "6.3.1",
          "resolved": "https://registry.npmjs.org/inquirer/-/inquirer-6.3.1.tgz",
          "integrity": "sha512-MmL624rfkFt4TG9y/Jvmt8vdmOo836U7Y0Hxr2aFk3RelZEGX4Igk0KabWrcaaZaTv9uzglOqWh1Vly+FAWAXA==",
          "requires": {
            "ansi-escapes": "^3.2.0",
            "chalk": "^2.4.2",
            "cli-cursor": "^2.1.0",
            "cli-width": "^2.0.0",
            "external-editor": "^3.0.3",
            "figures": "^2.0.0",
            "lodash": "^4.17.11",
            "mute-stream": "0.0.7",
            "run-async": "^2.2.0",
            "rxjs": "^6.4.0",
            "string-width": "^2.1.0",
            "strip-ansi": "^5.1.0",
            "through": "^2.3.6"
          }
        },
        "strip-ansi": {
          "version": "5.2.0",
          "resolved": "https://registry.npmjs.org/strip-ansi/-/strip-ansi-5.2.0.tgz",
          "integrity": "sha512-DuRs1gKbBqsMKIZlrffwlug8MHkcnpjs5VPmL1PAh+mA30U0DTotfDZ0d2UUsXpPmPmMMJ6W773MaA3J+lbiWA==",
          "requires": {
            "ansi-regex": "^4.1.0"
          }
        },
        "supports-color": {
          "version": "5.5.0",
          "resolved": "https://registry.npmjs.org/supports-color/-/supports-color-5.5.0.tgz",
          "integrity": "sha512-QjVjwdXIt408MIiAqCX4oUKsgU2EqAGzs2Ppkm4aQYbjm+ZEWEcW4SfFNTr4uMNZma0ey4f5lgLrkB0aX0QMow==",
          "requires": {
            "has-flag": "^3.0.0"
          }
        }
      }
    },
    "flat-arguments": {
      "version": "1.0.2",
      "resolved": "https://registry.npmjs.org/flat-arguments/-/flat-arguments-1.0.2.tgz",
      "integrity": "sha1-m6p4Ct8FAfKC1ybJxqA426ROp28=",
      "requires": {
        "array-flatten": "^1.0.0",
        "as-array": "^1.0.0",
        "lodash.isarguments": "^3.0.0",
        "lodash.isobject": "^3.0.0"
      },
      "dependencies": {
        "as-array": {
          "version": "1.0.0",
          "resolved": "https://registry.npmjs.org/as-array/-/as-array-1.0.0.tgz",
          "integrity": "sha1-KKbu6qVynx9OyiBH316d4avaDtE=",
          "requires": {
            "lodash.isarguments": "2.4.x",
            "lodash.isobject": "^2.4.1",
            "lodash.values": "^2.4.1"
          },
          "dependencies": {
            "lodash.isarguments": {
              "version": "2.4.1",
              "resolved": "https://registry.npmjs.org/lodash.isarguments/-/lodash.isarguments-2.4.1.tgz",
              "integrity": "sha1-STGpwIJTrfCRrnyhkiWKlzh27Mo="
            },
            "lodash.isobject": {
              "version": "2.4.1",
              "resolved": "https://registry.npmjs.org/lodash.isobject/-/lodash.isobject-2.4.1.tgz",
              "integrity": "sha1-Wi5H/mmVPx7mMafrof5k0tBlWPU=",
              "requires": {
                "lodash._objecttypes": "~2.4.1"
              }
            }
          }
        },
        "lodash.isobject": {
          "version": "3.0.2",
          "resolved": "https://registry.npmjs.org/lodash.isobject/-/lodash.isobject-3.0.2.tgz",
          "integrity": "sha1-PI+41bW/S/kK4G4U8qUwpO2TXh0="
        }
      }
    },
    "flat-cache": {
      "version": "1.3.4",
      "resolved": "https://registry.npmjs.org/flat-cache/-/flat-cache-1.3.4.tgz",
      "integrity": "sha512-VwyB3Lkgacfik2vhqR4uv2rvebqmDvFu4jlN/C1RzWoJEo8I7z4Q404oiqYCkq41mni8EzQnm95emU9seckwtg==",
      "requires": {
        "circular-json": "^0.3.1",
        "graceful-fs": "^4.1.2",
        "rimraf": "~2.6.2",
        "write": "^0.2.1"
      }
    },
    "flatted": {
      "version": "2.0.1",
      "resolved": "https://registry.npmjs.org/flatted/-/flatted-2.0.1.tgz",
      "integrity": "sha512-a1hQMktqW9Nmqr5aktAux3JMNqaucxGcjtjWnZLHX7yyPCmlSV3M54nGYbqT8K+0GhF3NBgmJCc3ma+WOgX8Jg=="
    },
    "flatten": {
      "version": "1.0.2",
      "resolved": "https://registry.npmjs.org/flatten/-/flatten-1.0.2.tgz",
      "integrity": "sha1-2uRqnXj74lKSJYzB54CkHZXAN4I="
    },
    "flush-write-stream": {
      "version": "1.1.1",
      "resolved": "https://registry.npmjs.org/flush-write-stream/-/flush-write-stream-1.1.1.tgz",
      "integrity": "sha512-3Z4XhFZ3992uIq0XOqb9AreonueSYphE6oYbpt5+3u06JWklbsPkNv3ZKkP9Bz/r+1MWCaMoSQ28P85+1Yc77w==",
      "requires": {
        "inherits": "^2.0.3",
        "readable-stream": "^2.3.6"
      }
    },
    "follow-redirects": {
      "version": "1.7.0",
      "resolved": "https://registry.npmjs.org/follow-redirects/-/follow-redirects-1.7.0.tgz",
      "integrity": "sha512-m/pZQy4Gj287eNy94nivy5wchN3Kp+Q5WgUPNy5lJSZ3sgkVKSYV/ZChMAQVIgx1SqfZ2zBZtPA2YlXIWxxJOQ==",
      "requires": {
        "debug": "^3.2.6"
      },
      "dependencies": {
        "debug": {
          "version": "3.2.6",
          "resolved": "https://registry.npmjs.org/debug/-/debug-3.2.6.tgz",
          "integrity": "sha512-mel+jf7nrtEl5Pn1Qx46zARXKDpBbvzezse7p7LqINmdoIk8PYP5SySaxEmYv6TZ0JyEKA1hsCId6DIhgITtWQ==",
          "requires": {
            "ms": "^2.1.1"
          }
        },
        "ms": {
          "version": "2.1.2",
          "resolved": "https://registry.npmjs.org/ms/-/ms-2.1.2.tgz",
          "integrity": "sha512-sGkPx+VjMtmA6MX27oA4FBFELFCZZ4S4XqeGOXCv68tT+jb3vk/RyaKWP0PTKyWtmLSM0b+adUTEvbs1PEaH2w=="
        }
      }
    },
    "for-in": {
      "version": "1.0.2",
      "resolved": "https://registry.npmjs.org/for-in/-/for-in-1.0.2.tgz",
      "integrity": "sha1-gQaNKVqBQuwKxybG4iAMMPttXoA="
    },
    "for-own": {
      "version": "0.1.5",
      "resolved": "https://registry.npmjs.org/for-own/-/for-own-0.1.5.tgz",
      "integrity": "sha1-UmXGgaTylNq78XyVCbZ2OqhFEM4=",
      "requires": {
        "for-in": "^1.0.1"
      }
    },
    "forever-agent": {
      "version": "0.6.1",
      "resolved": "https://registry.npmjs.org/forever-agent/-/forever-agent-0.6.1.tgz",
      "integrity": "sha1-+8cfDEGt6zf5bFd60e1C2P2sypE="
    },
    "fork-ts-checker-webpack-plugin": {
      "version": "1.5.0",
      "resolved": "https://registry.npmjs.org/fork-ts-checker-webpack-plugin/-/fork-ts-checker-webpack-plugin-1.5.0.tgz",
      "integrity": "sha512-zEhg7Hz+KhZlBhILYpXy+Beu96gwvkROWJiTXOCyOOMMrdBIRPvsBpBqgTI4jfJGrJXcqGwJR8zsBGDmzY0jsA==",
      "requires": {
        "babel-code-frame": "^6.22.0",
        "chalk": "^2.4.1",
        "chokidar": "^2.0.4",
        "micromatch": "^3.1.10",
        "minimatch": "^3.0.4",
        "semver": "^5.6.0",
        "tapable": "^1.0.0",
        "worker-rpc": "^0.1.0"
      },
      "dependencies": {
        "ansi-styles": {
          "version": "3.2.1",
          "resolved": "https://registry.npmjs.org/ansi-styles/-/ansi-styles-3.2.1.tgz",
          "integrity": "sha512-VT0ZI6kZRdTh8YyJw3SMbYm/u+NqfsAxEpWO0Pf9sq8/e94WxxOpPKx9FR1FlyCtOVDNOQ+8ntlqFxiRc+r5qA==",
          "requires": {
            "color-convert": "^1.9.0"
          }
        },
        "chalk": {
          "version": "2.4.2",
          "resolved": "https://registry.npmjs.org/chalk/-/chalk-2.4.2.tgz",
          "integrity": "sha512-Mti+f9lpJNcwF4tWV8/OrTTtF1gZi+f8FqlyAdouralcFWFQWF2+NgCHShjkCb+IFBLq9buZwE1xckQU4peSuQ==",
          "requires": {
            "ansi-styles": "^3.2.1",
            "escape-string-regexp": "^1.0.5",
            "supports-color": "^5.3.0"
          }
        },
        "supports-color": {
          "version": "5.5.0",
          "resolved": "https://registry.npmjs.org/supports-color/-/supports-color-5.5.0.tgz",
          "integrity": "sha512-QjVjwdXIt408MIiAqCX4oUKsgU2EqAGzs2Ppkm4aQYbjm+ZEWEcW4SfFNTr4uMNZma0ey4f5lgLrkB0aX0QMow==",
          "requires": {
            "has-flag": "^3.0.0"
          }
        }
      }
    },
    "form-data": {
      "version": "2.3.3",
      "resolved": "https://registry.npmjs.org/form-data/-/form-data-2.3.3.tgz",
      "integrity": "sha512-1lLKB2Mu3aGP1Q/2eCOx0fNbRMe7XdwktwOruhfqqd0rIJWwN4Dh+E3hrPSlDCXnSR7UtZ1N38rVXm+6+MEhJQ==",
      "requires": {
        "asynckit": "^0.4.0",
        "combined-stream": "^1.0.6",
        "mime-types": "^2.1.12"
      }
    },
    "forwarded": {
      "version": "0.1.2",
      "resolved": "https://registry.npmjs.org/forwarded/-/forwarded-0.1.2.tgz",
      "integrity": "sha1-mMI9qxF1ZXuMBXPozszZGw/xjIQ="
    },
    "fragment-cache": {
      "version": "0.2.1",
      "resolved": "https://registry.npmjs.org/fragment-cache/-/fragment-cache-0.2.1.tgz",
      "integrity": "sha1-QpD60n8T6Jvn8zeZxrxaCr//DRk=",
      "requires": {
        "map-cache": "^0.2.2"
      }
    },
    "fresh": {
      "version": "0.5.2",
      "resolved": "https://registry.npmjs.org/fresh/-/fresh-0.5.2.tgz",
      "integrity": "sha1-PYyt2Q2XZWn6g1qx+OSyOhBWBac="
    },
    "from2": {
      "version": "2.3.0",
      "resolved": "https://registry.npmjs.org/from2/-/from2-2.3.0.tgz",
      "integrity": "sha1-i/tVAr3kpNNs/e6gB/zKIdfjgq8=",
      "requires": {
        "inherits": "^2.0.1",
        "readable-stream": "^2.0.0"
      }
    },
    "fs-constants": {
      "version": "1.0.0",
      "resolved": "https://registry.npmjs.org/fs-constants/-/fs-constants-1.0.0.tgz",
      "integrity": "sha512-y6OAwoSIf7FyjMIv94u+b5rdheZEjzR63GTyZJm5qh4Bi+2YgwLCcI/fPFZkL5PSixOt6ZNKm+w+Hfp/Bciwow=="
    },
    "fs-extra": {
      "version": "0.23.1",
      "resolved": "https://registry.npmjs.org/fs-extra/-/fs-extra-0.23.1.tgz",
      "integrity": "sha1-ZhHbpq3yq43Jxp+rN83fiBgVfj0=",
      "requires": {
        "graceful-fs": "^4.1.2",
        "jsonfile": "^2.1.0",
        "path-is-absolute": "^1.0.0",
        "rimraf": "^2.2.8"
      }
    },
    "fs-minipass": {
      "version": "1.2.6",
      "resolved": "https://registry.npmjs.org/fs-minipass/-/fs-minipass-1.2.6.tgz",
      "integrity": "sha512-crhvyXcMejjv3Z5d2Fa9sf5xLYVCF5O1c71QxbVnbLsmYMBEvDAftewesN/HhY03YRoA7zOMxjNGrF5svGaaeQ==",
      "requires": {
        "minipass": "^2.2.1"
      }
    },
    "fs-write-stream-atomic": {
      "version": "1.0.10",
      "resolved": "https://registry.npmjs.org/fs-write-stream-atomic/-/fs-write-stream-atomic-1.0.10.tgz",
      "integrity": "sha1-tH31NJPvkR33VzHnCp3tAYnbQMk=",
      "requires": {
        "graceful-fs": "^4.1.2",
        "iferr": "^0.1.5",
        "imurmurhash": "^0.1.4",
        "readable-stream": "1 || 2"
      }
    },
    "fs.realpath": {
      "version": "1.0.0",
      "resolved": "https://registry.npmjs.org/fs.realpath/-/fs.realpath-1.0.0.tgz",
      "integrity": "sha1-FQStJSMVjKpA20onh8sBQRmU6k8="
    },
    "fsevents": {
      "version": "1.2.9",
      "resolved": "https://registry.npmjs.org/fsevents/-/fsevents-1.2.9.tgz",
      "integrity": "sha512-oeyj2H3EjjonWcFjD5NvZNE9Rqe4UW+nQBU2HNeKw0koVLEFIhtyETyAakeAM3de7Z/SW5kcA+fZUait9EApnw==",
      "optional": true,
      "requires": {
        "nan": "^2.12.1",
        "node-pre-gyp": "^0.12.0"
      },
      "dependencies": {
        "abbrev": {
          "version": "1.1.1",
          "bundled": true,
          "optional": true
        },
        "ansi-regex": {
          "version": "2.1.1",
          "bundled": true
        },
        "aproba": {
          "version": "1.2.0",
          "bundled": true,
          "optional": true
        },
        "are-we-there-yet": {
          "version": "1.1.5",
          "bundled": true,
          "optional": true,
          "requires": {
            "delegates": "^1.0.0",
            "readable-stream": "^2.0.6"
          }
        },
        "balanced-match": {
          "version": "1.0.0",
          "bundled": true
        },
        "brace-expansion": {
          "version": "1.1.11",
          "bundled": true,
          "requires": {
            "balanced-match": "^1.0.0",
            "concat-map": "0.0.1"
          }
        },
        "chownr": {
          "version": "1.1.1",
          "bundled": true,
          "optional": true
        },
        "code-point-at": {
          "version": "1.1.0",
          "bundled": true
        },
        "concat-map": {
          "version": "0.0.1",
          "bundled": true
        },
        "console-control-strings": {
          "version": "1.1.0",
          "bundled": true
        },
        "core-util-is": {
          "version": "1.0.2",
          "bundled": true,
          "optional": true
        },
        "debug": {
          "version": "4.1.1",
          "bundled": true,
          "optional": true,
          "requires": {
            "ms": "^2.1.1"
          }
        },
        "deep-extend": {
          "version": "0.6.0",
          "bundled": true,
          "optional": true
        },
        "delegates": {
          "version": "1.0.0",
          "bundled": true,
          "optional": true
        },
        "detect-libc": {
          "version": "1.0.3",
          "bundled": true,
          "optional": true
        },
        "fs-minipass": {
          "version": "1.2.5",
          "bundled": true,
          "optional": true,
          "requires": {
            "minipass": "^2.2.1"
          }
        },
        "fs.realpath": {
          "version": "1.0.0",
          "bundled": true,
          "optional": true
        },
        "gauge": {
          "version": "2.7.4",
          "bundled": true,
          "optional": true,
          "requires": {
            "aproba": "^1.0.3",
            "console-control-strings": "^1.0.0",
            "has-unicode": "^2.0.0",
            "object-assign": "^4.1.0",
            "signal-exit": "^3.0.0",
            "string-width": "^1.0.1",
            "strip-ansi": "^3.0.1",
            "wide-align": "^1.1.0"
          }
        },
        "glob": {
          "version": "7.1.3",
          "bundled": true,
          "optional": true,
          "requires": {
            "fs.realpath": "^1.0.0",
            "inflight": "^1.0.4",
            "inherits": "2",
            "minimatch": "^3.0.4",
            "once": "^1.3.0",
            "path-is-absolute": "^1.0.0"
          }
        },
        "has-unicode": {
          "version": "2.0.1",
          "bundled": true,
          "optional": true
        },
        "iconv-lite": {
          "version": "0.4.24",
          "bundled": true,
          "optional": true,
          "requires": {
            "safer-buffer": ">= 2.1.2 < 3"
          }
        },
        "ignore-walk": {
          "version": "3.0.1",
          "bundled": true,
          "optional": true,
          "requires": {
            "minimatch": "^3.0.4"
          }
        },
        "inflight": {
          "version": "1.0.6",
          "bundled": true,
          "optional": true,
          "requires": {
            "once": "^1.3.0",
            "wrappy": "1"
          }
        },
        "inherits": {
          "version": "2.0.3",
          "bundled": true
        },
        "ini": {
          "version": "1.3.5",
          "bundled": true,
          "optional": true
        },
        "is-fullwidth-code-point": {
          "version": "1.0.0",
          "bundled": true,
          "requires": {
            "number-is-nan": "^1.0.0"
          }
        },
        "isarray": {
          "version": "1.0.0",
          "bundled": true,
          "optional": true
        },
        "minimatch": {
          "version": "3.0.4",
          "bundled": true,
          "requires": {
            "brace-expansion": "^1.1.7"
          }
        },
        "minimist": {
          "version": "0.0.8",
          "bundled": true
        },
        "minipass": {
          "version": "2.3.5",
          "bundled": true,
          "requires": {
            "safe-buffer": "^5.1.2",
            "yallist": "^3.0.0"
          }
        },
        "minizlib": {
          "version": "1.2.1",
          "bundled": true,
          "optional": true,
          "requires": {
            "minipass": "^2.2.1"
          }
        },
        "mkdirp": {
          "version": "0.5.1",
          "bundled": true,
          "requires": {
            "minimist": "0.0.8"
          }
        },
        "ms": {
          "version": "2.1.1",
          "bundled": true,
          "optional": true
        },
        "needle": {
          "version": "2.3.0",
          "bundled": true,
          "optional": true,
          "requires": {
            "debug": "^4.1.0",
            "iconv-lite": "^0.4.4",
            "sax": "^1.2.4"
          }
        },
        "node-pre-gyp": {
          "version": "0.12.0",
          "bundled": true,
          "optional": true,
          "requires": {
            "detect-libc": "^1.0.2",
            "mkdirp": "^0.5.1",
            "needle": "^2.2.1",
            "nopt": "^4.0.1",
            "npm-packlist": "^1.1.6",
            "npmlog": "^4.0.2",
            "rc": "^1.2.7",
            "rimraf": "^2.6.1",
            "semver": "^5.3.0",
            "tar": "^4"
          }
        },
        "nopt": {
          "version": "4.0.1",
          "bundled": true,
          "optional": true,
          "requires": {
            "abbrev": "1",
            "osenv": "^0.1.4"
          }
        },
        "npm-bundled": {
          "version": "1.0.6",
          "bundled": true,
          "optional": true
        },
        "npm-packlist": {
          "version": "1.4.1",
          "bundled": true,
          "optional": true,
          "requires": {
            "ignore-walk": "^3.0.1",
            "npm-bundled": "^1.0.1"
          }
        },
        "npmlog": {
          "version": "4.1.2",
          "bundled": true,
          "optional": true,
          "requires": {
            "are-we-there-yet": "~1.1.2",
            "console-control-strings": "~1.1.0",
            "gauge": "~2.7.3",
            "set-blocking": "~2.0.0"
          }
        },
        "number-is-nan": {
          "version": "1.0.1",
          "bundled": true
        },
        "object-assign": {
          "version": "4.1.1",
          "bundled": true,
          "optional": true
        },
        "once": {
          "version": "1.4.0",
          "bundled": true,
          "requires": {
            "wrappy": "1"
          }
        },
        "os-homedir": {
          "version": "1.0.2",
          "bundled": true,
          "optional": true
        },
        "os-tmpdir": {
          "version": "1.0.2",
          "bundled": true,
          "optional": true
        },
        "osenv": {
          "version": "0.1.5",
          "bundled": true,
          "optional": true,
          "requires": {
            "os-homedir": "^1.0.0",
            "os-tmpdir": "^1.0.0"
          }
        },
        "path-is-absolute": {
          "version": "1.0.1",
          "bundled": true,
          "optional": true
        },
        "process-nextick-args": {
          "version": "2.0.0",
          "bundled": true,
          "optional": true
        },
        "rc": {
          "version": "1.2.8",
          "bundled": true,
          "optional": true,
          "requires": {
            "deep-extend": "^0.6.0",
            "ini": "~1.3.0",
            "minimist": "^1.2.0",
            "strip-json-comments": "~2.0.1"
          },
          "dependencies": {
            "minimist": {
              "version": "1.2.0",
              "bundled": true,
              "optional": true
            }
          }
        },
        "readable-stream": {
          "version": "2.3.6",
          "bundled": true,
          "optional": true,
          "requires": {
            "core-util-is": "~1.0.0",
            "inherits": "~2.0.3",
            "isarray": "~1.0.0",
            "process-nextick-args": "~2.0.0",
            "safe-buffer": "~5.1.1",
            "string_decoder": "~1.1.1",
            "util-deprecate": "~1.0.1"
          }
        },
        "rimraf": {
          "version": "2.6.3",
          "bundled": true,
          "optional": true,
          "requires": {
            "glob": "^7.1.3"
          }
        },
        "safe-buffer": {
          "version": "5.1.2",
          "bundled": true
        },
        "safer-buffer": {
          "version": "2.1.2",
          "bundled": true,
          "optional": true
        },
        "sax": {
          "version": "1.2.4",
          "bundled": true,
          "optional": true
        },
        "semver": {
          "version": "5.7.0",
          "bundled": true,
          "optional": true
        },
        "set-blocking": {
          "version": "2.0.0",
          "bundled": true,
          "optional": true
        },
        "signal-exit": {
          "version": "3.0.2",
          "bundled": true,
          "optional": true
        },
        "string-width": {
          "version": "1.0.2",
          "bundled": true,
          "requires": {
            "code-point-at": "^1.0.0",
            "is-fullwidth-code-point": "^1.0.0",
            "strip-ansi": "^3.0.0"
          }
        },
        "string_decoder": {
          "version": "1.1.1",
          "bundled": true,
          "optional": true,
          "requires": {
            "safe-buffer": "~5.1.0"
          }
        },
        "strip-ansi": {
          "version": "3.0.1",
          "bundled": true,
          "requires": {
            "ansi-regex": "^2.0.0"
          }
        },
        "strip-json-comments": {
          "version": "2.0.1",
          "bundled": true,
          "optional": true
        },
        "tar": {
          "version": "4.4.8",
          "bundled": true,
          "optional": true,
          "requires": {
            "chownr": "^1.1.1",
            "fs-minipass": "^1.2.5",
            "minipass": "^2.3.4",
            "minizlib": "^1.1.1",
            "mkdirp": "^0.5.0",
            "safe-buffer": "^5.1.2",
            "yallist": "^3.0.2"
          }
        },
        "util-deprecate": {
          "version": "1.0.2",
          "bundled": true,
          "optional": true
        },
        "wide-align": {
          "version": "1.1.3",
          "bundled": true,
          "optional": true,
          "requires": {
            "string-width": "^1.0.2 || 2"
          }
        },
        "wrappy": {
          "version": "1.0.2",
          "bundled": true
        },
        "yallist": {
          "version": "3.0.3",
          "bundled": true
        }
      }
    },
    "function-bind": {
      "version": "1.1.1",
      "resolved": "https://registry.npmjs.org/function-bind/-/function-bind-1.1.1.tgz",
      "integrity": "sha512-yIovAzMX49sF8Yl58fSCWJ5svSLuaibPxXQJFLmBObTuCr0Mf1KiPopGM9NiFjiYBCbfaa2Fh6breQ6ANVTI0A=="
    },
    "functional-red-black-tree": {
      "version": "1.0.1",
      "resolved": "https://registry.npmjs.org/functional-red-black-tree/-/functional-red-black-tree-1.0.1.tgz",
      "integrity": "sha1-GwqzvVU7Kg1jmdKcDj6gslIHgyc="
    },
    "gcp-metadata": {
      "version": "0.3.1",
      "resolved": "https://registry.npmjs.org/gcp-metadata/-/gcp-metadata-0.3.1.tgz",
      "integrity": "sha512-5kJPX/RXuqoLmHiOOgkSDk/LI0QaXpEvZ3pvQP4ifjGGDKZKVSOjL/GcDjXA5kLxppFCOjmmsu0Uoop9d1upaQ==",
      "requires": {
        "extend": "^3.0.0",
        "retry-request": "^3.0.0"
      }
    },
    "generate-function": {
      "version": "2.3.1",
      "resolved": "https://registry.npmjs.org/generate-function/-/generate-function-2.3.1.tgz",
      "integrity": "sha512-eeB5GfMNeevm/GRYq20ShmsaGcmI81kIX2K9XQx5miC8KdHaC6Jm0qQ8ZNeGOi7wYB8OsdxKs+Y2oVuTFuVwKQ==",
      "requires": {
        "is-property": "^1.0.2"
      }
    },
    "generate-object-property": {
      "version": "1.2.0",
      "resolved": "https://registry.npmjs.org/generate-object-property/-/generate-object-property-1.2.0.tgz",
      "integrity": "sha1-nA4cQDCM6AT0eDYYuTf6iPmdUNA=",
      "requires": {
        "is-property": "^1.0.0"
      }
    },
    "get-caller-file": {
      "version": "2.0.5",
      "resolved": "https://registry.npmjs.org/get-caller-file/-/get-caller-file-2.0.5.tgz",
      "integrity": "sha512-DyFP3BM/3YHTQOCUL/w0OZHR0lpKeGrxotcHWcqNEdnltqFwXVfhEBQ94eIo34AfQpo0rGki4cyIiftY06h2Fg=="
    },
    "get-own-enumerable-property-symbols": {
      "version": "3.0.0",
      "resolved": "https://registry.npmjs.org/get-own-enumerable-property-symbols/-/get-own-enumerable-property-symbols-3.0.0.tgz",
      "integrity": "sha512-CIJYJC4GGF06TakLg8z4GQKvDsx9EMspVxOYih7LerEL/WosUnFIww45CGfxfeKHqlg3twgUrYRT1O3WQqjGCg=="
    },
    "get-stream": {
      "version": "3.0.0",
      "resolved": "https://registry.npmjs.org/get-stream/-/get-stream-3.0.0.tgz",
      "integrity": "sha1-jpQ9E1jcN1VQVOy+LtsFqhdO3hQ="
    },
    "get-value": {
      "version": "2.0.6",
      "resolved": "https://registry.npmjs.org/get-value/-/get-value-2.0.6.tgz",
      "integrity": "sha1-3BXKHGcjh8p2vTesCjlbogQqLCg="
    },
    "getpass": {
      "version": "0.1.7",
      "resolved": "https://registry.npmjs.org/getpass/-/getpass-0.1.7.tgz",
      "integrity": "sha1-Xv+OPmhNVprkyysSgmBOi6YhSfo=",
      "requires": {
        "assert-plus": "^1.0.0"
      }
    },
    "glob": {
      "version": "7.1.4",
      "resolved": "https://registry.npmjs.org/glob/-/glob-7.1.4.tgz",
      "integrity": "sha512-hkLPepehmnKk41pUGm3sYxoFs/umurYfYJCerbXEyFIWcAzvpipAgVkBqqT9RBKMGjnq6kMuyYwha6csxbiM1A==",
      "requires": {
        "fs.realpath": "^1.0.0",
        "inflight": "^1.0.4",
        "inherits": "2",
        "minimatch": "^3.0.4",
        "once": "^1.3.0",
        "path-is-absolute": "^1.0.0"
      }
    },
    "glob-parent": {
      "version": "3.1.0",
      "resolved": "https://registry.npmjs.org/glob-parent/-/glob-parent-3.1.0.tgz",
      "integrity": "sha1-nmr2KZ2NO9K9QEMIMr0RPfkGxa4=",
      "requires": {
        "is-glob": "^3.1.0",
        "path-dirname": "^1.0.0"
      },
      "dependencies": {
        "is-glob": {
          "version": "3.1.0",
          "resolved": "https://registry.npmjs.org/is-glob/-/is-glob-3.1.0.tgz",
          "integrity": "sha1-e6WuJCF4BKxwcHuWkiVnSGzD6Eo=",
          "requires": {
            "is-extglob": "^2.1.0"
          }
        }
      }
    },
    "glob-slash": {
      "version": "1.0.0",
      "resolved": "https://registry.npmjs.org/glob-slash/-/glob-slash-1.0.0.tgz",
      "integrity": "sha1-/lLvpDMjP3Si/mTHq7m8hIICq5U="
    },
    "glob-slasher": {
      "version": "1.0.1",
      "resolved": "https://registry.npmjs.org/glob-slasher/-/glob-slasher-1.0.1.tgz",
      "integrity": "sha1-dHoOW7IiZC7hDT4FRD4QlJPLD44=",
      "requires": {
        "glob-slash": "^1.0.0",
        "lodash.isobject": "^2.4.1",
        "toxic": "^1.0.0"
      }
    },
    "glob-to-regexp": {
      "version": "0.3.0",
      "resolved": "https://registry.npmjs.org/glob-to-regexp/-/glob-to-regexp-0.3.0.tgz",
      "integrity": "sha1-jFoUlNIGbFcMw7/kSWF1rMTVAqs="
    },
    "global": {
      "version": "4.4.0",
      "resolved": "https://registry.npmjs.org/global/-/global-4.4.0.tgz",
      "integrity": "sha512-wv/LAoHdRE3BeTGz53FAamhGlPLhlssK45usmGFThIi4XqnBmjKQ16u+RNbP7WvigRZDxUsM0J3gcQ5yicaL0w==",
      "requires": {
        "min-document": "^2.19.0",
        "process": "^0.11.10"
      }
    },
    "global-dirs": {
      "version": "0.1.1",
      "resolved": "https://registry.npmjs.org/global-dirs/-/global-dirs-0.1.1.tgz",
      "integrity": "sha1-sxnA3UYH81PzvpzKTHL8FIxJ9EU=",
      "requires": {
        "ini": "^1.3.4"
      }
    },
    "global-modules": {
      "version": "2.0.0",
      "resolved": "https://registry.npmjs.org/global-modules/-/global-modules-2.0.0.tgz",
      "integrity": "sha512-NGbfmJBp9x8IxyJSd1P+otYK8vonoJactOogrVfFRIAEY1ukil8RSKDz2Yo7wh1oihl51l/r6W4epkeKJHqL8A==",
      "requires": {
        "global-prefix": "^3.0.0"
      }
    },
    "global-prefix": {
      "version": "3.0.0",
      "resolved": "https://registry.npmjs.org/global-prefix/-/global-prefix-3.0.0.tgz",
      "integrity": "sha512-awConJSVCHVGND6x3tmMaKcQvwXLhjdkmomy2W+Goaui8YPgYgXJZewhg3fWC+DlfqqQuWg8AwqjGTD2nAPVWg==",
      "requires": {
        "ini": "^1.3.5",
        "kind-of": "^6.0.2",
        "which": "^1.3.1"
      }
    },
    "globals": {
      "version": "9.18.0",
      "resolved": "https://registry.npmjs.org/globals/-/globals-9.18.0.tgz",
      "integrity": "sha512-S0nG3CLEQiY/ILxqtztTWH/3iRRdyBLw6KMDxnKMchrtbj2OFmehVh0WUCfW3DUrIgx/qFrJPICrq4Z4sTR9UQ=="
    },
    "globby": {
      "version": "8.0.2",
      "resolved": "https://registry.npmjs.org/globby/-/globby-8.0.2.tgz",
      "integrity": "sha512-yTzMmKygLp8RUpG1Ymu2VXPSJQZjNAZPD4ywgYEaG7e4tBJeUQBO8OpXrf1RCNcEs5alsoJYPAMiIHP0cmeC7w==",
      "requires": {
        "array-union": "^1.0.1",
        "dir-glob": "2.0.0",
        "fast-glob": "^2.0.2",
        "glob": "^7.1.2",
        "ignore": "^3.3.5",
        "pify": "^3.0.0",
        "slash": "^1.0.0"
      },
      "dependencies": {
        "pify": {
          "version": "3.0.0",
          "resolved": "https://registry.npmjs.org/pify/-/pify-3.0.0.tgz",
          "integrity": "sha1-5aSs0sEB/fPZpNB/DbxNtJ3SgXY="
        },
        "slash": {
          "version": "1.0.0",
          "resolved": "https://registry.npmjs.org/slash/-/slash-1.0.0.tgz",
          "integrity": "sha1-xB8vbDn8FtHNF61LXYlhFK5HDVU="
        }
      }
    },
    "google-auth-library": {
      "version": "0.10.0",
      "resolved": "https://registry.npmjs.org/google-auth-library/-/google-auth-library-0.10.0.tgz",
      "integrity": "sha1-bhW6vuhf0d0U2NEoopW2g41SE24=",
      "requires": {
        "gtoken": "^1.2.1",
        "jws": "^3.1.4",
        "lodash.noop": "^3.0.1",
        "request": "^2.74.0"
      }
    },
    "google-auto-auth": {
      "version": "0.7.2",
      "resolved": "https://registry.npmjs.org/google-auto-auth/-/google-auto-auth-0.7.2.tgz",
      "integrity": "sha512-ux2n2AE2g3+vcLXwL4dP/M12SFMRX5dzCzBfhAEkTeAB7dpyGdOIEj7nmUx0BHKaCcUQrRWg9kT63X/Mmtk1+A==",
      "requires": {
        "async": "^2.3.0",
        "gcp-metadata": "^0.3.0",
        "google-auth-library": "^0.10.0",
        "request": "^2.79.0"
      }
    },
    "google-p12-pem": {
      "version": "0.1.2",
      "resolved": "https://registry.npmjs.org/google-p12-pem/-/google-p12-pem-0.1.2.tgz",
      "integrity": "sha1-M8RqsCGqc0+gMys5YKmj/8svMXc=",
      "requires": {
        "node-forge": "^0.7.1"
      }
    },
    "got": {
      "version": "6.7.1",
      "resolved": "https://registry.npmjs.org/got/-/got-6.7.1.tgz",
      "integrity": "sha1-JAzQV4WpoY5WHcG0S0HHY+8ejbA=",
      "requires": {
        "create-error-class": "^3.0.0",
        "duplexer3": "^0.1.4",
        "get-stream": "^3.0.0",
        "is-redirect": "^1.0.0",
        "is-retry-allowed": "^1.0.0",
        "is-stream": "^1.0.0",
        "lowercase-keys": "^1.0.0",
        "safe-buffer": "^5.0.1",
        "timed-out": "^4.0.0",
        "unzip-response": "^2.0.1",
        "url-parse-lax": "^1.0.0"
      }
    },
    "graceful-fs": {
      "version": "4.2.2",
      "resolved": "https://registry.npmjs.org/graceful-fs/-/graceful-fs-4.2.2.tgz",
      "integrity": "sha512-IItsdsea19BoLC7ELy13q1iJFNmd7ofZH5+X/pJr90/nRoPEX0DJo1dHDbgtYWOhJhcCgMDTOw84RZ72q6lB+Q=="
    },
    "growly": {
      "version": "1.3.0",
      "resolved": "https://registry.npmjs.org/growly/-/growly-1.3.0.tgz",
      "integrity": "sha1-8QdIy+dq+WS3yWyTxrzCivEgwIE="
    },
    "grpc": {
      "version": "1.20.3",
      "resolved": "https://registry.npmjs.org/grpc/-/grpc-1.20.3.tgz",
      "integrity": "sha512-GsEsi0NVj6usS/xor8pF/xDbDiwZQR59aZl5NUZ59Sy2bdPQFZ3UePr5wevZjHboirRCIQCKRI1cCgvSWUe2ag==",
      "requires": {
        "lodash.camelcase": "^4.3.0",
        "lodash.clone": "^4.5.0",
        "nan": "^2.13.2",
        "node-pre-gyp": "^0.13.0",
        "protobufjs": "^5.0.3"
      },
      "dependencies": {
        "abbrev": {
          "version": "1.1.1",
          "bundled": true
        },
        "ansi-regex": {
          "version": "2.1.1",
          "bundled": true
        },
        "aproba": {
          "version": "1.2.0",
          "bundled": true
        },
        "are-we-there-yet": {
          "version": "1.1.5",
          "bundled": true,
          "requires": {
            "delegates": "^1.0.0",
            "readable-stream": "^2.0.6"
          }
        },
        "balanced-match": {
          "version": "1.0.0",
          "bundled": true
        },
        "brace-expansion": {
          "version": "1.1.11",
          "bundled": true,
          "requires": {
            "balanced-match": "^1.0.0",
            "concat-map": "0.0.1"
          }
        },
        "chownr": {
          "version": "1.1.1",
          "bundled": true
        },
        "code-point-at": {
          "version": "1.1.0",
          "bundled": true
        },
        "concat-map": {
          "version": "0.0.1",
          "bundled": true
        },
        "console-control-strings": {
          "version": "1.1.0",
          "bundled": true
        },
        "core-util-is": {
          "version": "1.0.2",
          "bundled": true
        },
        "deep-extend": {
          "version": "0.6.0",
          "bundled": true
        },
        "delegates": {
          "version": "1.0.0",
          "bundled": true
        },
        "detect-libc": {
          "version": "1.0.3",
          "bundled": true
        },
        "fs-minipass": {
          "version": "1.2.5",
          "bundled": true,
          "requires": {
            "minipass": "^2.2.1"
          }
        },
        "fs.realpath": {
          "version": "1.0.0",
          "bundled": true
        },
        "gauge": {
          "version": "2.7.4",
          "bundled": true,
          "requires": {
            "aproba": "^1.0.3",
            "console-control-strings": "^1.0.0",
            "has-unicode": "^2.0.0",
            "object-assign": "^4.1.0",
            "signal-exit": "^3.0.0",
            "string-width": "^1.0.1",
            "strip-ansi": "^3.0.1",
            "wide-align": "^1.1.0"
          }
        },
        "has-unicode": {
          "version": "2.0.1",
          "bundled": true
        },
        "iconv-lite": {
          "version": "0.4.23",
          "bundled": true,
          "requires": {
            "safer-buffer": ">= 2.1.2 < 3"
          }
        },
        "ignore-walk": {
          "version": "3.0.1",
          "bundled": true,
          "requires": {
            "minimatch": "^3.0.4"
          }
        },
        "inflight": {
          "version": "1.0.6",
          "bundled": true,
          "requires": {
            "once": "^1.3.0",
            "wrappy": "1"
          }
        },
        "inherits": {
          "version": "2.0.3",
          "bundled": true
        },
        "ini": {
          "version": "1.3.5",
          "bundled": true
        },
        "is-fullwidth-code-point": {
          "version": "1.0.0",
          "bundled": true,
          "requires": {
            "number-is-nan": "^1.0.0"
          }
        },
        "isarray": {
          "version": "1.0.0",
          "bundled": true
        },
        "minimatch": {
          "version": "3.0.4",
          "bundled": true,
          "requires": {
            "brace-expansion": "^1.1.7"
          }
        },
        "minimist": {
          "version": "1.2.0",
          "bundled": true
        },
        "minipass": {
          "version": "2.3.5",
          "bundled": true,
          "requires": {
            "safe-buffer": "^5.1.2",
            "yallist": "^3.0.0"
          }
        },
        "minizlib": {
          "version": "1.2.1",
          "bundled": true,
          "requires": {
            "minipass": "^2.2.1"
          }
        },
        "mkdirp": {
          "version": "0.5.1",
          "bundled": true,
          "requires": {
            "minimist": "0.0.8"
          },
          "dependencies": {
            "minimist": {
              "version": "0.0.8",
              "bundled": true
            }
          }
        },
        "needle": {
          "version": "2.3.1",
          "bundled": true,
          "requires": {
            "debug": "^4.1.0",
            "iconv-lite": "^0.4.4",
            "sax": "^1.2.4"
          },
          "dependencies": {
            "debug": {
              "version": "4.1.1",
              "bundled": true,
              "requires": {
                "ms": "^2.1.1"
              }
            },
            "ms": {
              "version": "2.1.1",
              "bundled": true
            }
          }
        },
        "node-pre-gyp": {
          "version": "0.13.0",
          "bundled": true,
          "requires": {
            "detect-libc": "^1.0.2",
            "mkdirp": "^0.5.1",
            "needle": "^2.2.1",
            "nopt": "^4.0.1",
            "npm-packlist": "^1.1.6",
            "npmlog": "^4.0.2",
            "rc": "^1.2.7",
            "rimraf": "^2.6.1",
            "semver": "^5.3.0",
            "tar": "^4"
          }
        },
        "nopt": {
          "version": "4.0.1",
          "bundled": true,
          "requires": {
            "abbrev": "1",
            "osenv": "^0.1.4"
          }
        },
        "npm-bundled": {
          "version": "1.0.6",
          "bundled": true
        },
        "npm-packlist": {
          "version": "1.4.1",
          "bundled": true,
          "requires": {
            "ignore-walk": "^3.0.1",
            "npm-bundled": "^1.0.1"
          }
        },
        "npmlog": {
          "version": "4.1.2",
          "bundled": true,
          "requires": {
            "are-we-there-yet": "~1.1.2",
            "console-control-strings": "~1.1.0",
            "gauge": "~2.7.3",
            "set-blocking": "~2.0.0"
          }
        },
        "number-is-nan": {
          "version": "1.0.1",
          "bundled": true
        },
        "object-assign": {
          "version": "4.1.1",
          "bundled": true
        },
        "once": {
          "version": "1.4.0",
          "bundled": true,
          "requires": {
            "wrappy": "1"
          }
        },
        "os-homedir": {
          "version": "1.0.2",
          "bundled": true
        },
        "os-tmpdir": {
          "version": "1.0.2",
          "bundled": true
        },
        "osenv": {
          "version": "0.1.5",
          "bundled": true,
          "requires": {
            "os-homedir": "^1.0.0",
            "os-tmpdir": "^1.0.0"
          }
        },
        "path-is-absolute": {
          "version": "1.0.1",
          "bundled": true
        },
        "process-nextick-args": {
          "version": "2.0.0",
          "bundled": true
        },
        "protobufjs": {
          "version": "5.0.3",
          "resolved": "https://registry.npmjs.org/protobufjs/-/protobufjs-5.0.3.tgz",
          "integrity": "sha512-55Kcx1MhPZX0zTbVosMQEO5R6/rikNXd9b6RQK4KSPcrSIIwoXTtebIczUrXlwaSrbz4x8XUVThGPob1n8I4QA==",
          "requires": {
            "ascli": "~1",
            "bytebuffer": "~5",
            "glob": "^7.0.5",
            "yargs": "^3.10.0"
          }
        },
        "rc": {
          "version": "1.2.8",
          "bundled": true,
          "requires": {
            "deep-extend": "^0.6.0",
            "ini": "~1.3.0",
            "minimist": "^1.2.0",
            "strip-json-comments": "~2.0.1"
          }
        },
        "readable-stream": {
          "version": "2.3.6",
          "bundled": true,
          "requires": {
            "core-util-is": "~1.0.0",
            "inherits": "~2.0.3",
            "isarray": "~1.0.0",
            "process-nextick-args": "~2.0.0",
            "safe-buffer": "~5.1.1",
            "string_decoder": "~1.1.1",
            "util-deprecate": "~1.0.1"
          }
        },
        "rimraf": {
          "version": "2.6.3",
          "bundled": true,
          "requires": {
            "glob": "^7.1.3"
          },
          "dependencies": {
            "glob": {
              "version": "7.1.3",
              "bundled": true,
              "requires": {
                "fs.realpath": "^1.0.0",
                "inflight": "^1.0.4",
                "inherits": "2",
                "minimatch": "^3.0.4",
                "once": "^1.3.0",
                "path-is-absolute": "^1.0.0"
              }
            }
          }
        },
        "safe-buffer": {
          "version": "5.1.2",
          "bundled": true
        },
        "safer-buffer": {
          "version": "2.1.2",
          "bundled": true
        },
        "sax": {
          "version": "1.2.4",
          "bundled": true
        },
        "semver": {
          "version": "5.7.0",
          "bundled": true
        },
        "set-blocking": {
          "version": "2.0.0",
          "bundled": true
        },
        "signal-exit": {
          "version": "3.0.2",
          "bundled": true
        },
        "string-width": {
          "version": "1.0.2",
          "bundled": true,
          "requires": {
            "code-point-at": "^1.0.0",
            "is-fullwidth-code-point": "^1.0.0",
            "strip-ansi": "^3.0.0"
          }
        },
        "string_decoder": {
          "version": "1.1.1",
          "bundled": true,
          "requires": {
            "safe-buffer": "~5.1.0"
          }
        },
        "strip-ansi": {
          "version": "3.0.1",
          "bundled": true,
          "requires": {
            "ansi-regex": "^2.0.0"
          }
        },
        "strip-json-comments": {
          "version": "2.0.1",
          "bundled": true
        },
        "tar": {
          "version": "4.4.8",
          "bundled": true,
          "requires": {
            "chownr": "^1.1.1",
            "fs-minipass": "^1.2.5",
            "minipass": "^2.3.4",
            "minizlib": "^1.1.1",
            "mkdirp": "^0.5.0",
            "safe-buffer": "^5.1.2",
            "yallist": "^3.0.2"
          }
        },
        "util-deprecate": {
          "version": "1.0.2",
          "bundled": true
        },
        "wide-align": {
          "version": "1.1.3",
          "bundled": true,
          "requires": {
            "string-width": "^1.0.2 || 2"
          }
        },
        "wrappy": {
          "version": "1.0.2",
          "bundled": true
        },
        "yallist": {
          "version": "3.0.3",
          "bundled": true
        }
      }
    },
    "gtoken": {
      "version": "1.2.3",
      "resolved": "https://registry.npmjs.org/gtoken/-/gtoken-1.2.3.tgz",
      "integrity": "sha512-wQAJflfoqSgMWrSBk9Fg86q+sd6s7y6uJhIvvIPz++RElGlMtEqsdAR2oWwZ/WTEtp7P9xFbJRrT976oRgzJ/w==",
      "requires": {
        "google-p12-pem": "^0.1.0",
        "jws": "^3.0.0",
        "mime": "^1.4.1",
        "request": "^2.72.0"
      }
    },
    "gud": {
      "version": "1.0.0",
      "resolved": "https://registry.npmjs.org/gud/-/gud-1.0.0.tgz",
      "integrity": "sha512-zGEOVKFM5sVPPrYs7J5/hYEw2Pof8KCyOwyhG8sAF26mCAeUFAcYPu1mwB7hhpIP29zOIBaDqwuHdLp0jvZXjw=="
    },
    "gzip-size": {
      "version": "5.1.1",
      "resolved": "https://registry.npmjs.org/gzip-size/-/gzip-size-5.1.1.tgz",
      "integrity": "sha512-FNHi6mmoHvs1mxZAds4PpdCS6QG8B4C1krxJsMutgxl5t3+GlRTzzI3NEkifXx2pVsOvJdOGSmIgDhQ55FwdPA==",
      "requires": {
        "duplexer": "^0.1.1",
        "pify": "^4.0.1"
      },
      "dependencies": {
        "pify": {
          "version": "4.0.1",
          "resolved": "https://registry.npmjs.org/pify/-/pify-4.0.1.tgz",
          "integrity": "sha512-uB80kBFb/tfd68bVleG9T5GGsGPjJrLAUpR5PZIrhBnIaRTQRjqdJSsIKkOP6OAIFbj7GOrcudc5pNjZ+geV2g=="
        }
      }
    },
    "handle-thing": {
      "version": "2.0.0",
      "resolved": "https://registry.npmjs.org/handle-thing/-/handle-thing-2.0.0.tgz",
      "integrity": "sha512-d4sze1JNC454Wdo2fkuyzCr6aHcbL6PGGuFAz0Li/NcOm1tCHGnWDRmJP85dh9IhQErTc2svWFEX5xHIOo//kQ=="
    },
    "handlebars": {
      "version": "4.1.2",
      "resolved": "https://registry.npmjs.org/handlebars/-/handlebars-4.1.2.tgz",
      "integrity": "sha512-nvfrjqvt9xQ8Z/w0ijewdD/vvWDTOweBUm96NTr66Wfvo1mJenBLwcYmPs3TIBP5ruzYGD7Hx/DaM9RmhroGPw==",
      "requires": {
        "neo-async": "^2.6.0",
        "optimist": "^0.6.1",
        "source-map": "^0.6.1",
        "uglify-js": "^3.1.4"
      },
      "dependencies": {
        "source-map": {
          "version": "0.6.1",
          "resolved": "https://registry.npmjs.org/source-map/-/source-map-0.6.1.tgz",
          "integrity": "sha512-UjgapumWlbMhkBgzT7Ykc5YXUT46F0iKu8SGXq0bcwP5dz/h0Plj6enJqjz1Zbq2l5WaqYnrVbwWOWMyF3F47g=="
        }
      }
    },
    "har-schema": {
      "version": "2.0.0",
      "resolved": "https://registry.npmjs.org/har-schema/-/har-schema-2.0.0.tgz",
      "integrity": "sha1-qUwiJOvKwEeCoNkDVSHyRzW37JI="
    },
    "har-validator": {
      "version": "5.1.3",
      "resolved": "https://registry.npmjs.org/har-validator/-/har-validator-5.1.3.tgz",
      "integrity": "sha512-sNvOCzEQNr/qrvJgc3UG/kD4QtlHycrzwS+6mfTrrSq97BvaYcPZZI1ZSqGSPR73Cxn4LKTD4PttRwfU7jWq5g==",
      "requires": {
        "ajv": "^6.5.5",
        "har-schema": "^2.0.0"
      }
    },
    "harmony-reflect": {
      "version": "1.6.1",
      "resolved": "https://registry.npmjs.org/harmony-reflect/-/harmony-reflect-1.6.1.tgz",
      "integrity": "sha512-WJTeyp0JzGtHcuMsi7rw2VwtkvLa+JyfEKJCFyfcS0+CDkjQ5lHPu7zEhFZP+PDSRrEgXa5Ah0l1MbgbE41XjA=="
    },
    "has": {
      "version": "1.0.3",
      "resolved": "https://registry.npmjs.org/has/-/has-1.0.3.tgz",
      "integrity": "sha512-f2dvO0VU6Oej7RkWJGrehjbzMAjFp5/VKPp5tTpWIV4JHHZK1/BxbFRtf/siA2SWTe09caDmVtYYzWEIbBS4zw==",
      "requires": {
        "function-bind": "^1.1.1"
      }
    },
    "has-ansi": {
      "version": "2.0.0",
      "resolved": "https://registry.npmjs.org/has-ansi/-/has-ansi-2.0.0.tgz",
      "integrity": "sha1-NPUEnOHs3ysGSa8+8k5F7TVBbZE=",
      "requires": {
        "ansi-regex": "^2.0.0"
      }
    },
    "has-flag": {
      "version": "3.0.0",
      "resolved": "https://registry.npmjs.org/has-flag/-/has-flag-3.0.0.tgz",
      "integrity": "sha1-tdRU3CGZriJWmfNGfloH87lVuv0="
    },
    "has-symbols": {
      "version": "1.0.0",
      "resolved": "https://registry.npmjs.org/has-symbols/-/has-symbols-1.0.0.tgz",
      "integrity": "sha1-uhqPGvKg/DllD1yFA2dwQSIGO0Q="
    },
    "has-value": {
      "version": "1.0.0",
      "resolved": "https://registry.npmjs.org/has-value/-/has-value-1.0.0.tgz",
      "integrity": "sha1-GLKB2lhbHFxR3vJMkw7SmgvmsXc=",
      "requires": {
        "get-value": "^2.0.6",
        "has-values": "^1.0.0",
        "isobject": "^3.0.0"
      }
    },
    "has-values": {
      "version": "1.0.0",
      "resolved": "https://registry.npmjs.org/has-values/-/has-values-1.0.0.tgz",
      "integrity": "sha1-lbC2P+whRmGab+V/51Yo1aOe/k8=",
      "requires": {
        "is-number": "^3.0.0",
        "kind-of": "^4.0.0"
      },
      "dependencies": {
        "kind-of": {
          "version": "4.0.0",
          "resolved": "https://registry.npmjs.org/kind-of/-/kind-of-4.0.0.tgz",
          "integrity": "sha1-IIE989cSkosgc3hpGkUGb65y3Vc=",
          "requires": {
            "is-buffer": "^1.1.5"
          }
        }
      }
    },
    "hash-base": {
      "version": "3.0.4",
      "resolved": "https://registry.npmjs.org/hash-base/-/hash-base-3.0.4.tgz",
      "integrity": "sha1-X8hoaEfs1zSZQDMZprCj8/auSRg=",
      "requires": {
        "inherits": "^2.0.1",
        "safe-buffer": "^5.0.1"
      }
    },
    "hash.js": {
      "version": "1.1.7",
      "resolved": "https://registry.npmjs.org/hash.js/-/hash.js-1.1.7.tgz",
      "integrity": "sha512-taOaskGt4z4SOANNseOviYDvjEJinIkRgmp7LbKP2YTTmVxWBl87s/uzK9r+44BclBSp2X7K1hqeNfz9JbBeXA==",
      "requires": {
        "inherits": "^2.0.3",
        "minimalistic-assert": "^1.0.1"
      }
    },
    "he": {
      "version": "1.2.0",
      "resolved": "https://registry.npmjs.org/he/-/he-1.2.0.tgz",
      "integrity": "sha512-F/1DnUGPopORZi0ni+CvrCgHQ5FyEAHRLSApuYWMmrbSwoN2Mn/7k+Gl38gJnR7yyDZk6WLXwiGod1JOWNDKGw=="
    },
    "hex-color-regex": {
      "version": "1.1.0",
      "resolved": "https://registry.npmjs.org/hex-color-regex/-/hex-color-regex-1.1.0.tgz",
      "integrity": "sha512-l9sfDFsuqtOqKDsQdqrMRk0U85RZc0RtOR9yPI7mRVOa4FsR/BVnZ0shmQRM96Ji99kYZP/7hn1cedc1+ApsTQ=="
    },
    "history": {
      "version": "4.9.0",
      "resolved": "https://registry.npmjs.org/history/-/history-4.9.0.tgz",
      "integrity": "sha512-H2DkjCjXf0Op9OAr6nJ56fcRkTSNrUiv41vNJ6IswJjif6wlpZK0BTfFbi7qK9dXLSYZxkq5lBsj3vUjlYBYZA==",
      "requires": {
        "@babel/runtime": "^7.1.2",
        "loose-envify": "^1.2.0",
        "resolve-pathname": "^2.2.0",
        "tiny-invariant": "^1.0.2",
        "tiny-warning": "^1.0.0",
        "value-equal": "^0.4.0"
      }
    },
    "hmac-drbg": {
      "version": "1.0.1",
      "resolved": "https://registry.npmjs.org/hmac-drbg/-/hmac-drbg-1.0.1.tgz",
      "integrity": "sha1-0nRXAQJabHdabFRXk+1QL8DGSaE=",
      "requires": {
        "hash.js": "^1.0.3",
        "minimalistic-assert": "^1.0.0",
        "minimalistic-crypto-utils": "^1.0.1"
      }
    },
    "hoist-non-react-statics": {
      "version": "3.3.0",
      "resolved": "https://registry.npmjs.org/hoist-non-react-statics/-/hoist-non-react-statics-3.3.0.tgz",
      "integrity": "sha512-0XsbTXxgiaCDYDIWFcwkmerZPSwywfUqYmwT4jzewKTQSWoE6FCMoUVOeBJWK3E/CrWbxRG3m5GzY4lnIwGRBA==",
      "requires": {
        "react-is": "^16.7.0"
      }
    },
    "home-dir": {
      "version": "1.0.0",
      "resolved": "https://registry.npmjs.org/home-dir/-/home-dir-1.0.0.tgz",
      "integrity": "sha1-KRfrRL3JByztqUJXlUOEfjAX/k4="
    },
    "hosted-git-info": {
      "version": "2.8.4",
      "resolved": "https://registry.npmjs.org/hosted-git-info/-/hosted-git-info-2.8.4.tgz",
      "integrity": "sha512-pzXIvANXEFrc5oFFXRMkbLPQ2rXRoDERwDLyrcUxGhaZhgP54BBSl9Oheh7Vv0T090cszWBxPjkQQ5Sq1PbBRQ=="
    },
    "hpack.js": {
      "version": "2.1.6",
      "resolved": "https://registry.npmjs.org/hpack.js/-/hpack.js-2.1.6.tgz",
      "integrity": "sha1-h3dMCUnlE/QuhFdbPEVoH63ioLI=",
      "requires": {
        "inherits": "^2.0.1",
        "obuf": "^1.0.0",
        "readable-stream": "^2.0.1",
        "wbuf": "^1.1.0"
      }
    },
    "hsl-regex": {
      "version": "1.0.0",
      "resolved": "https://registry.npmjs.org/hsl-regex/-/hsl-regex-1.0.0.tgz",
      "integrity": "sha1-1JMwx4ntgZ4nakwNJy3/owsY/m4="
    },
    "hsla-regex": {
      "version": "1.0.0",
      "resolved": "https://registry.npmjs.org/hsla-regex/-/hsla-regex-1.0.0.tgz",
      "integrity": "sha1-wc56MWjIxmFAM6S194d/OyJfnDg="
    },
    "html-comment-regex": {
      "version": "1.1.2",
      "resolved": "https://registry.npmjs.org/html-comment-regex/-/html-comment-regex-1.1.2.tgz",
      "integrity": "sha512-P+M65QY2JQ5Y0G9KKdlDpo0zK+/OHptU5AaBwUfAIDJZk1MYf32Frm84EcOytfJE0t5JvkAnKlmjsXDnWzCJmQ=="
    },
    "html-encoding-sniffer": {
      "version": "1.0.2",
      "resolved": "https://registry.npmjs.org/html-encoding-sniffer/-/html-encoding-sniffer-1.0.2.tgz",
      "integrity": "sha512-71lZziiDnsuabfdYiUeWdCVyKuqwWi23L8YeIgV9jSSZHCtb6wB1BKWooH7L3tn4/FuZJMVWyNaIDr4RGmaSYw==",
      "requires": {
        "whatwg-encoding": "^1.0.1"
      }
    },
    "html-entities": {
      "version": "1.2.1",
      "resolved": "https://registry.npmjs.org/html-entities/-/html-entities-1.2.1.tgz",
      "integrity": "sha1-DfKTUfByEWNRXfueVUPl9u7VFi8="
    },
    "html-minifier": {
      "version": "3.5.21",
      "resolved": "https://registry.npmjs.org/html-minifier/-/html-minifier-3.5.21.tgz",
      "integrity": "sha512-LKUKwuJDhxNa3uf/LPR/KVjm/l3rBqtYeCOAekvG8F1vItxMUpueGd94i/asDDr8/1u7InxzFA5EeGjhhG5mMA==",
      "requires": {
        "camel-case": "3.0.x",
        "clean-css": "4.2.x",
        "commander": "2.17.x",
        "he": "1.2.x",
        "param-case": "2.1.x",
        "relateurl": "0.2.x",
        "uglify-js": "3.4.x"
      },
      "dependencies": {
        "commander": {
          "version": "2.17.1",
          "resolved": "https://registry.npmjs.org/commander/-/commander-2.17.1.tgz",
          "integrity": "sha512-wPMUt6FnH2yzG95SA6mzjQOEKUU3aLaDEmzs1ti+1E9h+CsrZghRlqEM/EJ4KscsQVG8uNN4uVreUeT8+drlgg=="
        }
      }
    },
    "html-webpack-plugin": {
      "version": "4.0.0-beta.5",
      "resolved": "https://registry.npmjs.org/html-webpack-plugin/-/html-webpack-plugin-4.0.0-beta.5.tgz",
      "integrity": "sha512-y5l4lGxOW3pz3xBTFdfB9rnnrWRPVxlAhX6nrBYIcW+2k2zC3mSp/3DxlWVCMBfnO6UAnoF8OcFn0IMy6kaKAQ==",
      "requires": {
        "html-minifier": "^3.5.20",
        "loader-utils": "^1.1.0",
        "lodash": "^4.17.11",
        "pretty-error": "^2.1.1",
        "tapable": "^1.1.0",
        "util.promisify": "1.0.0"
      }
    },
    "htmlparser2": {
      "version": "3.10.1",
      "resolved": "https://registry.npmjs.org/htmlparser2/-/htmlparser2-3.10.1.tgz",
      "integrity": "sha512-IgieNijUMbkDovyoKObU1DUhm1iwNYE/fuifEoEHfd1oZKZDaONBSkal7Y01shxsM49R4XaMdGez3WnF9UfiCQ==",
      "requires": {
        "domelementtype": "^1.3.1",
        "domhandler": "^2.3.0",
        "domutils": "^1.5.1",
        "entities": "^1.1.1",
        "inherits": "^2.0.1",
        "readable-stream": "^3.1.1"
      },
      "dependencies": {
        "entities": {
          "version": "1.1.2",
          "resolved": "https://registry.npmjs.org/entities/-/entities-1.1.2.tgz",
          "integrity": "sha512-f2LZMYl1Fzu7YSBKg+RoROelpOaNrcGmE9AZubeDfrCEia483oW4MI4VyFd5VNHIgQ/7qm1I0wUHK1eJnn2y2w=="
        },
        "readable-stream": {
          "version": "3.4.0",
          "resolved": "https://registry.npmjs.org/readable-stream/-/readable-stream-3.4.0.tgz",
          "integrity": "sha512-jItXPLmrSR8jmTRmRWJXCnGJsfy85mB3Wd/uINMXA65yrnFo0cPClFIUWzo2najVNSl+mx7/4W8ttlLWJe99pQ==",
          "requires": {
            "inherits": "^2.0.3",
            "string_decoder": "^1.1.1",
            "util-deprecate": "^1.0.1"
          }
        }
      }
    },
    "http-deceiver": {
      "version": "1.2.7",
      "resolved": "https://registry.npmjs.org/http-deceiver/-/http-deceiver-1.2.7.tgz",
      "integrity": "sha1-+nFolEq5pRnTN8sL7HKE3D5yPYc="
    },
    "http-errors": {
      "version": "1.7.2",
      "resolved": "https://registry.npmjs.org/http-errors/-/http-errors-1.7.2.tgz",
      "integrity": "sha512-uUQBt3H/cSIVfch6i1EuPNy/YsRSOUBXTVfZ+yR7Zjez3qjBz6i9+i4zjNaoqcoFVI4lQJ5plg63TvGfRSDCRg==",
      "requires": {
        "depd": "~1.1.2",
        "inherits": "2.0.3",
        "setprototypeof": "1.1.1",
        "statuses": ">= 1.5.0 < 2",
        "toidentifier": "1.0.0"
      },
      "dependencies": {
        "inherits": {
          "version": "2.0.3",
          "resolved": "https://registry.npmjs.org/inherits/-/inherits-2.0.3.tgz",
          "integrity": "sha1-Yzwsg+PaQqUC9SRmAiSA9CCCYd4="
        }
      }
    },
    "http-parser-js": {
      "version": "0.4.10",
      "resolved": "https://registry.npmjs.org/http-parser-js/-/http-parser-js-0.4.10.tgz",
      "integrity": "sha1-ksnBN0w1CF912zWexWzCV8u5P6Q="
    },
    "http-proxy": {
      "version": "1.17.0",
      "resolved": "https://registry.npmjs.org/http-proxy/-/http-proxy-1.17.0.tgz",
      "integrity": "sha512-Taqn+3nNvYRfJ3bGvKfBSRwy1v6eePlm3oc/aWVxZp57DQr5Eq3xhKJi7Z4hZpS8PC3H4qI+Yly5EmFacGuA/g==",
      "requires": {
        "eventemitter3": "^3.0.0",
        "follow-redirects": "^1.0.0",
        "requires-port": "^1.0.0"
      }
    },
    "http-proxy-middleware": {
      "version": "0.19.1",
      "resolved": "https://registry.npmjs.org/http-proxy-middleware/-/http-proxy-middleware-0.19.1.tgz",
      "integrity": "sha512-yHYTgWMQO8VvwNS22eLLloAkvungsKdKTLO8AJlftYIKNfJr3GK3zK0ZCfzDDGUBttdGc8xFy1mCitvNKQtC3Q==",
      "requires": {
        "http-proxy": "^1.17.0",
        "is-glob": "^4.0.0",
        "lodash": "^4.17.11",
        "micromatch": "^3.1.10"
      }
    },
    "http-signature": {
      "version": "1.2.0",
      "resolved": "https://registry.npmjs.org/http-signature/-/http-signature-1.2.0.tgz",
      "integrity": "sha1-muzZJRFHcvPZW2WmCruPfBj7rOE=",
      "requires": {
        "assert-plus": "^1.0.0",
        "jsprim": "^1.2.2",
        "sshpk": "^1.7.0"
      }
    },
    "https-browserify": {
      "version": "1.0.0",
      "resolved": "https://registry.npmjs.org/https-browserify/-/https-browserify-1.0.0.tgz",
      "integrity": "sha1-7AbBDgo0wPL68Zn3/X/Hj//QPHM="
    },
    "humps": {
      "version": "2.0.1",
      "resolved": "https://registry.npmjs.org/humps/-/humps-2.0.1.tgz",
      "integrity": "sha1-3QLqYIG9BWjcXQcxhEY5V7qe+ao="
    },
    "iconv-lite": {
      "version": "0.4.24",
      "resolved": "https://registry.npmjs.org/iconv-lite/-/iconv-lite-0.4.24.tgz",
      "integrity": "sha512-v3MXnZAcvnywkTUEZomIActle7RXXeedOR31wwl7VlyoXO4Qi9arvSenNQWne1TcRwhCL1HwLI21bEqdpj8/rA==",
      "requires": {
        "safer-buffer": ">= 2.1.2 < 3"
      }
    },
    "icss-replace-symbols": {
      "version": "1.1.0",
      "resolved": "https://registry.npmjs.org/icss-replace-symbols/-/icss-replace-symbols-1.1.0.tgz",
      "integrity": "sha1-Bupvg2ead0njhs/h/oEq5dsiPe0="
    },
    "icss-utils": {
      "version": "4.1.1",
      "resolved": "https://registry.npmjs.org/icss-utils/-/icss-utils-4.1.1.tgz",
      "integrity": "sha512-4aFq7wvWyMHKgxsH8QQtGpvbASCf+eM3wPRLI6R+MgAnTCZ6STYsRvttLvRWK0Nfif5piF394St3HeJDaljGPA==",
      "requires": {
        "postcss": "^7.0.14"
      }
    },
    "idb": {
      "version": "3.0.2",
      "resolved": "https://registry.npmjs.org/idb/-/idb-3.0.2.tgz",
      "integrity": "sha512-+FLa/0sTXqyux0o6C+i2lOR0VoS60LU/jzUo5xjfY6+7sEEgy4Gz1O7yFBXvjd7N0NyIGWIRg8DcQSLEG+VSPw=="
    },
    "identity-obj-proxy": {
      "version": "3.0.0",
      "resolved": "https://registry.npmjs.org/identity-obj-proxy/-/identity-obj-proxy-3.0.0.tgz",
      "integrity": "sha1-lNK9qWCERT7zb7xarsN+D3nx/BQ=",
      "requires": {
        "harmony-reflect": "^1.4.6"
      }
    },
    "ieee754": {
      "version": "1.1.13",
      "resolved": "https://registry.npmjs.org/ieee754/-/ieee754-1.1.13.tgz",
      "integrity": "sha512-4vf7I2LYV/HaWerSo3XmlMkp5eZ83i+/CDluXi/IGTs/O1sejBNhTtnxzmRZfvOUqj7lZjqHkeTvpgSFDlWZTg=="
    },
    "iferr": {
      "version": "0.1.5",
      "resolved": "https://registry.npmjs.org/iferr/-/iferr-0.1.5.tgz",
      "integrity": "sha1-xg7taebY/bazEEofy8ocGS3FtQE="
    },
    "ignore": {
      "version": "3.3.10",
      "resolved": "https://registry.npmjs.org/ignore/-/ignore-3.3.10.tgz",
      "integrity": "sha512-Pgs951kaMm5GXP7MOvxERINe3gsaVjUWFm+UZPSq9xYriQAksyhg0csnS0KXSNRD5NmNdapXEpjxG49+AKh/ug=="
    },
    "immer": {
      "version": "1.10.0",
      "resolved": "https://registry.npmjs.org/immer/-/immer-1.10.0.tgz",
      "integrity": "sha512-O3sR1/opvCDGLEVcvrGTMtLac8GJ5IwZC4puPrLuRj3l7ICKvkmA0vGuU9OW8mV9WIBRnaxp5GJh9IEAaNOoYg=="
    },
    "import-cwd": {
      "version": "2.1.0",
      "resolved": "https://registry.npmjs.org/import-cwd/-/import-cwd-2.1.0.tgz",
      "integrity": "sha1-qmzzbnInYShcs3HsZRn1PiQ1sKk=",
      "requires": {
        "import-from": "^2.1.0"
      }
    },
    "import-fresh": {
      "version": "2.0.0",
      "resolved": "https://registry.npmjs.org/import-fresh/-/import-fresh-2.0.0.tgz",
      "integrity": "sha1-2BNVwVYS04bGH53dOSLUMEgipUY=",
      "requires": {
        "caller-path": "^2.0.0",
        "resolve-from": "^3.0.0"
      },
      "dependencies": {
        "caller-path": {
          "version": "2.0.0",
          "resolved": "https://registry.npmjs.org/caller-path/-/caller-path-2.0.0.tgz",
          "integrity": "sha1-Ro+DBE42mrIBD6xfBs7uFbsssfQ=",
          "requires": {
            "caller-callsite": "^2.0.0"
          }
        },
        "resolve-from": {
          "version": "3.0.0",
          "resolved": "https://registry.npmjs.org/resolve-from/-/resolve-from-3.0.0.tgz",
          "integrity": "sha1-six699nWiBvItuZTM17rywoYh0g="
        }
      }
    },
    "import-from": {
      "version": "2.1.0",
      "resolved": "https://registry.npmjs.org/import-from/-/import-from-2.1.0.tgz",
      "integrity": "sha1-M1238qev/VOqpHHUuAId7ja387E=",
      "requires": {
        "resolve-from": "^3.0.0"
      },
      "dependencies": {
        "resolve-from": {
          "version": "3.0.0",
          "resolved": "https://registry.npmjs.org/resolve-from/-/resolve-from-3.0.0.tgz",
          "integrity": "sha1-six699nWiBvItuZTM17rywoYh0g="
        }
      }
    },
    "import-lazy": {
      "version": "2.1.0",
      "resolved": "https://registry.npmjs.org/import-lazy/-/import-lazy-2.1.0.tgz",
      "integrity": "sha1-BWmOPUXIjo1+nZLLBYTnfwlvPkM="
    },
    "import-local": {
      "version": "2.0.0",
      "resolved": "https://registry.npmjs.org/import-local/-/import-local-2.0.0.tgz",
      "integrity": "sha512-b6s04m3O+s3CGSbqDIyP4R6aAwAeYlVq9+WUWep6iHa8ETRf9yei1U48C5MmfJmV9AiLYYBKPMq/W+/WRpQmCQ==",
      "requires": {
        "pkg-dir": "^3.0.0",
        "resolve-cwd": "^2.0.0"
      },
      "dependencies": {
        "find-up": {
          "version": "3.0.0",
          "resolved": "https://registry.npmjs.org/find-up/-/find-up-3.0.0.tgz",
          "integrity": "sha512-1yD6RmLI1XBfxugvORwlck6f75tYL+iR0jqwsOrOxMZyGYqUuDhJ0l4AXdO1iX/FTs9cBAMEk1gWSEx1kSbylg==",
          "requires": {
            "locate-path": "^3.0.0"
          }
        },
        "locate-path": {
          "version": "3.0.0",
          "resolved": "https://registry.npmjs.org/locate-path/-/locate-path-3.0.0.tgz",
          "integrity": "sha512-7AO748wWnIhNqAuaty2ZWHkQHRSNfPVIsPIfwEOWO22AmaoVrWavlOcMR5nzTLNYvp36X220/maaRsrec1G65A==",
          "requires": {
            "p-locate": "^3.0.0",
            "path-exists": "^3.0.0"
          }
        },
        "p-limit": {
          "version": "2.2.1",
          "resolved": "https://registry.npmjs.org/p-limit/-/p-limit-2.2.1.tgz",
          "integrity": "sha512-85Tk+90UCVWvbDavCLKPOLC9vvY8OwEX/RtKF+/1OADJMVlFfEHOiMTPVyxg7mk/dKa+ipdHm0OUkTvCpMTuwg==",
          "requires": {
            "p-try": "^2.0.0"
          }
        },
        "p-locate": {
          "version": "3.0.0",
          "resolved": "https://registry.npmjs.org/p-locate/-/p-locate-3.0.0.tgz",
          "integrity": "sha512-x+12w/To+4GFfgJhBEpiDcLozRJGegY+Ei7/z0tSLkMmxGZNybVMSfWj9aJn8Z5Fc7dBUNJOOVgPv2H7IwulSQ==",
          "requires": {
            "p-limit": "^2.0.0"
          }
        },
        "p-try": {
          "version": "2.2.0",
          "resolved": "https://registry.npmjs.org/p-try/-/p-try-2.2.0.tgz",
          "integrity": "sha512-R4nPAVTAU0B9D35/Gk3uJf/7XYbQcyohSKdvAxIRSNghFl4e71hVoGnBNQz9cWaXxO2I10KTC+3jMdvvoKw6dQ=="
        },
        "pkg-dir": {
          "version": "3.0.0",
          "resolved": "https://registry.npmjs.org/pkg-dir/-/pkg-dir-3.0.0.tgz",
          "integrity": "sha512-/E57AYkoeQ25qkxMj5PBOVgF8Kiu/h7cYS30Z5+R7WaiCCBfLq58ZI/dSeaEKb9WVJV5n/03QwrN3IeWIFllvw==",
          "requires": {
            "find-up": "^3.0.0"
          }
        }
      }
    },
    "imurmurhash": {
      "version": "0.1.4",
      "resolved": "https://registry.npmjs.org/imurmurhash/-/imurmurhash-0.1.4.tgz",
      "integrity": "sha1-khi5srkoojixPcT7a21XbyMUU+o="
    },
    "indexes-of": {
      "version": "1.0.1",
      "resolved": "https://registry.npmjs.org/indexes-of/-/indexes-of-1.0.1.tgz",
      "integrity": "sha1-8w9xbI4r00bHtn0985FVZqfAVgc="
    },
    "inflight": {
      "version": "1.0.6",
      "resolved": "https://registry.npmjs.org/inflight/-/inflight-1.0.6.tgz",
      "integrity": "sha1-Sb1jMdfQLQwJvJEKEHW6gWW1bfk=",
      "requires": {
        "once": "^1.3.0",
        "wrappy": "1"
      }
    },
    "inherits": {
      "version": "2.0.4",
      "resolved": "https://registry.npmjs.org/inherits/-/inherits-2.0.4.tgz",
      "integrity": "sha512-k/vGaX4/Yla3WzyMCvTQOXYeIHvqOKtnqBduzTHpzpQZzAskKMhZ2K+EnBiSM9zGSoIFeMpXKxa4dYeZIQqewQ=="
    },
    "ini": {
      "version": "1.3.5",
      "resolved": "https://registry.npmjs.org/ini/-/ini-1.3.5.tgz",
      "integrity": "sha512-RZY5huIKCMRWDUqZlEi72f/lmXKMvuszcMBduliQ3nnWbx9X/ZBQO7DijMEYS9EhHBb2qacRUMtC7svLwe0lcw=="
    },
    "inquirer": {
      "version": "3.3.0",
      "resolved": "https://registry.npmjs.org/inquirer/-/inquirer-3.3.0.tgz",
      "integrity": "sha512-h+xtnyk4EwKvFWHrUYsWErEVR+igKtLdchu+o0Z1RL7VU/jVMFbYir2bp6bAj8efFNxWqHX0dIss6fJQ+/+qeQ==",
      "requires": {
        "ansi-escapes": "^3.0.0",
        "chalk": "^2.0.0",
        "cli-cursor": "^2.1.0",
        "cli-width": "^2.0.0",
        "external-editor": "^2.0.4",
        "figures": "^2.0.0",
        "lodash": "^4.3.0",
        "mute-stream": "0.0.7",
        "run-async": "^2.2.0",
        "rx-lite": "^4.0.8",
        "rx-lite-aggregates": "^4.0.8",
        "string-width": "^2.1.0",
        "strip-ansi": "^4.0.0",
        "through": "^2.3.6"
      },
      "dependencies": {
        "ansi-regex": {
          "version": "3.0.0",
          "resolved": "https://registry.npmjs.org/ansi-regex/-/ansi-regex-3.0.0.tgz",
          "integrity": "sha1-7QMXwyIGT3lGbAKWa922Bas32Zg="
        },
        "ansi-styles": {
          "version": "3.2.1",
          "resolved": "https://registry.npmjs.org/ansi-styles/-/ansi-styles-3.2.1.tgz",
          "integrity": "sha512-VT0ZI6kZRdTh8YyJw3SMbYm/u+NqfsAxEpWO0Pf9sq8/e94WxxOpPKx9FR1FlyCtOVDNOQ+8ntlqFxiRc+r5qA==",
          "requires": {
            "color-convert": "^1.9.0"
          }
        },
        "chalk": {
          "version": "2.4.2",
          "resolved": "https://registry.npmjs.org/chalk/-/chalk-2.4.2.tgz",
          "integrity": "sha512-Mti+f9lpJNcwF4tWV8/OrTTtF1gZi+f8FqlyAdouralcFWFQWF2+NgCHShjkCb+IFBLq9buZwE1xckQU4peSuQ==",
          "requires": {
            "ansi-styles": "^3.2.1",
            "escape-string-regexp": "^1.0.5",
            "supports-color": "^5.3.0"
          }
        },
        "strip-ansi": {
          "version": "4.0.0",
          "resolved": "https://registry.npmjs.org/strip-ansi/-/strip-ansi-4.0.0.tgz",
          "integrity": "sha1-qEeQIusaw2iocTibY1JixQXuNo8=",
          "requires": {
            "ansi-regex": "^3.0.0"
          }
        },
        "supports-color": {
          "version": "5.5.0",
          "resolved": "https://registry.npmjs.org/supports-color/-/supports-color-5.5.0.tgz",
          "integrity": "sha512-QjVjwdXIt408MIiAqCX4oUKsgU2EqAGzs2Ppkm4aQYbjm+ZEWEcW4SfFNTr4uMNZma0ey4f5lgLrkB0aX0QMow==",
          "requires": {
            "has-flag": "^3.0.0"
          }
        }
      }
    },
    "internal-ip": {
      "version": "4.3.0",
      "resolved": "https://registry.npmjs.org/internal-ip/-/internal-ip-4.3.0.tgz",
      "integrity": "sha512-S1zBo1D6zcsyuC6PMmY5+55YMILQ9av8lotMx447Bq6SAgo/sDK6y6uUKmuYhW7eacnIhFfsPmCNYdDzsnnDCg==",
      "requires": {
        "default-gateway": "^4.2.0",
        "ipaddr.js": "^1.9.0"
      }
    },
    "invariant": {
      "version": "2.2.4",
      "resolved": "https://registry.npmjs.org/invariant/-/invariant-2.2.4.tgz",
      "integrity": "sha512-phJfQVBuaJM5raOpJjSfkiD6BpbCE4Ns//LaXl6wGYtUBY83nWS6Rf9tXm2e8VaK60JEjYldbPif/A2B1C2gNA==",
      "requires": {
        "loose-envify": "^1.0.0"
      }
    },
    "invert-kv": {
      "version": "1.0.0",
      "resolved": "https://registry.npmjs.org/invert-kv/-/invert-kv-1.0.0.tgz",
      "integrity": "sha1-EEqOSqym09jNFXqO+L+rLXo//bY="
    },
    "ip": {
      "version": "1.1.5",
      "resolved": "https://registry.npmjs.org/ip/-/ip-1.1.5.tgz",
      "integrity": "sha1-vd7XARQpCCjAoDnnLvJfWq7ENUo="
    },
    "ip-regex": {
      "version": "2.1.0",
      "resolved": "https://registry.npmjs.org/ip-regex/-/ip-regex-2.1.0.tgz",
      "integrity": "sha1-+ni/XS5pE8kRzp+BnuUUa7bYROk="
    },
    "ipaddr.js": {
      "version": "1.9.0",
      "resolved": "https://registry.npmjs.org/ipaddr.js/-/ipaddr.js-1.9.0.tgz",
      "integrity": "sha512-M4Sjn6N/+O6/IXSJseKqHoFc+5FdGJ22sXqnjTpdZweHK64MzEPAyQZyEU3R/KRv2GLoa7nNtg/C2Ev6m7z+eA=="
    },
    "is-absolute-url": {
      "version": "2.1.0",
      "resolved": "https://registry.npmjs.org/is-absolute-url/-/is-absolute-url-2.1.0.tgz",
      "integrity": "sha1-UFMN+4T8yap9vnhS6Do3uTufKqY="
    },
    "is-accessor-descriptor": {
      "version": "0.1.6",
      "resolved": "https://registry.npmjs.org/is-accessor-descriptor/-/is-accessor-descriptor-0.1.6.tgz",
      "integrity": "sha1-qeEss66Nh2cn7u84Q/igiXtcmNY=",
      "requires": {
        "kind-of": "^3.0.2"
      },
      "dependencies": {
        "kind-of": {
          "version": "3.2.2",
          "resolved": "https://registry.npmjs.org/kind-of/-/kind-of-3.2.2.tgz",
          "integrity": "sha1-MeohpzS6ubuw8yRm2JOupR5KPGQ=",
          "requires": {
            "is-buffer": "^1.1.5"
          }
        }
      }
    },
    "is-arrayish": {
      "version": "0.2.1",
      "resolved": "https://registry.npmjs.org/is-arrayish/-/is-arrayish-0.2.1.tgz",
      "integrity": "sha1-d8mYQFJ6qOyxqLppe4BkWnqSap0="
    },
    "is-binary-path": {
      "version": "1.0.1",
      "resolved": "https://registry.npmjs.org/is-binary-path/-/is-binary-path-1.0.1.tgz",
      "integrity": "sha1-dfFmQrSA8YenEcgUFh/TpKdlWJg=",
      "requires": {
        "binary-extensions": "^1.0.0"
      }
    },
    "is-buffer": {
      "version": "1.1.6",
      "resolved": "https://registry.npmjs.org/is-buffer/-/is-buffer-1.1.6.tgz",
      "integrity": "sha512-NcdALwpXkTm5Zvvbk7owOUSvVvBKDgKP5/ewfXEznmQFfs4ZRmanOeKBTjRVjka3QFoN6XJ+9F3USqfHqTaU5w=="
    },
    "is-callable": {
      "version": "1.1.4",
      "resolved": "https://registry.npmjs.org/is-callable/-/is-callable-1.1.4.tgz",
      "integrity": "sha512-r5p9sxJjYnArLjObpjA4xu5EKI3CuKHkJXMhT7kwbpUyIFD1n5PMAsoPvWnvtZiNz7LjkYDRZhd7FlI0eMijEA=="
    },
    "is-ci": {
      "version": "1.2.1",
      "resolved": "https://registry.npmjs.org/is-ci/-/is-ci-1.2.1.tgz",
      "integrity": "sha512-s6tfsaQaQi3JNciBH6shVqEDvhGut0SUXr31ag8Pd8BBbVVlcGfWhpPmEOoM6RJ5TFhbypvf5yyRw/VXW1IiWg==",
      "requires": {
        "ci-info": "^1.5.0"
      }
    },
    "is-color-stop": {
      "version": "1.1.0",
      "resolved": "https://registry.npmjs.org/is-color-stop/-/is-color-stop-1.1.0.tgz",
      "integrity": "sha1-z/9HGu5N1cnhWFmPvhKWe1za00U=",
      "requires": {
        "css-color-names": "^0.0.4",
        "hex-color-regex": "^1.1.0",
        "hsl-regex": "^1.0.0",
        "hsla-regex": "^1.0.0",
        "rgb-regex": "^1.0.1",
        "rgba-regex": "^1.0.0"
      }
    },
    "is-data-descriptor": {
      "version": "0.1.4",
      "resolved": "https://registry.npmjs.org/is-data-descriptor/-/is-data-descriptor-0.1.4.tgz",
      "integrity": "sha1-C17mSDiOLIYCgueT8YVv7D8wG1Y=",
      "requires": {
        "kind-of": "^3.0.2"
      },
      "dependencies": {
        "kind-of": {
          "version": "3.2.2",
          "resolved": "https://registry.npmjs.org/kind-of/-/kind-of-3.2.2.tgz",
          "integrity": "sha1-MeohpzS6ubuw8yRm2JOupR5KPGQ=",
          "requires": {
            "is-buffer": "^1.1.5"
          }
        }
      }
    },
    "is-date-object": {
      "version": "1.0.1",
      "resolved": "https://registry.npmjs.org/is-date-object/-/is-date-object-1.0.1.tgz",
      "integrity": "sha1-mqIOtq7rv/d/vTPnTKAbM1gdOhY="
    },
    "is-descriptor": {
      "version": "0.1.6",
      "resolved": "https://registry.npmjs.org/is-descriptor/-/is-descriptor-0.1.6.tgz",
      "integrity": "sha512-avDYr0SB3DwO9zsMov0gKCESFYqCnE4hq/4z3TdUlukEy5t9C0YRq7HLrsN52NAcqXKaepeCD0n+B0arnVG3Hg==",
      "requires": {
        "is-accessor-descriptor": "^0.1.6",
        "is-data-descriptor": "^0.1.4",
        "kind-of": "^5.0.0"
      },
      "dependencies": {
        "kind-of": {
          "version": "5.1.0",
          "resolved": "https://registry.npmjs.org/kind-of/-/kind-of-5.1.0.tgz",
          "integrity": "sha512-NGEErnH6F2vUuXDh+OlbcKW7/wOcfdRHaZ7VWtqCztfHri/++YKmP51OdWeGPuqCOba6kk2OTe5d02VmTB80Pw=="
        }
      }
    },
    "is-directory": {
      "version": "0.3.1",
      "resolved": "https://registry.npmjs.org/is-directory/-/is-directory-0.3.1.tgz",
      "integrity": "sha1-YTObbyR1/Hcv2cnYP1yFddwVSuE="
    },
    "is-extendable": {
      "version": "0.1.1",
      "resolved": "https://registry.npmjs.org/is-extendable/-/is-extendable-0.1.1.tgz",
      "integrity": "sha1-YrEQ4omkcUGOPsNqYX1HLjAd/Ik="
    },
    "is-extglob": {
      "version": "2.1.1",
      "resolved": "https://registry.npmjs.org/is-extglob/-/is-extglob-2.1.1.tgz",
      "integrity": "sha1-qIwCU1eR8C7TfHahueqXc8gz+MI="
    },
    "is-fullwidth-code-point": {
      "version": "2.0.0",
      "resolved": "https://registry.npmjs.org/is-fullwidth-code-point/-/is-fullwidth-code-point-2.0.0.tgz",
      "integrity": "sha1-o7MKXE8ZkYMWeqq5O+764937ZU8="
    },
    "is-generator-fn": {
      "version": "2.1.0",
      "resolved": "https://registry.npmjs.org/is-generator-fn/-/is-generator-fn-2.1.0.tgz",
      "integrity": "sha512-cTIB4yPYL/Grw0EaSzASzg6bBy9gqCofvWN8okThAYIxKJZC+udlRAmGbM0XLeniEJSs8uEgHPGuHSe1XsOLSQ=="
    },
    "is-glob": {
      "version": "4.0.1",
      "resolved": "https://registry.npmjs.org/is-glob/-/is-glob-4.0.1.tgz",
      "integrity": "sha512-5G0tKtBTFImOqDnLB2hG6Bp2qcKEFduo4tZu9MT/H6NQv/ghhy30o55ufafxJ/LdH79LLs2Kfrn85TLKyA7BUg==",
      "requires": {
        "is-extglob": "^2.1.1"
      }
    },
    "is-installed-globally": {
      "version": "0.1.0",
      "resolved": "https://registry.npmjs.org/is-installed-globally/-/is-installed-globally-0.1.0.tgz",
      "integrity": "sha1-Df2Y9akRFxbdU13aZJL2e/PSWoA=",
      "requires": {
        "global-dirs": "^0.1.0",
        "is-path-inside": "^1.0.0"
      }
    },
    "is-my-ip-valid": {
      "version": "1.0.0",
      "resolved": "https://registry.npmjs.org/is-my-ip-valid/-/is-my-ip-valid-1.0.0.tgz",
      "integrity": "sha512-gmh/eWXROncUzRnIa1Ubrt5b8ep/MGSnfAUI3aRp+sqTCs1tv1Isl8d8F6JmkN3dXKc3ehZMrtiPN9eL03NuaQ=="
    },
    "is-my-json-valid": {
      "version": "2.20.0",
      "resolved": "https://registry.npmjs.org/is-my-json-valid/-/is-my-json-valid-2.20.0.tgz",
      "integrity": "sha512-XTHBZSIIxNsIsZXg7XB5l8z/OBFosl1Wao4tXLpeC7eKU4Vm/kdop2azkPqULwnfGQjmeDIyey9g7afMMtdWAA==",
      "requires": {
        "generate-function": "^2.0.0",
        "generate-object-property": "^1.1.0",
        "is-my-ip-valid": "^1.0.0",
        "jsonpointer": "^4.0.0",
        "xtend": "^4.0.0"
      }
    },
    "is-npm": {
      "version": "1.0.0",
      "resolved": "https://registry.npmjs.org/is-npm/-/is-npm-1.0.0.tgz",
      "integrity": "sha1-8vtjpl5JBbQGyGBydloaTceTufQ="
    },
    "is-number": {
      "version": "3.0.0",
      "resolved": "https://registry.npmjs.org/is-number/-/is-number-3.0.0.tgz",
      "integrity": "sha1-JP1iAaR4LPUFYcgQJ2r8fRLXEZU=",
      "requires": {
        "kind-of": "^3.0.2"
      },
      "dependencies": {
        "kind-of": {
          "version": "3.2.2",
          "resolved": "https://registry.npmjs.org/kind-of/-/kind-of-3.2.2.tgz",
          "integrity": "sha1-MeohpzS6ubuw8yRm2JOupR5KPGQ=",
          "requires": {
            "is-buffer": "^1.1.5"
          }
        }
      }
    },
    "is-obj": {
      "version": "1.0.1",
      "resolved": "https://registry.npmjs.org/is-obj/-/is-obj-1.0.1.tgz",
      "integrity": "sha1-PkcprB9f3gJc19g6iW2rn09n2w8="
    },
    "is-path-cwd": {
      "version": "1.0.0",
      "resolved": "https://registry.npmjs.org/is-path-cwd/-/is-path-cwd-1.0.0.tgz",
      "integrity": "sha1-0iXsIxMuie3Tj9p2dHLmLmXxEG0="
    },
    "is-path-in-cwd": {
      "version": "1.0.1",
      "resolved": "https://registry.npmjs.org/is-path-in-cwd/-/is-path-in-cwd-1.0.1.tgz",
      "integrity": "sha512-FjV1RTW48E7CWM7eE/J2NJvAEEVektecDBVBE5Hh3nM1Jd0kvhHtX68Pr3xsDf857xt3Y4AkwVULK1Vku62aaQ==",
      "requires": {
        "is-path-inside": "^1.0.0"
      }
    },
    "is-path-inside": {
      "version": "1.0.1",
      "resolved": "https://registry.npmjs.org/is-path-inside/-/is-path-inside-1.0.1.tgz",
      "integrity": "sha1-jvW33lBDej/cprToZe96pVy0gDY=",
      "requires": {
        "path-is-inside": "^1.0.1"
      }
    },
    "is-plain-object": {
      "version": "2.0.4",
      "resolved": "https://registry.npmjs.org/is-plain-object/-/is-plain-object-2.0.4.tgz",
      "integrity": "sha512-h5PpgXkWitc38BBMYawTYMWJHFZJVnBquFE57xFpjB8pJFiF6gZ+bU+WyI/yqXiFR5mdLsgYNaPe8uao6Uv9Og==",
      "requires": {
        "isobject": "^3.0.1"
      }
    },
    "is-promise": {
      "version": "2.1.0",
      "resolved": "https://registry.npmjs.org/is-promise/-/is-promise-2.1.0.tgz",
      "integrity": "sha1-eaKp7OfwlugPNtKy87wWwf9L8/o="
    },
    "is-property": {
      "version": "1.0.2",
      "resolved": "https://registry.npmjs.org/is-property/-/is-property-1.0.2.tgz",
      "integrity": "sha1-V/4cTkhHTt1lsJkR8msc1Ald2oQ="
    },
    "is-redirect": {
      "version": "1.0.0",
      "resolved": "https://registry.npmjs.org/is-redirect/-/is-redirect-1.0.0.tgz",
      "integrity": "sha1-HQPd7VO9jbDzDCbk+V02/HyH3CQ="
    },
    "is-regex": {
      "version": "1.0.4",
      "resolved": "https://registry.npmjs.org/is-regex/-/is-regex-1.0.4.tgz",
      "integrity": "sha1-VRdIm1RwkbCTDglWVM7SXul+lJE=",
      "requires": {
        "has": "^1.0.1"
      }
    },
    "is-regexp": {
      "version": "1.0.0",
      "resolved": "https://registry.npmjs.org/is-regexp/-/is-regexp-1.0.0.tgz",
      "integrity": "sha1-/S2INUXEa6xaYz57mgnof6LLUGk="
    },
    "is-resolvable": {
      "version": "1.1.0",
      "resolved": "https://registry.npmjs.org/is-resolvable/-/is-resolvable-1.1.0.tgz",
      "integrity": "sha512-qgDYXFSR5WvEfuS5dMj6oTMEbrrSaM0CrFk2Yiq/gXnBvD9pMa2jGXxyhGLfvhZpuMZe18CJpFxAt3CRs42NMg=="
    },
    "is-retry-allowed": {
      "version": "1.1.0",
      "resolved": "https://registry.npmjs.org/is-retry-allowed/-/is-retry-allowed-1.1.0.tgz",
      "integrity": "sha1-EaBgVotnM5REAz0BJaYaINVk+zQ="
    },
    "is-root": {
      "version": "2.1.0",
      "resolved": "https://registry.npmjs.org/is-root/-/is-root-2.1.0.tgz",
      "integrity": "sha512-AGOriNp96vNBd3HtU+RzFEc75FfR5ymiYv8E553I71SCeXBiMsVDUtdio1OEFvrPyLIQ9tVR5RxXIFe5PUFjMg=="
    },
    "is-stream": {
      "version": "1.1.0",
      "resolved": "https://registry.npmjs.org/is-stream/-/is-stream-1.1.0.tgz",
      "integrity": "sha1-EtSj3U5o4Lec6428hBc66A2RykQ="
    },
    "is-svg": {
      "version": "3.0.0",
      "resolved": "https://registry.npmjs.org/is-svg/-/is-svg-3.0.0.tgz",
      "integrity": "sha512-gi4iHK53LR2ujhLVVj+37Ykh9GLqYHX6JOVXbLAucaG/Cqw9xwdFOjDM2qeifLs1sF1npXXFvDu0r5HNgCMrzQ==",
      "requires": {
        "html-comment-regex": "^1.1.0"
      }
    },
    "is-symbol": {
      "version": "1.0.2",
      "resolved": "https://registry.npmjs.org/is-symbol/-/is-symbol-1.0.2.tgz",
      "integrity": "sha512-HS8bZ9ox60yCJLH9snBpIwv9pYUAkcuLhSA1oero1UB5y9aiQpRA8y2ex945AOtCZL1lJDeIk3G5LthswI46Lw==",
      "requires": {
        "has-symbols": "^1.0.0"
      }
    },
    "is-typedarray": {
      "version": "1.0.0",
      "resolved": "https://registry.npmjs.org/is-typedarray/-/is-typedarray-1.0.0.tgz",
      "integrity": "sha1-5HnICFjfDBsR3dppQPlgEfzaSpo="
    },
    "is-url": {
      "version": "1.2.4",
      "resolved": "https://registry.npmjs.org/is-url/-/is-url-1.2.4.tgz",
      "integrity": "sha512-ITvGim8FhRiYe4IQ5uHSkj7pVaPDrCTkNd3yq3cV7iZAcJdHTUMPMEHcqSOy9xZ9qFenQCvi+2wjH9a1nXqHww=="
    },
    "is-windows": {
      "version": "1.0.2",
      "resolved": "https://registry.npmjs.org/is-windows/-/is-windows-1.0.2.tgz",
      "integrity": "sha512-eXK1UInq2bPmjyX6e3VHIzMLobc4J94i4AWn+Hpq3OU5KkrRC96OAcR3PRJ/pGu6m8TRnBHP9dkXQVsT/COVIA=="
    },
    "is-wsl": {
      "version": "1.1.0",
      "resolved": "https://registry.npmjs.org/is-wsl/-/is-wsl-1.1.0.tgz",
      "integrity": "sha1-HxbkqiKwTRM2tmGIpmrzxgDDpm0="
    },
    "isarray": {
      "version": "1.0.0",
      "resolved": "https://registry.npmjs.org/isarray/-/isarray-1.0.0.tgz",
      "integrity": "sha1-u5NdSFgsuhaMBoNJV6VKPgcSTxE="
    },
    "isexe": {
      "version": "2.0.0",
      "resolved": "https://registry.npmjs.org/isexe/-/isexe-2.0.0.tgz",
      "integrity": "sha1-6PvzdNxVb/iUehDcsFctYz8s+hA="
    },
    "isobject": {
      "version": "3.0.1",
      "resolved": "https://registry.npmjs.org/isobject/-/isobject-3.0.1.tgz",
      "integrity": "sha1-TkMekrEalzFjaqH5yNHMvP2reN8="
    },
    "isomorphic-fetch": {
      "version": "2.2.1",
      "resolved": "https://registry.npmjs.org/isomorphic-fetch/-/isomorphic-fetch-2.2.1.tgz",
      "integrity": "sha1-YRrhrPFPXoH3KVB0coGf6XM1WKk=",
      "requires": {
        "node-fetch": "^1.0.1",
        "whatwg-fetch": ">=0.10.0"
      }
    },
    "isstream": {
      "version": "0.1.2",
      "resolved": "https://registry.npmjs.org/isstream/-/isstream-0.1.2.tgz",
      "integrity": "sha1-R+Y/evVa+m+S4VAOaQ64uFKcCZo="
    },
    "istanbul-lib-coverage": {
      "version": "2.0.5",
      "resolved": "https://registry.npmjs.org/istanbul-lib-coverage/-/istanbul-lib-coverage-2.0.5.tgz",
      "integrity": "sha512-8aXznuEPCJvGnMSRft4udDRDtb1V3pkQkMMI5LI+6HuQz5oQ4J2UFn1H82raA3qJtyOLkkwVqICBQkjnGtn5mA=="
    },
    "istanbul-lib-instrument": {
      "version": "3.3.0",
      "resolved": "https://registry.npmjs.org/istanbul-lib-instrument/-/istanbul-lib-instrument-3.3.0.tgz",
      "integrity": "sha512-5nnIN4vo5xQZHdXno/YDXJ0G+I3dAm4XgzfSVTPLQpj/zAV2dV6Juy0yaf10/zrJOJeHoN3fraFe+XRq2bFVZA==",
      "requires": {
        "@babel/generator": "^7.4.0",
        "@babel/parser": "^7.4.3",
        "@babel/template": "^7.4.0",
        "@babel/traverse": "^7.4.3",
        "@babel/types": "^7.4.0",
        "istanbul-lib-coverage": "^2.0.5",
        "semver": "^6.0.0"
      },
      "dependencies": {
        "semver": {
          "version": "6.3.0",
          "resolved": "https://registry.npmjs.org/semver/-/semver-6.3.0.tgz",
          "integrity": "sha512-b39TBaTSfV6yBrapU89p5fKekE2m/NwnDocOVruQFS1/veMgdzuPcnOM34M6CwxW8jH/lxEa5rBoDeUwu5HHTw=="
        }
      }
    },
    "istanbul-lib-report": {
      "version": "2.0.8",
      "resolved": "https://registry.npmjs.org/istanbul-lib-report/-/istanbul-lib-report-2.0.8.tgz",
      "integrity": "sha512-fHBeG573EIihhAblwgxrSenp0Dby6tJMFR/HvlerBsrCTD5bkUuoNtn3gVh29ZCS824cGGBPn7Sg7cNk+2xUsQ==",
      "requires": {
        "istanbul-lib-coverage": "^2.0.5",
        "make-dir": "^2.1.0",
        "supports-color": "^6.1.0"
      },
      "dependencies": {
        "make-dir": {
          "version": "2.1.0",
          "resolved": "https://registry.npmjs.org/make-dir/-/make-dir-2.1.0.tgz",
          "integrity": "sha512-LS9X+dc8KLxXCb8dni79fLIIUA5VyZoyjSMCwTluaXA0o27cCK0bhXkpgw+sTXVpPy/lSO57ilRixqk0vDmtRA==",
          "requires": {
            "pify": "^4.0.1",
            "semver": "^5.6.0"
          }
        },
        "pify": {
          "version": "4.0.1",
          "resolved": "https://registry.npmjs.org/pify/-/pify-4.0.1.tgz",
          "integrity": "sha512-uB80kBFb/tfd68bVleG9T5GGsGPjJrLAUpR5PZIrhBnIaRTQRjqdJSsIKkOP6OAIFbj7GOrcudc5pNjZ+geV2g=="
        },
        "supports-color": {
          "version": "6.1.0",
          "resolved": "https://registry.npmjs.org/supports-color/-/supports-color-6.1.0.tgz",
          "integrity": "sha512-qe1jfm1Mg7Nq/NSh6XE24gPXROEVsWHxC1LIx//XNlD9iw7YZQGjZNjYN7xGaEG6iKdA8EtNFW6R0gjnVXp+wQ==",
          "requires": {
            "has-flag": "^3.0.0"
          }
        }
      }
    },
    "istanbul-lib-source-maps": {
      "version": "3.0.6",
      "resolved": "https://registry.npmjs.org/istanbul-lib-source-maps/-/istanbul-lib-source-maps-3.0.6.tgz",
      "integrity": "sha512-R47KzMtDJH6X4/YW9XTx+jrLnZnscW4VpNN+1PViSYTejLVPWv7oov+Duf8YQSPyVRUvueQqz1TcsC6mooZTXw==",
      "requires": {
        "debug": "^4.1.1",
        "istanbul-lib-coverage": "^2.0.5",
        "make-dir": "^2.1.0",
        "rimraf": "^2.6.3",
        "source-map": "^0.6.1"
      },
      "dependencies": {
        "debug": {
          "version": "4.1.1",
          "resolved": "https://registry.npmjs.org/debug/-/debug-4.1.1.tgz",
          "integrity": "sha512-pYAIzeRo8J6KPEaJ0VWOh5Pzkbw/RetuzehGM7QRRX5he4fPHx2rdKMB256ehJCkX+XRQm16eZLqLNS8RSZXZw==",
          "requires": {
            "ms": "^2.1.1"
          }
        },
        "make-dir": {
          "version": "2.1.0",
          "resolved": "https://registry.npmjs.org/make-dir/-/make-dir-2.1.0.tgz",
          "integrity": "sha512-LS9X+dc8KLxXCb8dni79fLIIUA5VyZoyjSMCwTluaXA0o27cCK0bhXkpgw+sTXVpPy/lSO57ilRixqk0vDmtRA==",
          "requires": {
            "pify": "^4.0.1",
            "semver": "^5.6.0"
          }
        },
        "ms": {
          "version": "2.1.2",
          "resolved": "https://registry.npmjs.org/ms/-/ms-2.1.2.tgz",
          "integrity": "sha512-sGkPx+VjMtmA6MX27oA4FBFELFCZZ4S4XqeGOXCv68tT+jb3vk/RyaKWP0PTKyWtmLSM0b+adUTEvbs1PEaH2w=="
        },
        "pify": {
          "version": "4.0.1",
          "resolved": "https://registry.npmjs.org/pify/-/pify-4.0.1.tgz",
          "integrity": "sha512-uB80kBFb/tfd68bVleG9T5GGsGPjJrLAUpR5PZIrhBnIaRTQRjqdJSsIKkOP6OAIFbj7GOrcudc5pNjZ+geV2g=="
        },
        "source-map": {
          "version": "0.6.1",
          "resolved": "https://registry.npmjs.org/source-map/-/source-map-0.6.1.tgz",
          "integrity": "sha512-UjgapumWlbMhkBgzT7Ykc5YXUT46F0iKu8SGXq0bcwP5dz/h0Plj6enJqjz1Zbq2l5WaqYnrVbwWOWMyF3F47g=="
        }
      }
    },
    "istanbul-reports": {
      "version": "2.2.6",
      "resolved": "https://registry.npmjs.org/istanbul-reports/-/istanbul-reports-2.2.6.tgz",
      "integrity": "sha512-SKi4rnMyLBKe0Jy2uUdx28h8oG7ph2PPuQPvIAh31d+Ci+lSiEu4C+h3oBPuJ9+mPKhOyW0M8gY4U5NM1WLeXA==",
      "requires": {
        "handlebars": "^4.1.2"
      }
    },
    "jest": {
      "version": "24.7.1",
      "resolved": "https://registry.npmjs.org/jest/-/jest-24.7.1.tgz",
      "integrity": "sha512-AbvRar5r++izmqo5gdbAjTeA6uNRGoNRuj5vHB0OnDXo2DXWZJVuaObiGgtlvhKb+cWy2oYbQSfxv7Q7GjnAtA==",
      "requires": {
        "import-local": "^2.0.0",
        "jest-cli": "^24.7.1"
      },
      "dependencies": {
        "ansi-regex": {
          "version": "4.1.0",
          "resolved": "https://registry.npmjs.org/ansi-regex/-/ansi-regex-4.1.0.tgz",
          "integrity": "sha512-1apePfXM1UOSqw0o9IiFAovVz9M5S1Dg+4TrDwfMewQ6p/rmMueb7tWZjQ1rx4Loy1ArBggoqGpfqqdI4rondg=="
        },
        "ansi-styles": {
          "version": "3.2.1",
          "resolved": "https://registry.npmjs.org/ansi-styles/-/ansi-styles-3.2.1.tgz",
          "integrity": "sha512-VT0ZI6kZRdTh8YyJw3SMbYm/u+NqfsAxEpWO0Pf9sq8/e94WxxOpPKx9FR1FlyCtOVDNOQ+8ntlqFxiRc+r5qA==",
          "requires": {
            "color-convert": "^1.9.0"
          }
        },
        "chalk": {
          "version": "2.4.2",
          "resolved": "https://registry.npmjs.org/chalk/-/chalk-2.4.2.tgz",
          "integrity": "sha512-Mti+f9lpJNcwF4tWV8/OrTTtF1gZi+f8FqlyAdouralcFWFQWF2+NgCHShjkCb+IFBLq9buZwE1xckQU4peSuQ==",
          "requires": {
            "ansi-styles": "^3.2.1",
            "escape-string-regexp": "^1.0.5",
            "supports-color": "^5.3.0"
          }
        },
        "ci-info": {
          "version": "2.0.0",
          "resolved": "https://registry.npmjs.org/ci-info/-/ci-info-2.0.0.tgz",
          "integrity": "sha512-5tK7EtrZ0N+OLFMthtqOj4fI2Jeb88C4CAZPu25LDVUgXJ0A3Js4PMGqrn0JU1W0Mh1/Z8wZzYPxqUrXeBboCQ=="
        },
        "cliui": {
          "version": "5.0.0",
          "resolved": "https://registry.npmjs.org/cliui/-/cliui-5.0.0.tgz",
          "integrity": "sha512-PYeGSEmmHM6zvoef2w8TPzlrnNpXIjTipYK780YswmIP9vjxmd6Y2a3CB2Ks6/AU8NHjZugXvo8w3oWM2qnwXA==",
          "requires": {
            "string-width": "^3.1.0",
            "strip-ansi": "^5.2.0",
            "wrap-ansi": "^5.1.0"
          }
        },
        "emoji-regex": {
          "version": "7.0.3",
          "resolved": "https://registry.npmjs.org/emoji-regex/-/emoji-regex-7.0.3.tgz",
          "integrity": "sha512-CwBLREIQ7LvYFB0WyRvwhq5N5qPhc6PMjD6bYggFlI5YyDgl+0vxq5VHbMOFqLg7hfWzmu8T5Z1QofhmTIhItA=="
        },
        "find-up": {
          "version": "3.0.0",
          "resolved": "https://registry.npmjs.org/find-up/-/find-up-3.0.0.tgz",
          "integrity": "sha512-1yD6RmLI1XBfxugvORwlck6f75tYL+iR0jqwsOrOxMZyGYqUuDhJ0l4AXdO1iX/FTs9cBAMEk1gWSEx1kSbylg==",
          "requires": {
            "locate-path": "^3.0.0"
          }
        },
        "is-ci": {
          "version": "2.0.0",
          "resolved": "https://registry.npmjs.org/is-ci/-/is-ci-2.0.0.tgz",
          "integrity": "sha512-YfJT7rkpQB0updsdHLGWrvhBJfcfzNNawYDNIyQXJz0IViGf75O8EBPKSdvw2rF+LGCsX4FZ8tcr3b19LcZq4w==",
          "requires": {
            "ci-info": "^2.0.0"
          }
        },
        "jest-cli": {
          "version": "24.9.0",
          "resolved": "https://registry.npmjs.org/jest-cli/-/jest-cli-24.9.0.tgz",
          "integrity": "sha512-+VLRKyitT3BWoMeSUIHRxV/2g8y9gw91Jh5z2UmXZzkZKpbC08CSehVxgHUwTpy+HwGcns/tqafQDJW7imYvGg==",
          "requires": {
            "@jest/core": "^24.9.0",
            "@jest/test-result": "^24.9.0",
            "@jest/types": "^24.9.0",
            "chalk": "^2.0.1",
            "exit": "^0.1.2",
            "import-local": "^2.0.0",
            "is-ci": "^2.0.0",
            "jest-config": "^24.9.0",
            "jest-util": "^24.9.0",
            "jest-validate": "^24.9.0",
            "prompts": "^2.0.1",
            "realpath-native": "^1.1.0",
            "yargs": "^13.3.0"
          }
        },
        "locate-path": {
          "version": "3.0.0",
          "resolved": "https://registry.npmjs.org/locate-path/-/locate-path-3.0.0.tgz",
          "integrity": "sha512-7AO748wWnIhNqAuaty2ZWHkQHRSNfPVIsPIfwEOWO22AmaoVrWavlOcMR5nzTLNYvp36X220/maaRsrec1G65A==",
          "requires": {
            "p-locate": "^3.0.0",
            "path-exists": "^3.0.0"
          }
        },
        "p-limit": {
          "version": "2.2.1",
          "resolved": "https://registry.npmjs.org/p-limit/-/p-limit-2.2.1.tgz",
          "integrity": "sha512-85Tk+90UCVWvbDavCLKPOLC9vvY8OwEX/RtKF+/1OADJMVlFfEHOiMTPVyxg7mk/dKa+ipdHm0OUkTvCpMTuwg==",
          "requires": {
            "p-try": "^2.0.0"
          }
        },
        "p-locate": {
          "version": "3.0.0",
          "resolved": "https://registry.npmjs.org/p-locate/-/p-locate-3.0.0.tgz",
          "integrity": "sha512-x+12w/To+4GFfgJhBEpiDcLozRJGegY+Ei7/z0tSLkMmxGZNybVMSfWj9aJn8Z5Fc7dBUNJOOVgPv2H7IwulSQ==",
          "requires": {
            "p-limit": "^2.0.0"
          }
        },
        "p-try": {
          "version": "2.2.0",
          "resolved": "https://registry.npmjs.org/p-try/-/p-try-2.2.0.tgz",
          "integrity": "sha512-R4nPAVTAU0B9D35/Gk3uJf/7XYbQcyohSKdvAxIRSNghFl4e71hVoGnBNQz9cWaXxO2I10KTC+3jMdvvoKw6dQ=="
        },
        "string-width": {
          "version": "3.1.0",
          "resolved": "https://registry.npmjs.org/string-width/-/string-width-3.1.0.tgz",
          "integrity": "sha512-vafcv6KjVZKSgz06oM/H6GDBrAtz8vdhQakGjFIvNrHA6y3HCF1CInLy+QLq8dTJPQ1b+KDUqDFctkdRW44e1w==",
          "requires": {
            "emoji-regex": "^7.0.1",
            "is-fullwidth-code-point": "^2.0.0",
            "strip-ansi": "^5.1.0"
          }
        },
        "strip-ansi": {
          "version": "5.2.0",
          "resolved": "https://registry.npmjs.org/strip-ansi/-/strip-ansi-5.2.0.tgz",
          "integrity": "sha512-DuRs1gKbBqsMKIZlrffwlug8MHkcnpjs5VPmL1PAh+mA30U0DTotfDZ0d2UUsXpPmPmMMJ6W773MaA3J+lbiWA==",
          "requires": {
            "ansi-regex": "^4.1.0"
          }
        },
        "supports-color": {
          "version": "5.5.0",
          "resolved": "https://registry.npmjs.org/supports-color/-/supports-color-5.5.0.tgz",
          "integrity": "sha512-QjVjwdXIt408MIiAqCX4oUKsgU2EqAGzs2Ppkm4aQYbjm+ZEWEcW4SfFNTr4uMNZma0ey4f5lgLrkB0aX0QMow==",
          "requires": {
            "has-flag": "^3.0.0"
          }
        },
        "wrap-ansi": {
          "version": "5.1.0",
          "resolved": "https://registry.npmjs.org/wrap-ansi/-/wrap-ansi-5.1.0.tgz",
          "integrity": "sha512-QC1/iN/2/RPVJ5jYK8BGttj5z83LmSKmvbvrXPNCLZSEb32KKVDJDl/MOt2N01qU2H/FkzEa9PKto1BqDjtd7Q==",
          "requires": {
            "ansi-styles": "^3.2.0",
            "string-width": "^3.0.0",
            "strip-ansi": "^5.0.0"
          }
        },
        "y18n": {
          "version": "4.0.0",
          "resolved": "https://registry.npmjs.org/y18n/-/y18n-4.0.0.tgz",
          "integrity": "sha512-r9S/ZyXu/Xu9q1tYlpsLIsa3EeLXXk0VwlxqTcFRfg9EhMW+17kbt9G0NrgCmhGb5vT2hyhJZLfDGx+7+5Uj/w=="
        },
        "yargs": {
          "version": "13.3.0",
          "resolved": "https://registry.npmjs.org/yargs/-/yargs-13.3.0.tgz",
          "integrity": "sha512-2eehun/8ALW8TLoIl7MVaRUrg+yCnenu8B4kBlRxj3GJGDKU1Og7sMXPNm1BYyM1DOJmTZ4YeN/Nwxv+8XJsUA==",
          "requires": {
            "cliui": "^5.0.0",
            "find-up": "^3.0.0",
            "get-caller-file": "^2.0.1",
            "require-directory": "^2.1.1",
            "require-main-filename": "^2.0.0",
            "set-blocking": "^2.0.0",
            "string-width": "^3.0.0",
            "which-module": "^2.0.0",
            "y18n": "^4.0.0",
            "yargs-parser": "^13.1.1"
          }
        }
      }
    },
    "jest-changed-files": {
      "version": "24.9.0",
      "resolved": "https://registry.npmjs.org/jest-changed-files/-/jest-changed-files-24.9.0.tgz",
      "integrity": "sha512-6aTWpe2mHF0DhL28WjdkO8LyGjs3zItPET4bMSeXU6T3ub4FPMw+mcOcbdGXQOAfmLcxofD23/5Bl9Z4AkFwqg==",
      "requires": {
        "@jest/types": "^24.9.0",
        "execa": "^1.0.0",
        "throat": "^4.0.0"
      },
      "dependencies": {
        "cross-spawn": {
          "version": "6.0.5",
          "resolved": "https://registry.npmjs.org/cross-spawn/-/cross-spawn-6.0.5.tgz",
          "integrity": "sha512-eTVLrBSt7fjbDygz805pMnstIs2VTBNkRm0qxZd+M7A5XDdxVRWO5MxGBXZhjY4cqLYLdtrGqRf8mBPmzwSpWQ==",
          "requires": {
            "nice-try": "^1.0.4",
            "path-key": "^2.0.1",
            "semver": "^5.5.0",
            "shebang-command": "^1.2.0",
            "which": "^1.2.9"
          }
        },
        "execa": {
          "version": "1.0.0",
          "resolved": "https://registry.npmjs.org/execa/-/execa-1.0.0.tgz",
          "integrity": "sha512-adbxcyWV46qiHyvSp50TKt05tB4tK3HcmF7/nxfAdhnox83seTDbwnaqKO4sXRy7roHAIFqJP/Rw/AuEbX61LA==",
          "requires": {
            "cross-spawn": "^6.0.0",
            "get-stream": "^4.0.0",
            "is-stream": "^1.1.0",
            "npm-run-path": "^2.0.0",
            "p-finally": "^1.0.0",
            "signal-exit": "^3.0.0",
            "strip-eof": "^1.0.0"
          }
        },
        "get-stream": {
          "version": "4.1.0",
          "resolved": "https://registry.npmjs.org/get-stream/-/get-stream-4.1.0.tgz",
          "integrity": "sha512-GMat4EJ5161kIy2HevLlr4luNjBgvmj413KaQA7jt4V8B4RDsfpHk7WQ9GVqfYyyx8OS/L66Kox+rJRNklLK7w==",
          "requires": {
            "pump": "^3.0.0"
          }
        }
      }
    },
    "jest-config": {
      "version": "24.9.0",
      "resolved": "https://registry.npmjs.org/jest-config/-/jest-config-24.9.0.tgz",
      "integrity": "sha512-RATtQJtVYQrp7fvWg6f5y3pEFj9I+H8sWw4aKxnDZ96mob5i5SD6ZEGWgMLXQ4LE8UurrjbdlLWdUeo+28QpfQ==",
      "requires": {
        "@babel/core": "^7.1.0",
        "@jest/test-sequencer": "^24.9.0",
        "@jest/types": "^24.9.0",
        "babel-jest": "^24.9.0",
        "chalk": "^2.0.1",
        "glob": "^7.1.1",
        "jest-environment-jsdom": "^24.9.0",
        "jest-environment-node": "^24.9.0",
        "jest-get-type": "^24.9.0",
        "jest-jasmine2": "^24.9.0",
        "jest-regex-util": "^24.3.0",
        "jest-resolve": "^24.9.0",
        "jest-util": "^24.9.0",
        "jest-validate": "^24.9.0",
        "micromatch": "^3.1.10",
        "pretty-format": "^24.9.0",
        "realpath-native": "^1.1.0"
      },
      "dependencies": {
        "ansi-styles": {
          "version": "3.2.1",
          "resolved": "https://registry.npmjs.org/ansi-styles/-/ansi-styles-3.2.1.tgz",
          "integrity": "sha512-VT0ZI6kZRdTh8YyJw3SMbYm/u+NqfsAxEpWO0Pf9sq8/e94WxxOpPKx9FR1FlyCtOVDNOQ+8ntlqFxiRc+r5qA==",
          "requires": {
            "color-convert": "^1.9.0"
          }
        },
        "chalk": {
          "version": "2.4.2",
          "resolved": "https://registry.npmjs.org/chalk/-/chalk-2.4.2.tgz",
          "integrity": "sha512-Mti+f9lpJNcwF4tWV8/OrTTtF1gZi+f8FqlyAdouralcFWFQWF2+NgCHShjkCb+IFBLq9buZwE1xckQU4peSuQ==",
          "requires": {
            "ansi-styles": "^3.2.1",
            "escape-string-regexp": "^1.0.5",
            "supports-color": "^5.3.0"
          }
        },
        "jest-resolve": {
          "version": "24.9.0",
          "resolved": "https://registry.npmjs.org/jest-resolve/-/jest-resolve-24.9.0.tgz",
          "integrity": "sha512-TaLeLVL1l08YFZAt3zaPtjiVvyy4oSA6CRe+0AFPPVX3Q/VI0giIWWoAvoS5L96vj9Dqxj4fB5p2qrHCmTU/MQ==",
          "requires": {
            "@jest/types": "^24.9.0",
            "browser-resolve": "^1.11.3",
            "chalk": "^2.0.1",
            "jest-pnp-resolver": "^1.2.1",
            "realpath-native": "^1.1.0"
          }
        },
        "supports-color": {
          "version": "5.5.0",
          "resolved": "https://registry.npmjs.org/supports-color/-/supports-color-5.5.0.tgz",
          "integrity": "sha512-QjVjwdXIt408MIiAqCX4oUKsgU2EqAGzs2Ppkm4aQYbjm+ZEWEcW4SfFNTr4uMNZma0ey4f5lgLrkB0aX0QMow==",
          "requires": {
            "has-flag": "^3.0.0"
          }
        }
      }
    },
    "jest-diff": {
      "version": "24.9.0",
      "resolved": "https://registry.npmjs.org/jest-diff/-/jest-diff-24.9.0.tgz",
      "integrity": "sha512-qMfrTs8AdJE2iqrTp0hzh7kTd2PQWrsFyj9tORoKmu32xjPjeE4NyjVRDz8ybYwqS2ik8N4hsIpiVTyFeo2lBQ==",
      "requires": {
        "chalk": "^2.0.1",
        "diff-sequences": "^24.9.0",
        "jest-get-type": "^24.9.0",
        "pretty-format": "^24.9.0"
      },
      "dependencies": {
        "ansi-styles": {
          "version": "3.2.1",
          "resolved": "https://registry.npmjs.org/ansi-styles/-/ansi-styles-3.2.1.tgz",
          "integrity": "sha512-VT0ZI6kZRdTh8YyJw3SMbYm/u+NqfsAxEpWO0Pf9sq8/e94WxxOpPKx9FR1FlyCtOVDNOQ+8ntlqFxiRc+r5qA==",
          "requires": {
            "color-convert": "^1.9.0"
          }
        },
        "chalk": {
          "version": "2.4.2",
          "resolved": "https://registry.npmjs.org/chalk/-/chalk-2.4.2.tgz",
          "integrity": "sha512-Mti+f9lpJNcwF4tWV8/OrTTtF1gZi+f8FqlyAdouralcFWFQWF2+NgCHShjkCb+IFBLq9buZwE1xckQU4peSuQ==",
          "requires": {
            "ansi-styles": "^3.2.1",
            "escape-string-regexp": "^1.0.5",
            "supports-color": "^5.3.0"
          }
        },
        "supports-color": {
          "version": "5.5.0",
          "resolved": "https://registry.npmjs.org/supports-color/-/supports-color-5.5.0.tgz",
          "integrity": "sha512-QjVjwdXIt408MIiAqCX4oUKsgU2EqAGzs2Ppkm4aQYbjm+ZEWEcW4SfFNTr4uMNZma0ey4f5lgLrkB0aX0QMow==",
          "requires": {
            "has-flag": "^3.0.0"
          }
        }
      }
    },
    "jest-docblock": {
      "version": "24.9.0",
      "resolved": "https://registry.npmjs.org/jest-docblock/-/jest-docblock-24.9.0.tgz",
      "integrity": "sha512-F1DjdpDMJMA1cN6He0FNYNZlo3yYmOtRUnktrT9Q37njYzC5WEaDdmbynIgy0L/IvXvvgsG8OsqhLPXTpfmZAA==",
      "requires": {
        "detect-newline": "^2.1.0"
      }
    },
    "jest-each": {
      "version": "24.9.0",
      "resolved": "https://registry.npmjs.org/jest-each/-/jest-each-24.9.0.tgz",
      "integrity": "sha512-ONi0R4BvW45cw8s2Lrx8YgbeXL1oCQ/wIDwmsM3CqM/nlblNCPmnC3IPQlMbRFZu3wKdQ2U8BqM6lh3LJ5Bsog==",
      "requires": {
        "@jest/types": "^24.9.0",
        "chalk": "^2.0.1",
        "jest-get-type": "^24.9.0",
        "jest-util": "^24.9.0",
        "pretty-format": "^24.9.0"
      },
      "dependencies": {
        "ansi-styles": {
          "version": "3.2.1",
          "resolved": "https://registry.npmjs.org/ansi-styles/-/ansi-styles-3.2.1.tgz",
          "integrity": "sha512-VT0ZI6kZRdTh8YyJw3SMbYm/u+NqfsAxEpWO0Pf9sq8/e94WxxOpPKx9FR1FlyCtOVDNOQ+8ntlqFxiRc+r5qA==",
          "requires": {
            "color-convert": "^1.9.0"
          }
        },
        "chalk": {
          "version": "2.4.2",
          "resolved": "https://registry.npmjs.org/chalk/-/chalk-2.4.2.tgz",
          "integrity": "sha512-Mti+f9lpJNcwF4tWV8/OrTTtF1gZi+f8FqlyAdouralcFWFQWF2+NgCHShjkCb+IFBLq9buZwE1xckQU4peSuQ==",
          "requires": {
            "ansi-styles": "^3.2.1",
            "escape-string-regexp": "^1.0.5",
            "supports-color": "^5.3.0"
          }
        },
        "supports-color": {
          "version": "5.5.0",
          "resolved": "https://registry.npmjs.org/supports-color/-/supports-color-5.5.0.tgz",
          "integrity": "sha512-QjVjwdXIt408MIiAqCX4oUKsgU2EqAGzs2Ppkm4aQYbjm+ZEWEcW4SfFNTr4uMNZma0ey4f5lgLrkB0aX0QMow==",
          "requires": {
            "has-flag": "^3.0.0"
          }
        }
      }
    },
    "jest-environment-jsdom": {
      "version": "24.9.0",
      "resolved": "https://registry.npmjs.org/jest-environment-jsdom/-/jest-environment-jsdom-24.9.0.tgz",
      "integrity": "sha512-Zv9FV9NBRzLuALXjvRijO2351DRQeLYXtpD4xNvfoVFw21IOKNhZAEUKcbiEtjTkm2GsJ3boMVgkaR7rN8qetA==",
      "requires": {
        "@jest/environment": "^24.9.0",
        "@jest/fake-timers": "^24.9.0",
        "@jest/types": "^24.9.0",
        "jest-mock": "^24.9.0",
        "jest-util": "^24.9.0",
        "jsdom": "^11.5.1"
      }
    },
    "jest-environment-jsdom-fourteen": {
      "version": "0.1.0",
      "resolved": "https://registry.npmjs.org/jest-environment-jsdom-fourteen/-/jest-environment-jsdom-fourteen-0.1.0.tgz",
      "integrity": "sha512-4vtoRMg7jAstitRzL4nbw83VmGH8Rs13wrND3Ud2o1fczDhMUF32iIrNKwYGgeOPUdfvZU4oy8Bbv+ni1fgVCA==",
      "requires": {
        "jest-mock": "^24.5.0",
        "jest-util": "^24.5.0",
        "jsdom": "^14.0.0"
      },
      "dependencies": {
        "acorn": {
          "version": "6.3.0",
          "resolved": "https://registry.npmjs.org/acorn/-/acorn-6.3.0.tgz",
          "integrity": "sha512-/czfa8BwS88b9gWQVhc8eknunSA2DoJpJyTQkhheIf5E48u1N0R4q/YxxsAeqRrmK9TQ/uYfgLDfZo91UlANIA=="
        },
        "jsdom": {
          "version": "14.1.0",
          "resolved": "https://registry.npmjs.org/jsdom/-/jsdom-14.1.0.tgz",
          "integrity": "sha512-O901mfJSuTdwU2w3Sn+74T+RnDVP+FuV5fH8tcPWyqrseRAb0s5xOtPgCFiPOtLcyK7CLIJwPyD83ZqQWvA5ng==",
          "requires": {
            "abab": "^2.0.0",
            "acorn": "^6.0.4",
            "acorn-globals": "^4.3.0",
            "array-equal": "^1.0.0",
            "cssom": "^0.3.4",
            "cssstyle": "^1.1.1",
            "data-urls": "^1.1.0",
            "domexception": "^1.0.1",
            "escodegen": "^1.11.0",
            "html-encoding-sniffer": "^1.0.2",
            "nwsapi": "^2.1.3",
            "parse5": "5.1.0",
            "pn": "^1.1.0",
            "request": "^2.88.0",
            "request-promise-native": "^1.0.5",
            "saxes": "^3.1.9",
            "symbol-tree": "^3.2.2",
            "tough-cookie": "^2.5.0",
            "w3c-hr-time": "^1.0.1",
            "w3c-xmlserializer": "^1.1.2",
            "webidl-conversions": "^4.0.2",
            "whatwg-encoding": "^1.0.5",
            "whatwg-mimetype": "^2.3.0",
            "whatwg-url": "^7.0.0",
            "ws": "^6.1.2",
            "xml-name-validator": "^3.0.0"
          }
        },
        "parse5": {
          "version": "5.1.0",
          "resolved": "https://registry.npmjs.org/parse5/-/parse5-5.1.0.tgz",
          "integrity": "sha512-fxNG2sQjHvlVAYmzBZS9YlDp6PTSSDwa98vkD4QgVDDCAo84z5X1t5XyJQ62ImdLXx5NdIIfihey6xpum9/gRQ=="
        },
        "tough-cookie": {
          "version": "2.5.0",
          "resolved": "https://registry.npmjs.org/tough-cookie/-/tough-cookie-2.5.0.tgz",
          "integrity": "sha512-nlLsUzgm1kfLXSXfRZMc1KLAugd4hqJHDTvc2hDIwS3mZAfMEuMbc03SujMF+GEcpaX/qboeycw6iO8JwVv2+g==",
          "requires": {
            "psl": "^1.1.28",
            "punycode": "^2.1.1"
          }
        },
        "whatwg-url": {
          "version": "7.0.0",
          "resolved": "https://registry.npmjs.org/whatwg-url/-/whatwg-url-7.0.0.tgz",
          "integrity": "sha512-37GeVSIJ3kn1JgKyjiYNmSLP1yzbpb29jdmwBSgkD9h40/hyrR/OifpVUndji3tmwGgD8qpw7iQu3RSbCrBpsQ==",
          "requires": {
            "lodash.sortby": "^4.7.0",
            "tr46": "^1.0.1",
            "webidl-conversions": "^4.0.2"
          }
        },
        "ws": {
          "version": "6.2.1",
          "resolved": "https://registry.npmjs.org/ws/-/ws-6.2.1.tgz",
          "integrity": "sha512-GIyAXC2cB7LjvpgMt9EKS2ldqr0MTrORaleiOno6TweZ6r3TKtoFQWay/2PceJ3RuBasOHzXNn5Lrw1X0bEjqA==",
          "requires": {
            "async-limiter": "~1.0.0"
          }
        }
      }
    },
    "jest-environment-node": {
      "version": "24.9.0",
      "resolved": "https://registry.npmjs.org/jest-environment-node/-/jest-environment-node-24.9.0.tgz",
      "integrity": "sha512-6d4V2f4nxzIzwendo27Tr0aFm+IXWa0XEUnaH6nU0FMaozxovt+sfRvh4J47wL1OvF83I3SSTu0XK+i4Bqe7uA==",
      "requires": {
        "@jest/environment": "^24.9.0",
        "@jest/fake-timers": "^24.9.0",
        "@jest/types": "^24.9.0",
        "jest-mock": "^24.9.0",
        "jest-util": "^24.9.0"
      }
    },
    "jest-get-type": {
      "version": "24.9.0",
      "resolved": "https://registry.npmjs.org/jest-get-type/-/jest-get-type-24.9.0.tgz",
      "integrity": "sha512-lUseMzAley4LhIcpSP9Jf+fTrQ4a1yHQwLNeeVa2cEmbCGeoZAtYPOIv8JaxLD/sUpKxetKGP+gsHl8f8TSj8Q=="
    },
    "jest-haste-map": {
      "version": "24.9.0",
      "resolved": "https://registry.npmjs.org/jest-haste-map/-/jest-haste-map-24.9.0.tgz",
      "integrity": "sha512-kfVFmsuWui2Sj1Rp1AJ4D9HqJwE4uwTlS/vO+eRUaMmd54BFpli2XhMQnPC2k4cHFVbB2Q2C+jtI1AGLgEnCjQ==",
      "requires": {
        "@jest/types": "^24.9.0",
        "anymatch": "^2.0.0",
        "fb-watchman": "^2.0.0",
        "fsevents": "^1.2.7",
        "graceful-fs": "^4.1.15",
        "invariant": "^2.2.4",
        "jest-serializer": "^24.9.0",
        "jest-util": "^24.9.0",
        "jest-worker": "^24.9.0",
        "micromatch": "^3.1.10",
        "sane": "^4.0.3",
        "walker": "^1.0.7"
      }
    },
    "jest-jasmine2": {
      "version": "24.9.0",
      "resolved": "https://registry.npmjs.org/jest-jasmine2/-/jest-jasmine2-24.9.0.tgz",
      "integrity": "sha512-Cq7vkAgaYKp+PsX+2/JbTarrk0DmNhsEtqBXNwUHkdlbrTBLtMJINADf2mf5FkowNsq8evbPc07/qFO0AdKTzw==",
      "requires": {
        "@babel/traverse": "^7.1.0",
        "@jest/environment": "^24.9.0",
        "@jest/test-result": "^24.9.0",
        "@jest/types": "^24.9.0",
        "chalk": "^2.0.1",
        "co": "^4.6.0",
        "expect": "^24.9.0",
        "is-generator-fn": "^2.0.0",
        "jest-each": "^24.9.0",
        "jest-matcher-utils": "^24.9.0",
        "jest-message-util": "^24.9.0",
        "jest-runtime": "^24.9.0",
        "jest-snapshot": "^24.9.0",
        "jest-util": "^24.9.0",
        "pretty-format": "^24.9.0",
        "throat": "^4.0.0"
      },
      "dependencies": {
        "ansi-styles": {
          "version": "3.2.1",
          "resolved": "https://registry.npmjs.org/ansi-styles/-/ansi-styles-3.2.1.tgz",
          "integrity": "sha512-VT0ZI6kZRdTh8YyJw3SMbYm/u+NqfsAxEpWO0Pf9sq8/e94WxxOpPKx9FR1FlyCtOVDNOQ+8ntlqFxiRc+r5qA==",
          "requires": {
            "color-convert": "^1.9.0"
          }
        },
        "chalk": {
          "version": "2.4.2",
          "resolved": "https://registry.npmjs.org/chalk/-/chalk-2.4.2.tgz",
          "integrity": "sha512-Mti+f9lpJNcwF4tWV8/OrTTtF1gZi+f8FqlyAdouralcFWFQWF2+NgCHShjkCb+IFBLq9buZwE1xckQU4peSuQ==",
          "requires": {
            "ansi-styles": "^3.2.1",
            "escape-string-regexp": "^1.0.5",
            "supports-color": "^5.3.0"
          }
        },
        "supports-color": {
          "version": "5.5.0",
          "resolved": "https://registry.npmjs.org/supports-color/-/supports-color-5.5.0.tgz",
          "integrity": "sha512-QjVjwdXIt408MIiAqCX4oUKsgU2EqAGzs2Ppkm4aQYbjm+ZEWEcW4SfFNTr4uMNZma0ey4f5lgLrkB0aX0QMow==",
          "requires": {
            "has-flag": "^3.0.0"
          }
        }
      }
    },
    "jest-leak-detector": {
      "version": "24.9.0",
      "resolved": "https://registry.npmjs.org/jest-leak-detector/-/jest-leak-detector-24.9.0.tgz",
      "integrity": "sha512-tYkFIDsiKTGwb2FG1w8hX9V0aUb2ot8zY/2nFg087dUageonw1zrLMP4W6zsRO59dPkTSKie+D4rhMuP9nRmrA==",
      "requires": {
        "jest-get-type": "^24.9.0",
        "pretty-format": "^24.9.0"
      }
    },
    "jest-matcher-utils": {
      "version": "24.9.0",
      "resolved": "https://registry.npmjs.org/jest-matcher-utils/-/jest-matcher-utils-24.9.0.tgz",
      "integrity": "sha512-OZz2IXsu6eaiMAwe67c1T+5tUAtQyQx27/EMEkbFAGiw52tB9em+uGbzpcgYVpA8wl0hlxKPZxrly4CXU/GjHA==",
      "requires": {
        "chalk": "^2.0.1",
        "jest-diff": "^24.9.0",
        "jest-get-type": "^24.9.0",
        "pretty-format": "^24.9.0"
      },
      "dependencies": {
        "ansi-styles": {
          "version": "3.2.1",
          "resolved": "https://registry.npmjs.org/ansi-styles/-/ansi-styles-3.2.1.tgz",
          "integrity": "sha512-VT0ZI6kZRdTh8YyJw3SMbYm/u+NqfsAxEpWO0Pf9sq8/e94WxxOpPKx9FR1FlyCtOVDNOQ+8ntlqFxiRc+r5qA==",
          "requires": {
            "color-convert": "^1.9.0"
          }
        },
        "chalk": {
          "version": "2.4.2",
          "resolved": "https://registry.npmjs.org/chalk/-/chalk-2.4.2.tgz",
          "integrity": "sha512-Mti+f9lpJNcwF4tWV8/OrTTtF1gZi+f8FqlyAdouralcFWFQWF2+NgCHShjkCb+IFBLq9buZwE1xckQU4peSuQ==",
          "requires": {
            "ansi-styles": "^3.2.1",
            "escape-string-regexp": "^1.0.5",
            "supports-color": "^5.3.0"
          }
        },
        "supports-color": {
          "version": "5.5.0",
          "resolved": "https://registry.npmjs.org/supports-color/-/supports-color-5.5.0.tgz",
          "integrity": "sha512-QjVjwdXIt408MIiAqCX4oUKsgU2EqAGzs2Ppkm4aQYbjm+ZEWEcW4SfFNTr4uMNZma0ey4f5lgLrkB0aX0QMow==",
          "requires": {
            "has-flag": "^3.0.0"
          }
        }
      }
    },
    "jest-message-util": {
      "version": "24.9.0",
      "resolved": "https://registry.npmjs.org/jest-message-util/-/jest-message-util-24.9.0.tgz",
      "integrity": "sha512-oCj8FiZ3U0hTP4aSui87P4L4jC37BtQwUMqk+zk/b11FR19BJDeZsZAvIHutWnmtw7r85UmR3CEWZ0HWU2mAlw==",
      "requires": {
        "@babel/code-frame": "^7.0.0",
        "@jest/test-result": "^24.9.0",
        "@jest/types": "^24.9.0",
        "@types/stack-utils": "^1.0.1",
        "chalk": "^2.0.1",
        "micromatch": "^3.1.10",
        "slash": "^2.0.0",
        "stack-utils": "^1.0.1"
      },
      "dependencies": {
        "ansi-styles": {
          "version": "3.2.1",
          "resolved": "https://registry.npmjs.org/ansi-styles/-/ansi-styles-3.2.1.tgz",
          "integrity": "sha512-VT0ZI6kZRdTh8YyJw3SMbYm/u+NqfsAxEpWO0Pf9sq8/e94WxxOpPKx9FR1FlyCtOVDNOQ+8ntlqFxiRc+r5qA==",
          "requires": {
            "color-convert": "^1.9.0"
          }
        },
        "chalk": {
          "version": "2.4.2",
          "resolved": "https://registry.npmjs.org/chalk/-/chalk-2.4.2.tgz",
          "integrity": "sha512-Mti+f9lpJNcwF4tWV8/OrTTtF1gZi+f8FqlyAdouralcFWFQWF2+NgCHShjkCb+IFBLq9buZwE1xckQU4peSuQ==",
          "requires": {
            "ansi-styles": "^3.2.1",
            "escape-string-regexp": "^1.0.5",
            "supports-color": "^5.3.0"
          }
        },
        "supports-color": {
          "version": "5.5.0",
          "resolved": "https://registry.npmjs.org/supports-color/-/supports-color-5.5.0.tgz",
          "integrity": "sha512-QjVjwdXIt408MIiAqCX4oUKsgU2EqAGzs2Ppkm4aQYbjm+ZEWEcW4SfFNTr4uMNZma0ey4f5lgLrkB0aX0QMow==",
          "requires": {
            "has-flag": "^3.0.0"
          }
        }
      }
    },
    "jest-mock": {
      "version": "24.9.0",
      "resolved": "https://registry.npmjs.org/jest-mock/-/jest-mock-24.9.0.tgz",
      "integrity": "sha512-3BEYN5WbSq9wd+SyLDES7AHnjH9A/ROBwmz7l2y+ol+NtSFO8DYiEBzoO1CeFc9a8DYy10EO4dDFVv/wN3zl1w==",
      "requires": {
        "@jest/types": "^24.9.0"
      }
    },
    "jest-pnp-resolver": {
      "version": "1.2.1",
      "resolved": "https://registry.npmjs.org/jest-pnp-resolver/-/jest-pnp-resolver-1.2.1.tgz",
      "integrity": "sha512-pgFw2tm54fzgYvc/OHrnysABEObZCUNFnhjoRjaVOCN8NYc032/gVjPaHD4Aq6ApkSieWtfKAFQtmDKAmhupnQ=="
    },
    "jest-regex-util": {
      "version": "24.9.0",
      "resolved": "https://registry.npmjs.org/jest-regex-util/-/jest-regex-util-24.9.0.tgz",
      "integrity": "sha512-05Cmb6CuxaA+Ys6fjr3PhvV3bGQmO+2p2La4hFbU+W5uOc479f7FdLXUWXw4pYMAhhSZIuKHwSXSu6CsSBAXQA=="
    },
    "jest-resolve": {
      "version": "24.7.1",
      "resolved": "https://registry.npmjs.org/jest-resolve/-/jest-resolve-24.7.1.tgz",
      "integrity": "sha512-Bgrc+/UUZpGJ4323sQyj85hV9d+ANyPNu6XfRDUcyFNX1QrZpSoM0kE4Mb2vZMAYTJZsBFzYe8X1UaOkOELSbw==",
      "requires": {
        "@jest/types": "^24.7.0",
        "browser-resolve": "^1.11.3",
        "chalk": "^2.0.1",
        "jest-pnp-resolver": "^1.2.1",
        "realpath-native": "^1.1.0"
      },
      "dependencies": {
        "ansi-styles": {
          "version": "3.2.1",
          "resolved": "https://registry.npmjs.org/ansi-styles/-/ansi-styles-3.2.1.tgz",
          "integrity": "sha512-VT0ZI6kZRdTh8YyJw3SMbYm/u+NqfsAxEpWO0Pf9sq8/e94WxxOpPKx9FR1FlyCtOVDNOQ+8ntlqFxiRc+r5qA==",
          "requires": {
            "color-convert": "^1.9.0"
          }
        },
        "chalk": {
          "version": "2.4.2",
          "resolved": "https://registry.npmjs.org/chalk/-/chalk-2.4.2.tgz",
          "integrity": "sha512-Mti+f9lpJNcwF4tWV8/OrTTtF1gZi+f8FqlyAdouralcFWFQWF2+NgCHShjkCb+IFBLq9buZwE1xckQU4peSuQ==",
          "requires": {
            "ansi-styles": "^3.2.1",
            "escape-string-regexp": "^1.0.5",
            "supports-color": "^5.3.0"
          }
        },
        "supports-color": {
          "version": "5.5.0",
          "resolved": "https://registry.npmjs.org/supports-color/-/supports-color-5.5.0.tgz",
          "integrity": "sha512-QjVjwdXIt408MIiAqCX4oUKsgU2EqAGzs2Ppkm4aQYbjm+ZEWEcW4SfFNTr4uMNZma0ey4f5lgLrkB0aX0QMow==",
          "requires": {
            "has-flag": "^3.0.0"
          }
        }
      }
    },
    "jest-resolve-dependencies": {
      "version": "24.9.0",
      "resolved": "https://registry.npmjs.org/jest-resolve-dependencies/-/jest-resolve-dependencies-24.9.0.tgz",
      "integrity": "sha512-Fm7b6AlWnYhT0BXy4hXpactHIqER7erNgIsIozDXWl5dVm+k8XdGVe1oTg1JyaFnOxarMEbax3wyRJqGP2Pq+g==",
      "requires": {
        "@jest/types": "^24.9.0",
        "jest-regex-util": "^24.3.0",
        "jest-snapshot": "^24.9.0"
      }
    },
    "jest-runner": {
      "version": "24.9.0",
      "resolved": "https://registry.npmjs.org/jest-runner/-/jest-runner-24.9.0.tgz",
      "integrity": "sha512-KksJQyI3/0mhcfspnxxEOBueGrd5E4vV7ADQLT9ESaCzz02WnbdbKWIf5Mkaucoaj7obQckYPVX6JJhgUcoWWg==",
      "requires": {
        "@jest/console": "^24.7.1",
        "@jest/environment": "^24.9.0",
        "@jest/test-result": "^24.9.0",
        "@jest/types": "^24.9.0",
        "chalk": "^2.4.2",
        "exit": "^0.1.2",
        "graceful-fs": "^4.1.15",
        "jest-config": "^24.9.0",
        "jest-docblock": "^24.3.0",
        "jest-haste-map": "^24.9.0",
        "jest-jasmine2": "^24.9.0",
        "jest-leak-detector": "^24.9.0",
        "jest-message-util": "^24.9.0",
        "jest-resolve": "^24.9.0",
        "jest-runtime": "^24.9.0",
        "jest-util": "^24.9.0",
        "jest-worker": "^24.6.0",
        "source-map-support": "^0.5.6",
        "throat": "^4.0.0"
      },
      "dependencies": {
        "ansi-styles": {
          "version": "3.2.1",
          "resolved": "https://registry.npmjs.org/ansi-styles/-/ansi-styles-3.2.1.tgz",
          "integrity": "sha512-VT0ZI6kZRdTh8YyJw3SMbYm/u+NqfsAxEpWO0Pf9sq8/e94WxxOpPKx9FR1FlyCtOVDNOQ+8ntlqFxiRc+r5qA==",
          "requires": {
            "color-convert": "^1.9.0"
          }
        },
        "chalk": {
          "version": "2.4.2",
          "resolved": "https://registry.npmjs.org/chalk/-/chalk-2.4.2.tgz",
          "integrity": "sha512-Mti+f9lpJNcwF4tWV8/OrTTtF1gZi+f8FqlyAdouralcFWFQWF2+NgCHShjkCb+IFBLq9buZwE1xckQU4peSuQ==",
          "requires": {
            "ansi-styles": "^3.2.1",
            "escape-string-regexp": "^1.0.5",
            "supports-color": "^5.3.0"
          }
        },
        "jest-resolve": {
          "version": "24.9.0",
          "resolved": "https://registry.npmjs.org/jest-resolve/-/jest-resolve-24.9.0.tgz",
          "integrity": "sha512-TaLeLVL1l08YFZAt3zaPtjiVvyy4oSA6CRe+0AFPPVX3Q/VI0giIWWoAvoS5L96vj9Dqxj4fB5p2qrHCmTU/MQ==",
          "requires": {
            "@jest/types": "^24.9.0",
            "browser-resolve": "^1.11.3",
            "chalk": "^2.0.1",
            "jest-pnp-resolver": "^1.2.1",
            "realpath-native": "^1.1.0"
          }
        },
        "supports-color": {
          "version": "5.5.0",
          "resolved": "https://registry.npmjs.org/supports-color/-/supports-color-5.5.0.tgz",
          "integrity": "sha512-QjVjwdXIt408MIiAqCX4oUKsgU2EqAGzs2Ppkm4aQYbjm+ZEWEcW4SfFNTr4uMNZma0ey4f5lgLrkB0aX0QMow==",
          "requires": {
            "has-flag": "^3.0.0"
          }
        }
      }
    },
    "jest-runtime": {
      "version": "24.9.0",
      "resolved": "https://registry.npmjs.org/jest-runtime/-/jest-runtime-24.9.0.tgz",
      "integrity": "sha512-8oNqgnmF3v2J6PVRM2Jfuj8oX3syKmaynlDMMKQ4iyzbQzIG6th5ub/lM2bCMTmoTKM3ykcUYI2Pw9xwNtjMnw==",
      "requires": {
        "@jest/console": "^24.7.1",
        "@jest/environment": "^24.9.0",
        "@jest/source-map": "^24.3.0",
        "@jest/transform": "^24.9.0",
        "@jest/types": "^24.9.0",
        "@types/yargs": "^13.0.0",
        "chalk": "^2.0.1",
        "exit": "^0.1.2",
        "glob": "^7.1.3",
        "graceful-fs": "^4.1.15",
        "jest-config": "^24.9.0",
        "jest-haste-map": "^24.9.0",
        "jest-message-util": "^24.9.0",
        "jest-mock": "^24.9.0",
        "jest-regex-util": "^24.3.0",
        "jest-resolve": "^24.9.0",
        "jest-snapshot": "^24.9.0",
        "jest-util": "^24.9.0",
        "jest-validate": "^24.9.0",
        "realpath-native": "^1.1.0",
        "slash": "^2.0.0",
        "strip-bom": "^3.0.0",
        "yargs": "^13.3.0"
      },
      "dependencies": {
        "ansi-regex": {
          "version": "4.1.0",
          "resolved": "https://registry.npmjs.org/ansi-regex/-/ansi-regex-4.1.0.tgz",
          "integrity": "sha512-1apePfXM1UOSqw0o9IiFAovVz9M5S1Dg+4TrDwfMewQ6p/rmMueb7tWZjQ1rx4Loy1ArBggoqGpfqqdI4rondg=="
        },
        "ansi-styles": {
          "version": "3.2.1",
          "resolved": "https://registry.npmjs.org/ansi-styles/-/ansi-styles-3.2.1.tgz",
          "integrity": "sha512-VT0ZI6kZRdTh8YyJw3SMbYm/u+NqfsAxEpWO0Pf9sq8/e94WxxOpPKx9FR1FlyCtOVDNOQ+8ntlqFxiRc+r5qA==",
          "requires": {
            "color-convert": "^1.9.0"
          }
        },
        "chalk": {
          "version": "2.4.2",
          "resolved": "https://registry.npmjs.org/chalk/-/chalk-2.4.2.tgz",
          "integrity": "sha512-Mti+f9lpJNcwF4tWV8/OrTTtF1gZi+f8FqlyAdouralcFWFQWF2+NgCHShjkCb+IFBLq9buZwE1xckQU4peSuQ==",
          "requires": {
            "ansi-styles": "^3.2.1",
            "escape-string-regexp": "^1.0.5",
            "supports-color": "^5.3.0"
          }
        },
        "cliui": {
          "version": "5.0.0",
          "resolved": "https://registry.npmjs.org/cliui/-/cliui-5.0.0.tgz",
          "integrity": "sha512-PYeGSEmmHM6zvoef2w8TPzlrnNpXIjTipYK780YswmIP9vjxmd6Y2a3CB2Ks6/AU8NHjZugXvo8w3oWM2qnwXA==",
          "requires": {
            "string-width": "^3.1.0",
            "strip-ansi": "^5.2.0",
            "wrap-ansi": "^5.1.0"
          }
        },
        "emoji-regex": {
          "version": "7.0.3",
          "resolved": "https://registry.npmjs.org/emoji-regex/-/emoji-regex-7.0.3.tgz",
          "integrity": "sha512-CwBLREIQ7LvYFB0WyRvwhq5N5qPhc6PMjD6bYggFlI5YyDgl+0vxq5VHbMOFqLg7hfWzmu8T5Z1QofhmTIhItA=="
        },
        "find-up": {
          "version": "3.0.0",
          "resolved": "https://registry.npmjs.org/find-up/-/find-up-3.0.0.tgz",
          "integrity": "sha512-1yD6RmLI1XBfxugvORwlck6f75tYL+iR0jqwsOrOxMZyGYqUuDhJ0l4AXdO1iX/FTs9cBAMEk1gWSEx1kSbylg==",
          "requires": {
            "locate-path": "^3.0.0"
          }
        },
        "jest-resolve": {
          "version": "24.9.0",
          "resolved": "https://registry.npmjs.org/jest-resolve/-/jest-resolve-24.9.0.tgz",
          "integrity": "sha512-TaLeLVL1l08YFZAt3zaPtjiVvyy4oSA6CRe+0AFPPVX3Q/VI0giIWWoAvoS5L96vj9Dqxj4fB5p2qrHCmTU/MQ==",
          "requires": {
            "@jest/types": "^24.9.0",
            "browser-resolve": "^1.11.3",
            "chalk": "^2.0.1",
            "jest-pnp-resolver": "^1.2.1",
            "realpath-native": "^1.1.0"
          }
        },
        "locate-path": {
          "version": "3.0.0",
          "resolved": "https://registry.npmjs.org/locate-path/-/locate-path-3.0.0.tgz",
          "integrity": "sha512-7AO748wWnIhNqAuaty2ZWHkQHRSNfPVIsPIfwEOWO22AmaoVrWavlOcMR5nzTLNYvp36X220/maaRsrec1G65A==",
          "requires": {
            "p-locate": "^3.0.0",
            "path-exists": "^3.0.0"
          }
        },
        "p-limit": {
          "version": "2.2.1",
          "resolved": "https://registry.npmjs.org/p-limit/-/p-limit-2.2.1.tgz",
          "integrity": "sha512-85Tk+90UCVWvbDavCLKPOLC9vvY8OwEX/RtKF+/1OADJMVlFfEHOiMTPVyxg7mk/dKa+ipdHm0OUkTvCpMTuwg==",
          "requires": {
            "p-try": "^2.0.0"
          }
        },
        "p-locate": {
          "version": "3.0.0",
          "resolved": "https://registry.npmjs.org/p-locate/-/p-locate-3.0.0.tgz",
          "integrity": "sha512-x+12w/To+4GFfgJhBEpiDcLozRJGegY+Ei7/z0tSLkMmxGZNybVMSfWj9aJn8Z5Fc7dBUNJOOVgPv2H7IwulSQ==",
          "requires": {
            "p-limit": "^2.0.0"
          }
        },
        "p-try": {
          "version": "2.2.0",
          "resolved": "https://registry.npmjs.org/p-try/-/p-try-2.2.0.tgz",
          "integrity": "sha512-R4nPAVTAU0B9D35/Gk3uJf/7XYbQcyohSKdvAxIRSNghFl4e71hVoGnBNQz9cWaXxO2I10KTC+3jMdvvoKw6dQ=="
        },
        "string-width": {
          "version": "3.1.0",
          "resolved": "https://registry.npmjs.org/string-width/-/string-width-3.1.0.tgz",
          "integrity": "sha512-vafcv6KjVZKSgz06oM/H6GDBrAtz8vdhQakGjFIvNrHA6y3HCF1CInLy+QLq8dTJPQ1b+KDUqDFctkdRW44e1w==",
          "requires": {
            "emoji-regex": "^7.0.1",
            "is-fullwidth-code-point": "^2.0.0",
            "strip-ansi": "^5.1.0"
          }
        },
        "strip-ansi": {
          "version": "5.2.0",
          "resolved": "https://registry.npmjs.org/strip-ansi/-/strip-ansi-5.2.0.tgz",
          "integrity": "sha512-DuRs1gKbBqsMKIZlrffwlug8MHkcnpjs5VPmL1PAh+mA30U0DTotfDZ0d2UUsXpPmPmMMJ6W773MaA3J+lbiWA==",
          "requires": {
            "ansi-regex": "^4.1.0"
          }
        },
        "supports-color": {
          "version": "5.5.0",
          "resolved": "https://registry.npmjs.org/supports-color/-/supports-color-5.5.0.tgz",
          "integrity": "sha512-QjVjwdXIt408MIiAqCX4oUKsgU2EqAGzs2Ppkm4aQYbjm+ZEWEcW4SfFNTr4uMNZma0ey4f5lgLrkB0aX0QMow==",
          "requires": {
            "has-flag": "^3.0.0"
          }
        },
        "wrap-ansi": {
          "version": "5.1.0",
          "resolved": "https://registry.npmjs.org/wrap-ansi/-/wrap-ansi-5.1.0.tgz",
          "integrity": "sha512-QC1/iN/2/RPVJ5jYK8BGttj5z83LmSKmvbvrXPNCLZSEb32KKVDJDl/MOt2N01qU2H/FkzEa9PKto1BqDjtd7Q==",
          "requires": {
            "ansi-styles": "^3.2.0",
            "string-width": "^3.0.0",
            "strip-ansi": "^5.0.0"
          }
        },
        "y18n": {
          "version": "4.0.0",
          "resolved": "https://registry.npmjs.org/y18n/-/y18n-4.0.0.tgz",
          "integrity": "sha512-r9S/ZyXu/Xu9q1tYlpsLIsa3EeLXXk0VwlxqTcFRfg9EhMW+17kbt9G0NrgCmhGb5vT2hyhJZLfDGx+7+5Uj/w=="
        },
        "yargs": {
          "version": "13.3.0",
          "resolved": "https://registry.npmjs.org/yargs/-/yargs-13.3.0.tgz",
          "integrity": "sha512-2eehun/8ALW8TLoIl7MVaRUrg+yCnenu8B4kBlRxj3GJGDKU1Og7sMXPNm1BYyM1DOJmTZ4YeN/Nwxv+8XJsUA==",
          "requires": {
            "cliui": "^5.0.0",
            "find-up": "^3.0.0",
            "get-caller-file": "^2.0.1",
            "require-directory": "^2.1.1",
            "require-main-filename": "^2.0.0",
            "set-blocking": "^2.0.0",
            "string-width": "^3.0.0",
            "which-module": "^2.0.0",
            "y18n": "^4.0.0",
            "yargs-parser": "^13.1.1"
          }
        }
      }
    },
    "jest-serializer": {
      "version": "24.9.0",
      "resolved": "https://registry.npmjs.org/jest-serializer/-/jest-serializer-24.9.0.tgz",
      "integrity": "sha512-DxYipDr8OvfrKH3Kel6NdED3OXxjvxXZ1uIY2I9OFbGg+vUkkg7AGvi65qbhbWNPvDckXmzMPbK3u3HaDO49bQ=="
    },
    "jest-snapshot": {
      "version": "24.9.0",
      "resolved": "https://registry.npmjs.org/jest-snapshot/-/jest-snapshot-24.9.0.tgz",
      "integrity": "sha512-uI/rszGSs73xCM0l+up7O7a40o90cnrk429LOiK3aeTvfC0HHmldbd81/B7Ix81KSFe1lwkbl7GnBGG4UfuDew==",
      "requires": {
        "@babel/types": "^7.0.0",
        "@jest/types": "^24.9.0",
        "chalk": "^2.0.1",
        "expect": "^24.9.0",
        "jest-diff": "^24.9.0",
        "jest-get-type": "^24.9.0",
        "jest-matcher-utils": "^24.9.0",
        "jest-message-util": "^24.9.0",
        "jest-resolve": "^24.9.0",
        "mkdirp": "^0.5.1",
        "natural-compare": "^1.4.0",
        "pretty-format": "^24.9.0",
        "semver": "^6.2.0"
      },
      "dependencies": {
        "ansi-styles": {
          "version": "3.2.1",
          "resolved": "https://registry.npmjs.org/ansi-styles/-/ansi-styles-3.2.1.tgz",
          "integrity": "sha512-VT0ZI6kZRdTh8YyJw3SMbYm/u+NqfsAxEpWO0Pf9sq8/e94WxxOpPKx9FR1FlyCtOVDNOQ+8ntlqFxiRc+r5qA==",
          "requires": {
            "color-convert": "^1.9.0"
          }
        },
        "chalk": {
          "version": "2.4.2",
          "resolved": "https://registry.npmjs.org/chalk/-/chalk-2.4.2.tgz",
          "integrity": "sha512-Mti+f9lpJNcwF4tWV8/OrTTtF1gZi+f8FqlyAdouralcFWFQWF2+NgCHShjkCb+IFBLq9buZwE1xckQU4peSuQ==",
          "requires": {
            "ansi-styles": "^3.2.1",
            "escape-string-regexp": "^1.0.5",
            "supports-color": "^5.3.0"
          }
        },
        "jest-resolve": {
          "version": "24.9.0",
          "resolved": "https://registry.npmjs.org/jest-resolve/-/jest-resolve-24.9.0.tgz",
          "integrity": "sha512-TaLeLVL1l08YFZAt3zaPtjiVvyy4oSA6CRe+0AFPPVX3Q/VI0giIWWoAvoS5L96vj9Dqxj4fB5p2qrHCmTU/MQ==",
          "requires": {
            "@jest/types": "^24.9.0",
            "browser-resolve": "^1.11.3",
            "chalk": "^2.0.1",
            "jest-pnp-resolver": "^1.2.1",
            "realpath-native": "^1.1.0"
          }
        },
        "semver": {
          "version": "6.3.0",
          "resolved": "https://registry.npmjs.org/semver/-/semver-6.3.0.tgz",
          "integrity": "sha512-b39TBaTSfV6yBrapU89p5fKekE2m/NwnDocOVruQFS1/veMgdzuPcnOM34M6CwxW8jH/lxEa5rBoDeUwu5HHTw=="
        },
        "supports-color": {
          "version": "5.5.0",
          "resolved": "https://registry.npmjs.org/supports-color/-/supports-color-5.5.0.tgz",
          "integrity": "sha512-QjVjwdXIt408MIiAqCX4oUKsgU2EqAGzs2Ppkm4aQYbjm+ZEWEcW4SfFNTr4uMNZma0ey4f5lgLrkB0aX0QMow==",
          "requires": {
            "has-flag": "^3.0.0"
          }
        }
      }
    },
    "jest-util": {
      "version": "24.9.0",
      "resolved": "https://registry.npmjs.org/jest-util/-/jest-util-24.9.0.tgz",
      "integrity": "sha512-x+cZU8VRmOJxbA1K5oDBdxQmdq0OIdADarLxk0Mq+3XS4jgvhG/oKGWcIDCtPG0HgjxOYvF+ilPJQsAyXfbNOg==",
      "requires": {
        "@jest/console": "^24.9.0",
        "@jest/fake-timers": "^24.9.0",
        "@jest/source-map": "^24.9.0",
        "@jest/test-result": "^24.9.0",
        "@jest/types": "^24.9.0",
        "callsites": "^3.0.0",
        "chalk": "^2.0.1",
        "graceful-fs": "^4.1.15",
        "is-ci": "^2.0.0",
        "mkdirp": "^0.5.1",
        "slash": "^2.0.0",
        "source-map": "^0.6.0"
      },
      "dependencies": {
        "ansi-styles": {
          "version": "3.2.1",
          "resolved": "https://registry.npmjs.org/ansi-styles/-/ansi-styles-3.2.1.tgz",
          "integrity": "sha512-VT0ZI6kZRdTh8YyJw3SMbYm/u+NqfsAxEpWO0Pf9sq8/e94WxxOpPKx9FR1FlyCtOVDNOQ+8ntlqFxiRc+r5qA==",
          "requires": {
            "color-convert": "^1.9.0"
          }
        },
        "callsites": {
          "version": "3.1.0",
          "resolved": "https://registry.npmjs.org/callsites/-/callsites-3.1.0.tgz",
          "integrity": "sha512-P8BjAsXvZS+VIDUI11hHCQEv74YT67YUi5JJFNWIqL235sBmjX4+qx9Muvls5ivyNENctx46xQLQ3aTuE7ssaQ=="
        },
        "chalk": {
          "version": "2.4.2",
          "resolved": "https://registry.npmjs.org/chalk/-/chalk-2.4.2.tgz",
          "integrity": "sha512-Mti+f9lpJNcwF4tWV8/OrTTtF1gZi+f8FqlyAdouralcFWFQWF2+NgCHShjkCb+IFBLq9buZwE1xckQU4peSuQ==",
          "requires": {
            "ansi-styles": "^3.2.1",
            "escape-string-regexp": "^1.0.5",
            "supports-color": "^5.3.0"
          }
        },
        "ci-info": {
          "version": "2.0.0",
          "resolved": "https://registry.npmjs.org/ci-info/-/ci-info-2.0.0.tgz",
          "integrity": "sha512-5tK7EtrZ0N+OLFMthtqOj4fI2Jeb88C4CAZPu25LDVUgXJ0A3Js4PMGqrn0JU1W0Mh1/Z8wZzYPxqUrXeBboCQ=="
        },
        "is-ci": {
          "version": "2.0.0",
          "resolved": "https://registry.npmjs.org/is-ci/-/is-ci-2.0.0.tgz",
          "integrity": "sha512-YfJT7rkpQB0updsdHLGWrvhBJfcfzNNawYDNIyQXJz0IViGf75O8EBPKSdvw2rF+LGCsX4FZ8tcr3b19LcZq4w==",
          "requires": {
            "ci-info": "^2.0.0"
          }
        },
        "source-map": {
          "version": "0.6.1",
          "resolved": "https://registry.npmjs.org/source-map/-/source-map-0.6.1.tgz",
          "integrity": "sha512-UjgapumWlbMhkBgzT7Ykc5YXUT46F0iKu8SGXq0bcwP5dz/h0Plj6enJqjz1Zbq2l5WaqYnrVbwWOWMyF3F47g=="
        },
        "supports-color": {
          "version": "5.5.0",
          "resolved": "https://registry.npmjs.org/supports-color/-/supports-color-5.5.0.tgz",
          "integrity": "sha512-QjVjwdXIt408MIiAqCX4oUKsgU2EqAGzs2Ppkm4aQYbjm+ZEWEcW4SfFNTr4uMNZma0ey4f5lgLrkB0aX0QMow==",
          "requires": {
            "has-flag": "^3.0.0"
          }
        }
      }
    },
    "jest-validate": {
      "version": "24.9.0",
      "resolved": "https://registry.npmjs.org/jest-validate/-/jest-validate-24.9.0.tgz",
      "integrity": "sha512-HPIt6C5ACwiqSiwi+OfSSHbK8sG7akG8eATl+IPKaeIjtPOeBUd/g3J7DghugzxrGjI93qS/+RPKe1H6PqvhRQ==",
      "requires": {
        "@jest/types": "^24.9.0",
        "camelcase": "^5.3.1",
        "chalk": "^2.0.1",
        "jest-get-type": "^24.9.0",
        "leven": "^3.1.0",
        "pretty-format": "^24.9.0"
      },
      "dependencies": {
        "ansi-styles": {
          "version": "3.2.1",
          "resolved": "https://registry.npmjs.org/ansi-styles/-/ansi-styles-3.2.1.tgz",
          "integrity": "sha512-VT0ZI6kZRdTh8YyJw3SMbYm/u+NqfsAxEpWO0Pf9sq8/e94WxxOpPKx9FR1FlyCtOVDNOQ+8ntlqFxiRc+r5qA==",
          "requires": {
            "color-convert": "^1.9.0"
          }
        },
        "camelcase": {
          "version": "5.3.1",
          "resolved": "https://registry.npmjs.org/camelcase/-/camelcase-5.3.1.tgz",
          "integrity": "sha512-L28STB170nwWS63UjtlEOE3dldQApaJXZkOI1uMFfzf3rRuPegHaHesyee+YxQ+W6SvRDQV6UrdOdRiR153wJg=="
        },
        "chalk": {
          "version": "2.4.2",
          "resolved": "https://registry.npmjs.org/chalk/-/chalk-2.4.2.tgz",
          "integrity": "sha512-Mti+f9lpJNcwF4tWV8/OrTTtF1gZi+f8FqlyAdouralcFWFQWF2+NgCHShjkCb+IFBLq9buZwE1xckQU4peSuQ==",
          "requires": {
            "ansi-styles": "^3.2.1",
            "escape-string-regexp": "^1.0.5",
            "supports-color": "^5.3.0"
          }
        },
        "supports-color": {
          "version": "5.5.0",
          "resolved": "https://registry.npmjs.org/supports-color/-/supports-color-5.5.0.tgz",
          "integrity": "sha512-QjVjwdXIt408MIiAqCX4oUKsgU2EqAGzs2Ppkm4aQYbjm+ZEWEcW4SfFNTr4uMNZma0ey4f5lgLrkB0aX0QMow==",
          "requires": {
            "has-flag": "^3.0.0"
          }
        }
      }
    },
    "jest-watch-typeahead": {
      "version": "0.3.0",
      "resolved": "https://registry.npmjs.org/jest-watch-typeahead/-/jest-watch-typeahead-0.3.0.tgz",
      "integrity": "sha512-+uOtlppt9ysST6k6ZTqsPI0WNz2HLa8bowiZylZoQCQaAVn7XsVmHhZREkz73FhKelrFrpne4hQQjdq42nFEmA==",
      "requires": {
        "ansi-escapes": "^3.0.0",
        "chalk": "^2.4.1",
        "jest-watcher": "^24.3.0",
        "slash": "^2.0.0",
        "string-length": "^2.0.0",
        "strip-ansi": "^5.0.0"
      },
      "dependencies": {
        "ansi-regex": {
          "version": "3.0.0",
          "resolved": "https://registry.npmjs.org/ansi-regex/-/ansi-regex-3.0.0.tgz",
          "integrity": "sha1-7QMXwyIGT3lGbAKWa922Bas32Zg="
        },
        "ansi-styles": {
          "version": "3.2.1",
          "resolved": "https://registry.npmjs.org/ansi-styles/-/ansi-styles-3.2.1.tgz",
          "integrity": "sha512-VT0ZI6kZRdTh8YyJw3SMbYm/u+NqfsAxEpWO0Pf9sq8/e94WxxOpPKx9FR1FlyCtOVDNOQ+8ntlqFxiRc+r5qA==",
          "requires": {
            "color-convert": "^1.9.0"
          }
        },
        "chalk": {
          "version": "2.4.2",
          "resolved": "https://registry.npmjs.org/chalk/-/chalk-2.4.2.tgz",
          "integrity": "sha512-Mti+f9lpJNcwF4tWV8/OrTTtF1gZi+f8FqlyAdouralcFWFQWF2+NgCHShjkCb+IFBLq9buZwE1xckQU4peSuQ==",
          "requires": {
            "ansi-styles": "^3.2.1",
            "escape-string-regexp": "^1.0.5",
            "supports-color": "^5.3.0"
          }
        },
        "string-length": {
          "version": "2.0.0",
          "resolved": "https://registry.npmjs.org/string-length/-/string-length-2.0.0.tgz",
          "integrity": "sha1-1A27aGo6zpYMHP/KVivyxF+DY+0=",
          "requires": {
            "astral-regex": "^1.0.0",
            "strip-ansi": "^4.0.0"
          },
          "dependencies": {
            "strip-ansi": {
              "version": "4.0.0",
              "resolved": "https://registry.npmjs.org/strip-ansi/-/strip-ansi-4.0.0.tgz",
              "integrity": "sha1-qEeQIusaw2iocTibY1JixQXuNo8=",
              "requires": {
                "ansi-regex": "^3.0.0"
              }
            }
          }
        },
        "strip-ansi": {
          "version": "5.2.0",
          "resolved": "https://registry.npmjs.org/strip-ansi/-/strip-ansi-5.2.0.tgz",
          "integrity": "sha512-DuRs1gKbBqsMKIZlrffwlug8MHkcnpjs5VPmL1PAh+mA30U0DTotfDZ0d2UUsXpPmPmMMJ6W773MaA3J+lbiWA==",
          "requires": {
            "ansi-regex": "^4.1.0"
          },
          "dependencies": {
            "ansi-regex": {
              "version": "4.1.0",
              "resolved": "https://registry.npmjs.org/ansi-regex/-/ansi-regex-4.1.0.tgz",
              "integrity": "sha512-1apePfXM1UOSqw0o9IiFAovVz9M5S1Dg+4TrDwfMewQ6p/rmMueb7tWZjQ1rx4Loy1ArBggoqGpfqqdI4rondg=="
            }
          }
        },
        "supports-color": {
          "version": "5.5.0",
          "resolved": "https://registry.npmjs.org/supports-color/-/supports-color-5.5.0.tgz",
          "integrity": "sha512-QjVjwdXIt408MIiAqCX4oUKsgU2EqAGzs2Ppkm4aQYbjm+ZEWEcW4SfFNTr4uMNZma0ey4f5lgLrkB0aX0QMow==",
          "requires": {
            "has-flag": "^3.0.0"
          }
        }
      }
    },
    "jest-watcher": {
      "version": "24.9.0",
      "resolved": "https://registry.npmjs.org/jest-watcher/-/jest-watcher-24.9.0.tgz",
      "integrity": "sha512-+/fLOfKPXXYJDYlks62/4R4GoT+GU1tYZed99JSCOsmzkkF7727RqKrjNAxtfO4YpGv11wybgRvCjR73lK2GZw==",
      "requires": {
        "@jest/test-result": "^24.9.0",
        "@jest/types": "^24.9.0",
        "@types/yargs": "^13.0.0",
        "ansi-escapes": "^3.0.0",
        "chalk": "^2.0.1",
        "jest-util": "^24.9.0",
        "string-length": "^2.0.0"
      },
      "dependencies": {
        "ansi-regex": {
          "version": "3.0.0",
          "resolved": "https://registry.npmjs.org/ansi-regex/-/ansi-regex-3.0.0.tgz",
          "integrity": "sha1-7QMXwyIGT3lGbAKWa922Bas32Zg="
        },
        "ansi-styles": {
          "version": "3.2.1",
          "resolved": "https://registry.npmjs.org/ansi-styles/-/ansi-styles-3.2.1.tgz",
          "integrity": "sha512-VT0ZI6kZRdTh8YyJw3SMbYm/u+NqfsAxEpWO0Pf9sq8/e94WxxOpPKx9FR1FlyCtOVDNOQ+8ntlqFxiRc+r5qA==",
          "requires": {
            "color-convert": "^1.9.0"
          }
        },
        "chalk": {
          "version": "2.4.2",
          "resolved": "https://registry.npmjs.org/chalk/-/chalk-2.4.2.tgz",
          "integrity": "sha512-Mti+f9lpJNcwF4tWV8/OrTTtF1gZi+f8FqlyAdouralcFWFQWF2+NgCHShjkCb+IFBLq9buZwE1xckQU4peSuQ==",
          "requires": {
            "ansi-styles": "^3.2.1",
            "escape-string-regexp": "^1.0.5",
            "supports-color": "^5.3.0"
          }
        },
        "string-length": {
          "version": "2.0.0",
          "resolved": "https://registry.npmjs.org/string-length/-/string-length-2.0.0.tgz",
          "integrity": "sha1-1A27aGo6zpYMHP/KVivyxF+DY+0=",
          "requires": {
            "astral-regex": "^1.0.0",
            "strip-ansi": "^4.0.0"
          }
        },
        "strip-ansi": {
          "version": "4.0.0",
          "resolved": "https://registry.npmjs.org/strip-ansi/-/strip-ansi-4.0.0.tgz",
          "integrity": "sha1-qEeQIusaw2iocTibY1JixQXuNo8=",
          "requires": {
            "ansi-regex": "^3.0.0"
          }
        },
        "supports-color": {
          "version": "5.5.0",
          "resolved": "https://registry.npmjs.org/supports-color/-/supports-color-5.5.0.tgz",
          "integrity": "sha512-QjVjwdXIt408MIiAqCX4oUKsgU2EqAGzs2Ppkm4aQYbjm+ZEWEcW4SfFNTr4uMNZma0ey4f5lgLrkB0aX0QMow==",
          "requires": {
            "has-flag": "^3.0.0"
          }
        }
      }
    },
    "jest-worker": {
      "version": "24.9.0",
      "resolved": "https://registry.npmjs.org/jest-worker/-/jest-worker-24.9.0.tgz",
      "integrity": "sha512-51PE4haMSXcHohnSMdM42anbvZANYTqMrr52tVKPqqsPJMzoP6FYYDVqahX/HrAoKEKz3uUPzSvKs9A3qR4iVw==",
      "requires": {
        "merge-stream": "^2.0.0",
        "supports-color": "^6.1.0"
      },
      "dependencies": {
        "supports-color": {
          "version": "6.1.0",
          "resolved": "https://registry.npmjs.org/supports-color/-/supports-color-6.1.0.tgz",
          "integrity": "sha512-qe1jfm1Mg7Nq/NSh6XE24gPXROEVsWHxC1LIx//XNlD9iw7YZQGjZNjYN7xGaEG6iKdA8EtNFW6R0gjnVXp+wQ==",
          "requires": {
            "has-flag": "^3.0.0"
          }
        }
      }
    },
    "jju": {
      "version": "1.4.0",
      "resolved": "https://registry.npmjs.org/jju/-/jju-1.4.0.tgz",
      "integrity": "sha1-o6vicYryQaKykE+EpiWXDzia4yo="
    },
    "join-path": {
      "version": "1.1.1",
      "resolved": "https://registry.npmjs.org/join-path/-/join-path-1.1.1.tgz",
      "integrity": "sha1-EFNaEm0ky9Zff/zfFe8uYxB2tQU=",
      "requires": {
        "as-array": "^2.0.0",
        "url-join": "0.0.1",
        "valid-url": "^1"
      }
    },
    "js-levenshtein": {
      "version": "1.1.6",
      "resolved": "https://registry.npmjs.org/js-levenshtein/-/js-levenshtein-1.1.6.tgz",
      "integrity": "sha512-X2BB11YZtrRqY4EnQcLX5Rh373zbK4alC1FW7D7MBhL2gtcC17cTnr6DmfHZeS0s2rTHjUTMMHfG7gO8SSdw+g=="
    },
    "js-tokens": {
      "version": "4.0.0",
      "resolved": "https://registry.npmjs.org/js-tokens/-/js-tokens-4.0.0.tgz",
      "integrity": "sha512-RdJUflcE3cUzKiMqQgsCu06FPu9UdIJO0beYbPhHN4k6apgJtifcoCtT9bcxOpYBtpD2kCM6Sbzg4CausW/PKQ=="
    },
    "js-yaml": {
      "version": "3.13.1",
      "resolved": "https://registry.npmjs.org/js-yaml/-/js-yaml-3.13.1.tgz",
      "integrity": "sha512-YfbcO7jXDdyj0DGxYVSlSeQNHbD7XPWvrVWeVUujrQEoZzWJIRrCPoyk6kL6IAjAG2IolMK4T0hNUe0HOUs5Jw==",
      "requires": {
        "argparse": "^1.0.7",
        "esprima": "^4.0.0"
      }
    },
    "jsbn": {
      "version": "0.1.1",
      "resolved": "https://registry.npmjs.org/jsbn/-/jsbn-0.1.1.tgz",
      "integrity": "sha1-peZUwuWi3rXyAdls77yoDA7y9RM="
    },
    "jsdom": {
      "version": "11.12.0",
      "resolved": "https://registry.npmjs.org/jsdom/-/jsdom-11.12.0.tgz",
      "integrity": "sha512-y8Px43oyiBM13Zc1z780FrfNLJCXTL40EWlty/LXUtcjykRBNgLlCjWXpfSPBl2iv+N7koQN+dvqszHZgT/Fjw==",
      "requires": {
        "abab": "^2.0.0",
        "acorn": "^5.5.3",
        "acorn-globals": "^4.1.0",
        "array-equal": "^1.0.0",
        "cssom": ">= 0.3.2 < 0.4.0",
        "cssstyle": "^1.0.0",
        "data-urls": "^1.0.0",
        "domexception": "^1.0.1",
        "escodegen": "^1.9.1",
        "html-encoding-sniffer": "^1.0.2",
        "left-pad": "^1.3.0",
        "nwsapi": "^2.0.7",
        "parse5": "4.0.0",
        "pn": "^1.1.0",
        "request": "^2.87.0",
        "request-promise-native": "^1.0.5",
        "sax": "^1.2.4",
        "symbol-tree": "^3.2.2",
        "tough-cookie": "^2.3.4",
        "w3c-hr-time": "^1.0.1",
        "webidl-conversions": "^4.0.2",
        "whatwg-encoding": "^1.0.3",
        "whatwg-mimetype": "^2.1.0",
        "whatwg-url": "^6.4.1",
        "ws": "^5.2.0",
        "xml-name-validator": "^3.0.0"
      }
    },
    "jsesc": {
      "version": "2.5.2",
      "resolved": "https://registry.npmjs.org/jsesc/-/jsesc-2.5.2.tgz",
      "integrity": "sha512-OYu7XEzjkCQ3C5Ps3QIZsQfNpqoJyZZA99wd9aWd05NCtC5pWOkShK2mkL6HXQR6/Cy2lbNdPlZBpuQHXE63gA=="
    },
    "json-parse-better-errors": {
      "version": "1.0.2",
      "resolved": "https://registry.npmjs.org/json-parse-better-errors/-/json-parse-better-errors-1.0.2.tgz",
      "integrity": "sha512-mrqyZKfX5EhL7hvqcV6WG1yYjnjeuYDzDhhcAAUrq8Po85NBQBJP+ZDUT75qZQ98IkUoBqdkExkukOU7Ts2wrw=="
    },
    "json-parse-helpfulerror": {
      "version": "1.0.3",
      "resolved": "https://registry.npmjs.org/json-parse-helpfulerror/-/json-parse-helpfulerror-1.0.3.tgz",
      "integrity": "sha1-E/FM4C7tTpgSl7ZOueO5MuLdE9w=",
      "requires": {
        "jju": "^1.1.0"
      }
    },
    "json-schema": {
      "version": "0.2.3",
      "resolved": "https://registry.npmjs.org/json-schema/-/json-schema-0.2.3.tgz",
      "integrity": "sha1-tIDIkuWaLwWVTOcnvT8qTogvnhM="
    },
    "json-schema-traverse": {
      "version": "0.4.1",
      "resolved": "https://registry.npmjs.org/json-schema-traverse/-/json-schema-traverse-0.4.1.tgz",
      "integrity": "sha512-xbbCH5dCYU5T8LcEhhuh7HJ88HXuW3qsI3Y0zOZFKfZEHcpWiHU/Jxzk629Brsab/mMiHQti9wMP+845RPe3Vg=="
    },
    "json-stable-stringify": {
      "version": "1.0.1",
      "resolved": "https://registry.npmjs.org/json-stable-stringify/-/json-stable-stringify-1.0.1.tgz",
      "integrity": "sha1-mnWdOcXy/1A/1TAGRu1EX4jE+a8=",
      "requires": {
        "jsonify": "~0.0.0"
      }
    },
    "json-stable-stringify-without-jsonify": {
      "version": "1.0.1",
      "resolved": "https://registry.npmjs.org/json-stable-stringify-without-jsonify/-/json-stable-stringify-without-jsonify-1.0.1.tgz",
      "integrity": "sha1-nbe1lJatPzz+8wp1FC0tkwrXJlE="
    },
    "json-stringify-safe": {
      "version": "5.0.1",
      "resolved": "https://registry.npmjs.org/json-stringify-safe/-/json-stringify-safe-5.0.1.tgz",
      "integrity": "sha1-Epai1Y/UXxmg9s4B1lcB4sc1tus="
    },
    "json3": {
      "version": "3.3.3",
      "resolved": "https://registry.npmjs.org/json3/-/json3-3.3.3.tgz",
      "integrity": "sha512-c7/8mbUsKigAbLkD5B010BK4D9LZm7A1pNItkEwiUZRpIN66exu/e7YQWysGun+TRKaJp8MhemM+VkfWv42aCA=="
    },
    "json5": {
      "version": "2.1.0",
      "resolved": "https://registry.npmjs.org/json5/-/json5-2.1.0.tgz",
      "integrity": "sha512-8Mh9h6xViijj36g7Dxi+Y4S6hNGV96vcJZr/SrlHh1LR/pEn/8j/+qIBbs44YKl69Lrfctp4QD+AdWLTMqEZAQ==",
      "requires": {
        "minimist": "^1.2.0"
      },
      "dependencies": {
        "minimist": {
          "version": "1.2.0",
          "resolved": "https://registry.npmjs.org/minimist/-/minimist-1.2.0.tgz",
          "integrity": "sha1-o1AIsg9BOD7sH7kU9M1d95omQoQ="
        }
      }
    },
    "jsonfile": {
      "version": "2.4.0",
      "resolved": "https://registry.npmjs.org/jsonfile/-/jsonfile-2.4.0.tgz",
      "integrity": "sha1-NzaitCi4e72gzIO1P6PWM6NcKug=",
      "requires": {
        "graceful-fs": "^4.1.6"
      }
    },
    "jsonify": {
      "version": "0.0.0",
      "resolved": "https://registry.npmjs.org/jsonify/-/jsonify-0.0.0.tgz",
      "integrity": "sha1-LHS27kHZPKUbe1qu6PUDYx0lKnM="
    },
    "jsonparse": {
      "version": "1.3.1",
      "resolved": "https://registry.npmjs.org/jsonparse/-/jsonparse-1.3.1.tgz",
      "integrity": "sha1-P02uSpH6wxX3EGL4UhzCOfE2YoA="
    },
    "jsonpointer": {
      "version": "4.0.1",
      "resolved": "https://registry.npmjs.org/jsonpointer/-/jsonpointer-4.0.1.tgz",
      "integrity": "sha1-T9kss04OnbPInIYi7PUfm5eMbLk="
    },
    "jsonschema": {
      "version": "1.2.4",
      "resolved": "https://registry.npmjs.org/jsonschema/-/jsonschema-1.2.4.tgz",
      "integrity": "sha512-lz1nOH69GbsVHeVgEdvyavc/33oymY1AZwtePMiMj4HZPMbP5OIKK3zT9INMWjwua/V4Z4yq7wSlBbSG+g4AEw=="
    },
    "jsonwebtoken": {
      "version": "8.5.1",
      "resolved": "https://registry.npmjs.org/jsonwebtoken/-/jsonwebtoken-8.5.1.tgz",
      "integrity": "sha512-XjwVfRS6jTMsqYs0EsuJ4LGxXV14zQybNd4L2r0UvbVnSF9Af8x7p5MzbJ90Ioz/9TI41/hTCvznF/loiSzn8w==",
      "requires": {
        "jws": "^3.2.2",
        "lodash.includes": "^4.3.0",
        "lodash.isboolean": "^3.0.3",
        "lodash.isinteger": "^4.0.4",
        "lodash.isnumber": "^3.0.3",
        "lodash.isplainobject": "^4.0.6",
        "lodash.isstring": "^4.0.1",
        "lodash.once": "^4.0.0",
        "ms": "^2.1.1",
        "semver": "^5.6.0"
      },
      "dependencies": {
        "ms": {
          "version": "2.1.2",
          "resolved": "https://registry.npmjs.org/ms/-/ms-2.1.2.tgz",
          "integrity": "sha512-sGkPx+VjMtmA6MX27oA4FBFELFCZZ4S4XqeGOXCv68tT+jb3vk/RyaKWP0PTKyWtmLSM0b+adUTEvbs1PEaH2w=="
        }
      }
    },
    "jsprim": {
      "version": "1.4.1",
      "resolved": "https://registry.npmjs.org/jsprim/-/jsprim-1.4.1.tgz",
      "integrity": "sha1-MT5mvB5cwG5Di8G3SZwuXFastqI=",
      "requires": {
        "assert-plus": "1.0.0",
        "extsprintf": "1.3.0",
        "json-schema": "0.2.3",
        "verror": "1.10.0"
      }
    },
    "jsx-ast-utils": {
      "version": "1.4.1",
      "resolved": "https://registry.npmjs.org/jsx-ast-utils/-/jsx-ast-utils-1.4.1.tgz",
      "integrity": "sha1-OGchPo3Xm/Ho8jAMDPwe+xgsDfE="
    },
    "jwa": {
      "version": "1.4.1",
      "resolved": "https://registry.npmjs.org/jwa/-/jwa-1.4.1.tgz",
      "integrity": "sha512-qiLX/xhEEFKUAJ6FiBMbes3w9ATzyk5W7Hvzpa/SLYdxNtng+gcurvrI7TbACjIXlsJyr05/S1oUhZrc63evQA==",
      "requires": {
        "buffer-equal-constant-time": "1.0.1",
        "ecdsa-sig-formatter": "1.0.11",
        "safe-buffer": "^5.0.1"
      }
    },
    "jws": {
      "version": "3.2.2",
      "resolved": "https://registry.npmjs.org/jws/-/jws-3.2.2.tgz",
      "integrity": "sha512-YHlZCB6lMTllWDtSPHz/ZXTsi8S00usEV6v1tjq8tOUZzw7DpSDWVXjXDre6ed1w/pd495ODpHZYSdkRTsa0HA==",
      "requires": {
        "jwa": "^1.4.1",
        "safe-buffer": "^5.0.1"
      }
    },
    "killable": {
      "version": "1.0.1",
      "resolved": "https://registry.npmjs.org/killable/-/killable-1.0.1.tgz",
      "integrity": "sha512-LzqtLKlUwirEUyl/nicirVmNiPvYs7l5n8wOPP7fyJVpUPkvCnW/vuiXGpylGUlnPDnB7311rARzAt3Mhswpjg=="
    },
    "kind-of": {
      "version": "6.0.2",
      "resolved": "https://registry.npmjs.org/kind-of/-/kind-of-6.0.2.tgz",
      "integrity": "sha512-s5kLOcnH0XqDO+FvuaLX8DDjZ18CGFk7VygH40QoKPUQhW4e2rvM0rwUq0t8IQDOwYSeLK01U90OjzBTme2QqA=="
    },
    "klaw": {
      "version": "1.3.1",
      "resolved": "https://registry.npmjs.org/klaw/-/klaw-1.3.1.tgz",
      "integrity": "sha1-QIhDO0azsbolnXh4XY6W9zugJDk=",
      "requires": {
        "graceful-fs": "^4.1.9"
      }
    },
    "kleur": {
      "version": "3.0.3",
      "resolved": "https://registry.npmjs.org/kleur/-/kleur-3.0.3.tgz",
      "integrity": "sha512-eTIzlVOSUR+JxdDFepEYcBMtZ9Qqdef+rnzWdRZuMbOywu5tO2w2N7rqjoANZ5k9vywhL6Br1VRjUIgTQx4E8w=="
    },
    "last-call-webpack-plugin": {
      "version": "3.0.0",
      "resolved": "https://registry.npmjs.org/last-call-webpack-plugin/-/last-call-webpack-plugin-3.0.0.tgz",
      "integrity": "sha512-7KI2l2GIZa9p2spzPIVZBYyNKkN+e/SQPpnjlTiPhdbDW3F86tdKKELxKpzJ5sgU19wQWsACULZmpTPYHeWO5w==",
      "requires": {
        "lodash": "^4.17.5",
        "webpack-sources": "^1.1.0"
      }
    },
    "latest-version": {
      "version": "3.1.0",
      "resolved": "https://registry.npmjs.org/latest-version/-/latest-version-3.1.0.tgz",
      "integrity": "sha1-ogU4P+oyKzO1rjsYq+4NwvNW7hU=",
      "requires": {
        "package-json": "^4.0.0"
      }
    },
    "lazy-cache": {
      "version": "1.0.4",
      "resolved": "https://registry.npmjs.org/lazy-cache/-/lazy-cache-1.0.4.tgz",
      "integrity": "sha1-odePw6UEdMuAhF07O24dpJpEbo4="
    },
    "lazystream": {
      "version": "1.0.0",
      "resolved": "https://registry.npmjs.org/lazystream/-/lazystream-1.0.0.tgz",
      "integrity": "sha1-9plf4PggOS9hOWvolGJAe7dxaOQ=",
      "requires": {
        "readable-stream": "^2.0.5"
      }
    },
    "lcid": {
      "version": "1.0.0",
      "resolved": "https://registry.npmjs.org/lcid/-/lcid-1.0.0.tgz",
      "integrity": "sha1-MIrMr6C8SDo4Z7S28rlQYlHRuDU=",
      "requires": {
        "invert-kv": "^1.0.0"
      }
    },
    "left-pad": {
      "version": "1.3.0",
      "resolved": "https://registry.npmjs.org/left-pad/-/left-pad-1.3.0.tgz",
      "integrity": "sha512-XI5MPzVNApjAyhQzphX8BkmKsKUxD4LdyK24iZeQGinBN9yTQT3bFlCBy/aVx2HrNcqQGsdot8ghrjyrvMCoEA=="
    },
    "leven": {
      "version": "3.1.0",
      "resolved": "https://registry.npmjs.org/leven/-/leven-3.1.0.tgz",
      "integrity": "sha512-qsda+H8jTaUaN/x5vzW2rzc+8Rw4TAQ/4KjB46IwK5VH+IlVeeeje/EoZRpiXvIqjFgK84QffqPztGI3VBLG1A=="
    },
    "levn": {
      "version": "0.3.0",
      "resolved": "https://registry.npmjs.org/levn/-/levn-0.3.0.tgz",
      "integrity": "sha1-OwmSTt+fCDwEkP3UwLxEIeBHZO4=",
      "requires": {
        "prelude-ls": "~1.1.2",
        "type-check": "~0.3.2"
      }
    },
    "load-json-file": {
      "version": "2.0.0",
      "resolved": "https://registry.npmjs.org/load-json-file/-/load-json-file-2.0.0.tgz",
      "integrity": "sha1-eUfkIUmvgNaWy/eXvKq8/h/inKg=",
      "requires": {
        "graceful-fs": "^4.1.2",
        "parse-json": "^2.2.0",
        "pify": "^2.0.0",
        "strip-bom": "^3.0.0"
      }
    },
    "loader-fs-cache": {
      "version": "1.0.2",
      "resolved": "https://registry.npmjs.org/loader-fs-cache/-/loader-fs-cache-1.0.2.tgz",
      "integrity": "sha512-70IzT/0/L+M20jUlEqZhZyArTU6VKLRTYRDAYN26g4jfzpJqjipLL3/hgYpySqI9PwsVRHHFja0LfEmsx9X2Cw==",
      "requires": {
        "find-cache-dir": "^0.1.1",
        "mkdirp": "0.5.1"
      },
      "dependencies": {
        "find-cache-dir": {
          "version": "0.1.1",
          "resolved": "https://registry.npmjs.org/find-cache-dir/-/find-cache-dir-0.1.1.tgz",
          "integrity": "sha1-yN765XyKUqinhPnjHFfHQumToLk=",
          "requires": {
            "commondir": "^1.0.1",
            "mkdirp": "^0.5.1",
            "pkg-dir": "^1.0.0"
          }
        },
        "find-up": {
          "version": "1.1.2",
          "resolved": "https://registry.npmjs.org/find-up/-/find-up-1.1.2.tgz",
          "integrity": "sha1-ay6YIrGizgpgq2TWEOzK1TyyTQ8=",
          "requires": {
            "path-exists": "^2.0.0",
            "pinkie-promise": "^2.0.0"
          }
        },
        "path-exists": {
          "version": "2.1.0",
          "resolved": "https://registry.npmjs.org/path-exists/-/path-exists-2.1.0.tgz",
          "integrity": "sha1-D+tsZPD8UY2adU3V77YscCJ2H0s=",
          "requires": {
            "pinkie-promise": "^2.0.0"
          }
        },
        "pkg-dir": {
          "version": "1.0.0",
          "resolved": "https://registry.npmjs.org/pkg-dir/-/pkg-dir-1.0.0.tgz",
          "integrity": "sha1-ektQio1bstYp1EcFb/TpyTFM89Q=",
          "requires": {
            "find-up": "^1.0.0"
          }
        }
      }
    },
    "loader-runner": {
      "version": "2.4.0",
      "resolved": "https://registry.npmjs.org/loader-runner/-/loader-runner-2.4.0.tgz",
      "integrity": "sha512-Jsmr89RcXGIwivFY21FcRrisYZfvLMTWx5kOLc+JTxtpBOG6xML0vzbc6SEQG2FO9/4Fc3wW4LVcB5DmGflaRw=="
    },
    "loader-utils": {
      "version": "1.2.3",
      "resolved": "https://registry.npmjs.org/loader-utils/-/loader-utils-1.2.3.tgz",
      "integrity": "sha512-fkpz8ejdnEMG3s37wGL07iSBDg99O9D5yflE9RGNH3hRdx9SOwYfnGYdZOUIZitN8E+E2vkq3MUMYMvPYl5ZZA==",
      "requires": {
        "big.js": "^5.2.2",
        "emojis-list": "^2.0.0",
        "json5": "^1.0.1"
      },
      "dependencies": {
        "json5": {
          "version": "1.0.1",
          "resolved": "https://registry.npmjs.org/json5/-/json5-1.0.1.tgz",
          "integrity": "sha512-aKS4WQjPenRxiQsC93MNfjx+nbF4PAdYzmd/1JIj8HYzqfbu86beTuNgXDzPknWk0n0uARlyewZo4s++ES36Ow==",
          "requires": {
            "minimist": "^1.2.0"
          }
        },
        "minimist": {
          "version": "1.2.0",
          "resolved": "https://registry.npmjs.org/minimist/-/minimist-1.2.0.tgz",
          "integrity": "sha1-o1AIsg9BOD7sH7kU9M1d95omQoQ="
        }
      }
    },
    "locate-path": {
      "version": "2.0.0",
      "resolved": "https://registry.npmjs.org/locate-path/-/locate-path-2.0.0.tgz",
      "integrity": "sha1-K1aLJl7slExtnA3pw9u7ygNUzY4=",
      "requires": {
        "p-locate": "^2.0.0",
        "path-exists": "^3.0.0"
      }
    },
    "lodash": {
      "version": "4.17.15",
      "resolved": "https://registry.npmjs.org/lodash/-/lodash-4.17.15.tgz",
      "integrity": "sha512-8xOcRHvCjnocdS5cpwXQXVzmmh5e5+saE2QGoeQmbKmRS6J3VQppPOIt0MnmE+4xlZoumy0GPG0D0MVIQbNA1A=="
    },
    "lodash._isnative": {
      "version": "2.4.1",
      "resolved": "https://registry.npmjs.org/lodash._isnative/-/lodash._isnative-2.4.1.tgz",
      "integrity": "sha1-PqZAS3hKe+g2x7V1gOHN95sUgyw="
    },
    "lodash._objecttypes": {
      "version": "2.4.1",
      "resolved": "https://registry.npmjs.org/lodash._objecttypes/-/lodash._objecttypes-2.4.1.tgz",
      "integrity": "sha1-fAt/admKH3ZSn4kLDNsbTf7BHBE="
    },
    "lodash._reinterpolate": {
      "version": "3.0.0",
      "resolved": "https://registry.npmjs.org/lodash._reinterpolate/-/lodash._reinterpolate-3.0.0.tgz",
      "integrity": "sha1-DM8tiRZq8Ds2Y8eWU4t1rG4RTZ0="
    },
    "lodash._shimkeys": {
      "version": "2.4.1",
      "resolved": "https://registry.npmjs.org/lodash._shimkeys/-/lodash._shimkeys-2.4.1.tgz",
      "integrity": "sha1-bpzJZm/wgfC1psl4uD4kLmlJ0gM=",
      "requires": {
        "lodash._objecttypes": "~2.4.1"
      }
    },
    "lodash.camelcase": {
      "version": "4.3.0",
      "resolved": "https://registry.npmjs.org/lodash.camelcase/-/lodash.camelcase-4.3.0.tgz",
      "integrity": "sha1-soqmKIorn8ZRA1x3EfZathkDMaY="
    },
    "lodash.clone": {
      "version": "4.5.0",
      "resolved": "https://registry.npmjs.org/lodash.clone/-/lodash.clone-4.5.0.tgz",
      "integrity": "sha1-GVhwRQ9aExkkeN9Lw9I9LeoZB7Y="
    },
    "lodash.cond": {
      "version": "4.5.2",
      "resolved": "https://registry.npmjs.org/lodash.cond/-/lodash.cond-4.5.2.tgz",
      "integrity": "sha1-9HGh2khr5g9quVXRcRVSPdHSVdU="
    },
    "lodash.includes": {
      "version": "4.3.0",
      "resolved": "https://registry.npmjs.org/lodash.includes/-/lodash.includes-4.3.0.tgz",
      "integrity": "sha1-YLuYqHy5I8aMoeUTJUgzFISfVT8="
    },
    "lodash.isarguments": {
      "version": "3.1.0",
      "resolved": "https://registry.npmjs.org/lodash.isarguments/-/lodash.isarguments-3.1.0.tgz",
      "integrity": "sha1-L1c9hcaiQon/AGY7SRwdM4/zRYo="
    },
    "lodash.isboolean": {
      "version": "3.0.3",
      "resolved": "https://registry.npmjs.org/lodash.isboolean/-/lodash.isboolean-3.0.3.tgz",
      "integrity": "sha1-bC4XHbKiV82WgC/UOwGyDV9YcPY="
    },
    "lodash.isinteger": {
      "version": "4.0.4",
      "resolved": "https://registry.npmjs.org/lodash.isinteger/-/lodash.isinteger-4.0.4.tgz",
      "integrity": "sha1-YZwK89A/iwTDH1iChAt3sRzWg0M="
    },
    "lodash.isnumber": {
      "version": "3.0.3",
      "resolved": "https://registry.npmjs.org/lodash.isnumber/-/lodash.isnumber-3.0.3.tgz",
      "integrity": "sha1-POdoEMWSjQM1IwGsKHMX8RwLH/w="
    },
    "lodash.isobject": {
      "version": "2.4.1",
      "resolved": "https://registry.npmjs.org/lodash.isobject/-/lodash.isobject-2.4.1.tgz",
      "integrity": "sha1-Wi5H/mmVPx7mMafrof5k0tBlWPU=",
      "requires": {
        "lodash._objecttypes": "~2.4.1"
      }
    },
    "lodash.isplainobject": {
      "version": "4.0.6",
      "resolved": "https://registry.npmjs.org/lodash.isplainobject/-/lodash.isplainobject-4.0.6.tgz",
      "integrity": "sha1-fFJqUtibRcRcxpC4gWO+BJf1UMs="
    },
    "lodash.isstring": {
      "version": "4.0.1",
      "resolved": "https://registry.npmjs.org/lodash.isstring/-/lodash.isstring-4.0.1.tgz",
      "integrity": "sha1-1SfftUVuynzJu5XV2ur4i6VKVFE="
    },
    "lodash.keys": {
      "version": "2.4.1",
      "resolved": "https://registry.npmjs.org/lodash.keys/-/lodash.keys-2.4.1.tgz",
      "integrity": "sha1-SN6kbfj/djKxDXBrissmWR4rNyc=",
      "requires": {
        "lodash._isnative": "~2.4.1",
        "lodash._shimkeys": "~2.4.1",
        "lodash.isobject": "~2.4.1"
      }
    },
    "lodash.memoize": {
      "version": "4.1.2",
      "resolved": "https://registry.npmjs.org/lodash.memoize/-/lodash.memoize-4.1.2.tgz",
      "integrity": "sha1-vMbEmkKihA7Zl/Mj6tpezRguC/4="
    },
    "lodash.noop": {
      "version": "3.0.1",
      "resolved": "https://registry.npmjs.org/lodash.noop/-/lodash.noop-3.0.1.tgz",
      "integrity": "sha1-OBiPTWUKOkdCWEObluxFsyYXEzw="
    },
    "lodash.once": {
      "version": "4.1.1",
      "resolved": "https://registry.npmjs.org/lodash.once/-/lodash.once-4.1.1.tgz",
      "integrity": "sha1-DdOXEhPHxW34gJd9UEyI+0cal6w="
    },
    "lodash.sortby": {
      "version": "4.7.0",
      "resolved": "https://registry.npmjs.org/lodash.sortby/-/lodash.sortby-4.7.0.tgz",
      "integrity": "sha1-7dFMgk4sycHgsKG0K7UhBRakJDg="
    },
    "lodash.tail": {
      "version": "4.1.1",
      "resolved": "https://registry.npmjs.org/lodash.tail/-/lodash.tail-4.1.1.tgz",
      "integrity": "sha1-0jM6NtnncXyK0vfKyv7HwytERmQ="
    },
    "lodash.template": {
      "version": "4.5.0",
      "resolved": "https://registry.npmjs.org/lodash.template/-/lodash.template-4.5.0.tgz",
      "integrity": "sha512-84vYFxIkmidUiFxidA/KjjH9pAycqW+h980j7Fuz5qxRtO9pgB7MDFTdys1N7A5mcucRiDyEq4fusljItR1T/A==",
      "requires": {
        "lodash._reinterpolate": "^3.0.0",
        "lodash.templatesettings": "^4.0.0"
      }
    },
    "lodash.templatesettings": {
      "version": "4.2.0",
      "resolved": "https://registry.npmjs.org/lodash.templatesettings/-/lodash.templatesettings-4.2.0.tgz",
      "integrity": "sha512-stgLz+i3Aa9mZgnjr/O+v9ruKZsPsndy7qPZOchbqk2cnTU1ZaldKK+v7m54WoKIyxiuMZTKT2H81F8BeAc3ZQ==",
      "requires": {
        "lodash._reinterpolate": "^3.0.0"
      }
    },
    "lodash.unescape": {
      "version": "4.0.1",
      "resolved": "https://registry.npmjs.org/lodash.unescape/-/lodash.unescape-4.0.1.tgz",
      "integrity": "sha1-vyJJiGzlFM2hEvrpIYzcBlIR/Jw="
    },
    "lodash.uniq": {
      "version": "4.5.0",
      "resolved": "https://registry.npmjs.org/lodash.uniq/-/lodash.uniq-4.5.0.tgz",
      "integrity": "sha1-0CJTc662Uq3BvILklFM5qEJ1R3M="
    },
    "lodash.values": {
      "version": "2.4.1",
      "resolved": "https://registry.npmjs.org/lodash.values/-/lodash.values-2.4.1.tgz",
      "integrity": "sha1-q/UUQ2s8twUAFieXjLzzCxKA7qQ=",
      "requires": {
        "lodash.keys": "~2.4.1"
      }
    },
    "loglevel": {
      "version": "1.6.3",
      "resolved": "https://registry.npmjs.org/loglevel/-/loglevel-1.6.3.tgz",
      "integrity": "sha512-LoEDv5pgpvWgPF4kNYuIp0qqSJVWak/dML0RY74xlzMZiT9w77teNAwKYKWBTYjlokMirg+o3jBwp+vlLrcfAA=="
    },
    "long": {
      "version": "4.0.0",
      "resolved": "https://registry.npmjs.org/long/-/long-4.0.0.tgz",
      "integrity": "sha512-XsP+KhQif4bjX1kbuSiySJFNAehNxgLb6hPRGJ9QsUr8ajHkuXGdrHmFUTUUXhDwVX2R5bY4JNZEwbUiMhV+MA=="
    },
    "loose-envify": {
      "version": "1.4.0",
      "resolved": "https://registry.npmjs.org/loose-envify/-/loose-envify-1.4.0.tgz",
      "integrity": "sha512-lyuxPGr/Wfhrlem2CL/UcnUc1zcqKAImBDzukY7Y5F/yQiNdko6+fRLevlw1HgMySw7f611UIY408EtxRSoK3Q==",
      "requires": {
        "js-tokens": "^3.0.0 || ^4.0.0"
      }
    },
    "lower-case": {
      "version": "1.1.4",
      "resolved": "https://registry.npmjs.org/lower-case/-/lower-case-1.1.4.tgz",
      "integrity": "sha1-miyr0bno4K6ZOkv31YdcOcQujqw="
    },
    "lowercase-keys": {
      "version": "1.0.1",
      "resolved": "https://registry.npmjs.org/lowercase-keys/-/lowercase-keys-1.0.1.tgz",
      "integrity": "sha512-G2Lj61tXDnVFFOi8VZds+SoQjtQC3dgokKdDG2mTm1tx4m50NUHBOZSBwQQHyy0V12A0JTG4icfZQH+xPyh8VA=="
    },
    "lru-cache": {
      "version": "4.1.5",
      "resolved": "https://registry.npmjs.org/lru-cache/-/lru-cache-4.1.5.tgz",
      "integrity": "sha512-sWZlbEP2OsHNkXrMl5GYk/jKk70MBng6UU4YI/qGDYbgf6YbP4EvmqISbXCoJiRKs+1bSpFHVgQxvJ17F2li5g==",
      "requires": {
        "pseudomap": "^1.0.2",
        "yallist": "^2.1.2"
      }
    },
    "lru-queue": {
      "version": "0.1.0",
      "resolved": "https://registry.npmjs.org/lru-queue/-/lru-queue-0.1.0.tgz",
      "integrity": "sha1-Jzi9nw089PhEkMVzbEhpmsYyzaM=",
      "requires": {
        "es5-ext": "~0.10.2"
      }
    },
    "make-dir": {
      "version": "1.3.0",
      "resolved": "https://registry.npmjs.org/make-dir/-/make-dir-1.3.0.tgz",
      "integrity": "sha512-2w31R7SJtieJJnQtGc7RVL2StM2vGYVfqUOvUDxH6bC6aJTxPxTF0GnIgCyu7tjockiUWAYQRbxa7vKn34s5sQ==",
      "requires": {
        "pify": "^3.0.0"
      },
      "dependencies": {
        "pify": {
          "version": "3.0.0",
          "resolved": "https://registry.npmjs.org/pify/-/pify-3.0.0.tgz",
          "integrity": "sha1-5aSs0sEB/fPZpNB/DbxNtJ3SgXY="
        }
      }
    },
    "makeerror": {
      "version": "1.0.11",
      "resolved": "https://registry.npmjs.org/makeerror/-/makeerror-1.0.11.tgz",
      "integrity": "sha1-4BpckQnyr3lmDk6LlYd5AYT1qWw=",
      "requires": {
        "tmpl": "1.0.x"
      }
    },
    "mamacro": {
      "version": "0.0.3",
      "resolved": "https://registry.npmjs.org/mamacro/-/mamacro-0.0.3.tgz",
      "integrity": "sha512-qMEwh+UujcQ+kbz3T6V+wAmO2U8veoq2w+3wY8MquqwVA3jChfwY+Tk52GZKDfACEPjuZ7r2oJLejwpt8jtwTA=="
    },
    "map-age-cleaner": {
      "version": "0.1.3",
      "resolved": "https://registry.npmjs.org/map-age-cleaner/-/map-age-cleaner-0.1.3.tgz",
      "integrity": "sha512-bJzx6nMoP6PDLPBFmg7+xRKeFZvFboMrGlxmNj9ClvX53KrmvM5bXFXEWjbz4cz1AFn+jWJ9z/DJSz7hrs0w3w==",
      "requires": {
        "p-defer": "^1.0.0"
      }
    },
    "map-cache": {
      "version": "0.2.2",
      "resolved": "https://registry.npmjs.org/map-cache/-/map-cache-0.2.2.tgz",
      "integrity": "sha1-wyq9C9ZSXZsFFkW7TyasXcmKDb8="
    },
    "map-visit": {
      "version": "1.0.0",
      "resolved": "https://registry.npmjs.org/map-visit/-/map-visit-1.0.0.tgz",
      "integrity": "sha1-7Nyo8TFE5mDxtb1B8S80edmN+48=",
      "requires": {
        "object-visit": "^1.0.0"
      }
    },
    "md5.js": {
      "version": "1.3.5",
      "resolved": "https://registry.npmjs.org/md5.js/-/md5.js-1.3.5.tgz",
      "integrity": "sha512-xitP+WxNPcTTOgnTJcrhM0xvdPepipPSf3I8EIpGKeFLjt3PlJLIDG3u8EX53ZIubkb+5U2+3rELYpEhHhzdkg==",
      "requires": {
        "hash-base": "^3.0.0",
        "inherits": "^2.0.1",
        "safe-buffer": "^5.1.2"
      }
    },
    "mdn-data": {
      "version": "2.0.4",
      "resolved": "https://registry.npmjs.org/mdn-data/-/mdn-data-2.0.4.tgz",
      "integrity": "sha512-iV3XNKw06j5Q7mi6h+9vbx23Tv7JkjEVgKHW4pimwyDGWm0OIQntJJ+u1C6mg6mK1EaTv42XQ7w76yuzH7M2cA=="
    },
    "media-typer": {
      "version": "0.3.0",
      "resolved": "https://registry.npmjs.org/media-typer/-/media-typer-0.3.0.tgz",
      "integrity": "sha1-hxDXrwqmJvj/+hzgAWhUUmMlV0g="
    },
    "mem": {
      "version": "4.3.0",
      "resolved": "https://registry.npmjs.org/mem/-/mem-4.3.0.tgz",
      "integrity": "sha512-qX2bG48pTqYRVmDB37rn/6PT7LcR8T7oAX3bf99u1Tt1nzxYfxkgqDwUwolPlXweM0XzBOBFzSx4kfp7KP1s/w==",
      "requires": {
        "map-age-cleaner": "^0.1.1",
        "mimic-fn": "^2.0.0",
        "p-is-promise": "^2.0.0"
      },
      "dependencies": {
        "mimic-fn": {
          "version": "2.1.0",
          "resolved": "https://registry.npmjs.org/mimic-fn/-/mimic-fn-2.1.0.tgz",
          "integrity": "sha512-OqbOk5oEQeAZ8WXWydlu9HJjz9WVdEIvamMCcXmuqUYjTknH/sqsWvhQ3vgwKFRR1HpjvNBKQ37nbJgYzGqGcg=="
        }
      }
    },
    "memoizee": {
      "version": "0.4.14",
      "resolved": "https://registry.npmjs.org/memoizee/-/memoizee-0.4.14.tgz",
      "integrity": "sha512-/SWFvWegAIYAO4NQMpcX+gcra0yEZu4OntmUdrBaWrJncxOqAziGFlHxc7yjKVK2uu3lpPW27P27wkR82wA8mg==",
      "requires": {
        "d": "1",
        "es5-ext": "^0.10.45",
        "es6-weak-map": "^2.0.2",
        "event-emitter": "^0.3.5",
        "is-promise": "^2.1",
        "lru-queue": "0.1",
        "next-tick": "1",
        "timers-ext": "^0.1.5"
      }
    },
    "memory-fs": {
      "version": "0.4.1",
      "resolved": "https://registry.npmjs.org/memory-fs/-/memory-fs-0.4.1.tgz",
      "integrity": "sha1-OpoguEYlI+RHz7x+i7gO1me/xVI=",
      "requires": {
        "errno": "^0.1.3",
        "readable-stream": "^2.0.1"
      }
    },
    "merge-deep": {
      "version": "3.0.2",
      "resolved": "https://registry.npmjs.org/merge-deep/-/merge-deep-3.0.2.tgz",
      "integrity": "sha512-T7qC8kg4Zoti1cFd8Cr0M+qaZfOwjlPDEdZIIPPB2JZctjaPM4fX+i7HOId69tAti2fvO6X5ldfYUONDODsrkA==",
      "requires": {
        "arr-union": "^3.1.0",
        "clone-deep": "^0.2.4",
        "kind-of": "^3.0.2"
      },
      "dependencies": {
        "kind-of": {
          "version": "3.2.2",
          "resolved": "https://registry.npmjs.org/kind-of/-/kind-of-3.2.2.tgz",
          "integrity": "sha1-MeohpzS6ubuw8yRm2JOupR5KPGQ=",
          "requires": {
            "is-buffer": "^1.1.5"
          }
        }
      }
    },
    "merge-descriptors": {
      "version": "1.0.1",
      "resolved": "https://registry.npmjs.org/merge-descriptors/-/merge-descriptors-1.0.1.tgz",
      "integrity": "sha1-sAqqVW3YtEVoFQ7J0blT8/kMu2E="
    },
    "merge-stream": {
      "version": "2.0.0",
      "resolved": "https://registry.npmjs.org/merge-stream/-/merge-stream-2.0.0.tgz",
      "integrity": "sha512-abv/qOcuPfk3URPfDzmZU1LKmuw8kT+0nIHvKrKgFrwifol/doWcdA4ZqsWQ8ENrFKkd67Mfpo/LovbIUsbt3w=="
    },
    "merge2": {
      "version": "1.2.4",
      "resolved": "https://registry.npmjs.org/merge2/-/merge2-1.2.4.tgz",
      "integrity": "sha512-FYE8xI+6pjFOhokZu0We3S5NKCirLbCzSh2Usf3qEyr4X8U+0jNg9P8RZ4qz+V2UoECLVwSyzU3LxXBaLGtD3A=="
    },
    "methods": {
      "version": "1.1.2",
      "resolved": "https://registry.npmjs.org/methods/-/methods-1.1.2.tgz",
      "integrity": "sha1-VSmk1nZUE07cxSZmVoNbD4Ua/O4="
    },
    "microevent.ts": {
      "version": "0.1.1",
      "resolved": "https://registry.npmjs.org/microevent.ts/-/microevent.ts-0.1.1.tgz",
      "integrity": "sha512-jo1OfR4TaEwd5HOrt5+tAZ9mqT4jmpNAusXtyfNzqVm9uiSYFZlKM1wYL4oU7azZW/PxQW53wM0S6OR1JHNa2g=="
    },
    "micromatch": {
      "version": "3.1.10",
      "resolved": "https://registry.npmjs.org/micromatch/-/micromatch-3.1.10.tgz",
      "integrity": "sha512-MWikgl9n9M3w+bpsY3He8L+w9eF9338xRl8IAO5viDizwSzziFEyUzo2xrrloB64ADbTf8uA8vRqqttDTOmccg==",
      "requires": {
        "arr-diff": "^4.0.0",
        "array-unique": "^0.3.2",
        "braces": "^2.3.1",
        "define-property": "^2.0.2",
        "extend-shallow": "^3.0.2",
        "extglob": "^2.0.4",
        "fragment-cache": "^0.2.1",
        "kind-of": "^6.0.2",
        "nanomatch": "^1.2.9",
        "object.pick": "^1.3.0",
        "regex-not": "^1.0.0",
        "snapdragon": "^0.8.1",
        "to-regex": "^3.0.2"
      }
    },
    "miller-rabin": {
      "version": "4.0.1",
      "resolved": "https://registry.npmjs.org/miller-rabin/-/miller-rabin-4.0.1.tgz",
      "integrity": "sha512-115fLhvZVqWwHPbClyntxEVfVDfl9DLLTuJvq3g2O/Oxi8AiNouAHvDSzHS0viUJc+V5vm3eq91Xwqn9dp4jRA==",
      "requires": {
        "bn.js": "^4.0.0",
        "brorand": "^1.0.1"
      }
    },
    "mime": {
      "version": "1.6.0",
      "resolved": "https://registry.npmjs.org/mime/-/mime-1.6.0.tgz",
      "integrity": "sha512-x0Vn8spI+wuJ1O6S7gnbaQg8Pxh4NNHb7KSINmEWKiPE4RKOplvijn+NkmYmmRgP68mc70j2EbeTFRsrswaQeg=="
    },
    "mime-db": {
      "version": "1.40.0",
      "resolved": "https://registry.npmjs.org/mime-db/-/mime-db-1.40.0.tgz",
      "integrity": "sha512-jYdeOMPy9vnxEqFRRo6ZvTZ8d9oPb+k18PKoYNYUe2stVEBPPwsln/qWzdbmaIvnhZ9v2P+CuecK+fpUfsV2mA=="
    },
    "mime-types": {
      "version": "2.1.24",
      "resolved": "https://registry.npmjs.org/mime-types/-/mime-types-2.1.24.tgz",
      "integrity": "sha512-WaFHS3MCl5fapm3oLxU4eYDw77IQM2ACcxQ9RIxfaC3ooc6PFuBMGZZsYpvoXS5D5QTWPieo1jjLdAm3TBP3cQ==",
      "requires": {
        "mime-db": "1.40.0"
      }
    },
    "mimic-fn": {
      "version": "1.2.0",
      "resolved": "https://registry.npmjs.org/mimic-fn/-/mimic-fn-1.2.0.tgz",
      "integrity": "sha512-jf84uxzwiuiIVKiOLpfYk7N46TSy8ubTonmneY9vrpHNAnp0QBt2BxWV9dO3/j+BoVAb+a5G6YDPW3M5HOdMWQ=="
    },
    "min-document": {
      "version": "2.19.0",
      "resolved": "https://registry.npmjs.org/min-document/-/min-document-2.19.0.tgz",
      "integrity": "sha1-e9KC4/WELtKVu3SM3Z8f+iyCRoU=",
      "requires": {
        "dom-walk": "^0.1.0"
      }
    },
    "mini-create-react-context": {
      "version": "0.3.2",
      "resolved": "https://registry.npmjs.org/mini-create-react-context/-/mini-create-react-context-0.3.2.tgz",
      "integrity": "sha512-2v+OeetEyliMt5VHMXsBhABoJ0/M4RCe7fatd/fBy6SMiKazUSEt3gxxypfnk2SHMkdBYvorHRoQxuGoiwbzAw==",
      "requires": {
        "@babel/runtime": "^7.4.0",
        "gud": "^1.0.0",
        "tiny-warning": "^1.0.2"
      }
    },
    "mini-css-extract-plugin": {
      "version": "0.5.0",
      "resolved": "https://registry.npmjs.org/mini-css-extract-plugin/-/mini-css-extract-plugin-0.5.0.tgz",
      "integrity": "sha512-IuaLjruM0vMKhUUT51fQdQzBYTX49dLj8w68ALEAe2A4iYNpIC4eMac67mt3NzycvjOlf07/kYxJDc0RTl1Wqw==",
      "requires": {
        "loader-utils": "^1.1.0",
        "schema-utils": "^1.0.0",
        "webpack-sources": "^1.1.0"
      }
    },
    "minimalistic-assert": {
      "version": "1.0.1",
      "resolved": "https://registry.npmjs.org/minimalistic-assert/-/minimalistic-assert-1.0.1.tgz",
      "integrity": "sha512-UtJcAD4yEaGtjPezWuO9wC4nwUnVH/8/Im3yEHQP4b67cXlD/Qr9hdITCU1xDbSEXg2XKNaP8jsReV7vQd00/A=="
    },
    "minimalistic-crypto-utils": {
      "version": "1.0.1",
      "resolved": "https://registry.npmjs.org/minimalistic-crypto-utils/-/minimalistic-crypto-utils-1.0.1.tgz",
      "integrity": "sha1-9sAMHAsIIkblxNmd+4x8CDsrWCo="
    },
    "minimatch": {
      "version": "3.0.4",
      "resolved": "https://registry.npmjs.org/minimatch/-/minimatch-3.0.4.tgz",
      "integrity": "sha512-yJHVQEhyqPLUTgt9B83PXu6W3rx4MvvHvSUvToogpwoGDOUQ+yDrR0HRot+yOCdCO7u4hX3pWft6kWBBcqh0UA==",
      "requires": {
        "brace-expansion": "^1.1.7"
      }
    },
    "minimist": {
      "version": "0.0.8",
      "resolved": "https://registry.npmjs.org/minimist/-/minimist-0.0.8.tgz",
      "integrity": "sha1-hX/Kv8M5fSYluCKCYuhqp6ARsF0="
    },
    "minipass": {
      "version": "2.3.5",
      "resolved": "https://registry.npmjs.org/minipass/-/minipass-2.3.5.tgz",
      "integrity": "sha512-Gi1W4k059gyRbyVUZQ4mEqLm0YIUiGYfvxhF6SIlk3ui1WVxMTGfGdQ2SInh3PDrRTVvPKgULkpJtT4RH10+VA==",
      "requires": {
        "safe-buffer": "^5.1.2",
        "yallist": "^3.0.0"
      },
      "dependencies": {
        "yallist": {
          "version": "3.0.3",
          "resolved": "https://registry.npmjs.org/yallist/-/yallist-3.0.3.tgz",
          "integrity": "sha512-S+Zk8DEWE6oKpV+vI3qWkaK+jSbIK86pCwe2IF/xwIpQ8jEuxpw9NyaGjmp9+BoJv5FV2piqCDcoCtStppiq2A=="
        }
      }
    },
    "minizlib": {
      "version": "1.2.1",
      "resolved": "https://registry.npmjs.org/minizlib/-/minizlib-1.2.1.tgz",
      "integrity": "sha512-7+4oTUOWKg7AuL3vloEWekXY2/D20cevzsrNT2kGWm+39J9hGTCBv8VI5Pm5lXZ/o3/mdR4f8rflAPhnQb8mPA==",
      "requires": {
        "minipass": "^2.2.1"
      }
    },
    "mississippi": {
      "version": "3.0.0",
      "resolved": "https://registry.npmjs.org/mississippi/-/mississippi-3.0.0.tgz",
      "integrity": "sha512-x471SsVjUtBRtcvd4BzKE9kFC+/2TeWgKCgw0bZcw1b9l2X3QX5vCWgF+KaZaYm87Ss//rHnWryupDrgLvmSkA==",
      "requires": {
        "concat-stream": "^1.5.0",
        "duplexify": "^3.4.2",
        "end-of-stream": "^1.1.0",
        "flush-write-stream": "^1.0.0",
        "from2": "^2.1.0",
        "parallel-transform": "^1.1.0",
        "pump": "^3.0.0",
        "pumpify": "^1.3.3",
        "stream-each": "^1.1.0",
        "through2": "^2.0.0"
      }
    },
    "mixin-deep": {
      "version": "1.3.2",
      "resolved": "https://registry.npmjs.org/mixin-deep/-/mixin-deep-1.3.2.tgz",
      "integrity": "sha512-WRoDn//mXBiJ1H40rqa3vH0toePwSsGb45iInWlTySa+Uu4k3tYUSxa2v1KqAiLtvlrSzaExqS1gtk96A9zvEA==",
      "requires": {
        "for-in": "^1.0.2",
        "is-extendable": "^1.0.1"
      },
      "dependencies": {
        "is-extendable": {
          "version": "1.0.1",
          "resolved": "https://registry.npmjs.org/is-extendable/-/is-extendable-1.0.1.tgz",
          "integrity": "sha512-arnXMxT1hhoKo9k1LZdmlNyJdDDfy2v0fXjFlmok4+i8ul/6WlbVge9bhM74OpNPQPMGUToDtz+KXa1PneJxOA==",
          "requires": {
            "is-plain-object": "^2.0.4"
          }
        }
      }
    },
    "mixin-object": {
      "version": "2.0.1",
      "resolved": "https://registry.npmjs.org/mixin-object/-/mixin-object-2.0.1.tgz",
      "integrity": "sha1-T7lJRB2rGCVA8f4DW6YOGUel5X4=",
      "requires": {
        "for-in": "^0.1.3",
        "is-extendable": "^0.1.1"
      },
      "dependencies": {
        "for-in": {
          "version": "0.1.8",
          "resolved": "https://registry.npmjs.org/for-in/-/for-in-0.1.8.tgz",
          "integrity": "sha1-2Hc5COMSVhCZUrH9ubP6hn0ndeE="
        }
      }
    },
    "mkdirp": {
      "version": "0.5.1",
      "resolved": "https://registry.npmjs.org/mkdirp/-/mkdirp-0.5.1.tgz",
      "integrity": "sha1-MAV0OOrGz3+MR2fzhkjWaX11yQM=",
      "requires": {
        "minimist": "0.0.8"
      }
    },
    "morgan": {
      "version": "1.9.1",
      "resolved": "https://registry.npmjs.org/morgan/-/morgan-1.9.1.tgz",
      "integrity": "sha512-HQStPIV4y3afTiCYVxirakhlCfGkI161c76kKFca7Fk1JusM//Qeo1ej2XaMniiNeaZklMVrh3vTtIzpzwbpmA==",
      "requires": {
        "basic-auth": "~2.0.0",
        "debug": "2.6.9",
        "depd": "~1.1.2",
        "on-finished": "~2.3.0",
        "on-headers": "~1.0.1"
      }
    },
    "move-concurrently": {
      "version": "1.0.1",
      "resolved": "https://registry.npmjs.org/move-concurrently/-/move-concurrently-1.0.1.tgz",
      "integrity": "sha1-viwAX9oy4LKa8fBdfEszIUxwH5I=",
      "requires": {
        "aproba": "^1.1.1",
        "copy-concurrently": "^1.0.0",
        "fs-write-stream-atomic": "^1.0.8",
        "mkdirp": "^0.5.1",
        "rimraf": "^2.5.4",
        "run-queue": "^1.0.3"
      }
    },
    "ms": {
      "version": "2.0.0",
      "resolved": "https://registry.npmjs.org/ms/-/ms-2.0.0.tgz",
      "integrity": "sha1-VgiurfwAvmwpAd9fmGF4jeDVl8g="
    },
    "multicast-dns": {
      "version": "6.2.3",
      "resolved": "https://registry.npmjs.org/multicast-dns/-/multicast-dns-6.2.3.tgz",
      "integrity": "sha512-ji6J5enbMyGRHIAkAOu3WdV8nggqviKCEKtXcOqfphZZtQrmHKycfynJ2V7eVPUA4NhJ6V7Wf4TmGbTwKE9B6g==",
      "requires": {
        "dns-packet": "^1.3.1",
        "thunky": "^1.0.2"
      }
    },
    "multicast-dns-service-types": {
      "version": "1.1.0",
      "resolved": "https://registry.npmjs.org/multicast-dns-service-types/-/multicast-dns-service-types-1.1.0.tgz",
      "integrity": "sha1-iZ8R2WhuXgXLkbNdXw5jt3PPyQE="
    },
    "mute-stream": {
      "version": "0.0.7",
      "resolved": "https://registry.npmjs.org/mute-stream/-/mute-stream-0.0.7.tgz",
      "integrity": "sha1-MHXOk7whuPq0PhvE2n6BFe0ee6s="
    },
    "nan": {
      "version": "2.14.0",
      "resolved": "https://registry.npmjs.org/nan/-/nan-2.14.0.tgz",
      "integrity": "sha512-INOFj37C7k3AfaNTtX8RhsTw7qRy7eLET14cROi9+5HAVbbHuIWUHEauBv5qT4Av2tWasiTY1Jw6puUNqRJXQg=="
    },
    "nanomatch": {
      "version": "1.2.13",
      "resolved": "https://registry.npmjs.org/nanomatch/-/nanomatch-1.2.13.tgz",
      "integrity": "sha512-fpoe2T0RbHwBTBUOftAfBPaDEi06ufaUai0mE6Yn1kacc3SnTErfb/h+X94VXzI64rKFHYImXSvdwGGCmwOqCA==",
      "requires": {
        "arr-diff": "^4.0.0",
        "array-unique": "^0.3.2",
        "define-property": "^2.0.2",
        "extend-shallow": "^3.0.2",
        "fragment-cache": "^0.2.1",
        "is-windows": "^1.0.2",
        "kind-of": "^6.0.2",
        "object.pick": "^1.3.0",
        "regex-not": "^1.0.0",
        "snapdragon": "^0.8.1",
        "to-regex": "^3.0.1"
      }
    },
    "nash": {
      "version": "3.0.0",
      "resolved": "https://registry.npmjs.org/nash/-/nash-3.0.0.tgz",
      "integrity": "sha512-M5SahEycXUmko3zOvsBkF6p94CWLhnyy9hfpQ9Qzp+rQkQ8D1OaTlfTl1OBWktq9Fak3oDXKU+ev7tiMaMu+1w==",
      "requires": {
        "async": "^1.3.0",
        "flat-arguments": "^1.0.0",
        "lodash": "^4.17.5",
        "minimist": "^1.1.0"
      },
      "dependencies": {
        "async": {
          "version": "1.5.2",
          "resolved": "https://registry.npmjs.org/async/-/async-1.5.2.tgz",
          "integrity": "sha1-7GphrlZIDAw8skHJVhjiCJL5Zyo="
        },
        "minimist": {
          "version": "1.2.0",
          "resolved": "https://registry.npmjs.org/minimist/-/minimist-1.2.0.tgz",
          "integrity": "sha1-o1AIsg9BOD7sH7kU9M1d95omQoQ="
        }
      }
    },
    "natural-compare": {
      "version": "1.4.0",
      "resolved": "https://registry.npmjs.org/natural-compare/-/natural-compare-1.4.0.tgz",
      "integrity": "sha1-Sr6/7tdUHywnrPspvbvRXI1bpPc="
    },
    "negotiator": {
      "version": "0.6.2",
      "resolved": "https://registry.npmjs.org/negotiator/-/negotiator-0.6.2.tgz",
      "integrity": "sha512-hZXc7K2e+PgeI1eDBe/10Ard4ekbfrrqG8Ep+8Jmf4JID2bNg7NvCPOZN+kfF574pFQI7mum2AUqDidoKqcTOw=="
    },
    "neo-async": {
      "version": "2.6.1",
      "resolved": "https://registry.npmjs.org/neo-async/-/neo-async-2.6.1.tgz",
      "integrity": "sha512-iyam8fBuCUpWeKPGpaNMetEocMt364qkCsfL9JuhjXX6dRnguRVOfk2GZaDpPjcOKiiXCPINZC1GczQ7iTq3Zw=="
    },
    "next-tick": {
      "version": "1.0.0",
      "resolved": "https://registry.npmjs.org/next-tick/-/next-tick-1.0.0.tgz",
      "integrity": "sha1-yobR/ogoFpsBICCOPchCS524NCw="
    },
    "nice-try": {
      "version": "1.0.5",
      "resolved": "https://registry.npmjs.org/nice-try/-/nice-try-1.0.5.tgz",
      "integrity": "sha512-1nh45deeb5olNY7eX82BkPO7SSxR5SSYJiPTrTdFUVYwAl8CKMA5N9PjTYkHiRjisVcxcQ1HXdLhx2qxxJzLNQ=="
    },
    "no-case": {
      "version": "2.3.2",
      "resolved": "https://registry.npmjs.org/no-case/-/no-case-2.3.2.tgz",
      "integrity": "sha512-rmTZ9kz+f3rCvK2TD1Ue/oZlns7OGoIWP4fc3llxxRXlOkHKoWPPWJOfFYpITabSow43QJbRIoHQXtt10VldyQ==",
      "requires": {
        "lower-case": "^1.1.1"
      }
    },
    "node-fetch": {
      "version": "1.7.3",
      "resolved": "https://registry.npmjs.org/node-fetch/-/node-fetch-1.7.3.tgz",
      "integrity": "sha512-NhZ4CsKx7cYm2vSrBAr2PvFOe6sWDf0UYLRqA6svUYg7+/TSfVAu49jYC4BvQ4Sms9SZgdqGBgroqfDhJdTyKQ==",
      "requires": {
        "encoding": "^0.1.11",
        "is-stream": "^1.0.1"
      }
    },
    "node-forge": {
      "version": "0.7.6",
      "resolved": "https://registry.npmjs.org/node-forge/-/node-forge-0.7.6.tgz",
      "integrity": "sha512-sol30LUpz1jQFBjOKwbjxijiE3b6pjd74YwfD0fJOKPjF+fONKb2Yg8rYgS6+bK6VDl+/wfr4IYpC7jDzLUIfw=="
    },
    "node-int64": {
      "version": "0.4.0",
      "resolved": "https://registry.npmjs.org/node-int64/-/node-int64-0.4.0.tgz",
      "integrity": "sha1-h6kGXNs1XTGC2PlM4RGIuCXGijs="
    },
    "node-libs-browser": {
      "version": "2.2.1",
      "resolved": "https://registry.npmjs.org/node-libs-browser/-/node-libs-browser-2.2.1.tgz",
      "integrity": "sha512-h/zcD8H9kaDZ9ALUWwlBUDo6TKF8a7qBSCSEGfjTVIYeqsioSKaAX+BN7NgiMGp6iSIXZ3PxgCu8KS3b71YK5Q==",
      "requires": {
        "assert": "^1.1.1",
        "browserify-zlib": "^0.2.0",
        "buffer": "^4.3.0",
        "console-browserify": "^1.1.0",
        "constants-browserify": "^1.0.0",
        "crypto-browserify": "^3.11.0",
        "domain-browser": "^1.1.1",
        "events": "^3.0.0",
        "https-browserify": "^1.0.0",
        "os-browserify": "^0.3.0",
        "path-browserify": "0.0.1",
        "process": "^0.11.10",
        "punycode": "^1.2.4",
        "querystring-es3": "^0.2.0",
        "readable-stream": "^2.3.3",
        "stream-browserify": "^2.0.1",
        "stream-http": "^2.7.2",
        "string_decoder": "^1.0.0",
        "timers-browserify": "^2.0.4",
        "tty-browserify": "0.0.0",
        "url": "^0.11.0",
        "util": "^0.11.0",
        "vm-browserify": "^1.0.1"
      },
      "dependencies": {
        "buffer": {
          "version": "4.9.1",
          "resolved": "https://registry.npmjs.org/buffer/-/buffer-4.9.1.tgz",
          "integrity": "sha1-bRu2AbB6TvztlwlBMgkwJ8lbwpg=",
          "requires": {
            "base64-js": "^1.0.2",
            "ieee754": "^1.1.4",
            "isarray": "^1.0.0"
          }
        },
        "punycode": {
          "version": "1.4.1",
          "resolved": "https://registry.npmjs.org/punycode/-/punycode-1.4.1.tgz",
          "integrity": "sha1-wNWmOycYgArY4esPpSachN1BhF4="
        }
      }
    },
    "node-modules-regexp": {
      "version": "1.0.0",
      "resolved": "https://registry.npmjs.org/node-modules-regexp/-/node-modules-regexp-1.0.0.tgz",
      "integrity": "sha1-jZ2+KJZKSsVxLpExZCEHxx6Q7EA="
    },
    "node-notifier": {
      "version": "5.4.2",
      "resolved": "https://registry.npmjs.org/node-notifier/-/node-notifier-5.4.2.tgz",
      "integrity": "sha512-85nkTziazE2dR4pyoLxMwz0b9MmxFQPVXYs/WlWI7CPtBkARJOV+89khdNjpbclXIJDECQYnTvh1xuZV3WHkCA==",
      "requires": {
        "growly": "^1.3.0",
        "is-wsl": "^2.1.0",
        "semver": "^6.3.0",
        "shellwords": "^0.1.1",
        "which": "^1.3.1"
      },
      "dependencies": {
        "is-wsl": {
          "version": "2.1.0",
          "resolved": "https://registry.npmjs.org/is-wsl/-/is-wsl-2.1.0.tgz",
          "integrity": "sha512-pFTjpv/x5HRj8kbZ/Msxi9VrvtOMRBqaDi3OIcbwPI3OuH+r3lLxVWukLITBaOGJIbA/w2+M1eVmVa4XNQlAmQ=="
        },
        "semver": {
          "version": "6.3.0",
          "resolved": "https://registry.npmjs.org/semver/-/semver-6.3.0.tgz",
          "integrity": "sha512-b39TBaTSfV6yBrapU89p5fKekE2m/NwnDocOVruQFS1/veMgdzuPcnOM34M6CwxW8jH/lxEa5rBoDeUwu5HHTw=="
        }
      }
    },
    "node-releases": {
      "version": "1.1.27",
      "resolved": "https://registry.npmjs.org/node-releases/-/node-releases-1.1.27.tgz",
      "integrity": "sha512-9iXUqHKSGo6ph/tdXVbHFbhRVQln4ZDTIBJCzsa90HimnBYc5jw8RWYt4wBYFHehGyC3koIz5O4mb2fHrbPOuA==",
      "requires": {
        "semver": "^5.3.0"
      }
    },
    "normalize-package-data": {
      "version": "2.5.0",
      "resolved": "https://registry.npmjs.org/normalize-package-data/-/normalize-package-data-2.5.0.tgz",
      "integrity": "sha512-/5CMN3T0R4XTj4DcGaexo+roZSdSFW/0AOOTROrjxzCG1wrWXEsGbRKevjlIL+ZDE4sZlJr5ED4YW0yqmkK+eA==",
      "requires": {
        "hosted-git-info": "^2.1.4",
        "resolve": "^1.10.0",
        "semver": "2 || 3 || 4 || 5",
        "validate-npm-package-license": "^3.0.1"
      }
    },
    "normalize-path": {
      "version": "2.1.1",
      "resolved": "https://registry.npmjs.org/normalize-path/-/normalize-path-2.1.1.tgz",
      "integrity": "sha1-GrKLVW4Zg2Oowab35vogE3/mrtk=",
      "requires": {
        "remove-trailing-separator": "^1.0.1"
      }
    },
    "normalize-range": {
      "version": "0.1.2",
      "resolved": "https://registry.npmjs.org/normalize-range/-/normalize-range-0.1.2.tgz",
      "integrity": "sha1-LRDAa9/TEuqXd2laTShDlFa3WUI="
    },
    "normalize-url": {
      "version": "3.3.0",
      "resolved": "https://registry.npmjs.org/normalize-url/-/normalize-url-3.3.0.tgz",
      "integrity": "sha512-U+JJi7duF1o+u2pynbp2zXDW2/PADgC30f0GsHZtRh+HOcXHnw137TrNlyxxRvWW5fjKd3bcLHPxofWuCjaeZg=="
    },
    "npm-run-path": {
      "version": "2.0.2",
      "resolved": "https://registry.npmjs.org/npm-run-path/-/npm-run-path-2.0.2.tgz",
      "integrity": "sha1-NakjLfo11wZ7TLLd8jV7GHFTbF8=",
      "requires": {
        "path-key": "^2.0.0"
      }
    },
    "nth-check": {
      "version": "1.0.2",
      "resolved": "https://registry.npmjs.org/nth-check/-/nth-check-1.0.2.tgz",
      "integrity": "sha512-WeBOdju8SnzPN5vTUJYxYUxLeXpCaVP5i5e0LF8fg7WORF2Wd7wFX/pk0tYZk7s8T+J7VLy0Da6J1+wCT0AtHg==",
      "requires": {
        "boolbase": "~1.0.0"
      }
    },
    "num2fraction": {
      "version": "1.2.2",
      "resolved": "https://registry.npmjs.org/num2fraction/-/num2fraction-1.2.2.tgz",
      "integrity": "sha1-b2gragJ6Tp3fpFZM0lidHU5mnt4="
    },
    "number-is-nan": {
      "version": "1.0.1",
      "resolved": "https://registry.npmjs.org/number-is-nan/-/number-is-nan-1.0.1.tgz",
      "integrity": "sha1-CXtgK1NCKlIsGvuHkDGDNpQaAR0="
    },
    "nwsapi": {
      "version": "2.1.4",
      "resolved": "https://registry.npmjs.org/nwsapi/-/nwsapi-2.1.4.tgz",
      "integrity": "sha512-iGfd9Y6SFdTNldEy2L0GUhcarIutFmk+MPWIn9dmj8NMIup03G08uUF2KGbbmv/Ux4RT0VZJoP/sVbWA6d/VIw=="
    },
    "oauth-sign": {
      "version": "0.9.0",
      "resolved": "https://registry.npmjs.org/oauth-sign/-/oauth-sign-0.9.0.tgz",
      "integrity": "sha512-fexhUFFPTGV8ybAtSIGbV6gOkSv8UtRbDBnAyLQw4QPKkgNlsH2ByPGtMUqdWkos6YCRmAqViwgZrJc/mRDzZQ=="
    },
    "object-assign": {
      "version": "4.1.1",
      "resolved": "https://registry.npmjs.org/object-assign/-/object-assign-4.1.1.tgz",
      "integrity": "sha1-IQmtx5ZYh8/AXLvUQsrIv7s2CGM="
    },
    "object-copy": {
      "version": "0.1.0",
      "resolved": "https://registry.npmjs.org/object-copy/-/object-copy-0.1.0.tgz",
      "integrity": "sha1-fn2Fi3gb18mRpBupde04EnVOmYw=",
      "requires": {
        "copy-descriptor": "^0.1.0",
        "define-property": "^0.2.5",
        "kind-of": "^3.0.3"
      },
      "dependencies": {
        "define-property": {
          "version": "0.2.5",
          "resolved": "https://registry.npmjs.org/define-property/-/define-property-0.2.5.tgz",
          "integrity": "sha1-w1se+RjsPJkPmlvFe+BKrOxcgRY=",
          "requires": {
            "is-descriptor": "^0.1.0"
          }
        },
        "kind-of": {
          "version": "3.2.2",
          "resolved": "https://registry.npmjs.org/kind-of/-/kind-of-3.2.2.tgz",
          "integrity": "sha1-MeohpzS6ubuw8yRm2JOupR5KPGQ=",
          "requires": {
            "is-buffer": "^1.1.5"
          }
        }
      }
    },
    "object-hash": {
      "version": "1.3.1",
      "resolved": "https://registry.npmjs.org/object-hash/-/object-hash-1.3.1.tgz",
      "integrity": "sha512-OSuu/pU4ENM9kmREg0BdNrUDIl1heYa4mBZacJc+vVWz4GtAwu7jO8s4AIt2aGRUTqxykpWzI3Oqnsm13tTMDA=="
    },
    "object-keys": {
      "version": "1.1.1",
      "resolved": "https://registry.npmjs.org/object-keys/-/object-keys-1.1.1.tgz",
      "integrity": "sha512-NuAESUOUMrlIXOfHKzD6bpPu3tYt3xvjNdRIQ+FeT0lNb4K8WR70CaDxhuNguS2XG+GjkyMwOzsN5ZktImfhLA=="
    },
    "object-visit": {
      "version": "1.0.1",
      "resolved": "https://registry.npmjs.org/object-visit/-/object-visit-1.0.1.tgz",
      "integrity": "sha1-95xEk68MU3e1n+OdOV5BBC3QRbs=",
      "requires": {
        "isobject": "^3.0.0"
      }
    },
    "object.assign": {
      "version": "4.1.0",
      "resolved": "https://registry.npmjs.org/object.assign/-/object.assign-4.1.0.tgz",
      "integrity": "sha512-exHJeq6kBKj58mqGyTQ9DFvrZC/eR6OwxzoM9YRoGBqrXYonaFyGiFMuc9VZrXf7DarreEwMpurG3dd+CNyW5w==",
      "requires": {
        "define-properties": "^1.1.2",
        "function-bind": "^1.1.1",
        "has-symbols": "^1.0.0",
        "object-keys": "^1.0.11"
      }
    },
    "object.fromentries": {
      "version": "2.0.0",
      "resolved": "https://registry.npmjs.org/object.fromentries/-/object.fromentries-2.0.0.tgz",
      "integrity": "sha512-9iLiI6H083uiqUuvzyY6qrlmc/Gz8hLQFOcb/Ri/0xXFkSNS3ctV+CbE6yM2+AnkYfOB3dGjdzC0wrMLIhQICA==",
      "requires": {
        "define-properties": "^1.1.2",
        "es-abstract": "^1.11.0",
        "function-bind": "^1.1.1",
        "has": "^1.0.1"
      }
    },
    "object.getownpropertydescriptors": {
      "version": "2.0.3",
      "resolved": "https://registry.npmjs.org/object.getownpropertydescriptors/-/object.getownpropertydescriptors-2.0.3.tgz",
      "integrity": "sha1-h1jIRvW0B62rDyNuCYbxSwUcqhY=",
      "requires": {
        "define-properties": "^1.1.2",
        "es-abstract": "^1.5.1"
      }
    },
    "object.pick": {
      "version": "1.3.0",
      "resolved": "https://registry.npmjs.org/object.pick/-/object.pick-1.3.0.tgz",
      "integrity": "sha1-h6EKxMFpS9Lhy/U1kaZhQftd10c=",
      "requires": {
        "isobject": "^3.0.1"
      }
    },
    "object.values": {
      "version": "1.1.0",
      "resolved": "https://registry.npmjs.org/object.values/-/object.values-1.1.0.tgz",
      "integrity": "sha512-8mf0nKLAoFX6VlNVdhGj31SVYpaNFtUnuoOXWyFEstsWRgU837AK+JYM0iAxwkSzGRbwn8cbFmgbyxj1j4VbXg==",
      "requires": {
        "define-properties": "^1.1.3",
        "es-abstract": "^1.12.0",
        "function-bind": "^1.1.1",
        "has": "^1.0.3"
      }
    },
    "obuf": {
      "version": "1.1.2",
      "resolved": "https://registry.npmjs.org/obuf/-/obuf-1.1.2.tgz",
      "integrity": "sha512-PX1wu0AmAdPqOL1mWhqmlOd8kOIZQwGZw6rh7uby9fTc5lhaOWFLX3I6R1hrF9k3zUY40e6igsLGkDXK92LJNg=="
    },
    "on-finished": {
      "version": "2.3.0",
      "resolved": "https://registry.npmjs.org/on-finished/-/on-finished-2.3.0.tgz",
      "integrity": "sha1-IPEzZIGwg811M3mSoWlxqi2QaUc=",
      "requires": {
        "ee-first": "1.1.1"
      }
    },
    "on-headers": {
      "version": "1.0.2",
      "resolved": "https://registry.npmjs.org/on-headers/-/on-headers-1.0.2.tgz",
      "integrity": "sha512-pZAE+FJLoyITytdqK0U5s+FIpjN0JP3OzFi/u8Rx+EV5/W+JTWGXG8xFzevE7AjBfDqHv/8vL8qQsIhHnqRkrA=="
    },
    "once": {
      "version": "1.4.0",
      "resolved": "https://registry.npmjs.org/once/-/once-1.4.0.tgz",
      "integrity": "sha1-WDsap3WWHUsROsF9nFC6753Xa9E=",
      "requires": {
        "wrappy": "1"
      }
    },
    "onetime": {
      "version": "2.0.1",
      "resolved": "https://registry.npmjs.org/onetime/-/onetime-2.0.1.tgz",
      "integrity": "sha1-BnQoIw/WdEOyeUsiu6UotoZ5YtQ=",
      "requires": {
        "mimic-fn": "^1.0.0"
      }
    },
    "open": {
      "version": "6.4.0",
      "resolved": "https://registry.npmjs.org/open/-/open-6.4.0.tgz",
      "integrity": "sha512-IFenVPgF70fSm1keSd2iDBIDIBZkroLeuffXq+wKTzTJlBpesFWojV9lb8mzOfaAzM1sr7HQHuO0vtV0zYekGg==",
      "requires": {
        "is-wsl": "^1.1.0"
      }
    },
    "opn": {
      "version": "5.5.0",
      "resolved": "https://registry.npmjs.org/opn/-/opn-5.5.0.tgz",
      "integrity": "sha512-PqHpggC9bLV0VeWcdKhkpxY+3JTzetLSqTCWL/z/tFIbI6G8JCjondXklT1JinczLz2Xib62sSp0T/gKT4KksA==",
      "requires": {
        "is-wsl": "^1.1.0"
      }
    },
    "optimist": {
      "version": "0.6.1",
      "resolved": "https://registry.npmjs.org/optimist/-/optimist-0.6.1.tgz",
      "integrity": "sha1-2j6nRob6IaGaERwybpDrFaAZZoY=",
      "requires": {
        "minimist": "~0.0.1",
        "wordwrap": "~0.0.2"
      },
      "dependencies": {
        "wordwrap": {
          "version": "0.0.3",
          "resolved": "https://registry.npmjs.org/wordwrap/-/wordwrap-0.0.3.tgz",
          "integrity": "sha1-o9XabNXAvAAI03I0u68b7WMFkQc="
        }
      }
    },
    "optimize-css-assets-webpack-plugin": {
      "version": "5.0.1",
      "resolved": "https://registry.npmjs.org/optimize-css-assets-webpack-plugin/-/optimize-css-assets-webpack-plugin-5.0.1.tgz",
      "integrity": "sha512-Rqm6sSjWtx9FchdP0uzTQDc7GXDKnwVEGoSxjezPkzMewx7gEWE9IMUYKmigTRC4U3RaNSwYVnUDLuIdtTpm0A==",
      "requires": {
        "cssnano": "^4.1.0",
        "last-call-webpack-plugin": "^3.0.0"
      }
    },
    "optionator": {
      "version": "0.8.2",
      "resolved": "https://registry.npmjs.org/optionator/-/optionator-0.8.2.tgz",
      "integrity": "sha1-NkxeQJ0/TWMB1sC0wFu6UBgK62Q=",
      "requires": {
        "deep-is": "~0.1.3",
        "fast-levenshtein": "~2.0.4",
        "levn": "~0.3.0",
        "prelude-ls": "~1.1.2",
        "type-check": "~0.3.2",
        "wordwrap": "~1.0.0"
      }
    },
    "optjs": {
      "version": "3.2.2",
      "resolved": "https://registry.npmjs.org/optjs/-/optjs-3.2.2.tgz",
      "integrity": "sha1-aabOicRCpEQDFBrS+bNwvVu29O4="
    },
    "ora": {
      "version": "0.2.3",
      "resolved": "https://registry.npmjs.org/ora/-/ora-0.2.3.tgz",
      "integrity": "sha1-N1J9Igrc1Tw5tzVx11QVbV22V6Q=",
      "requires": {
        "chalk": "^1.1.1",
        "cli-cursor": "^1.0.2",
        "cli-spinners": "^0.1.2",
        "object-assign": "^4.0.1"
      },
      "dependencies": {
        "cli-cursor": {
          "version": "1.0.2",
          "resolved": "https://registry.npmjs.org/cli-cursor/-/cli-cursor-1.0.2.tgz",
          "integrity": "sha1-ZNo/fValRBLll5S9Ytw1KV6PKYc=",
          "requires": {
            "restore-cursor": "^1.0.1"
          }
        },
        "onetime": {
          "version": "1.1.0",
          "resolved": "https://registry.npmjs.org/onetime/-/onetime-1.1.0.tgz",
          "integrity": "sha1-ofeDj4MUxRbwXs78vEzP4EtO14k="
        },
        "restore-cursor": {
          "version": "1.0.1",
          "resolved": "https://registry.npmjs.org/restore-cursor/-/restore-cursor-1.0.1.tgz",
          "integrity": "sha1-NGYfRohjJ/7SmRR5FSJS35LapUE=",
          "requires": {
            "exit-hook": "^1.0.0",
            "onetime": "^1.0.0"
          }
        }
      }
    },
    "original": {
      "version": "1.0.2",
      "resolved": "https://registry.npmjs.org/original/-/original-1.0.2.tgz",
      "integrity": "sha512-hyBVl6iqqUOJ8FqRe+l/gS8H+kKYjrEndd5Pm1MfBtsEKA038HkkdbAl/72EAXGyonD/PFsvmVG+EvcIpliMBg==",
      "requires": {
        "url-parse": "^1.4.3"
      }
    },
    "os-browserify": {
      "version": "0.3.0",
      "resolved": "https://registry.npmjs.org/os-browserify/-/os-browserify-0.3.0.tgz",
      "integrity": "sha1-hUNzx/XCMVkU/Jv8a9gjj92h7Cc="
    },
    "os-homedir": {
      "version": "1.0.2",
      "resolved": "https://registry.npmjs.org/os-homedir/-/os-homedir-1.0.2.tgz",
      "integrity": "sha1-/7xJiDNuDoM94MFox+8VISGqf7M="
    },
    "os-locale": {
      "version": "1.4.0",
      "resolved": "https://registry.npmjs.org/os-locale/-/os-locale-1.4.0.tgz",
      "integrity": "sha1-IPnxeuKe00XoveWDsT0gCYA8FNk=",
      "requires": {
        "lcid": "^1.0.0"
      }
    },
    "os-tmpdir": {
      "version": "1.0.2",
      "resolved": "https://registry.npmjs.org/os-tmpdir/-/os-tmpdir-1.0.2.tgz",
      "integrity": "sha1-u+Z0BseaqFxc/sdm/lc0VV36EnQ="
    },
    "osenv": {
      "version": "0.1.5",
      "resolved": "https://registry.npmjs.org/osenv/-/osenv-0.1.5.tgz",
      "integrity": "sha512-0CWcCECdMVc2Rw3U5w9ZjqX6ga6ubk1xDVKxtBQPK7wis/0F2r9T6k4ydGYhecl7YUBxBVxhL5oisPsNxAPe2g==",
      "requires": {
        "os-homedir": "^1.0.0",
        "os-tmpdir": "^1.0.0"
      }
    },
    "p-defer": {
      "version": "1.0.0",
      "resolved": "https://registry.npmjs.org/p-defer/-/p-defer-1.0.0.tgz",
      "integrity": "sha1-n26xgvbJqozXQwBKfU+WsZaw+ww="
    },
    "p-each-series": {
      "version": "1.0.0",
      "resolved": "https://registry.npmjs.org/p-each-series/-/p-each-series-1.0.0.tgz",
      "integrity": "sha1-kw89Et0fUOdDRFeiLNbwSsatf3E=",
      "requires": {
        "p-reduce": "^1.0.0"
      }
    },
    "p-finally": {
      "version": "1.0.0",
      "resolved": "https://registry.npmjs.org/p-finally/-/p-finally-1.0.0.tgz",
      "integrity": "sha1-P7z7FbiZpEEjs0ttzBi3JDNqLK4="
    },
    "p-is-promise": {
      "version": "2.1.0",
      "resolved": "https://registry.npmjs.org/p-is-promise/-/p-is-promise-2.1.0.tgz",
      "integrity": "sha512-Y3W0wlRPK8ZMRbNq97l4M5otioeA5lm1z7bkNkxCka8HSPjR0xRWmpCmc9utiaLP9Jb1eD8BgeIxTW4AIF45Pg=="
    },
    "p-limit": {
      "version": "1.3.0",
      "resolved": "https://registry.npmjs.org/p-limit/-/p-limit-1.3.0.tgz",
      "integrity": "sha512-vvcXsLAJ9Dr5rQOPk7toZQZJApBl2K4J6dANSsEuh6QI41JYcsS/qhTGa9ErIUUgK3WNQoJYvylxvjqmiqEA9Q==",
      "requires": {
        "p-try": "^1.0.0"
      }
    },
    "p-locate": {
      "version": "2.0.0",
      "resolved": "https://registry.npmjs.org/p-locate/-/p-locate-2.0.0.tgz",
      "integrity": "sha1-IKAQOyIqcMj9OcwuWAaA893l7EM=",
      "requires": {
        "p-limit": "^1.1.0"
      }
    },
    "p-map": {
      "version": "1.2.0",
      "resolved": "https://registry.npmjs.org/p-map/-/p-map-1.2.0.tgz",
      "integrity": "sha512-r6zKACMNhjPJMTl8KcFH4li//gkrXWfbD6feV8l6doRHlzljFWGJ2AP6iKaCJXyZmAUMOPtvbW7EXkbWO/pLEA=="
    },
    "p-reduce": {
      "version": "1.0.0",
      "resolved": "https://registry.npmjs.org/p-reduce/-/p-reduce-1.0.0.tgz",
      "integrity": "sha1-GMKw3ZNqRpClKfgjH1ig/bakffo="
    },
    "p-try": {
      "version": "1.0.0",
      "resolved": "https://registry.npmjs.org/p-try/-/p-try-1.0.0.tgz",
      "integrity": "sha1-y8ec26+P1CKOE/Yh8rGiN8GyB7M="
    },
    "package-json": {
      "version": "4.0.1",
      "resolved": "https://registry.npmjs.org/package-json/-/package-json-4.0.1.tgz",
      "integrity": "sha1-iGmgQBJTZhxMTKPabCEh7VVfXu0=",
      "requires": {
        "got": "^6.7.1",
        "registry-auth-token": "^3.0.1",
        "registry-url": "^3.0.3",
        "semver": "^5.1.0"
      }
    },
    "pako": {
      "version": "1.0.10",
      "resolved": "https://registry.npmjs.org/pako/-/pako-1.0.10.tgz",
      "integrity": "sha512-0DTvPVU3ed8+HNXOu5Bs+o//Mbdj9VNQMUOe9oKCwh8l0GNwpTDMKCWbRjgtD291AWnkAgkqA/LOnQS8AmS1tw=="
    },
    "parallel-transform": {
      "version": "1.1.0",
      "resolved": "https://registry.npmjs.org/parallel-transform/-/parallel-transform-1.1.0.tgz",
      "integrity": "sha1-1BDwZbBdojCB/NEPKIVMKb2jOwY=",
      "requires": {
        "cyclist": "~0.2.2",
        "inherits": "^2.0.3",
        "readable-stream": "^2.1.5"
      }
    },
    "param-case": {
      "version": "2.1.1",
      "resolved": "https://registry.npmjs.org/param-case/-/param-case-2.1.1.tgz",
      "integrity": "sha1-35T9jPZTHs915r75oIWPvHK+Ikc=",
      "requires": {
        "no-case": "^2.2.0"
      }
    },
    "parent-module": {
      "version": "1.0.1",
      "resolved": "https://registry.npmjs.org/parent-module/-/parent-module-1.0.1.tgz",
      "integrity": "sha512-GQ2EWRpQV8/o+Aw8YqtfZZPfNRWZYkbidE9k5rpl/hC3vtHHBfGm2Ifi6qWV+coDGkrUKZAxE3Lot5kcsRlh+g==",
      "requires": {
        "callsites": "^3.0.0"
      },
      "dependencies": {
        "callsites": {
          "version": "3.1.0",
          "resolved": "https://registry.npmjs.org/callsites/-/callsites-3.1.0.tgz",
          "integrity": "sha512-P8BjAsXvZS+VIDUI11hHCQEv74YT67YUi5JJFNWIqL235sBmjX4+qx9Muvls5ivyNENctx46xQLQ3aTuE7ssaQ=="
        }
      }
    },
    "parse-asn1": {
      "version": "5.1.4",
      "resolved": "https://registry.npmjs.org/parse-asn1/-/parse-asn1-5.1.4.tgz",
      "integrity": "sha512-Qs5duJcuvNExRfFZ99HDD3z4mAi3r9Wl/FOjEOijlxwCZs7E7mW2vjTpgQ4J8LpTF8x5v+1Vn5UQFejmWT11aw==",
      "requires": {
        "asn1.js": "^4.0.0",
        "browserify-aes": "^1.0.0",
        "create-hash": "^1.1.0",
        "evp_bytestokey": "^1.0.0",
        "pbkdf2": "^3.0.3",
        "safe-buffer": "^5.1.1"
      }
    },
    "parse-json": {
      "version": "2.2.0",
      "resolved": "https://registry.npmjs.org/parse-json/-/parse-json-2.2.0.tgz",
      "integrity": "sha1-9ID0BDTvgHQfhGkJn43qGPVaTck=",
      "requires": {
        "error-ex": "^1.2.0"
      }
    },
    "parse5": {
      "version": "4.0.0",
      "resolved": "https://registry.npmjs.org/parse5/-/parse5-4.0.0.tgz",
      "integrity": "sha512-VrZ7eOd3T1Fk4XWNXMgiGBK/z0MG48BWG2uQNU4I72fkQuKUTZpl+u9k+CxEG0twMVzSmXEEz12z5Fnw1jIQFA=="
    },
    "parseurl": {
      "version": "1.3.3",
      "resolved": "https://registry.npmjs.org/parseurl/-/parseurl-1.3.3.tgz",
      "integrity": "sha512-CiyeOxFT/JZyN5m0z9PfXw4SCBJ6Sygz1Dpl0wqjlhDEGGBP1GnsUVEL0p63hoG1fcj3fHynXi9NYO4nWOL+qQ=="
    },
    "pascalcase": {
      "version": "0.1.1",
      "resolved": "https://registry.npmjs.org/pascalcase/-/pascalcase-0.1.1.tgz",
      "integrity": "sha1-s2PlXoAGym/iF4TS2yK9FdeRfxQ="
    },
    "path-browserify": {
      "version": "0.0.1",
      "resolved": "https://registry.npmjs.org/path-browserify/-/path-browserify-0.0.1.tgz",
      "integrity": "sha512-BapA40NHICOS+USX9SN4tyhq+A2RrN/Ws5F0Z5aMHDp98Fl86lX8Oti8B7uN93L4Ifv4fHOEA+pQw87gmMO/lQ=="
    },
    "path-dirname": {
      "version": "1.0.2",
      "resolved": "https://registry.npmjs.org/path-dirname/-/path-dirname-1.0.2.tgz",
      "integrity": "sha1-zDPSTVJeCZpTiMAzbG4yuRYGCeA="
    },
    "path-exists": {
      "version": "3.0.0",
      "resolved": "https://registry.npmjs.org/path-exists/-/path-exists-3.0.0.tgz",
      "integrity": "sha1-zg6+ql94yxiSXqfYENe1mwEP1RU="
    },
    "path-is-absolute": {
      "version": "1.0.1",
      "resolved": "https://registry.npmjs.org/path-is-absolute/-/path-is-absolute-1.0.1.tgz",
      "integrity": "sha1-F0uSaHNVNP+8es5r9TpanhtcX18="
    },
    "path-is-inside": {
      "version": "1.0.2",
      "resolved": "https://registry.npmjs.org/path-is-inside/-/path-is-inside-1.0.2.tgz",
      "integrity": "sha1-NlQX3t5EQw0cEa9hAn+s8HS9/FM="
    },
    "path-key": {
      "version": "2.0.1",
      "resolved": "https://registry.npmjs.org/path-key/-/path-key-2.0.1.tgz",
      "integrity": "sha1-QRyttXTFoUDTpLGRDUDYDMn0C0A="
    },
    "path-parse": {
      "version": "1.0.6",
      "resolved": "https://registry.npmjs.org/path-parse/-/path-parse-1.0.6.tgz",
      "integrity": "sha512-GSmOT2EbHrINBf9SR7CDELwlJ8AENk3Qn7OikK4nFYAu3Ote2+JYNVvkpAEQm3/TLNEJFD/xZJjzyxg3KBWOzw=="
    },
    "path-to-regexp": {
      "version": "3.0.0",
      "resolved": "https://registry.npmjs.org/path-to-regexp/-/path-to-regexp-3.0.0.tgz",
      "integrity": "sha512-ZOtfhPttCrqp2M1PBBH4X13XlvnfhIwD7yCLx+GoGoXRPQyxGOTdQMpIzPSPKXAJT/JQrdfFrgdJOyAzvgpQ9A=="
    },
    "path-type": {
      "version": "2.0.0",
      "resolved": "https://registry.npmjs.org/path-type/-/path-type-2.0.0.tgz",
      "integrity": "sha1-8BLMuEFbcJb8LaoQVMPXI4lZTHM=",
      "requires": {
        "pify": "^2.0.0"
      }
    },
    "pbkdf2": {
      "version": "3.0.17",
      "resolved": "https://registry.npmjs.org/pbkdf2/-/pbkdf2-3.0.17.tgz",
      "integrity": "sha512-U/il5MsrZp7mGg3mSQfn742na2T+1/vHDCG5/iTI3X9MKUuYUZVLQhyRsg06mCgDBTd57TxzgZt7P+fYfjRLtA==",
      "requires": {
        "create-hash": "^1.1.2",
        "create-hmac": "^1.1.4",
        "ripemd160": "^2.0.1",
        "safe-buffer": "^5.0.1",
        "sha.js": "^2.4.8"
      }
    },
    "performance-now": {
      "version": "2.1.0",
      "resolved": "https://registry.npmjs.org/performance-now/-/performance-now-2.1.0.tgz",
      "integrity": "sha1-Ywn04OX6kT7BxpMHrjZLSzd8nns="
    },
    "pify": {
      "version": "2.3.0",
      "resolved": "https://registry.npmjs.org/pify/-/pify-2.3.0.tgz",
      "integrity": "sha1-7RQaasBDqEnqWISY59yosVMw6Qw="
    },
    "pinkie": {
      "version": "2.0.4",
      "resolved": "https://registry.npmjs.org/pinkie/-/pinkie-2.0.4.tgz",
      "integrity": "sha1-clVrgM+g1IqXToDnckjoDtT3+HA="
    },
    "pinkie-promise": {
      "version": "2.0.1",
      "resolved": "https://registry.npmjs.org/pinkie-promise/-/pinkie-promise-2.0.1.tgz",
      "integrity": "sha1-ITXW36ejWMBprJsXh3YogihFD/o=",
      "requires": {
        "pinkie": "^2.0.0"
      }
    },
    "pirates": {
      "version": "4.0.1",
      "resolved": "https://registry.npmjs.org/pirates/-/pirates-4.0.1.tgz",
      "integrity": "sha512-WuNqLTbMI3tmfef2TKxlQmAiLHKtFhlsCZnPIpuv2Ow0RDVO8lfy1Opf4NUzlMXLjPl+Men7AuVdX6TA+s+uGA==",
      "requires": {
        "node-modules-regexp": "^1.0.0"
      }
    },
    "pkg-dir": {
      "version": "2.0.0",
      "resolved": "https://registry.npmjs.org/pkg-dir/-/pkg-dir-2.0.0.tgz",
      "integrity": "sha1-9tXREJ4Z1j7fQo4L1X4Sd3YVM0s=",
      "requires": {
        "find-up": "^2.1.0"
      }
    },
    "pkg-up": {
      "version": "2.0.0",
      "resolved": "https://registry.npmjs.org/pkg-up/-/pkg-up-2.0.0.tgz",
      "integrity": "sha1-yBmscoBZpGHKscOImivjxJoATX8=",
      "requires": {
        "find-up": "^2.1.0"
      }
    },
    "pkginfo": {
      "version": "0.3.1",
      "resolved": "https://registry.npmjs.org/pkginfo/-/pkginfo-0.3.1.tgz",
      "integrity": "sha1-Wyn2qB9wcXFC4J52W76rl7T4HiE="
    },
    "pluralize": {
      "version": "4.0.0",
      "resolved": "https://registry.npmjs.org/pluralize/-/pluralize-4.0.0.tgz",
      "integrity": "sha1-WbcIwcAZCi9pLxx2GMRGsFL9F2I="
    },
    "pn": {
      "version": "1.1.0",
      "resolved": "https://registry.npmjs.org/pn/-/pn-1.1.0.tgz",
      "integrity": "sha512-2qHaIQr2VLRFoxe2nASzsV6ef4yOOH+Fi9FBOVH6cqeSgUnoyySPZkxzLuzd+RYOQTRpROA0ztTMqxROKSb/nA=="
    },
    "pnp-webpack-plugin": {
      "version": "1.2.1",
      "resolved": "https://registry.npmjs.org/pnp-webpack-plugin/-/pnp-webpack-plugin-1.2.1.tgz",
      "integrity": "sha512-W6GctK7K2qQiVR+gYSv/Gyt6jwwIH4vwdviFqx+Y2jAtVf5eZyYIDf5Ac2NCDMBiX5yWscBLZElPTsyA1UtVVA==",
      "requires": {
        "ts-pnp": "^1.0.0"
      }
    },
    "portfinder": {
      "version": "1.0.22",
      "resolved": "https://registry.npmjs.org/portfinder/-/portfinder-1.0.22.tgz",
      "integrity": "sha512-aZuwaz9ujJsyE8C5kurXAD8UmRxsJr+RtZWyQRvRk19Z2ri5uuHw5YS4tDBZrJlOS9Zw96uAbBuPb6W4wgvV5A==",
      "requires": {
        "async": "^1.5.2",
        "debug": "^2.2.0",
        "mkdirp": "0.5.x"
      },
      "dependencies": {
        "async": {
          "version": "1.5.2",
          "resolved": "https://registry.npmjs.org/async/-/async-1.5.2.tgz",
          "integrity": "sha1-7GphrlZIDAw8skHJVhjiCJL5Zyo="
        }
      }
    },
    "posix-character-classes": {
      "version": "0.1.1",
      "resolved": "https://registry.npmjs.org/posix-character-classes/-/posix-character-classes-0.1.1.tgz",
      "integrity": "sha1-AerA/jta9xoqbAL+q7jB/vfgDqs="
    },
    "postcss": {
      "version": "7.0.17",
      "resolved": "https://registry.npmjs.org/postcss/-/postcss-7.0.17.tgz",
      "integrity": "sha512-546ZowA+KZ3OasvQZHsbuEpysvwTZNGJv9EfyCQdsIDltPSWHAeTQ5fQy/Npi2ZDtLI3zs7Ps/p6wThErhm9fQ==",
      "requires": {
        "chalk": "^2.4.2",
        "source-map": "^0.6.1",
        "supports-color": "^6.1.0"
      },
      "dependencies": {
        "ansi-styles": {
          "version": "3.2.1",
          "resolved": "https://registry.npmjs.org/ansi-styles/-/ansi-styles-3.2.1.tgz",
          "integrity": "sha512-VT0ZI6kZRdTh8YyJw3SMbYm/u+NqfsAxEpWO0Pf9sq8/e94WxxOpPKx9FR1FlyCtOVDNOQ+8ntlqFxiRc+r5qA==",
          "requires": {
            "color-convert": "^1.9.0"
          }
        },
        "chalk": {
          "version": "2.4.2",
          "resolved": "https://registry.npmjs.org/chalk/-/chalk-2.4.2.tgz",
          "integrity": "sha512-Mti+f9lpJNcwF4tWV8/OrTTtF1gZi+f8FqlyAdouralcFWFQWF2+NgCHShjkCb+IFBLq9buZwE1xckQU4peSuQ==",
          "requires": {
            "ansi-styles": "^3.2.1",
            "escape-string-regexp": "^1.0.5",
            "supports-color": "^5.3.0"
          },
          "dependencies": {
            "supports-color": {
              "version": "5.5.0",
              "resolved": "https://registry.npmjs.org/supports-color/-/supports-color-5.5.0.tgz",
              "integrity": "sha512-QjVjwdXIt408MIiAqCX4oUKsgU2EqAGzs2Ppkm4aQYbjm+ZEWEcW4SfFNTr4uMNZma0ey4f5lgLrkB0aX0QMow==",
              "requires": {
                "has-flag": "^3.0.0"
              }
            }
          }
        },
        "source-map": {
          "version": "0.6.1",
          "resolved": "https://registry.npmjs.org/source-map/-/source-map-0.6.1.tgz",
          "integrity": "sha512-UjgapumWlbMhkBgzT7Ykc5YXUT46F0iKu8SGXq0bcwP5dz/h0Plj6enJqjz1Zbq2l5WaqYnrVbwWOWMyF3F47g=="
        },
        "supports-color": {
          "version": "6.1.0",
          "resolved": "https://registry.npmjs.org/supports-color/-/supports-color-6.1.0.tgz",
          "integrity": "sha512-qe1jfm1Mg7Nq/NSh6XE24gPXROEVsWHxC1LIx//XNlD9iw7YZQGjZNjYN7xGaEG6iKdA8EtNFW6R0gjnVXp+wQ==",
          "requires": {
            "has-flag": "^3.0.0"
          }
        }
      }
    },
    "postcss-attribute-case-insensitive": {
      "version": "4.0.1",
      "resolved": "https://registry.npmjs.org/postcss-attribute-case-insensitive/-/postcss-attribute-case-insensitive-4.0.1.tgz",
      "integrity": "sha512-L2YKB3vF4PetdTIthQVeT+7YiSzMoNMLLYxPXXppOOP7NoazEAy45sh2LvJ8leCQjfBcfkYQs8TtCcQjeZTp8A==",
      "requires": {
        "postcss": "^7.0.2",
        "postcss-selector-parser": "^5.0.0"
      },
      "dependencies": {
        "cssesc": {
          "version": "2.0.0",
          "resolved": "https://registry.npmjs.org/cssesc/-/cssesc-2.0.0.tgz",
          "integrity": "sha512-MsCAG1z9lPdoO/IUMLSBWBSVxVtJ1395VGIQ+Fc2gNdkQ1hNDnQdw3YhA71WJCBW1vdwA0cAnk/DnW6bqoEUYg=="
        },
        "postcss-selector-parser": {
          "version": "5.0.0",
          "resolved": "https://registry.npmjs.org/postcss-selector-parser/-/postcss-selector-parser-5.0.0.tgz",
          "integrity": "sha512-w+zLE5Jhg6Liz8+rQOWEAwtwkyqpfnmsinXjXg6cY7YIONZZtgvE0v2O0uhQBs0peNomOJwWRKt6JBfTdTd3OQ==",
          "requires": {
            "cssesc": "^2.0.0",
            "indexes-of": "^1.0.1",
            "uniq": "^1.0.1"
          }
        }
      }
    },
    "postcss-browser-comments": {
      "version": "2.0.0",
      "resolved": "https://registry.npmjs.org/postcss-browser-comments/-/postcss-browser-comments-2.0.0.tgz",
      "integrity": "sha512-xGG0UvoxwBc4Yx4JX3gc0RuDl1kc4bVihCzzk6UC72YPfq5fu3c717Nu8Un3nvnq1BJ31gBnFXIG/OaUTnpHgA==",
      "requires": {
        "postcss": "^7.0.2"
      }
    },
    "postcss-calc": {
      "version": "7.0.1",
      "resolved": "https://registry.npmjs.org/postcss-calc/-/postcss-calc-7.0.1.tgz",
      "integrity": "sha512-oXqx0m6tb4N3JGdmeMSc/i91KppbYsFZKdH0xMOqK8V1rJlzrKlTdokz8ozUXLVejydRN6u2IddxpcijRj2FqQ==",
      "requires": {
        "css-unit-converter": "^1.1.1",
        "postcss": "^7.0.5",
        "postcss-selector-parser": "^5.0.0-rc.4",
        "postcss-value-parser": "^3.3.1"
      },
      "dependencies": {
        "cssesc": {
          "version": "2.0.0",
          "resolved": "https://registry.npmjs.org/cssesc/-/cssesc-2.0.0.tgz",
          "integrity": "sha512-MsCAG1z9lPdoO/IUMLSBWBSVxVtJ1395VGIQ+Fc2gNdkQ1hNDnQdw3YhA71WJCBW1vdwA0cAnk/DnW6bqoEUYg=="
        },
        "postcss-selector-parser": {
          "version": "5.0.0",
          "resolved": "https://registry.npmjs.org/postcss-selector-parser/-/postcss-selector-parser-5.0.0.tgz",
          "integrity": "sha512-w+zLE5Jhg6Liz8+rQOWEAwtwkyqpfnmsinXjXg6cY7YIONZZtgvE0v2O0uhQBs0peNomOJwWRKt6JBfTdTd3OQ==",
          "requires": {
            "cssesc": "^2.0.0",
            "indexes-of": "^1.0.1",
            "uniq": "^1.0.1"
          }
        }
      }
    },
    "postcss-color-functional-notation": {
      "version": "2.0.1",
      "resolved": "https://registry.npmjs.org/postcss-color-functional-notation/-/postcss-color-functional-notation-2.0.1.tgz",
      "integrity": "sha512-ZBARCypjEDofW4P6IdPVTLhDNXPRn8T2s1zHbZidW6rPaaZvcnCS2soYFIQJrMZSxiePJ2XIYTlcb2ztr/eT2g==",
      "requires": {
        "postcss": "^7.0.2",
        "postcss-values-parser": "^2.0.0"
      }
    },
    "postcss-color-gray": {
      "version": "5.0.0",
      "resolved": "https://registry.npmjs.org/postcss-color-gray/-/postcss-color-gray-5.0.0.tgz",
      "integrity": "sha512-q6BuRnAGKM/ZRpfDascZlIZPjvwsRye7UDNalqVz3s7GDxMtqPY6+Q871liNxsonUw8oC61OG+PSaysYpl1bnw==",
      "requires": {
        "@csstools/convert-colors": "^1.4.0",
        "postcss": "^7.0.5",
        "postcss-values-parser": "^2.0.0"
      }
    },
    "postcss-color-hex-alpha": {
      "version": "5.0.3",
      "resolved": "https://registry.npmjs.org/postcss-color-hex-alpha/-/postcss-color-hex-alpha-5.0.3.tgz",
      "integrity": "sha512-PF4GDel8q3kkreVXKLAGNpHKilXsZ6xuu+mOQMHWHLPNyjiUBOr75sp5ZKJfmv1MCus5/DWUGcK9hm6qHEnXYw==",
      "requires": {
        "postcss": "^7.0.14",
        "postcss-values-parser": "^2.0.1"
      }
    },
    "postcss-color-mod-function": {
      "version": "3.0.3",
      "resolved": "https://registry.npmjs.org/postcss-color-mod-function/-/postcss-color-mod-function-3.0.3.tgz",
      "integrity": "sha512-YP4VG+xufxaVtzV6ZmhEtc+/aTXH3d0JLpnYfxqTvwZPbJhWqp8bSY3nfNzNRFLgB4XSaBA82OE4VjOOKpCdVQ==",
      "requires": {
        "@csstools/convert-colors": "^1.4.0",
        "postcss": "^7.0.2",
        "postcss-values-parser": "^2.0.0"
      }
    },
    "postcss-color-rebeccapurple": {
      "version": "4.0.1",
      "resolved": "https://registry.npmjs.org/postcss-color-rebeccapurple/-/postcss-color-rebeccapurple-4.0.1.tgz",
      "integrity": "sha512-aAe3OhkS6qJXBbqzvZth2Au4V3KieR5sRQ4ptb2b2O8wgvB3SJBsdG+jsn2BZbbwekDG8nTfcCNKcSfe/lEy8g==",
      "requires": {
        "postcss": "^7.0.2",
        "postcss-values-parser": "^2.0.0"
      }
    },
    "postcss-colormin": {
      "version": "4.0.3",
      "resolved": "https://registry.npmjs.org/postcss-colormin/-/postcss-colormin-4.0.3.tgz",
      "integrity": "sha512-WyQFAdDZpExQh32j0U0feWisZ0dmOtPl44qYmJKkq9xFWY3p+4qnRzCHeNrkeRhwPHz9bQ3mo0/yVkaply0MNw==",
      "requires": {
        "browserslist": "^4.0.0",
        "color": "^3.0.0",
        "has": "^1.0.0",
        "postcss": "^7.0.0",
        "postcss-value-parser": "^3.0.0"
      }
    },
    "postcss-convert-values": {
      "version": "4.0.1",
      "resolved": "https://registry.npmjs.org/postcss-convert-values/-/postcss-convert-values-4.0.1.tgz",
      "integrity": "sha512-Kisdo1y77KUC0Jmn0OXU/COOJbzM8cImvw1ZFsBgBgMgb1iL23Zs/LXRe3r+EZqM3vGYKdQ2YJVQ5VkJI+zEJQ==",
      "requires": {
        "postcss": "^7.0.0",
        "postcss-value-parser": "^3.0.0"
      }
    },
    "postcss-custom-media": {
      "version": "7.0.8",
      "resolved": "https://registry.npmjs.org/postcss-custom-media/-/postcss-custom-media-7.0.8.tgz",
      "integrity": "sha512-c9s5iX0Ge15o00HKbuRuTqNndsJUbaXdiNsksnVH8H4gdc+zbLzr/UasOwNG6CTDpLFekVY4672eWdiiWu2GUg==",
      "requires": {
        "postcss": "^7.0.14"
      }
    },
    "postcss-custom-properties": {
      "version": "8.0.11",
      "resolved": "https://registry.npmjs.org/postcss-custom-properties/-/postcss-custom-properties-8.0.11.tgz",
      "integrity": "sha512-nm+o0eLdYqdnJ5abAJeXp4CEU1c1k+eB2yMCvhgzsds/e0umabFrN6HoTy/8Q4K5ilxERdl/JD1LO5ANoYBeMA==",
      "requires": {
        "postcss": "^7.0.17",
        "postcss-values-parser": "^2.0.1"
      }
    },
    "postcss-custom-selectors": {
      "version": "5.1.2",
      "resolved": "https://registry.npmjs.org/postcss-custom-selectors/-/postcss-custom-selectors-5.1.2.tgz",
      "integrity": "sha512-DSGDhqinCqXqlS4R7KGxL1OSycd1lydugJ1ky4iRXPHdBRiozyMHrdu0H3o7qNOCiZwySZTUI5MV0T8QhCLu+w==",
      "requires": {
        "postcss": "^7.0.2",
        "postcss-selector-parser": "^5.0.0-rc.3"
      },
      "dependencies": {
        "cssesc": {
          "version": "2.0.0",
          "resolved": "https://registry.npmjs.org/cssesc/-/cssesc-2.0.0.tgz",
          "integrity": "sha512-MsCAG1z9lPdoO/IUMLSBWBSVxVtJ1395VGIQ+Fc2gNdkQ1hNDnQdw3YhA71WJCBW1vdwA0cAnk/DnW6bqoEUYg=="
        },
        "postcss-selector-parser": {
          "version": "5.0.0",
          "resolved": "https://registry.npmjs.org/postcss-selector-parser/-/postcss-selector-parser-5.0.0.tgz",
          "integrity": "sha512-w+zLE5Jhg6Liz8+rQOWEAwtwkyqpfnmsinXjXg6cY7YIONZZtgvE0v2O0uhQBs0peNomOJwWRKt6JBfTdTd3OQ==",
          "requires": {
            "cssesc": "^2.0.0",
            "indexes-of": "^1.0.1",
            "uniq": "^1.0.1"
          }
        }
      }
    },
    "postcss-dir-pseudo-class": {
      "version": "5.0.0",
      "resolved": "https://registry.npmjs.org/postcss-dir-pseudo-class/-/postcss-dir-pseudo-class-5.0.0.tgz",
      "integrity": "sha512-3pm4oq8HYWMZePJY+5ANriPs3P07q+LW6FAdTlkFH2XqDdP4HeeJYMOzn0HYLhRSjBO3fhiqSwwU9xEULSrPgw==",
      "requires": {
        "postcss": "^7.0.2",
        "postcss-selector-parser": "^5.0.0-rc.3"
      },
      "dependencies": {
        "cssesc": {
          "version": "2.0.0",
          "resolved": "https://registry.npmjs.org/cssesc/-/cssesc-2.0.0.tgz",
          "integrity": "sha512-MsCAG1z9lPdoO/IUMLSBWBSVxVtJ1395VGIQ+Fc2gNdkQ1hNDnQdw3YhA71WJCBW1vdwA0cAnk/DnW6bqoEUYg=="
        },
        "postcss-selector-parser": {
          "version": "5.0.0",
          "resolved": "https://registry.npmjs.org/postcss-selector-parser/-/postcss-selector-parser-5.0.0.tgz",
          "integrity": "sha512-w+zLE5Jhg6Liz8+rQOWEAwtwkyqpfnmsinXjXg6cY7YIONZZtgvE0v2O0uhQBs0peNomOJwWRKt6JBfTdTd3OQ==",
          "requires": {
            "cssesc": "^2.0.0",
            "indexes-of": "^1.0.1",
            "uniq": "^1.0.1"
          }
        }
      }
    },
    "postcss-discard-comments": {
      "version": "4.0.2",
      "resolved": "https://registry.npmjs.org/postcss-discard-comments/-/postcss-discard-comments-4.0.2.tgz",
      "integrity": "sha512-RJutN259iuRf3IW7GZyLM5Sw4GLTOH8FmsXBnv8Ab/Tc2k4SR4qbV4DNbyyY4+Sjo362SyDmW2DQ7lBSChrpkg==",
      "requires": {
        "postcss": "^7.0.0"
      }
    },
    "postcss-discard-duplicates": {
      "version": "4.0.2",
      "resolved": "https://registry.npmjs.org/postcss-discard-duplicates/-/postcss-discard-duplicates-4.0.2.tgz",
      "integrity": "sha512-ZNQfR1gPNAiXZhgENFfEglF93pciw0WxMkJeVmw8eF+JZBbMD7jp6C67GqJAXVZP2BWbOztKfbsdmMp/k8c6oQ==",
      "requires": {
        "postcss": "^7.0.0"
      }
    },
    "postcss-discard-empty": {
      "version": "4.0.1",
      "resolved": "https://registry.npmjs.org/postcss-discard-empty/-/postcss-discard-empty-4.0.1.tgz",
      "integrity": "sha512-B9miTzbznhDjTfjvipfHoqbWKwd0Mj+/fL5s1QOz06wufguil+Xheo4XpOnc4NqKYBCNqqEzgPv2aPBIJLox0w==",
      "requires": {
        "postcss": "^7.0.0"
      }
    },
    "postcss-discard-overridden": {
      "version": "4.0.1",
      "resolved": "https://registry.npmjs.org/postcss-discard-overridden/-/postcss-discard-overridden-4.0.1.tgz",
      "integrity": "sha512-IYY2bEDD7g1XM1IDEsUT4//iEYCxAmP5oDSFMVU/JVvT7gh+l4fmjciLqGgwjdWpQIdb0Che2VX00QObS5+cTg==",
      "requires": {
        "postcss": "^7.0.0"
      }
    },
    "postcss-double-position-gradients": {
      "version": "1.0.0",
      "resolved": "https://registry.npmjs.org/postcss-double-position-gradients/-/postcss-double-position-gradients-1.0.0.tgz",
      "integrity": "sha512-G+nV8EnQq25fOI8CH/B6krEohGWnF5+3A6H/+JEpOncu5dCnkS1QQ6+ct3Jkaepw1NGVqqOZH6lqrm244mCftA==",
      "requires": {
        "postcss": "^7.0.5",
        "postcss-values-parser": "^2.0.0"
      }
    },
    "postcss-env-function": {
      "version": "2.0.2",
      "resolved": "https://registry.npmjs.org/postcss-env-function/-/postcss-env-function-2.0.2.tgz",
      "integrity": "sha512-rwac4BuZlITeUbiBq60h/xbLzXY43qOsIErngWa4l7Mt+RaSkT7QBjXVGTcBHupykkblHMDrBFh30zchYPaOUw==",
      "requires": {
        "postcss": "^7.0.2",
        "postcss-values-parser": "^2.0.0"
      }
    },
    "postcss-flexbugs-fixes": {
      "version": "4.1.0",
      "resolved": "https://registry.npmjs.org/postcss-flexbugs-fixes/-/postcss-flexbugs-fixes-4.1.0.tgz",
      "integrity": "sha512-jr1LHxQvStNNAHlgco6PzY308zvLklh7SJVYuWUwyUQncofaAlD2l+P/gxKHOdqWKe7xJSkVLFF/2Tp+JqMSZA==",
      "requires": {
        "postcss": "^7.0.0"
      }
    },
    "postcss-focus-visible": {
      "version": "4.0.0",
      "resolved": "https://registry.npmjs.org/postcss-focus-visible/-/postcss-focus-visible-4.0.0.tgz",
      "integrity": "sha512-Z5CkWBw0+idJHSV6+Bgf2peDOFf/x4o+vX/pwcNYrWpXFrSfTkQ3JQ1ojrq9yS+upnAlNRHeg8uEwFTgorjI8g==",
      "requires": {
        "postcss": "^7.0.2"
      }
    },
    "postcss-focus-within": {
      "version": "3.0.0",
      "resolved": "https://registry.npmjs.org/postcss-focus-within/-/postcss-focus-within-3.0.0.tgz",
      "integrity": "sha512-W0APui8jQeBKbCGZudW37EeMCjDeVxKgiYfIIEo8Bdh5SpB9sxds/Iq8SEuzS0Q4YFOlG7EPFulbbxujpkrV2w==",
      "requires": {
        "postcss": "^7.0.2"
      }
    },
    "postcss-font-variant": {
      "version": "4.0.0",
      "resolved": "https://registry.npmjs.org/postcss-font-variant/-/postcss-font-variant-4.0.0.tgz",
      "integrity": "sha512-M8BFYKOvCrI2aITzDad7kWuXXTm0YhGdP9Q8HanmN4EF1Hmcgs1KK5rSHylt/lUJe8yLxiSwWAHdScoEiIxztg==",
      "requires": {
        "postcss": "^7.0.2"
      }
    },
    "postcss-gap-properties": {
      "version": "2.0.0",
      "resolved": "https://registry.npmjs.org/postcss-gap-properties/-/postcss-gap-properties-2.0.0.tgz",
      "integrity": "sha512-QZSqDaMgXCHuHTEzMsS2KfVDOq7ZFiknSpkrPJY6jmxbugUPTuSzs/vuE5I3zv0WAS+3vhrlqhijiprnuQfzmg==",
      "requires": {
        "postcss": "^7.0.2"
      }
    },
    "postcss-image-set-function": {
      "version": "3.0.1",
      "resolved": "https://registry.npmjs.org/postcss-image-set-function/-/postcss-image-set-function-3.0.1.tgz",
      "integrity": "sha512-oPTcFFip5LZy8Y/whto91L9xdRHCWEMs3e1MdJxhgt4jy2WYXfhkng59fH5qLXSCPN8k4n94p1Czrfe5IOkKUw==",
      "requires": {
        "postcss": "^7.0.2",
        "postcss-values-parser": "^2.0.0"
      }
    },
    "postcss-initial": {
      "version": "3.0.1",
      "resolved": "https://registry.npmjs.org/postcss-initial/-/postcss-initial-3.0.1.tgz",
      "integrity": "sha512-I2Sz83ZSHybMNh02xQDK609lZ1/QOyYeuizCjzEhlMgeV/HcDJapQiH4yTqLjZss0X6/6VvKFXUeObaHpJoINw==",
      "requires": {
        "lodash.template": "^4.5.0",
        "postcss": "^7.0.2"
      }
    },
    "postcss-lab-function": {
      "version": "2.0.1",
      "resolved": "https://registry.npmjs.org/postcss-lab-function/-/postcss-lab-function-2.0.1.tgz",
      "integrity": "sha512-whLy1IeZKY+3fYdqQFuDBf8Auw+qFuVnChWjmxm/UhHWqNHZx+B99EwxTvGYmUBqe3Fjxs4L1BoZTJmPu6usVg==",
      "requires": {
        "@csstools/convert-colors": "^1.4.0",
        "postcss": "^7.0.2",
        "postcss-values-parser": "^2.0.0"
      }
    },
    "postcss-load-config": {
      "version": "2.1.0",
      "resolved": "https://registry.npmjs.org/postcss-load-config/-/postcss-load-config-2.1.0.tgz",
      "integrity": "sha512-4pV3JJVPLd5+RueiVVB+gFOAa7GWc25XQcMp86Zexzke69mKf6Nx9LRcQywdz7yZI9n1udOxmLuAwTBypypF8Q==",
      "requires": {
        "cosmiconfig": "^5.0.0",
        "import-cwd": "^2.0.0"
      }
    },
    "postcss-loader": {
      "version": "3.0.0",
      "resolved": "https://registry.npmjs.org/postcss-loader/-/postcss-loader-3.0.0.tgz",
      "integrity": "sha512-cLWoDEY5OwHcAjDnkyRQzAXfs2jrKjXpO/HQFcc5b5u/r7aa471wdmChmwfnv7x2u840iat/wi0lQ5nbRgSkUA==",
      "requires": {
        "loader-utils": "^1.1.0",
        "postcss": "^7.0.0",
        "postcss-load-config": "^2.0.0",
        "schema-utils": "^1.0.0"
      }
    },
    "postcss-logical": {
      "version": "3.0.0",
      "resolved": "https://registry.npmjs.org/postcss-logical/-/postcss-logical-3.0.0.tgz",
      "integrity": "sha512-1SUKdJc2vuMOmeItqGuNaC+N8MzBWFWEkAnRnLpFYj1tGGa7NqyVBujfRtgNa2gXR+6RkGUiB2O5Vmh7E2RmiA==",
      "requires": {
        "postcss": "^7.0.2"
      }
    },
    "postcss-media-minmax": {
      "version": "4.0.0",
      "resolved": "https://registry.npmjs.org/postcss-media-minmax/-/postcss-media-minmax-4.0.0.tgz",
      "integrity": "sha512-fo9moya6qyxsjbFAYl97qKO9gyre3qvbMnkOZeZwlsW6XYFsvs2DMGDlchVLfAd8LHPZDxivu/+qW2SMQeTHBw==",
      "requires": {
        "postcss": "^7.0.2"
      }
    },
    "postcss-merge-longhand": {
      "version": "4.0.11",
      "resolved": "https://registry.npmjs.org/postcss-merge-longhand/-/postcss-merge-longhand-4.0.11.tgz",
      "integrity": "sha512-alx/zmoeXvJjp7L4mxEMjh8lxVlDFX1gqWHzaaQewwMZiVhLo42TEClKaeHbRf6J7j82ZOdTJ808RtN0ZOZwvw==",
      "requires": {
        "css-color-names": "0.0.4",
        "postcss": "^7.0.0",
        "postcss-value-parser": "^3.0.0",
        "stylehacks": "^4.0.0"
      }
    },
    "postcss-merge-rules": {
      "version": "4.0.3",
      "resolved": "https://registry.npmjs.org/postcss-merge-rules/-/postcss-merge-rules-4.0.3.tgz",
      "integrity": "sha512-U7e3r1SbvYzO0Jr3UT/zKBVgYYyhAz0aitvGIYOYK5CPmkNih+WDSsS5tvPrJ8YMQYlEMvsZIiqmn7HdFUaeEQ==",
      "requires": {
        "browserslist": "^4.0.0",
        "caniuse-api": "^3.0.0",
        "cssnano-util-same-parent": "^4.0.0",
        "postcss": "^7.0.0",
        "postcss-selector-parser": "^3.0.0",
        "vendors": "^1.0.0"
      },
      "dependencies": {
        "postcss-selector-parser": {
          "version": "3.1.1",
          "resolved": "https://registry.npmjs.org/postcss-selector-parser/-/postcss-selector-parser-3.1.1.tgz",
          "integrity": "sha1-T4dfSvsMllc9XPTXQBGu4lCn6GU=",
          "requires": {
            "dot-prop": "^4.1.1",
            "indexes-of": "^1.0.1",
            "uniq": "^1.0.1"
          }
        }
      }
    },
    "postcss-minify-font-values": {
      "version": "4.0.2",
      "resolved": "https://registry.npmjs.org/postcss-minify-font-values/-/postcss-minify-font-values-4.0.2.tgz",
      "integrity": "sha512-j85oO6OnRU9zPf04+PZv1LYIYOprWm6IA6zkXkrJXyRveDEuQggG6tvoy8ir8ZwjLxLuGfNkCZEQG7zan+Hbtg==",
      "requires": {
        "postcss": "^7.0.0",
        "postcss-value-parser": "^3.0.0"
      }
    },
    "postcss-minify-gradients": {
      "version": "4.0.2",
      "resolved": "https://registry.npmjs.org/postcss-minify-gradients/-/postcss-minify-gradients-4.0.2.tgz",
      "integrity": "sha512-qKPfwlONdcf/AndP1U8SJ/uzIJtowHlMaSioKzebAXSG4iJthlWC9iSWznQcX4f66gIWX44RSA841HTHj3wK+Q==",
      "requires": {
        "cssnano-util-get-arguments": "^4.0.0",
        "is-color-stop": "^1.0.0",
        "postcss": "^7.0.0",
        "postcss-value-parser": "^3.0.0"
      }
    },
    "postcss-minify-params": {
      "version": "4.0.2",
      "resolved": "https://registry.npmjs.org/postcss-minify-params/-/postcss-minify-params-4.0.2.tgz",
      "integrity": "sha512-G7eWyzEx0xL4/wiBBJxJOz48zAKV2WG3iZOqVhPet/9geefm/Px5uo1fzlHu+DOjT+m0Mmiz3jkQzVHe6wxAWg==",
      "requires": {
        "alphanum-sort": "^1.0.0",
        "browserslist": "^4.0.0",
        "cssnano-util-get-arguments": "^4.0.0",
        "postcss": "^7.0.0",
        "postcss-value-parser": "^3.0.0",
        "uniqs": "^2.0.0"
      }
    },
    "postcss-minify-selectors": {
      "version": "4.0.2",
      "resolved": "https://registry.npmjs.org/postcss-minify-selectors/-/postcss-minify-selectors-4.0.2.tgz",
      "integrity": "sha512-D5S1iViljXBj9kflQo4YutWnJmwm8VvIsU1GeXJGiG9j8CIg9zs4voPMdQDUmIxetUOh60VilsNzCiAFTOqu3g==",
      "requires": {
        "alphanum-sort": "^1.0.0",
        "has": "^1.0.0",
        "postcss": "^7.0.0",
        "postcss-selector-parser": "^3.0.0"
      },
      "dependencies": {
        "postcss-selector-parser": {
          "version": "3.1.1",
          "resolved": "https://registry.npmjs.org/postcss-selector-parser/-/postcss-selector-parser-3.1.1.tgz",
          "integrity": "sha1-T4dfSvsMllc9XPTXQBGu4lCn6GU=",
          "requires": {
            "dot-prop": "^4.1.1",
            "indexes-of": "^1.0.1",
            "uniq": "^1.0.1"
          }
        }
      }
    },
    "postcss-modules-extract-imports": {
      "version": "2.0.0",
      "resolved": "https://registry.npmjs.org/postcss-modules-extract-imports/-/postcss-modules-extract-imports-2.0.0.tgz",
      "integrity": "sha512-LaYLDNS4SG8Q5WAWqIJgdHPJrDDr/Lv775rMBFUbgjTz6j34lUznACHcdRWroPvXANP2Vj7yNK57vp9eFqzLWQ==",
      "requires": {
        "postcss": "^7.0.5"
      }
    },
    "postcss-modules-local-by-default": {
      "version": "2.0.6",
      "resolved": "https://registry.npmjs.org/postcss-modules-local-by-default/-/postcss-modules-local-by-default-2.0.6.tgz",
      "integrity": "sha512-oLUV5YNkeIBa0yQl7EYnxMgy4N6noxmiwZStaEJUSe2xPMcdNc8WmBQuQCx18H5psYbVxz8zoHk0RAAYZXP9gA==",
      "requires": {
        "postcss": "^7.0.6",
        "postcss-selector-parser": "^6.0.0",
        "postcss-value-parser": "^3.3.1"
      }
    },
    "postcss-modules-scope": {
      "version": "2.1.0",
      "resolved": "https://registry.npmjs.org/postcss-modules-scope/-/postcss-modules-scope-2.1.0.tgz",
      "integrity": "sha512-91Rjps0JnmtUB0cujlc8KIKCsJXWjzuxGeT/+Q2i2HXKZ7nBUeF9YQTZZTNvHVoNYj1AthsjnGLtqDUE0Op79A==",
      "requires": {
        "postcss": "^7.0.6",
        "postcss-selector-parser": "^6.0.0"
      }
    },
    "postcss-modules-values": {
      "version": "2.0.0",
      "resolved": "https://registry.npmjs.org/postcss-modules-values/-/postcss-modules-values-2.0.0.tgz",
      "integrity": "sha512-Ki7JZa7ff1N3EIMlPnGTZfUMe69FFwiQPnVSXC9mnn3jozCRBYIxiZd44yJOV2AmabOo4qFf8s0dC/+lweG7+w==",
      "requires": {
        "icss-replace-symbols": "^1.1.0",
        "postcss": "^7.0.6"
      }
    },
    "postcss-nesting": {
      "version": "7.0.1",
      "resolved": "https://registry.npmjs.org/postcss-nesting/-/postcss-nesting-7.0.1.tgz",
      "integrity": "sha512-FrorPb0H3nuVq0Sff7W2rnc3SmIcruVC6YwpcS+k687VxyxO33iE1amna7wHuRVzM8vfiYofXSBHNAZ3QhLvYg==",
      "requires": {
        "postcss": "^7.0.2"
      }
    },
    "postcss-normalize": {
      "version": "7.0.1",
      "resolved": "https://registry.npmjs.org/postcss-normalize/-/postcss-normalize-7.0.1.tgz",
      "integrity": "sha512-NOp1fwrG+6kVXWo7P9SizCHX6QvioxFD/hZcI2MLxPmVnFJFC0j0DDpIuNw2tUDeCFMni59gCVgeJ1/hYhj2OQ==",
      "requires": {
        "@csstools/normalize.css": "^9.0.1",
        "browserslist": "^4.1.1",
        "postcss": "^7.0.2",
        "postcss-browser-comments": "^2.0.0"
      }
    },
    "postcss-normalize-charset": {
      "version": "4.0.1",
      "resolved": "https://registry.npmjs.org/postcss-normalize-charset/-/postcss-normalize-charset-4.0.1.tgz",
      "integrity": "sha512-gMXCrrlWh6G27U0hF3vNvR3w8I1s2wOBILvA87iNXaPvSNo5uZAMYsZG7XjCUf1eVxuPfyL4TJ7++SGZLc9A3g==",
      "requires": {
        "postcss": "^7.0.0"
      }
    },
    "postcss-normalize-display-values": {
      "version": "4.0.2",
      "resolved": "https://registry.npmjs.org/postcss-normalize-display-values/-/postcss-normalize-display-values-4.0.2.tgz",
      "integrity": "sha512-3F2jcsaMW7+VtRMAqf/3m4cPFhPD3EFRgNs18u+k3lTJJlVe7d0YPO+bnwqo2xg8YiRpDXJI2u8A0wqJxMsQuQ==",
      "requires": {
        "cssnano-util-get-match": "^4.0.0",
        "postcss": "^7.0.0",
        "postcss-value-parser": "^3.0.0"
      }
    },
    "postcss-normalize-positions": {
      "version": "4.0.2",
      "resolved": "https://registry.npmjs.org/postcss-normalize-positions/-/postcss-normalize-positions-4.0.2.tgz",
      "integrity": "sha512-Dlf3/9AxpxE+NF1fJxYDeggi5WwV35MXGFnnoccP/9qDtFrTArZ0D0R+iKcg5WsUd8nUYMIl8yXDCtcrT8JrdA==",
      "requires": {
        "cssnano-util-get-arguments": "^4.0.0",
        "has": "^1.0.0",
        "postcss": "^7.0.0",
        "postcss-value-parser": "^3.0.0"
      }
    },
    "postcss-normalize-repeat-style": {
      "version": "4.0.2",
      "resolved": "https://registry.npmjs.org/postcss-normalize-repeat-style/-/postcss-normalize-repeat-style-4.0.2.tgz",
      "integrity": "sha512-qvigdYYMpSuoFs3Is/f5nHdRLJN/ITA7huIoCyqqENJe9PvPmLhNLMu7QTjPdtnVf6OcYYO5SHonx4+fbJE1+Q==",
      "requires": {
        "cssnano-util-get-arguments": "^4.0.0",
        "cssnano-util-get-match": "^4.0.0",
        "postcss": "^7.0.0",
        "postcss-value-parser": "^3.0.0"
      }
    },
    "postcss-normalize-string": {
      "version": "4.0.2",
      "resolved": "https://registry.npmjs.org/postcss-normalize-string/-/postcss-normalize-string-4.0.2.tgz",
      "integrity": "sha512-RrERod97Dnwqq49WNz8qo66ps0swYZDSb6rM57kN2J+aoyEAJfZ6bMx0sx/F9TIEX0xthPGCmeyiam/jXif0eA==",
      "requires": {
        "has": "^1.0.0",
        "postcss": "^7.0.0",
        "postcss-value-parser": "^3.0.0"
      }
    },
    "postcss-normalize-timing-functions": {
      "version": "4.0.2",
      "resolved": "https://registry.npmjs.org/postcss-normalize-timing-functions/-/postcss-normalize-timing-functions-4.0.2.tgz",
      "integrity": "sha512-acwJY95edP762e++00Ehq9L4sZCEcOPyaHwoaFOhIwWCDfik6YvqsYNxckee65JHLKzuNSSmAdxwD2Cud1Z54A==",
      "requires": {
        "cssnano-util-get-match": "^4.0.0",
        "postcss": "^7.0.0",
        "postcss-value-parser": "^3.0.0"
      }
    },
    "postcss-normalize-unicode": {
      "version": "4.0.1",
      "resolved": "https://registry.npmjs.org/postcss-normalize-unicode/-/postcss-normalize-unicode-4.0.1.tgz",
      "integrity": "sha512-od18Uq2wCYn+vZ/qCOeutvHjB5jm57ToxRaMeNuf0nWVHaP9Hua56QyMF6fs/4FSUnVIw0CBPsU0K4LnBPwYwg==",
      "requires": {
        "browserslist": "^4.0.0",
        "postcss": "^7.0.0",
        "postcss-value-parser": "^3.0.0"
      }
    },
    "postcss-normalize-url": {
      "version": "4.0.1",
      "resolved": "https://registry.npmjs.org/postcss-normalize-url/-/postcss-normalize-url-4.0.1.tgz",
      "integrity": "sha512-p5oVaF4+IHwu7VpMan/SSpmpYxcJMtkGppYf0VbdH5B6hN8YNmVyJLuY9FmLQTzY3fag5ESUUHDqM+heid0UVA==",
      "requires": {
        "is-absolute-url": "^2.0.0",
        "normalize-url": "^3.0.0",
        "postcss": "^7.0.0",
        "postcss-value-parser": "^3.0.0"
      }
    },
    "postcss-normalize-whitespace": {
      "version": "4.0.2",
      "resolved": "https://registry.npmjs.org/postcss-normalize-whitespace/-/postcss-normalize-whitespace-4.0.2.tgz",
      "integrity": "sha512-tO8QIgrsI3p95r8fyqKV+ufKlSHh9hMJqACqbv2XknufqEDhDvbguXGBBqxw9nsQoXWf0qOqppziKJKHMD4GtA==",
      "requires": {
        "postcss": "^7.0.0",
        "postcss-value-parser": "^3.0.0"
      }
    },
    "postcss-ordered-values": {
      "version": "4.1.2",
      "resolved": "https://registry.npmjs.org/postcss-ordered-values/-/postcss-ordered-values-4.1.2.tgz",
      "integrity": "sha512-2fCObh5UanxvSxeXrtLtlwVThBvHn6MQcu4ksNT2tsaV2Fg76R2CV98W7wNSlX+5/pFwEyaDwKLLoEV7uRybAw==",
      "requires": {
        "cssnano-util-get-arguments": "^4.0.0",
        "postcss": "^7.0.0",
        "postcss-value-parser": "^3.0.0"
      }
    },
    "postcss-overflow-shorthand": {
      "version": "2.0.0",
      "resolved": "https://registry.npmjs.org/postcss-overflow-shorthand/-/postcss-overflow-shorthand-2.0.0.tgz",
      "integrity": "sha512-aK0fHc9CBNx8jbzMYhshZcEv8LtYnBIRYQD5i7w/K/wS9c2+0NSR6B3OVMu5y0hBHYLcMGjfU+dmWYNKH0I85g==",
      "requires": {
        "postcss": "^7.0.2"
      }
    },
    "postcss-page-break": {
      "version": "2.0.0",
      "resolved": "https://registry.npmjs.org/postcss-page-break/-/postcss-page-break-2.0.0.tgz",
      "integrity": "sha512-tkpTSrLpfLfD9HvgOlJuigLuk39wVTbbd8RKcy8/ugV2bNBUW3xU+AIqyxhDrQr1VUj1RmyJrBn1YWrqUm9zAQ==",
      "requires": {
        "postcss": "^7.0.2"
      }
    },
    "postcss-place": {
      "version": "4.0.1",
      "resolved": "https://registry.npmjs.org/postcss-place/-/postcss-place-4.0.1.tgz",
      "integrity": "sha512-Zb6byCSLkgRKLODj/5mQugyuj9bvAAw9LqJJjgwz5cYryGeXfFZfSXoP1UfveccFmeq0b/2xxwcTEVScnqGxBg==",
      "requires": {
        "postcss": "^7.0.2",
        "postcss-values-parser": "^2.0.0"
      }
    },
    "postcss-preset-env": {
      "version": "6.6.0",
      "resolved": "https://registry.npmjs.org/postcss-preset-env/-/postcss-preset-env-6.6.0.tgz",
      "integrity": "sha512-I3zAiycfqXpPIFD6HXhLfWXIewAWO8emOKz+QSsxaUZb9Dp8HbF5kUf+4Wy/AxR33o+LRoO8blEWCHth0ZsCLA==",
      "requires": {
        "autoprefixer": "^9.4.9",
        "browserslist": "^4.4.2",
        "caniuse-lite": "^1.0.30000939",
        "css-blank-pseudo": "^0.1.4",
        "css-has-pseudo": "^0.10.0",
        "css-prefers-color-scheme": "^3.1.1",
        "cssdb": "^4.3.0",
        "postcss": "^7.0.14",
        "postcss-attribute-case-insensitive": "^4.0.1",
        "postcss-color-functional-notation": "^2.0.1",
        "postcss-color-gray": "^5.0.0",
        "postcss-color-hex-alpha": "^5.0.2",
        "postcss-color-mod-function": "^3.0.3",
        "postcss-color-rebeccapurple": "^4.0.1",
        "postcss-custom-media": "^7.0.7",
        "postcss-custom-properties": "^8.0.9",
        "postcss-custom-selectors": "^5.1.2",
        "postcss-dir-pseudo-class": "^5.0.0",
        "postcss-double-position-gradients": "^1.0.0",
        "postcss-env-function": "^2.0.2",
        "postcss-focus-visible": "^4.0.0",
        "postcss-focus-within": "^3.0.0",
        "postcss-font-variant": "^4.0.0",
        "postcss-gap-properties": "^2.0.0",
        "postcss-image-set-function": "^3.0.1",
        "postcss-initial": "^3.0.0",
        "postcss-lab-function": "^2.0.1",
        "postcss-logical": "^3.0.0",
        "postcss-media-minmax": "^4.0.0",
        "postcss-nesting": "^7.0.0",
        "postcss-overflow-shorthand": "^2.0.0",
        "postcss-page-break": "^2.0.0",
        "postcss-place": "^4.0.1",
        "postcss-pseudo-class-any-link": "^6.0.0",
        "postcss-replace-overflow-wrap": "^3.0.0",
        "postcss-selector-matches": "^4.0.0",
        "postcss-selector-not": "^4.0.0"
      }
    },
    "postcss-pseudo-class-any-link": {
      "version": "6.0.0",
      "resolved": "https://registry.npmjs.org/postcss-pseudo-class-any-link/-/postcss-pseudo-class-any-link-6.0.0.tgz",
      "integrity": "sha512-lgXW9sYJdLqtmw23otOzrtbDXofUdfYzNm4PIpNE322/swES3VU9XlXHeJS46zT2onFO7V1QFdD4Q9LiZj8mew==",
      "requires": {
        "postcss": "^7.0.2",
        "postcss-selector-parser": "^5.0.0-rc.3"
      },
      "dependencies": {
        "cssesc": {
          "version": "2.0.0",
          "resolved": "https://registry.npmjs.org/cssesc/-/cssesc-2.0.0.tgz",
          "integrity": "sha512-MsCAG1z9lPdoO/IUMLSBWBSVxVtJ1395VGIQ+Fc2gNdkQ1hNDnQdw3YhA71WJCBW1vdwA0cAnk/DnW6bqoEUYg=="
        },
        "postcss-selector-parser": {
          "version": "5.0.0",
          "resolved": "https://registry.npmjs.org/postcss-selector-parser/-/postcss-selector-parser-5.0.0.tgz",
          "integrity": "sha512-w+zLE5Jhg6Liz8+rQOWEAwtwkyqpfnmsinXjXg6cY7YIONZZtgvE0v2O0uhQBs0peNomOJwWRKt6JBfTdTd3OQ==",
          "requires": {
            "cssesc": "^2.0.0",
            "indexes-of": "^1.0.1",
            "uniq": "^1.0.1"
          }
        }
      }
    },
    "postcss-reduce-initial": {
      "version": "4.0.3",
      "resolved": "https://registry.npmjs.org/postcss-reduce-initial/-/postcss-reduce-initial-4.0.3.tgz",
      "integrity": "sha512-gKWmR5aUulSjbzOfD9AlJiHCGH6AEVLaM0AV+aSioxUDd16qXP1PCh8d1/BGVvpdWn8k/HiK7n6TjeoXN1F7DA==",
      "requires": {
        "browserslist": "^4.0.0",
        "caniuse-api": "^3.0.0",
        "has": "^1.0.0",
        "postcss": "^7.0.0"
      }
    },
    "postcss-reduce-transforms": {
      "version": "4.0.2",
      "resolved": "https://registry.npmjs.org/postcss-reduce-transforms/-/postcss-reduce-transforms-4.0.2.tgz",
      "integrity": "sha512-EEVig1Q2QJ4ELpJXMZR8Vt5DQx8/mo+dGWSR7vWXqcob2gQLyQGsionYcGKATXvQzMPn6DSN1vTN7yFximdIAg==",
      "requires": {
        "cssnano-util-get-match": "^4.0.0",
        "has": "^1.0.0",
        "postcss": "^7.0.0",
        "postcss-value-parser": "^3.0.0"
      }
    },
    "postcss-replace-overflow-wrap": {
      "version": "3.0.0",
      "resolved": "https://registry.npmjs.org/postcss-replace-overflow-wrap/-/postcss-replace-overflow-wrap-3.0.0.tgz",
      "integrity": "sha512-2T5hcEHArDT6X9+9dVSPQdo7QHzG4XKclFT8rU5TzJPDN7RIRTbO9c4drUISOVemLj03aezStHCR2AIcr8XLpw==",
      "requires": {
        "postcss": "^7.0.2"
      }
    },
    "postcss-safe-parser": {
      "version": "4.0.1",
      "resolved": "https://registry.npmjs.org/postcss-safe-parser/-/postcss-safe-parser-4.0.1.tgz",
      "integrity": "sha512-xZsFA3uX8MO3yAda03QrG3/Eg1LN3EPfjjf07vke/46HERLZyHrTsQ9E1r1w1W//fWEhtYNndo2hQplN2cVpCQ==",
      "requires": {
        "postcss": "^7.0.0"
      }
    },
    "postcss-selector-matches": {
      "version": "4.0.0",
      "resolved": "https://registry.npmjs.org/postcss-selector-matches/-/postcss-selector-matches-4.0.0.tgz",
      "integrity": "sha512-LgsHwQR/EsRYSqlwdGzeaPKVT0Ml7LAT6E75T8W8xLJY62CE4S/l03BWIt3jT8Taq22kXP08s2SfTSzaraoPww==",
      "requires": {
        "balanced-match": "^1.0.0",
        "postcss": "^7.0.2"
      }
    },
    "postcss-selector-not": {
      "version": "4.0.0",
      "resolved": "https://registry.npmjs.org/postcss-selector-not/-/postcss-selector-not-4.0.0.tgz",
      "integrity": "sha512-W+bkBZRhqJaYN8XAnbbZPLWMvZD1wKTu0UxtFKdhtGjWYmxhkUneoeOhRJKdAE5V7ZTlnbHfCR+6bNwK9e1dTQ==",
      "requires": {
        "balanced-match": "^1.0.0",
        "postcss": "^7.0.2"
      }
    },
    "postcss-selector-parser": {
      "version": "6.0.2",
      "resolved": "https://registry.npmjs.org/postcss-selector-parser/-/postcss-selector-parser-6.0.2.tgz",
      "integrity": "sha512-36P2QR59jDTOAiIkqEprfJDsoNrvwFei3eCqKd1Y0tUsBimsq39BLp7RD+JWny3WgB1zGhJX8XVePwm9k4wdBg==",
      "requires": {
        "cssesc": "^3.0.0",
        "indexes-of": "^1.0.1",
        "uniq": "^1.0.1"
      }
    },
    "postcss-svgo": {
      "version": "4.0.2",
      "resolved": "https://registry.npmjs.org/postcss-svgo/-/postcss-svgo-4.0.2.tgz",
      "integrity": "sha512-C6wyjo3VwFm0QgBy+Fu7gCYOkCmgmClghO+pjcxvrcBKtiKt0uCF+hvbMO1fyv5BMImRK90SMb+dwUnfbGd+jw==",
      "requires": {
        "is-svg": "^3.0.0",
        "postcss": "^7.0.0",
        "postcss-value-parser": "^3.0.0",
        "svgo": "^1.0.0"
      }
    },
    "postcss-unique-selectors": {
      "version": "4.0.1",
      "resolved": "https://registry.npmjs.org/postcss-unique-selectors/-/postcss-unique-selectors-4.0.1.tgz",
      "integrity": "sha512-+JanVaryLo9QwZjKrmJgkI4Fn8SBgRO6WXQBJi7KiAVPlmxikB5Jzc4EvXMT2H0/m0RjrVVm9rGNhZddm/8Spg==",
      "requires": {
        "alphanum-sort": "^1.0.0",
        "postcss": "^7.0.0",
        "uniqs": "^2.0.0"
      }
    },
    "postcss-value-parser": {
      "version": "3.3.1",
      "resolved": "https://registry.npmjs.org/postcss-value-parser/-/postcss-value-parser-3.3.1.tgz",
      "integrity": "sha512-pISE66AbVkp4fDQ7VHBwRNXzAAKJjw4Vw7nWI/+Q3vuly7SNfgYXvm6i5IgFylHGK5sP/xHAbB7N49OS4gWNyQ=="
    },
    "postcss-values-parser": {
      "version": "2.0.1",
      "resolved": "https://registry.npmjs.org/postcss-values-parser/-/postcss-values-parser-2.0.1.tgz",
      "integrity": "sha512-2tLuBsA6P4rYTNKCXYG/71C7j1pU6pK503suYOmn4xYrQIzW+opD+7FAFNuGSdZC/3Qfy334QbeMu7MEb8gOxg==",
      "requires": {
        "flatten": "^1.0.2",
        "indexes-of": "^1.0.1",
        "uniq": "^1.0.1"
      }
    },
    "prelude-ls": {
      "version": "1.1.2",
      "resolved": "https://registry.npmjs.org/prelude-ls/-/prelude-ls-1.1.2.tgz",
      "integrity": "sha1-IZMqVJ9eUv/ZqCf1cOBL5iqX2lQ="
    },
    "prepend-http": {
      "version": "1.0.4",
      "resolved": "https://registry.npmjs.org/prepend-http/-/prepend-http-1.0.4.tgz",
      "integrity": "sha1-1PRWKwzjaW5BrFLQ4ALlemNdxtw="
    },
    "pretty-bytes": {
      "version": "5.3.0",
      "resolved": "https://registry.npmjs.org/pretty-bytes/-/pretty-bytes-5.3.0.tgz",
      "integrity": "sha512-hjGrh+P926p4R4WbaB6OckyRtO0F0/lQBiT+0gnxjV+5kjPBrfVBFCsCLbMqVQeydvIoouYTCmmEURiH3R1Bdg=="
    },
    "pretty-error": {
      "version": "2.1.1",
      "resolved": "https://registry.npmjs.org/pretty-error/-/pretty-error-2.1.1.tgz",
      "integrity": "sha1-X0+HyPkeWuPzuoerTPXgOxoX8aM=",
      "requires": {
        "renderkid": "^2.0.1",
        "utila": "~0.4"
      }
    },
    "pretty-format": {
      "version": "24.9.0",
      "resolved": "https://registry.npmjs.org/pretty-format/-/pretty-format-24.9.0.tgz",
      "integrity": "sha512-00ZMZUiHaJrNfk33guavqgvfJS30sLYf0f8+Srklv0AMPodGGHcoHgksZ3OThYnIvOd+8yMCn0YiEOogjlgsnA==",
      "requires": {
        "@jest/types": "^24.9.0",
        "ansi-regex": "^4.0.0",
        "ansi-styles": "^3.2.0",
        "react-is": "^16.8.4"
      },
      "dependencies": {
        "ansi-regex": {
          "version": "4.1.0",
          "resolved": "https://registry.npmjs.org/ansi-regex/-/ansi-regex-4.1.0.tgz",
          "integrity": "sha512-1apePfXM1UOSqw0o9IiFAovVz9M5S1Dg+4TrDwfMewQ6p/rmMueb7tWZjQ1rx4Loy1ArBggoqGpfqqdI4rondg=="
        },
        "ansi-styles": {
          "version": "3.2.1",
          "resolved": "https://registry.npmjs.org/ansi-styles/-/ansi-styles-3.2.1.tgz",
          "integrity": "sha512-VT0ZI6kZRdTh8YyJw3SMbYm/u+NqfsAxEpWO0Pf9sq8/e94WxxOpPKx9FR1FlyCtOVDNOQ+8ntlqFxiRc+r5qA==",
          "requires": {
            "color-convert": "^1.9.0"
          }
        }
      }
    },
    "private": {
      "version": "0.1.8",
      "resolved": "https://registry.npmjs.org/private/-/private-0.1.8.tgz",
      "integrity": "sha512-VvivMrbvd2nKkiG38qjULzlc+4Vx4wm/whI9pQD35YrARNnhxeiRktSOhSukRLFNlzg6Br/cJPet5J/u19r/mg=="
    },
    "process": {
      "version": "0.11.10",
      "resolved": "https://registry.npmjs.org/process/-/process-0.11.10.tgz",
      "integrity": "sha1-czIwDoQBYb2j5podHZGn1LwW8YI="
    },
    "process-nextick-args": {
      "version": "2.0.1",
      "resolved": "https://registry.npmjs.org/process-nextick-args/-/process-nextick-args-2.0.1.tgz",
      "integrity": "sha512-3ouUOpQhtgrbOa17J7+uxOTpITYWaGP7/AhoR3+A+/1e9skrzelGi/dXzEYyvbxubEF6Wn2ypscTKiKJFFn1ag=="
    },
    "progress": {
      "version": "2.0.3",
      "resolved": "https://registry.npmjs.org/progress/-/progress-2.0.3.tgz",
      "integrity": "sha512-7PiHtLll5LdnKIMw100I+8xJXR5gW2QwWYkT6iJva0bXitZKa/XMrSbdmg3r2Xnaidz9Qumd0VPaMrZlF9V9sA=="
    },
    "promise": {
      "version": "8.0.3",
      "resolved": "https://registry.npmjs.org/promise/-/promise-8.0.3.tgz",
      "integrity": "sha512-HeRDUL1RJiLhyA0/grn+PTShlBAcLuh/1BJGtrvjwbvRDCTLLMEz9rOGCV+R3vHY4MixIuoMEd9Yq/XvsTPcjw==",
      "requires": {
        "asap": "~2.0.6"
      }
    },
    "promise-inflight": {
      "version": "1.0.1",
      "resolved": "https://registry.npmjs.org/promise-inflight/-/promise-inflight-1.0.1.tgz",
      "integrity": "sha1-mEcocL8igTL8vdhoEputEsPAKeM="
    },
    "promise-polyfill": {
      "version": "8.1.0",
      "resolved": "https://registry.npmjs.org/promise-polyfill/-/promise-polyfill-8.1.0.tgz",
      "integrity": "sha512-OzSf6gcCUQ01byV4BgwyUCswlaQQ6gzXc23aLQWhicvfX9kfsUiUhgt3CCQej8jDnl8/PhGF31JdHX2/MzF3WA=="
    },
    "prompts": {
      "version": "2.2.1",
      "resolved": "https://registry.npmjs.org/prompts/-/prompts-2.2.1.tgz",
      "integrity": "sha512-VObPvJiWPhpZI6C5m60XOzTfnYg/xc/an+r9VYymj9WJW3B/DIH+REzjpAACPf8brwPeP+7vz3bIim3S+AaMjw==",
      "requires": {
        "kleur": "^3.0.3",
        "sisteransi": "^1.0.3"
      }
    },
    "prop-types": {
      "version": "15.7.2",
      "resolved": "https://registry.npmjs.org/prop-types/-/prop-types-15.7.2.tgz",
      "integrity": "sha512-8QQikdH7//R2vurIJSutZ1smHYTcLpRWEOlHnzcWHmBYrOGUysKwSsrC89BCiFj3CbrfJ/nXFdJepOVrY1GCHQ==",
      "requires": {
        "loose-envify": "^1.4.0",
        "object-assign": "^4.1.1",
        "react-is": "^16.8.1"
      }
    },
    "protobufjs": {
      "version": "6.8.8",
      "resolved": "https://registry.npmjs.org/protobufjs/-/protobufjs-6.8.8.tgz",
      "integrity": "sha512-AAmHtD5pXgZfi7GMpllpO3q1Xw1OYldr+dMUlAnffGTAhqkg72WdmSY71uKBF/JuyiKs8psYbtKrhi0ASCD8qw==",
      "requires": {
        "@protobufjs/aspromise": "^1.1.2",
        "@protobufjs/base64": "^1.1.2",
        "@protobufjs/codegen": "^2.0.4",
        "@protobufjs/eventemitter": "^1.1.0",
        "@protobufjs/fetch": "^1.1.0",
        "@protobufjs/float": "^1.0.2",
        "@protobufjs/inquire": "^1.1.0",
        "@protobufjs/path": "^1.1.2",
        "@protobufjs/pool": "^1.1.0",
        "@protobufjs/utf8": "^1.1.0",
        "@types/long": "^4.0.0",
        "@types/node": "^10.1.0",
        "long": "^4.0.0"
      }
    },
    "proxy-addr": {
      "version": "2.0.5",
      "resolved": "https://registry.npmjs.org/proxy-addr/-/proxy-addr-2.0.5.tgz",
      "integrity": "sha512-t/7RxHXPH6cJtP0pRG6smSr9QJidhB+3kXu0KgXnbGYMgzEnUxRQ4/LDdfOwZEMyIh3/xHb8PX3t+lfL9z+YVQ==",
      "requires": {
        "forwarded": "~0.1.2",
        "ipaddr.js": "1.9.0"
      }
    },
    "prr": {
      "version": "1.0.1",
      "resolved": "https://registry.npmjs.org/prr/-/prr-1.0.1.tgz",
      "integrity": "sha1-0/wRS6BplaRexok/SEzrHXj19HY="
    },
    "pseudomap": {
      "version": "1.0.2",
      "resolved": "https://registry.npmjs.org/pseudomap/-/pseudomap-1.0.2.tgz",
      "integrity": "sha1-8FKijacOYYkX7wqKw0wa5aaChrM="
    },
    "psl": {
      "version": "1.3.0",
      "resolved": "https://registry.npmjs.org/psl/-/psl-1.3.0.tgz",
      "integrity": "sha512-avHdspHO+9rQTLbv1RO+MPYeP/SzsCoxofjVnHanETfQhTJrmB0HlDoW+EiN/R+C0BZ+gERab9NY0lPN2TxNag=="
    },
    "public-encrypt": {
      "version": "4.0.3",
      "resolved": "https://registry.npmjs.org/public-encrypt/-/public-encrypt-4.0.3.tgz",
      "integrity": "sha512-zVpa8oKZSz5bTMTFClc1fQOnyyEzpl5ozpi1B5YcvBrdohMjH2rfsBtyXcuNuwjsDIXmBYlF2N5FlJYhR29t8Q==",
      "requires": {
        "bn.js": "^4.1.0",
        "browserify-rsa": "^4.0.0",
        "create-hash": "^1.1.0",
        "parse-asn1": "^5.0.0",
        "randombytes": "^2.0.1",
        "safe-buffer": "^5.1.2"
      }
    },
    "pump": {
      "version": "3.0.0",
      "resolved": "https://registry.npmjs.org/pump/-/pump-3.0.0.tgz",
      "integrity": "sha512-LwZy+p3SFs1Pytd/jYct4wpv49HiYCqd9Rlc5ZVdk0V+8Yzv6jR5Blk3TRmPL1ft69TxP0IMZGJ+WPFU2BFhww==",
      "requires": {
        "end-of-stream": "^1.1.0",
        "once": "^1.3.1"
      }
    },
    "pumpify": {
      "version": "1.5.1",
      "resolved": "https://registry.npmjs.org/pumpify/-/pumpify-1.5.1.tgz",
      "integrity": "sha512-oClZI37HvuUJJxSKKrC17bZ9Cu0ZYhEAGPsPUy9KlMUmv9dKX2o77RUmq7f3XjIxbwyGwYzbzQ1L2Ks8sIradQ==",
      "requires": {
        "duplexify": "^3.6.0",
        "inherits": "^2.0.3",
        "pump": "^2.0.0"
      },
      "dependencies": {
        "pump": {
          "version": "2.0.1",
          "resolved": "https://registry.npmjs.org/pump/-/pump-2.0.1.tgz",
          "integrity": "sha512-ruPMNRkN3MHP1cWJc9OWr+T/xDP0jhXYCLfJcBuX54hhfIBnaQmAUMfDcG4DM5UMWByBbJY69QSphm3jtDKIkA==",
          "requires": {
            "end-of-stream": "^1.1.0",
            "once": "^1.3.1"
          }
        }
      }
    },
    "punycode": {
      "version": "2.1.1",
      "resolved": "https://registry.npmjs.org/punycode/-/punycode-2.1.1.tgz",
      "integrity": "sha512-XRsRjdf+j5ml+y/6GKHPZbrF/8p2Yga0JPtdqTIY2Xe5ohJPD9saDJJLPvp9+NSBprVvevdXZybnj2cv8OEd0A=="
    },
    "q": {
      "version": "1.5.1",
      "resolved": "https://registry.npmjs.org/q/-/q-1.5.1.tgz",
      "integrity": "sha1-fjL3W0E4EpHQRhHxvxQQmsAGUdc="
    },
    "qs": {
      "version": "6.7.0",
      "resolved": "https://registry.npmjs.org/qs/-/qs-6.7.0.tgz",
      "integrity": "sha512-VCdBRNFTX1fyE7Nb6FYoURo/SPe62QCaAyzJvUjwRaIsc+NePBEniHlvxFmmX56+HZphIGtV0XeCirBtpDrTyQ=="
    },
    "querystring": {
      "version": "0.2.0",
      "resolved": "https://registry.npmjs.org/querystring/-/querystring-0.2.0.tgz",
      "integrity": "sha1-sgmEkgO7Jd+CDadW50cAWHhSFiA="
    },
    "querystring-es3": {
      "version": "0.2.1",
      "resolved": "https://registry.npmjs.org/querystring-es3/-/querystring-es3-0.2.1.tgz",
      "integrity": "sha1-nsYfeQSYdXB9aUFFlv2Qek1xHnM="
    },
    "querystringify": {
      "version": "2.1.1",
      "resolved": "https://registry.npmjs.org/querystringify/-/querystringify-2.1.1.tgz",
      "integrity": "sha512-w7fLxIRCRT7U8Qu53jQnJyPkYZIaR4n5151KMfcJlO/A9397Wxb1amJvROTK6TOnp7PfoAmg/qXiNHI+08jRfA=="
    },
    "raf": {
      "version": "3.4.1",
      "resolved": "https://registry.npmjs.org/raf/-/raf-3.4.1.tgz",
      "integrity": "sha512-Sq4CW4QhwOHE8ucn6J34MqtZCeWFP2aQSmrlroYgqAV1PjStIhJXxYuTgUIfkEk7zTLjmIjLmU5q+fbD1NnOJA==",
      "requires": {
        "performance-now": "^2.1.0"
      }
    },
    "randombytes": {
      "version": "2.1.0",
      "resolved": "https://registry.npmjs.org/randombytes/-/randombytes-2.1.0.tgz",
      "integrity": "sha512-vYl3iOX+4CKUWuxGi9Ukhie6fsqXqS9FE2Zaic4tNFD2N2QQaXOMFbuKK4QmDHC0JO6B1Zp41J0LpT0oR68amQ==",
      "requires": {
        "safe-buffer": "^5.1.0"
      }
    },
    "randomfill": {
      "version": "1.0.4",
      "resolved": "https://registry.npmjs.org/randomfill/-/randomfill-1.0.4.tgz",
      "integrity": "sha512-87lcbR8+MhcWcUiQ+9e+Rwx8MyR2P7qnt15ynUlbm3TU/fjbgz4GsvfSUDTemtCCtVCqb4ZcEFlyPNTh9bBTLw==",
      "requires": {
        "randombytes": "^2.0.5",
        "safe-buffer": "^5.1.0"
      }
    },
    "range-parser": {
      "version": "1.2.1",
      "resolved": "https://registry.npmjs.org/range-parser/-/range-parser-1.2.1.tgz",
      "integrity": "sha512-Hrgsx+orqoygnmhFbKaHE6c296J+HTAQXoxEF6gNupROmmGJRoyzfG3ccAveqCBrwr/2yxQ5BVd/GTl5agOwSg=="
    },
    "raw-body": {
      "version": "2.4.0",
      "resolved": "https://registry.npmjs.org/raw-body/-/raw-body-2.4.0.tgz",
      "integrity": "sha512-4Oz8DUIwdvoa5qMJelxipzi/iJIi40O5cGV1wNYp5hvZP8ZN0T+jiNkL0QepXs+EsQ9XJ8ipEDoiH70ySUJP3Q==",
      "requires": {
        "bytes": "3.1.0",
        "http-errors": "1.7.2",
        "iconv-lite": "0.4.24",
        "unpipe": "1.0.0"
      }
    },
    "rc": {
      "version": "1.2.8",
      "resolved": "https://registry.npmjs.org/rc/-/rc-1.2.8.tgz",
      "integrity": "sha512-y3bGgqKj3QBdxLbLkomlohkvsA8gdAiUQlSBJnBhfn+BPxg4bc62d8TcBW15wavDfgexCgccckhcZvywyQYPOw==",
      "requires": {
        "deep-extend": "^0.6.0",
        "ini": "~1.3.0",
        "minimist": "^1.2.0",
        "strip-json-comments": "~2.0.1"
      },
      "dependencies": {
        "minimist": {
          "version": "1.2.0",
          "resolved": "https://registry.npmjs.org/minimist/-/minimist-1.2.0.tgz",
          "integrity": "sha1-o1AIsg9BOD7sH7kU9M1d95omQoQ="
        }
      }
    },
    "react": {
      "version": "16.8.6",
      "resolved": "https://registry.npmjs.org/react/-/react-16.8.6.tgz",
      "integrity": "sha512-pC0uMkhLaHm11ZSJULfOBqV4tIZkx87ZLvbbQYunNixAAvjnC+snJCg0XQXn9VIsttVsbZP/H/ewzgsd5fxKXw==",
      "requires": {
        "loose-envify": "^1.1.0",
        "object-assign": "^4.1.1",
        "prop-types": "^15.6.2",
        "scheduler": "^0.13.6"
      }
    },
    "react-app": {
      "version": "1.1.2",
      "resolved": "https://registry.npmjs.org/react-app/-/react-app-1.1.2.tgz",
      "integrity": "sha1-rmCBWb29sWa8X8ycDZeyIZNl3B8="
    },
    "react-app-polyfill": {
      "version": "1.0.2",
      "resolved": "https://registry.npmjs.org/react-app-polyfill/-/react-app-polyfill-1.0.2.tgz",
      "integrity": "sha512-yZcpLnIr0FOIzrOOz9JC37NWAWEuCaQWmYn9EWjEzlCW4cOmA5MkT5L3iP8QuUeFnoqVCTJgjIWYbXEJgNXhGA==",
      "requires": {
        "core-js": "3.1.4",
        "object-assign": "4.1.1",
        "promise": "8.0.3",
        "raf": "3.4.1",
        "regenerator-runtime": "0.13.3",
        "whatwg-fetch": "3.0.0"
      },
      "dependencies": {
        "core-js": {
          "version": "3.1.4",
          "resolved": "https://registry.npmjs.org/core-js/-/core-js-3.1.4.tgz",
          "integrity": "sha512-YNZN8lt82XIMLnLirj9MhKDFZHalwzzrL9YLt6eb0T5D0EDl4IQ90IGkua8mHbnxNrkj1d8hbdizMc0Qmg1WnQ=="
        }
      }
    },
    "react-dev-utils": {
      "version": "9.0.3",
      "resolved": "https://registry.npmjs.org/react-dev-utils/-/react-dev-utils-9.0.3.tgz",
      "integrity": "sha512-OyInhcwsvycQ3Zr2pQN+HV4gtRXrky5mJXIy4HnqrWa+mI624xfYfqGuC9dYbxp4Qq3YZzP8GSGQjv0AgNU15w==",
      "requires": {
        "@babel/code-frame": "7.5.5",
        "address": "1.1.0",
        "browserslist": "4.6.6",
        "chalk": "2.4.2",
        "cross-spawn": "6.0.5",
        "detect-port-alt": "1.1.6",
        "escape-string-regexp": "1.0.5",
        "filesize": "3.6.1",
        "find-up": "3.0.0",
        "fork-ts-checker-webpack-plugin": "1.5.0",
        "global-modules": "2.0.0",
        "globby": "8.0.2",
        "gzip-size": "5.1.1",
        "immer": "1.10.0",
        "inquirer": "6.5.0",
        "is-root": "2.1.0",
        "loader-utils": "1.2.3",
        "open": "^6.3.0",
        "pkg-up": "2.0.0",
        "react-error-overlay": "^6.0.1",
        "recursive-readdir": "2.2.2",
        "shell-quote": "1.6.1",
        "sockjs-client": "1.3.0",
        "strip-ansi": "5.2.0",
        "text-table": "0.2.0"
      },
      "dependencies": {
        "ansi-regex": {
          "version": "4.1.0",
          "resolved": "https://registry.npmjs.org/ansi-regex/-/ansi-regex-4.1.0.tgz",
          "integrity": "sha512-1apePfXM1UOSqw0o9IiFAovVz9M5S1Dg+4TrDwfMewQ6p/rmMueb7tWZjQ1rx4Loy1ArBggoqGpfqqdI4rondg=="
        },
        "ansi-styles": {
          "version": "3.2.1",
          "resolved": "https://registry.npmjs.org/ansi-styles/-/ansi-styles-3.2.1.tgz",
          "integrity": "sha512-VT0ZI6kZRdTh8YyJw3SMbYm/u+NqfsAxEpWO0Pf9sq8/e94WxxOpPKx9FR1FlyCtOVDNOQ+8ntlqFxiRc+r5qA==",
          "requires": {
            "color-convert": "^1.9.0"
          }
        },
        "chalk": {
          "version": "2.4.2",
          "resolved": "https://registry.npmjs.org/chalk/-/chalk-2.4.2.tgz",
          "integrity": "sha512-Mti+f9lpJNcwF4tWV8/OrTTtF1gZi+f8FqlyAdouralcFWFQWF2+NgCHShjkCb+IFBLq9buZwE1xckQU4peSuQ==",
          "requires": {
            "ansi-styles": "^3.2.1",
            "escape-string-regexp": "^1.0.5",
            "supports-color": "^5.3.0"
          }
        },
        "chardet": {
          "version": "0.7.0",
          "resolved": "https://registry.npmjs.org/chardet/-/chardet-0.7.0.tgz",
          "integrity": "sha512-mT8iDcrh03qDGRRmoA2hmBJnxpllMR+0/0qlzjqZES6NdiWDcZkCNAk4rPFZ9Q85r27unkiNNg8ZOiwZXBHwcA=="
        },
        "cross-spawn": {
          "version": "6.0.5",
          "resolved": "https://registry.npmjs.org/cross-spawn/-/cross-spawn-6.0.5.tgz",
          "integrity": "sha512-eTVLrBSt7fjbDygz805pMnstIs2VTBNkRm0qxZd+M7A5XDdxVRWO5MxGBXZhjY4cqLYLdtrGqRf8mBPmzwSpWQ==",
          "requires": {
            "nice-try": "^1.0.4",
            "path-key": "^2.0.1",
            "semver": "^5.5.0",
            "shebang-command": "^1.2.0",
            "which": "^1.2.9"
          }
        },
        "external-editor": {
          "version": "3.1.0",
          "resolved": "https://registry.npmjs.org/external-editor/-/external-editor-3.1.0.tgz",
          "integrity": "sha512-hMQ4CX1p1izmuLYyZqLMO/qGNw10wSv9QDCPfzXfyFrOaCSSoRfqE1Kf1s5an66J5JZC62NewG+mK49jOCtQew==",
          "requires": {
            "chardet": "^0.7.0",
            "iconv-lite": "^0.4.24",
            "tmp": "^0.0.33"
          }
        },
        "find-up": {
          "version": "3.0.0",
          "resolved": "https://registry.npmjs.org/find-up/-/find-up-3.0.0.tgz",
          "integrity": "sha512-1yD6RmLI1XBfxugvORwlck6f75tYL+iR0jqwsOrOxMZyGYqUuDhJ0l4AXdO1iX/FTs9cBAMEk1gWSEx1kSbylg==",
          "requires": {
            "locate-path": "^3.0.0"
          }
        },
        "inquirer": {
          "version": "6.5.0",
          "resolved": "https://registry.npmjs.org/inquirer/-/inquirer-6.5.0.tgz",
          "integrity": "sha512-scfHejeG/lVZSpvCXpsB4j/wQNPM5JC8kiElOI0OUTwmc1RTpXr4H32/HOlQHcZiYl2z2VElwuCVDRG8vFmbnA==",
          "requires": {
            "ansi-escapes": "^3.2.0",
            "chalk": "^2.4.2",
            "cli-cursor": "^2.1.0",
            "cli-width": "^2.0.0",
            "external-editor": "^3.0.3",
            "figures": "^2.0.0",
            "lodash": "^4.17.12",
            "mute-stream": "0.0.7",
            "run-async": "^2.2.0",
            "rxjs": "^6.4.0",
            "string-width": "^2.1.0",
            "strip-ansi": "^5.1.0",
            "through": "^2.3.6"
          }
        },
        "locate-path": {
          "version": "3.0.0",
          "resolved": "https://registry.npmjs.org/locate-path/-/locate-path-3.0.0.tgz",
          "integrity": "sha512-7AO748wWnIhNqAuaty2ZWHkQHRSNfPVIsPIfwEOWO22AmaoVrWavlOcMR5nzTLNYvp36X220/maaRsrec1G65A==",
          "requires": {
            "p-locate": "^3.0.0",
            "path-exists": "^3.0.0"
          }
        },
        "p-limit": {
          "version": "2.2.1",
          "resolved": "https://registry.npmjs.org/p-limit/-/p-limit-2.2.1.tgz",
          "integrity": "sha512-85Tk+90UCVWvbDavCLKPOLC9vvY8OwEX/RtKF+/1OADJMVlFfEHOiMTPVyxg7mk/dKa+ipdHm0OUkTvCpMTuwg==",
          "requires": {
            "p-try": "^2.0.0"
          }
        },
        "p-locate": {
          "version": "3.0.0",
          "resolved": "https://registry.npmjs.org/p-locate/-/p-locate-3.0.0.tgz",
          "integrity": "sha512-x+12w/To+4GFfgJhBEpiDcLozRJGegY+Ei7/z0tSLkMmxGZNybVMSfWj9aJn8Z5Fc7dBUNJOOVgPv2H7IwulSQ==",
          "requires": {
            "p-limit": "^2.0.0"
          }
        },
        "p-try": {
          "version": "2.2.0",
          "resolved": "https://registry.npmjs.org/p-try/-/p-try-2.2.0.tgz",
          "integrity": "sha512-R4nPAVTAU0B9D35/Gk3uJf/7XYbQcyohSKdvAxIRSNghFl4e71hVoGnBNQz9cWaXxO2I10KTC+3jMdvvoKw6dQ=="
        },
        "strip-ansi": {
          "version": "5.2.0",
          "resolved": "https://registry.npmjs.org/strip-ansi/-/strip-ansi-5.2.0.tgz",
          "integrity": "sha512-DuRs1gKbBqsMKIZlrffwlug8MHkcnpjs5VPmL1PAh+mA30U0DTotfDZ0d2UUsXpPmPmMMJ6W773MaA3J+lbiWA==",
          "requires": {
            "ansi-regex": "^4.1.0"
          }
        },
        "supports-color": {
          "version": "5.5.0",
          "resolved": "https://registry.npmjs.org/supports-color/-/supports-color-5.5.0.tgz",
          "integrity": "sha512-QjVjwdXIt408MIiAqCX4oUKsgU2EqAGzs2Ppkm4aQYbjm+ZEWEcW4SfFNTr4uMNZma0ey4f5lgLrkB0aX0QMow==",
          "requires": {
            "has-flag": "^3.0.0"
          }
        }
      }
    },
    "react-dom": {
      "version": "16.8.6",
      "resolved": "https://registry.npmjs.org/react-dom/-/react-dom-16.8.6.tgz",
      "integrity": "sha512-1nL7PIq9LTL3fthPqwkvr2zY7phIPjYrT0jp4HjyEQrEROnw4dG41VVwi/wfoCneoleqrNX7iAD+pXebJZwrwA==",
      "requires": {
        "loose-envify": "^1.1.0",
        "object-assign": "^4.1.1",
        "prop-types": "^15.6.2",
        "scheduler": "^0.13.6"
      }
    },
    "react-error-overlay": {
      "version": "6.0.1",
      "resolved": "https://registry.npmjs.org/react-error-overlay/-/react-error-overlay-6.0.1.tgz",
      "integrity": "sha512-V9yoTr6MeZXPPd4nV/05eCBvGH9cGzc52FN8fs0O0TVQ3HYYf1n7EgZVtHbldRq5xU9zEzoXIITjYNIfxDDdUw=="
    },
    "react-fast-compare": {
      "version": "2.0.4",
      "resolved": "https://registry.npmjs.org/react-fast-compare/-/react-fast-compare-2.0.4.tgz",
      "integrity": "sha512-suNP+J1VU1MWFKcyt7RtjiSWUjvidmQSlqu+eHslq+342xCbGTYmC0mEhPCOHxlW0CywylOC1u2DFAT+bv4dBw=="
    },
    "react-helmet": {
      "version": "5.2.1",
      "resolved": "https://registry.npmjs.org/react-helmet/-/react-helmet-5.2.1.tgz",
      "integrity": "sha512-CnwD822LU8NDBnjCpZ4ySh8L6HYyngViTZLfBBb3NjtrpN8m49clH8hidHouq20I51Y6TpCTISCBbqiY5GamwA==",
      "requires": {
        "object-assign": "^4.1.1",
        "prop-types": "^15.5.4",
        "react-fast-compare": "^2.0.2",
        "react-side-effect": "^1.1.0"
      }
    },
    "react-is": {
      "version": "16.9.0",
      "resolved": "https://registry.npmjs.org/react-is/-/react-is-16.9.0.tgz",
      "integrity": "sha512-tJBzzzIgnnRfEm046qRcURvwQnZVXmuCbscxUO5RWrGTXpon2d4c8mI0D8WE6ydVIm29JiLB6+RslkIvym9Rjw=="
    },
    "react-router": {
      "version": "5.0.1",
      "resolved": "https://registry.npmjs.org/react-router/-/react-router-5.0.1.tgz",
      "integrity": "sha512-EM7suCPNKb1NxcTZ2LEOWFtQBQRQXecLxVpdsP4DW4PbbqYWeRiLyV/Tt1SdCrvT2jcyXAXmVTmzvSzrPR63Bg==",
      "requires": {
        "@babel/runtime": "^7.1.2",
        "history": "^4.9.0",
        "hoist-non-react-statics": "^3.1.0",
        "loose-envify": "^1.3.1",
        "mini-create-react-context": "^0.3.0",
        "path-to-regexp": "^1.7.0",
        "prop-types": "^15.6.2",
        "react-is": "^16.6.0",
        "tiny-invariant": "^1.0.2",
        "tiny-warning": "^1.0.0"
      },
      "dependencies": {
        "isarray": {
          "version": "0.0.1",
          "resolved": "https://registry.npmjs.org/isarray/-/isarray-0.0.1.tgz",
          "integrity": "sha1-ihis/Kmo9Bd+Cav8YDiTmwXR7t8="
        },
        "path-to-regexp": {
          "version": "1.7.0",
          "resolved": "https://registry.npmjs.org/path-to-regexp/-/path-to-regexp-1.7.0.tgz",
          "integrity": "sha1-Wf3g9DW62suhA6hOnTvGTpa5k30=",
          "requires": {
            "isarray": "0.0.1"
          }
        }
      }
    },
    "react-router-dom": {
      "version": "5.0.1",
      "resolved": "https://registry.npmjs.org/react-router-dom/-/react-router-dom-5.0.1.tgz",
      "integrity": "sha512-zaVHSy7NN0G91/Bz9GD4owex5+eop+KvgbxXsP/O+iW1/Ln+BrJ8QiIR5a6xNPtrdTvLkxqlDClx13QO1uB8CA==",
      "requires": {
        "@babel/runtime": "^7.1.2",
        "history": "^4.9.0",
        "loose-envify": "^1.3.1",
        "prop-types": "^15.6.2",
        "react-router": "5.0.1",
        "tiny-invariant": "^1.0.2",
        "tiny-warning": "^1.0.0"
      }
    },
    "react-scripts": {
      "version": "3.0.1",
      "resolved": "https://registry.npmjs.org/react-scripts/-/react-scripts-3.0.1.tgz",
      "integrity": "sha512-LKEjBhVpEB+c312NeJhzF+NATxF7JkHNr5GhtwMeRS1cMeLElMeIu8Ye7WGHtDP7iz7ra4ryy48Zpo6G/cwWUw==",
      "requires": {
        "@babel/core": "7.4.3",
        "@svgr/webpack": "4.1.0",
        "@typescript-eslint/eslint-plugin": "1.6.0",
        "@typescript-eslint/parser": "1.6.0",
        "babel-eslint": "10.0.1",
        "babel-jest": "^24.8.0",
        "babel-loader": "8.0.5",
        "babel-plugin-named-asset-import": "^0.3.2",
        "babel-preset-react-app": "^9.0.0",
        "camelcase": "^5.2.0",
        "case-sensitive-paths-webpack-plugin": "2.2.0",
        "css-loader": "2.1.1",
        "dotenv": "6.2.0",
        "dotenv-expand": "4.2.0",
        "eslint": "^5.16.0",
        "eslint-config-react-app": "^4.0.1",
        "eslint-loader": "2.1.2",
        "eslint-plugin-flowtype": "2.50.1",
        "eslint-plugin-import": "2.16.0",
        "eslint-plugin-jsx-a11y": "6.2.1",
        "eslint-plugin-react": "7.12.4",
        "eslint-plugin-react-hooks": "^1.5.0",
        "file-loader": "3.0.1",
        "fs-extra": "7.0.1",
        "fsevents": "2.0.6",
        "html-webpack-plugin": "4.0.0-beta.5",
        "identity-obj-proxy": "3.0.0",
        "is-wsl": "^1.1.0",
        "jest": "24.7.1",
        "jest-environment-jsdom-fourteen": "0.1.0",
        "jest-resolve": "24.7.1",
        "jest-watch-typeahead": "0.3.0",
        "mini-css-extract-plugin": "0.5.0",
        "optimize-css-assets-webpack-plugin": "5.0.1",
        "pnp-webpack-plugin": "1.2.1",
        "postcss-flexbugs-fixes": "4.1.0",
        "postcss-loader": "3.0.0",
        "postcss-normalize": "7.0.1",
        "postcss-preset-env": "6.6.0",
        "postcss-safe-parser": "4.0.1",
        "react-app-polyfill": "^1.0.1",
        "react-dev-utils": "^9.0.1",
        "resolve": "1.10.0",
        "sass-loader": "7.1.0",
        "semver": "6.0.0",
        "style-loader": "0.23.1",
        "terser-webpack-plugin": "1.2.3",
        "ts-pnp": "1.1.2",
        "url-loader": "1.1.2",
        "webpack": "4.29.6",
        "webpack-dev-server": "3.2.1",
        "webpack-manifest-plugin": "2.0.4",
        "workbox-webpack-plugin": "4.2.0"
      },
      "dependencies": {
        "acorn": {
          "version": "6.3.0",
          "resolved": "https://registry.npmjs.org/acorn/-/acorn-6.3.0.tgz",
          "integrity": "sha512-/czfa8BwS88b9gWQVhc8eknunSA2DoJpJyTQkhheIf5E48u1N0R4q/YxxsAeqRrmK9TQ/uYfgLDfZo91UlANIA=="
        },
        "acorn-jsx": {
          "version": "5.0.1",
          "resolved": "https://registry.npmjs.org/acorn-jsx/-/acorn-jsx-5.0.1.tgz",
          "integrity": "sha512-HJ7CfNHrfJLlNTzIEUTj43LNWGkqpRLxm3YjAlcD0ACydk9XynzYsCBHxut+iqt+1aBXkx9UP/w/ZqMr13XIzg=="
        },
        "ansi-escapes": {
          "version": "4.2.1",
          "resolved": "https://registry.npmjs.org/ansi-escapes/-/ansi-escapes-4.2.1.tgz",
          "integrity": "sha512-Cg3ymMAdN10wOk/VYfLV7KCQyv7EDirJ64500sU7n9UlmioEtDuU5Gd+hj73hXSU/ex7tHJSssmyftDdkMLO8Q==",
          "requires": {
            "type-fest": "^0.5.2"
          }
        },
        "ansi-regex": {
          "version": "4.1.0",
          "resolved": "https://registry.npmjs.org/ansi-regex/-/ansi-regex-4.1.0.tgz",
          "integrity": "sha512-1apePfXM1UOSqw0o9IiFAovVz9M5S1Dg+4TrDwfMewQ6p/rmMueb7tWZjQ1rx4Loy1ArBggoqGpfqqdI4rondg=="
        },
        "ansi-styles": {
          "version": "3.2.1",
          "resolved": "https://registry.npmjs.org/ansi-styles/-/ansi-styles-3.2.1.tgz",
          "integrity": "sha512-VT0ZI6kZRdTh8YyJw3SMbYm/u+NqfsAxEpWO0Pf9sq8/e94WxxOpPKx9FR1FlyCtOVDNOQ+8ntlqFxiRc+r5qA==",
          "requires": {
            "color-convert": "^1.9.0"
          }
        },
        "aria-query": {
          "version": "3.0.0",
          "resolved": "https://registry.npmjs.org/aria-query/-/aria-query-3.0.0.tgz",
          "integrity": "sha1-ZbP8wcoRVajJrmTW7uKX8V1RM8w=",
          "requires": {
            "ast-types-flow": "0.0.7",
            "commander": "^2.11.0"
          }
        },
        "axobject-query": {
          "version": "2.0.2",
          "resolved": "https://registry.npmjs.org/axobject-query/-/axobject-query-2.0.2.tgz",
          "integrity": "sha512-MCeek8ZH7hKyO1rWUbKNQBbl4l2eY0ntk7OGi+q0RlafrCnfPxC06WZA+uebCfmYp4mNU9jRBP1AhGyf8+W3ww==",
          "requires": {
            "ast-types-flow": "0.0.7"
          }
        },
        "camelcase": {
          "version": "5.3.1",
          "resolved": "https://registry.npmjs.org/camelcase/-/camelcase-5.3.1.tgz",
          "integrity": "sha512-L28STB170nwWS63UjtlEOE3dldQApaJXZkOI1uMFfzf3rRuPegHaHesyee+YxQ+W6SvRDQV6UrdOdRiR153wJg=="
        },
        "chalk": {
          "version": "2.4.2",
          "resolved": "https://registry.npmjs.org/chalk/-/chalk-2.4.2.tgz",
          "integrity": "sha512-Mti+f9lpJNcwF4tWV8/OrTTtF1gZi+f8FqlyAdouralcFWFQWF2+NgCHShjkCb+IFBLq9buZwE1xckQU4peSuQ==",
          "requires": {
            "ansi-styles": "^3.2.1",
            "escape-string-regexp": "^1.0.5",
            "supports-color": "^5.3.0"
          }
        },
        "chardet": {
          "version": "0.7.0",
          "resolved": "https://registry.npmjs.org/chardet/-/chardet-0.7.0.tgz",
          "integrity": "sha512-mT8iDcrh03qDGRRmoA2hmBJnxpllMR+0/0qlzjqZES6NdiWDcZkCNAk4rPFZ9Q85r27unkiNNg8ZOiwZXBHwcA=="
        },
        "cli-cursor": {
          "version": "3.1.0",
          "resolved": "https://registry.npmjs.org/cli-cursor/-/cli-cursor-3.1.0.tgz",
          "integrity": "sha512-I/zHAwsKf9FqGoXM4WWRACob9+SNukZTd94DWF57E4toouRulbCxcUh6RKUEOQlYTHJnzkPMySvPNaaSLNfLZw==",
          "requires": {
            "restore-cursor": "^3.1.0"
          }
        },
        "cross-spawn": {
          "version": "6.0.5",
          "resolved": "https://registry.npmjs.org/cross-spawn/-/cross-spawn-6.0.5.tgz",
          "integrity": "sha512-eTVLrBSt7fjbDygz805pMnstIs2VTBNkRm0qxZd+M7A5XDdxVRWO5MxGBXZhjY4cqLYLdtrGqRf8mBPmzwSpWQ==",
          "requires": {
            "nice-try": "^1.0.4",
            "path-key": "^2.0.1",
            "semver": "^5.5.0",
            "shebang-command": "^1.2.0",
            "which": "^1.2.9"
          },
          "dependencies": {
            "semver": {
              "version": "5.7.1",
              "resolved": "https://registry.npmjs.org/semver/-/semver-5.7.1.tgz",
              "integrity": "sha512-sauaDf/PZdVgrLTNYHRtpXa1iRiKcaebiKQ1BJdpQlWH2lCvexQdX55snPFyK7QzpudqbCI0qXFfOasHdyNDGQ=="
            }
          }
        },
        "debug": {
          "version": "4.1.1",
          "resolved": "https://registry.npmjs.org/debug/-/debug-4.1.1.tgz",
          "integrity": "sha512-pYAIzeRo8J6KPEaJ0VWOh5Pzkbw/RetuzehGM7QRRX5he4fPHx2rdKMB256ehJCkX+XRQm16eZLqLNS8RSZXZw==",
          "requires": {
            "ms": "^2.1.1"
          }
        },
        "doctrine": {
          "version": "3.0.0",
          "resolved": "https://registry.npmjs.org/doctrine/-/doctrine-3.0.0.tgz",
          "integrity": "sha512-yS+Q5i3hBf7GBkd4KG8a7eBNNWNGLTaEwwYWUijIYM7zrlYDM0BFXHjjPWlWZ1Rg7UaddZeIDmi9jF3HmqiQ2w==",
          "requires": {
            "esutils": "^2.0.2"
          }
        },
        "emoji-regex": {
          "version": "8.0.0",
          "resolved": "https://registry.npmjs.org/emoji-regex/-/emoji-regex-8.0.0.tgz",
          "integrity": "sha512-MSjYzcWNOA0ewAHpz0MxpYFvwg6yjy1NG3xteoqz644VCo/RPgnr1/GGt+ic3iJTzQ8Eu3TdM14SawnVUmGE6A=="
        },
        "eslint": {
          "version": "5.16.0",
          "resolved": "https://registry.npmjs.org/eslint/-/eslint-5.16.0.tgz",
          "integrity": "sha512-S3Rz11i7c8AA5JPv7xAH+dOyq/Cu/VXHiHXBPOU1k/JAM5dXqQPt3qcrhpHSorXmrpu2g0gkIBVXAqCpzfoZIg==",
          "requires": {
            "@babel/code-frame": "^7.0.0",
            "ajv": "^6.9.1",
            "chalk": "^2.1.0",
            "cross-spawn": "^6.0.5",
            "debug": "^4.0.1",
            "doctrine": "^3.0.0",
            "eslint-scope": "^4.0.3",
            "eslint-utils": "^1.3.1",
            "eslint-visitor-keys": "^1.0.0",
            "espree": "^5.0.1",
            "esquery": "^1.0.1",
            "esutils": "^2.0.2",
            "file-entry-cache": "^5.0.1",
            "functional-red-black-tree": "^1.0.1",
            "glob": "^7.1.2",
            "globals": "^11.7.0",
            "ignore": "^4.0.6",
            "import-fresh": "^3.0.0",
            "imurmurhash": "^0.1.4",
            "inquirer": "^6.2.2",
            "js-yaml": "^3.13.0",
            "json-stable-stringify-without-jsonify": "^1.0.1",
            "levn": "^0.3.0",
            "lodash": "^4.17.11",
            "minimatch": "^3.0.4",
            "mkdirp": "^0.5.1",
            "natural-compare": "^1.4.0",
            "optionator": "^0.8.2",
            "path-is-inside": "^1.0.2",
            "progress": "^2.0.0",
            "regexpp": "^2.0.1",
            "semver": "^5.5.1",
            "strip-ansi": "^4.0.0",
            "strip-json-comments": "^2.0.1",
            "table": "^5.2.3",
            "text-table": "^0.2.0"
          },
          "dependencies": {
            "semver": {
              "version": "5.7.1",
              "resolved": "https://registry.npmjs.org/semver/-/semver-5.7.1.tgz",
              "integrity": "sha512-sauaDf/PZdVgrLTNYHRtpXa1iRiKcaebiKQ1BJdpQlWH2lCvexQdX55snPFyK7QzpudqbCI0qXFfOasHdyNDGQ=="
            }
          }
        },
        "eslint-import-resolver-node": {
          "version": "0.3.2",
          "resolved": "https://registry.npmjs.org/eslint-import-resolver-node/-/eslint-import-resolver-node-0.3.2.tgz",
          "integrity": "sha512-sfmTqJfPSizWu4aymbPr4Iidp5yKm8yDkHp+Ir3YiTHiiDfxh69mOUsmiqW6RZ9zRXFaF64GtYmN7e+8GHBv6Q==",
          "requires": {
            "debug": "^2.6.9",
            "resolve": "^1.5.0"
          },
          "dependencies": {
            "debug": {
              "version": "2.6.9",
              "resolved": "https://registry.npmjs.org/debug/-/debug-2.6.9.tgz",
              "integrity": "sha512-bC7ElrdJaJnPbAP+1EotYvqZsb3ecl5wi6Bfi6BJTUcNowp6cvspg0jXznRTKDjm/E7AdgFBVeAPVMNcKGsHMA==",
              "requires": {
                "ms": "2.0.0"
              }
            },
            "ms": {
              "version": "2.0.0",
              "resolved": "https://registry.npmjs.org/ms/-/ms-2.0.0.tgz",
              "integrity": "sha1-VgiurfwAvmwpAd9fmGF4jeDVl8g="
            }
          }
        },
        "eslint-plugin-flowtype": {
          "version": "2.50.1",
          "resolved": "https://registry.npmjs.org/eslint-plugin-flowtype/-/eslint-plugin-flowtype-2.50.1.tgz",
          "integrity": "sha512-9kRxF9hfM/O6WGZcZPszOVPd2W0TLHBtceulLTsGfwMPtiCCLnCW0ssRiOOiXyqrCA20pm1iXdXm7gQeN306zQ==",
          "requires": {
            "lodash": "^4.17.10"
          }
        },
        "eslint-plugin-import": {
          "version": "2.16.0",
          "resolved": "https://registry.npmjs.org/eslint-plugin-import/-/eslint-plugin-import-2.16.0.tgz",
          "integrity": "sha512-z6oqWlf1x5GkHIFgrSvtmudnqM6Q60KM4KvpWi5ubonMjycLjndvd5+8VAZIsTlHC03djdgJuyKG6XO577px6A==",
          "requires": {
            "contains-path": "^0.1.0",
            "debug": "^2.6.9",
            "doctrine": "1.5.0",
            "eslint-import-resolver-node": "^0.3.2",
            "eslint-module-utils": "^2.3.0",
            "has": "^1.0.3",
            "lodash": "^4.17.11",
            "minimatch": "^3.0.4",
            "read-pkg-up": "^2.0.0",
            "resolve": "^1.9.0"
          },
          "dependencies": {
            "debug": {
              "version": "2.6.9",
              "resolved": "https://registry.npmjs.org/debug/-/debug-2.6.9.tgz",
              "integrity": "sha512-bC7ElrdJaJnPbAP+1EotYvqZsb3ecl5wi6Bfi6BJTUcNowp6cvspg0jXznRTKDjm/E7AdgFBVeAPVMNcKGsHMA==",
              "requires": {
                "ms": "2.0.0"
              }
            },
            "doctrine": {
              "version": "1.5.0",
              "resolved": "https://registry.npmjs.org/doctrine/-/doctrine-1.5.0.tgz",
              "integrity": "sha1-N53Ocw9hZvds76TmcHoVmwLFpvo=",
              "requires": {
                "esutils": "^2.0.2",
                "isarray": "^1.0.0"
              }
            },
            "ms": {
              "version": "2.0.0",
              "resolved": "https://registry.npmjs.org/ms/-/ms-2.0.0.tgz",
              "integrity": "sha1-VgiurfwAvmwpAd9fmGF4jeDVl8g="
            }
          }
        },
        "eslint-plugin-jsx-a11y": {
          "version": "6.2.1",
          "resolved": "https://registry.npmjs.org/eslint-plugin-jsx-a11y/-/eslint-plugin-jsx-a11y-6.2.1.tgz",
          "integrity": "sha512-cjN2ObWrRz0TTw7vEcGQrx+YltMvZoOEx4hWU8eEERDnBIU00OTq7Vr+jA7DFKxiwLNv4tTh5Pq2GUNEa8b6+w==",
          "requires": {
            "aria-query": "^3.0.0",
            "array-includes": "^3.0.3",
            "ast-types-flow": "^0.0.7",
            "axobject-query": "^2.0.2",
            "damerau-levenshtein": "^1.0.4",
            "emoji-regex": "^7.0.2",
            "has": "^1.0.3",
            "jsx-ast-utils": "^2.0.1"
          },
          "dependencies": {
            "emoji-regex": {
              "version": "7.0.3",
              "resolved": "https://registry.npmjs.org/emoji-regex/-/emoji-regex-7.0.3.tgz",
              "integrity": "sha512-CwBLREIQ7LvYFB0WyRvwhq5N5qPhc6PMjD6bYggFlI5YyDgl+0vxq5VHbMOFqLg7hfWzmu8T5Z1QofhmTIhItA=="
            }
          }
        },
        "eslint-plugin-react": {
          "version": "7.12.4",
          "resolved": "https://registry.npmjs.org/eslint-plugin-react/-/eslint-plugin-react-7.12.4.tgz",
          "integrity": "sha512-1puHJkXJY+oS1t467MjbqjvX53uQ05HXwjqDgdbGBqf5j9eeydI54G3KwiJmWciQ0HTBacIKw2jgwSBSH3yfgQ==",
          "requires": {
            "array-includes": "^3.0.3",
            "doctrine": "^2.1.0",
            "has": "^1.0.3",
            "jsx-ast-utils": "^2.0.1",
            "object.fromentries": "^2.0.0",
            "prop-types": "^15.6.2",
            "resolve": "^1.9.0"
          },
          "dependencies": {
            "doctrine": {
              "version": "2.1.0",
              "resolved": "https://registry.npmjs.org/doctrine/-/doctrine-2.1.0.tgz",
              "integrity": "sha512-35mSku4ZXK0vfCuHEDAwt55dg2jNajHZ1odvF+8SSr82EsZY4QmXfuWso8oEd8zRhVObSN18aM0CjSdoBX7zIw==",
              "requires": {
                "esutils": "^2.0.2"
              }
            }
          }
        },
        "eslint-scope": {
          "version": "4.0.3",
          "resolved": "https://registry.npmjs.org/eslint-scope/-/eslint-scope-4.0.3.tgz",
          "integrity": "sha512-p7VutNr1O/QrxysMo3E45FjYDTeXBy0iTltPFNSqKAIfjDSXC+4dj+qfyuD8bfAXrW/y6lW3O76VaYNPKfpKrg==",
          "requires": {
            "esrecurse": "^4.1.0",
            "estraverse": "^4.1.1"
          }
        },
        "espree": {
          "version": "5.0.1",
          "resolved": "https://registry.npmjs.org/espree/-/espree-5.0.1.tgz",
          "integrity": "sha512-qWAZcWh4XE/RwzLJejfcofscgMc9CamR6Tn1+XRXNzrvUSSbiAjGOI/fggztjIi7y9VLPqnICMIPiGyr8JaZ0A==",
          "requires": {
            "acorn": "^6.0.7",
            "acorn-jsx": "^5.0.0",
            "eslint-visitor-keys": "^1.0.0"
          }
        },
        "external-editor": {
          "version": "3.1.0",
          "resolved": "https://registry.npmjs.org/external-editor/-/external-editor-3.1.0.tgz",
          "integrity": "sha512-hMQ4CX1p1izmuLYyZqLMO/qGNw10wSv9QDCPfzXfyFrOaCSSoRfqE1Kf1s5an66J5JZC62NewG+mK49jOCtQew==",
          "requires": {
            "chardet": "^0.7.0",
            "iconv-lite": "^0.4.24",
            "tmp": "^0.0.33"
          }
        },
        "figures": {
          "version": "3.0.0",
          "resolved": "https://registry.npmjs.org/figures/-/figures-3.0.0.tgz",
          "integrity": "sha512-HKri+WoWoUgr83pehn/SIgLOMZ9nAWC6dcGj26RY2R4F50u4+RTUz0RCrUlOV3nKRAICW1UGzyb+kcX2qK1S/g==",
          "requires": {
            "escape-string-regexp": "^1.0.5"
          }
        },
        "file-entry-cache": {
          "version": "5.0.1",
          "resolved": "https://registry.npmjs.org/file-entry-cache/-/file-entry-cache-5.0.1.tgz",
          "integrity": "sha512-bCg29ictuBaKUwwArK4ouCaqDgLZcysCFLmM/Yn/FDoqndh/9vNuQfXRDvTuXKLxfD/JtZQGKFT8MGcJBK644g==",
          "requires": {
            "flat-cache": "^2.0.1"
          }
        },
        "flat-cache": {
          "version": "2.0.1",
          "resolved": "https://registry.npmjs.org/flat-cache/-/flat-cache-2.0.1.tgz",
          "integrity": "sha512-LoQe6yDuUMDzQAEH8sgmh4Md6oZnc/7PjtwjNFSzveXqSHt6ka9fPBuso7IGf9Rz4uqnSnWiFH2B/zj24a5ReA==",
          "requires": {
            "flatted": "^2.0.0",
            "rimraf": "2.6.3",
            "write": "1.0.3"
          }
        },
        "fs-extra": {
          "version": "7.0.1",
          "resolved": "https://registry.npmjs.org/fs-extra/-/fs-extra-7.0.1.tgz",
          "integrity": "sha512-YJDaCJZEnBmcbw13fvdAM9AwNOJwOzrE4pqMqBq5nFiEqXUqHwlK4B+3pUw6JNvfSPtX05xFHtYy/1ni01eGCw==",
          "requires": {
            "graceful-fs": "^4.1.2",
            "jsonfile": "^4.0.0",
            "universalify": "^0.1.0"
          }
        },
        "fsevents": {
          "version": "2.0.6",
          "resolved": "https://registry.npmjs.org/fsevents/-/fsevents-2.0.6.tgz",
          "integrity": "sha512-vfmKZp3XPM36DNF0qhW+Cdxk7xm7gTEHY1clv1Xq1arwRQuKZgAhw+NZNWbJBtuaNxzNXwhfdPYRrvIbjfS33A==",
          "optional": true
        },
        "globals": {
          "version": "11.12.0",
          "resolved": "https://registry.npmjs.org/globals/-/globals-11.12.0.tgz",
          "integrity": "sha512-WOBp/EEGUiIsJSp7wcv/y6MO+lV9UoncWqxuFfm8eBwzWNgyfBd6Gz+IeKQ9jCmyhoH99g15M3T+QaVHFjizVA=="
        },
        "ignore": {
          "version": "4.0.6",
          "resolved": "https://registry.npmjs.org/ignore/-/ignore-4.0.6.tgz",
          "integrity": "sha512-cyFDKrqc/YdcWFniJhzI42+AzS+gNwmUzOSFcRCQYwySuBBBy/KjuxWLZ/FHEH6Moq1NizMOBWyTcv8O4OZIMg=="
        },
        "import-fresh": {
          "version": "3.1.0",
          "resolved": "https://registry.npmjs.org/import-fresh/-/import-fresh-3.1.0.tgz",
          "integrity": "sha512-PpuksHKGt8rXfWEr9m9EHIpgyyaltBy8+eF6GJM0QCAxMgxCfucMF3mjecK2QsJr0amJW7gTqh5/wht0z2UhEQ==",
          "requires": {
            "parent-module": "^1.0.0",
            "resolve-from": "^4.0.0"
          }
        },
        "inquirer": {
          "version": "6.5.1",
          "resolved": "https://registry.npmjs.org/inquirer/-/inquirer-6.5.1.tgz",
          "integrity": "sha512-uxNHBeQhRXIoHWTSNYUFhQVrHYFThIt6IVo2fFmSe8aBwdR3/w6b58hJpiL/fMukFkvGzjg+hSxFtwvVmKZmXw==",
          "requires": {
            "ansi-escapes": "^4.2.1",
            "chalk": "^2.4.2",
            "cli-cursor": "^3.1.0",
            "cli-width": "^2.0.0",
            "external-editor": "^3.0.3",
            "figures": "^3.0.0",
            "lodash": "^4.17.15",
            "mute-stream": "0.0.8",
            "run-async": "^2.2.0",
            "rxjs": "^6.4.0",
            "string-width": "^4.1.0",
            "strip-ansi": "^5.1.0",
            "through": "^2.3.6"
          },
          "dependencies": {
            "strip-ansi": {
              "version": "5.2.0",
              "resolved": "https://registry.npmjs.org/strip-ansi/-/strip-ansi-5.2.0.tgz",
              "integrity": "sha512-DuRs1gKbBqsMKIZlrffwlug8MHkcnpjs5VPmL1PAh+mA30U0DTotfDZ0d2UUsXpPmPmMMJ6W773MaA3J+lbiWA==",
              "requires": {
                "ansi-regex": "^4.1.0"
              }
            }
          }
        },
        "is-fullwidth-code-point": {
          "version": "3.0.0",
          "resolved": "https://registry.npmjs.org/is-fullwidth-code-point/-/is-fullwidth-code-point-3.0.0.tgz",
          "integrity": "sha512-zymm5+u+sCsSWyD9qNaejV3DFvhCKclKdizYaJUuHA83RLjb7nSuGnddCHGv0hk+KY7BMAlsWeK4Ueg6EV6XQg=="
        },
        "jsonfile": {
          "version": "4.0.0",
          "resolved": "https://registry.npmjs.org/jsonfile/-/jsonfile-4.0.0.tgz",
          "integrity": "sha1-h3Gq4HmbZAdrdmQPygWPnBDjPss=",
          "requires": {
            "graceful-fs": "^4.1.6"
          }
        },
        "jsx-ast-utils": {
          "version": "2.2.1",
          "resolved": "https://registry.npmjs.org/jsx-ast-utils/-/jsx-ast-utils-2.2.1.tgz",
          "integrity": "sha512-v3FxCcAf20DayI+uxnCuw795+oOIkVu6EnJ1+kSzhqqTZHNkTZ7B66ZgLp4oLJ/gbA64cI0B7WRoHZMSRdyVRQ==",
          "requires": {
            "array-includes": "^3.0.3",
            "object.assign": "^4.1.0"
          }
        },
        "mimic-fn": {
          "version": "2.1.0",
          "resolved": "https://registry.npmjs.org/mimic-fn/-/mimic-fn-2.1.0.tgz",
          "integrity": "sha512-OqbOk5oEQeAZ8WXWydlu9HJjz9WVdEIvamMCcXmuqUYjTknH/sqsWvhQ3vgwKFRR1HpjvNBKQ37nbJgYzGqGcg=="
        },
        "ms": {
          "version": "2.1.2",
          "resolved": "https://registry.npmjs.org/ms/-/ms-2.1.2.tgz",
          "integrity": "sha512-sGkPx+VjMtmA6MX27oA4FBFELFCZZ4S4XqeGOXCv68tT+jb3vk/RyaKWP0PTKyWtmLSM0b+adUTEvbs1PEaH2w=="
        },
        "mute-stream": {
          "version": "0.0.8",
          "resolved": "https://registry.npmjs.org/mute-stream/-/mute-stream-0.0.8.tgz",
          "integrity": "sha512-nnbWWOkoWyUsTjKrhgD0dcz22mdkSnpYqbEjIm2nhwhuxlSkpywJmBo8h0ZqJdkp73mb90SssHkN4rsRaBAfAA=="
        },
        "onetime": {
          "version": "5.1.0",
          "resolved": "https://registry.npmjs.org/onetime/-/onetime-5.1.0.tgz",
          "integrity": "sha512-5NcSkPHhwTVFIQN+TUqXoS5+dlElHXdpAWu9I0HP20YOtIi+aZ0Ct82jdlILDxjLEAWwvm+qj1m6aEtsDVmm6Q==",
          "requires": {
            "mimic-fn": "^2.1.0"
          }
        },
        "resolve": {
          "version": "1.10.0",
          "resolved": "https://registry.npmjs.org/resolve/-/resolve-1.10.0.tgz",
          "integrity": "sha512-3sUr9aq5OfSg2S9pNtPA9hL1FVEAjvfOC4leW0SNf/mpnaakz2a9femSd6LqAww2RaFctwyf1lCqnTHuF1rxDg==",
          "requires": {
            "path-parse": "^1.0.6"
          }
        },
        "resolve-from": {
          "version": "4.0.0",
          "resolved": "https://registry.npmjs.org/resolve-from/-/resolve-from-4.0.0.tgz",
          "integrity": "sha512-pb/MYmXstAkysRFx8piNI1tGFNQIFA3vkE3Gq4EuA1dF6gHp/+vgZqsCGJapvy8N3Q+4o7FwvquPJcnZ7RYy4g=="
        },
        "restore-cursor": {
          "version": "3.1.0",
          "resolved": "https://registry.npmjs.org/restore-cursor/-/restore-cursor-3.1.0.tgz",
          "integrity": "sha512-l+sSefzHpj5qimhFSE5a8nufZYAM3sBSVMAPtYkmC+4EH2anSGaEMXSD0izRQbu9nfyQ9y5JrVmp7E8oZrUjvA==",
          "requires": {
            "onetime": "^5.1.0",
            "signal-exit": "^3.0.2"
          }
        },
        "semver": {
          "version": "6.0.0",
          "resolved": "https://registry.npmjs.org/semver/-/semver-6.0.0.tgz",
          "integrity": "sha512-0UewU+9rFapKFnlbirLi3byoOuhrSsli/z/ihNnvM24vgF+8sNBiI1LZPBSH9wJKUwaUbw+s3hToDLCXkrghrQ=="
        },
        "slice-ansi": {
          "version": "2.1.0",
          "resolved": "https://registry.npmjs.org/slice-ansi/-/slice-ansi-2.1.0.tgz",
          "integrity": "sha512-Qu+VC3EwYLldKa1fCxuuvULvSJOKEgk9pi8dZeCVK7TqBfUNTH4sFkk4joj8afVSfAYgJoSOetjx9QWOJ5mYoQ==",
          "requires": {
            "ansi-styles": "^3.2.0",
            "astral-regex": "^1.0.0",
            "is-fullwidth-code-point": "^2.0.0"
          },
          "dependencies": {
            "is-fullwidth-code-point": {
              "version": "2.0.0",
              "resolved": "https://registry.npmjs.org/is-fullwidth-code-point/-/is-fullwidth-code-point-2.0.0.tgz",
              "integrity": "sha1-o7MKXE8ZkYMWeqq5O+764937ZU8="
            }
          }
        },
        "string-width": {
          "version": "4.1.0",
          "resolved": "https://registry.npmjs.org/string-width/-/string-width-4.1.0.tgz",
          "integrity": "sha512-NrX+1dVVh+6Y9dnQ19pR0pP4FiEIlUvdTGn8pw6CKTNq5sgib2nIhmUNT5TAmhWmvKr3WcxBcP3E8nWezuipuQ==",
          "requires": {
            "emoji-regex": "^8.0.0",
            "is-fullwidth-code-point": "^3.0.0",
            "strip-ansi": "^5.2.0"
          },
          "dependencies": {
            "strip-ansi": {
              "version": "5.2.0",
              "resolved": "https://registry.npmjs.org/strip-ansi/-/strip-ansi-5.2.0.tgz",
              "integrity": "sha512-DuRs1gKbBqsMKIZlrffwlug8MHkcnpjs5VPmL1PAh+mA30U0DTotfDZ0d2UUsXpPmPmMMJ6W773MaA3J+lbiWA==",
              "requires": {
                "ansi-regex": "^4.1.0"
              }
            }
          }
        },
        "strip-ansi": {
          "version": "4.0.0",
          "resolved": "https://registry.npmjs.org/strip-ansi/-/strip-ansi-4.0.0.tgz",
          "integrity": "sha1-qEeQIusaw2iocTibY1JixQXuNo8=",
          "requires": {
            "ansi-regex": "^3.0.0"
          },
          "dependencies": {
            "ansi-regex": {
              "version": "3.0.0",
              "resolved": "https://registry.npmjs.org/ansi-regex/-/ansi-regex-3.0.0.tgz",
              "integrity": "sha1-7QMXwyIGT3lGbAKWa922Bas32Zg="
            }
          }
        },
        "supports-color": {
          "version": "5.5.0",
          "resolved": "https://registry.npmjs.org/supports-color/-/supports-color-5.5.0.tgz",
          "integrity": "sha512-QjVjwdXIt408MIiAqCX4oUKsgU2EqAGzs2Ppkm4aQYbjm+ZEWEcW4SfFNTr4uMNZma0ey4f5lgLrkB0aX0QMow==",
          "requires": {
            "has-flag": "^3.0.0"
          }
        },
        "table": {
          "version": "5.4.6",
          "resolved": "https://registry.npmjs.org/table/-/table-5.4.6.tgz",
          "integrity": "sha512-wmEc8m4fjnob4gt5riFRtTu/6+4rSe12TpAELNSqHMfF3IqnA+CH37USM6/YR3qRZv7e56kAEAtd6nKZaxe0Ug==",
          "requires": {
            "ajv": "^6.10.2",
            "lodash": "^4.17.14",
            "slice-ansi": "^2.1.0",
            "string-width": "^3.0.0"
          },
          "dependencies": {
            "emoji-regex": {
              "version": "7.0.3",
              "resolved": "https://registry.npmjs.org/emoji-regex/-/emoji-regex-7.0.3.tgz",
              "integrity": "sha512-CwBLREIQ7LvYFB0WyRvwhq5N5qPhc6PMjD6bYggFlI5YyDgl+0vxq5VHbMOFqLg7hfWzmu8T5Z1QofhmTIhItA=="
            },
            "is-fullwidth-code-point": {
              "version": "2.0.0",
              "resolved": "https://registry.npmjs.org/is-fullwidth-code-point/-/is-fullwidth-code-point-2.0.0.tgz",
              "integrity": "sha1-o7MKXE8ZkYMWeqq5O+764937ZU8="
            },
            "string-width": {
              "version": "3.1.0",
              "resolved": "https://registry.npmjs.org/string-width/-/string-width-3.1.0.tgz",
              "integrity": "sha512-vafcv6KjVZKSgz06oM/H6GDBrAtz8vdhQakGjFIvNrHA6y3HCF1CInLy+QLq8dTJPQ1b+KDUqDFctkdRW44e1w==",
              "requires": {
                "emoji-regex": "^7.0.1",
                "is-fullwidth-code-point": "^2.0.0",
                "strip-ansi": "^5.1.0"
              }
            },
            "strip-ansi": {
              "version": "5.2.0",
              "resolved": "https://registry.npmjs.org/strip-ansi/-/strip-ansi-5.2.0.tgz",
              "integrity": "sha512-DuRs1gKbBqsMKIZlrffwlug8MHkcnpjs5VPmL1PAh+mA30U0DTotfDZ0d2UUsXpPmPmMMJ6W773MaA3J+lbiWA==",
              "requires": {
                "ansi-regex": "^4.1.0"
              }
            }
          }
        },
        "write": {
          "version": "1.0.3",
          "resolved": "https://registry.npmjs.org/write/-/write-1.0.3.tgz",
          "integrity": "sha512-/lg70HAjtkUgWPVZhZcm+T4hkL8Zbtp1nFNOn3lRrxnlv50SRBv7cR7RqR+GMsd3hUXy9hWBo4CHTbFTcOYwig==",
          "requires": {
            "mkdirp": "^0.5.1"
          }
        }
      }
    },
    "react-side-effect": {
      "version": "1.1.5",
      "resolved": "https://registry.npmjs.org/react-side-effect/-/react-side-effect-1.1.5.tgz",
      "integrity": "sha512-Z2ZJE4p/jIfvUpiUMRydEVpQRf2f8GMHczT6qLcARmX7QRb28JDBTpnM2g/i5y/p7ZDEXYGHWg0RbhikE+hJRw==",
      "requires": {
        "exenv": "^1.2.1",
        "shallowequal": "^1.0.1"
      }
    },
    "read-pkg": {
      "version": "2.0.0",
      "resolved": "https://registry.npmjs.org/read-pkg/-/read-pkg-2.0.0.tgz",
      "integrity": "sha1-jvHAYjxqbbDcZxPEv6xGMysjaPg=",
      "requires": {
        "load-json-file": "^2.0.0",
        "normalize-package-data": "^2.3.2",
        "path-type": "^2.0.0"
      }
    },
    "read-pkg-up": {
      "version": "2.0.0",
      "resolved": "https://registry.npmjs.org/read-pkg-up/-/read-pkg-up-2.0.0.tgz",
      "integrity": "sha1-a3KoBImE4MQeeVEP1en6mbO1Sb4=",
      "requires": {
        "find-up": "^2.0.0",
        "read-pkg": "^2.0.0"
      }
    },
    "readable-stream": {
      "version": "2.3.6",
      "resolved": "https://registry.npmjs.org/readable-stream/-/readable-stream-2.3.6.tgz",
      "integrity": "sha512-tQtKA9WIAhBF3+VLAseyMqZeBjW0AHJoxOtYqSUZNJxauErmLbVm2FW1y+J/YA9dUrAC39ITejlZWhVIwawkKw==",
      "requires": {
        "core-util-is": "~1.0.0",
        "inherits": "~2.0.3",
        "isarray": "~1.0.0",
        "process-nextick-args": "~2.0.0",
        "safe-buffer": "~5.1.1",
        "string_decoder": "~1.1.1",
        "util-deprecate": "~1.0.1"
      }
    },
    "readdirp": {
      "version": "2.2.1",
      "resolved": "https://registry.npmjs.org/readdirp/-/readdirp-2.2.1.tgz",
      "integrity": "sha512-1JU/8q+VgFZyxwrJ+SVIOsh+KywWGpds3NTqikiKpDMZWScmAYyKIgqkO+ARvNWJfXeXR1zxz7aHF4u4CyH6vQ==",
      "requires": {
        "graceful-fs": "^4.1.11",
        "micromatch": "^3.1.10",
        "readable-stream": "^2.0.2"
      }
    },
    "realpath-native": {
      "version": "1.1.0",
      "resolved": "https://registry.npmjs.org/realpath-native/-/realpath-native-1.1.0.tgz",
      "integrity": "sha512-wlgPA6cCIIg9gKz0fgAPjnzh4yR/LnXovwuo9hvyGvx3h8nX4+/iLZplfUWasXpqD8BdnGnP5njOFjkUwPzvjA==",
      "requires": {
        "util.promisify": "^1.0.0"
      }
    },
    "recursive-readdir": {
      "version": "2.2.2",
      "resolved": "https://registry.npmjs.org/recursive-readdir/-/recursive-readdir-2.2.2.tgz",
      "integrity": "sha512-nRCcW9Sj7NuZwa2XvH9co8NPeXUBhZP7CRKJtU+cS6PW9FpCIFoI5ib0NT1ZrbNuPoRy0ylyCaUL8Gih4LSyFg==",
      "requires": {
        "minimatch": "3.0.4"
      }
    },
    "regenerate": {
      "version": "1.4.0",
      "resolved": "https://registry.npmjs.org/regenerate/-/regenerate-1.4.0.tgz",
      "integrity": "sha512-1G6jJVDWrt0rK99kBjvEtziZNCICAuvIPkSiUFIQxVP06RCVpq3dmDo2oi6ABpYaDYaTRr67BEhL8r1wgEZZKg=="
    },
    "regenerate-unicode-properties": {
      "version": "8.1.0",
      "resolved": "https://registry.npmjs.org/regenerate-unicode-properties/-/regenerate-unicode-properties-8.1.0.tgz",
      "integrity": "sha512-LGZzkgtLY79GeXLm8Dp0BVLdQlWICzBnJz/ipWUgo59qBaZ+BHtq51P2q1uVZlppMuUAT37SDk39qUbjTWB7bA==",
      "requires": {
        "regenerate": "^1.4.0"
      }
    },
    "regenerator-runtime": {
      "version": "0.13.3",
      "resolved": "https://registry.npmjs.org/regenerator-runtime/-/regenerator-runtime-0.13.3.tgz",
      "integrity": "sha512-naKIZz2GQ8JWh///G7L3X6LaQUAMp2lvb1rvwwsURe/VXwD6VMfr+/1NuNw3ag8v2kY1aQ/go5SNn79O9JU7yw=="
    },
    "regenerator-transform": {
      "version": "0.14.1",
      "resolved": "https://registry.npmjs.org/regenerator-transform/-/regenerator-transform-0.14.1.tgz",
      "integrity": "sha512-flVuee02C3FKRISbxhXl9mGzdbWUVHubl1SMaknjxkFB1/iqpJhArQUvRxOOPEc/9tAiX0BaQ28FJH10E4isSQ==",
      "requires": {
        "private": "^0.1.6"
      }
    },
    "regex-not": {
      "version": "1.0.2",
      "resolved": "https://registry.npmjs.org/regex-not/-/regex-not-1.0.2.tgz",
      "integrity": "sha512-J6SDjUgDxQj5NusnOtdFxDwN/+HWykR8GELwctJ7mdqhcyy1xEc4SRFHUXvxTp661YaVKAjfRLZ9cCqS6tn32A==",
      "requires": {
        "extend-shallow": "^3.0.2",
        "safe-regex": "^1.1.0"
      }
    },
    "regexp-tree": {
      "version": "0.1.11",
      "resolved": "https://registry.npmjs.org/regexp-tree/-/regexp-tree-0.1.11.tgz",
      "integrity": "sha512-7/l/DgapVVDzZobwMCCgMlqiqyLFJ0cduo/j+3BcDJIB+yJdsYCfKuI3l/04NV+H/rfNRdPIDbXNZHM9XvQatg=="
    },
    "regexpp": {
      "version": "2.0.1",
      "resolved": "https://registry.npmjs.org/regexpp/-/regexpp-2.0.1.tgz",
      "integrity": "sha512-lv0M6+TkDVniA3aD1Eg0DVpfU/booSu7Eev3TDO/mZKHBfVjgCGTV4t4buppESEYDtkArYFOxTJWv6S5C+iaNw=="
    },
    "regexpu-core": {
      "version": "4.5.5",
      "resolved": "https://registry.npmjs.org/regexpu-core/-/regexpu-core-4.5.5.tgz",
      "integrity": "sha512-FpI67+ky9J+cDizQUJlIlNZFKual/lUkFr1AG6zOCpwZ9cLrg8UUVakyUQJD7fCDIe9Z2nwTQJNPyonatNmDFQ==",
      "requires": {
        "regenerate": "^1.4.0",
        "regenerate-unicode-properties": "^8.1.0",
        "regjsgen": "^0.5.0",
        "regjsparser": "^0.6.0",
        "unicode-match-property-ecmascript": "^1.0.4",
        "unicode-match-property-value-ecmascript": "^1.1.0"
      }
    },
    "registry-auth-token": {
      "version": "3.4.0",
      "resolved": "https://registry.npmjs.org/registry-auth-token/-/registry-auth-token-3.4.0.tgz",
      "integrity": "sha512-4LM6Fw8eBQdwMYcES4yTnn2TqIasbXuwDx3um+QRs7S55aMKCBKBxvPXl2RiUjHwuJLTyYfxSpmfSAjQpcuP+A==",
      "requires": {
        "rc": "^1.1.6",
        "safe-buffer": "^5.0.1"
      }
    },
    "registry-url": {
      "version": "3.1.0",
      "resolved": "https://registry.npmjs.org/registry-url/-/registry-url-3.1.0.tgz",
      "integrity": "sha1-PU74cPc93h138M+aOBQyRE4XSUI=",
      "requires": {
        "rc": "^1.0.1"
      }
    },
    "regjsgen": {
      "version": "0.5.0",
      "resolved": "https://registry.npmjs.org/regjsgen/-/regjsgen-0.5.0.tgz",
      "integrity": "sha512-RnIrLhrXCX5ow/E5/Mh2O4e/oa1/jW0eaBKTSy3LaCj+M3Bqvm97GWDp2yUtzIs4LEn65zR2yiYGFqb2ApnzDA=="
    },
    "regjsparser": {
      "version": "0.6.0",
      "resolved": "https://registry.npmjs.org/regjsparser/-/regjsparser-0.6.0.tgz",
      "integrity": "sha512-RQ7YyokLiQBomUJuUG8iGVvkgOLxwyZM8k6d3q5SAXpg4r5TZJZigKFvC6PpD+qQ98bCDC5YelPeA3EucDoNeQ==",
      "requires": {
        "jsesc": "~0.5.0"
      },
      "dependencies": {
        "jsesc": {
          "version": "0.5.0",
          "resolved": "https://registry.npmjs.org/jsesc/-/jsesc-0.5.0.tgz",
          "integrity": "sha1-597mbjXW/Bb3EP6R1c9p9w8IkR0="
        }
      }
    },
    "relateurl": {
      "version": "0.2.7",
      "resolved": "https://registry.npmjs.org/relateurl/-/relateurl-0.2.7.tgz",
      "integrity": "sha1-VNvzd+UUQKypCkzSdGANP/LYiKk="
    },
    "remove-trailing-separator": {
      "version": "1.1.0",
      "resolved": "https://registry.npmjs.org/remove-trailing-separator/-/remove-trailing-separator-1.1.0.tgz",
      "integrity": "sha1-wkvOKig62tW8P1jg1IJJuSN52O8="
    },
    "renderkid": {
      "version": "2.0.3",
      "resolved": "https://registry.npmjs.org/renderkid/-/renderkid-2.0.3.tgz",
      "integrity": "sha512-z8CLQp7EZBPCwCnncgf9C4XAi3WR0dv+uWu/PjIyhhAb5d6IJ/QZqlHFprHeKT+59//V6BNUsLbvN8+2LarxGA==",
      "requires": {
        "css-select": "^1.1.0",
        "dom-converter": "^0.2",
        "htmlparser2": "^3.3.0",
        "strip-ansi": "^3.0.0",
        "utila": "^0.4.0"
      },
      "dependencies": {
        "css-select": {
          "version": "1.2.0",
          "resolved": "https://registry.npmjs.org/css-select/-/css-select-1.2.0.tgz",
          "integrity": "sha1-KzoRBTnFNV8c2NMUYj6HCxIeyFg=",
          "requires": {
            "boolbase": "~1.0.0",
            "css-what": "2.1",
            "domutils": "1.5.1",
            "nth-check": "~1.0.1"
          }
        },
        "domutils": {
          "version": "1.5.1",
          "resolved": "https://registry.npmjs.org/domutils/-/domutils-1.5.1.tgz",
          "integrity": "sha1-3NhIiib1Y9YQeeSMn3t+Mjc2gs8=",
          "requires": {
            "dom-serializer": "0",
            "domelementtype": "1"
          }
        }
      }
    },
    "repeat-element": {
      "version": "1.1.3",
      "resolved": "https://registry.npmjs.org/repeat-element/-/repeat-element-1.1.3.tgz",
      "integrity": "sha512-ahGq0ZnV5m5XtZLMb+vP76kcAM5nkLqk0lpqAuojSKGgQtn4eRi4ZZGm2olo2zKFH+sMsWaqOCW1dqAnOru72g=="
    },
    "repeat-string": {
      "version": "1.6.1",
      "resolved": "https://registry.npmjs.org/repeat-string/-/repeat-string-1.6.1.tgz",
      "integrity": "sha1-jcrkcOHIirwtYA//Sndihtp15jc="
    },
    "request": {
      "version": "2.88.0",
      "resolved": "https://registry.npmjs.org/request/-/request-2.88.0.tgz",
      "integrity": "sha512-NAqBSrijGLZdM0WZNsInLJpkJokL72XYjUpnB0iwsRgxh7dB6COrHnTBNwN0E+lHDAJzu7kLAkDeY08z2/A0hg==",
      "requires": {
        "aws-sign2": "~0.7.0",
        "aws4": "^1.8.0",
        "caseless": "~0.12.0",
        "combined-stream": "~1.0.6",
        "extend": "~3.0.2",
        "forever-agent": "~0.6.1",
        "form-data": "~2.3.2",
        "har-validator": "~5.1.0",
        "http-signature": "~1.2.0",
        "is-typedarray": "~1.0.0",
        "isstream": "~0.1.2",
        "json-stringify-safe": "~5.0.1",
        "mime-types": "~2.1.19",
        "oauth-sign": "~0.9.0",
        "performance-now": "^2.1.0",
        "qs": "~6.5.2",
        "safe-buffer": "^5.1.2",
        "tough-cookie": "~2.4.3",
        "tunnel-agent": "^0.6.0",
        "uuid": "^3.3.2"
      },
      "dependencies": {
        "qs": {
          "version": "6.5.2",
          "resolved": "https://registry.npmjs.org/qs/-/qs-6.5.2.tgz",
          "integrity": "sha512-N5ZAX4/LxJmF+7wN74pUD6qAh9/wnvdQcjq9TZjevvXzSUo7bfmw91saqMjzGS2xq91/odN2dW/WOl7qQHNDGA=="
        }
      }
    },
    "request-promise-core": {
      "version": "1.1.2",
      "resolved": "https://registry.npmjs.org/request-promise-core/-/request-promise-core-1.1.2.tgz",
      "integrity": "sha512-UHYyq1MO8GsefGEt7EprS8UrXsm1TxEvFUX1IMTuSLU2Rh7fTIdFtl8xD7JiEYiWU2dl+NYAjCTksTehQUxPag==",
      "requires": {
        "lodash": "^4.17.11"
      }
    },
    "request-promise-native": {
      "version": "1.0.7",
      "resolved": "https://registry.npmjs.org/request-promise-native/-/request-promise-native-1.0.7.tgz",
      "integrity": "sha512-rIMnbBdgNViL37nZ1b3L/VfPOpSi0TqVDQPAvO6U14lMzOLrt5nilxCQqtDKhZeDiW0/hkCXGoQjhgJd/tCh6w==",
      "requires": {
        "request-promise-core": "1.1.2",
        "stealthy-require": "^1.1.1",
        "tough-cookie": "^2.3.3"
      }
    },
    "require-directory": {
      "version": "2.1.1",
      "resolved": "https://registry.npmjs.org/require-directory/-/require-directory-2.1.1.tgz",
      "integrity": "sha1-jGStX9MNqxyXbiNE/+f3kqam30I="
    },
    "require-main-filename": {
      "version": "2.0.0",
      "resolved": "https://registry.npmjs.org/require-main-filename/-/require-main-filename-2.0.0.tgz",
      "integrity": "sha512-NKN5kMDylKuldxYLSUfrbo5Tuzh4hd+2E8NPPX02mZtn1VuREQToYe/ZdlJy+J3uCpfaiGF05e7B8W0iXbQHmg=="
    },
    "require-uncached": {
      "version": "1.0.3",
      "resolved": "https://registry.npmjs.org/require-uncached/-/require-uncached-1.0.3.tgz",
      "integrity": "sha1-Tg1W1slmL9MeQwEcS5WqSZVUIdM=",
      "requires": {
        "caller-path": "^0.1.0",
        "resolve-from": "^1.0.0"
      }
    },
    "requireindex": {
      "version": "1.2.0",
      "resolved": "https://registry.npmjs.org/requireindex/-/requireindex-1.2.0.tgz",
      "integrity": "sha512-L9jEkOi3ASd9PYit2cwRfyppc9NoABujTP8/5gFcbERmo5jUoAKovIC3fsF17pkTnGsrByysqX+Kxd2OTNI1ww=="
    },
    "requires-port": {
      "version": "1.0.0",
      "resolved": "https://registry.npmjs.org/requires-port/-/requires-port-1.0.0.tgz",
      "integrity": "sha1-kl0mAdOaxIXgkc8NpcbmlNw9yv8="
    },
    "resolve": {
      "version": "1.12.0",
      "resolved": "https://registry.npmjs.org/resolve/-/resolve-1.12.0.tgz",
      "integrity": "sha512-B/dOmuoAik5bKcD6s6nXDCjzUKnaDvdkRyAk6rsmsKLipWj4797iothd7jmmUhWTfinVMU+wc56rYKsit2Qy4w==",
      "requires": {
        "path-parse": "^1.0.6"
      }
    },
    "resolve-cwd": {
      "version": "2.0.0",
      "resolved": "https://registry.npmjs.org/resolve-cwd/-/resolve-cwd-2.0.0.tgz",
      "integrity": "sha1-AKn3OHVW4nA46uIyyqNypqWbZlo=",
      "requires": {
        "resolve-from": "^3.0.0"
      },
      "dependencies": {
        "resolve-from": {
          "version": "3.0.0",
          "resolved": "https://registry.npmjs.org/resolve-from/-/resolve-from-3.0.0.tgz",
          "integrity": "sha1-six699nWiBvItuZTM17rywoYh0g="
        }
      }
    },
    "resolve-from": {
      "version": "1.0.1",
      "resolved": "https://registry.npmjs.org/resolve-from/-/resolve-from-1.0.1.tgz",
      "integrity": "sha1-Jsv+k10a7uq7Kbw/5a6wHpPUQiY="
    },
    "resolve-pathname": {
      "version": "2.2.0",
      "resolved": "https://registry.npmjs.org/resolve-pathname/-/resolve-pathname-2.2.0.tgz",
      "integrity": "sha512-bAFz9ld18RzJfddgrO2e/0S2O81710++chRMUxHjXOYKF6jTAMrUNZrEZ1PvV0zlhfjidm08iRPdTLPno1FuRg=="
    },
    "resolve-url": {
      "version": "0.2.1",
      "resolved": "https://registry.npmjs.org/resolve-url/-/resolve-url-0.2.1.tgz",
      "integrity": "sha1-LGN/53yJOv0qZj/iGqkIAGjiBSo="
    },
    "restore-cursor": {
      "version": "2.0.0",
      "resolved": "https://registry.npmjs.org/restore-cursor/-/restore-cursor-2.0.0.tgz",
      "integrity": "sha1-n37ih/gv0ybU/RYpI9YhKe7g368=",
      "requires": {
        "onetime": "^2.0.0",
        "signal-exit": "^3.0.2"
      }
    },
    "ret": {
      "version": "0.1.15",
      "resolved": "https://registry.npmjs.org/ret/-/ret-0.1.15.tgz",
      "integrity": "sha512-TTlYpa+OL+vMMNG24xSlQGEJ3B/RzEfUlLct7b5G/ytav+wPrplCpVMFuwzXbkecJrb6IYo1iFb0S9v37754mg=="
    },
    "retry-request": {
      "version": "3.3.2",
      "resolved": "https://registry.npmjs.org/retry-request/-/retry-request-3.3.2.tgz",
      "integrity": "sha512-WIiGp37XXDC6e7ku3LFoi7LCL/Gs9luGeeqvbPRb+Zl6OQMw4RCRfSaW+aLfE6lhz1R941UavE6Svl3Dm5xGIQ==",
      "requires": {
        "request": "^2.81.0",
        "through2": "^2.0.0"
      }
    },
    "rgb-regex": {
      "version": "1.0.1",
      "resolved": "https://registry.npmjs.org/rgb-regex/-/rgb-regex-1.0.1.tgz",
      "integrity": "sha1-wODWiC3w4jviVKR16O3UGRX+rrE="
    },
    "rgba-regex": {
      "version": "1.0.0",
      "resolved": "https://registry.npmjs.org/rgba-regex/-/rgba-regex-1.0.0.tgz",
      "integrity": "sha1-QzdOLiyglosO8VI0YLfXMP8i7rM="
    },
    "rimraf": {
      "version": "2.6.3",
      "resolved": "https://registry.npmjs.org/rimraf/-/rimraf-2.6.3.tgz",
      "integrity": "sha512-mwqeW5XsA2qAejG46gYdENaxXjx9onRNCfn7L0duuP4hCuTIi/QO7PDK07KJfp1d+izWPrzEJDcSqBa0OZQriA==",
      "requires": {
        "glob": "^7.1.3"
      }
    },
    "ripemd160": {
      "version": "2.0.2",
      "resolved": "https://registry.npmjs.org/ripemd160/-/ripemd160-2.0.2.tgz",
      "integrity": "sha512-ii4iagi25WusVoiC4B4lq7pbXfAp3D9v5CwfkY33vffw2+pkDjY1D8GaN7spsxvCSx8dkPqOZCEZyfxcmJG2IA==",
      "requires": {
        "hash-base": "^3.0.0",
        "inherits": "^2.0.1"
      }
    },
    "router": {
      "version": "1.3.3",
      "resolved": "https://registry.npmjs.org/router/-/router-1.3.3.tgz",
      "integrity": "sha1-wUL2tepNazNZAiypW2WAvSF/ic8=",
      "requires": {
        "array-flatten": "2.1.1",
        "debug": "2.6.9",
        "methods": "~1.1.2",
        "parseurl": "~1.3.2",
        "path-to-regexp": "0.1.7",
        "setprototypeof": "1.1.0",
        "utils-merge": "1.0.1"
      },
      "dependencies": {
        "array-flatten": {
          "version": "2.1.1",
          "resolved": "https://registry.npmjs.org/array-flatten/-/array-flatten-2.1.1.tgz",
          "integrity": "sha1-Qmu52oQJDBg42BLIFQryCoMx4pY="
        },
        "path-to-regexp": {
          "version": "0.1.7",
          "resolved": "https://registry.npmjs.org/path-to-regexp/-/path-to-regexp-0.1.7.tgz",
          "integrity": "sha1-32BBeABfUi8V60SQ5yR6G/qmf4w="
        },
        "setprototypeof": {
          "version": "1.1.0",
          "resolved": "https://registry.npmjs.org/setprototypeof/-/setprototypeof-1.1.0.tgz",
          "integrity": "sha512-BvE/TwpZX4FXExxOxZyRGQQv651MSwmWKZGqvmPcRIjDqWub67kTKuIMx43cZZrS/cBBzwBcNDWoFxt2XEFIpQ=="
        }
      }
    },
    "rsvp": {
      "version": "3.6.2",
      "resolved": "https://registry.npmjs.org/rsvp/-/rsvp-3.6.2.tgz",
      "integrity": "sha512-OfWGQTb9vnwRjwtA2QwpG2ICclHC3pgXZO5xt8H2EfgDquO0qVdSb5T88L4qJVAEugbS56pAuV4XZM58UX8ulw=="
    },
    "run-async": {
      "version": "2.3.0",
      "resolved": "https://registry.npmjs.org/run-async/-/run-async-2.3.0.tgz",
      "integrity": "sha1-A3GrSuC91yDUFm19/aZP96RFpsA=",
      "requires": {
        "is-promise": "^2.1.0"
      }
    },
    "run-queue": {
      "version": "1.0.3",
      "resolved": "https://registry.npmjs.org/run-queue/-/run-queue-1.0.3.tgz",
      "integrity": "sha1-6Eg5bwV9Ij8kOGkkYY4laUFh7Ec=",
      "requires": {
        "aproba": "^1.1.1"
      }
    },
    "rx-lite": {
      "version": "4.0.8",
      "resolved": "https://registry.npmjs.org/rx-lite/-/rx-lite-4.0.8.tgz",
      "integrity": "sha1-Cx4Rr4vESDbwSmQH6S2kJGe3lEQ="
    },
    "rx-lite-aggregates": {
      "version": "4.0.8",
      "resolved": "https://registry.npmjs.org/rx-lite-aggregates/-/rx-lite-aggregates-4.0.8.tgz",
      "integrity": "sha1-dTuHqJoRyVRnxKwWJsTvxOBcZ74=",
      "requires": {
        "rx-lite": "*"
      }
    },
    "rxjs": {
      "version": "6.5.2",
      "resolved": "https://registry.npmjs.org/rxjs/-/rxjs-6.5.2.tgz",
      "integrity": "sha512-HUb7j3kvb7p7eCUHE3FqjoDsC1xfZQ4AHFWfTKSpZ+sAhhz5X1WX0ZuUqWbzB2QhSLp3DoLUG+hMdEDKqWo2Zg==",
      "requires": {
        "tslib": "^1.9.0"
      }
    },
    "safe-buffer": {
      "version": "5.1.2",
      "resolved": "https://registry.npmjs.org/safe-buffer/-/safe-buffer-5.1.2.tgz",
      "integrity": "sha512-Gd2UZBJDkXlY7GbJxfsE8/nvKkUEU1G38c1siN6QP6a9PT9MmHB8GnpscSmMJSoF8LOIrt8ud/wPtojys4G6+g=="
    },
    "safe-regex": {
      "version": "1.1.0",
      "resolved": "https://registry.npmjs.org/safe-regex/-/safe-regex-1.1.0.tgz",
      "integrity": "sha1-QKNmnzsHfR6UPURinhV91IAjvy4=",
      "requires": {
        "ret": "~0.1.10"
      }
    },
    "safer-buffer": {
      "version": "2.1.2",
      "resolved": "https://registry.npmjs.org/safer-buffer/-/safer-buffer-2.1.2.tgz",
      "integrity": "sha512-YZo3K82SD7Riyi0E1EQPojLz7kpepnSQI9IyPbHHg1XXXevb5dJI7tpyN2ADxGcQbHG7vcyRHk0cbwqcQriUtg=="
    },
    "sane": {
      "version": "4.1.0",
      "resolved": "https://registry.npmjs.org/sane/-/sane-4.1.0.tgz",
      "integrity": "sha512-hhbzAgTIX8O7SHfp2c8/kREfEn4qO/9q8C9beyY6+tvZ87EpoZ3i1RIEvp27YBswnNbY9mWd6paKVmKbAgLfZA==",
      "requires": {
        "@cnakazawa/watch": "^1.0.3",
        "anymatch": "^2.0.0",
        "capture-exit": "^2.0.0",
        "exec-sh": "^0.3.2",
        "execa": "^1.0.0",
        "fb-watchman": "^2.0.0",
        "micromatch": "^3.1.4",
        "minimist": "^1.1.1",
        "walker": "~1.0.5"
      },
      "dependencies": {
        "cross-spawn": {
          "version": "6.0.5",
          "resolved": "https://registry.npmjs.org/cross-spawn/-/cross-spawn-6.0.5.tgz",
          "integrity": "sha512-eTVLrBSt7fjbDygz805pMnstIs2VTBNkRm0qxZd+M7A5XDdxVRWO5MxGBXZhjY4cqLYLdtrGqRf8mBPmzwSpWQ==",
          "requires": {
            "nice-try": "^1.0.4",
            "path-key": "^2.0.1",
            "semver": "^5.5.0",
            "shebang-command": "^1.2.0",
            "which": "^1.2.9"
          }
        },
        "execa": {
          "version": "1.0.0",
          "resolved": "https://registry.npmjs.org/execa/-/execa-1.0.0.tgz",
          "integrity": "sha512-adbxcyWV46qiHyvSp50TKt05tB4tK3HcmF7/nxfAdhnox83seTDbwnaqKO4sXRy7roHAIFqJP/Rw/AuEbX61LA==",
          "requires": {
            "cross-spawn": "^6.0.0",
            "get-stream": "^4.0.0",
            "is-stream": "^1.1.0",
            "npm-run-path": "^2.0.0",
            "p-finally": "^1.0.0",
            "signal-exit": "^3.0.0",
            "strip-eof": "^1.0.0"
          }
        },
        "get-stream": {
          "version": "4.1.0",
          "resolved": "https://registry.npmjs.org/get-stream/-/get-stream-4.1.0.tgz",
          "integrity": "sha512-GMat4EJ5161kIy2HevLlr4luNjBgvmj413KaQA7jt4V8B4RDsfpHk7WQ9GVqfYyyx8OS/L66Kox+rJRNklLK7w==",
          "requires": {
            "pump": "^3.0.0"
          }
        },
        "minimist": {
          "version": "1.2.0",
          "resolved": "https://registry.npmjs.org/minimist/-/minimist-1.2.0.tgz",
          "integrity": "sha1-o1AIsg9BOD7sH7kU9M1d95omQoQ="
        }
      }
    },
    "sass-loader": {
      "version": "7.1.0",
      "resolved": "https://registry.npmjs.org/sass-loader/-/sass-loader-7.1.0.tgz",
      "integrity": "sha512-+G+BKGglmZM2GUSfT9TLuEp6tzehHPjAMoRRItOojWIqIGPloVCMhNIQuG639eJ+y033PaGTSjLaTHts8Kw79w==",
      "requires": {
        "clone-deep": "^2.0.1",
        "loader-utils": "^1.0.1",
        "lodash.tail": "^4.1.1",
        "neo-async": "^2.5.0",
        "pify": "^3.0.0",
        "semver": "^5.5.0"
      },
      "dependencies": {
        "clone-deep": {
          "version": "2.0.2",
          "resolved": "https://registry.npmjs.org/clone-deep/-/clone-deep-2.0.2.tgz",
          "integrity": "sha512-SZegPTKjCgpQH63E+eN6mVEEPdQBOUzjyJm5Pora4lrwWRFS8I0QAxV/KD6vV/i0WuijHZWQC1fMsPEdxfdVCQ==",
          "requires": {
            "for-own": "^1.0.0",
            "is-plain-object": "^2.0.4",
            "kind-of": "^6.0.0",
            "shallow-clone": "^1.0.0"
          }
        },
        "for-own": {
          "version": "1.0.0",
          "resolved": "https://registry.npmjs.org/for-own/-/for-own-1.0.0.tgz",
          "integrity": "sha1-xjMy9BXO3EsE2/5wz4NklMU8tEs=",
          "requires": {
            "for-in": "^1.0.1"
          }
        },
        "pify": {
          "version": "3.0.0",
          "resolved": "https://registry.npmjs.org/pify/-/pify-3.0.0.tgz",
          "integrity": "sha1-5aSs0sEB/fPZpNB/DbxNtJ3SgXY="
        },
        "shallow-clone": {
          "version": "1.0.0",
          "resolved": "https://registry.npmjs.org/shallow-clone/-/shallow-clone-1.0.0.tgz",
          "integrity": "sha512-oeXreoKR/SyNJtRJMAKPDSvd28OqEwG4eR/xc856cRGBII7gX9lvAqDxusPm0846z/w/hWYjI1NpKwJ00NHzRA==",
          "requires": {
            "is-extendable": "^0.1.1",
            "kind-of": "^5.0.0",
            "mixin-object": "^2.0.1"
          },
          "dependencies": {
            "kind-of": {
              "version": "5.1.0",
              "resolved": "https://registry.npmjs.org/kind-of/-/kind-of-5.1.0.tgz",
              "integrity": "sha512-NGEErnH6F2vUuXDh+OlbcKW7/wOcfdRHaZ7VWtqCztfHri/++YKmP51OdWeGPuqCOba6kk2OTe5d02VmTB80Pw=="
            }
          }
        }
      }
    },
    "sax": {
      "version": "1.2.4",
      "resolved": "https://registry.npmjs.org/sax/-/sax-1.2.4.tgz",
      "integrity": "sha512-NqVDv9TpANUjFm0N8uM5GxL36UgKi9/atZw+x7YFnQ8ckwFGKrl4xX4yWtrey3UJm5nP1kUbnYgLopqWNSRhWw=="
    },
    "saxes": {
      "version": "3.1.11",
      "resolved": "https://registry.npmjs.org/saxes/-/saxes-3.1.11.tgz",
      "integrity": "sha512-Ydydq3zC+WYDJK1+gRxRapLIED9PWeSuuS41wqyoRmzvhhh9nc+QQrVMKJYzJFULazeGhzSV0QleN2wD3boh2g==",
      "requires": {
        "xmlchars": "^2.1.1"
      }
    },
    "scheduler": {
      "version": "0.13.6",
      "resolved": "https://registry.npmjs.org/scheduler/-/scheduler-0.13.6.tgz",
      "integrity": "sha512-IWnObHt413ucAYKsD9J1QShUKkbKLQQHdxRyw73sw4FN26iWr3DY/H34xGPe4nmL1DwXyWmSWmMrA9TfQbE/XQ==",
      "requires": {
        "loose-envify": "^1.1.0",
        "object-assign": "^4.1.1"
      }
    },
    "schema-utils": {
      "version": "1.0.0",
      "resolved": "https://registry.npmjs.org/schema-utils/-/schema-utils-1.0.0.tgz",
      "integrity": "sha512-i27Mic4KovM/lnGsy8whRCHhc7VicJajAjTrYg11K9zfZXnYIt4k5F+kZkwjnrhKzLic/HLU4j11mjsz2G/75g==",
      "requires": {
        "ajv": "^6.1.0",
        "ajv-errors": "^1.0.0",
        "ajv-keywords": "^3.1.0"
      }
    },
    "select-hose": {
      "version": "2.0.0",
      "resolved": "https://registry.npmjs.org/select-hose/-/select-hose-2.0.0.tgz",
      "integrity": "sha1-Yl2GWPhlr0Psliv8N2o3NZpJlMo="
    },
    "selfsigned": {
      "version": "1.10.4",
      "resolved": "https://registry.npmjs.org/selfsigned/-/selfsigned-1.10.4.tgz",
      "integrity": "sha512-9AukTiDmHXGXWtWjembZ5NDmVvP2695EtpgbCsxCa68w3c88B+alqbmZ4O3hZ4VWGXeGWzEVdvqgAJD8DQPCDw==",
      "requires": {
        "node-forge": "0.7.5"
      },
      "dependencies": {
        "node-forge": {
          "version": "0.7.5",
          "resolved": "https://registry.npmjs.org/node-forge/-/node-forge-0.7.5.tgz",
          "integrity": "sha512-MmbQJ2MTESTjt3Gi/3yG1wGpIMhUfcIypUCGtTizFR9IiccFwxSpfp0vtIZlkFclEqERemxfnSdZEMR9VqqEFQ=="
        }
      }
    },
    "semver": {
      "version": "5.7.1",
      "resolved": "https://registry.npmjs.org/semver/-/semver-5.7.1.tgz",
      "integrity": "sha512-sauaDf/PZdVgrLTNYHRtpXa1iRiKcaebiKQ1BJdpQlWH2lCvexQdX55snPFyK7QzpudqbCI0qXFfOasHdyNDGQ=="
    },
    "semver-diff": {
      "version": "2.1.0",
      "resolved": "https://registry.npmjs.org/semver-diff/-/semver-diff-2.1.0.tgz",
      "integrity": "sha1-S7uEN8jTfksM8aaP1ybsbWRdbTY=",
      "requires": {
        "semver": "^5.0.3"
      }
    },
    "send": {
      "version": "0.17.1",
      "resolved": "https://registry.npmjs.org/send/-/send-0.17.1.tgz",
      "integrity": "sha512-BsVKsiGcQMFwT8UxypobUKyv7irCNRHk1T0G680vk88yf6LBByGcZJOTJCrTP2xVN6yI+XjPJcNuE3V4fT9sAg==",
      "requires": {
        "debug": "2.6.9",
        "depd": "~1.1.2",
        "destroy": "~1.0.4",
        "encodeurl": "~1.0.2",
        "escape-html": "~1.0.3",
        "etag": "~1.8.1",
        "fresh": "0.5.2",
        "http-errors": "~1.7.2",
        "mime": "1.6.0",
        "ms": "2.1.1",
        "on-finished": "~2.3.0",
        "range-parser": "~1.2.1",
        "statuses": "~1.5.0"
      },
      "dependencies": {
        "ms": {
          "version": "2.1.1",
          "resolved": "https://registry.npmjs.org/ms/-/ms-2.1.1.tgz",
          "integrity": "sha512-tgp+dl5cGk28utYktBsrFqA7HKgrhgPsg6Z/EfhWI4gl1Hwq8B/GmY/0oXZ6nF8hDVesS/FpnYaD/kOWhYQvyg=="
        }
      }
    },
    "serialize-javascript": {
      "version": "1.7.0",
      "resolved": "https://registry.npmjs.org/serialize-javascript/-/serialize-javascript-1.7.0.tgz",
      "integrity": "sha512-ke8UG8ulpFOxO8f8gRYabHQe/ZntKlcig2Mp+8+URDP1D8vJZ0KUt7LYo07q25Z/+JVSgpr/cui9PIp5H6/+nA=="
    },
    "serve-index": {
      "version": "1.9.1",
      "resolved": "https://registry.npmjs.org/serve-index/-/serve-index-1.9.1.tgz",
      "integrity": "sha1-03aNabHn2C5c4FD/9bRTvqEqkjk=",
      "requires": {
        "accepts": "~1.3.4",
        "batch": "0.6.1",
        "debug": "2.6.9",
        "escape-html": "~1.0.3",
        "http-errors": "~1.6.2",
        "mime-types": "~2.1.17",
        "parseurl": "~1.3.2"
      },
      "dependencies": {
        "http-errors": {
          "version": "1.6.3",
          "resolved": "https://registry.npmjs.org/http-errors/-/http-errors-1.6.3.tgz",
          "integrity": "sha1-i1VoC7S+KDoLW/TqLjhYC+HZMg0=",
          "requires": {
            "depd": "~1.1.2",
            "inherits": "2.0.3",
            "setprototypeof": "1.1.0",
            "statuses": ">= 1.4.0 < 2"
          }
        },
        "inherits": {
          "version": "2.0.3",
          "resolved": "https://registry.npmjs.org/inherits/-/inherits-2.0.3.tgz",
          "integrity": "sha1-Yzwsg+PaQqUC9SRmAiSA9CCCYd4="
        },
        "setprototypeof": {
          "version": "1.1.0",
          "resolved": "https://registry.npmjs.org/setprototypeof/-/setprototypeof-1.1.0.tgz",
          "integrity": "sha512-BvE/TwpZX4FXExxOxZyRGQQv651MSwmWKZGqvmPcRIjDqWub67kTKuIMx43cZZrS/cBBzwBcNDWoFxt2XEFIpQ=="
        }
      }
    },
    "serve-static": {
      "version": "1.14.1",
      "resolved": "https://registry.npmjs.org/serve-static/-/serve-static-1.14.1.tgz",
      "integrity": "sha512-JMrvUwE54emCYWlTI+hGrGv5I8dEwmco/00EvkzIIsR7MqrHonbD9pO2MOfFnpFntl7ecpZs+3mW+XbQZu9QCg==",
      "requires": {
        "encodeurl": "~1.0.2",
        "escape-html": "~1.0.3",
        "parseurl": "~1.3.3",
        "send": "0.17.1"
      }
    },
    "set-blocking": {
      "version": "2.0.0",
      "resolved": "https://registry.npmjs.org/set-blocking/-/set-blocking-2.0.0.tgz",
      "integrity": "sha1-BF+XgtARrppoA93TgrJDkrPYkPc="
    },
    "set-value": {
      "version": "2.0.1",
      "resolved": "https://registry.npmjs.org/set-value/-/set-value-2.0.1.tgz",
      "integrity": "sha512-JxHc1weCN68wRY0fhCoXpyK55m/XPHafOmK4UWD7m2CI14GMcFypt4w/0+NV5f/ZMby2F6S2wwA7fgynh9gWSw==",
      "requires": {
        "extend-shallow": "^2.0.1",
        "is-extendable": "^0.1.1",
        "is-plain-object": "^2.0.3",
        "split-string": "^3.0.1"
      },
      "dependencies": {
        "extend-shallow": {
          "version": "2.0.1",
          "resolved": "https://registry.npmjs.org/extend-shallow/-/extend-shallow-2.0.1.tgz",
          "integrity": "sha1-Ua99YUrZqfYQ6huvu5idaxxWiQ8=",
          "requires": {
            "is-extendable": "^0.1.0"
          }
        }
      }
    },
    "setimmediate": {
      "version": "1.0.5",
      "resolved": "https://registry.npmjs.org/setimmediate/-/setimmediate-1.0.5.tgz",
      "integrity": "sha1-KQy7Iy4waULX1+qbg3Mqt4VvgoU="
    },
    "setprototypeof": {
      "version": "1.1.1",
      "resolved": "https://registry.npmjs.org/setprototypeof/-/setprototypeof-1.1.1.tgz",
      "integrity": "sha512-JvdAWfbXeIGaZ9cILp38HntZSFSo3mWg6xGcJJsd+d4aRMOqauag1C63dJfDw7OaMYwEbHMOxEZ1lqVRYP2OAw=="
    },
    "sha.js": {
      "version": "2.4.11",
      "resolved": "https://registry.npmjs.org/sha.js/-/sha.js-2.4.11.tgz",
      "integrity": "sha512-QMEp5B7cftE7APOjk5Y6xgrbWu+WkLVQwk8JNjZ8nKRciZaByEW6MubieAiToS7+dwvrjGhH8jRXz3MVd0AYqQ==",
      "requires": {
        "inherits": "^2.0.1",
        "safe-buffer": "^5.0.1"
      }
    },
    "shallow-clone": {
      "version": "0.1.2",
      "resolved": "https://registry.npmjs.org/shallow-clone/-/shallow-clone-0.1.2.tgz",
      "integrity": "sha1-WQnodLp3EG1zrEFM/sH/yofZcGA=",
      "requires": {
        "is-extendable": "^0.1.1",
        "kind-of": "^2.0.1",
        "lazy-cache": "^0.2.3",
        "mixin-object": "^2.0.1"
      },
      "dependencies": {
        "kind-of": {
          "version": "2.0.1",
          "resolved": "https://registry.npmjs.org/kind-of/-/kind-of-2.0.1.tgz",
          "integrity": "sha1-AY7HpM5+OobLkUG+UZ0kyPqpgbU=",
          "requires": {
            "is-buffer": "^1.0.2"
          }
        },
        "lazy-cache": {
          "version": "0.2.7",
          "resolved": "https://registry.npmjs.org/lazy-cache/-/lazy-cache-0.2.7.tgz",
          "integrity": "sha1-f+3fLctu23fRHvHRF6tf/fCrG2U="
        }
      }
    },
    "shallowequal": {
      "version": "1.1.0",
      "resolved": "https://registry.npmjs.org/shallowequal/-/shallowequal-1.1.0.tgz",
      "integrity": "sha512-y0m1JoUZSlPAjXVtPPW70aZWfIL/dSP7AFkRnniLCrK/8MDKog3TySTBmckD+RObVxH0v4Tox67+F14PdED2oQ=="
    },
    "shebang-command": {
      "version": "1.2.0",
      "resolved": "https://registry.npmjs.org/shebang-command/-/shebang-command-1.2.0.tgz",
      "integrity": "sha1-RKrGW2lbAzmJaMOfNj/uXer98eo=",
      "requires": {
        "shebang-regex": "^1.0.0"
      }
    },
    "shebang-regex": {
      "version": "1.0.0",
      "resolved": "https://registry.npmjs.org/shebang-regex/-/shebang-regex-1.0.0.tgz",
      "integrity": "sha1-2kL0l0DAtC2yypcoVxyxkMmO/qM="
    },
    "shell-quote": {
      "version": "1.6.1",
      "resolved": "https://registry.npmjs.org/shell-quote/-/shell-quote-1.6.1.tgz",
      "integrity": "sha1-9HgZSczkAmlxJ0MOo7PFR29IF2c=",
      "requires": {
        "array-filter": "~0.0.0",
        "array-map": "~0.0.0",
        "array-reduce": "~0.0.0",
        "jsonify": "~0.0.0"
      }
    },
    "shellwords": {
      "version": "0.1.1",
      "resolved": "https://registry.npmjs.org/shellwords/-/shellwords-0.1.1.tgz",
      "integrity": "sha512-vFwSUfQvqybiICwZY5+DAWIPLKsWO31Q91JSKl3UYv+K5c2QRPzn0qzec6QPu1Qc9eHYItiP3NdJqNVqetYAww=="
    },
    "signal-exit": {
      "version": "3.0.2",
      "resolved": "https://registry.npmjs.org/signal-exit/-/signal-exit-3.0.2.tgz",
      "integrity": "sha1-tf3AjxKH6hF4Yo5BXiUTK3NkbG0="
    },
    "simple-swizzle": {
      "version": "0.2.2",
      "resolved": "https://registry.npmjs.org/simple-swizzle/-/simple-swizzle-0.2.2.tgz",
      "integrity": "sha1-pNprY1/8zMoz9w0Xy5JZLeleVXo=",
      "requires": {
        "is-arrayish": "^0.3.1"
      },
      "dependencies": {
        "is-arrayish": {
          "version": "0.3.2",
          "resolved": "https://registry.npmjs.org/is-arrayish/-/is-arrayish-0.3.2.tgz",
          "integrity": "sha512-eVRqCvVlZbuw3GrM63ovNSNAeA1K16kaR/LRY/92w0zxQ5/1YzwblUX652i4Xs9RwAGjW9d9y6X88t8OaAJfWQ=="
        }
      }
    },
    "sisteransi": {
      "version": "1.0.3",
      "resolved": "https://registry.npmjs.org/sisteransi/-/sisteransi-1.0.3.tgz",
      "integrity": "sha512-SbEG75TzH8G7eVXFSN5f9EExILKfly7SUvVY5DhhYLvfhKqhDFY0OzevWa/zwak0RLRfWS5AvfMWpd9gJvr5Yg=="
    },
    "slash": {
      "version": "2.0.0",
      "resolved": "https://registry.npmjs.org/slash/-/slash-2.0.0.tgz",
      "integrity": "sha512-ZYKh3Wh2z1PpEXWr0MpSBZ0V6mZHAQfYevttO11c51CaWjGTaadiKZ+wVt1PbMlDV5qhMFslpZCemhwOK7C89A=="
    },
    "slice-ansi": {
      "version": "1.0.0",
      "resolved": "https://registry.npmjs.org/slice-ansi/-/slice-ansi-1.0.0.tgz",
      "integrity": "sha512-POqxBK6Lb3q6s047D/XsDVNPnF9Dl8JSaqe9h9lURl0OdNqy/ujDrOiIHtsqXMGbWWTIomRzAMaTyawAU//Reg==",
      "requires": {
        "is-fullwidth-code-point": "^2.0.0"
      }
    },
    "slide": {
      "version": "1.1.6",
      "resolved": "https://registry.npmjs.org/slide/-/slide-1.1.6.tgz",
      "integrity": "sha1-VusCfWW00tzmyy4tMsTUr8nh1wc="
    },
    "snapdragon": {
      "version": "0.8.2",
      "resolved": "https://registry.npmjs.org/snapdragon/-/snapdragon-0.8.2.tgz",
      "integrity": "sha512-FtyOnWN/wCHTVXOMwvSv26d+ko5vWlIDD6zoUJ7LW8vh+ZBC8QdljveRP+crNrtBwioEUWy/4dMtbBjA4ioNlg==",
      "requires": {
        "base": "^0.11.1",
        "debug": "^2.2.0",
        "define-property": "^0.2.5",
        "extend-shallow": "^2.0.1",
        "map-cache": "^0.2.2",
        "source-map": "^0.5.6",
        "source-map-resolve": "^0.5.0",
        "use": "^3.1.0"
      },
      "dependencies": {
        "define-property": {
          "version": "0.2.5",
          "resolved": "https://registry.npmjs.org/define-property/-/define-property-0.2.5.tgz",
          "integrity": "sha1-w1se+RjsPJkPmlvFe+BKrOxcgRY=",
          "requires": {
            "is-descriptor": "^0.1.0"
          }
        },
        "extend-shallow": {
          "version": "2.0.1",
          "resolved": "https://registry.npmjs.org/extend-shallow/-/extend-shallow-2.0.1.tgz",
          "integrity": "sha1-Ua99YUrZqfYQ6huvu5idaxxWiQ8=",
          "requires": {
            "is-extendable": "^0.1.0"
          }
        }
      }
    },
    "snapdragon-node": {
      "version": "2.1.1",
      "resolved": "https://registry.npmjs.org/snapdragon-node/-/snapdragon-node-2.1.1.tgz",
      "integrity": "sha512-O27l4xaMYt/RSQ5TR3vpWCAB5Kb/czIcqUFOM/C4fYcLnbZUc1PkjTAMjof2pBWaSTwOUd6qUHcFGVGj7aIwnw==",
      "requires": {
        "define-property": "^1.0.0",
        "isobject": "^3.0.0",
        "snapdragon-util": "^3.0.1"
      },
      "dependencies": {
        "define-property": {
          "version": "1.0.0",
          "resolved": "https://registry.npmjs.org/define-property/-/define-property-1.0.0.tgz",
          "integrity": "sha1-dp66rz9KY6rTr56NMEybvnm/sOY=",
          "requires": {
            "is-descriptor": "^1.0.0"
          }
        },
        "is-accessor-descriptor": {
          "version": "1.0.0",
          "resolved": "https://registry.npmjs.org/is-accessor-descriptor/-/is-accessor-descriptor-1.0.0.tgz",
          "integrity": "sha512-m5hnHTkcVsPfqx3AKlyttIPb7J+XykHvJP2B9bZDjlhLIoEq4XoK64Vg7boZlVWYK6LUY94dYPEE7Lh0ZkZKcQ==",
          "requires": {
            "kind-of": "^6.0.0"
          }
        },
        "is-data-descriptor": {
          "version": "1.0.0",
          "resolved": "https://registry.npmjs.org/is-data-descriptor/-/is-data-descriptor-1.0.0.tgz",
          "integrity": "sha512-jbRXy1FmtAoCjQkVmIVYwuuqDFUbaOeDjmed1tOGPrsMhtJA4rD9tkgA0F1qJ3gRFRXcHYVkdeaP50Q5rE/jLQ==",
          "requires": {
            "kind-of": "^6.0.0"
          }
        },
        "is-descriptor": {
          "version": "1.0.2",
          "resolved": "https://registry.npmjs.org/is-descriptor/-/is-descriptor-1.0.2.tgz",
          "integrity": "sha512-2eis5WqQGV7peooDyLmNEPUrps9+SXX5c9pL3xEB+4e9HnGuDa7mB7kHxHw4CbqS9k1T2hOH3miL8n8WtiYVtg==",
          "requires": {
            "is-accessor-descriptor": "^1.0.0",
            "is-data-descriptor": "^1.0.0",
            "kind-of": "^6.0.2"
          }
        }
      }
    },
    "snapdragon-util": {
      "version": "3.0.1",
      "resolved": "https://registry.npmjs.org/snapdragon-util/-/snapdragon-util-3.0.1.tgz",
      "integrity": "sha512-mbKkMdQKsjX4BAL4bRYTj21edOf8cN7XHdYUJEe+Zn99hVEYcMvKPct1IqNe7+AZPirn8BCDOQBHQZknqmKlZQ==",
      "requires": {
        "kind-of": "^3.2.0"
      },
      "dependencies": {
        "kind-of": {
          "version": "3.2.2",
          "resolved": "https://registry.npmjs.org/kind-of/-/kind-of-3.2.2.tgz",
          "integrity": "sha1-MeohpzS6ubuw8yRm2JOupR5KPGQ=",
          "requires": {
            "is-buffer": "^1.1.5"
          }
        }
      }
    },
    "sockjs": {
      "version": "0.3.19",
      "resolved": "https://registry.npmjs.org/sockjs/-/sockjs-0.3.19.tgz",
      "integrity": "sha512-V48klKZl8T6MzatbLlzzRNhMepEys9Y4oGFpypBFFn1gLI/QQ9HtLLyWJNbPlwGLelOVOEijUbTTJeLLI59jLw==",
      "requires": {
        "faye-websocket": "^0.10.0",
        "uuid": "^3.0.1"
      },
      "dependencies": {
        "faye-websocket": {
          "version": "0.10.0",
          "resolved": "https://registry.npmjs.org/faye-websocket/-/faye-websocket-0.10.0.tgz",
          "integrity": "sha1-TkkvjQTftviQA1B/btvy1QHnxvQ=",
          "requires": {
            "websocket-driver": ">=0.5.1"
          }
        }
      }
    },
    "sockjs-client": {
      "version": "1.3.0",
      "resolved": "https://registry.npmjs.org/sockjs-client/-/sockjs-client-1.3.0.tgz",
      "integrity": "sha512-R9jxEzhnnrdxLCNln0xg5uGHqMnkhPSTzUZH2eXcR03S/On9Yvoq2wyUZILRUhZCNVu2PmwWVoyuiPz8th8zbg==",
      "requires": {
        "debug": "^3.2.5",
        "eventsource": "^1.0.7",
        "faye-websocket": "~0.11.1",
        "inherits": "^2.0.3",
        "json3": "^3.3.2",
        "url-parse": "^1.4.3"
      },
      "dependencies": {
        "debug": {
          "version": "3.2.6",
          "resolved": "https://registry.npmjs.org/debug/-/debug-3.2.6.tgz",
          "integrity": "sha512-mel+jf7nrtEl5Pn1Qx46zARXKDpBbvzezse7p7LqINmdoIk8PYP5SySaxEmYv6TZ0JyEKA1hsCId6DIhgITtWQ==",
          "requires": {
            "ms": "^2.1.1"
          }
        },
        "ms": {
          "version": "2.1.2",
          "resolved": "https://registry.npmjs.org/ms/-/ms-2.1.2.tgz",
          "integrity": "sha512-sGkPx+VjMtmA6MX27oA4FBFELFCZZ4S4XqeGOXCv68tT+jb3vk/RyaKWP0PTKyWtmLSM0b+adUTEvbs1PEaH2w=="
        }
      }
    },
    "source-list-map": {
      "version": "2.0.1",
      "resolved": "https://registry.npmjs.org/source-list-map/-/source-list-map-2.0.1.tgz",
      "integrity": "sha512-qnQ7gVMxGNxsiL4lEuJwe/To8UnK7fAnmbGEEH8RpLouuKbeEm0lhbQVFIrNSuB+G7tVrAlVsZgETT5nljf+Iw=="
    },
    "source-map": {
      "version": "0.5.7",
      "resolved": "https://registry.npmjs.org/source-map/-/source-map-0.5.7.tgz",
      "integrity": "sha1-igOdLRAh0i0eoUyA2OpGi6LvP8w="
    },
    "source-map-resolve": {
      "version": "0.5.2",
      "resolved": "https://registry.npmjs.org/source-map-resolve/-/source-map-resolve-0.5.2.tgz",
      "integrity": "sha512-MjqsvNwyz1s0k81Goz/9vRBe9SZdB09Bdw+/zYyO+3CuPk6fouTaxscHkgtE8jKvf01kVfl8riHzERQ/kefaSA==",
      "requires": {
        "atob": "^2.1.1",
        "decode-uri-component": "^0.2.0",
        "resolve-url": "^0.2.1",
        "source-map-url": "^0.4.0",
        "urix": "^0.1.0"
      }
    },
    "source-map-support": {
      "version": "0.5.13",
      "resolved": "https://registry.npmjs.org/source-map-support/-/source-map-support-0.5.13.tgz",
      "integrity": "sha512-SHSKFHadjVA5oR4PPqhtAVdcBWwRYVd6g6cAXnIbRiIwc2EhPrTuKUBdSLvlEKyIP3GCf89fltvcZiP9MMFA1w==",
      "requires": {
        "buffer-from": "^1.0.0",
        "source-map": "^0.6.0"
      },
      "dependencies": {
        "source-map": {
          "version": "0.6.1",
          "resolved": "https://registry.npmjs.org/source-map/-/source-map-0.6.1.tgz",
          "integrity": "sha512-UjgapumWlbMhkBgzT7Ykc5YXUT46F0iKu8SGXq0bcwP5dz/h0Plj6enJqjz1Zbq2l5WaqYnrVbwWOWMyF3F47g=="
        }
      }
    },
    "source-map-url": {
      "version": "0.4.0",
      "resolved": "https://registry.npmjs.org/source-map-url/-/source-map-url-0.4.0.tgz",
      "integrity": "sha1-PpNdfd1zYxuXZZlW1VEo6HtQhKM="
    },
    "spdx-correct": {
      "version": "3.1.0",
      "resolved": "https://registry.npmjs.org/spdx-correct/-/spdx-correct-3.1.0.tgz",
      "integrity": "sha512-lr2EZCctC2BNR7j7WzJ2FpDznxky1sjfxvvYEyzxNyb6lZXHODmEoJeFu4JupYlkfha1KZpJyoqiJ7pgA1qq8Q==",
      "requires": {
        "spdx-expression-parse": "^3.0.0",
        "spdx-license-ids": "^3.0.0"
      }
    },
    "spdx-exceptions": {
      "version": "2.2.0",
      "resolved": "https://registry.npmjs.org/spdx-exceptions/-/spdx-exceptions-2.2.0.tgz",
      "integrity": "sha512-2XQACfElKi9SlVb1CYadKDXvoajPgBVPn/gOQLrTvHdElaVhr7ZEbqJaRnJLVNeaI4cMEAgVCeBMKF6MWRDCRA=="
    },
    "spdx-expression-parse": {
      "version": "3.0.0",
      "resolved": "https://registry.npmjs.org/spdx-expression-parse/-/spdx-expression-parse-3.0.0.tgz",
      "integrity": "sha512-Yg6D3XpRD4kkOmTpdgbUiEJFKghJH03fiC1OPll5h/0sO6neh2jqRDVHOQ4o/LMea0tgCkbMgea5ip/e+MkWyg==",
      "requires": {
        "spdx-exceptions": "^2.1.0",
        "spdx-license-ids": "^3.0.0"
      }
    },
    "spdx-license-ids": {
      "version": "3.0.5",
      "resolved": "https://registry.npmjs.org/spdx-license-ids/-/spdx-license-ids-3.0.5.tgz",
      "integrity": "sha512-J+FWzZoynJEXGphVIS+XEh3kFSjZX/1i9gFBaWQcB+/tmpe2qUsSBABpcxqxnAxFdiUFEgAX1bjYGQvIZmoz9Q=="
    },
    "spdy": {
      "version": "4.0.1",
      "resolved": "https://registry.npmjs.org/spdy/-/spdy-4.0.1.tgz",
      "integrity": "sha512-HeZS3PBdMA+sZSu0qwpCxl3DeALD5ASx8pAX0jZdKXSpPWbQ6SYGnlg3BBmYLx5LtiZrmkAZfErCm2oECBcioA==",
      "requires": {
        "debug": "^4.1.0",
        "handle-thing": "^2.0.0",
        "http-deceiver": "^1.2.7",
        "select-hose": "^2.0.0",
        "spdy-transport": "^3.0.0"
      },
      "dependencies": {
        "debug": {
          "version": "4.1.1",
          "resolved": "https://registry.npmjs.org/debug/-/debug-4.1.1.tgz",
          "integrity": "sha512-pYAIzeRo8J6KPEaJ0VWOh5Pzkbw/RetuzehGM7QRRX5he4fPHx2rdKMB256ehJCkX+XRQm16eZLqLNS8RSZXZw==",
          "requires": {
            "ms": "^2.1.1"
          }
        },
        "ms": {
          "version": "2.1.2",
          "resolved": "https://registry.npmjs.org/ms/-/ms-2.1.2.tgz",
          "integrity": "sha512-sGkPx+VjMtmA6MX27oA4FBFELFCZZ4S4XqeGOXCv68tT+jb3vk/RyaKWP0PTKyWtmLSM0b+adUTEvbs1PEaH2w=="
        }
      }
    },
    "spdy-transport": {
      "version": "3.0.0",
      "resolved": "https://registry.npmjs.org/spdy-transport/-/spdy-transport-3.0.0.tgz",
      "integrity": "sha512-hsLVFE5SjA6TCisWeJXFKniGGOpBgMLmerfO2aCyCU5s7nJ/rpAepqmFifv/GCbSbueEeAJJnmSQ2rKC/g8Fcw==",
      "requires": {
        "debug": "^4.1.0",
        "detect-node": "^2.0.4",
        "hpack.js": "^2.1.6",
        "obuf": "^1.1.2",
        "readable-stream": "^3.0.6",
        "wbuf": "^1.7.3"
      },
      "dependencies": {
        "debug": {
          "version": "4.1.1",
          "resolved": "https://registry.npmjs.org/debug/-/debug-4.1.1.tgz",
          "integrity": "sha512-pYAIzeRo8J6KPEaJ0VWOh5Pzkbw/RetuzehGM7QRRX5he4fPHx2rdKMB256ehJCkX+XRQm16eZLqLNS8RSZXZw==",
          "requires": {
            "ms": "^2.1.1"
          }
        },
        "ms": {
          "version": "2.1.2",
          "resolved": "https://registry.npmjs.org/ms/-/ms-2.1.2.tgz",
          "integrity": "sha512-sGkPx+VjMtmA6MX27oA4FBFELFCZZ4S4XqeGOXCv68tT+jb3vk/RyaKWP0PTKyWtmLSM0b+adUTEvbs1PEaH2w=="
        },
        "readable-stream": {
          "version": "3.4.0",
          "resolved": "https://registry.npmjs.org/readable-stream/-/readable-stream-3.4.0.tgz",
          "integrity": "sha512-jItXPLmrSR8jmTRmRWJXCnGJsfy85mB3Wd/uINMXA65yrnFo0cPClFIUWzo2najVNSl+mx7/4W8ttlLWJe99pQ==",
          "requires": {
            "inherits": "^2.0.3",
            "string_decoder": "^1.1.1",
            "util-deprecate": "^1.0.1"
          }
        }
      }
    },
    "split-string": {
      "version": "3.1.0",
      "resolved": "https://registry.npmjs.org/split-string/-/split-string-3.1.0.tgz",
      "integrity": "sha512-NzNVhJDYpwceVVii8/Hu6DKfD2G+NrQHlS/V/qgv763EYudVwEcMQNxd2lh+0VrUByXN/oJkl5grOhYWvQUYiw==",
      "requires": {
        "extend-shallow": "^3.0.0"
      }
    },
    "sprintf-js": {
      "version": "1.0.3",
      "resolved": "https://registry.npmjs.org/sprintf-js/-/sprintf-js-1.0.3.tgz",
      "integrity": "sha1-BOaSb2YolTVPPdAVIDYzuFcpfiw="
    },
    "sshpk": {
      "version": "1.16.1",
      "resolved": "https://registry.npmjs.org/sshpk/-/sshpk-1.16.1.tgz",
      "integrity": "sha512-HXXqVUq7+pcKeLqqZj6mHFUMvXtOJt1uoUx09pFW6011inTMxqI8BA8PM95myrIyyKwdnzjdFjLiE6KBPVtJIg==",
      "requires": {
        "asn1": "~0.2.3",
        "assert-plus": "^1.0.0",
        "bcrypt-pbkdf": "^1.0.0",
        "dashdash": "^1.12.0",
        "ecc-jsbn": "~0.1.1",
        "getpass": "^0.1.1",
        "jsbn": "~0.1.0",
        "safer-buffer": "^2.0.2",
        "tweetnacl": "~0.14.0"
      }
    },
    "ssri": {
      "version": "6.0.1",
      "resolved": "https://registry.npmjs.org/ssri/-/ssri-6.0.1.tgz",
      "integrity": "sha512-3Wge10hNcT1Kur4PDFwEieXSCMCJs/7WvSACcrMYrNp+b8kDL1/0wJch5Ni2WrtwEa2IO8OsVfeKIciKCDx/QA==",
      "requires": {
        "figgy-pudding": "^3.5.1"
      }
    },
    "stable": {
      "version": "0.1.8",
      "resolved": "https://registry.npmjs.org/stable/-/stable-0.1.8.tgz",
      "integrity": "sha512-ji9qxRnOVfcuLDySj9qzhGSEFVobyt1kIOSkj1qZzYLzq7Tos/oUUWvotUPQLlrsidqsK6tBH89Bc9kL5zHA6w=="
    },
    "stack-trace": {
      "version": "0.0.10",
      "resolved": "https://registry.npmjs.org/stack-trace/-/stack-trace-0.0.10.tgz",
      "integrity": "sha1-VHxws0fo0ytOEI6hoqFZ5f3eGcA="
    },
    "stack-utils": {
      "version": "1.0.2",
      "resolved": "https://registry.npmjs.org/stack-utils/-/stack-utils-1.0.2.tgz",
      "integrity": "sha512-MTX+MeG5U994cazkjd/9KNAapsHnibjMLnfXodlkXw76JEea0UiNzrqidzo1emMwk7w5Qhc9jd4Bn9TBb1MFwA=="
    },
    "static-extend": {
      "version": "0.1.2",
      "resolved": "https://registry.npmjs.org/static-extend/-/static-extend-0.1.2.tgz",
      "integrity": "sha1-YICcOcv/VTNyJv1eC1IPNB8ftcY=",
      "requires": {
        "define-property": "^0.2.5",
        "object-copy": "^0.1.0"
      },
      "dependencies": {
        "define-property": {
          "version": "0.2.5",
          "resolved": "https://registry.npmjs.org/define-property/-/define-property-0.2.5.tgz",
          "integrity": "sha1-w1se+RjsPJkPmlvFe+BKrOxcgRY=",
          "requires": {
            "is-descriptor": "^0.1.0"
          }
        }
      }
    },
    "statuses": {
      "version": "1.5.0",
      "resolved": "https://registry.npmjs.org/statuses/-/statuses-1.5.0.tgz",
      "integrity": "sha1-Fhx9rBd2Wf2YEfQ3cfqZOBR4Yow="
    },
    "stealthy-require": {
      "version": "1.1.1",
      "resolved": "https://registry.npmjs.org/stealthy-require/-/stealthy-require-1.1.1.tgz",
      "integrity": "sha1-NbCYdbT/SfJqd35QmzCQoyJr8ks="
    },
    "stream-browserify": {
      "version": "2.0.2",
      "resolved": "https://registry.npmjs.org/stream-browserify/-/stream-browserify-2.0.2.tgz",
      "integrity": "sha512-nX6hmklHs/gr2FuxYDltq8fJA1GDlxKQCz8O/IM4atRqBH8OORmBNgfvW5gG10GT/qQ9u0CzIvr2X5Pkt6ntqg==",
      "requires": {
        "inherits": "~2.0.1",
        "readable-stream": "^2.0.2"
      }
    },
    "stream-each": {
      "version": "1.2.3",
      "resolved": "https://registry.npmjs.org/stream-each/-/stream-each-1.2.3.tgz",
      "integrity": "sha512-vlMC2f8I2u/bZGqkdfLQW/13Zihpej/7PmSiMQsbYddxuTsJp8vRe2x2FvVExZg7FaOds43ROAuFJwPR4MTZLw==",
      "requires": {
        "end-of-stream": "^1.1.0",
        "stream-shift": "^1.0.0"
      }
    },
    "stream-http": {
      "version": "2.8.3",
      "resolved": "https://registry.npmjs.org/stream-http/-/stream-http-2.8.3.tgz",
      "integrity": "sha512-+TSkfINHDo4J+ZobQLWiMouQYB+UVYFttRA94FpEzzJ7ZdqcL4uUUQ7WkdkI4DSozGmgBUE/a47L+38PenXhUw==",
      "requires": {
        "builtin-status-codes": "^3.0.0",
        "inherits": "^2.0.1",
        "readable-stream": "^2.3.6",
        "to-arraybuffer": "^1.0.0",
        "xtend": "^4.0.0"
      }
    },
    "stream-shift": {
      "version": "1.0.0",
      "resolved": "https://registry.npmjs.org/stream-shift/-/stream-shift-1.0.0.tgz",
      "integrity": "sha1-1cdSgl5TZ+eG944Y5EXqIjoVWVI="
    },
    "string-length": {
      "version": "1.0.1",
      "resolved": "https://registry.npmjs.org/string-length/-/string-length-1.0.1.tgz",
      "integrity": "sha1-VpcPscOFWOnnC3KL894mmsRa36w=",
      "requires": {
        "strip-ansi": "^3.0.0"
      }
    },
    "string-width": {
      "version": "2.1.1",
      "resolved": "https://registry.npmjs.org/string-width/-/string-width-2.1.1.tgz",
      "integrity": "sha512-nOqH59deCq9SRHlxq1Aw85Jnt4w6KvLKqWVik6oA9ZklXLNIOlqg4F2yrT1MVaTjAqvVwdfeZ7w7aCvJD7ugkw==",
      "requires": {
        "is-fullwidth-code-point": "^2.0.0",
        "strip-ansi": "^4.0.0"
      },
      "dependencies": {
        "ansi-regex": {
          "version": "3.0.0",
          "resolved": "https://registry.npmjs.org/ansi-regex/-/ansi-regex-3.0.0.tgz",
          "integrity": "sha1-7QMXwyIGT3lGbAKWa922Bas32Zg="
        },
        "strip-ansi": {
          "version": "4.0.0",
          "resolved": "https://registry.npmjs.org/strip-ansi/-/strip-ansi-4.0.0.tgz",
          "integrity": "sha1-qEeQIusaw2iocTibY1JixQXuNo8=",
          "requires": {
            "ansi-regex": "^3.0.0"
          }
        }
      }
    },
    "string_decoder": {
      "version": "1.1.1",
      "resolved": "https://registry.npmjs.org/string_decoder/-/string_decoder-1.1.1.tgz",
      "integrity": "sha512-n/ShnvDi6FHbbVfviro+WojiFzv+s8MPMHBczVePfUpDJLwoLT0ht1l4YwBCbi8pJAveEEdnkHyPyTP/mzRfwg==",
      "requires": {
        "safe-buffer": "~5.1.0"
      }
    },
    "stringify-object": {
      "version": "3.3.0",
      "resolved": "https://registry.npmjs.org/stringify-object/-/stringify-object-3.3.0.tgz",
      "integrity": "sha512-rHqiFh1elqCQ9WPLIC8I0Q/g/wj5J1eMkyoiD6eoQApWHP0FtlK7rqnhmabL5VUY9JQCcqwwvlOaSuutekgyrw==",
      "requires": {
        "get-own-enumerable-property-symbols": "^3.0.0",
        "is-obj": "^1.0.1",
        "is-regexp": "^1.0.0"
      }
    },
    "strip-ansi": {
      "version": "3.0.1",
      "resolved": "https://registry.npmjs.org/strip-ansi/-/strip-ansi-3.0.1.tgz",
      "integrity": "sha1-ajhfuIU9lS1f8F0Oiq+UJ43GPc8=",
      "requires": {
        "ansi-regex": "^2.0.0"
      }
    },
    "strip-bom": {
      "version": "3.0.0",
      "resolved": "https://registry.npmjs.org/strip-bom/-/strip-bom-3.0.0.tgz",
      "integrity": "sha1-IzTBjpx1n3vdVv3vfprj1YjmjtM="
    },
    "strip-comments": {
      "version": "1.0.2",
      "resolved": "https://registry.npmjs.org/strip-comments/-/strip-comments-1.0.2.tgz",
      "integrity": "sha512-kL97alc47hoyIQSV165tTt9rG5dn4w1dNnBhOQ3bOU1Nc1hel09jnXANaHJ7vzHLd4Ju8kseDGzlev96pghLFw==",
      "requires": {
        "babel-extract-comments": "^1.0.0",
        "babel-plugin-transform-object-rest-spread": "^6.26.0"
      }
    },
    "strip-eof": {
      "version": "1.0.0",
      "resolved": "https://registry.npmjs.org/strip-eof/-/strip-eof-1.0.0.tgz",
      "integrity": "sha1-u0P/VZim6wXYm1n80SnJgzE2Br8="
    },
    "strip-json-comments": {
      "version": "2.0.1",
      "resolved": "https://registry.npmjs.org/strip-json-comments/-/strip-json-comments-2.0.1.tgz",
      "integrity": "sha1-PFMZQukIwml8DsNEhYwobHygpgo="
    },
    "style-loader": {
      "version": "0.23.1",
      "resolved": "https://registry.npmjs.org/style-loader/-/style-loader-0.23.1.tgz",
      "integrity": "sha512-XK+uv9kWwhZMZ1y7mysB+zoihsEj4wneFWAS5qoiLwzW0WzSqMrrsIy+a3zkQJq0ipFtBpX5W3MqyRIBF/WFGg==",
      "requires": {
        "loader-utils": "^1.1.0",
        "schema-utils": "^1.0.0"
      }
    },
    "stylehacks": {
      "version": "4.0.3",
      "resolved": "https://registry.npmjs.org/stylehacks/-/stylehacks-4.0.3.tgz",
      "integrity": "sha512-7GlLk9JwlElY4Y6a/rmbH2MhVlTyVmiJd1PfTCqFaIBEGMYNsrO/v3SeGTdhBThLg4Z+NbOk/qFMwCa+J+3p/g==",
      "requires": {
        "browserslist": "^4.0.0",
        "postcss": "^7.0.0",
        "postcss-selector-parser": "^3.0.0"
      },
      "dependencies": {
        "postcss-selector-parser": {
          "version": "3.1.1",
          "resolved": "https://registry.npmjs.org/postcss-selector-parser/-/postcss-selector-parser-3.1.1.tgz",
          "integrity": "sha1-T4dfSvsMllc9XPTXQBGu4lCn6GU=",
          "requires": {
            "dot-prop": "^4.1.1",
            "indexes-of": "^1.0.1",
            "uniq": "^1.0.1"
          }
        }
      }
    },
    "superstatic": {
      "version": "6.0.4",
      "resolved": "https://registry.npmjs.org/superstatic/-/superstatic-6.0.4.tgz",
      "integrity": "sha512-Nfli9mSPa9fJloKuDeUOdqC1lcw4c4SnxiWPB8s7Yn1iYo7Ja3pj7qc8AXMqHVqn/Kf7QsxBjAeOJTpuJ0mcrQ==",
      "requires": {
        "as-array": "^2.0.0",
        "async": "^1.5.2",
        "basic-auth-connect": "^1.0.0",
        "chalk": "^1.1.3",
        "char-spinner": "^1.0.1",
        "compare-semver": "^1.0.0",
        "compression": "^1.7.0",
        "connect": "^3.6.2",
        "connect-query": "^1.0.0",
        "destroy": "^1.0.4",
        "fast-url-parser": "^1.1.3",
        "fs-extra": "^0.30.0",
        "glob": "^7.1.2",
        "glob-slasher": "^1.0.1",
        "home-dir": "^1.0.0",
        "is-url": "^1.2.2",
        "join-path": "^1.1.1",
        "lodash": "^4.17.4",
        "mime-types": "^2.1.16",
        "minimatch": "^3.0.4",
        "morgan": "^1.8.2",
        "nash": "^3.0.0",
        "on-finished": "^2.2.0",
        "on-headers": "^1.0.0",
        "path-to-regexp": "^1.7.0",
        "router": "^1.3.1",
        "rsvp": "^3.6.2",
        "string-length": "^1.0.0",
        "try-require": "^1.0.0",
        "update-notifier": "^2.5.0"
      },
      "dependencies": {
        "async": {
          "version": "1.5.2",
          "resolved": "https://registry.npmjs.org/async/-/async-1.5.2.tgz",
          "integrity": "sha1-7GphrlZIDAw8skHJVhjiCJL5Zyo="
        },
        "fs-extra": {
          "version": "0.30.0",
          "resolved": "https://registry.npmjs.org/fs-extra/-/fs-extra-0.30.0.tgz",
          "integrity": "sha1-8jP/zAjU2n1DLapEl3aYnbHfk/A=",
          "requires": {
            "graceful-fs": "^4.1.2",
            "jsonfile": "^2.1.0",
            "klaw": "^1.0.0",
            "path-is-absolute": "^1.0.0",
            "rimraf": "^2.2.8"
          }
        },
        "isarray": {
          "version": "0.0.1",
          "resolved": "https://registry.npmjs.org/isarray/-/isarray-0.0.1.tgz",
          "integrity": "sha1-ihis/Kmo9Bd+Cav8YDiTmwXR7t8="
        },
        "path-to-regexp": {
          "version": "1.7.0",
          "resolved": "https://registry.npmjs.org/path-to-regexp/-/path-to-regexp-1.7.0.tgz",
          "integrity": "sha1-Wf3g9DW62suhA6hOnTvGTpa5k30=",
          "requires": {
            "isarray": "0.0.1"
          }
        }
      }
    },
    "supports-color": {
      "version": "2.0.0",
      "resolved": "https://registry.npmjs.org/supports-color/-/supports-color-2.0.0.tgz",
      "integrity": "sha1-U10EXOa2Nj+kARcIRimZXp3zJMc="
    },
    "svg-parser": {
      "version": "2.0.2",
      "resolved": "https://registry.npmjs.org/svg-parser/-/svg-parser-2.0.2.tgz",
      "integrity": "sha512-1gtApepKFweigFZj3sGO8KT8LvVZK8io146EzXrpVuWCDAbISz/yMucco3hWTkpZNoPabM+dnMOpy6Swue68Zg=="
    },
    "svgo": {
      "version": "1.3.0",
      "resolved": "https://registry.npmjs.org/svgo/-/svgo-1.3.0.tgz",
      "integrity": "sha512-MLfUA6O+qauLDbym+mMZgtXCGRfIxyQoeH6IKVcFslyODEe/ElJNwr0FohQ3xG4C6HK6bk3KYPPXwHVJk3V5NQ==",
      "requires": {
        "chalk": "^2.4.1",
        "coa": "^2.0.2",
        "css-select": "^2.0.0",
        "css-select-base-adapter": "^0.1.1",
        "css-tree": "1.0.0-alpha.33",
        "csso": "^3.5.1",
        "js-yaml": "^3.13.1",
        "mkdirp": "~0.5.1",
        "object.values": "^1.1.0",
        "sax": "~1.2.4",
        "stable": "^0.1.8",
        "unquote": "~1.1.1",
        "util.promisify": "~1.0.0"
      },
      "dependencies": {
        "ansi-styles": {
          "version": "3.2.1",
          "resolved": "https://registry.npmjs.org/ansi-styles/-/ansi-styles-3.2.1.tgz",
          "integrity": "sha512-VT0ZI6kZRdTh8YyJw3SMbYm/u+NqfsAxEpWO0Pf9sq8/e94WxxOpPKx9FR1FlyCtOVDNOQ+8ntlqFxiRc+r5qA==",
          "requires": {
            "color-convert": "^1.9.0"
          }
        },
        "chalk": {
          "version": "2.4.2",
          "resolved": "https://registry.npmjs.org/chalk/-/chalk-2.4.2.tgz",
          "integrity": "sha512-Mti+f9lpJNcwF4tWV8/OrTTtF1gZi+f8FqlyAdouralcFWFQWF2+NgCHShjkCb+IFBLq9buZwE1xckQU4peSuQ==",
          "requires": {
            "ansi-styles": "^3.2.1",
            "escape-string-regexp": "^1.0.5",
            "supports-color": "^5.3.0"
          }
        },
        "supports-color": {
          "version": "5.5.0",
          "resolved": "https://registry.npmjs.org/supports-color/-/supports-color-5.5.0.tgz",
          "integrity": "sha512-QjVjwdXIt408MIiAqCX4oUKsgU2EqAGzs2Ppkm4aQYbjm+ZEWEcW4SfFNTr4uMNZma0ey4f5lgLrkB0aX0QMow==",
          "requires": {
            "has-flag": "^3.0.0"
          }
        }
      }
    },
    "symbol-tree": {
      "version": "3.2.4",
      "resolved": "https://registry.npmjs.org/symbol-tree/-/symbol-tree-3.2.4.tgz",
      "integrity": "sha512-9QNk5KwDF+Bvz+PyObkmSYjI5ksVUYtjW7AU22r2NKcfLJcXp96hkDWU3+XndOsUb+AQ9QhfzfCT2O+CNWT5Tw=="
    },
    "table": {
      "version": "4.0.3",
      "resolved": "https://registry.npmjs.org/table/-/table-4.0.3.tgz",
      "integrity": "sha512-S7rnFITmBH1EnyKcvxBh1LjYeQMmnZtCXSEbHcH6S0NoKit24ZuFO/T1vDcLdYsLQkM188PVVhQmzKIuThNkKg==",
      "requires": {
        "ajv": "^6.0.1",
        "ajv-keywords": "^3.0.0",
        "chalk": "^2.1.0",
        "lodash": "^4.17.4",
        "slice-ansi": "1.0.0",
        "string-width": "^2.1.1"
      },
      "dependencies": {
        "ansi-styles": {
          "version": "3.2.1",
          "resolved": "https://registry.npmjs.org/ansi-styles/-/ansi-styles-3.2.1.tgz",
          "integrity": "sha512-VT0ZI6kZRdTh8YyJw3SMbYm/u+NqfsAxEpWO0Pf9sq8/e94WxxOpPKx9FR1FlyCtOVDNOQ+8ntlqFxiRc+r5qA==",
          "requires": {
            "color-convert": "^1.9.0"
          }
        },
        "chalk": {
          "version": "2.4.2",
          "resolved": "https://registry.npmjs.org/chalk/-/chalk-2.4.2.tgz",
          "integrity": "sha512-Mti+f9lpJNcwF4tWV8/OrTTtF1gZi+f8FqlyAdouralcFWFQWF2+NgCHShjkCb+IFBLq9buZwE1xckQU4peSuQ==",
          "requires": {
            "ansi-styles": "^3.2.1",
            "escape-string-regexp": "^1.0.5",
            "supports-color": "^5.3.0"
          }
        },
        "supports-color": {
          "version": "5.5.0",
          "resolved": "https://registry.npmjs.org/supports-color/-/supports-color-5.5.0.tgz",
          "integrity": "sha512-QjVjwdXIt408MIiAqCX4oUKsgU2EqAGzs2Ppkm4aQYbjm+ZEWEcW4SfFNTr4uMNZma0ey4f5lgLrkB0aX0QMow==",
          "requires": {
            "has-flag": "^3.0.0"
          }
        }
      }
    },
    "tapable": {
      "version": "1.1.3",
      "resolved": "https://registry.npmjs.org/tapable/-/tapable-1.1.3.tgz",
      "integrity": "sha512-4WK/bYZmj8xLr+HUCODHGF1ZFzsYffasLUgEiMBY4fgtltdO6B4WJtlSbPaDTLpYTcGVwM2qLnFTICEcNxs3kA=="
    },
    "tar": {
      "version": "4.4.8",
      "resolved": "https://registry.npmjs.org/tar/-/tar-4.4.8.tgz",
      "integrity": "sha512-LzHF64s5chPQQS0IYBn9IN5h3i98c12bo4NCO7e0sGM2llXQ3p2FGC5sdENN4cTW48O915Sh+x+EXx7XW96xYQ==",
      "requires": {
        "chownr": "^1.1.1",
        "fs-minipass": "^1.2.5",
        "minipass": "^2.3.4",
        "minizlib": "^1.1.1",
        "mkdirp": "^0.5.0",
        "safe-buffer": "^5.1.2",
        "yallist": "^3.0.2"
      },
      "dependencies": {
        "yallist": {
          "version": "3.0.3",
          "resolved": "https://registry.npmjs.org/yallist/-/yallist-3.0.3.tgz",
          "integrity": "sha512-S+Zk8DEWE6oKpV+vI3qWkaK+jSbIK86pCwe2IF/xwIpQ8jEuxpw9NyaGjmp9+BoJv5FV2piqCDcoCtStppiq2A=="
        }
      }
    },
    "tar-stream": {
      "version": "1.6.2",
      "resolved": "https://registry.npmjs.org/tar-stream/-/tar-stream-1.6.2.tgz",
      "integrity": "sha512-rzS0heiNf8Xn7/mpdSVVSMAWAoy9bfb1WOTYC78Z0UQKeKa/CWS8FOq0lKGNa8DWKAn9gxjCvMLYc5PGXYlK2A==",
      "requires": {
        "bl": "^1.0.0",
        "buffer-alloc": "^1.2.0",
        "end-of-stream": "^1.0.0",
        "fs-constants": "^1.0.0",
        "readable-stream": "^2.3.0",
        "to-buffer": "^1.1.1",
        "xtend": "^4.0.0"
      }
    },
    "term-size": {
      "version": "1.2.0",
      "resolved": "https://registry.npmjs.org/term-size/-/term-size-1.2.0.tgz",
      "integrity": "sha1-RYuDiH8oj8Vtb/+/rSYuJmOO+mk=",
      "requires": {
        "execa": "^0.7.0"
      }
    },
    "terser": {
      "version": "3.17.0",
      "resolved": "https://registry.npmjs.org/terser/-/terser-3.17.0.tgz",
      "integrity": "sha512-/FQzzPJmCpjAH9Xvk2paiWrFq+5M6aVOf+2KRbwhByISDX/EujxsK+BAvrhb6H+2rtrLCHK9N01wO014vrIwVQ==",
      "requires": {
        "commander": "^2.19.0",
        "source-map": "~0.6.1",
        "source-map-support": "~0.5.10"
      },
      "dependencies": {
        "source-map": {
          "version": "0.6.1",
          "resolved": "https://registry.npmjs.org/source-map/-/source-map-0.6.1.tgz",
          "integrity": "sha512-UjgapumWlbMhkBgzT7Ykc5YXUT46F0iKu8SGXq0bcwP5dz/h0Plj6enJqjz1Zbq2l5WaqYnrVbwWOWMyF3F47g=="
        }
      }
    },
    "terser-webpack-plugin": {
      "version": "1.2.3",
      "resolved": "https://registry.npmjs.org/terser-webpack-plugin/-/terser-webpack-plugin-1.2.3.tgz",
      "integrity": "sha512-GOK7q85oAb/5kE12fMuLdn2btOS9OBZn4VsecpHDywoUC/jLhSAKOiYo0ezx7ss2EXPMzyEWFoE0s1WLE+4+oA==",
      "requires": {
        "cacache": "^11.0.2",
        "find-cache-dir": "^2.0.0",
        "schema-utils": "^1.0.0",
        "serialize-javascript": "^1.4.0",
        "source-map": "^0.6.1",
        "terser": "^3.16.1",
        "webpack-sources": "^1.1.0",
        "worker-farm": "^1.5.2"
      },
      "dependencies": {
        "source-map": {
          "version": "0.6.1",
          "resolved": "https://registry.npmjs.org/source-map/-/source-map-0.6.1.tgz",
          "integrity": "sha512-UjgapumWlbMhkBgzT7Ykc5YXUT46F0iKu8SGXq0bcwP5dz/h0Plj6enJqjz1Zbq2l5WaqYnrVbwWOWMyF3F47g=="
        }
      }
    },
    "test-exclude": {
      "version": "5.2.3",
      "resolved": "https://registry.npmjs.org/test-exclude/-/test-exclude-5.2.3.tgz",
      "integrity": "sha512-M+oxtseCFO3EDtAaGH7iiej3CBkzXqFMbzqYAACdzKui4eZA+pq3tZEwChvOdNfa7xxy8BfbmgJSIr43cC/+2g==",
      "requires": {
        "glob": "^7.1.3",
        "minimatch": "^3.0.4",
        "read-pkg-up": "^4.0.0",
        "require-main-filename": "^2.0.0"
      },
      "dependencies": {
        "find-up": {
          "version": "3.0.0",
          "resolved": "https://registry.npmjs.org/find-up/-/find-up-3.0.0.tgz",
          "integrity": "sha512-1yD6RmLI1XBfxugvORwlck6f75tYL+iR0jqwsOrOxMZyGYqUuDhJ0l4AXdO1iX/FTs9cBAMEk1gWSEx1kSbylg==",
          "requires": {
            "locate-path": "^3.0.0"
          }
        },
        "load-json-file": {
          "version": "4.0.0",
          "resolved": "https://registry.npmjs.org/load-json-file/-/load-json-file-4.0.0.tgz",
          "integrity": "sha1-L19Fq5HjMhYjT9U62rZo607AmTs=",
          "requires": {
            "graceful-fs": "^4.1.2",
            "parse-json": "^4.0.0",
            "pify": "^3.0.0",
            "strip-bom": "^3.0.0"
          }
        },
        "locate-path": {
          "version": "3.0.0",
          "resolved": "https://registry.npmjs.org/locate-path/-/locate-path-3.0.0.tgz",
          "integrity": "sha512-7AO748wWnIhNqAuaty2ZWHkQHRSNfPVIsPIfwEOWO22AmaoVrWavlOcMR5nzTLNYvp36X220/maaRsrec1G65A==",
          "requires": {
            "p-locate": "^3.0.0",
            "path-exists": "^3.0.0"
          }
        },
        "p-limit": {
          "version": "2.2.1",
          "resolved": "https://registry.npmjs.org/p-limit/-/p-limit-2.2.1.tgz",
          "integrity": "sha512-85Tk+90UCVWvbDavCLKPOLC9vvY8OwEX/RtKF+/1OADJMVlFfEHOiMTPVyxg7mk/dKa+ipdHm0OUkTvCpMTuwg==",
          "requires": {
            "p-try": "^2.0.0"
          }
        },
        "p-locate": {
          "version": "3.0.0",
          "resolved": "https://registry.npmjs.org/p-locate/-/p-locate-3.0.0.tgz",
          "integrity": "sha512-x+12w/To+4GFfgJhBEpiDcLozRJGegY+Ei7/z0tSLkMmxGZNybVMSfWj9aJn8Z5Fc7dBUNJOOVgPv2H7IwulSQ==",
          "requires": {
            "p-limit": "^2.0.0"
          }
        },
        "p-try": {
          "version": "2.2.0",
          "resolved": "https://registry.npmjs.org/p-try/-/p-try-2.2.0.tgz",
          "integrity": "sha512-R4nPAVTAU0B9D35/Gk3uJf/7XYbQcyohSKdvAxIRSNghFl4e71hVoGnBNQz9cWaXxO2I10KTC+3jMdvvoKw6dQ=="
        },
        "parse-json": {
          "version": "4.0.0",
          "resolved": "https://registry.npmjs.org/parse-json/-/parse-json-4.0.0.tgz",
          "integrity": "sha1-vjX1Qlvh9/bHRxhPmKeIy5lHfuA=",
          "requires": {
            "error-ex": "^1.3.1",
            "json-parse-better-errors": "^1.0.1"
          }
        },
        "path-type": {
          "version": "3.0.0",
          "resolved": "https://registry.npmjs.org/path-type/-/path-type-3.0.0.tgz",
          "integrity": "sha512-T2ZUsdZFHgA3u4e5PfPbjd7HDDpxPnQb5jN0SrDsjNSuVXHJqtwTnWqG0B1jZrgmJ/7lj1EmVIByWt1gxGkWvg==",
          "requires": {
            "pify": "^3.0.0"
          }
        },
        "pify": {
          "version": "3.0.0",
          "resolved": "https://registry.npmjs.org/pify/-/pify-3.0.0.tgz",
          "integrity": "sha1-5aSs0sEB/fPZpNB/DbxNtJ3SgXY="
        },
        "read-pkg": {
          "version": "3.0.0",
          "resolved": "https://registry.npmjs.org/read-pkg/-/read-pkg-3.0.0.tgz",
          "integrity": "sha1-nLxoaXj+5l0WwA4rGcI3/Pbjg4k=",
          "requires": {
            "load-json-file": "^4.0.0",
            "normalize-package-data": "^2.3.2",
            "path-type": "^3.0.0"
          }
        },
        "read-pkg-up": {
          "version": "4.0.0",
          "resolved": "https://registry.npmjs.org/read-pkg-up/-/read-pkg-up-4.0.0.tgz",
          "integrity": "sha512-6etQSH7nJGsK0RbG/2TeDzZFa8shjQ1um+SwQQ5cwKy0dhSXdOncEhb1CPpvQG4h7FyOV6EB6YlV0yJvZQNAkA==",
          "requires": {
            "find-up": "^3.0.0",
            "read-pkg": "^3.0.0"
          }
        }
      }
    },
    "text-table": {
      "version": "0.2.0",
      "resolved": "https://registry.npmjs.org/text-table/-/text-table-0.2.0.tgz",
      "integrity": "sha1-f17oI66AUgfACvLfSoTsP8+lcLQ="
    },
    "throat": {
      "version": "4.1.0",
      "resolved": "https://registry.npmjs.org/throat/-/throat-4.1.0.tgz",
      "integrity": "sha1-iQN8vJLFarGJJua6TLsgDhVnKmo="
    },
    "through": {
      "version": "2.3.8",
      "resolved": "https://registry.npmjs.org/through/-/through-2.3.8.tgz",
      "integrity": "sha1-DdTJ/6q8NXlgsbckEV1+Doai4fU="
    },
    "through2": {
      "version": "2.0.1",
      "resolved": "https://registry.npmjs.org/through2/-/through2-2.0.1.tgz",
      "integrity": "sha1-OE51MU1J8y3hLuu4E2uOtrXVnak=",
      "requires": {
        "readable-stream": "~2.0.0",
        "xtend": "~4.0.0"
      },
      "dependencies": {
        "process-nextick-args": {
          "version": "1.0.7",
          "resolved": "https://registry.npmjs.org/process-nextick-args/-/process-nextick-args-1.0.7.tgz",
          "integrity": "sha1-FQ4gt1ZZCtP5EJPyWk8q2L/zC6M="
        },
        "readable-stream": {
          "version": "2.0.6",
          "resolved": "https://registry.npmjs.org/readable-stream/-/readable-stream-2.0.6.tgz",
          "integrity": "sha1-j5A0HmilPMySh4jaz80Rs265t44=",
          "requires": {
            "core-util-is": "~1.0.0",
            "inherits": "~2.0.1",
            "isarray": "~1.0.0",
            "process-nextick-args": "~1.0.6",
            "string_decoder": "~0.10.x",
            "util-deprecate": "~1.0.1"
          }
        },
        "string_decoder": {
          "version": "0.10.31",
          "resolved": "https://registry.npmjs.org/string_decoder/-/string_decoder-0.10.31.tgz",
          "integrity": "sha1-YuIDvEF2bGwoyfyEMB2rHFMQ+pQ="
        }
      }
    },
    "thunky": {
      "version": "1.0.3",
      "resolved": "https://registry.npmjs.org/thunky/-/thunky-1.0.3.tgz",
      "integrity": "sha512-YwT8pjmNcAXBZqrubu22P4FYsh2D4dxRmnWBOL8Jk8bUcRUtc5326kx32tuTmFDAZtLOGEVNl8POAR8j896Iow=="
    },
    "timed-out": {
      "version": "4.0.1",
      "resolved": "https://registry.npmjs.org/timed-out/-/timed-out-4.0.1.tgz",
      "integrity": "sha1-8y6srFoXW+ol1/q1Zas+2HQe9W8="
    },
    "timers-browserify": {
      "version": "2.0.11",
      "resolved": "https://registry.npmjs.org/timers-browserify/-/timers-browserify-2.0.11.tgz",
      "integrity": "sha512-60aV6sgJ5YEbzUdn9c8kYGIqOubPoUdqQCul3SBAsRCZ40s6Y5cMcrW4dt3/k/EsbLVJNl9n6Vz3fTc+k2GeKQ==",
      "requires": {
        "setimmediate": "^1.0.4"
      }
    },
    "timers-ext": {
      "version": "0.1.7",
      "resolved": "https://registry.npmjs.org/timers-ext/-/timers-ext-0.1.7.tgz",
      "integrity": "sha512-b85NUNzTSdodShTIbky6ZF02e8STtVVfD+fu4aXXShEELpozH+bCpJLYMPZbsABN2wDH7fJpqIoXxJpzbf0NqQ==",
      "requires": {
        "es5-ext": "~0.10.46",
        "next-tick": "1"
      }
    },
    "timsort": {
      "version": "0.3.0",
      "resolved": "https://registry.npmjs.org/timsort/-/timsort-0.3.0.tgz",
      "integrity": "sha1-QFQRqOfmM5/mTbmiNN4R3DHgK9Q="
    },
    "tiny-invariant": {
      "version": "1.0.6",
      "resolved": "https://registry.npmjs.org/tiny-invariant/-/tiny-invariant-1.0.6.tgz",
      "integrity": "sha512-FOyLWWVjG+aC0UqG76V53yAWdXfH8bO6FNmyZOuUrzDzK8DI3/JRY25UD7+g49JWM1LXwymsKERB+DzI0dTEQA=="
    },
    "tiny-warning": {
      "version": "1.0.3",
      "resolved": "https://registry.npmjs.org/tiny-warning/-/tiny-warning-1.0.3.tgz",
      "integrity": "sha512-lBN9zLN/oAf68o3zNXYrdCt1kP8WsiGW8Oo2ka41b2IM5JL/S1CTyX1rW0mb/zSuJun0ZUrDxx4sqvYS2FWzPA=="
    },
    "tmp": {
      "version": "0.0.33",
      "resolved": "https://registry.npmjs.org/tmp/-/tmp-0.0.33.tgz",
      "integrity": "sha512-jRCJlojKnZ3addtTOjdIqoRuPEKBvNXcGYqzO6zWZX8KfKEpnGY5jfggJQ3EjKuu8D4bJRr0y+cYJFmYbImXGw==",
      "requires": {
        "os-tmpdir": "~1.0.2"
      }
    },
    "tmpl": {
      "version": "1.0.4",
      "resolved": "https://registry.npmjs.org/tmpl/-/tmpl-1.0.4.tgz",
      "integrity": "sha1-I2QN17QtAEM5ERQIIOXPRA5SHdE="
    },
    "to-arraybuffer": {
      "version": "1.0.1",
      "resolved": "https://registry.npmjs.org/to-arraybuffer/-/to-arraybuffer-1.0.1.tgz",
      "integrity": "sha1-fSKbH8xjfkZsoIEYCDanqr/4P0M="
    },
    "to-buffer": {
      "version": "1.1.1",
      "resolved": "https://registry.npmjs.org/to-buffer/-/to-buffer-1.1.1.tgz",
      "integrity": "sha512-lx9B5iv7msuFYE3dytT+KE5tap+rNYw+K4jVkb9R/asAb+pbBSM17jtunHplhBe6RRJdZx3Pn2Jph24O32mOVg=="
    },
    "to-fast-properties": {
      "version": "2.0.0",
      "resolved": "https://registry.npmjs.org/to-fast-properties/-/to-fast-properties-2.0.0.tgz",
      "integrity": "sha1-3F5pjL0HkmW8c+A3doGk5Og/YW4="
    },
    "to-object-path": {
      "version": "0.3.0",
      "resolved": "https://registry.npmjs.org/to-object-path/-/to-object-path-0.3.0.tgz",
      "integrity": "sha1-KXWIt7Dn4KwI4E5nL4XB9JmeF68=",
      "requires": {
        "kind-of": "^3.0.2"
      },
      "dependencies": {
        "kind-of": {
          "version": "3.2.2",
          "resolved": "https://registry.npmjs.org/kind-of/-/kind-of-3.2.2.tgz",
          "integrity": "sha1-MeohpzS6ubuw8yRm2JOupR5KPGQ=",
          "requires": {
            "is-buffer": "^1.1.5"
          }
        }
      }
    },
    "to-regex": {
      "version": "3.0.2",
      "resolved": "https://registry.npmjs.org/to-regex/-/to-regex-3.0.2.tgz",
      "integrity": "sha512-FWtleNAtZ/Ki2qtqej2CXTOayOH9bHDQF+Q48VpWyDXjbYxA4Yz8iDB31zXOBUlOHHKidDbqGVrTUvQMPmBGBw==",
      "requires": {
        "define-property": "^2.0.2",
        "extend-shallow": "^3.0.2",
        "regex-not": "^1.0.2",
        "safe-regex": "^1.1.0"
      }
    },
    "to-regex-range": {
      "version": "2.1.1",
      "resolved": "https://registry.npmjs.org/to-regex-range/-/to-regex-range-2.1.1.tgz",
      "integrity": "sha1-fIDBe53+vlmeJzZ+DU3VWQFB2zg=",
      "requires": {
        "is-number": "^3.0.0",
        "repeat-string": "^1.6.1"
      }
    },
    "toidentifier": {
      "version": "1.0.0",
      "resolved": "https://registry.npmjs.org/toidentifier/-/toidentifier-1.0.0.tgz",
      "integrity": "sha512-yaOH/Pk/VEhBWWTlhI+qXxDFXlejDGcQipMlyxda9nthulaxLZUNcUqFxokp0vcYnvteJln5FNQDRrxj3YcbVw=="
    },
    "tough-cookie": {
      "version": "2.4.3",
      "resolved": "https://registry.npmjs.org/tough-cookie/-/tough-cookie-2.4.3.tgz",
      "integrity": "sha512-Q5srk/4vDM54WJsJio3XNn6K2sCG+CQ8G5Wz6bZhRZoAe/+TxjWB/GlFAnYEbkYVlON9FMk/fE3h2RLpPXo4lQ==",
      "requires": {
        "psl": "^1.1.24",
        "punycode": "^1.4.1"
      },
      "dependencies": {
        "punycode": {
          "version": "1.4.1",
          "resolved": "https://registry.npmjs.org/punycode/-/punycode-1.4.1.tgz",
          "integrity": "sha1-wNWmOycYgArY4esPpSachN1BhF4="
        }
      }
    },
    "toxic": {
      "version": "1.0.1",
      "resolved": "https://registry.npmjs.org/toxic/-/toxic-1.0.1.tgz",
      "integrity": "sha512-WI3rIGdcaKULYg7KVoB0zcjikqvcYYvcuT6D89bFPz2rVR0Rl0PK6x8/X62rtdLtBKIE985NzVf/auTtGegIIg==",
      "requires": {
        "lodash": "^4.17.10"
      }
    },
    "tr46": {
      "version": "1.0.1",
      "resolved": "https://registry.npmjs.org/tr46/-/tr46-1.0.1.tgz",
      "integrity": "sha1-qLE/1r/SSJUZZ0zN5VujaTtwbQk=",
      "requires": {
        "punycode": "^2.1.0"
      }
    },
    "trim-right": {
      "version": "1.0.1",
      "resolved": "https://registry.npmjs.org/trim-right/-/trim-right-1.0.1.tgz",
      "integrity": "sha1-yy4SAwZ+DI3h9hQJS5/kVwTqYAM="
    },
    "try-require": {
      "version": "1.2.1",
      "resolved": "https://registry.npmjs.org/try-require/-/try-require-1.2.1.tgz",
      "integrity": "sha1-NEiaLKwMCcHMEO2RugEVlNQzO+I="
    },
    "ts-pnp": {
      "version": "1.1.2",
      "resolved": "https://registry.npmjs.org/ts-pnp/-/ts-pnp-1.1.2.tgz",
      "integrity": "sha512-f5Knjh7XCyRIzoC/z1Su1yLLRrPrFCgtUAh/9fCSP6NKbATwpOL1+idQVXQokK9GRFURn/jYPGPfegIctwunoA=="
    },
    "tslib": {
      "version": "1.9.3",
      "resolved": "https://registry.npmjs.org/tslib/-/tslib-1.9.3.tgz",
      "integrity": "sha512-4krF8scpejhaOgqzBEcGM7yDIEfi0/8+8zDRZhNZZ2kjmHJ4hv3zCbQWxoJGz1iw5U0Jl0nma13xzHXcncMavQ=="
    },
    "tsutils": {
      "version": "3.17.1",
      "resolved": "https://registry.npmjs.org/tsutils/-/tsutils-3.17.1.tgz",
      "integrity": "sha512-kzeQ5B8H3w60nFY2g8cJIuH7JDpsALXySGtwGJ0p2LSjLgay3NdIpqq5SoOBe46bKDW2iq25irHCr8wjomUS2g==",
      "requires": {
        "tslib": "^1.8.1"
      }
    },
    "tty-browserify": {
      "version": "0.0.0",
      "resolved": "https://registry.npmjs.org/tty-browserify/-/tty-browserify-0.0.0.tgz",
      "integrity": "sha1-oVe6QC2iTpv5V/mqadUk7tQpAaY="
    },
    "tunnel-agent": {
      "version": "0.6.0",
      "resolved": "https://registry.npmjs.org/tunnel-agent/-/tunnel-agent-0.6.0.tgz",
      "integrity": "sha1-J6XeoGs2sEoKmWZ3SykIaPD8QP0=",
      "requires": {
        "safe-buffer": "^5.0.1"
      }
    },
    "tweetnacl": {
      "version": "0.14.5",
      "resolved": "https://registry.npmjs.org/tweetnacl/-/tweetnacl-0.14.5.tgz",
      "integrity": "sha1-WuaBd/GS1EViadEIr6k/+HQ/T2Q="
    },
    "type": {
      "version": "1.0.3",
      "resolved": "https://registry.npmjs.org/type/-/type-1.0.3.tgz",
      "integrity": "sha512-51IMtNfVcee8+9GJvj0spSuFcZHe9vSib6Xtgsny1Km9ugyz2mbS08I3rsUIRYgJohFRFU1160sgRodYz378Hg=="
    },
    "type-check": {
      "version": "0.3.2",
      "resolved": "https://registry.npmjs.org/type-check/-/type-check-0.3.2.tgz",
      "integrity": "sha1-WITKtRLPHTVeP7eE8wgEsrUg23I=",
      "requires": {
        "prelude-ls": "~1.1.2"
      }
    },
    "type-fest": {
      "version": "0.5.2",
      "resolved": "https://registry.npmjs.org/type-fest/-/type-fest-0.5.2.tgz",
      "integrity": "sha512-DWkS49EQKVX//Tbupb9TFa19c7+MK1XmzkrZUR8TAktmE/DizXoaoJV6TZ/tSIPXipqNiRI6CyAe7x69Jb6RSw=="
    },
    "type-is": {
      "version": "1.6.18",
      "resolved": "https://registry.npmjs.org/type-is/-/type-is-1.6.18.tgz",
      "integrity": "sha512-TkRKr9sUTxEH8MdfuCSP7VizJyzRNMjj2J2do2Jr3Kym598JVdEksuzPQCnlFPW4ky9Q+iA+ma9BGm06XQBy8g==",
      "requires": {
        "media-typer": "0.3.0",
        "mime-types": "~2.1.24"
      }
    },
    "typedarray": {
      "version": "0.0.6",
      "resolved": "https://registry.npmjs.org/typedarray/-/typedarray-0.0.6.tgz",
      "integrity": "sha1-hnrHTjhkGHsdPUfZlqeOxciDB3c="
    },
    "uglify-js": {
      "version": "3.4.10",
      "resolved": "https://registry.npmjs.org/uglify-js/-/uglify-js-3.4.10.tgz",
      "integrity": "sha512-Y2VsbPVs0FIshJztycsO2SfPk7/KAF/T72qzv9u5EpQ4kB2hQoHlhNQTsNyy6ul7lQtqJN/AoWeS23OzEiEFxw==",
      "requires": {
        "commander": "~2.19.0",
        "source-map": "~0.6.1"
      },
      "dependencies": {
        "commander": {
          "version": "2.19.0",
          "resolved": "https://registry.npmjs.org/commander/-/commander-2.19.0.tgz",
          "integrity": "sha512-6tvAOO+D6OENvRAh524Dh9jcfKTYDQAqvqezbCW82xj5X0pSrcpxtvRKHLG0yBY6SD7PSDrJaj+0AiOcKVd1Xg=="
        },
        "source-map": {
          "version": "0.6.1",
          "resolved": "https://registry.npmjs.org/source-map/-/source-map-0.6.1.tgz",
          "integrity": "sha512-UjgapumWlbMhkBgzT7Ykc5YXUT46F0iKu8SGXq0bcwP5dz/h0Plj6enJqjz1Zbq2l5WaqYnrVbwWOWMyF3F47g=="
        }
      }
    },
    "unicode-canonical-property-names-ecmascript": {
      "version": "1.0.4",
      "resolved": "https://registry.npmjs.org/unicode-canonical-property-names-ecmascript/-/unicode-canonical-property-names-ecmascript-1.0.4.tgz",
      "integrity": "sha512-jDrNnXWHd4oHiTZnx/ZG7gtUTVp+gCcTTKr8L0HjlwphROEW3+Him+IpvC+xcJEFegapiMZyZe02CyuOnRmbnQ=="
    },
    "unicode-match-property-ecmascript": {
      "version": "1.0.4",
      "resolved": "https://registry.npmjs.org/unicode-match-property-ecmascript/-/unicode-match-property-ecmascript-1.0.4.tgz",
      "integrity": "sha512-L4Qoh15vTfntsn4P1zqnHulG0LdXgjSO035fEpdtp6YxXhMT51Q6vgM5lYdG/5X3MjS+k/Y9Xw4SFCY9IkR0rg==",
      "requires": {
        "unicode-canonical-property-names-ecmascript": "^1.0.4",
        "unicode-property-aliases-ecmascript": "^1.0.4"
      }
    },
    "unicode-match-property-value-ecmascript": {
      "version": "1.1.0",
      "resolved": "https://registry.npmjs.org/unicode-match-property-value-ecmascript/-/unicode-match-property-value-ecmascript-1.1.0.tgz",
      "integrity": "sha512-hDTHvaBk3RmFzvSl0UVrUmC3PuW9wKVnpoUDYH0JDkSIovzw+J5viQmeYHxVSBptubnr7PbH2e0fnpDRQnQl5g=="
    },
    "unicode-property-aliases-ecmascript": {
      "version": "1.0.5",
      "resolved": "https://registry.npmjs.org/unicode-property-aliases-ecmascript/-/unicode-property-aliases-ecmascript-1.0.5.tgz",
      "integrity": "sha512-L5RAqCfXqAwR3RriF8pM0lU0w4Ryf/GgzONwi6KnL1taJQa7x1TCxdJnILX59WIGOwR57IVxn7Nej0fz1Ny6fw=="
    },
    "union-value": {
      "version": "1.0.1",
      "resolved": "https://registry.npmjs.org/union-value/-/union-value-1.0.1.tgz",
      "integrity": "sha512-tJfXmxMeWYnczCVs7XAEvIV7ieppALdyepWMkHkwciRpZraG/xwT+s2JN8+pr1+8jCRf80FFzvr+MpQeeoF4Xg==",
      "requires": {
        "arr-union": "^3.1.0",
        "get-value": "^2.0.6",
        "is-extendable": "^0.1.1",
        "set-value": "^2.0.1"
      }
    },
    "uniq": {
      "version": "1.0.1",
      "resolved": "https://registry.npmjs.org/uniq/-/uniq-1.0.1.tgz",
      "integrity": "sha1-sxxa6CVIRKOoKBVBzisEuGWnNP8="
    },
    "uniqs": {
      "version": "2.0.0",
      "resolved": "https://registry.npmjs.org/uniqs/-/uniqs-2.0.0.tgz",
      "integrity": "sha1-/+3ks2slKQaW5uFl1KWe25mOawI="
    },
    "unique-filename": {
      "version": "1.1.1",
      "resolved": "https://registry.npmjs.org/unique-filename/-/unique-filename-1.1.1.tgz",
      "integrity": "sha512-Vmp0jIp2ln35UTXuryvjzkjGdRyf9b2lTXuSYUiPmzRcl3FDtYqAwOnTJkAngD9SWhnoJzDbTKwaOrZ+STtxNQ==",
      "requires": {
        "unique-slug": "^2.0.0"
      }
    },
    "unique-slug": {
      "version": "2.0.2",
      "resolved": "https://registry.npmjs.org/unique-slug/-/unique-slug-2.0.2.tgz",
      "integrity": "sha512-zoWr9ObaxALD3DOPfjPSqxt4fnZiWblxHIgeWqW8x7UqDzEtHEQLzji2cuJYQFCU6KmoJikOYAZlrTHHebjx2w==",
      "requires": {
        "imurmurhash": "^0.1.4"
      }
    },
    "unique-string": {
      "version": "1.0.0",
      "resolved": "https://registry.npmjs.org/unique-string/-/unique-string-1.0.0.tgz",
      "integrity": "sha1-nhBXzKhRq7kzmPizOuGHuZyuwRo=",
      "requires": {
        "crypto-random-string": "^1.0.0"
      }
    },
    "universal-analytics": {
      "version": "0.4.20",
      "resolved": "https://registry.npmjs.org/universal-analytics/-/universal-analytics-0.4.20.tgz",
      "integrity": "sha512-gE91dtMvNkjO+kWsPstHRtSwHXz0l2axqptGYp5ceg4MsuurloM0PU3pdOfpb5zBXUvyjT4PwhWK2m39uczZuw==",
      "requires": {
        "debug": "^3.0.0",
        "request": "^2.88.0",
        "uuid": "^3.0.0"
      },
      "dependencies": {
        "debug": {
          "version": "3.2.6",
          "resolved": "https://registry.npmjs.org/debug/-/debug-3.2.6.tgz",
          "integrity": "sha512-mel+jf7nrtEl5Pn1Qx46zARXKDpBbvzezse7p7LqINmdoIk8PYP5SySaxEmYv6TZ0JyEKA1hsCId6DIhgITtWQ==",
          "requires": {
            "ms": "^2.1.1"
          }
        },
        "ms": {
          "version": "2.1.2",
          "resolved": "https://registry.npmjs.org/ms/-/ms-2.1.2.tgz",
          "integrity": "sha512-sGkPx+VjMtmA6MX27oA4FBFELFCZZ4S4XqeGOXCv68tT+jb3vk/RyaKWP0PTKyWtmLSM0b+adUTEvbs1PEaH2w=="
        }
      }
    },
    "universalify": {
      "version": "0.1.2",
      "resolved": "https://registry.npmjs.org/universalify/-/universalify-0.1.2.tgz",
      "integrity": "sha512-rBJeI5CXAlmy1pV+617WB9J63U6XcazHHF2f2dbJix4XzpUF0RS3Zbj0FGIOCAva5P/d/GBOYaACQ1w+0azUkg=="
    },
    "unpipe": {
      "version": "1.0.0",
      "resolved": "https://registry.npmjs.org/unpipe/-/unpipe-1.0.0.tgz",
      "integrity": "sha1-sr9O6FFKrmFltIF4KdIbLvSZBOw="
    },
    "unquote": {
      "version": "1.1.1",
      "resolved": "https://registry.npmjs.org/unquote/-/unquote-1.1.1.tgz",
      "integrity": "sha1-j97XMk7G6IoP+LkF58CYzcCG1UQ="
    },
    "unset-value": {
      "version": "1.0.0",
      "resolved": "https://registry.npmjs.org/unset-value/-/unset-value-1.0.0.tgz",
      "integrity": "sha1-g3aHP30jNRef+x5vw6jtDfyKtVk=",
      "requires": {
        "has-value": "^0.3.1",
        "isobject": "^3.0.0"
      },
      "dependencies": {
        "has-value": {
          "version": "0.3.1",
          "resolved": "https://registry.npmjs.org/has-value/-/has-value-0.3.1.tgz",
          "integrity": "sha1-ex9YutpiyoJ+wKIHgCVlSEWZXh8=",
          "requires": {
            "get-value": "^2.0.3",
            "has-values": "^0.1.4",
            "isobject": "^2.0.0"
          },
          "dependencies": {
            "isobject": {
              "version": "2.1.0",
              "resolved": "https://registry.npmjs.org/isobject/-/isobject-2.1.0.tgz",
              "integrity": "sha1-8GVWEJaj8dou9GJy+BXIQNh+DIk=",
              "requires": {
                "isarray": "1.0.0"
              }
            }
          }
        },
        "has-values": {
          "version": "0.1.4",
          "resolved": "https://registry.npmjs.org/has-values/-/has-values-0.1.4.tgz",
          "integrity": "sha1-bWHeldkd/Km5oCCJrThL/49it3E="
        }
      }
    },
    "unzip-response": {
      "version": "2.0.1",
      "resolved": "https://registry.npmjs.org/unzip-response/-/unzip-response-2.0.1.tgz",
      "integrity": "sha1-0vD3N9FrBhXnKmk17QQhRXLVb5c="
    },
    "upath": {
      "version": "1.1.2",
      "resolved": "https://registry.npmjs.org/upath/-/upath-1.1.2.tgz",
      "integrity": "sha512-kXpym8nmDmlCBr7nKdIx8P2jNBa+pBpIUFRnKJ4dr8htyYGJFokkr2ZvERRtUN+9SY+JqXouNgUPtv6JQva/2Q=="
    },
    "update-notifier": {
      "version": "2.5.0",
      "resolved": "https://registry.npmjs.org/update-notifier/-/update-notifier-2.5.0.tgz",
      "integrity": "sha512-gwMdhgJHGuj/+wHJJs9e6PcCszpxR1b236igrOkUofGhqJuG+amlIKwApH1IW1WWl7ovZxsX49lMBWLxSdm5Dw==",
      "requires": {
        "boxen": "^1.2.1",
        "chalk": "^2.0.1",
        "configstore": "^3.0.0",
        "import-lazy": "^2.1.0",
        "is-ci": "^1.0.10",
        "is-installed-globally": "^0.1.0",
        "is-npm": "^1.0.0",
        "latest-version": "^3.0.0",
        "semver-diff": "^2.0.0",
        "xdg-basedir": "^3.0.0"
      },
      "dependencies": {
        "ansi-styles": {
          "version": "3.2.1",
          "resolved": "https://registry.npmjs.org/ansi-styles/-/ansi-styles-3.2.1.tgz",
          "integrity": "sha512-VT0ZI6kZRdTh8YyJw3SMbYm/u+NqfsAxEpWO0Pf9sq8/e94WxxOpPKx9FR1FlyCtOVDNOQ+8ntlqFxiRc+r5qA==",
          "requires": {
            "color-convert": "^1.9.0"
          }
        },
        "chalk": {
          "version": "2.4.2",
          "resolved": "https://registry.npmjs.org/chalk/-/chalk-2.4.2.tgz",
          "integrity": "sha512-Mti+f9lpJNcwF4tWV8/OrTTtF1gZi+f8FqlyAdouralcFWFQWF2+NgCHShjkCb+IFBLq9buZwE1xckQU4peSuQ==",
          "requires": {
            "ansi-styles": "^3.2.1",
            "escape-string-regexp": "^1.0.5",
            "supports-color": "^5.3.0"
          }
        },
        "configstore": {
          "version": "3.1.2",
          "resolved": "https://registry.npmjs.org/configstore/-/configstore-3.1.2.tgz",
          "integrity": "sha512-vtv5HtGjcYUgFrXc6Kx747B83MRRVS5R1VTEQoXvuP+kMI+if6uywV0nDGoiydJRy4yk7h9od5Og0kxx4zUXmw==",
          "requires": {
            "dot-prop": "^4.1.0",
            "graceful-fs": "^4.1.2",
            "make-dir": "^1.0.0",
            "unique-string": "^1.0.0",
            "write-file-atomic": "^2.0.0",
            "xdg-basedir": "^3.0.0"
          }
        },
        "supports-color": {
          "version": "5.5.0",
          "resolved": "https://registry.npmjs.org/supports-color/-/supports-color-5.5.0.tgz",
          "integrity": "sha512-QjVjwdXIt408MIiAqCX4oUKsgU2EqAGzs2Ppkm4aQYbjm+ZEWEcW4SfFNTr4uMNZma0ey4f5lgLrkB0aX0QMow==",
          "requires": {
            "has-flag": "^3.0.0"
          }
        },
        "write-file-atomic": {
          "version": "2.4.3",
          "resolved": "https://registry.npmjs.org/write-file-atomic/-/write-file-atomic-2.4.3.tgz",
          "integrity": "sha512-GaETH5wwsX+GcnzhPgKcKjJ6M2Cq3/iZp1WyY/X1CSqrW+jVNM9Y7D8EC2sM4ZG/V8wZlSniJnCKWPmBYAucRQ==",
          "requires": {
            "graceful-fs": "^4.1.11",
            "imurmurhash": "^0.1.4",
            "signal-exit": "^3.0.2"
          }
        },
        "xdg-basedir": {
          "version": "3.0.0",
          "resolved": "https://registry.npmjs.org/xdg-basedir/-/xdg-basedir-3.0.0.tgz",
          "integrity": "sha1-SWsswQnsqNus/i3HK2A8F8WHCtQ="
        }
      }
    },
    "upper-case": {
      "version": "1.1.3",
      "resolved": "https://registry.npmjs.org/upper-case/-/upper-case-1.1.3.tgz",
      "integrity": "sha1-9rRQHC7EzdJrp4vnIilh3ndiFZg="
    },
    "uri-js": {
      "version": "4.2.2",
      "resolved": "https://registry.npmjs.org/uri-js/-/uri-js-4.2.2.tgz",
      "integrity": "sha512-KY9Frmirql91X2Qgjry0Wd4Y+YTdrdZheS8TFwvkbLWf/G5KNJDCh6pKL5OZctEW4+0Baa5idK2ZQuELRwPznQ==",
      "requires": {
        "punycode": "^2.1.0"
      }
    },
    "urix": {
      "version": "0.1.0",
      "resolved": "https://registry.npmjs.org/urix/-/urix-0.1.0.tgz",
      "integrity": "sha1-2pN/emLiH+wf0Y1Js1wpNQZ6bHI="
    },
    "url": {
      "version": "0.11.0",
      "resolved": "https://registry.npmjs.org/url/-/url-0.11.0.tgz",
      "integrity": "sha1-ODjpfPxgUh63PFJajlW/3Z4uKPE=",
      "requires": {
        "punycode": "1.3.2",
        "querystring": "0.2.0"
      },
      "dependencies": {
        "punycode": {
          "version": "1.3.2",
          "resolved": "https://registry.npmjs.org/punycode/-/punycode-1.3.2.tgz",
          "integrity": "sha1-llOgNvt8HuQjQvIyXM7v6jkmxI0="
        }
      }
    },
    "url-join": {
      "version": "0.0.1",
      "resolved": "https://registry.npmjs.org/url-join/-/url-join-0.0.1.tgz",
      "integrity": "sha1-HbSK1CLTQCRpqH99l73r/k+x48g="
    },
    "url-loader": {
      "version": "1.1.2",
      "resolved": "https://registry.npmjs.org/url-loader/-/url-loader-1.1.2.tgz",
      "integrity": "sha512-dXHkKmw8FhPqu8asTc1puBfe3TehOCo2+RmOOev5suNCIYBcT626kxiWg1NBVkwc4rO8BGa7gP70W7VXuqHrjg==",
      "requires": {
        "loader-utils": "^1.1.0",
        "mime": "^2.0.3",
        "schema-utils": "^1.0.0"
      },
      "dependencies": {
        "mime": {
          "version": "2.4.4",
          "resolved": "https://registry.npmjs.org/mime/-/mime-2.4.4.tgz",
          "integrity": "sha512-LRxmNwziLPT828z+4YkNzloCFC2YM4wrB99k+AV5ZbEyfGNWfG8SO1FUXLmLDBSo89NrJZ4DIWeLjy1CHGhMGA=="
        }
      }
    },
    "url-parse": {
      "version": "1.4.7",
      "resolved": "https://registry.npmjs.org/url-parse/-/url-parse-1.4.7.tgz",
      "integrity": "sha512-d3uaVyzDB9tQoSXFvuSUNFibTd9zxd2bkVrDRvF5TmvWWQwqE4lgYJ5m+x1DbecWkw+LK4RNl2CU1hHuOKPVlg==",
      "requires": {
        "querystringify": "^2.1.1",
        "requires-port": "^1.0.0"
      }
    },
    "url-parse-lax": {
      "version": "1.0.0",
      "resolved": "https://registry.npmjs.org/url-parse-lax/-/url-parse-lax-1.0.0.tgz",
      "integrity": "sha1-evjzA2Rem9eaJy56FKxovAYJ2nM=",
      "requires": {
        "prepend-http": "^1.0.1"
      }
    },
    "use": {
      "version": "3.1.1",
      "resolved": "https://registry.npmjs.org/use/-/use-3.1.1.tgz",
      "integrity": "sha512-cwESVXlO3url9YWlFW/TA9cshCEhtu7IKJ/p5soJ/gGpj7vbvFrAY/eIioQ6Dw23KjZhYgiIo8HOs1nQ2vr/oQ=="
    },
    "util": {
      "version": "0.11.1",
      "resolved": "https://registry.npmjs.org/util/-/util-0.11.1.tgz",
      "integrity": "sha512-HShAsny+zS2TZfaXxD9tYj4HQGlBezXZMZuM/S5PKLLoZkShZiGk9o5CzukI1LVHZvjdvZ2Sj1aW/Ndn2NB/HQ==",
      "requires": {
        "inherits": "2.0.3"
      },
      "dependencies": {
        "inherits": {
          "version": "2.0.3",
          "resolved": "https://registry.npmjs.org/inherits/-/inherits-2.0.3.tgz",
          "integrity": "sha1-Yzwsg+PaQqUC9SRmAiSA9CCCYd4="
        }
      }
    },
    "util-deprecate": {
      "version": "1.0.2",
      "resolved": "https://registry.npmjs.org/util-deprecate/-/util-deprecate-1.0.2.tgz",
      "integrity": "sha1-RQ1Nyfpw3nMnYvvS1KKJgUGaDM8="
    },
    "util.promisify": {
      "version": "1.0.0",
      "resolved": "https://registry.npmjs.org/util.promisify/-/util.promisify-1.0.0.tgz",
      "integrity": "sha512-i+6qA2MPhvoKLuxnJNpXAGhg7HphQOSUq2LKMZD0m15EiskXUkMvKdF4Uui0WYeCUGea+o2cw/ZuwehtfsrNkA==",
      "requires": {
        "define-properties": "^1.1.2",
        "object.getownpropertydescriptors": "^2.0.3"
      }
    },
    "utila": {
      "version": "0.4.0",
      "resolved": "https://registry.npmjs.org/utila/-/utila-0.4.0.tgz",
      "integrity": "sha1-ihagXURWV6Oupe7MWxKk+lN5dyw="
    },
    "utils-merge": {
      "version": "1.0.1",
      "resolved": "https://registry.npmjs.org/utils-merge/-/utils-merge-1.0.1.tgz",
      "integrity": "sha1-n5VxD1CiZ5R7LMwSR0HBAoQn5xM="
    },
    "uuid": {
      "version": "3.3.2",
      "resolved": "https://registry.npmjs.org/uuid/-/uuid-3.3.2.tgz",
      "integrity": "sha512-yXJmeNaw3DnnKAOKJE51sL/ZaYfWJRl1pK9dr19YFCu0ObS231AB1/LbqTKRAQ5kw8A90rA6fr4riOUpTZvQZA=="
    },
    "valid-url": {
      "version": "1.0.9",
      "resolved": "https://registry.npmjs.org/valid-url/-/valid-url-1.0.9.tgz",
      "integrity": "sha1-HBRHm0DxOXp1eC8RXkCGRHQzogA="
    },
    "validate-npm-package-license": {
      "version": "3.0.4",
      "resolved": "https://registry.npmjs.org/validate-npm-package-license/-/validate-npm-package-license-3.0.4.tgz",
      "integrity": "sha512-DpKm2Ui/xN7/HQKCtpZxoRWBhZ9Z0kqtygG8XCgNQ8ZlDnxuQmWhj566j8fN4Cu3/JmbhsDo7fcAJq4s9h27Ew==",
      "requires": {
        "spdx-correct": "^3.0.0",
        "spdx-expression-parse": "^3.0.0"
      }
    },
    "value-equal": {
      "version": "0.4.0",
      "resolved": "https://registry.npmjs.org/value-equal/-/value-equal-0.4.0.tgz",
      "integrity": "sha512-x+cYdNnaA3CxvMaTX0INdTCN8m8aF2uY9BvEqmxuYp8bL09cs/kWVQPVGcA35fMktdOsP69IgU7wFj/61dJHEw=="
    },
    "vary": {
      "version": "1.1.2",
      "resolved": "https://registry.npmjs.org/vary/-/vary-1.1.2.tgz",
      "integrity": "sha1-IpnwLG3tMNSllhsLn3RSShj2NPw="
    },
    "vendors": {
      "version": "1.0.3",
      "resolved": "https://registry.npmjs.org/vendors/-/vendors-1.0.3.tgz",
      "integrity": "sha512-fOi47nsJP5Wqefa43kyWSg80qF+Q3XA6MUkgi7Hp1HQaKDQW4cQrK2D0P7mmbFtsV1N89am55Yru/nyEwRubcw=="
    },
    "verror": {
      "version": "1.10.0",
      "resolved": "https://registry.npmjs.org/verror/-/verror-1.10.0.tgz",
      "integrity": "sha1-OhBcoXBTr1XW4nDB+CiGguGNpAA=",
      "requires": {
        "assert-plus": "^1.0.0",
        "core-util-is": "1.0.2",
        "extsprintf": "^1.2.0"
      }
    },
    "vm-browserify": {
      "version": "1.1.0",
      "resolved": "https://registry.npmjs.org/vm-browserify/-/vm-browserify-1.1.0.tgz",
      "integrity": "sha512-iq+S7vZJE60yejDYM0ek6zg308+UZsdtPExWP9VZoCFCz1zkJoXFnAX7aZfd/ZwrkidzdUZL0C/ryW+JwAiIGw=="
    },
    "w3c-hr-time": {
      "version": "1.0.1",
      "resolved": "https://registry.npmjs.org/w3c-hr-time/-/w3c-hr-time-1.0.1.tgz",
      "integrity": "sha1-gqwr/2PZUOqeMYmlimViX+3xkEU=",
      "requires": {
        "browser-process-hrtime": "^0.1.2"
      }
    },
    "w3c-xmlserializer": {
      "version": "1.1.2",
      "resolved": "https://registry.npmjs.org/w3c-xmlserializer/-/w3c-xmlserializer-1.1.2.tgz",
      "integrity": "sha512-p10l/ayESzrBMYWRID6xbuCKh2Fp77+sA0doRuGn4tTIMrrZVeqfpKjXHY+oDh3K4nLdPgNwMTVP6Vp4pvqbNg==",
      "requires": {
        "domexception": "^1.0.1",
        "webidl-conversions": "^4.0.2",
        "xml-name-validator": "^3.0.0"
      }
    },
    "walker": {
      "version": "1.0.7",
      "resolved": "https://registry.npmjs.org/walker/-/walker-1.0.7.tgz",
      "integrity": "sha1-L3+bj9ENZ3JisYqITijRlhjgKPs=",
      "requires": {
        "makeerror": "1.0.x"
      }
    },
    "watchpack": {
      "version": "1.6.0",
      "resolved": "https://registry.npmjs.org/watchpack/-/watchpack-1.6.0.tgz",
      "integrity": "sha512-i6dHe3EyLjMmDlU1/bGQpEw25XSjkJULPuAVKCbNRefQVq48yXKUpwg538F7AZTf9kyr57zj++pQFltUa5H7yA==",
      "requires": {
        "chokidar": "^2.0.2",
        "graceful-fs": "^4.1.2",
        "neo-async": "^2.5.0"
      }
    },
    "wbuf": {
      "version": "1.7.3",
      "resolved": "https://registry.npmjs.org/wbuf/-/wbuf-1.7.3.tgz",
      "integrity": "sha512-O84QOnr0icsbFGLS0O3bI5FswxzRr8/gHwWkDlQFskhSPryQXvrTMxjxGP4+iWYoauLoBvfDpkrOauZ+0iZpDA==",
      "requires": {
        "minimalistic-assert": "^1.0.0"
      }
    },
    "webidl-conversions": {
      "version": "4.0.2",
      "resolved": "https://registry.npmjs.org/webidl-conversions/-/webidl-conversions-4.0.2.tgz",
      "integrity": "sha512-YQ+BmxuTgd6UXZW3+ICGfyqRyHXVlD5GtQr5+qjiNW7bF0cqrzX500HVXPBOvgXb5YnzDd+h0zqyv61KUD7+Sg=="
    },
    "webpack": {
      "version": "4.29.6",
      "resolved": "https://registry.npmjs.org/webpack/-/webpack-4.29.6.tgz",
      "integrity": "sha512-MwBwpiE1BQpMDkbnUUaW6K8RFZjljJHArC6tWQJoFm0oQtfoSebtg4Y7/QHnJ/SddtjYLHaKGX64CFjG5rehJw==",
      "requires": {
        "@webassemblyjs/ast": "1.8.5",
        "@webassemblyjs/helper-module-context": "1.8.5",
        "@webassemblyjs/wasm-edit": "1.8.5",
        "@webassemblyjs/wasm-parser": "1.8.5",
        "acorn": "^6.0.5",
        "acorn-dynamic-import": "^4.0.0",
        "ajv": "^6.1.0",
        "ajv-keywords": "^3.1.0",
        "chrome-trace-event": "^1.0.0",
        "enhanced-resolve": "^4.1.0",
        "eslint-scope": "^4.0.0",
        "json-parse-better-errors": "^1.0.2",
        "loader-runner": "^2.3.0",
        "loader-utils": "^1.1.0",
        "memory-fs": "~0.4.1",
        "micromatch": "^3.1.8",
        "mkdirp": "~0.5.0",
        "neo-async": "^2.5.0",
        "node-libs-browser": "^2.0.0",
        "schema-utils": "^1.0.0",
        "tapable": "^1.1.0",
        "terser-webpack-plugin": "^1.1.0",
        "watchpack": "^1.5.0",
        "webpack-sources": "^1.3.0"
      },
      "dependencies": {
        "acorn": {
          "version": "6.3.0",
          "resolved": "https://registry.npmjs.org/acorn/-/acorn-6.3.0.tgz",
          "integrity": "sha512-/czfa8BwS88b9gWQVhc8eknunSA2DoJpJyTQkhheIf5E48u1N0R4q/YxxsAeqRrmK9TQ/uYfgLDfZo91UlANIA=="
        },
        "eslint-scope": {
          "version": "4.0.3",
          "resolved": "https://registry.npmjs.org/eslint-scope/-/eslint-scope-4.0.3.tgz",
          "integrity": "sha512-p7VutNr1O/QrxysMo3E45FjYDTeXBy0iTltPFNSqKAIfjDSXC+4dj+qfyuD8bfAXrW/y6lW3O76VaYNPKfpKrg==",
          "requires": {
            "esrecurse": "^4.1.0",
            "estraverse": "^4.1.1"
          }
        }
      }
    },
    "webpack-dev-middleware": {
      "version": "3.7.0",
      "resolved": "https://registry.npmjs.org/webpack-dev-middleware/-/webpack-dev-middleware-3.7.0.tgz",
      "integrity": "sha512-qvDesR1QZRIAZHOE3iQ4CXLZZSQ1lAUsSpnQmlB1PBfoN/xdRjmge3Dok0W4IdaVLJOGJy3sGI4sZHwjRU0PCA==",
      "requires": {
        "memory-fs": "^0.4.1",
        "mime": "^2.4.2",
        "range-parser": "^1.2.1",
        "webpack-log": "^2.0.0"
      },
      "dependencies": {
        "mime": {
          "version": "2.4.4",
          "resolved": "https://registry.npmjs.org/mime/-/mime-2.4.4.tgz",
          "integrity": "sha512-LRxmNwziLPT828z+4YkNzloCFC2YM4wrB99k+AV5ZbEyfGNWfG8SO1FUXLmLDBSo89NrJZ4DIWeLjy1CHGhMGA=="
        }
      }
    },
    "webpack-dev-server": {
      "version": "3.2.1",
      "resolved": "https://registry.npmjs.org/webpack-dev-server/-/webpack-dev-server-3.2.1.tgz",
      "integrity": "sha512-sjuE4mnmx6JOh9kvSbPYw3u/6uxCLHNWfhWaIPwcXWsvWOPN+nc5baq4i9jui3oOBRXGonK9+OI0jVkaz6/rCw==",
      "requires": {
        "ansi-html": "0.0.7",
        "bonjour": "^3.5.0",
        "chokidar": "^2.0.0",
        "compression": "^1.5.2",
        "connect-history-api-fallback": "^1.3.0",
        "debug": "^4.1.1",
        "del": "^3.0.0",
        "express": "^4.16.2",
        "html-entities": "^1.2.0",
        "http-proxy-middleware": "^0.19.1",
        "import-local": "^2.0.0",
        "internal-ip": "^4.2.0",
        "ip": "^1.1.5",
        "killable": "^1.0.0",
        "loglevel": "^1.4.1",
        "opn": "^5.1.0",
        "portfinder": "^1.0.9",
        "schema-utils": "^1.0.0",
        "selfsigned": "^1.9.1",
        "semver": "^5.6.0",
        "serve-index": "^1.7.2",
        "sockjs": "0.3.19",
        "sockjs-client": "1.3.0",
        "spdy": "^4.0.0",
        "strip-ansi": "^3.0.0",
        "supports-color": "^6.1.0",
        "url": "^0.11.0",
        "webpack-dev-middleware": "^3.5.1",
        "webpack-log": "^2.0.0",
        "yargs": "12.0.2"
      },
      "dependencies": {
        "ansi-regex": {
          "version": "3.0.0",
          "resolved": "https://registry.npmjs.org/ansi-regex/-/ansi-regex-3.0.0.tgz",
          "integrity": "sha1-7QMXwyIGT3lGbAKWa922Bas32Zg="
        },
        "camelcase": {
          "version": "4.1.0",
          "resolved": "https://registry.npmjs.org/camelcase/-/camelcase-4.1.0.tgz",
          "integrity": "sha1-1UVjW+HjPFQmScaRc+Xeas+uNN0="
        },
        "cliui": {
          "version": "4.1.0",
          "resolved": "https://registry.npmjs.org/cliui/-/cliui-4.1.0.tgz",
          "integrity": "sha512-4FG+RSG9DL7uEwRUZXZn3SS34DiDPfzP0VOiEwtUWlE+AR2EIg+hSyvrIgUUfhdgR/UkAeW2QHgeP+hWrXs7jQ==",
          "requires": {
            "string-width": "^2.1.1",
            "strip-ansi": "^4.0.0",
            "wrap-ansi": "^2.0.0"
          },
          "dependencies": {
            "strip-ansi": {
              "version": "4.0.0",
              "resolved": "https://registry.npmjs.org/strip-ansi/-/strip-ansi-4.0.0.tgz",
              "integrity": "sha1-qEeQIusaw2iocTibY1JixQXuNo8=",
              "requires": {
                "ansi-regex": "^3.0.0"
              }
            }
          }
        },
        "cross-spawn": {
          "version": "6.0.5",
          "resolved": "https://registry.npmjs.org/cross-spawn/-/cross-spawn-6.0.5.tgz",
          "integrity": "sha512-eTVLrBSt7fjbDygz805pMnstIs2VTBNkRm0qxZd+M7A5XDdxVRWO5MxGBXZhjY4cqLYLdtrGqRf8mBPmzwSpWQ==",
          "requires": {
            "nice-try": "^1.0.4",
            "path-key": "^2.0.1",
            "semver": "^5.5.0",
            "shebang-command": "^1.2.0",
            "which": "^1.2.9"
          }
        },
        "debug": {
          "version": "4.1.1",
          "resolved": "https://registry.npmjs.org/debug/-/debug-4.1.1.tgz",
          "integrity": "sha512-pYAIzeRo8J6KPEaJ0VWOh5Pzkbw/RetuzehGM7QRRX5he4fPHx2rdKMB256ehJCkX+XRQm16eZLqLNS8RSZXZw==",
          "requires": {
            "ms": "^2.1.1"
          }
        },
        "decamelize": {
          "version": "2.0.0",
          "resolved": "https://registry.npmjs.org/decamelize/-/decamelize-2.0.0.tgz",
          "integrity": "sha512-Ikpp5scV3MSYxY39ymh45ZLEecsTdv/Xj2CaQfI8RLMuwi7XvjX9H/fhraiSuU+C5w5NTDu4ZU72xNiZnurBPg==",
          "requires": {
            "xregexp": "4.0.0"
          }
        },
        "execa": {
          "version": "1.0.0",
          "resolved": "https://registry.npmjs.org/execa/-/execa-1.0.0.tgz",
          "integrity": "sha512-adbxcyWV46qiHyvSp50TKt05tB4tK3HcmF7/nxfAdhnox83seTDbwnaqKO4sXRy7roHAIFqJP/Rw/AuEbX61LA==",
          "requires": {
            "cross-spawn": "^6.0.0",
            "get-stream": "^4.0.0",
            "is-stream": "^1.1.0",
            "npm-run-path": "^2.0.0",
            "p-finally": "^1.0.0",
            "signal-exit": "^3.0.0",
            "strip-eof": "^1.0.0"
          }
        },
        "find-up": {
          "version": "3.0.0",
          "resolved": "https://registry.npmjs.org/find-up/-/find-up-3.0.0.tgz",
          "integrity": "sha512-1yD6RmLI1XBfxugvORwlck6f75tYL+iR0jqwsOrOxMZyGYqUuDhJ0l4AXdO1iX/FTs9cBAMEk1gWSEx1kSbylg==",
          "requires": {
            "locate-path": "^3.0.0"
          }
        },
        "get-caller-file": {
          "version": "1.0.3",
          "resolved": "https://registry.npmjs.org/get-caller-file/-/get-caller-file-1.0.3.tgz",
          "integrity": "sha512-3t6rVToeoZfYSGd8YoLFR2DJkiQrIiUrGcjvFX2mDw3bn6k2OtwHN0TNCLbBO+w8qTvimhDkv+LSscbJY1vE6w=="
        },
        "get-stream": {
          "version": "4.1.0",
          "resolved": "https://registry.npmjs.org/get-stream/-/get-stream-4.1.0.tgz",
          "integrity": "sha512-GMat4EJ5161kIy2HevLlr4luNjBgvmj413KaQA7jt4V8B4RDsfpHk7WQ9GVqfYyyx8OS/L66Kox+rJRNklLK7w==",
          "requires": {
            "pump": "^3.0.0"
          }
        },
        "invert-kv": {
          "version": "2.0.0",
          "resolved": "https://registry.npmjs.org/invert-kv/-/invert-kv-2.0.0.tgz",
          "integrity": "sha512-wPVv/y/QQ/Uiirj/vh3oP+1Ww+AWehmi1g5fFWGPF6IpCBCDVrhgHRMvrLfdYcwDh3QJbGXDW4JAuzxElLSqKA=="
        },
        "lcid": {
          "version": "2.0.0",
          "resolved": "https://registry.npmjs.org/lcid/-/lcid-2.0.0.tgz",
          "integrity": "sha512-avPEb8P8EGnwXKClwsNUgryVjllcRqtMYa49NTsbQagYuT1DcXnl1915oxWjoyGrXR6zH/Y0Zc96xWsPcoDKeA==",
          "requires": {
            "invert-kv": "^2.0.0"
          }
        },
        "locate-path": {
          "version": "3.0.0",
          "resolved": "https://registry.npmjs.org/locate-path/-/locate-path-3.0.0.tgz",
          "integrity": "sha512-7AO748wWnIhNqAuaty2ZWHkQHRSNfPVIsPIfwEOWO22AmaoVrWavlOcMR5nzTLNYvp36X220/maaRsrec1G65A==",
          "requires": {
            "p-locate": "^3.0.0",
            "path-exists": "^3.0.0"
          }
        },
        "ms": {
          "version": "2.1.2",
          "resolved": "https://registry.npmjs.org/ms/-/ms-2.1.2.tgz",
          "integrity": "sha512-sGkPx+VjMtmA6MX27oA4FBFELFCZZ4S4XqeGOXCv68tT+jb3vk/RyaKWP0PTKyWtmLSM0b+adUTEvbs1PEaH2w=="
        },
        "os-locale": {
          "version": "3.1.0",
          "resolved": "https://registry.npmjs.org/os-locale/-/os-locale-3.1.0.tgz",
          "integrity": "sha512-Z8l3R4wYWM40/52Z+S265okfFj8Kt2cC2MKY+xNi3kFs+XGI7WXu/I309QQQYbRW4ijiZ+yxs9pqEhJh0DqW3Q==",
          "requires": {
            "execa": "^1.0.0",
            "lcid": "^2.0.0",
            "mem": "^4.0.0"
          }
        },
        "p-limit": {
          "version": "2.2.1",
          "resolved": "https://registry.npmjs.org/p-limit/-/p-limit-2.2.1.tgz",
          "integrity": "sha512-85Tk+90UCVWvbDavCLKPOLC9vvY8OwEX/RtKF+/1OADJMVlFfEHOiMTPVyxg7mk/dKa+ipdHm0OUkTvCpMTuwg==",
          "requires": {
            "p-try": "^2.0.0"
          }
        },
        "p-locate": {
          "version": "3.0.0",
          "resolved": "https://registry.npmjs.org/p-locate/-/p-locate-3.0.0.tgz",
          "integrity": "sha512-x+12w/To+4GFfgJhBEpiDcLozRJGegY+Ei7/z0tSLkMmxGZNybVMSfWj9aJn8Z5Fc7dBUNJOOVgPv2H7IwulSQ==",
          "requires": {
            "p-limit": "^2.0.0"
          }
        },
        "p-try": {
          "version": "2.2.0",
          "resolved": "https://registry.npmjs.org/p-try/-/p-try-2.2.0.tgz",
          "integrity": "sha512-R4nPAVTAU0B9D35/Gk3uJf/7XYbQcyohSKdvAxIRSNghFl4e71hVoGnBNQz9cWaXxO2I10KTC+3jMdvvoKw6dQ=="
        },
        "require-main-filename": {
          "version": "1.0.1",
          "resolved": "https://registry.npmjs.org/require-main-filename/-/require-main-filename-1.0.1.tgz",
          "integrity": "sha1-l/cXtp1IeE9fUmpsWqj/3aBVpNE="
        },
        "supports-color": {
          "version": "6.1.0",
          "resolved": "https://registry.npmjs.org/supports-color/-/supports-color-6.1.0.tgz",
          "integrity": "sha512-qe1jfm1Mg7Nq/NSh6XE24gPXROEVsWHxC1LIx//XNlD9iw7YZQGjZNjYN7xGaEG6iKdA8EtNFW6R0gjnVXp+wQ==",
          "requires": {
            "has-flag": "^3.0.0"
          }
        },
        "yargs": {
          "version": "12.0.2",
          "resolved": "https://registry.npmjs.org/yargs/-/yargs-12.0.2.tgz",
          "integrity": "sha512-e7SkEx6N6SIZ5c5H22RTZae61qtn3PYUE8JYbBFlK9sYmh3DMQ6E5ygtaG/2BW0JZi4WGgTR2IV5ChqlqrDGVQ==",
          "requires": {
            "cliui": "^4.0.0",
            "decamelize": "^2.0.0",
            "find-up": "^3.0.0",
            "get-caller-file": "^1.0.1",
            "os-locale": "^3.0.0",
            "require-directory": "^2.1.1",
            "require-main-filename": "^1.0.1",
            "set-blocking": "^2.0.0",
            "string-width": "^2.0.0",
            "which-module": "^2.0.0",
            "y18n": "^3.2.1 || ^4.0.0",
            "yargs-parser": "^10.1.0"
          }
        },
        "yargs-parser": {
          "version": "10.1.0",
          "resolved": "https://registry.npmjs.org/yargs-parser/-/yargs-parser-10.1.0.tgz",
          "integrity": "sha512-VCIyR1wJoEBZUqk5PA+oOBF6ypbwh5aNB3I50guxAL/quggdfs4TtNHQrSazFA3fYZ+tEqfs0zIGlv0c/rgjbQ==",
          "requires": {
            "camelcase": "^4.1.0"
          }
        }
      }
    },
    "webpack-log": {
      "version": "2.0.0",
      "resolved": "https://registry.npmjs.org/webpack-log/-/webpack-log-2.0.0.tgz",
      "integrity": "sha512-cX8G2vR/85UYG59FgkoMamwHUIkSSlV3bBMRsbxVXVUk2j6NleCKjQ/WE9eYg9WY4w25O9w8wKP4rzNZFmUcUg==",
      "requires": {
        "ansi-colors": "^3.0.0",
        "uuid": "^3.3.2"
      }
    },
    "webpack-manifest-plugin": {
      "version": "2.0.4",
      "resolved": "https://registry.npmjs.org/webpack-manifest-plugin/-/webpack-manifest-plugin-2.0.4.tgz",
      "integrity": "sha512-nejhOHexXDBKQOj/5v5IZSfCeTO3x1Dt1RZEcGfBSul891X/eLIcIVH31gwxPDdsi2Z8LKKFGpM4w9+oTBOSCg==",
      "requires": {
        "fs-extra": "^7.0.0",
        "lodash": ">=3.5 <5",
        "tapable": "^1.0.0"
      },
      "dependencies": {
        "fs-extra": {
          "version": "7.0.1",
          "resolved": "https://registry.npmjs.org/fs-extra/-/fs-extra-7.0.1.tgz",
          "integrity": "sha512-YJDaCJZEnBmcbw13fvdAM9AwNOJwOzrE4pqMqBq5nFiEqXUqHwlK4B+3pUw6JNvfSPtX05xFHtYy/1ni01eGCw==",
          "requires": {
            "graceful-fs": "^4.1.2",
            "jsonfile": "^4.0.0",
            "universalify": "^0.1.0"
          }
        },
        "jsonfile": {
          "version": "4.0.0",
          "resolved": "https://registry.npmjs.org/jsonfile/-/jsonfile-4.0.0.tgz",
          "integrity": "sha1-h3Gq4HmbZAdrdmQPygWPnBDjPss=",
          "requires": {
            "graceful-fs": "^4.1.6"
          }
        }
      }
    },
    "webpack-sources": {
      "version": "1.4.3",
      "resolved": "https://registry.npmjs.org/webpack-sources/-/webpack-sources-1.4.3.tgz",
      "integrity": "sha512-lgTS3Xhv1lCOKo7SA5TjKXMjpSM4sBjNV5+q2bqesbSPs5FjGmU6jjtBSkX9b4qW87vDIsCIlUPOEhbZrMdjeQ==",
      "requires": {
        "source-list-map": "^2.0.0",
        "source-map": "~0.6.1"
      },
      "dependencies": {
        "source-map": {
          "version": "0.6.1",
          "resolved": "https://registry.npmjs.org/source-map/-/source-map-0.6.1.tgz",
          "integrity": "sha512-UjgapumWlbMhkBgzT7Ykc5YXUT46F0iKu8SGXq0bcwP5dz/h0Plj6enJqjz1Zbq2l5WaqYnrVbwWOWMyF3F47g=="
        }
      }
    },
    "websocket-driver": {
      "version": "0.7.3",
      "resolved": "https://registry.npmjs.org/websocket-driver/-/websocket-driver-0.7.3.tgz",
      "integrity": "sha512-bpxWlvbbB459Mlipc5GBzzZwhoZgGEZLuqPaR0INBGnPAY1vdBX6hPnoFXiw+3yWxDuHyQjO2oXTMyS8A5haFg==",
      "requires": {
        "http-parser-js": ">=0.4.0 <0.4.11",
        "safe-buffer": ">=5.1.0",
        "websocket-extensions": ">=0.1.1"
      }
    },
    "websocket-extensions": {
      "version": "0.1.3",
      "resolved": "https://registry.npmjs.org/websocket-extensions/-/websocket-extensions-0.1.3.tgz",
      "integrity": "sha512-nqHUnMXmBzT0w570r2JpJxfiSD1IzoI+HGVdd3aZ0yNi3ngvQ4jv1dtHt5VGxfI2yj5yqImPhOK4vmIh2xMbGg=="
    },
    "whatwg-encoding": {
      "version": "1.0.5",
      "resolved": "https://registry.npmjs.org/whatwg-encoding/-/whatwg-encoding-1.0.5.tgz",
      "integrity": "sha512-b5lim54JOPN9HtzvK9HFXvBma/rnfFeqsic0hSpjtDbVxR3dJKLc+KB4V6GgiGOvl7CY/KNh8rxSo9DKQrnUEw==",
      "requires": {
        "iconv-lite": "0.4.24"
      }
    },
    "whatwg-fetch": {
      "version": "3.0.0",
      "resolved": "https://registry.npmjs.org/whatwg-fetch/-/whatwg-fetch-3.0.0.tgz",
      "integrity": "sha512-9GSJUgz1D4MfyKU7KRqwOjXCXTqWdFNvEr7eUBYchQiVc744mqK/MzXPNR2WsPkmkOa4ywfg8C2n8h+13Bey1Q=="
    },
    "whatwg-mimetype": {
      "version": "2.3.0",
      "resolved": "https://registry.npmjs.org/whatwg-mimetype/-/whatwg-mimetype-2.3.0.tgz",
      "integrity": "sha512-M4yMwr6mAnQz76TbJm914+gPpB/nCwvZbJU28cUD6dR004SAxDLOOSUaB1JDRqLtaOV/vi0IC5lEAGFgrjGv/g=="
    },
    "whatwg-url": {
      "version": "6.5.0",
      "resolved": "https://registry.npmjs.org/whatwg-url/-/whatwg-url-6.5.0.tgz",
      "integrity": "sha512-rhRZRqx/TLJQWUpQ6bmrt2UV4f0HCQ463yQuONJqC6fO2VoEb1pTYddbe59SkYq87aoM5A3bdhMZiUiVws+fzQ==",
      "requires": {
        "lodash.sortby": "^4.7.0",
        "tr46": "^1.0.1",
        "webidl-conversions": "^4.0.2"
      }
    },
    "which": {
      "version": "1.3.1",
      "resolved": "https://registry.npmjs.org/which/-/which-1.3.1.tgz",
      "integrity": "sha512-HxJdYWq1MTIQbJ3nw0cqssHoTNU267KlrDuGZ1WYlxDStUtKUhOaJmh112/TZmHxxUfuJqPXSOm7tDyas0OSIQ==",
      "requires": {
        "isexe": "^2.0.0"
      }
    },
    "which-module": {
      "version": "2.0.0",
      "resolved": "https://registry.npmjs.org/which-module/-/which-module-2.0.0.tgz",
      "integrity": "sha1-2e8H3Od7mQK4o6j6SzHD4/fm6Ho="
    },
    "widest-line": {
      "version": "2.0.1",
      "resolved": "https://registry.npmjs.org/widest-line/-/widest-line-2.0.1.tgz",
      "integrity": "sha512-Ba5m9/Fa4Xt9eb2ELXt77JxVDV8w7qQrH0zS/TWSJdLyAwQjWoOzpzj5lwVftDz6n/EOu3tNACS84v509qwnJA==",
      "requires": {
        "string-width": "^2.1.1"
      }
    },
    "window-size": {
      "version": "0.1.4",
      "resolved": "https://registry.npmjs.org/window-size/-/window-size-0.1.4.tgz",
      "integrity": "sha1-+OGqHuWlPsW/FR/6CXQqatdpeHY="
    },
    "winston": {
      "version": "1.1.2",
      "resolved": "https://registry.npmjs.org/winston/-/winston-1.1.2.tgz",
      "integrity": "sha1-aO3Xaf951PlSjPDl2AAhqt5nSAw=",
      "requires": {
        "async": "~1.0.0",
        "colors": "1.0.x",
        "cycle": "1.0.x",
        "eyes": "0.1.x",
        "isstream": "0.1.x",
        "pkginfo": "0.3.x",
        "stack-trace": "0.0.x"
      },
      "dependencies": {
        "async": {
          "version": "1.0.0",
          "resolved": "https://registry.npmjs.org/async/-/async-1.0.0.tgz",
          "integrity": "sha1-+PwEyjoTeErenhZBr5hXjPvWR6k="
        }
      }
    },
    "wordwrap": {
      "version": "1.0.0",
      "resolved": "https://registry.npmjs.org/wordwrap/-/wordwrap-1.0.0.tgz",
      "integrity": "sha1-J1hIEIkUVqQXHI0CJkQa3pDLyus="
    },
    "workbox-background-sync": {
      "version": "4.3.1",
      "resolved": "https://registry.npmjs.org/workbox-background-sync/-/workbox-background-sync-4.3.1.tgz",
      "integrity": "sha512-1uFkvU8JXi7L7fCHVBEEnc3asPpiAL33kO495UMcD5+arew9IbKW2rV5lpzhoWcm/qhGB89YfO4PmB/0hQwPRg==",
      "requires": {
        "workbox-core": "^4.3.1"
      }
    },
    "workbox-broadcast-update": {
      "version": "4.3.1",
      "resolved": "https://registry.npmjs.org/workbox-broadcast-update/-/workbox-broadcast-update-4.3.1.tgz",
      "integrity": "sha512-MTSfgzIljpKLTBPROo4IpKjESD86pPFlZwlvVG32Kb70hW+aob4Jxpblud8EhNb1/L5m43DUM4q7C+W6eQMMbA==",
      "requires": {
        "workbox-core": "^4.3.1"
      }
    },
    "workbox-build": {
      "version": "4.3.1",
      "resolved": "https://registry.npmjs.org/workbox-build/-/workbox-build-4.3.1.tgz",
      "integrity": "sha512-UHdwrN3FrDvicM3AqJS/J07X0KXj67R8Cg0waq1MKEOqzo89ap6zh6LmaLnRAjpB+bDIz+7OlPye9iii9KBnxw==",
      "requires": {
        "@babel/runtime": "^7.3.4",
        "@hapi/joi": "^15.0.0",
        "common-tags": "^1.8.0",
        "fs-extra": "^4.0.2",
        "glob": "^7.1.3",
        "lodash.template": "^4.4.0",
        "pretty-bytes": "^5.1.0",
        "stringify-object": "^3.3.0",
        "strip-comments": "^1.0.2",
        "workbox-background-sync": "^4.3.1",
        "workbox-broadcast-update": "^4.3.1",
        "workbox-cacheable-response": "^4.3.1",
        "workbox-core": "^4.3.1",
        "workbox-expiration": "^4.3.1",
        "workbox-google-analytics": "^4.3.1",
        "workbox-navigation-preload": "^4.3.1",
        "workbox-precaching": "^4.3.1",
        "workbox-range-requests": "^4.3.1",
        "workbox-routing": "^4.3.1",
        "workbox-strategies": "^4.3.1",
        "workbox-streams": "^4.3.1",
        "workbox-sw": "^4.3.1",
        "workbox-window": "^4.3.1"
      },
      "dependencies": {
        "fs-extra": {
          "version": "4.0.3",
          "resolved": "https://registry.npmjs.org/fs-extra/-/fs-extra-4.0.3.tgz",
          "integrity": "sha512-q6rbdDd1o2mAnQreO7YADIxf/Whx4AHBiRf6d+/cVT8h44ss+lHgxf1FemcqDnQt9X3ct4McHr+JMGlYSsK7Cg==",
          "requires": {
            "graceful-fs": "^4.1.2",
            "jsonfile": "^4.0.0",
            "universalify": "^0.1.0"
          }
        },
        "jsonfile": {
          "version": "4.0.0",
          "resolved": "https://registry.npmjs.org/jsonfile/-/jsonfile-4.0.0.tgz",
          "integrity": "sha1-h3Gq4HmbZAdrdmQPygWPnBDjPss=",
          "requires": {
            "graceful-fs": "^4.1.6"
          }
        }
      }
    },
    "workbox-cacheable-response": {
      "version": "4.3.1",
      "resolved": "https://registry.npmjs.org/workbox-cacheable-response/-/workbox-cacheable-response-4.3.1.tgz",
      "integrity": "sha512-Rp5qlzm6z8IOvnQNkCdO9qrDgDpoPNguovs0H8C+wswLuPgSzSp9p2afb5maUt9R1uTIwOXrVQMmPfPypv+npw==",
      "requires": {
        "workbox-core": "^4.3.1"
      }
    },
    "workbox-core": {
      "version": "4.3.1",
      "resolved": "https://registry.npmjs.org/workbox-core/-/workbox-core-4.3.1.tgz",
      "integrity": "sha512-I3C9jlLmMKPxAC1t0ExCq+QoAMd0vAAHULEgRZ7kieCdUd919n53WC0AfvokHNwqRhGn+tIIj7vcb5duCjs2Kg=="
    },
    "workbox-expiration": {
      "version": "4.3.1",
      "resolved": "https://registry.npmjs.org/workbox-expiration/-/workbox-expiration-4.3.1.tgz",
      "integrity": "sha512-vsJLhgQsQouv9m0rpbXubT5jw0jMQdjpkum0uT+d9tTwhXcEZks7qLfQ9dGSaufTD2eimxbUOJfWLbNQpIDMPw==",
      "requires": {
        "workbox-core": "^4.3.1"
      }
    },
    "workbox-google-analytics": {
      "version": "4.3.1",
      "resolved": "https://registry.npmjs.org/workbox-google-analytics/-/workbox-google-analytics-4.3.1.tgz",
      "integrity": "sha512-xzCjAoKuOb55CBSwQrbyWBKqp35yg1vw9ohIlU2wTy06ZrYfJ8rKochb1MSGlnoBfXGWss3UPzxR5QL5guIFdg==",
      "requires": {
        "workbox-background-sync": "^4.3.1",
        "workbox-core": "^4.3.1",
        "workbox-routing": "^4.3.1",
        "workbox-strategies": "^4.3.1"
      }
    },
    "workbox-navigation-preload": {
      "version": "4.3.1",
      "resolved": "https://registry.npmjs.org/workbox-navigation-preload/-/workbox-navigation-preload-4.3.1.tgz",
      "integrity": "sha512-K076n3oFHYp16/C+F8CwrRqD25GitA6Rkd6+qAmLmMv1QHPI2jfDwYqrytOfKfYq42bYtW8Pr21ejZX7GvALOw==",
      "requires": {
        "workbox-core": "^4.3.1"
      }
    },
    "workbox-precaching": {
      "version": "4.3.1",
      "resolved": "https://registry.npmjs.org/workbox-precaching/-/workbox-precaching-4.3.1.tgz",
      "integrity": "sha512-piSg/2csPoIi/vPpp48t1q5JLYjMkmg5gsXBQkh/QYapCdVwwmKlU9mHdmy52KsDGIjVaqEUMFvEzn2LRaigqQ==",
      "requires": {
        "workbox-core": "^4.3.1"
      }
    },
    "workbox-range-requests": {
      "version": "4.3.1",
      "resolved": "https://registry.npmjs.org/workbox-range-requests/-/workbox-range-requests-4.3.1.tgz",
      "integrity": "sha512-S+HhL9+iTFypJZ/yQSl/x2Bf5pWnbXdd3j57xnb0V60FW1LVn9LRZkPtneODklzYuFZv7qK6riZ5BNyc0R0jZA==",
      "requires": {
        "workbox-core": "^4.3.1"
      }
    },
    "workbox-routing": {
      "version": "4.3.1",
      "resolved": "https://registry.npmjs.org/workbox-routing/-/workbox-routing-4.3.1.tgz",
      "integrity": "sha512-FkbtrODA4Imsi0p7TW9u9MXuQ5P4pVs1sWHK4dJMMChVROsbEltuE79fBoIk/BCztvOJ7yUpErMKa4z3uQLX+g==",
      "requires": {
        "workbox-core": "^4.3.1"
      }
    },
    "workbox-strategies": {
      "version": "4.3.1",
      "resolved": "https://registry.npmjs.org/workbox-strategies/-/workbox-strategies-4.3.1.tgz",
      "integrity": "sha512-F/+E57BmVG8dX6dCCopBlkDvvhg/zj6VDs0PigYwSN23L8hseSRwljrceU2WzTvk/+BSYICsWmRq5qHS2UYzhw==",
      "requires": {
        "workbox-core": "^4.3.1"
      }
    },
    "workbox-streams": {
      "version": "4.3.1",
      "resolved": "https://registry.npmjs.org/workbox-streams/-/workbox-streams-4.3.1.tgz",
      "integrity": "sha512-4Kisis1f/y0ihf4l3u/+ndMkJkIT4/6UOacU3A4BwZSAC9pQ9vSvJpIi/WFGQRH/uPXvuVjF5c2RfIPQFSS2uA==",
      "requires": {
        "workbox-core": "^4.3.1"
      }
    },
    "workbox-sw": {
      "version": "4.3.1",
      "resolved": "https://registry.npmjs.org/workbox-sw/-/workbox-sw-4.3.1.tgz",
      "integrity": "sha512-0jXdusCL2uC5gM3yYFT6QMBzKfBr2XTk0g5TPAV4y8IZDyVNDyj1a8uSXy3/XrvkVTmQvLN4O5k3JawGReXr9w=="
    },
    "workbox-webpack-plugin": {
      "version": "4.2.0",
      "resolved": "https://registry.npmjs.org/workbox-webpack-plugin/-/workbox-webpack-plugin-4.2.0.tgz",
      "integrity": "sha512-YZsiA+y/ns/GdWRaBsfYv8dln1ebWtGnJcTOg1ppO0pO1tScAHX0yGtHIjndxz3L/UUhE8b0NQE9KeLNwJwA5A==",
      "requires": {
        "@babel/runtime": "^7.0.0",
        "json-stable-stringify": "^1.0.1",
        "workbox-build": "^4.2.0"
      }
    },
    "workbox-window": {
      "version": "4.3.1",
      "resolved": "https://registry.npmjs.org/workbox-window/-/workbox-window-4.3.1.tgz",
      "integrity": "sha512-C5gWKh6I58w3GeSc0wp2Ne+rqVw8qwcmZnQGpjiek8A2wpbxSJb1FdCoQVO+jDJs35bFgo/WETgl1fqgsxN0Hg==",
      "requires": {
        "workbox-core": "^4.3.1"
      }
    },
    "worker-farm": {
      "version": "1.7.0",
      "resolved": "https://registry.npmjs.org/worker-farm/-/worker-farm-1.7.0.tgz",
      "integrity": "sha512-rvw3QTZc8lAxyVrqcSGVm5yP/IJ2UcB3U0graE3LCFoZ0Yn2x4EoVSqJKdB/T5M+FLcRPjz4TDacRf3OCfNUzw==",
      "requires": {
        "errno": "~0.1.7"
      }
    },
    "worker-rpc": {
      "version": "0.1.1",
      "resolved": "https://registry.npmjs.org/worker-rpc/-/worker-rpc-0.1.1.tgz",
      "integrity": "sha512-P1WjMrUB3qgJNI9jfmpZ/htmBEjFh//6l/5y8SD9hg1Ef5zTTVVoRjTrTEzPrNBQvmhMxkoTsjOXN10GWU7aCg==",
      "requires": {
        "microevent.ts": "~0.1.1"
      }
    },
    "wrap-ansi": {
      "version": "2.1.0",
      "resolved": "https://registry.npmjs.org/wrap-ansi/-/wrap-ansi-2.1.0.tgz",
      "integrity": "sha1-2Pw9KE3QV5T+hJc8rs3Rz4JP3YU=",
      "requires": {
        "string-width": "^1.0.1",
        "strip-ansi": "^3.0.1"
      },
      "dependencies": {
        "is-fullwidth-code-point": {
          "version": "1.0.0",
          "resolved": "https://registry.npmjs.org/is-fullwidth-code-point/-/is-fullwidth-code-point-1.0.0.tgz",
          "integrity": "sha1-754xOG8DGn8NZDr4L95QxFfvAMs=",
          "requires": {
            "number-is-nan": "^1.0.0"
          }
        },
        "string-width": {
          "version": "1.0.2",
          "resolved": "https://registry.npmjs.org/string-width/-/string-width-1.0.2.tgz",
          "integrity": "sha1-EYvfW4zcUaKn5w0hHgfisLmxB9M=",
          "requires": {
            "code-point-at": "^1.0.0",
            "is-fullwidth-code-point": "^1.0.0",
            "strip-ansi": "^3.0.0"
          }
        }
      }
    },
    "wrappy": {
      "version": "1.0.2",
      "resolved": "https://registry.npmjs.org/wrappy/-/wrappy-1.0.2.tgz",
      "integrity": "sha1-tSQ9jz7BqjXxNkYFvA0QNuMKtp8="
    },
    "write": {
      "version": "0.2.1",
      "resolved": "https://registry.npmjs.org/write/-/write-0.2.1.tgz",
      "integrity": "sha1-X8A4KOJkzqP+kUVUdvejxWbLB1c=",
      "requires": {
        "mkdirp": "^0.5.1"
      }
    },
    "write-file-atomic": {
      "version": "1.3.4",
      "resolved": "https://registry.npmjs.org/write-file-atomic/-/write-file-atomic-1.3.4.tgz",
      "integrity": "sha1-+Aek8LHZ6ROuekgRLmzDrxmRtF8=",
      "requires": {
        "graceful-fs": "^4.1.11",
        "imurmurhash": "^0.1.4",
        "slide": "^1.1.5"
      }
    },
    "ws": {
      "version": "5.2.2",
      "resolved": "https://registry.npmjs.org/ws/-/ws-5.2.2.tgz",
      "integrity": "sha512-jaHFD6PFv6UgoIVda6qZllptQsMlDEJkTQcybzzXDYM1XO9Y8em691FGMPmM46WGyLU4z9KMgQN+qrux/nhlHA==",
      "requires": {
        "async-limiter": "~1.0.0"
      }
    },
    "xdg-basedir": {
      "version": "2.0.0",
      "resolved": "https://registry.npmjs.org/xdg-basedir/-/xdg-basedir-2.0.0.tgz",
      "integrity": "sha1-7byQPMOF/ARSPZZqM1UEtVBNG9I=",
      "requires": {
        "os-homedir": "^1.0.0"
      }
    },
    "xml-name-validator": {
      "version": "3.0.0",
      "resolved": "https://registry.npmjs.org/xml-name-validator/-/xml-name-validator-3.0.0.tgz",
      "integrity": "sha512-A5CUptxDsvxKJEU3yO6DuWBSJz/qizqzJKOMIfUJHETbBw/sFaDxgd6fxm1ewUaM0jZ444Fc5vC5ROYurg/4Pw=="
    },
    "xmlchars": {
      "version": "2.1.1",
      "resolved": "https://registry.npmjs.org/xmlchars/-/xmlchars-2.1.1.tgz",
      "integrity": "sha512-7hew1RPJ1iIuje/Y01bGD/mXokXxegAgVS+e+E0wSi2ILHQkYAH1+JXARwTjZSM4Z4Z+c73aKspEcqj+zPPL/w=="
    },
    "xmlhttprequest": {
      "version": "1.8.0",
      "resolved": "https://registry.npmjs.org/xmlhttprequest/-/xmlhttprequest-1.8.0.tgz",
      "integrity": "sha1-Z/4HXFwk/vOfnWX197f+dRcZaPw="
    },
    "xregexp": {
      "version": "4.0.0",
      "resolved": "https://registry.npmjs.org/xregexp/-/xregexp-4.0.0.tgz",
      "integrity": "sha512-PHyM+sQouu7xspQQwELlGwwd05mXUFqwFYfqPO0cC7x4fxyHnnuetmQr6CjJiafIDoH4MogHb9dOoJzR/Y4rFg=="
    },
    "xtend": {
      "version": "4.0.2",
      "resolved": "https://registry.npmjs.org/xtend/-/xtend-4.0.2.tgz",
      "integrity": "sha512-LKYU1iAXJXUgAXn9URjiu+MWhyUXHsvfp7mcuYm9dSUKK0/CjtrUwFAxD82/mCWbtLsGjFIad0wIsod4zrTAEQ=="
    },
    "y18n": {
      "version": "3.2.1",
      "resolved": "https://registry.npmjs.org/y18n/-/y18n-3.2.1.tgz",
      "integrity": "sha1-bRX7qITAhnnA136I53WegR4H+kE="
    },
    "yallist": {
      "version": "2.1.2",
      "resolved": "https://registry.npmjs.org/yallist/-/yallist-2.1.2.tgz",
      "integrity": "sha1-HBH5IY8HYImkfdUS+TxmmaaoHVI="
    },
    "yargs": {
      "version": "3.32.0",
      "resolved": "https://registry.npmjs.org/yargs/-/yargs-3.32.0.tgz",
      "integrity": "sha1-AwiOnr+edWtpdRYR0qXvWRSCyZU=",
      "requires": {
        "camelcase": "^2.0.1",
        "cliui": "^3.0.3",
        "decamelize": "^1.1.1",
        "os-locale": "^1.4.0",
        "string-width": "^1.0.1",
        "window-size": "^0.1.4",
        "y18n": "^3.2.0"
      },
      "dependencies": {
        "is-fullwidth-code-point": {
          "version": "1.0.0",
          "resolved": "https://registry.npmjs.org/is-fullwidth-code-point/-/is-fullwidth-code-point-1.0.0.tgz",
          "integrity": "sha1-754xOG8DGn8NZDr4L95QxFfvAMs=",
          "requires": {
            "number-is-nan": "^1.0.0"
          }
        },
        "string-width": {
          "version": "1.0.2",
          "resolved": "https://registry.npmjs.org/string-width/-/string-width-1.0.2.tgz",
          "integrity": "sha1-EYvfW4zcUaKn5w0hHgfisLmxB9M=",
          "requires": {
            "code-point-at": "^1.0.0",
            "is-fullwidth-code-point": "^1.0.0",
            "strip-ansi": "^3.0.0"
          }
        }
      }
    },
    "yargs-parser": {
      "version": "13.1.1",
      "resolved": "https://registry.npmjs.org/yargs-parser/-/yargs-parser-13.1.1.tgz",
      "integrity": "sha512-oVAVsHz6uFrg3XQheFII8ESO2ssAf9luWuAd6Wexsu4F3OtIW0o8IribPXYrD4WC24LWtPrJlGy87y5udK+dxQ==",
      "requires": {
        "camelcase": "^5.0.0",
        "decamelize": "^1.2.0"
      },
      "dependencies": {
        "camelcase": {
          "version": "5.3.1",
          "resolved": "https://registry.npmjs.org/camelcase/-/camelcase-5.3.1.tgz",
          "integrity": "sha512-L28STB170nwWS63UjtlEOE3dldQApaJXZkOI1uMFfzf3rRuPegHaHesyee+YxQ+W6SvRDQV6UrdOdRiR153wJg=="
        }
      }
    },
    "zip-stream": {
      "version": "1.2.0",
      "resolved": "https://registry.npmjs.org/zip-stream/-/zip-stream-1.2.0.tgz",
      "integrity": "sha1-qLxF9MG0lpnGuQGYuqyqzbzUugQ=",
      "requires": {
        "archiver-utils": "^1.3.0",
        "compress-commons": "^1.2.0",
        "lodash": "^4.8.0",
        "readable-stream": "^2.0.0"
      }
    }
  }
}


*/
