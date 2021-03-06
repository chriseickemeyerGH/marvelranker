import React from "react";
import "./css/index.css";
import * as serviceWorker from "./serviceWorker";
import { BrowserRouter } from "react-router-dom";
import { Router } from "./Views/Router";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";
//import ReactDOM from "react-dom";
import { hydrate, render } from "react-dom";

import {
  faAngleDoubleUp,
  faAngleDoubleDown,
  faHeart,
  faArrowRight
} from "@fortawesome/free-solid-svg-icons";

library.add(faAngleDoubleUp, faAngleDoubleDown, faHeart, faArrowRight, fab);

function Index() {
  return (
    <BrowserRouter>
      <Router />
    </BrowserRouter>
  );
}

const rootElement = document.getElementById("root");
//ReactDOM.render(<Index />, rootElement);

if (rootElement.hasChildNodes()) {
  hydrate(<Index />, rootElement);
} else {
  render(<Index />, rootElement);
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
