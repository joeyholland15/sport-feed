import React, { Component } from 'react';
import { connect } from 'react-redux';
import Hitters from './Hitters';
import Pitchers from './Pitchers';
import Teams from './Teams';
import styles from './Feed.scss';

class Feed extends Component {
  render() {
    return (
      <div className="feed">
        {this.props.active === 'Pitchers' && <Pitchers />}
        {this.props.active === 'Hitters' && <Hitters />}
        {this.props.active === 'Teams' && <Teams />}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  active: state.filters.selected,
});

export default connect(mapStateToProps)(Feed);
