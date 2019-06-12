import React from "react";
import "../css/Components/textBox.css";

const TextBox = ({ onChange, value, type, name, className, required }) => (
  <input
    type={type}
    value={value}
    name={name}
    onChange={onChange}
    className={`${className} textBoxStyles`}
    required={required}
  />
);

export default TextBox;
