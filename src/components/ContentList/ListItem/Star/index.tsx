/**
 * @description 主页上的头部组件
 */
import React from 'react';
import './Star.scss';

interface IProps {
  starScore: number;
}

const Star: React.FC<IProps> = (props) => {
  const { starScore } = props;
  /**
   * @description 渲染那几颗小星星~~
   */
  const renderStar = () => {
    const stars = [];
    const int_part = Math.floor(starScore);
    const float_part = (starScore - int_part).toFixed(1);
    const scoreArr = [];
    for (let i = 0; i < 5; i++) {
      if (i < int_part) {
        scoreArr.push(1);
      } else if (i === int_part) {
        scoreArr.push(float_part);
      } else {
        scoreArr.push(0);
      }
    }
    // [1, 1, 1, 1, "0.6"]

    for (let i = 0; i < scoreArr.length; i++) {
      if (scoreArr[i] === 1) {
        stars.push(<i className='yellow-star' key={i}></i>);
      } else if (scoreArr[i] < 1) {
        stars.push(<i className='yellow-star half-star' key={i}></i>);
      } else {
        stars.push(<i className='yellow-star gray-star' key={i}></i>);
      }
    }
    return stars;
  };
  return <span className='star clearfix'>{renderStar()}</span>;
};

export default Star;
