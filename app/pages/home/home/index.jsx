import React, { Component } from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';
import ajax from '../../util/ajax-promise';
import jAjax from '../../util/ajax-promise-java';
import { TabSwitch, TabCont }  from '../common/tabswitch.jsx';
import HomeNav from './homenav.jsx';
import superUtil from '../../util/superUtil';
import URL from '../../util/constants';
import HomeList from './homelist.jsx';
import HotList from './hotlist.jsx';
import PullUpLoading from '../common/pulluploading';
import Mask from '../common/mask.jsx';
import ChestInfo from './chestinfo';
import ChestPop from '../../activity/chest/chestpop.jsx';

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

import '../../../stylus/index-home';

import throttle from 'lodash.throttle';

// const HomeTabSwitch = getTabSwitch(HomeNav);

const displayName = "home";

class Home extends Component {

  constructor(props) {
    super(props);
    this.state = {
      navFixed: false,
      loading: false,
      loadEnd: false,
      showAd: false,
      adUrl: '',
      // adImg: 'https://forum-alpha.dianrong.com/images/c20628ce.main-top-bg.jpg'
      adImg: '',
      showChestPop: false,
      chestOpened: false,
      prizeList: []
    };
    this.height = 0;
    const { scrollTop, selectedIndex, curPage } = props.indexHome;
    this.scrollTop = scrollTop;
    this.defaultIndex = selectedIndex;
    this.curPage = curPage;
    this.rap = null;
  }

  componentDidMount() {

    const { scrollTop } = this.props.indexHome;

    this.getAdInfo();

    // if (this.mapListWithIndex(this.defaultIndex).length === 0) {
    //   this.getListByIndex(false, this.defaultIndex);
    // }

    this.bindScroll();

    setTimeout(() => {
      superUtil.setScrollTop(this.props.indexHome.scrollTop);
    }, 0);
  }

  mapListWithIndex(index) {
    const { recommendList, newestList } = this.props.indexHome;
    switch(index) {
      case 0:
        return recommendList;
      case 1:
        return newestList;
      default:
        return [];
    }
  }

  bindScroll() {
    if (!window.onscroll) {
      // window.onscroll = throttle(this.onScroll.bind(this), 100) ;
      window.onscroll = this.onScroll.bind(this);
    }
  }

  unbindScroll() {
    window.onscroll = null;
  }

  getAdInfo() {
    jAjax({
      url: URL.forumApi.chest.getAdInfo,
    }).then((res) => {
      console.log('ad res ', res);
      if (res.status != 500) {
        // 第一次访问
        this.setState({
          showAd: true,
          adUrl: res.activityUrl,
          adImg: res.image
        });
      } else {
        // 异常
        // do nothing
      }

    });
  }

  // getFinanceRoll() {
  //   ajax({
  //     url: URL.forumApi.financeRoll,
  //   }).then((res) => {
  //     if (res.status == '200') {
  //       this.props.dispatch(updateFinanceRoll(res.data));
  //     }
  //   });
  // }

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

  getRecommendList(bool = true, page = 1, size = 20) {
    const { user, dispatch } = this.props;
    this.setState({loading: true});
    dispatch(changeHomeCurPage(page));
    ajax({
      url: URL.forumApi.recommend,
      data: {
        page: page,
        size: size,
        loginUid: user.loginUid
      }
    }).then(res => {
      this.setState({loading: false});
      if (res.status == '200') {
        this.setState({loadEnd: res.data && res.data.length === 0});
        bool
          ? dispatch(updateRecommendList(res.data))
          : dispatch(appendRecommendList(res.data));
      }
    });
  }

  getNewestList(bool = true, page = 1, size = 20) {
    const { user, dispatch } = this.props;
    this.setState({loading: true});
    dispatch(changeHomeCurPage(page));
    ajax({
      url: URL.forumApi.newest,
      data: {
        page: page,
        size: size
      }
    }).then(res => {
      this.setState({loading: false});
      if (res.status == '200') {
        this.setState({loadEnd: res.data && res.data.length === 0});
        bool
          ? dispatch(updateNewestList(res.data))
          : dispatch(appendNewestList(res.data));
      }
    });
  }

  getListByIndex(bool, index, page = 1) {
    switch(index) {
      case 0:
        return this.getHotList(bool, page);
      case 1:
        return this.getRecommendList(bool, page);
      case 2:
        return this.getNewestList(bool, page);
      default:
        return null;
    }
  }

