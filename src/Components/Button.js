import React from "react";
import "../css/Components/button.css";

export const Button = ({ className = "", ...props }) => (
  <button className={`${className} buttonClass`} {...props} />
);
