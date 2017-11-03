import React, {Component} from 'react';
import PropTypes from 'prop-types'

import './mask.styl';

const prefix = 'mask';

class Mask extends Component {

  static propTypes = {
    onMaskTouch: PropTypes.func,
  }

  static defaultProps = {
    className: '',
    onMaskTouch: () => void 0
  }

  render() {
    const {className, children, onMaskTouch} = this.props;
    const classes = prefix + ' ' + className;
    return (
      <div className={classes} onClick={onMaskTouch}>
        {children}
      </div>
    );
  }
}

export default Mask;
