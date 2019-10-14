import React from "react";
import "../css/Components/textBox.css";

const TextBox = ({ className = "", ...props }) => (
  <input className={`${className} textBoxStyles`} {...props} />
);

export { TextBox };
