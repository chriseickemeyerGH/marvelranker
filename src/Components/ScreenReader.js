import React from "react";
import "../css/Components/screenReader.css";

const ScreenReader = ({ children }) => (
  <span className="sr-only">{children}</span>
);

export default ScreenReader;
