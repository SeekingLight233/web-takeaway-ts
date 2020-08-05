/**
 * @description 商家详情  右部的事物列表
 */
import React, { useState, useContext } from 'react';
import './RightFoodList.scss';
import { connect, ConnectedProps } from 'react-redux';
import { RootState } from '../../Models';
import classNames from 'classnames';
import FoodItem from './FoodItem';
import { useScroll } from '../../utils/hooks';
import { Context } from '../../pages/detail/Router';
const mapStateToProps = ({ foodList }: RootState) => ({
  foodList,
});

const connector = connect(mapStateToProps);
type ModelState = ConnectedProps<typeof connector>;

const RightFoodList: React.FC<ModelState> = (props) => {
  const { dispatch, foodList } = props;
  const { activeLeftTag, categoryList } = foodList;
  const sticky = useContext(Context);

  /**
   * @description 根据左边的选择种类渲染右边的事物列表
   */
  const renderFoodList = () => {
    return categoryList.map((item, index) => {
      const { categoryName, spuList, tag } = item;
      if (item.categoryName === activeLeftTag) {
        return spuList.map((spu, index) => {
          return <FoodItem spu={spu} tag={tag} key={index}></FoodItem>;
        });
      }
    });
  };

  return (
    <div className={classNames('right-food-list')}>
      <div
        className={classNames('right-food-list__title', {
          'title-sticky': sticky,
        })}
      >
        {activeLeftTag}
      </div>
      <div className='right-food-list__main'>{renderFoodList()}</div>
    </div>
  );
};

export default connect(mapStateToProps)(RightFoodList);
