import React from "react";
import Button from "./Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const PageForwardButton = ({ onClick }) => (
  <div className="buttonContainer">
    <Button onClick={onClick}>
      Next <FontAwesomeIcon title="Next Results" icon="arrow-right" />
    </Button>
  </div>
);
