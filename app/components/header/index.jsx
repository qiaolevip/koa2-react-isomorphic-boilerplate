import React, {Component} from 'react';
import PropTypes from 'prop-types'
import URL from '../../util/constants';
import Icon from '../icon';
import Mask from '../mask';

import './header.styl';

const MenuListLogin = {
  [URL.dianrongUrl.source] : '首页',
  [URL.dianrongUrl.plans] : '我要投资',
  [URL.dianrongUrl.account] : '我的账户',
  [URL.dianrong_forumUrl] : '社区',
  [URL.storeUrl] : '商城',
  [URL.dianrongUrl.aboutUs] : '关于点融',
  [URL.dianrongUrl.help] : '帮助中心',
  [URL.dianrongUrl.logout] : '安全退出'
};

const MenuListLogout = {
  [URL.dianrongUrl.source] : '首页',
  [URL.dianrongUrl.plans] : '我要投资',
  [URL.dianrongUrl.account] : '我的账户',
  [URL.dianrong_forumUrl] : '社区',
  [URL.storeUrl] : '商城',
  [URL.dianrongUrl.aboutUs] : '关于点融',
  [URL.dianrongUrl.register] : '注册',
  [URL.dianrongUrl.login] : '登录'
};

const MenuList = (props) => {
  const { data } = props;
  return (
    <ul className="header-menu">
      {
        Object.keys(data).map((key, index) => (
          <li key={index}>
            <a href={key}>{data[key]}</a>
          </li>
        ))
      }
    </ul>
  );
}

class Header extends Component {

  static propTypes = {
    name: PropTypes.string,
    isLogin: PropTypes.bool
  };

  static defaultProps = {
    name: '点融社区'
  };

  constructor(props) {
    super(props);
    this.state = {
      showMenu: false
    };
  }

  onToggleMenu() {
    this.setState((preState) => ({
      showMenu: !preState.showMenu
    }));
  }

  goBack() {
    if (typeof window !== 'undefined') {
      window.history.go(-1);
    }
  }

  render() {
    const { name, isLogin } = this.props;
    let { showMenu } = this.state;
    return (
      <header className="forum-header">
        <div className="header-left" onClick={this.goBack}>
          <Icon type="return" />
        </div>
        <div className="header-cont">
          <a href="/">{name}</a>
        </div>
        <div className="header-right" onClick={this.onToggleMenu.bind(this)}>
          <Icon type="more2" />
        </div>
        {
          showMenu
            ? <Mask onMaskTouch={this.onToggleMenu.bind(this)} >
            <MenuList data={isLogin ? MenuListLogin : MenuListLogout} />
          </Mask>
            : null
        }
      </header>
    );
  }
}

export default Header;
