/**
 * @description 评价
 */
import React, { useEffect, useState, useRef } from 'react';
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

  const [flag, setFlag] = useState(true); // 模拟请求用的外部参数

  const fetchData = (init?: boolean) => {
    dispatch({
      type: 'commentList/getCommentList',
      payload: {
        flag,
        init,
      },
    });
  };

  useEffect(() => {
    fetchData(flag);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [flag]);

  const changeTab = (index: number) => {
    setFlag(!flag);
    dispatch({
      type: 'commentList/setActive',
      payload: {
        index,
      },
    });
    fetchData();
  };

  const renderLabels = () => {
    return commentLabels.map((item, index) => {
      const { content, isSelected } = item;
      return (
        <span
          key={index}
          className={classNames('comment-tag__wrap', {
            'comment-tag-active': isSelected === 1,
          })}
          onClick={() => {
            changeTab(index);
          }}
        >
          {content}
        </span>
      );
    });
  };

  return <div className='comment-tag'>{renderLabels()}</div>;
};

export default connect(mapStateToProps)(CommentTag);
