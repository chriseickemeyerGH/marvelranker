import React from "react";

export const VotesNum = ({ votes }) => (
  <span className="votePosition inline">
    {votes > 999 ? `${(votes / 1000).toFixed(1)}k` : votes}
  </span>
);
