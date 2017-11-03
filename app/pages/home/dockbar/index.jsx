import React , {Component} from 'react';
import { Tabs, Tab } from '../../../components/tabs';
import './dockbar.styl';

export default (props) => {

  const getMsgNumView = (num) => {
    if (num > 0) {
      return num < 10
              ? <div className="msg-num single">{num}</div> 
              : <div className="msg-num double">{num < 100 ? num : '···'}</div>
    } else {
      return null;
    }
  };

  const { unread, chestNum, ...others } = props;

  return (
    <Tabs className="home-tabs" {...others}>
      <Tab>
        <div className="tab tab-home">
          <div className="tab-icon"></div>
          <div className="tab-name">社区</div>
        </div>
      </Tab>
      <Tab>
        <div className="tab tab-section">
          <div className="tab-icon"></div>
          <div className="tab-name">分类</div>
        </div>
      </Tab>
      <Tab>
        <div className=" tab tab-msg">
          <div className="tab-icon">
            { 
              getMsgNumView(unread.newsNum) 
            }
            {
              unread.newsNum <= 0 && unread.systemNum > 0
              ? <div className="have-msg"></div>
              : null
            }
            
          </div>
          <div className="tab-name">消息</div>
        </div>
      </Tab>
      <Tab>
        <div className="tab tab-more">
          <div className="tab-icon">
            {
              chestNum > 0
                ? <div className="have-msg"></div>
                : null
            }
          </div>
          <div className="tab-name">更多</div>
        </div>
      </Tab>
    </Tabs>
  );
}