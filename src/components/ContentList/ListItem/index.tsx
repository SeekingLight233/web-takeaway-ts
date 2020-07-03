/**
 * @description 单个商家列表
 */
import React from "react";
import "./ListItem.scss";
import { Item } from "../../../Models/contentList";

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
  } = props;

  const starScore = (wmPoiScore as number) / 10;

  const renderDiscount = () => {
    return discounts2.map((item, index) => {
      return (
        <p key={index}>
          <img src={item.iconUrl} alt="" />
          <span>{item.info}</span>
        </p>
      );
    });
  };

  const renderKm = () => {
    return <span>{(distance as number) / 1000 + "km"}</span>;
  };
  /**
   * @description 渲染那几颗小星星~~
   */
  const renderStar = () => {
    let stars = [];
    const score = Math.ceil(starScore);
    for (let i = 0; i <= 5; i++) {
      if (i < score) {
        stars.push(<i className="star" key={i}></i>);
      } else {
        stars.push(<i className="gray-star" key={i}></i>);
      }
    }
    return stars;
  };
  return (
    <div className="list-item">
      <div className="left-item">
        <img className="item-img" src={picUrl} alt="" />
      </div>
      <div className="right-item">
        <div className="shop-name">{shopName}</div>
        <div className="item-desc ">
          <span className="item-sales">
            {renderStar()}
            {starScore}
            {"月售" + monthSalesTip}
          </span>
          <span className="item-delivery">
            {deliveryTimeTip} |{distance > 1000 ? renderKm() : distance + "m"}
          </span>
        </div>
        <div className="item-price">{minPriceTip}</div>
        <div className="item-recommend">
          {recommendInfo ? <span>大众点评高分店铺</span> : null}
        </div>
        <div className="item-discount">
          {discounts2 ? renderDiscount() : null}
        </div>
      </div>
    </div>
  );
};

export default ListItem;
