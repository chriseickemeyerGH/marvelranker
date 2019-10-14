import React from "react";
import Modal from "./Modal";
import { TextBox } from "./TextBox";
import Button from "./Button";

export const PasswordVerifyModal = ({
  modalErrorState,
  modalErrorText,
  currentEmailVal,
  passwordVal,
  passwordOnChange,
  onSubmit,
  onModalClose,
  ...props
}) => (
  <>
    <Modal {...props}>
      <p>You must verify your password to delete your account. </p>

      {modalErrorState && <p className="error">{modalErrorText}</p>}
      <form>
        <label htmlFor="email">Email:</label>
        <br />

        <TextBox
          readOnly={true}
          type="email"
          name="email"
          value={currentEmailVal}
        />
        <br />
        <label htmlFor="password">Password:</label>
        <br />
        <TextBox
          type="password"
          name="password"
          value={passwordVal}
          onChange={passwordOnChange}
        />
        <div>
          <Button className="buttonSpacer" onClick={onSubmit}>
            Delete my account
          </Button>
          <Button className="buttonSpacer" onClick={onModalClose}>
            Close
          </Button>
        </div>
      </form>
    </Modal>
  </>
);
