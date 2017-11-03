import React, { Component } from 'react';
import Icon from '../../../components/icon';
import Avatar from '../../../components/avatar';
import './thread-item.styl';

export default ({item}) => {
  return (
    <div className="thread-item">
      <a href={`#/view-thread/${item.tid}`} className="item-wrap">
        <div className="thread-section">{item.name}</div>
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
      </a>
    </div>
  );
};