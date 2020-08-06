/**
 * @description 计数器逻辑抽离
 */
/**
 * @description 主页上的头部组件
 */
import React from 'react';
import './FoodItemCount.scss';
import { FoodItemProps } from '..';
import store from '../../../../Models/dva';

const FoodItemCount: React.FC<FoodItemProps> = (props) => {
  const { sellStatus } = props.spu;
  /**
   * @description 商品计数器
   */
  const addCount = () => {
    store.dispatch({
      type: 'foodList/setSellState',
      payload: {
        spu: { ...props.spu, sellStatus: sellStatus + 1 },
        tag: props.tag,
      },
    });
  };

  const minCount = () => {
    if (sellStatus > 0) {
      console.log(`现在的值:  ${sellStatus - 1}`);
      store.dispatch({
        type: 'foodList/setSellState',
        payload: {
          spu: { ...props.spu, sellStatus: sellStatus - 1 },
          tag: props.tag,
        },
      });
    }
  };

  return (
    <div className='food-item__count'>
      <span className='food-item__count-left'>
        <button
          className='food-item__count-left-btn'
          onClick={(e) => {
            e.stopPropagation();
            minCount();
          }}
        ></button>
      </span>
      <span className='food-item__count-amount'>{sellStatus}</span>
      <span className='food-item__count-right'>
        <button
          className='food-item__count-right-btn'
          onClick={(e) => {
            e.stopPropagation();
            addCount();
          }}
        ></button>
      </span>
    </div>
  );
};

export default FoodItemCount;
