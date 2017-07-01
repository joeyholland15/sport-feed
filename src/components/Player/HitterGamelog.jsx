import React, { Component } from 'react';
import { connect } from 'react-redux';
import { makeDateNoPretty } from '../../constants/date';
import './Hitter.scss';

class HitterGamelogs extends Component {
  static propTypes = {
    game: React.PropTypes.shape().isRequired,
    totalGames: React.PropTypes.number.isRequired,
  }

  formatDate = (date) => {
    const dateString = Number(date.split('-').join(''));
    return makeDateNoPretty(dateString);
  }

  render() {
    const {
      game,
      totalGames,
    } = this.props;

    const average = totalGames === 0 ? 0 :
      Math.round((game.totalPoints / totalGames) * 1000) / 1000;

    const bombPercentage = totalGames === 0 ?
      0 : Math.round((game.bombCount / totalGames) * 1000) / 1000;

    const conPercentage = Math.round((game.consistency / average) * 1000) / 1000;

    let className = 'player-log';

    if (game.isSparq) {
      className = `${className} sparq`;
    }

    if (game.ruledOut) {
      className = `${className} ruled-out`;
    }

    if (game.inStreak) {
      className = `${className} in-streak`;
    }

    const team = game.team.Abbreviation;
    const opp = game.game.homeTeam.Abbreviation === team ?
      `v ${game.game.awayTeam.Abbreviation}` : `@ ${game.game.homeTeam.Abbreviation}`;

    return (
      <div key={`${game.game.id}`} className={className}>
        <div className="large-cell">{this.formatDate(game.game.date)}</div>
        <div>{opp}</div>
        <div>{game.points}</div>
        <div>{game.rating}</div>
        <div>{game.stats.Homeruns['#text']}</div>
        <div>{game.stats.ExtraBaseHits['#text']}</div>
        <div>{conPercentage}</div>
        <div>{average}</div>
        <div>{bombPercentage}</div>
      </div>
    );
  }
}

const mapStateToProps = (state, { playerId }) => {
  const playerLogs = state.players.items[playerId] && state.players.items[playerId].logs;

  return {
    playerLogs,
  };
};

export default connect(mapStateToProps)(HitterGamelogs);
