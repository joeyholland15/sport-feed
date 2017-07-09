import React, { Component } from 'react';
import { connect } from 'react-redux';
import HitterFeed from './HitterFeed';
import PitcherFeed from './PitcherFeed';
import Teams from './Teams';
import './Feed.scss';
import Loading from '../Chrome/Loading';

class Feed extends Component {
  render() {
    return (
      <div className="feed">
        {this.props.loading && <Loading size="3x" />}
        {this.props.active === 'Pitchers' && <PitcherFeed />}
        {this.props.active === 'Hitters' && <HitterFeed />}
        {this.props.active === 'Teams' && <Teams />}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  active: state.filters.selected,
  loading: state.players.loading,
});

export default connect(mapStateToProps)(Feed);
