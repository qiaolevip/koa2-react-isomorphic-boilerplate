'use strict';

let config = {
  wwwEnv: '',
  forumEnv: '',
  authEnv: '',
  vipEnv: ''
};

const isBrowser = typeof window !== 'undefined';

if (process.env.API === 'dev' || (isBrowser && location.origin.indexOf('-dev') !== -1)) {
  config.wwwEnv = config.forumEnv = config.authEnv = config.vipEnv = '-dev';
} else if (process.env.API === 'alpha' || (isBrowser && location.origin.indexOf('-alpha') !== -1)) {
  config.wwwEnv = config.authEnv = config.vipEnv = '-demo';
  config.forumEnv = '-alpha';
} else if (isBrowser && location.origin.indexOf('stage') !== -1) {
  config.wwwEnv = config.forumEnv = '.stage';
}

if (isBrowser && window.openDebug) {
  config.wwwEnv = '-dev';
  config.forumEnv = '-dev';
}

const authHost = `https://auth${config.authEnv}.dianrong.com`;
const dianrongSource = `//www${config.wwwEnv}.dianrong.com`;
const dianrong_forumUrl = `//forum${config.forumEnv}.dianrong.com`;
const forumApiUrl = `https://forum.dianrong.com`;
// const forumApiUrl = location.origin;
const storeUrl = `//store${config.forumEnv}.dianrong.com`;
const vipHost = `https://vip${config.vipEnv}.dianrong.com`;

const dianrongUrl = {
  source: dianrongSource,
  profile: dianrongSource + '/api/v2/user/profile',
  auth_sso: authHost + '/auth-server/api/jwt/sso/query',
  login: dianrongSource + '/h5/login?fromForum=true',
  loginUrl: dianrongSource + '/h5/login?fromUrl=',
  logout: dianrong_forumUrl + '/member.php?mod=logging&action=logout_with_dianrong&formhash=1ff2f348&mobile=2',
  plans: dianrongSource + '/h5/plans',
  account: dianrongSource + '/h5/my-account',
  register: dianrongSource + '/h5/register',
  aboutUs: dianrongSource + '/h5/company',
  help: dianrongSource + '/h5/help-center'
};

const forumApiVer = forumApiUrl + '/forumserver/api/v1';
const forumJavaApi = forumApiUrl + '/forumserver/api/v2/socailfourm/';

