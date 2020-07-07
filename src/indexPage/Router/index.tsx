import React from "react";
import BottomBar from "../../components/BottomBar";
import Home from "../Home";
import { Route, HashRouter, Redirect } from "react-router-dom";
import Order from "../Order";

const Index: React.FC = () => {
  return (
    <div className="index">
      <HashRouter>
        <Redirect to="/order" from="/" />
        <Route path="/home" component={Home} />
        <Route path="/order" component={Order} />
      </HashRouter>
      <BottomBar></BottomBar>
    </div>
  );
};

export default Index;
