/**
 * @description 评论列表
 */
import React, { useState, useEffect } from 'react';
import './CommentList.scss';
import { connect, ConnectedProps } from 'react-redux';
import { RootState } from '../../../Models';
import CommentItem from './CommentItem';
import LoadingCircle from '../../ScrollView/LoadingCircle';

const mapStateToProps = ({ commentList }: RootState) => ({
  list: commentList.list,
  loading: commentList.loading,
});

const connector = connect(mapStateToProps);
type ModelState = ConnectedProps<typeof connector>;

const CommentList: React.FC<ModelState> = (props) => {
  const { list, loading } = props;
  const [lazy, setLazy] = useState(loading);

  useEffect(() => {
    const I = setTimeout(() => {
      setLazy(loading);
    }, 200);
    return () => {
      clearTimeout(I);
    };
  }, [loading]);

  const renderList = () => {
    return list.map((item, index) => {
      return <CommentItem {...item} key={index}></CommentItem>;
    });
  };

  return (
    <div className='comment-list'>
      {lazy ? <LoadingCircle></LoadingCircle> : renderList()}
    </div>
  );
};

export default connect(mapStateToProps)(CommentList);
