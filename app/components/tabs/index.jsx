import React, { Component } from 'react';
import PropTypes from 'prop-types'

const PREFIX = 'tabs';

export const Tab = (props) => {
  const { children, className, active, href, text, ...others } = props;
  const classes = `${PREFIX}-item${active ? ' active' : ''} ${className}`;
  return (
    <li className={classes} {...others}>
      {
        href ? <a href={href}>{text || children}</a> : (text || children)
      }
    </li>
  );
}

export class Tabs extends Component {

  static propTypes = {
    activeIndex: PropTypes.number,
    className: PropTypes.string,
    onTabChange: PropTypes.func
  }

  constructor(props) {
    super(props);
    let selected;
    props.children.map((tab, index) => {
      if (tab.props.active) selected = index ;
    });
    this.state = {
      activeIndex: selected !== undefined ? selected : (props.activeIndex || 0)
    };
  }

  onTabChange(index, tab) {
    if (!tab.props.href) {
      this.setState({ activeIndex: index });
      this.props.onTabChange && this.props.onTabChange(index, tab);
    }
  }

  render() {
    const { children, className, activeIndex, ...others } = this.props;
    const classes = `${PREFIX}-nav ${className}`;

    let tabs = children.map((tab, index) => (
      React.cloneElement(tab, {
        key: index,
        active: this.state.activeIndex === index,
        // onTouchTap: this.onTabChange.bind(this, index, tab)
        onClick: this.onTabChange.bind(this, index, tab)
      })
    ));
    return (
      <div className={classes} {...others}>
        <ul>
          {tabs}
        </ul>
      </div>
    );
  }
}

Tabs.Tab = Tab;