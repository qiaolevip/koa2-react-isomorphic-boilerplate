import React, { Component } from 'react';
import Icon from '../../../components/icon';
import Avatar from '../../../components/avatar';
import './hot-thread-item.styl';

export default ({item}) => {

  return (
    <div className="hot-thread-item">
      <a href={`#/view-thread/${item.tid}`} className="item-wrap">
        <div className="item-author">
          <span className="info-avatar">
            <Avatar image={item.image} />
          </span>
          <span className="info-name">{item.userName}</span>
        </div>
        <p className="item-title">{item.subject}</p>
        {/*<div className="item-cont" dangerouslySetInnerHTML={{__html: XBBCODE.processBBSCode(item.message)}}></div>*/}
        <div className="item-cont">{item.message.replace(/\[[^\]]+\]/g, '').replace(/\s+/g,"")}</div>
        <div className="item-bot">
          <span className="info-sec">{item.forumName}</span>
          <span className="info-wrap">
            <Icon type="browse" />
            <span className="num">{item.views}</span>
          </span>
          <span className="info-wrap">
            <Icon type="comment" />
            <span className="num">{item.replys}</span>
          </span>
        </div>
      </a>
    </div>
  );
};
