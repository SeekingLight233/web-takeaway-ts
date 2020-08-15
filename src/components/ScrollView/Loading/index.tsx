/**
 * @description 加载时旋转的小圆圈
 */
import React from 'react';
import './Loading.scss';

const Loading: React.FC = (props) => {
  return (
    <div className='loading'>
      <div className='loading__wrap'>
        <div className='loading__loading-img'></div>
      </div>
    </div>
  );
};

export default Loading;
