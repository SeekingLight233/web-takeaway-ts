/**
 * @description 单个食物组件
 */
import React from 'react';
import './FoodItem.scss';
import { Spu } from '../../../Models/foods';

interface IProps {
  spu: Spu;
}

const FoodItem: React.FC<IProps> = (props) => {
  const {
    littleImageUrl,
    spuName,
    spuDesc,
    saleVolumeDecoded,
    praiseNumDecoded,
    originPrice,
    currentPrice,
    skuList,
  } = props.spu;

  /**
   * @description 折扣信息
   */
  const renderSkuList = () => {
    return skuList.map((item, index) => {
      const { skuPromotionInfo } = item;
      return (
        <div className='food-item__sku'>
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
    <div className='food-item'>
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
        <div className='food-item__button'></div>
        {skuList ? renderSkuList() : null}
      </div>
    </div>
  );
};

export default FoodItem;
