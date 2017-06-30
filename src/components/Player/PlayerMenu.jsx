import React, { Component } from 'react';
import { connect } from 'react-redux';
import PlayerMenuItem from './PlayerMenuItem';
import './PlayerMenu.scss';

class PlayerMenu extends Component {
  static propTypes = {
    upside: React.PropTypes.number,
    averagePoints: React.PropTypes.number,
    playerLogs: React.PropTypes.arrayOf(React.PropTypes.shape()),
    cumulativeStats: React.PropTypes.shape(),
  }

  static defaultProps = {
    upside: 0,
    averagePoints: 0,
    playerLogs: [],
    cumulativeStats: undefined,
  }

  render() {
    const {
      upside,
      averagePoints,
      playerLogs,
      cumulativeStats,
    } = this.props;

    let ineligibleCount = 0;
    let sparqCount = 0;
    let dozenCount = 0; // games >= 12
    let inStreakCount = 0;
    let goodInStreak = 0;

    if (playerLogs) {
      playerLogs.forEach((game, idx) => {
        if (game.isSparq || game.ruledOut) {
          ineligibleCount += 1;
        }
        if (game.isSparq) {
          sparqCount += 1;
        }
        if (game.points >= 12) {
          dozenCount += 1;
        }
      });
    }

    const ineliblePercentage = ineligibleCount ?
      Math.round((ineligibleCount / playerLogs.length) * 1000) / 1000 : 0;

    return (
      <div className="player-menu-container">
        <h4>Season Stats</h4>
        {cumulativeStats && Object.keys(cumulativeStats).map((statId) => {
          const stat = cumulativeStats[statId];
          return (
            <PlayerMenuItem
              key={statId}
              category={statId}
              value={stat['#text']}
              round
            />
          );
        })}
      </div>
    );
  }
}

const mapStateToProps = (state, { playerId }) => {
  const playerLogs = state.players.items[playerId] && state.players.items[playerId].logs;
  const cumulativeStats = state.players.items[playerId] && state.players.items[playerId].stats;
  const lastGame = playerLogs && playerLogs[playerLogs.length - 1];

  const averagePoints = (lastGame && lastGame.totalPoints / (playerLogs.length - 1)) || 0;
  const upside = (lastGame && lastGame.bombCount / (playerLogs.length - 1)) || 0;

  return {
    averagePoints,
    upside,
    playerLogs,
    cumulativeStats,
  };
};

export default connect(mapStateToProps)(PlayerMenu);
