import React, { Component } from 'react';
import Icon from '../../../components/icon';
import Avatar from '../../../components/avatar';
import './thread-img-item.styl';

import defaultThreadImg from '../../../assets/images/home/default-thread-img.jpg';

export default ({item}) => {

  const onImgError = (e) => e.target.src = defaultThreadImg

  return (
    <div className="thread-img-item">
      <a href={`#/view-thread/${item.tid}`} className="item-wrap">
        <div className="thread-cont">
          <div className="thread-title">{item.subject}</div>
          <div className="thread-info clearfix">
            <span className="info-left">
              <span className="info-avatar">
                <Avatar image={item.avatar} />
              </span>
              <span className="info-author">{item.author}</span>
              <span className="info-time">{item.lastpost}</span>
            </span>
            <span className="info-right">
              <span className="info-wrap">
                <Icon type="browse" />
                <span className="num">{item.views}</span>
              </span>
              <span className="info-wrap">
                <Icon type="comment" />
                <span className="num">{item.replies}</span>
              </span>
            </span>
          </div>
        </div>
        <div className="thread-img"><img src={item.image} onError={onImgError} /></div>

      </a>
    </div>
  );
};
