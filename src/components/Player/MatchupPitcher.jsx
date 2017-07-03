import React, { Component } from 'react';
import { connect } from 'react-redux';
import { beautifySalary, calculatePitcherPoints } from '../../constants/calculatePoints';
import { makeDateNoPretty } from '../../constants/date';
import HitterChart from './HitterChart';
import PitcherGamelogContainer from './PitcherGamelogContainer';
import PlayerStatContainer from '../Containers/PlayerStatContainer';
import './GamelogMatchup.scss';

class MatchupPitcher extends Component {
  render() {
    const {
      player,
      logs,
    } = this.props;

    if (!player || !player.player) {
      return null;
    }

    return (
      <PitcherGamelogContainer playerId={player.player.ID}>
        <PlayerStatContainer playerId={player.player.ID}>
          <div className="matchup-pitcher">
            <h2>Starting Pitcher</h2>
            <div className="matchup-player-header">
              <div className="matchup-player-name">
                {`${player.player.FirstName} ${player.player.LastName}`}
              </div>
              <div className="matchup-player-salary">{beautifySalary(player.salary)}</div>
              <div>{player.fantasyPoints}</div>
              <div>{player.throws}</div>
            </div>
            <div>
              <h2>Recent Performances</h2>
              {this.props.logs && this.props.logs.map((log) => (
                <div key={log.game.id} className="matchup-pitcher-logs">
                  <div>{makeDateNoPretty(log.game.date.split('-').join(''))}</div>
                  <div className="matchup-pitcher-log-points">{Math.round(calculatePitcherPoints(log) * 1000) / 1000}</div>
                </div>
              ))}
            </div>
          </div>
        </PlayerStatContainer>
      </PitcherGamelogContainer>
    );
  }
}

const mapStateToProps = (state, { player, date }) => {
  const pitcherId = player && player.player && player.player.ID;
  const pitcher = state.players.items[pitcherId];
  const logs = pitcher && pitcher.logs && pitcher.logs.filter(game => Number(game.stats.InningsPitched['#text']) > 0);

  const sliceIndex = logs && logs.findIndex(log => log.game.date.split('-').join('') >= date);
  const logsToDate = logs && logs.slice(0, sliceIndex).sort((first, second) => (
    Number(second.game.date.split('-').join('')) - Number(first.game.date.split('-').join(''))
  ));

  console.log('PITCHER', pitcher)

  return {
    logs: logsToDate,
  };
};

export default connect(mapStateToProps)(MatchupPitcher);
