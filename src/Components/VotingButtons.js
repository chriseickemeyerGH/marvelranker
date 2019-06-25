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
  signedOutVote
}) => {
  return (
    <div className="votingPosition inline">
      {loggedIn && (
        <div className="buttonBunch">
          <div className="inline icons">
            <FontAwesomeIcon
              onClick={loggedInUpvote}
              title="Upvote"
              aria-hidden="true"
              icon="angle-double-up"
              className={upvoteClass}
            />

            <br />
            <ScreenReader>Upvote</ScreenReader>
            <FontAwesomeIcon
              onClick={loggedInDownvote}
              title="Downvote"
              aria-hidden="true"
              icon="angle-double-down"
              className={downvoteClass}
            />

            <ScreenReader>Downvote</ScreenReader>
          </div>
          <span className="votePosition inline">
            {votes > 999 ? `${(votes / 1000).toFixed(1)}k` : votes}
          </span>
        </div>
      )}

      {!loggedIn && (
        <div className="buttonBunch">
          <div className="inline icons">
            <FontAwesomeIcon
              onClick={signedOutVote}
              title="You must be logged in to upvote"
              aria-hidden="true"
              icon="angle-double-up"
              size="2x"
              className="icon"
            />
            <br />
            <ScreenReader>You must be logged in to upvote</ScreenReader>

            <FontAwesomeIcon
              onClick={signedOutVote}
              title="You must be logged in to downvote"
              aria-hidden="true"
              icon="angle-double-down"
              size="2x"
              className="icon"
            />
            <ScreenReader>You must be logged in to downvote</ScreenReader>
          </div>
          <span className="votePosition inline">
            {votes > 999 ? `${(votes / 1000).toFixed(1)}k` : votes}
          </span>
        </div>
      )}
    </div>
  );
};

export default VotingButtons;
