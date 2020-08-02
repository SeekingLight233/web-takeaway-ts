/**
 * @description 商家顶部的Banner
 */
import React, { useCallback, useEffect } from 'react';
import './Banner.scss';
import { connect, ConnectedProps } from 'react-redux';
import { RootState } from '../../Models';
import ActivityList from './ActivityList';
// 属性穿透
const mapStateToProps = ({ foodList }: RootState) => ({
  shopInfo: foodList.shopInfo,
});

const connector = connect(mapStateToProps);
type ModelState = ConnectedProps<typeof connector>;

const Banner: React.FC<ModelState> = (props) => {
  const { dispatch, shopInfo } = props;
  const {
    shopName,
    shopPic,
    deliveryTimeDecoded,
    distance,
    shopAddress,
    shipping_time,
    bulletin,
    activityList,
  } = shopInfo;

  const getShopInfo = useCallback(() => {
    dispatch({
      type: 'foodList/getFoodList',
    });
  }, []);

  useEffect(() => {
    getShopInfo();
  }, []);
  return (
    <div className='banner'>
      <div className='banner__goback'>
        <i></i>
      </div>
      <div className='banner__main'>
        <img className='banner__left' src={shopPic}></img>
        <div className='banner__right'>
          <div className='banner__distance'>
            <span className='banner__time'>{deliveryTimeDecoded}</span>
            <span className='banner__meters'>{distance}</span>
          </div>
          <div className='banner__board'>{bulletin}</div>
          <div className='banner__discount'>
            {<ActivityList activityList={activityList}></ActivityList>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default connect(mapStateToProps)(Banner);
