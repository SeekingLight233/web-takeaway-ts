/**
 * @description 商家详情  右部的事物列表
 */
import React from 'react';
import './RightFoodList.scss';
import { connect, ConnectedProps } from 'react-redux';
import { RootState } from '../../Models';
import classNames from 'classnames';
import FoodItem from './FoodItem';
const mapStateToProps = ({ foodList }: RootState) => ({
  foodList,
});

const connector = connect(mapStateToProps);
type ModelState = ConnectedProps<typeof connector>;

const RightFoodList: React.FC<ModelState> = (props) => {
  const { dispatch, foodList } = props;
  const { activeLeftTag, categoryList } = foodList;

  /**
   * @description 根据左边的选择种类渲染右边的事物列表
   */
  const renderFoodList = () => {
    return categoryList.map((item, index) => {
      const { categoryName, spuList } = item;
      if (item.categoryName === activeLeftTag) {
        return spuList.map((spu, index) => {
          return <FoodItem spu={spu} key={index}></FoodItem>;
        });
      }
    });
  };

  return (
    <div className='right-food-list'>
      <div className='right-food-list__title'>{activeLeftTag}</div>
      <div className='right-food-list__main'>{renderFoodList()}</div>
    </div>
  );
};

export default connect(mapStateToProps)(RightFoodList);
