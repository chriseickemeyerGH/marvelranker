import React from "react";
import "../css/Components/snackBar.css";

const Snackbar = ({ snackBarVisibility, text }) => (
  <>
    {snackBarVisibility && (
      <div className={snackBarVisibility ? "snackBarClass" : ""}>
        <p>{text}</p>
      </div>
    )}
  </>
);

export default Snackbar;
