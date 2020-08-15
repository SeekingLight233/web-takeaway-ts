/**
 * @description ContentList中的筛选框
 */
import React, { useState, useEffect } from 'react';
import './Filter.scss';
import classNames from 'classnames';
import { scrollTop } from '../../utils/homeUtils';
import FilterList from './FilterList';
import store from '../../Models/dva';
import { useScroll } from '../../utils/hooks';

const Filter: React.FC = () => {
  const [sticky, setSticky] = useState(false); //Filter栏是否吸顶
  const [orderSpread, setOrderSpread] = useState(false); // “综合排序”的展开状态
  const [filterSpread, setFilterSpread] = useState(false); // 筛选栏的展开状态
  const [active, setActive] = useState(''); // “销量最高”和“距离最近"的点击状态
  const [sortText, setSortText] = useState('综合排序');

  // @todo 抽离滚动逻辑
  /**
   * @description 滚动高度为195时设置sticky为true
   */
  // useScroll(setSticky, 195);

  /**
   * @description 点击筛选栏的默认行为
   */
  const defaultAction = (newSortText, newActive) => {
    setOrderSpread((orderSpread) => false);
    setFilterSpread((filterSpread) => false);
    scrollTop();
    setSortText((sortText) => newSortText);
    setActive((active) => newActive);
  };

  /**
   * @description 根据销量排序
   */
  const sortBySales = () => {
    defaultAction('销量最高', 'sales');
    store.dispatch({
      type: 'contentList/getSalesList',
    });
  };

  /**
   * @description 根据距离排序
   */
  const sortByDistance = () => {
    defaultAction('距离最近', 'distance');
    store.dispatch({
      type: 'contentList/getDistanceList',
    });
  };
  /**
   * @description 根据速度排序
   */
  const sortBySpeed = () => {
    defaultAction('速度最快', '');
    store.dispatch({
      type: 'contentList/getFastList',
    });
  };

  /**
   * @description 根据评分排序
   */
  const sortByRate = () => {
    defaultAction('评分最高', '');
    store.dispatch({
      type: 'contentList/getRateList',
    });
  };

  const toggleShow = () => {
    setFilterSpread((filterSpread) => false);
  };
  /**
   * @description 渲染排序依据
   */
  const renderSortArr = () => {
    return [
      <li key='speed' onClick={sortBySpeed}>
        速度最快
      </li>,
      <li key='rate' onClick={sortByRate}>
        评分最好
      </li>,
      <li key='sales' onClick={sortBySales}>
        销量最高
      </li>,
      <li key='distance' onClick={sortByDistance}>
        距离最近
      </li>,
    ];
  };

  /**
   * @description 关闭mask
   */
  const closeMask = () => {
    setOrderSpread(false);
    setFilterSpread(false);
  };
  return (
    <div
      className={classNames(
        'filter',
        { fixed: orderSpread },
        { 'stick-top': sticky }
      )}
    >
      <div className='filter-wrap'>
        <ul className='filter-ul'>
          <li
            className={classNames('sort', { orderSpread })}
            onClick={() => {
              setFilterSpread((filterSpread) => false);
              scrollTop();
              setOrderSpread((orderSpread) => !orderSpread);
            }}
          >
            {sortText}
            <i></i>
          </li>

          <li
            className={classNames('sales', { active: active === 'sales' })}
            onClick={sortBySales}
          >
            销量最高
          </li>
          <li
            className={classNames('distance', {
              active: active === 'distance',
            })}
            onClick={sortByDistance}
          >
            距离最近
          </li>
          <li
            className='filter-detail'
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
        <div className={classNames('sort-detail', { show: orderSpread })}>
          <ul>{renderSortArr()}</ul>
        </div>
        <FilterList show={filterSpread} toggleShow={toggleShow}></FilterList>
      </div>
      <div
        className={classNames({ mask: orderSpread || filterSpread })}
        onClick={(e) => {
          e.stopPropagation();
          closeMask();
        }}
      ></div>
    </div>
  );
};

export default Filter;
