import React from "react";
import { RouterButton } from "./RouterLinks";

export const RouterButtonGroup = ({ onSignOut, onDeleteAccountClick }) => (
  <div className="centerTheRouter routerButtonsCenter">
    <RouterButton onClick={onSignOut}>Sign Out</RouterButton>
    <RouterButton onClick={onDeleteAccountClick}>
      Delete Your Account
    </RouterButton>
  </div>
);
