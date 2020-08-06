/**
 * @description 单个食物组件
 */
import React, { useState, useEffect } from 'react';
import './FoodItem.scss';
import { Spu } from '../../../Models/foods';
import store from '../../../Models/dva';
import FoodDetail from './FoodDetail';
import FoodItemCount from './FoodItemCount';

export interface FoodItemProps {
  spu: Spu;
  tag: string;
}

const FoodItem: React.FC<FoodItemProps> = (props) => {
  const {
    littleImageUrl,
    bigImageUrl,
    spuName,
    spuDesc,
    saleVolumeDecoded,
    praiseNumDecoded,
    originPrice,
    currentPrice,
    skuList,
    sellStatus,
  } = props.spu;

  const active = sellStatus > 0;

  // const active = true;
  const [showBigImg, setShowBigImg] = useState(false);

  /**
   * @description 是否显示大图
   */
  const showImg = (bool) => {
    setShowBigImg((_) => bool);
  };

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

  /**
   * @description 折扣信息
   */
  const renderSkuList = () => {
    return skuList.map((item, index) => {
      const { skuPromotionInfo } = item;
      return (
        <div className='food-item__sku' key={index}>
          {skuPromotionInfo ? (
            <div className='food-item__sku-inner'>
              <span className='food-item__sku-text'>{skuPromotionInfo}</span>
            </div>
          ) : null}
        </div>
      );
    });
  };

  return (
    <div
      className='food-item'
      onClick={() => {
        showImg(true);
      }}
    >
      <div className='food-item__left'>
        <img className='food-item__image' src={littleImageUrl} alt='' />
      </div>
      <div className='food-item__right'>
        <div className='food-item__title'>{spuName}</div>
        <div className='food-item__desc'>{spuDesc}</div>
        <div className='food-item__num'>
          <span className='food-item__sales'>月售{saleVolumeDecoded}</span>
          <span className='food-item__praise'>赞{praiseNumDecoded}</span>
        </div>
        <div className='food-item__price'>
          <span className='food-item__current'>
            <span>￥</span>
            <span
              style={{
                display: 'inline-block',
                marginLeft: '1px',
              }}
            >
              {currentPrice}
            </span>
          </span>
          <span className='food-item__origin'>￥{originPrice}</span>
        </div>
        {active ? (
          <FoodItemCount {...props}></FoodItemCount>
        ) : (
          <div
            className='food-item__button'
            onClick={(e) => {
              e.stopPropagation();
              addCount();
            }}
          ></div>
        )}
        {skuList ? renderSkuList() : null}
      </div>
      {showBigImg ? (
        <FoodDetail {...props} showImg={showImg}></FoodDetail>
      ) : null}
    </div>
  );
};

export default FoodItem;
