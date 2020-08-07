/**
 * @description 单个商家列表
 */
import React, { useState } from 'react';
import './ListItem.scss';
import { Item } from '../../../Models/contentList';
import classNames from 'classnames';
import Star from './Star';

const ListItem: React.FC<Item> = (props) => {
  const {
    shopName,
    picUrl,
    wmPoiScore,
    monthSalesTip,
    deliveryTimeTip,
    distance,
    minPriceTip,
    shippingFeeTip,
    averagePriceTip,
    discounts2,
    recommendInfo,
    deliveryType,
  } = props;

  const starScore = (wmPoiScore as number) / 10;
  const [discount, setDiscount] = useState(false); // 控制折扣信息显示与隐藏

  /**
   * @description 渲染优惠信息
   */
  const renderDiscount = () => {
    return discounts2.map((item, index) => {
      return (
        <span key={index} className='discount-wrap'>
          <div className='discount-wrap-item'>
            <img src={item.iconUrl} alt='' />
            <span>{item.info}</span>
          </div>
        </span>
      );
    });
  };

  const renderKm = () => {
    return <>{(distance as number) / 1000 + 'km'}</>;
  };
  /**
   * @description 渲染那几颗小星星~~
   */
  const renderStar = () => {
    const stars = [];
    const score = Math.ceil(starScore);
    for (let i = 0; i <= 5; i++) {
      if (i < score) {
        stars.push(<i className='star' key={i}></i>);
      } else {
        stars.push(<i className='gray-star' key={i}></i>);
      }
    }
    return stars;
  };
  /**
   * @description 控制折扣信息开关
   */
  const toggleDiscounts = () => {
    setDiscount(!discount);
  };
  return (
    <div className='list-item'>
      <div className='left-item'>
        <img className='item-img' src={picUrl} alt='' />
      </div>
      <div className='right-item'>
        <div className='shop-name'>{shopName}</div>
        <div className='item-desc '>
          <span className='item-sales'>
            <Star starScore={starScore}></Star>
            <span className='star-score'>
              {starScore} {'月售' + monthSalesTip}
            </span>
          </span>
          <span className='item-delivery'>
            <span>{deliveryTimeTip}分钟</span>
            <span className='item-distance'>
              {distance > 1000 ? renderKm() : distance + 'm'}
            </span>
          </span>
        </div>
        <div className='item-price'>
          <span className='item-price-detail'>{minPriceTip}</span>
          <span className='item-price-detail'>{shippingFeeTip}</span>
          <span className='item-price-detail'>{averagePriceTip}</span>
          {deliveryType === 1 ? <span className='meituan-tag'></span> : null}
        </div>
        <div className='item-recommend'>
          {recommendInfo ? <span>大众点评高分店铺</span> : null}
        </div>

        {discounts2 ? (
          <div
            className={classNames('discount-content', { toggle: discount })}
            onClick={() => {
              if (discounts2.length >= 3) {
                toggleDiscounts();
              }
            }}
          >
            <span
              className={classNames('discount-arrow-up', {
                'arrow-down': discount,
                'hidden-arrow': discounts2.length < 3,
              })}
            ></span>
            {renderDiscount()}
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default ListItem;
