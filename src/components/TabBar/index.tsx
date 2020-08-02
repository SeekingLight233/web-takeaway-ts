/**
 * @description 商家中的TabBar
 */
import { HashRouter, NavLink, Route } from 'react-router-dom';
import React from 'react';
import './TabBar.scss';

const TabBar: React.FC = (props) => {
  return (
    <div className='tab-bar'>
      <HashRouter>
        <nav className='tab-bar__nav'>
          <NavLink
            to='/restaurant'
            className='tab-bar__link'
            activeClassName='active'
          >
            <span className='text'>点菜</span>
          </NavLink>
          <NavLink
            to='/comment'
            className='tab-bar__link'
            activeClassName='active'
          >
            <span className='text'>评价</span>
          </NavLink>
          <NavLink
            to='/shopinfo'
            className='tab-bar__link'
            activeClassName='active'
          >
            <span className='text'>商家</span>
          </NavLink>
        </nav>
      </HashRouter>
    </div>
  );
};

export default TabBar;
