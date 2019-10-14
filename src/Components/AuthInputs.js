import React from "react";
import { TextBox } from "./TextBox";

export const AuthInputs = ({
  emailVal,
  emailOnChange,
  passwordVal,
  passwordOnChange
}) => (
  <>
    <label htmlFor="email">Email:</label>
    <br />
    <TextBox
      type="email"
      id="email"
      value={emailVal}
      required
      onChange={emailOnChange}
    />
    <br />
    <label htmlFor="password">Password:</label>
    <br />
    <TextBox
      type="password"
      id="password"
      value={passwordVal}
      onChange={passwordOnChange}
      required
    />
  </>
);
