/**
 * @description 单个订单项
 */
import React from "react";
import "./OrderItem.scss";
import "../common.scss";
import { IOrder } from "../../Models/order";

const OrderItem: React.FC<IOrder> = (props) => {
  const { shopName, img, productList, orderTime, totalPrice } = props;

  const renderOrder = () => {
    return productList.map((item, index) => {
      const { productName, productCount } = item;
      return (
        <div key={index}>
          <span>{productName}</span>
          <span className="count">x{productCount}</span>
        </div>
      );
    });
  };

  return (
    <div className="order-item">
      <div className="header-item">
        <div className="icon">
          <img src={img}></img>
        </div>
        <div className="header">
          <p className="text">{shopName}</p>
        </div>
      </div>

      <div className="details-items">
        <div>{renderOrder()}</div>
        <div className="time-wrap">
          {orderTime}
          <span className="total-price">实付￥{totalPrice}</span>
        </div>
      </div>
      <p className="footer-item ">
        <span className="text">订单已完成</span>
        <span className="buttons">
          <span className="delete">删除</span>
          <span className="re-order">再来一单</span>
        </span>
      </p>
    </div>
  );
};

export default OrderItem;
