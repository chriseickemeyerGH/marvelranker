import React from "react";

import { PageForwardButton } from "./PageForwardButton";
import VoteData from "./VoteData";

export const VoteView = ({
  loggedIn,
  onUpvote,
  onDownvote,
  array,
  onPageForwardClick,
  dataFetched
}) => {
  return (
    <>
      {dataFetched && (
        <>
          <VoteData
            loggedIn={loggedIn}
            onUpvote={onUpvote}
            onDownvote={onDownvote}
            array={array}
          />
          <PageForwardButton onClick={onPageForwardClick} />
        </>
      )}
    </>
  );
};
