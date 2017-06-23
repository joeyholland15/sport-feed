import React, { Component } from 'react';
import { connect } from 'react-redux';
import styles from './Feed.scss';
import LineupAdd from '../Lineups/LineupAdd';
import HittersHeader from './HittersHeader';
import { logos } from '../../constants/logosByTeam';
import { playerHistorySelector } from '../../selectors/FeedSelectors';

class HitterHistory extends Component {
  render() {
    const history = this.props.playerHistory;

    let placeholders = 0;
    if (history) {
      placeholders = 8 - history.length;
    }

    const dnps = [];
    for (var i = 0; i < placeholders; i++) {
      dnps.push('-');
    }

    return (
      <div className="row-history">
        {dnps && dnps.map((dnp, idx) => (
          <div key={idx} className="feed-row-cell">{dnp}</div>
        ))}
        {history && history.map((points, idx) => (
          <div key={idx} className="feed-row-cell">{points}</div>
        ))}
      </div>
    );
  }
}

const mapStateToProps = (state, { hitterId }) => ({
  playerHistory: playerHistorySelector(state, hitterId),
});

export default connect(mapStateToProps)(HitterHistory);
