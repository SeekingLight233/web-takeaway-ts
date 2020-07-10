/**
 * @description 筛选框中的弹出层
 */
import React, { useEffect, useState } from "react";
import "./FilterList.scss";
import { RootState } from "../../../Models";
import { connect, ConnectedProps } from "react-redux";
import { IFilterItem } from "../../../Models/filter";
import classNames from "classnames";

const mapStateToProps = ({ filterList }: RootState) => ({
  items: filterList.items,
  count: filterList.count,
});

const connector = connect(mapStateToProps);
type ModelState = ConnectedProps<typeof connector>;

interface IProps {
  show: boolean;
  toggleShow: () => void;
}
const FilterList: React.FC<ModelState & IProps> = (props) => {
  const { items, dispatch, show, count, toggleShow } = props;

  const fetchData = () => {
    dispatch({
      type: "filterList/getFilterList",
    });
  };
  useEffect(fetchData, []);
  /**
   * @description 更改tag的点击状态
   */
  const handleClick = (row, index) => {
    dispatch({
      type: "filterList/setActive",
      payload: {
        row,
        index,
      },
    });
  };

  /**
   * @description 清除点击状态
   */
  const clearSelected = () => {
    dispatch({
      type: "filterList/clearActive",
    });
  };

  /**
   * @description 提交筛选请求
   */
  const filterSubmit = () => {
    toggleShow();
    if (count === 0) return;
    dispatch({
      type: "contentList/getFilterList",
    });
  };

  /**
   * @description 渲染每一行中的Filter单个元素,传递行数方便做样式和逻辑区分
   */
  const renderFilterInner = (filterItemList: IFilterItem[], row: number) => {
    return filterItemList.map((item, index) => {
      const { icon, name, active } = item;
      if (row !== 3) {
        return (
          <li
            className={classNames("filter-tag", { active })}
            key={index}
            onClick={handleClick.bind(null, row, index)}
          >
            {icon ? <img className="inner-icon" src={icon}></img> : null}
            <span>{name}</span>
          </li>
        );
      } else {
        return (
          <li
            className={classNames("discount", { active })}
            key={index}
            onClick={handleClick.bind(null, 3, index)}
          >
            <img src={icon}></img>
            <span>{name}</span>
          </li>
        );
      }
    });
  };

  /**
   * @description 渲染Filter的每一行
   */
  const renderFilter = () => {
    return items.map((item, index) => {
      return (
        <div className="filter-inner" key={index}>
          {item.groupTitle ? (
            <div className="group-title">{item.groupTitle}</div>
          ) : null}
          <ul>{renderFilterInner(item.filterItemList, index)}</ul>
        </div>
      );
    });
  };
  return (
    <div className={classNames("filter-list", { show })}>
      <div className="filter-wrap">{renderFilter()}</div>
      <div className="filter-buttons">
        <span className="clear-button" onClick={clearSelected}>
          清除筛选
        </span>
        <span className="close-button" onClick={filterSubmit}>
          完成{count === 0 ? null : <i>{count}</i>}
        </span>
      </div>
    </div>
  );
};

export default connect(mapStateToProps)(FilterList);
