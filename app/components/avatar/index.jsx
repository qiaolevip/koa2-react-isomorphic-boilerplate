import React, {Component} from 'react';
import PropTypes from 'prop-types';
import URL from '../../util/constants';

const displayName = 'avatar';

class Avatar extends Component {

  static propTypes = {
    image: PropTypes.string,
    defaultImage: PropTypes.string,
    onAvatarClick: PropTypes.func
  }

  static defaultProps = {
    defaultImage: URL.forumApi.thread.defaultImg,
    onAvatarClick: () => void 0
  }

  onImgError(e) {
    e.target.src = this.props.defaultImage;
  }

  render() {
    const { className, onAvatarClick, image } = this.props;
    const classes = `${displayName} ${className}`;
    return (
      <img className={classes}
           src={image}
           onError={this.onImgError.bind(this)}
           onClick={onAvatarClick} />
    );
  }
}

export default Avatar;
