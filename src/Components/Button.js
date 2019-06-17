import React from "react";
import "../css/Components/button.css";

const Button = ({ onClick, className, children, disabled, type }) => (
  <button
    disabled={disabled}
    onClick={onClick}
    className={`${className} buttonClass`}
    type={type}
  >
    {children}
  </button>
);

export default Button;
