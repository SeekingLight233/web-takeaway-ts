/**
 * @description 商家详情中的LeftBar
 */
import React, { useState, useEffect, useContext } from 'react';
import './LeftBar.scss';
import { connect, ConnectedProps } from 'react-redux';
import { RootState } from '../../Models';
import classNames from 'classnames';
import { Context } from '../../pages/detail/Router';
const mapStateToProps = ({ foodList }: RootState) => ({
  categoryList: foodList.categoryList,
  activeLeftTag: foodList.activeLeftTag,
});

const connector = connect(mapStateToProps);
type ModelState = ConnectedProps<typeof connector>;

const LeftBar: React.FC<ModelState> = (props) => {
  const { categoryList, dispatch, activeLeftTag } = props;
  const sticky = useContext(Context);
  /**
   * @description 更改leftBar的点击状态
   */
  const changeActive = (activeLeftTag) => {
    dispatch({
      type: 'foodList/setActive',
      payload: activeLeftTag,
    });
  };

  const renderCategoryList = () => {
    return categoryList.map((item, index) => {
      const { categoryName, iconUrl } = item;
      return (
        <a
          className={classNames('left-bar__nav', {
            active: categoryName === activeLeftTag,
          })}
          key={index}
          onClick={() => {
            changeActive(categoryName);
          }}
        >
          <div className='left-bar__item-wrap'>
            <span className='left-bar__item'>
              {iconUrl ? (
                <img className='left-bar__icon' src={iconUrl}></img>
              ) : null}
              {categoryName}
            </span>
          </div>
        </a>
      );
    });
  };
  return (
    <nav className={classNames('left-bar', { sticky })}>
      {renderCategoryList()}
    </nav>
  );
};

export default connect(mapStateToProps)(LeftBar);
