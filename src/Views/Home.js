import React, { useState, useEffect, useContext } from "react";
import firebase from "../firebase.js";
import SnackBar from "../Components/SnackBar";
import VotingButtons from "../Components/VotingButtons";
import SwitchButtons from "../Components/SwitchButtons";
import Spinner from "../Components/Spinner";
import Button from "../Components/Button";
import { UserContext } from "./Router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Helmet } from "react-helmet";
import "../css/Views/Home.css";

export const Home = () => {
  const userID = useContext(UserContext);
  return <HomeSubComponent UID={userID} />;
};

const HomeSubComponent = ({ UID }) => {
  const [db] = useState(firebase.firestore());
  const [heroesArr, setHeroesArr] = useState([]);
  const [filmArr, setFilmArr] = useState([]);
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
              loggedIn={UID}
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
              loggedIn={UID}
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
};
