/**
 * @description 评价页面中的顶部评分
 */
import React from 'react';
import './Scoring.scss';
import { connect, ConnectedProps } from 'react-redux';
import { RootState } from '../../Models';
import Star from '../ContentList/ListItem/Star';

const mapStateToProps = ({ foodList }: RootState) => ({
  shopInfo: foodList.shopInfo,
});

const connector = connect(mapStateToProps);
type ModelState = ConnectedProps<typeof connector>;

const Scoring: React.FC<ModelState> = (props) => {
  const { shopInfo } = props;
  return (
    <div className='scoring'>
      <div className='scoring__left'>
        <div className='scoring__left-number'>{shopInfo.resScore}</div>
        <div className='scoring__left-text'>商家评分</div>
      </div>
      <div className='scoring__middle'>
        <div className='scoring__middle-top'>
          <div className='scoring__middle-top-text'>口味</div>
          <Star starScore={4.7}></Star>
          <div className='scoring__middle-top-number'>{shopInfo.foodScore}</div>
        </div>
        <div className='scoring__middle-bottom'>
          <div className='scoring__middle-bottom-text'>包装</div>
          <Star starScore={4.8}></Star>
          <div className='scoring__middle-bottom-number'>
            {shopInfo.packetScore}
          </div>
        </div>
      </div>
      <div className='scoring__right'>
        <div className='scoring__right-number'>{shopInfo.foodScore}</div>
        <div className='scoring__right-text'>配送评分</div>
      </div>
    </div>
  );
};

export default connect(mapStateToProps)(Scoring);
