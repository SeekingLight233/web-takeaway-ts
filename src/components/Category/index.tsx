/**
 * @description 主页上的分类组件
 */
import "./Category.scss";
import React, { useEffect } from "react";
import { connect, ConnectedProps, Connect } from "react-redux";
import { RootState } from "../../Models";

const mapStateToProps = ({ cate }: RootState) => ({
  items: cate.items,
});

const connector = connect(mapStateToProps);
type ModelState = ConnectedProps<typeof connector>;

const Category: React.FC<ModelState> = (props) => {
  const { items, dispatch } = props;

  const fetchData = () => {
    dispatch({
      type: "cate/getCateList",
    });
  };

  useEffect(fetchData, []);

  const renderItems = () => {
    return items.map((item, index) => {
      return (
        <div key={index} className="category-item">
          <img className="item-icon" src={item.icon}></img>
          <p className="item-name">{item.name}</p>
        </div>
      );
    });
  };

  return <div className="category clearfix">{renderItems()}</div>;
};

export default connect(mapStateToProps)(Category);
