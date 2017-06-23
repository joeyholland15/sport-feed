import React, { Component } from 'react';
import { connect } from 'react-redux';
import PlayerChart from './PlayerChart';
import { fetchHitterGamelogs, fetchHitterStats } from '../../actions';
import { makeDateNoPretty } from '../../constants/date';
import { logos } from '../../constants/logosByTeam';
import './Player.scss';

class Player extends Component {
  static propTypes = {
    fetchHitterGamelogs: React.PropTypes.func.isRequired,
    fetchHitterStats: React.PropTypes.func.isRequired,
    playerId: React.PropTypes.string.isRequired,
    jerseyNumber: React.PropTypes.string,
    name: React.PropTypes.string,
    position: React.PropTypes.string,
    team: React.PropTypes.string,
    playerLogs: React.PropTypes.arrayOf(React.PropTypes.shape()),
  }

  static defaultProps = {
    jerseyNumber: undefined,
    name: undefined,
    team: undefined,
    position: undefined,
    playerLogs: undefined,
  }

  componentWillMount() {
    this.props.fetchHitterGamelogs(this.props.playerId);
    this.props.fetchHitterStats(this.props.playerId);
  }

  formatDate = (date) => {
    const dateString = Number(date.split('-').join(''));
    return makeDateNoPretty(dateString);
  }

  calculatePoints = (game) => {
    if (!game || !game.stats) {
      return 'DNP';
    }

    const homeruns = Number(game.stats.Homeruns['#text']);
    const runs = Number(game.stats.Runs['#text']);
    const rbis = Number(game.stats.RunsBattedIn['#text']);
    const doubles = Number(game.stats.SecondBaseHits['#text']);
    const triples = Number(game.stats.ThirdBaseHits['#text']);
    const sbs = Number(game.stats.StolenBases['#text']);
    const bbs = Number(game.stats.BatterWalks['#text']);
    const hbp = Number(game.stats.HitByPitch['#text']);
    const singles = Number(game.stats.Hits['#text']) - (homeruns + doubles + triples);

    return (homeruns * 10) + (runs * 2) + (rbis * 2) + (doubles * 5) + (triples * 8) +
      (sbs * 5) + (bbs * 2) + (hbp * 2) + (singles * 3);
  }

  render() {
    return (
      <div>
        <div className="player-header">
          <div className="jersey-number">{this.props.jerseyNumber}</div>
          <div>{`${this.props.name} | ${this.props.position}`}</div>
          <img alt="" src={`${logos[this.props.team]}`} />
        </div>
        <div>
          <PlayerChart playerId={this.props.playerId} />
        </div>
        <div className="player-logs">
          {this.props.playerLogs && this.props.playerLogs.map(game => (
            <div key={`${game.game.id}`} className="player-log">
              <div>{this.formatDate(game.game.date)}</div>
              <div>{this.calculatePoints(game)}</div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, { playerId }) => {
  const playerLogs = state.players.items[playerId] && state.players.items[playerId].logs;
  const player = playerLogs && playerLogs[0] && playerLogs[0].player;
  const teamObj = playerLogs && playerLogs[0] && playerLogs[0].team;

  const jerseyNumber = player && player.JerseyNumber;
  const position = player && player.Position;
  const name = player && `${player.FirstName} ${player.LastName}`;
  const team = teamObj && teamObj.Abbreviation;

  return {
    jerseyNumber,
    position,
    name,
    playerLogs,
    team,
  };
};

export default connect(mapStateToProps, { fetchHitterGamelogs, fetchHitterStats })(Player);
