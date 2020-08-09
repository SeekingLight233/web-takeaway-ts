/**
 * @description 单个评论组件
 */
import React from 'react';
import './CommentItem.scss';
import { IComment } from '../../../../Models/comment';

const CommentItem: React.FC<IComment> = (props) => {
  const {
    userName,
    userPicUrl,
    commentTime,
    deliveryTime,
    content,
    praiseDish,
    pictures,
    label,
  } = props;

  const renderPictures = () => {
    return pictures.map(({ smallPicUrl }, index) => {
      return (
        <img className='comment-item__pic' key={index} src={smallPicUrl}></img>
      );
    });
  };

  return (
    <div className='comment-item clearfix'>
      <div className='comment-item__left'>
        <img
          src={
            userPicUrl === ''
              ? 'https://s3plus.sankuai.com/v1/mss_00c90c47614241978d32cca9bc6e44a4/h5i/userpic_defalut.c741e924.png'
              : userPicUrl
          }
          alt=''
          style={{
            width: '40px',
            height: '40px',
            borderRadius: '50%',
          }}
        />
      </div>
      <div className='comment-item__right'>
        <div className='comment-item__top'>
          <span className='comment-item__username'>{userName}</span>
          <span className='comment-item__time'>{commentTime}</span>
        </div>
        <div className='comment-item__deliver-time'>{deliveryTime}</div>
        <div className='comment-item__main'>{content}</div>
        <div className='comment-item__pic-list'>{renderPictures()}</div>
        <div className='comment-item__praise'>
          <div className='comment-item__praise-icon'></div>
          <span className='comment-item__praise-dish'>{praiseDish}</span>
        </div>
        {label === '' ? null : (
          <div className='comment-item__tag'>
            <div className='comment-item__tag-icon'></div>
            <span className='comment-item__tag-praise'>{label}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default CommentItem;
