import React from "react";
import Button from "./Button";
import "../css/Components/switchButtons.css";

const SwitchButtons = ({ switchState, onClickLeft, onClickRight }) => {
  return (
    <div className="centerSwitchButtons">
      <Button
        onClick={onClickLeft}
        className={switchState ? "activeButton leftButton" : "leftButton"}
      >
        Characters
      </Button>
      <Button
        onClick={onClickRight}
        className={!switchState ? "activeButton rightButton" : "rightButton"}
      >
        Films
      </Button>
    </div>
  );
};
export default SwitchButtons;
