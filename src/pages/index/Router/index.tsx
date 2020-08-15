import React, { lazy, Suspense } from 'react';
import BottomBar from '../../../components/BottomBar';
import Home from '../Home';
import { Route, HashRouter, Redirect } from 'react-router-dom';
import Order from '../Order';
import My from '../My';
import LoadingCircle from '../../../components/ScrollView/LoadingCircle';
import Loading from '../../../components/ScrollView/Loading';
// const Order = lazy(() => import('../Order/index'));

const Index: React.FC = () => {
  return (
    <div className='index'>
      <HashRouter>
        <Redirect to='/home' from='/' />
        <Route
          path='/home'
          component={() => {
            return <Home></Home>;
          }}
        />
        <Route path='/order' component={Order} />
        <Route path='/my' component={My} />
      </HashRouter>
      <BottomBar></BottomBar>
    </div>
  );
};

export default Index;
