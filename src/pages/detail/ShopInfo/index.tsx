import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { RootState } from '../../../Models/index';
import './ShopInfo.scss';
// 属性穿透
const mapStateToProps = ({ foodList }: RootState) => ({
  shopInfo: foodList.shopInfo,
});

const connector = connect(mapStateToProps);
type ModelState = ConnectedProps<typeof connector>;

const ShopInfo: React.FC<ModelState> = (props) => {
  const { shopInfo } = props;
  const {
    shopName,
    shopPic,
    deliveryTimeDecoded,
    distance,
    shopAddress,
    shipping_time,
    bulletin,
    minFee,
    activityList,
    resScore,
    foodScore,
    packetScore,
    deleveryScore,
  } = shopInfo;

  const renderTags = () => {
    return activityList.map((item, index) => {
      const { actDesc, iconUrl } = item;
      return (
        <div className='shop-info__tag' key={index}>
          <span
            className='shop-info__tag-icon'
            style={{
              backgroundImage: `url("${iconUrl}")`,
            }}
          ></span>
          <span className='shop-info__tag-text'>{actDesc}</span>
          <span></span>
        </div>
      );
    });
  };

  return (
    <div className='shop-info'>
      <header className='shop-info__header'>
        <div className='shop-info__header-top'>
          <i></i>
          <p>{shopAddress}</p>
          <a href=''></a>
        </div>
        <div className='shop-info__header-bottom'>
          <i></i>
          <p>查看食品安全档案</p>
        </div>
      </header>
      <main className='shop-info__main'>
        <div className='shop-info__main-item'>
          <i></i>
          <p>配送时间：{shipping_time}</p>
        </div>
      </main>
      <footer className='shop-info__footer'>
        <div className='shop-info__footer-notice'>
          <i></i>
          <p>{bulletin}</p>
        </div>
        <div className='shop-info__tags'>{renderTags()}</div>
      </footer>
    </div>
  );
};

export default connect(mapStateToProps)(ShopInfo);
