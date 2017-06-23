import React, { Component } from 'react';
import { connect } from 'react-redux';
import styles from './Feed.scss';
import LineupAdd from '../Lineups/LineupAdd';
import HittersHeader from './HittersHeader';
import { logos } from '../../constants/logosByTeam';
import { playerFutureSelector } from '../../selectors/FeedSelectors';

class HitterFuture extends Component {
  render() {
    const future = this.props.playerFuture;

    let placeholders = 0;
    if (future) {
      placeholders = 5 - future.length;
    }

    const dnps = [];
    for (var i = 0; i < placeholders; i++) {
      dnps.push('-');
    }

    return (
      <div className="row-future">
        {future && future.map((points, idx) => (
          <div key={idx} className="feed-row-cell">{points}</div>
        ))}
        {dnps && dnps.map((dnp, idx) => (
          <div key={idx} className="feed-row-cell">{dnp}</div>
        ))}
      </div>
    );
  }
}

const mapStateToProps = (state, { hitterId }) => ({
  playerFuture: playerFutureSelector(state, hitterId),
});

export default connect(mapStateToProps)(HitterFuture);
