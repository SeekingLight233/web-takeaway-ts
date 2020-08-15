/**
 * @description 主页上的头部组件
 */
import React, { useEffect, useState } from 'react';
import './Order.scss';
import { RootState } from '../../../Models';
import { connect, ConnectedProps } from 'react-redux';
import OrderItem from '../../../components/OrderItem';
import ScrollView from '../../../components/ScrollView';
import Loading from '../../../components/ScrollView/Loading';

const mapStateToProps = ({ orderList }: RootState) => ({
  items: orderList.items,
});

const connector = connect(mapStateToProps);
type ModelState = ConnectedProps<typeof connector>;

const Order: React.FC<ModelState> = (props) => {
  const { dispatch, items } = props;
  const [page, setPage] = useState(0);
  const [end, setEnd] = useState(false);

  /**
   * @description 请求数据
   */
  const fetchData = () => {
    dispatch({
      type: 'orderList/getOrderList',
    });
  };

  useEffect(() => {
    // if (page < 10) {
    fetchData();
    // } else {
    //   setEnd(true);
    // }
  }, [page]);

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

  return (
    <div className='order-page'>
      {/* <ScrollView
        isEnd={end}
        loadCallBack={() => {
          setPage((page) => page + 1);
        }}
      > */}
      {renderOrderList()}
      {/* </ScrollView> */}
    </div>
  );
};

export default connect(mapStateToProps)(Order);
