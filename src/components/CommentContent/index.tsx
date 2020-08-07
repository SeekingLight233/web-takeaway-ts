/**
 * @description 评价
 */
import React from 'react';
import './CommentContent.scss';
import CommentTag from './CommentTag';

const CommentContent: React.FC = () => {
  return (
    <div className='comment-content'>
      <CommentTag></CommentTag>
    </div>
  );
};

export default CommentContent;
