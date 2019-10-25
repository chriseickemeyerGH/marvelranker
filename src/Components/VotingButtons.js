import React from "react";
import ScreenReader from "./ScreenReader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { VotesNum } from "./VotesNum";
import "../css/Components/votingButtons.css";

export const VotingButtons = ({
  loggedIn,
  onUpvote,
  onDownvote,
  upvoteClass,
  downvoteClass,
  votes
}) => {
  return (
    <div className="votingPosition inline">
      <div className="buttonBunch">
        <div className="inline icons">
          <FontAwesomeIcon
            onClick={onUpvote}
            title={loggedIn ? "Upvote" : "You must be logged in to vote"}
            icon="angle-double-up"
            className={upvoteClass}
          />

          <br />
          <ScreenReader>Upvote</ScreenReader>
          <FontAwesomeIcon
            onClick={onDownvote}
            title={loggedIn ? "Downvote" : "You must be logged in to vote"}
            icon="angle-double-down"
            className={downvoteClass}
          />

          <ScreenReader>Downvote</ScreenReader>
        </div>
        <VotesNum votes={votes} />
      </div>
    </div>
  );
};
