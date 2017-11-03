import React, {Component} from 'react';
import Avatar from '../../../components/avatar';
import './big-thread-item.styl';

import defaultImg from '../../../assets/images/home/default-thread-big-img.jpg';

export default ({item}) => {

  const onImgError= (e) => e.target.src = defaultImg

  return (
    <div className="big-thread-item">
      <a href={`#/view-thread/${item.tid}`}>
        <div className="thread-img">
          <img src={item.image} onError={onImgError} />
          <div className="img-mask"></div>
          <div className="thread-type">{item.type}</div>
          <div className="thread-title">{item.title}</div>
        </div>
        <div className="thread-info clearfix">
          <span className="info-reply">{item.replies}条回复</span>
          <span className="info-time">{item.lastpost_F}</span>
        </div>
        <div className="thread-reply">
          <div className="reply-author">
            <span className="reply-avatar">
              <Avatar image={item.avatar} />
            </span>
            <span className="reply-name">{item.reply.author}</span>
          </div>
          <div className="reply-cont">{item.reply.message}</div>
        </div>
      </a>
    </div>
  )
}
