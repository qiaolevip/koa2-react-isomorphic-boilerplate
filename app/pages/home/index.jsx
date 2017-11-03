import React, { Component } from 'react';
import { connect } from 'react-redux';
import HotList from './hot-list';
import URL from '../../util/constants';
import ajax from '../../util/ajax-promise';

import {
  changeHomeScrollTop,
  updateFinanceRoll,
  changeHomeCurPage,
  changeHomeSelectedIndex,
  updateHotList,
  appendHotList,
  updateRecommendList,
  appendRecommendList,
  updateNewestList,
  appendNewestList,
  updateHomeAd,
  updateChestBox
} from '../../actions/indexapp';

import './home.styl';

class Index extends Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
  }

  getHotList(bool = true, page = 1, size = 20) {
    const { user, dispatch } = this.props;
    this.setState({loading: true});
    dispatch(changeHomeCurPage(page));
    ajax({
      url: URL.forumApi.javaApi.hotList,
      data: {
        pageNo: page,
        pageSize: size
      }
    }).then(res => {
      this.setState({loading: false, loadEnd: res.records && res.records.length === 0});
      bool
        ? dispatch(updateHotList(res.records))
        : dispatch(appendHotList(res.records));
    });
  }

  render() {
    let { indexHome = {} } = this.props;
    let { hotList = [] } = indexHome;

    return (
      <div className="social-index">
        <HotList listData={hotList} getData={this.getHotList.bind(this)} />
      </div>
    );
  }
}

export default connect((state) => {
  const indexApp = state.indexApp;
  return {
    user: state.user,
    unread: indexApp.unread,
    chestBox: indexApp.chestBox,
    activeIndex: indexApp.activeIndex,
    indexHome: indexApp.indexHome,
    indexMsg: indexApp.indexMsg,
    indexSection: indexApp.indexSection
  };
})(Index);
