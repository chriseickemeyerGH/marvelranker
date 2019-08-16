import React from "react";
import "../css/Components/spinner.css";

const Spinner = () => (
  <div
    style={{
      display: "flex",
      flexFlow: "row nowrap",
      justifyContent: "center"
    }}
  >
    <div className="loader" />
  </div>
);

export default Spinner;
