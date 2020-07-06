import React from "react";
import BottomBar from "../../components/BottomBar";
import Home from "../Home";
import {
  BrowserRouter,
  Route,
  Switch,
  HashRouter,
  Redirect,
} from "react-router-dom";
import Order from "../Order";

const Index: React.FC = (props) => {
  return (
    <div className="index">
      <HashRouter>
        <Redirect to="/home" from="/" />
        <Route path="/home" component={Home} />
        <Route path="/order" component={Order} />
      </HashRouter>
      <BottomBar></BottomBar>
    </div>
  );
};

export default Index;
