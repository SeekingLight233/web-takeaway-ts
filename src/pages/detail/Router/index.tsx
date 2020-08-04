import React, { useState } from 'react';
import BottomBar from '../../../components/BottomBar';
import { Route, HashRouter, Redirect } from 'react-router-dom';
import Restaurant from '../Restaurant';
import Comment from '../Comment';
import ShopInfo from '../ShopInfo';
import Banner from '../../../components/Banner';
import TabBar from '../../../components/TabBar';
import { useScroll } from '../../../utils/hooks';

export const Context = React.createContext(false);

const Index: React.FC = () => {
  // 滚动吸顶
  const [sticky, setSticky] = useState(false);
  useScroll(setSticky, 128);
  return (
    <Context.Provider value={sticky}>
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
    </Context.Provider>
  );
};

export default Index;