  onShowAd() {
    this.setState((preState) => ({
      showAd: !preState.showAd
    }));
  }

  onChange(index, tab) {
    const { dispatch } = this.props;
    dispatch(changeHomeSelectedIndex(index)); // reset cur page
    dispatch(changeHomeCurPage(1)); // reset cur page
    this.curPage = 1;
    // this.resetListByIndex(index);
    if (this.scrollTop >= this.height) {
      // setTimeout(() => {
      superUtil.setScrollTop(this.height); // 切换tab的时候确保列表是在第一页显示
      // }, 0);
    }
    // this.getListByIndex(true, index);
    if (this.state.loading) {
      this.setState({loading: false});
    }
  }

  onShow() {
    this.bindScroll();

    setTimeout(() => {
      superUtil.setScrollTop(this.props.indexHome.scrollTop);
    }, 0);
  }

  onHide() {
    this.unbindScroll();
    this.props.dispatch(changeHomeScrollTop(this.scrollTop));
  }

  onScroll() {
    this.scrollTop = superUtil.getScrollTop();
    let { clientHeight, scrollHeight } = document.documentElement;
    let { loading, loadEnd } = this.state;
    const {selectedIndex} = this.props.indexHome
    this.setState({
      // navFixed: this.scrollTop >= this.height
      // navFixed: this.scrollTop > this.height
      navFixed: this.scrollTop > 0
    });
    if (this.scrollTop + clientHeight >= scrollHeight && !loading && !loadEnd) {
      this.getListByIndex(false, selectedIndex, ++this.curPage);
    }
  }

  componentWillUnmount() {
    this.unbindScroll();
    this.props.dispatch(changeHomeScrollTop(this.scrollTop));
  }

  openChest() {
    const { chestBox, dispatch, user } = this.props;
    return jAjax({
      url: URL.forumApi.chest.openChest,
      data: {
        chestRecordId: chestBox.chestArr[0].id
      }
    }).then(res => {
      // open chest box
      if (res.status != '500') {
        this.setState({
          prizeList: res,
          showChestPop: true,
          chestOpened: true
        });
        dispatch(updateChestBox(user.loginUid));
      } else {
        // 异常
      }
    });
    // this.setState({
    //   showChestPop: true,
    //   chestOpened: true
    // });
  }

  onToggleMenu() {
    this.setState((preState) => ({
      showChestPop: !preState.showChestPop
    }));
  }

  render() {
    const { user, indexHome, children, chestBox, ...others } = this.props;
    const { hotList, recommendList, newestList,
      sectionData, curPage, selectedIndex } = indexHome;
    let { navFixed, loading, loadEnd, showAd, adUrl, adImg, showChestPop } = this.state;
    const classes = classnames('index-home',
      {fixed: navFixed && this.scrollTop >= this.height},
      {'inapp' : superUtil.isInApp}
    );
    return (
      <TabCont className={classes} {...others} >

        {
          chestBox.chestNum > 0
            ? <ChestInfo openChest={this.openChest.bind(this)} chestNum={chestBox.chestNum} chestOpened={this.state.chestOpened} />
            : null
        }


        {/*<div className="hidden-div" style={{display: navFixed ? 'block' : 'none'}}></div>*/}
        <div className="home-cont">
          <TabSwitch onChange={this.onChange.bind(this)}
                     activeIndex={selectedIndex} >
            <HomeNav />
            <div className="tab-conts">

              <HotList listData={hotList} getData={this.getHotList.bind(this)} />

              <HomeList listData={recommendList} getData={this.getRecommendList.bind(this)} />

              <HomeList listData={newestList} getData={this.getNewestList.bind(this)} refresh={true} />

            </div>
          </TabSwitch>
          {
            loading ? <PullUpLoading /> : null
          }
        </div>

        {
          showChestPop
            ? (
            <Mask className="chest-mask">
              <ChestPop prizeList={this.state.prizeList} onClosePop={this.onToggleMenu.bind(this)} />
            </Mask>
          )
            : null
        }

        {
          showAd
            ? (
            <div className="ad-show">
              <Mask className="ad-mask"></Mask>
              <div className="ad-wrap">
                <div className="ad-close-btn" onClick={this.onShowAd.bind(this)}></div>
                <div className="ad-img ad-ani">
                  <a href={adUrl}>
                    <img src={adImg} />
                  </a>
                </div>
              </div>
            </div>
          )
            : null
        }

      </TabCont>
    );
  }
}

export default Home;
