import React from 'react';
import BottomBar from '../../../components/BottomBar';
import { Route, HashRouter, Redirect } from 'react-router-dom';
import Restaurant from '../Restaurant';
import Banner from '../../../components/Banner';

const Index: React.FC = () => {
  return (
    <div className='index'>
      <Banner></Banner>
      <HashRouter>
        <Redirect to='/restaurant' from='/' />
        <Route path='/restaurant' component={Restaurant} />
        {/* <Route path='/order' component={Order} /> */}
      </HashRouter>
    </div>
  );
};

export default Index;
