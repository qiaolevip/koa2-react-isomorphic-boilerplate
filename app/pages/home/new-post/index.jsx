import React from 'react';
import './new-post.styl';
import newIcon from '../../../assets/images/home/new-icon.png';

export default () => {
  return (
    <div className="new-post">
      <a href="#/new-post">
       <img src={newIcon} />
       <span className="post-text">发帖</span>
      </a>
    </div>
  );
}