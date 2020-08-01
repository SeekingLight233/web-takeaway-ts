/**
 * @description 主页上的头部组件
 */
import React from 'react';
import './SearchBar.scss';

const SearchBar: React.FC = () => {
  return (
    <div className='search-bar'>
      <div className='search-bar-wrap'>
        <div className='search-left'>
          <span className='search-text'>二七广场</span>
        </div>
        <div className='search-right'>
          <i className='zoom-scope'></i>
          <input placeholder='请输入商家或商品名称' />
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
