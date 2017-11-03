import React, { Component } from 'react';
import PropTypes from 'prop-types'
import './tab-switch.styl';

export class TabCont extends Component {

  static propTypes = {
    active: PropTypes.bool,
    className: PropTypes.string,
    onShow: PropTypes.func,
    onHide: PropTypes.func
  }

  static defaultProps = {
    onShow: () => console.log('show'),
    onHide: () => console.log('hide')
  }

  render() {
    const { active, className, children } = this.props;
    const classes = `tab-cont${active ? ' active' : ''} ${className}`;
    return (
      <div className={classes}>
        {children}
      </div>
    );
  }
}

export class TabSwitch extends Component {
  constructor(props) {
    super(props);
    let selected;
    React.Children.map(props.children, (tabCont, index) => {
      if (tabCont.props.active) selected = index ;
    });
    this.state = {
      activeIndex: selected !== undefined ? selected : (props.activeIndex || 0)
    };
  }

  onTabChange(index, tab) {
    let preIndex = this.state.activeIndex;
    if (index === preIndex) return;
    let preTabContInstance = this.refs['tab-cont-' + preIndex];
    preTabContInstance.onHide && preTabContInstance.onHide() ;
    this.props.onChange && this.props.onChange(index, tab) ;
    this.setState({ activeIndex: index }, () => {
      let tabContInstance = this.refs['tab-cont-' + index];
      if (tabContInstance && tabContInstance.onShow) tabContInstance.onShow() ;
    });
  }

  render() {
    const { className, children, activeIndex, keepOneCont = false, ...others } = this.props;
    const classes = `tab-switch ${className}`;

    const newProps = {
      activeIndex: this.state.activeIndex,
      onTabChange: this.onTabChange.bind(this)
    };

    let tabs = children[0];
    let contsWrap = children[1];

    let newTabs = React.cloneElement(tabs, {
      activeIndex: this.state.activeIndex,
      onTabChange: this.onTabChange.bind(this)
    });

    let newConts = this.conts = contsWrap.props.children.map((tabCont, index) => {
      let newEl = React.cloneElement(tabCont, {
        key: index,
        active: this.state.activeIndex === index,
        ref: 'tab-cont-' + index
      });
      return newEl;
    });

    let newContsWrap = React.cloneElement(contsWrap,
      {},
      keepOneCont ? newConts[this.state.activeIndex] : newConts
    );

    return (
      <div className={classes}>
        { newTabs }
        { newContsWrap }
      </div>
    );
  }
}
