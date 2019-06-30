import React from "react";
import "../css/Components/modal.css";

const Modal = ({ title, children, showModal }) => {
  return (
    <>
      {showModal && (
        <div className={showModal ? "modalOverlay open" : "closed"}>
          <div className="modal">
            <h2>{title}</h2>
            {children}
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
