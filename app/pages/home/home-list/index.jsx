import React, {Component} from 'react';
import PropTypes from 'prop-types';
import ThreadItem from '../thread-item';
import BigThreadItem from '../big-thread-item';
import ThreadImgItem from '../thread-img-item';
import NewPost from '../new-post';

class HomeList extends Component {

  static propTypes = {
    getData: PropTypes.func,
    listData: PropTypes.array,
    refresh: PropTypes.bool
  }

  static defaultProps = {
    refresh: false
  }

  componentDidMount() {
    const { listData, getData } = this.props;
    if (listData.length === 0) {
      this.props.getData();
    }
  }

  onShow() {
    const { refresh, getData } = this.props;
    if (refresh) getData();
  }

  render() {
    const { children, listData, getData, refresh, ...others } = this.props;
    return (
      <div className="home-list" {...others}>
        {
          listData.map((item, index) => (
            item.kind === 'bigRecommend'
              ? <BigThreadItem key={item.tid} item={item} />
              : item.image && item.image !== ''
              ? <ThreadImgItem key={item.tid} item={item} />
              : <ThreadItem key={item.tid} item={item} />
          ))
        }
        <NewPost />
      </div>
    );
  }
}

export default HomeList;
