/**
 * @description Banner中的轮播组件
 */
import React, { useState, useEffect } from 'react';
import './ActivityList.scss';
import { Activity } from '../../../Models/foods';

interface IProps {
  activityList: Activity[];
}

const ActivityList: React.FC<IProps> = (props) => {
  const { activityList } = props;
  const [location, setLocation] = useState(0); //记录当前展示的轮播图位置
  const length = activityList.length;

  useEffect(() => {
    if (length !== 0) {
      const I = setInterval(() => {
        setLocation((location) => (location + 1) % length);
      }, 2500);
      return () => clearInterval(I);
    }
  }, [length, location]);

  const renderScrollInfo = () => {
    return activityList.map((item, index) => {
      const { actDesc, iconUrl } = item;
      return (
        <span
          className='activity-list__scroll'
          key={index}
          style={{
            transform: `translateY(-${location * 20}px)`,
            transition: 'all 300ms ease 0s',
          }}
        >
          <img className='activity-list__icon' src={iconUrl}></img>
          <span className='activity-list__info'>{actDesc}</span>
        </span>
      );
    });
  };
  return (
    <div className='activity-list'>
      <div className='activity-list__scroll-wrap'>{renderScrollInfo()}</div>
      <span className='activity-list__arrow'></span>
    </div>
  );
};

export default ActivityList;
