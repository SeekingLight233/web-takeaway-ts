/**
 * @description 评价
 */
import React from 'react';
import './CommentContent.scss';
import CommentTag from './CommentTag';
import CommentList from './CommentList';

const CommentContent: React.FC = () => {
  return (
    <div className='comment-content'>
      <CommentTag></CommentTag>
      <CommentList></CommentList>
    </div>
  );
};

export default CommentContent;
