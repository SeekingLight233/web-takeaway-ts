import React from "react";
import ReactDom from "react-dom";
import { Provider } from "react-redux";
import store from "../Models/dva";
import Router from "./Router/index";

ReactDom.render(
  <Provider store={store}>
    <Router></Router>
  </Provider>,
  document.getElementById("root")
);
