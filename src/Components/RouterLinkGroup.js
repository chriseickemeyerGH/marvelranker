import React from "react";
import { RouterLink } from "./RouterLinks";

export const RouterLinkGroup = () => (
  <div className="centerTheRouter routerLinkCenter">
    <RouterLink to={"/"} label="Home" exact={true} />
    <RouterLink to={"/login"} label="Login" />
    <RouterLink to={"/signup"} label="Sign Up" />
  </div>
);
