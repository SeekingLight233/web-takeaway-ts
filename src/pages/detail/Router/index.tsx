import React from 'react';
import BottomBar from '../../../components/BottomBar';
import { Route, HashRouter, Redirect } from 'react-router-dom';
import Restaurant from '../Restaurant';
import Comment from '../Comment';
import ShopInfo from '../ShopInfo';
import Banner from '../../../components/Banner';
import TabBar from '../../../components/TabBar';

const Index: React.FC = () => {
  return (
    <div className='index'>
      <Banner></Banner>
      <TabBar></TabBar>
      <HashRouter>
        <Redirect to='/restaurant' from='/' />
        <Route path='/restaurant' component={Restaurant} />
        <Route path='/comment' component={Comment} />
        <Route path='/shopinfo' component={ShopInfo} />
      </HashRouter>
    </div>
  );
};

export default Index;
