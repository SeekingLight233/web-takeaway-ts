/**
 * @description 主页上商家列表
 */
import React, { useEffect } from "react";
import "./ContentList.scss";
import { connect, ConnectedProps } from "react-redux";
import { RootState } from "../../Models";
import ListItem from "./ListItem";

const mapStateToProps = ({ contentList }: RootState) => ({
  items: contentList.items,
});

const connector = connect(mapStateToProps);
type ModelState = ConnectedProps<typeof connector>;

const ContentList: React.FC<ModelState> = (props) => {
  const { items, dispatch } = props;
  const fetchData = () => {
    dispatch({
      type: "contentList/getContentList",
    });
  };
  useEffect(fetchData, []);
  const renderShopList = () => {
    return items.map((item, index) => {
      return (
        <div key={index}>
          <ListItem {...item}></ListItem>
        </div>
      );
    });
  };
  return (
    <div className="content-list">
      <div className="list-title">附近商家</div>

      {renderShopList()}
    </div>
  );
};

export default connect(mapStateToProps)(ContentList);
