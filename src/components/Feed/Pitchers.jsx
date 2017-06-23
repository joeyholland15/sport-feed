import React, { Component } from 'react';
import { connect } from 'react-redux';
import styles from './Feed.scss';
import { logos } from '../../constants/logosByTeam';
import { dailyPitchersByPoints } from '../../selectors/FeedSelectors';
import LineupAdd from '../Lineups/LineupAdd';
import PitchersHeader from './PitchersHeader';
import PitcherRow from './PitcherRow';

class Pitchers extends Component {
  render() {
    return (
      <div>
        <PitchersHeader />
        {this.props.pitcherIds && this.props.pitcherIds.map(pitcherId => (
          <PitcherRow key={pitcherId} pitcherId={pitcherId} />
        ))}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    pitcherIds: dailyPitchersByPoints(state, state.date),
  };
};

export default connect(mapStateToProps)(Pitchers);
