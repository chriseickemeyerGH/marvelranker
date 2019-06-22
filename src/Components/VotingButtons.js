import React from "react";
import ScreenReader from "./ScreenReader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../css/Components/votingButtons.css";

const VotingButtons = ({
  loggedIn,
  loggedInUpvote,
  loggedInDownvote,
  upvoteClass,
  downvoteClass,
  votes,
  signedOutVote,
  upvotes,
  downvotes
}) => {
  return (
    <>
      {loggedIn && (
        <>
          <span>({upvotes})</span>
          <FontAwesomeIcon
            onClick={loggedInUpvote}
            title="Upvote"
            aria-hidden="true"
            icon="angle-double-up"
            size="2x"
            className={upvoteClass}
          />
          <ScreenReader>Upvote</ScreenReader>
          <p className="votePosition">{votes}</p>
          <FontAwesomeIcon
            onClick={loggedInDownvote}
            title="Downvote"
            aria-hidden="true"
            icon="angle-double-down"
            size="2x"
            className={downvoteClass}
          />
          <span>({downvotes})</span>
          <ScreenReader>Downvote</ScreenReader>
        </>
      )}

      {!loggedIn && (
        <>
          <p>Upvotes</p>
          <span>({upvotes})</span>
          <FontAwesomeIcon
            onClick={signedOutVote}
            title="You must be logged in to upvote"
            aria-hidden="true"
            icon="angle-double-up"
            size="2x"
            className="icon"
          />
          <ScreenReader>You must be logged in to upvote</ScreenReader>
          <p className="votePosition">{votes}</p>
          <FontAwesomeIcon
            onClick={signedOutVote}
            title="You must be logged in to downvote"
            aria-hidden="true"
            icon="angle-double-down"
            size="2x"
            className="icon"
          />
          <span>({downvotes})</span>
          <p>Downvotes</p>
          <ScreenReader>You must be logged in to downvote</ScreenReader>
        </>
      )}
    </>
  );
};

export default VotingButtons;
