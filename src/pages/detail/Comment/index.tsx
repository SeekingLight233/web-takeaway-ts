import React from 'react';
import Scoring from '../../../components/Scoring';
import CommentContent from '../../../components/CommentContent';

const Comment: React.FC = () => {
  return (
    <div>
      <Scoring></Scoring>
      <CommentContent></CommentContent>
    </div>
  );
};

export default Comment;
