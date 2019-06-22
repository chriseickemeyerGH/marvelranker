import React from "react";
import ReactDOM from "react-dom";
import "./css/index.css";
import * as serviceWorker from "./serviceWorker";
import { BrowserRouter } from "react-router-dom";
import Router from "./Components/Router";
import { library } from "@fortawesome/fontawesome-svg-core";

import {
  faAngleDoubleUp,
  faAngleDoubleDown
} from "@fortawesome/free-solid-svg-icons";

library.add(faAngleDoubleUp, faAngleDoubleDown);

function Index() {
  return (
    <BrowserRouter>
      <Router />
    </BrowserRouter>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<Index />, rootElement);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