const forumApi = {
  recommend: forumApiVer + '/main/recommend',
  newest: forumApiVer + '/main/newest',
  qiandao: forumApiVer + '/sign/sign',
  qiandaoList: forumApiVer + '/sign/list?loginUid=',
  getReward: forumApiVer + '/sign/getreward',
  slide: forumApiVer + '/main/banner',
  login: forumApiVer + '/user/login',
  bankuai: forumApiVer + '/main/forums',
  taskDetail: forumApiVer + '/task/info',
  financeRoll: forumApiVer + '/finance/roll',
  financeList: forumApiVer + '/finance/list',
  getFmList: forumApiVer + '/fm/list',
  fmClick: forumApiVer + '/fm/click',
  thread: {
    myChannel: forumApiVer + '/post/mychannel', // 全部版块
    hotChannel: forumApiVer + '/post/hotchannel',     // 热门版块
    moduleList: forumApiVer + '/main/forums',
    getTypeId: forumApiVer + '/post/postype?fid=',
    new: forumApiVer + '/post/new',
    view: forumApiVer + '/post/viewthread',
    hotComment: forumApiVer + '/post/hotcomment',
    comment: forumApiVer + '/post/viewreply?tid={0}&page={1}',
    reply: forumApiVer + '/post/reply',
    favorite: forumApiVer + '/post/favorite',
    thumbUP: dianrong_forumUrl + '/forum.php?mod=misc&action={0}&do={1}&tid={2}&pid={3}&inajax=1&ajaxdata=json',
    viewPic: dianrong_forumUrl + '/forum.php?mod=image&aid={0}&size=400x999&key={1}&type=fixnone',
    search: dianrong_forumUrl + '/search.php?mod=forum&mobile=2',
    defaultImg: dianrong_forumUrl + '/uc_server/images/noavatar_middle.gif?random='
  },
  module: {
    summary: forumApiVer + '/post/foruminfo?fid=',
    latest: forumApiVer + '/post/newest',
    top: forumApiVer + '/post/top?fid=',
    digst: forumApiVer + '/post/digst?fid=',
    headImg: dianrong_forumUrl + '/data/attachment/common/'
  },
  user: {
    aboutMe: dianrong_forumUrl + '/home.php?mod=space&do=thread&view=me&from=space&mobile=2&uid=',
    mySpace: dianrong_forumUrl + '/home.php?mod=space&do=profile&mobile=2&uid=',
    spaceMy: forumApiVer + '/space/my',
    otherSpace: forumApiVer + '/space/ta',
    info: dianrong_forumUrl + '/home.php?mod=spacecp&ac=profile&op=base',
    thread: dianrong_forumUrl + '/home.php?mod=space&do=thread&view=me',
    favorite: dianrong_forumUrl + '/home.php?mod=space&do=favorite&view=me&type=thread'
  },
  uploadImg: dianrong_forumUrl + '/misc.php?mod=swfupload&operation=upload&type=image&inajax=yes&infloat=yes&simple=2',
  task: {
    homepage: dianrong_forumUrl + '/tasks/#/',
    list: forumApiVer + '/task/list'
  },
  message: {
    systemList: forumApiVer + '/message/notice', // 系统消息列表
    postList: forumApiVer + '/message/postlist',  // 评论回复列表
    unread: forumApiVer + '/message/unread',
    noticeUnread: forumApiVer + '/message/noticeunread',  // 系统消息未读数
    postUnread: forumApiVer + '/message/postunread' , // 评论回复未读数
    pmUnread: forumApiVer + '/message/pmunread', // 私信消息未读数
    privateList: forumApiVer + '/message/getlist', // 私信用户列表
    pmList: forumApiVer + '/message/pmlist', // 获取两用户私信列表
    send: forumApiVer + '/message/send'
  },
  friend: {
    list: forumApiVer + '/friend/list', // 好友列表
    groupList: forumApiVer + '/friend/grouplist', // 好友分组列表
    requestList: forumApiVer + '/friend/requestlist', // 加好友申请列表
    apply: forumApiVer + '/friend/apply', // 申请加好友
    agree: forumApiVer + '/friend/agree',  // 同意加好友
    ignore: forumApiVer + '/friend/ignore'
  },
  drCoin: {
    selectDrCoin: dianrong_forumUrl + '/vip/api.php?action=select_drcoin_list&' // 点融币明细
  },
  guess: {
    today: forumApiVer + '/guess/today',
    answer: forumApiVer + '/guess/answer',
    check: forumApiVer + '/guess/check',
    prev: forumApiVer + '/guess/prev'
  },
  account: { // 记账
    main: dianrong_forumUrl + '/index1.html#/account/main',
    add: forumApiVer + '/expense/add',
    edit: forumApiVer + '/expense/edit',
    del: forumApiVer + '/expense/del',
    list: forumApiVer + '/expense/list',
    report: forumApiVer + '/expense/report'
  },

  chest: { // 宝箱相关接口
    getChestLists: forumJavaApi + 'front/forum/userchest/get-chest-lists', // post
    openChest: forumJavaApi + 'front/forum/userchest/open-chest',
    praise: forumJavaApi + 'front/forum/postpraise/praise', // 帖子点赞
    getAdInfo: forumJavaApi + 'front/forum/advertising/user-advertising-item', // 获取广告位
    playFun: forumJavaApi + 'front/forum/accessrecords/access-thread' // 玩转点融记录接口
  },

  javaApi: {
    recommentThread: forumJavaApi + 'front/forum/recommend-post/list',
    getUserPostList: forumJavaApi + 'front/forum/userpost/get-user-post-list',
    getUserReplyList: forumJavaApi + 'front/forum/userpost/get-user-reply-list',
    getCommentUnreadList: forumJavaApi + 'front/forum/postnotification/get-comment-unread-list', // 主题帖评论未读列表
    commentUnreadNum: forumJavaApi + 'front/forum/postnotification/comment-unread-quantity',
    getQuoteUnreadList: forumJavaApi + 'front/forum/postnotification/get-quote-unread-list',
    quoteUnreadNum: forumJavaApi + 'front/forum/postnotification/quote-unread-quantity',
    quoteComment: forumJavaApi + 'front/forum/postnotification/quote-comment',
    addThreadComment: forumJavaApi + 'front/forum/postnotification/add-thread-comment',
    getSysMsgList: forumJavaApi + 'front/forum/systemnotification/get-system-message-unread-list',
    sysMsgNum: forumJavaApi + 'front/forum/systemnotification/system-message-unread-quantity',
    recordThread: forumJavaApi + 'front/forum/accessrecords/access-specific-thread',
    voteInfo: forumJavaApi + 'front/forum/vote/vote-info',
    userVote: forumJavaApi + 'front/forum/vote/user-vote',
    hotList: forumJavaApi + 'front/forum/hotpost/list',
    newPost: forumJavaApi + 'front/forum/threadPost/new-post',
    newReply: forumJavaApi + 'front/forum/threadPost/new-reply',
    postShare: forumJavaApi + 'front/forum/postShare/add-post-share',
    getWechatConfig: forumJavaApi + 'front/forum/wechat/get-wechat-config',
  },

  coupon: {
    myCouponList: forumJavaApi + 'front/forum/userpost/get-my-coupon-list',
    transferCoupon: forumJavaApi + 'front/forum/userpost/coupon-transfer',
  }

};

const userAgent = {
  android: 'DianrongLenderAndroid',
  ios: 'SLMobile',
  weichat: 'MicroMessenger'
};

const security = {
  authkey: '0e8ffb0f06df72efb305c9b94f458746Gn7Eoq7GEW767VnLNO'
};

const drSdk = {
  loginUri: 'drm-sdk://account.drm/login?ifNeeded=true',
  regUri: 'drm-sdk://account.drm/register',
  logoutUri: 'drm-sdk://account.drm/logout',
  imagePicker: 'dr-lender://service/imagePicker',
  drshare: 'drm-sdk://share.drm/share'
};

const vipUrl = {
  coinDetail: vipHost + '/coin-h5.html#/record'
};

const URL = {
  dianrongUrl: dianrongUrl,
  dianrong_forumUrl: dianrong_forumUrl,
  storeUrl: storeUrl,
  vipUrl: vipUrl,
  forumApi: forumApi,
  userAgent: userAgent,
  security: security,
  drSdk: drSdk
};

exports.config = {
  maxCommentPage: 8
};

export default URL;
