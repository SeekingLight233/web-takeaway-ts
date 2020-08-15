/**
 * @description 点开单个菜品的详情介绍
 */
import React, { useRef } from 'react';
import './FoodDetail.scss';
import { Spu } from '../../../../Models/foods';
import FoodItemCount from '../FoodItemCount';
import { FoodItemProps } from '..';

interface IProps {
  showImg: (bool: any) => void;
}

const FoodDetail: React.FC<FoodItemProps & IProps> = (props) => {
  const { spu, showImg } = props;
  const {
    bigImageUrl,
    spuName,
    saleVolumeDecoded,
    praiseNumDecoded,
    spuDesc,
    currentPrice,
  } = spu;

  const cardDom = useRef(null);

  /**
   * @description 点击外部关闭弹窗
   */
  const closePopup = (e) => {
    e.stopPropagation();
    // 点击外部关闭弹窗
    if (!cardDom.current.contains(e.target)) {
      showImg(false);
    }
  };
  return (
    <div
      className='food-detail'
      onClick={(e) => {
        closePopup(e);
      }}
    >
      <div className='food-detail__card-wrap' ref={cardDom}>
        <div className='food-detail__card'>
          <div
            className='food-detail__big-img'
            style={{
              backgroundImage: `url(${bigImageUrl})`,
            }}
          ></div>
          <ul className='food-detail__ul-wrap'>
            <li className='food-detail__li-title'>{spuName}</li>
            <li className='food-detail__li-sales'>
              <span>月售{saleVolumeDecoded}</span>{' '}
              <span>赞{praiseNumDecoded}</span>
            </li>
            <li className='food-detail__li-desc'>{spuDesc}</li>
          </ul>
          <div className='food-detail__cart-price'>
            <div className='food-detail__price'>￥{currentPrice}</div>
            <div className='food-detail__cart'>
              <FoodItemCount {...props}></FoodItemCount>
            </div>
          </div>
        </div>
        <button
          className='food-detail__cancel-btn'
          onClick={(e) => {
            e.stopPropagation();
            showImg(false);
          }}
        ></button>
      </div>
    </div>
  );
};

export default FoodDetail;
