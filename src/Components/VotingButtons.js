import React from "react";
import ScreenReader from "./ScreenReader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { VotesNum } from "./VotesNum";
import "../css/Components/votingButtons.css";

const VotingButtons = ({
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

      {/*!loggedIn && (
        <div className="buttonBunch">
          <div className="inline icons">
            <FontAwesomeIcon
              onClick={signedOutVote}
              title="You must be logged in to upvote"
              icon="angle-double-up"
              size="2x"
              className="icon"
            />
            <br />
            <ScreenReader>You must be logged in to upvote</ScreenReader>

            <FontAwesomeIcon
              onClick={signedOutVote}
              title="You must be logged in to downvote"
              icon="angle-double-down"
              size="2x"
              className="icon"
            />
            <ScreenReader>You must be logged in to downvote</ScreenReader>
          </div>
          <VotesNum votes={votes} />
        </div>
      ) */}
    </div>
  );
};

export default VotingButtons;
