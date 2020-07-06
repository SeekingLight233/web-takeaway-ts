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
  const [page, setPage] = useState(0);
  const [end, setEnd] = useState(false);

  /**
   * @description 请求数据
   */
  const fetchData = (pageNum) => {
    dispatch({
      type: "contentList/getContentList",
      payload: {
        pageNum,
      },
    });
  };

  /**
   * @description 监听页码变化
   */
  useEffect(() => {
    if (page < 3) {
      fetchData(page);
    } else {
      setEnd(true);
    }
  }, [page]);

  /**
   * @description 渲染商家列表
   */
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
        isEnd={end}
        loadCallBack={() => {
          setPage((page) => page + 1);
        }}
      >
        {renderShopList()}
      </ScrollView>
    </div>
  );
};

export default connect(mapStateToProps)(ContentList);
