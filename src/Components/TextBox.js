import React from "react";
import "../css/Components/textBox.css";

const TextBox = ({
  onChange,
  value,
  type,
  name,
  className,
  required,
  readOnly
}) => (
  <input
    type={type}
    value={value}
    name={name}
    onChange={onChange}
    className={`${className} textBoxStyles`}
    required={required}
    readOnly={readOnly}
  />
);

export default TextBox;
