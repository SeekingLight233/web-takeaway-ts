/**
 * @description 评价
 */
import React, { useEffect } from 'react';
import './CommentTag.scss';
import { connect, ConnectedProps } from 'react-redux';
import { RootState } from '../../../Models';
import classNames from 'classnames';

const mapStateToProps = ({ commentList }: RootState) => ({
  commentLabels: commentList.commentLabels,
});

const connector = connect(mapStateToProps);
type ModelState = ConnectedProps<typeof connector>;

const CommentTag: React.FC<ModelState> = (props) => {
  const { dispatch, commentLabels } = props;

  useEffect(() => {
    dispatch({
      type: 'commentList/getCommentList',
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const renderLabels = () => {
    return commentLabels.map((item, index) => {
      const { content, isSelected } = item;
      return (
        <span
          key={index}
          className={classNames('comment-tag__wrap', {
            'comment-tag-active': isSelected === 1,
          })}
        >
          {content}
        </span>
      );
    });
  };

  return <div className='comment-tag'>{renderLabels()}</div>;
};

export default connect(mapStateToProps)(CommentTag);
