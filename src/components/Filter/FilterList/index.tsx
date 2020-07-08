/**
 * @description 筛选框中的弹出层
 */
import React, { useEffect } from "react";
import "./FilterList.scss";
import { RootState } from "../../../Models";
import { connect, ConnectedProps } from "react-redux";
import { IFilterItemList } from "../../../Models/filter";
import classNames from "classnames";

const mapStateToProps = ({ filterList }: RootState) => ({
  items: filterList.items,
});

const connector = connect(mapStateToProps);
type ModelState = ConnectedProps<typeof connector>;

interface IProps {
  show: boolean;
}
const FilterList: React.FC<ModelState & IProps> = (props) => {
  const { items, dispatch, show } = props;

  const fetchData = () => {
    dispatch({
      type: "filterList/getFilterList",
    });
  };
  useEffect(fetchData, []);

  /**
   * @description 渲染每一行中的Filter单个元素,传递行数方便做样式区分
   */
  const renderFilterInner = (
    filterItemList: IFilterItemList[],
    row: number
  ) => {
    if (row !== 3) {
      return filterItemList.map((item, index) => {
        const { icon, name } = item;
        return (
          <li className="filter-tag" key={index}>
            {icon ? <img className="inner-icon" src={icon}></img> : null}
            <span>{name}</span>
          </li>
        );
      });
    } else {
      return filterItemList.map((item, index) => {
        const { icon, name } = item;
        return (
          <li className="discount" key={index}>
            <img src={icon}></img>
            <span>{name}</span>
          </li>
        );
      });
    }
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
        <span className="clear-button">清除筛选</span>
        <span className="close-button">完成</span>
      </div>
    </div>
  );
};

export default connect(mapStateToProps)(FilterList);
