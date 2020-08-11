import React from 'react';
import BottomBar from '../../../components/BottomBar';
import Home from '../Home';
import { Route, HashRouter, Redirect } from 'react-router-dom';
import Order from '../Order';
import My from '../My';

const Index: React.FC = () => {
  return (
    <div className='index'>
      <HashRouter>
        <Redirect to='/home' from='/' />
        <Route path='/home' component={Home} />
        <Route path='/order' component={Order} />
        <Route path='/my' component={My} />
      </HashRouter>
      <BottomBar></BottomBar>
    </div>
  );
};

export default Index;
