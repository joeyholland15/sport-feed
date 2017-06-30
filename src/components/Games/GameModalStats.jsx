import React, { Component } from 'react';
import { connect } from 'react-redux';
import './GameModal.scss';
import { logos } from '../../constants/logosByTeam';
import GameModalStatItem from './GameModalStatItem';
import { fetchStatsByDate, fetchStartingLineup } from '../../actions';
import { fetchPlayByPlay } from '../../actions/GameActions';

class GameModalStats extends Component {
  componentDidMount() {
    this.props.fetchStatsByDate(this.props.date);
    const gameKey = this.props.gameId.split('-')[1];
    this.props.fetchPlayByPlay(gameKey);
    // const gameId = this.props.gameId && this.props.gameId.split('-')[1];
    // this.props.fetchStartingLineup(gameId);
  }

  render() {
    const {
      battingOrder,
      date,
      pitcherId,
    } = this.props;

    return (
      <div>
        <GameModalStatItem
          playerId={pitcherId}
          isPitcher
          date={date}
          gameId={this.props.gameId}
        />
        {battingOrder && battingOrder.map((playerId, idx) => (
          <GameModalStatItem
            key={`${idx}-${playerId}`}
            playerId={playerId}
            gameId={this.props.gameId}
            date={date}
            slot={idx + 1} // slot in the batting order
          />
        ))}
      </div>
    );
  }
}

export default connect(null, { fetchStatsByDate, fetchPlayByPlay, fetchStartingLineup })(GameModalStats);
