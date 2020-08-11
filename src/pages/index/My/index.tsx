/**
 * @description 我的页面（伪数据）
 */
import React from 'react';
import './My.scss';

interface Item {
  icon: string;
  text: string;
}

const mockData: Array<Item> = [
  {
    icon: './static/img/01.png',
    text: '美团红包',
  },
  {
    icon: './static/img/02.png',
    text: '收货地址',
  },
  {
    icon: './static/img/03.png',
    text: '常见问题',
  },
  {
    icon: './static/img/04.png',
    text: '美团协议与说明',
  },
  {
    icon: './static/img/05.png',
    text: '退出登陆',
  },
];

const My: React.FC = () => {
  const renderMenu = () => {
    return mockData.map((item, index) => {
      const { icon, text } = item;

      return (
        <div key={index} className='page-my__items'>
          <img src={icon} className='page-my__items-img' />
          <p className='page-my__items-text'>{text}</p>
        </div>
      );
    });
  };

  return (
    <div className='page-my'>
      <div className='page-my__banner'>
        <div className='page-my__icon'></div>
        <p className='page-my__gid'>Gid23333333</p>
      </div>
      <div
        style={{
          backgroundColor: '#fff',
        }}
      >
        {renderMenu()}
      </div>
      <div className='page-my__tel-wrap'>
        <p>客服电话：10109777</p>
      </div>
      <div className='page-my__footer'>
        <p>服务时间：9:00-23:00</p>
      </div>
    </div>
  );
};

export default My;
