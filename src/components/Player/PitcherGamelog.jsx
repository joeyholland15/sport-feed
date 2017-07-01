import React, { Component } from 'react';
import { connect } from 'react-redux';
import { makeDateNoPretty } from '../../constants/date';
import './Hitter.scss';

class PitcherGamelogs extends Component {
  static propTypes = {
    game: React.PropTypes.shape().isRequired,
  }

  formatDate = (date) => {
    const dateString = Number(date.split('-').join(''));
    return makeDateNoPretty(dateString);
  }

  calculatePoints = (game) => {
    const ipText = game.stats.InningsPitched['#text'];
    const fullInnings = ipText && ipText.split('.')[0];
    let inningDecimal = ipText && ipText.split('.')[1];

    if (inningDecimal === '1') {
      inningDecimal = '333';
    } else if (inningDecimal === '2') {
      inningDecimal = '667';
    }

    const ip = Number(`${fullInnings}.${inningDecimal}`);
    const k = Number(game.stats.PitcherStrikeouts['#text']);
    const bb = Number(game.stats.PitcherWalks['#text']);
    const h = Number(game.stats.HitsAllowed['#text']);
    const w = Number(game.stats.Wins['#text']);
    const er = Number(game.stats.EarnedRunsAllowed['#text']);

    return (ip * 2.25) + (k * 2) + (bb * -0.6) + (h * -0.6) + (er * -2) + (w * 4);
  }

  render() {
    const {
      game,
    } = this.props;

    const team = game.team.Abbreviation;
    const opp = game.game.homeTeam.Abbreviation === team ?
      `v ${game.game.awayTeam.Abbreviation}` : `@ ${game.game.homeTeam.Abbreviation}`;

    return (
      <div key={`${game.game.id}`} className="player-log">
        <div className="large-cell">{this.formatDate(game.game.date)}</div>
        <div>{opp}</div>
        <div>{Math.round(this.calculatePoints(game) * 100) / 100}</div>
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

export default connect(mapStateToProps)(PitcherGamelogs);
