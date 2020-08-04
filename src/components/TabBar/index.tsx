/**
 * @description 商家中的TabBar
 */
import { HashRouter, NavLink, Route } from 'react-router-dom';
import React, { useContext } from 'react';
import './TabBar.scss';
import { Context } from '../../pages/detail/Router';
import classNames from 'classnames';

const TabBar: React.FC = (props) => {
  const sticky = useContext(Context);

  return (
    <div className={classNames('tab-bar', { 'tab-sticky': sticky })}>
      <HashRouter>
        <nav className={classNames('tab-bar__nav', { 'nav-sticky': sticky })}>
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
