import React from 'react';
import LeftBar from '../../../components/LeftBar';
import RightFoodList from '../../../components/RightFoodList';
import Cart from '../../../components/Cart';

const Restaurant: React.FC = () => {
  return (
    <div>
      <LeftBar></LeftBar>
      <RightFoodList></RightFoodList>
      <Cart></Cart>
    </div>
  );
};

export default Restaurant;
