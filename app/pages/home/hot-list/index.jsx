import React, {Component} from 'react';
import PropTypes from 'prop-types'
import HotThreadItem from '../hot-thread-item';
import NewPost from '../new-post';

class HotList extends Component {

  static propTypes = {
    getData: PropTypes.func,
    listData: PropTypes.array,
    refresh: PropTypes.bool
  }

  static defaultProps = {
    refresh: false
  }

  componentDidMount() {
    const { listData } = this.props;
    if (listData.length === 0) {
      this.props.getData();
    }
  }

  onShow() {
    const { refresh, getData } = this.props;
    if (refresh) getData();
  }

  render() {
    const { listData } = this.props;
    return (
      <div className="hot-list">
        {
          listData.map((item, index) => (
            <HotThreadItem key={item.tid} item={item} />
          ))
        }
        <NewPost />
      </div>
    );
  }
}

export default HotList;
