import React from "react";
import "../css/Components/button.css";

const Button = ({ className = "", ...props }) => (
  <button className={`${className} buttonClass`} {...props} />
);

export default Button;
