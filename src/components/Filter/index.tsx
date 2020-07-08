/**
 * @description ContentList中的筛选框
 */
import React, { useState } from "react";
import "./Filter.scss";
import classNames from "classnames";
import { scrollTop } from "../../utils/homeUtils";
import FilterList from "./FilterList";

// mock
const sortArrs = ["综合排序", "速度最快", "评分最好", "销量最高", "距离最近"];

const Filter: React.FC = () => {
  const [orderSpread, setOrderSpread] = useState(false); // “综合排序”的展开状态
  const [filterSpread, setFilterSpread] = useState(false); // 筛选栏的展开状态
  const [active, setActive] = useState(""); // “销量最高”和“距离最近"的点击状态
  /**
   * @description 渲染排序依据
   */
  const renderSortArr = () => {
    return sortArrs.map((item, index) => {
      return <li key={index}>{item}</li>;
    });
  };
  /**
   * @description 根据销量排序
   */
  const orderBySales = () => {
    scrollTop();
    setActive((active) => "sales");
  };

  /**
   * @description 根据距离排序
   */
  const orderByDistance = () => {
    scrollTop();
    setActive((active) => "distance");
  };

  return (
    <div className={classNames("filter", { fixed: orderSpread })}>
      <div className="filter-wrap">
        <ul className="filter-ul">
          <li
            className={classNames("sort", { orderSpread })}
            onClick={() => {
              if (!filterSpread) {
                setOrderSpread((orderSpread) => !orderSpread);
                scrollTop();
              }
            }}
          >
            综合排序<i></i>
          </li>

          <li
            className={classNames("sales", { active: active === "sales" })}
            onClick={orderBySales}
          >
            销量最高
          </li>
          <li
            className={classNames("distance", {
              active: active === "distance",
            })}
            onClick={orderByDistance}
          >
            距离最近
          </li>
          <li
            className="filter-detail"
            onClick={() => {
              if (!orderSpread) {
                setFilterSpread((filterSpread) => !filterSpread);
                scrollTop();
              }
            }}
          >
            筛选<i></i>
          </li>
        </ul>
        <div className={classNames("sort-detail", { show: orderSpread })}>
          <ul>{renderSortArr()}</ul>
        </div>
        <FilterList show={filterSpread}></FilterList>
      </div>
    </div>
  );
};

export default Filter;
