import React from "react";
import "./BottomBar.scss";
import { connect, ConnectedProps } from "react-redux";
import { RootState } from "../models";
import tabModel from "../models/tab";
import classNames from "classnames";

// 属性穿透
const mapStateToProps = ({ tab }: RootState) => ({
  tabs: tab.tabs,
  activeKey: tab.activeKey,
});

const connector = connect(mapStateToProps);
type ModelState = ConnectedProps<typeof connector>;

const BottomBar: React.FC<ModelState> = (props) => {
  const renderItems = () => {
    let tabs = props.tabs;
    return tabs.map((item, index) => {
      let cls = item.key + " btn-item";
      return (
        <div key={index} className={cls}>
          <div className="tab-icon"></div>
          <div className="btn-name">{item.name}</div>
        </div>
      );
    });
  };

  return <div className="bottom-bar">{renderItems()}</div>;
};

export default connect(mapStateToProps)(BottomBar);
