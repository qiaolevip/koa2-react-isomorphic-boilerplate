import { combineReducers } from 'redux';
import ActionType from '../actions/actionType.js';

const INDEX_HOME_STATE = {
  selectedIndex: 1,
  scrollTop: 0,
  curPage: 1,
  financeRoll: [],
  hotList: [], // 热度列表
  recommendList: [],
  newestList: [],
  sectionData: {},
  showAd: true
};

const INDEX_MSG_STATE = {
  selectedIndex: 0, 
  scrollTop: 0,
  curPage: 1,
  commentList: [],
  postList: [],
  privateList: []
};

const INDEX_SECTION_STATE = {
  selectedIndex: 0, 
  scrollTop: 0,
  curPage: 1,
  threadList: []
};

const UNREAD = {
  total: 0,
  noticeUnread: 0,
  pmUnread: 0,
  postUnread: 0,
  commentUnread: 0,
  quoteUnread: 0,
  sysUnread: 0
};

const CHEST_BOX = {
  chestNum: 0, // 宝箱数量，more是否显示原点
  chestArr: []
};

const unread = (state = UNREAD, action) => {
  if (action.type === ActionType.UPDATE_UNREAD_INFO) {
    let { pmUnread, postUnread, noticeUnread } = action.value;
    return Object.assign({}, state, {
      // total: parseInt(pmUnread) + parseInt(postUnread),
      // noticeUnread: parseInt(noticeUnread),
      pmUnread: parseInt(pmUnread),
      // postUnread: parseInt(postUnread)
    });
  } else if (action.type === ActionType.UPDATE_COMMENT_UNREAD) {
    return Object.assign({}, state, {
      commentUnread: parseInt(action.value)
    });
  } else if (action.type === ActionType.UPDATE_QUOTE_UNREAD) {
    return Object.assign({}, state, {
      quoteUnread: parseInt(action.value)
    });
  } else if (action.type === ActionType.UPDATE_SYS_UNREAD) {
    return Object.assign({}, state, {
      sysUnread: parseInt(action.value)
    });
  } else {
    return state;
  }
}

const chestBox = (state = CHEST_BOX, action) => {
  if (action.type === ActionType.UPDATE_CHEST_INFO) {
    let { totalRecord, records } = action.value;
    return Object.assign({}, state, {
      chestNum: totalRecord,
      chestArr: records,
    });
  } else {
    return state;
  }
}

const activeIndex = (state = 0, action) => {
  if (action.type ===  ActionType.CHANGE_ACTIVE_INDEX) {
    return action.value;
  } else {
    return state;
  }
};

const indexSection = (state = INDEX_SECTION_STATE, action) => {
  switch(action.type) {
    case ActionType.CHANGE_SECTION_SELECTED_INDEX:
      return Object.assign({}, state, {selectedIndex: action.value});
    case ActionType.CHANGE_SECTION_SCROLL_TOP:
      return Object.assign({}, state, {scrollTop: action.value});
    case ActionType.CHANGE_SECTION_CUR_PAGE:
      return Object.assign({}, state, {curPage: action.value});
    case ActionType.UPDATE_SECTION_THREAD_LIST:
      return Object.assign({}, state, {threadList: action.value});
    case ActionType.APPEND_SECTION_THREAD_LIST:
      return Object.assign({}, state, {threadList: state.threadList.concat(action.value)});
    default: 
      return state;
  }
};

const indexMsg = (state = INDEX_MSG_STATE, action) => {
  switch(action.type) {
    case ActionType.CHANGE_MSG_SELECTED_INDEX:
      return Object.assign({}, state, {selectedIndex: action.value});
    case ActionType.CHANGE_MSG_SCROLL_TOP:
      return Object.assign({}, state, {scrollTop: action.value});
    case ActionType.CHANGE_MSG_CUR_PAGE:
      return Object.assign({}, state, {curPage: action.value});
    case ActionType.UPDATE_MSG_COMMENT_LIST:
      return Object.assign({}, state, {commentList: action.value});
    case ActionType.APPEND_MSG_COMMENT_LIST:
      return Object.assign({}, state, {commentList: state.commentList.concat(action.value)});
    case ActionType.UPDATE_MSG_POST_LIST:
      return Object.assign({}, state, {postList: action.value});
    case ActionType.APPEND_MSG_POST_LIST:
      return Object.assign({}, state, {postList: state.postList.concat(action.value)});
    case ActionType.UPDATE_MSG_PRIVATE_LIST:
      return Object.assign({}, state, {privateList: action.value});
    case ActionType.APPEND_MSG_PRIVATE_LIST:
      return Object.assign({}, state, {privateList: state.privateList.concat(action.value)});
    default: 
      return state;
  }
};

const indexHome = (state = INDEX_HOME_STATE, action) => {
  switch(action.type) {
    case ActionType.CHANGE_HOME_SELECTED_INDEX:
      return Object.assign({}, state, {selectedIndex: action.value});
    case ActionType.CHANGE_HOME_SCROLL_TOP:
      return Object.assign({}, state, {scrollTop: action.value});
    case ActionType.CHANGE_HOME_CUR_PAGE:
      return Object.assign({}, state, {curPage: action.value});
    case ActionType.UPDATE_FINANCE_ROLL:
      return Object.assign({}, state, {financeRoll: action.value});
    case ActionType.UPDATE_HOT_LIST:
      return Object.assign({}, state, {hotList: action.value});
    case ActionType.APPEND_HOT_LIST:
      return Object.assign({}, state, {hotList: state.hotList.concat(action.value)});
    case ActionType.UPDATE_RECOMMEND_LIST:
      return Object.assign({}, state, {recommendList: action.value});
    case ActionType.APPEND_RECOMMEND_LIST:
      return Object.assign({}, state, {recommendList: state.recommendList.concat(action.value)});
    case ActionType.UPDATE_NEWEST_LIST:
      return Object.assign({}, state, {newestList: action.value});
    case ActionType.APPEND_NEWEST_LIST:
      return Object.assign({}, state, {newestList: state.newestList.concat(action.value)});
    case ActionType.UPDATE_SECTION_DATA:
      return Object.assign({}, state, {sectionData: action.value});
    case ActionType.UPDATE_HOME_AD_INFO:
      return Object.assign({}, state, {showAd: action.value});
    default: 
      return state;
  }
}

const indexApp = combineReducers({
  unread,
  chestBox,
  activeIndex,
  indexHome,
  indexMsg,
  indexSection
});

export default indexApp;
