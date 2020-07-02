import React from "react";
import BottomBar from "../../components/BottomBar";
import Home from "../Home";

const Index: React.FC = (props) => {
  return (
    <div className="index">
      <Home></Home>
      <BottomBar></BottomBar>
    </div>
  );
};

export default Index;
