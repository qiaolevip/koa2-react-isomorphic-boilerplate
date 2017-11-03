import ActionType from './actionType';
import {actionCreator} from './actioncreator';
import ajax from '../util/ajax-promise';
import jAjax from '../util/ajax-promise-java';
import URL from '../util/constants';

export const updateUnread = (loginUid) => {
  return (dispatch) => {
    return ajax({
      url: URL.forumApi.message.unread,
      data: {
        loginUid: loginUid
      }
    }).then(res => {
      if (res.status == '200') {
        dispatch(updateUnreadInfo(res));
      }
    });
  }
}

export const updateCommentUnread = () => {
  return (dispatch) => {
    return jAjax({
      url: URL.forumApi.javaApi.commentUnreadNum
    }).then(res => {
      dispatch(updateCommentUnreadNum(res));
    })
  }
}

export const updateQuoteUnread = () => {
  return (dispatch) => {
    return jAjax({
      url: URL.forumApi.javaApi.quoteUnreadNum
    }).then(res => {
      dispatch(updateQuoteUnreadNum(res));
    })
  }
}

export const updateSysUnread = () => {
  return (dispatch) => {
    return jAjax({
      url: URL.forumApi.javaApi.sysMsgNum
    }).then(res => {
      dispatch(updateSysUnreadNum(res));
    })
  }
}

export const updateChestBox = (loginUid) => {
  return (dispatch) => {
    return jAjax({
      url: URL.forumApi.chest.getChestLists,
      type: 'POST',
      data: {
        pageNo: 1,
        pageSize: 100,
        status: 0, // 未打开的宝箱
        uid: loginUid
      }
    }).then((res) => {
      // res.totalRecord
      console.log('chest res: ', res);
      if (res.status != '500') {
        dispatch(updateChestInfo(res));
      } else {
        console.warn('chest warn: ', res.errorMessage);
      }
    });
  }
}

export const updateUnreadInfo = actionCreator(ActionType.UPDATE_UNREAD_INFO);

export const updateCommentUnreadNum = actionCreator(ActionType.UPDATE_COMMENT_UNREAD);

export const updateQuoteUnreadNum = actionCreator(ActionType.UPDATE_QUOTE_UNREAD);

export const updateSysUnreadNum = actionCreator(ActionType.UPDATE_SYS_UNREAD);

export const changeActiveIndex = actionCreator(ActionType.CHANGE_ACTIVE_INDEX);

export const changeHomeSelectedIndex = actionCreator(ActionType.CHANGE_HOME_SELECTED_INDEX);

export const changeHomeScrollTop = actionCreator(ActionType.CHANGE_HOME_SCROLL_TOP);

export const changeHomeCurPage = actionCreator(ActionType.CHANGE_HOME_CUR_PAGE);

export const updateFinanceRoll = actionCreator(ActionType.UPDATE_FINANCE_ROLL);

export const updateHotList = actionCreator(ActionType.UPDATE_HOT_LIST);

export const appendHotList = actionCreator(ActionType.APPEND_HOT_LIST);

export const updateRecommendList = actionCreator(ActionType.UPDATE_RECOMMEND_LIST);

export const appendRecommendList = actionCreator(ActionType.APPEND_RECOMMEND_LIST);

export const updateNewestList = actionCreator(ActionType.UPDATE_NEWEST_LIST);

export const appendNewestList = actionCreator(ActionType.APPEND_NEWEST_LIST);

export const updateSectionData = actionCreator(ActionType.UPDATE_SECTION_DATA);

export const updateHomeAd = actionCreator(ActionType.UPDATE_HOME_AD);

export const updateChestInfo = actionCreator(ActionType.UPDATE_CHEST_INFO);



export const changeMsgSelectedIndex = actionCreator(ActionType.CHANGE_MSG_SELECTED_INDEX);

export const changeMsgScrollTop = actionCreator(ActionType.CHANGE_MSG_SCROLL_TOP);

export const changeMsgCurPage = actionCreator(ActionType.CHANGE_MSG_CUR_PAGE);

export const updateMsgCommentList = actionCreator(ActionType.UPDATE_MSG_COMMENT_LIST);

export const appendMsgCommentList = actionCreator(ActionType.APPEND_MSG_COMMENT_LIST);

export const updateMsgPostList = actionCreator(ActionType.UPDATE_MSG_POST_LIST);

export const appendMsgPostList = actionCreator(ActionType.APPEND_MSG_POST_LIST);

export const updateMsgPrivateList = actionCreator(ActionType.UPDATE_MSG_PRIVATE_LIST);

export const appendMsgPrivateList = actionCreator(ActionType.APPEND_MSG_PRIVATE_LIST);


export const changeSectionSelectedIndex = actionCreator(ActionType.CHANGE_SECTION_SELECTED_INDEX);

export const changeSectionScrollTop = actionCreator(ActionType.CHANGE_SECTION_SCROLL_TOP);

export const changeSectionCurPage = actionCreator(ActionType.CHANGE_SECTION_CUR_PAGE);

export const updateSectionThreadList = actionCreator(ActionType.UPDATE_SECTION_THREAD_LIST);

export const appendSectionThreadList = actionCreator(ActionType.APPEND_SECTION_THREAD_LIST);