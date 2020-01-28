import React from "react";
import { Button } from "./Button";

export const NameScoreToggleButton = ({ onToggle, state }) => {
  return (
    <div className="centerButton">
      <Button onClick={onToggle}>
        {state ? "Sort by Name" : "Sort by Score"}
      </Button>{" "}
    </div>
  );
};
