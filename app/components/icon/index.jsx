import React, { Component } from 'react';
import PropTypes from 'prop-types'

const prefix = 'icon-';

class Icon extends Component {

  static propTypes = {
    type: PropTypes.string
  }

  static defaultProps = {
    className: ''
  }

  render() {
    const { type, className, children, ...others } = this.props;
    const classes = `icon ${prefix}${type} ${className}`;
    return (
      <i className={classes} {...others}>
        {children}
      </i>
    )
  }
}

export default Icon;
