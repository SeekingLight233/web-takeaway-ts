/**
 * @description 底部的导航栏
 */
import React, { useCallback } from "react";
import "./BottomBar.scss";
import { connect, ConnectedProps } from "react-redux";
import { RootState } from "../../Models";
// import tabModel from "../models/tab";
import classNames from "classnames";
import { NavLink, HashRouter } from "react-router-dom";

// 属性穿透
const mapStateToProps = ({ tab }: RootState) => ({
  tabs: tab.tabs,
  activeKey: tab.activeKey,
});

const connector = connect(mapStateToProps);
type ModelState = ConnectedProps<typeof connector>;

const BottomBar: React.FC<ModelState> = (props) => {
  const { dispatch, tabs, activeKey } = props;

  const changeTab = useCallback((key: string) => {
    dispatch({
      type: "tab/changeTab",
      payload: {
        activeKey: key,
      },
    });
  }, []);
  const renderItems = () => {
    return tabs.map((item, index) => {
      const cls = classNames(item.key, "btn-item");
      return (
        <HashRouter key={index}>
          <NavLink
            className={cls}
            to={`/${item.key}`}
            replace={true}
            activeClassName="active"
          >
            <div className="tab-icon"></div>
            <div className="btn-name">{item.name}</div>
          </NavLink>
        </HashRouter>
      );
    });
  };

  return <div className="bottom-bar">{renderItems()}</div>;
};

export default connect(mapStateToProps)(BottomBar);
