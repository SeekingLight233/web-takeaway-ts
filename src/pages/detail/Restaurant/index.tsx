import React from 'react';
import LeftBar from '../../../components/LeftBar';
import RightFoodList from '../../../components/RightFoodList';

const Restaurant: React.FC = () => {
  return (
    <div>
      <LeftBar></LeftBar>
      <RightFoodList></RightFoodList>
    </div>
  );
};

export default Restaurant;
