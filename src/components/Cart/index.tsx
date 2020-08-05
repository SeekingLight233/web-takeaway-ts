/**
 * @description 购物车
 */
import React, { useState } from 'react';
import './Cart.scss';
import { connect, ConnectedProps } from 'react-redux';
import { RootState } from '../../Models';
import classNames from 'classnames';

const mapStateToProps = ({ foodList }: RootState) => ({
  foodList,
});

const connector = connect(mapStateToProps);
type ModelState = ConnectedProps<typeof connector>;

const Cart: React.FC<ModelState> = (props) => {
  const { dispatch, foodList } = props;
  const {
    categoryList,
    shopInfo,
    totalPrice,
    totalAmount,
    totalOriginPrice,
  } = foodList;
  const active = totalAmount !== 0;
  const check = totalPrice >= shopInfo.minFee;

  // console.log(totalPrice);s

  /**
   * @description 展开购物车
   */
  const spreadCart = () => {
    // dispatch({
    //   type: 'foodList/setState',
    //   payload: {
    //     totalPrice: 1,
    //   },
    // });
  };

  return (
    <div className='cart'>
      <div
        className={classNames('cart__icon', { active })}
        onClick={() => {
          spreadCart();
        }}
      >
        {active ? <div className='cart__num'>{totalAmount}</div> : null}
      </div>
      <div className='cart__text'>
        <div className='cart__price'>
          <span className='cart__price-inner'></span>
        </div>
        {active ? (
          <div className='cart__total-wrap'>
            <div className='cart__total'>
              <span className='cart__price-prefix'>￥</span>
              <span className='cart__current-price'>{totalPrice}</span>
              <span className='cart__origin-price'>￥{totalOriginPrice}</span>
            </div>
            <div className='cart__total-other'>另需配送费￥4</div>
          </div>
        ) : (
          <div className='cart__other-price'>另需配送费￥4</div>
        )}
      </div>
      {check ? (
        <div className='cart__check'>去结算</div>
      ) : (
        <div
          className={classNames('cart__confirm', {
            'cart__conform-active': active && !check,
          })}
        >
          差¥{(shopInfo.minFee - totalPrice).toFixed(1)}起送
        </div>
      )}
    </div>
  );
};

export default connect(mapStateToProps)(Cart);
