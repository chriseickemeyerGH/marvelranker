import React from "react";
import "../css/Components/button.css";

const Button = ({ onClick, className, children, disabled }) => (
  <button
    disabled={disabled}
    onClick={onClick}
    className={`${className} buttonClass`}
  >
    {children}
  </button>
);

export default Button;
