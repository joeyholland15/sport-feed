import React, { Component } from 'react';
import { connect } from 'react-redux';
import styles from './Feed.scss';
import { logos } from '../../constants/logosByTeam';
import { feedPitcherSelector } from '../../selectors/FeedSelectors';
import LineupAdd from '../Lineups/LineupAdd';
import PitchersHeader from './PitchersHeader';
import RecentLogs from './RecentLogs';
import { fetchPlayerGameLogs } from '../../actions';

class Pitchers extends Component {
  beautifySalary = (salary) => {
    if (!salary) {
      return null;
    }

    const salaryCharacters = salary.toString().split('');
    salaryCharacters.splice(salaryCharacters.length - 3, 0, ',');
    return `$${salaryCharacters.join('')}`;
  }

  fetchRecent = () => {
    this.props.fetchPlayerGameLogs(this.props.pitcherId, this.props.date);
  }

  render() {
    const {
      opp,
      position,
      team,
      playerName,
      fantasyPoints,
      salary,
      date,
      recentLogs,
    } = this.props;

    return (
      <div>
        <div className="feed-row">
          <div className="feed-row-cell">{position}</div>
          <div className="feed-row-name">
            <div>
              <img alt="" src={`${logos[team]}`} />
            </div>
            <div className="player-name">{playerName}</div>
            <div className="view-logs" onClick={this.fetchRecent}>Recent</div>
          </div>
          <div className="feed-row-cell">{fantasyPoints}</div>
          <div className="feed-row-cell">{`${this.beautifySalary(salary)}`}</div>
          <div className="feed-row-image">
            <img alt="" src={`${logos[opp]}`} />
          </div>
          <div className="feed-row-cell">
            <LineupAdd gameId={this.props.pitcherId} />
          </div>
        </div>
        <RecentLogs pitcherId={this.props.pitcherId} />
      </div>
    );
  }
}

const mapStateToProps = (state, { pitcherId }) => {
  const pitcher = state.pitchers.items[`${pitcherId}-${state.date}`];
  const game = state.dailyFantasy.items[`${pitcherId}-${state.date}`];

  const playerLogs = state.dailyFantasy.collections[pitcherId];
  const recentLogs = playerLogs && playerLogs.slice(playerLogs.length - 5).reverse();

  let opp;
  if (game) {
    opp = game.game.homeTeam.Abbreviation === game.team.Abbreviation ?
      game.game.awayTeam.Abbreviation : game.game.homeTeam.Abbreviation;
  }

  const position = pitcher && pitcher.player.Position;
  const team = pitcher && pitcher.team.Abbreviation;
  const playerName = pitcher && `${pitcher.player.FirstName} ${pitcher.player.LastName}`;
  const fantasyPoints = game && game.fantasyPoints;
  const salary = game && game.salary;

  return {
    opp,
    position,
    team,
    playerName,
    fantasyPoints,
    salary,
    recentLogs,
    date: state.date,
  };
};

export default connect(mapStateToProps, { fetchPlayerGameLogs })(Pitchers);
