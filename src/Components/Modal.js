import React from "react";
import Button from "./Button";
import "../css/Components/modal.css";

const Modal = ({
  title,
  onSubmit,
  onClose,
  submitTitle,
  children,
  showModal
}) => {
  return (
    <>
      {showModal && (
        <div className={showModal ? "modalOverlay open" : "closed"}>
          <div className="modal">
            <h2>{title}</h2>
            {children}
            <span>
              <Button type="submit" className="buttonSpacer" onClick={onSubmit}>
                {submitTitle}
              </Button>
              <Button className="buttonSpacer" onClick={onClose}>
                Close
              </Button>
            </span>
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
