import React from "react";
import ReactDom from "react-dom";
import { Provider } from "react-redux";
import store from "./models/dva";
import Index from "./Index/index";

ReactDom.render(
  <Provider store={store}>
    <Index></Index>
  </Provider>,
  document.getElementById("root")
);
