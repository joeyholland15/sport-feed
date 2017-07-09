import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
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
      pitcher,
    } = this.props;

    if (!player || !player.player) {
      return null;
    }

    return (
      <PitcherGamelogContainer playerId={player.player.ID}>
        <PlayerStatContainer playerId={player.player.ID}>
          <div className="matchup-pitcher">
            <div className="matchup-player-header row-titles">
              <div className="matchup-player-name">Starting Pitcher</div>
              <div className="matchup-player-salary">Salary</div>
              <div>Points</div>
              <div>Throws</div>
            </div>
            <section className="matchup-player-header">
              <div className="matchup-player-name">
                <Link to={`/pitcher/${this.props.pitcherId}`}>
                  {`${player.player.FirstName} ${player.player.LastName}`}
                </Link>
              </div>
              <div className="matchup-player-salary">{beautifySalary(player.salary)}</div>
              <div>{player.fantasyPoints}</div>
              <div>{player.throws}</div>
            </section>
            <section className="matchup-player-traits">
              <div className="matchup-player-header row-titles">
                <div className="matchup-player-name">Pitcher Trait</div>
                <div className="matchup-value">%ile</div>
              </div>
              <div className="matchup-player-trait">
                <div className="matchup-player-name">Grounder Ratio</div>
                <div className="matchup-value">{pitcher && pitcher.stats.grounderRatio.percentile}</div>
              </div>
              <div className="matchup-player-trait">
                <div className="matchup-player-name">Fly Ball Ratio</div>
                <div className="matchup-value">{pitcher && pitcher.stats.flyBallRatio.percentile}</div>
              </div>
            </section>
            <section>
              <div className="matchup-player-header row-titles">
                <div className="matchup-player-name">Recent Games</div>
                <div className="matchup-value">Points</div>
              </div>
              {this.props.logs && this.props.logs.map((log) => (
                <div key={log.game.id} className="matchup-pitcher-logs">
                  <div>{makeDateNoPretty(log.game.date.split('-').join(''))}</div>
                  <div className="matchup-pitcher-log-points">{Math.round(calculatePitcherPoints(log) * 1000) / 1000}</div>
                </div>
              ))}
            </section>
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
  const logsToDate = logs && logs.slice(Math.max(0, sliceIndex - 8), sliceIndex).sort((first, second) => (
    Number(second.game.date.split('-').join('')) - Number(first.game.date.split('-').join(''))
  ));

  return {
    pitcher,
    logs: logsToDate,
    pitcherId,
  };
};

export default connect(mapStateToProps)(MatchupPitcher);
