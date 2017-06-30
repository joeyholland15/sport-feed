import React, { Component } from 'react';
import { connect } from 'react-redux';
import PlayerChart from './PlayerChart';
import PlayerMenu from './PlayerMenu';
import PlayerLogHeader from './PlayerLogHeader';
import { fetchHitterGamelogs, fetchHitterStats } from '../../actions/PlayerActions';
import { makeDateNoPretty } from '../../constants/date';
import { logos } from '../../constants/logosByTeam';
import './Pitcher.scss';

// GB Pitchers generally have grounder rates over 50%.
// FB Pitchers generally have fly ball rates over (or approaching) 40%.

class Player extends Component {
  static propTypes = {
    fetchHitterGamelogs: React.PropTypes.func.isRequired,
    fetchHitterStats: React.PropTypes.func.isRequired,
    playerId: React.PropTypes.string.isRequired,
    jerseyNumber: React.PropTypes.string,
    name: React.PropTypes.string,
    position: React.PropTypes.string,
    team: React.PropTypes.string,
    date: React.PropTypes.number,
    playerLogs: React.PropTypes.arrayOf(React.PropTypes.shape()),
  }

  static defaultProps = {
    jerseyNumber: undefined,
    name: undefined,
    team: undefined,
    position: undefined,
    playerLogs: undefined,
    date: undefined,
  }

  componentWillMount() {
    this.props.fetchHitterGamelogs(this.props.playerId, this.props.date);
    this.props.fetchHitterStats(this.props.playerId);
  }

  formatDate = (date) => {
    const dateString = Number(date.split('-').join(''));
    return makeDateNoPretty(dateString);
  }

  render() {
    return (
      <div className="player-container">
        <div className="player-info">
          <div className="player-header">
            <div className="jersey-number">{this.props.jerseyNumber}</div>
            <div>{`${this.props.name} | ${this.props.position} | `}</div>
            <div>
              <img alt="" src={`${logos[this.props.team]}`} />
            </div>
          </div>
          <div className="player-chart">
            <PlayerChart playerId={this.props.playerId} />
          </div>
          <div>
            <PlayerMenu playerId={this.props.playerId} />
          </div>
        </div>
        <div className="player-body">
          {this.props.playerLogs && (
            <div className="player-logs">
              <PlayerLogHeader />
              {this.props.playerLogs.map((game, idx) => {
                const average = idx === 0 ? 0 : Math.round((game.totalPoints / idx) * 1000) / 1000;
                const bombPercentage = idx === 0 ?
                  0 : Math.round((game.bombCount / idx) * 1000) / 1000;
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
              })}
            </div>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, { playerId }) => {
  const playerLogs = state.players.items[playerId] && state.players.items[playerId].logs;
  const cumulativeStats = state.players.items[playerId] && state.players.items[playerId].cumulative;
  const player = playerLogs && playerLogs[0] && playerLogs[0].player;
  const teamObj = playerLogs && playerLogs[0] && playerLogs[0].team;

  const jerseyNumber = player && player.JerseyNumber;
  const position = player && player.Position;
  const name = player && `${player.FirstName} ${player.LastName}`;
  const team = teamObj && teamObj.Abbreviation;

  const date = state.date;

  return {
    jerseyNumber,
    position,
    name,
    playerLogs,
    team,
    date,
    cumulativeStats
  };
};

export default connect(mapStateToProps, { fetchHitterGamelogs, fetchHitterStats })(Player);
