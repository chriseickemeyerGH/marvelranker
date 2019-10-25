import React, { Suspense, lazy } from "react";
import Spinner from "./Spinner";
import { PageForwardButton } from "./PageForwardButton";

const VoteData = lazy(() => import("./VoteData"));

export const VoteView = ({
  loggedIn,
  onUpvote,
  onDownvote,
  array,
  onPageForwardClick
}) => {
  return (
    <Suspense fallback={<Spinner />}>
      <VoteData
        loggedIn={loggedIn}
        onUpvote={onUpvote}
        onDownvote={onDownvote}
        array={array}
      />
      <PageForwardButton onClick={onPageForwardClick} />
    </Suspense>
  );
};
