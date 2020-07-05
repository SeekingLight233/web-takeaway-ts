/**
 * @description 主页上商家列表
 */
import React, { useEffect, useState } from "react";
import "./ContentList.scss";
import { connect, ConnectedProps } from "react-redux";
import { RootState } from "../../Models";
import ListItem from "./ListItem";
import ScrollView from "../ScrollView";

const mapStateToProps = ({ contentList }: RootState) => ({
  items: contentList.items,
});

const connector = connect(mapStateToProps);
type ModelState = ConnectedProps<typeof connector>;

const ContentList: React.FC<ModelState> = (props) => {
  const { items, dispatch } = props;
  let page = 0;
  const fetchData = (pageNum) => {
    console.log(pageNum);
    dispatch({
      type: "contentList/getContentList",
      payload: {
        pageNum,
      },
    });
  };
  useEffect(() => {
    fetchData(0);
  }, []);
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
      <ScrollView
        isEnd={false}
        loadCallBack={() => {
          fetchData(++page);
        }}
      >
        {renderShopList()}
      </ScrollView>
    </div>
  );
};

export default connect(mapStateToProps)(ContentList);
