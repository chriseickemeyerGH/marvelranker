import React from "react";
import VotingButtons from "./VotingButtons";
import Spinner from "./Spinner";
import { PageForwardButton } from "./PageForwardButton";

export const VoteView = ({
  loading,
  loggedIn,
  onUpvote,
  onDownvote,
  array,
  onPageForwardClick
}) => {
  return (
    <>
      {loading && <Spinner />}
      <div className="flexMain">
        {array.map((item, i) => (
          <div className="flexMainChild" key={item.key}>
            <VotingButtons
              loggedIn={loggedIn}
              onUpvote={() => onUpvote(i)}
              onDownvote={() => onDownvote(i)}
              upvoteClass={
                loggedIn && item.upvoters.includes(loggedIn)
                  ? "icon iconActive"
                  : "icon"
              }
              downvoteClass={
                loggedIn && item.downvoters.includes(loggedIn)
                  ? "icon iconActive"
                  : "icon"
              }
              votes={item.votes}
            />
            <b className="inline titleSize">
              <p>{item.name}</p>
            </b>
          </div>
        ))}
      </div>
      <PageForwardButton onClick={onPageForwardClick} />
    </>
  );
};
