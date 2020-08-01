/**
 * @description 主页上的头部组件
 */
import React, { useEffect } from 'react';
import './Order.scss';
import { RootState } from '../../../Models';
import { connect, ConnectedProps } from 'react-redux';
import OrderItem from '../../../components/OrderItem';

const mapStateToProps = ({ orderList }: RootState) => ({
  items: orderList.items,
});

const connector = connect(mapStateToProps);
type ModelState = ConnectedProps<typeof connector>;

const Order: React.FC<ModelState> = (props) => {
  const { dispatch, items } = props;

  /**
   * @description 请求数据
   */
  const fetchData = () => {
    dispatch({
      type: 'orderList/getOrderList',
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const renderOrderList = () => {
    return items.map((item, index) => {
      const { shopName } = item;
      return (
        <OrderItem {...item} key={index}>
          {shopName}{' '}
        </OrderItem>
      );
    });
  };

  return <div className='order'>{renderOrderList()}</div>;
};

export default connect(mapStateToProps)(Order);
