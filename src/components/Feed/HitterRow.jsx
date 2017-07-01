import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import styles from './Feed.scss';
import LineupAdd from '../Lineups/LineupAdd';
import HittersHeader from './HittersHeader';
import HitterHistory from './HitterHistory';
import HitterFuture from './HitterFuture';
import { logos } from '../../constants/logosByTeam';
import { feedHitterSelector } from '../../selectors/FeedSelectors';

class Hitters extends Component {
  beautifySalary = (salary) => {
    const salaryCharacters = salary.toString().split('');
    salaryCharacters.splice(salaryCharacters.length - 3, 0, ',');
    return `$${salaryCharacters.join('')}`;
  }

  render() {
    const {
      opp,
      position,
      team,
      playerName,
      fantasyPoints,
      salary,
      hitterId,
      rating,
    } = this.props;

    return (
      <div className="feed-row">
        <div className="feed-row-cell">{position}</div>
        <div className="feed-row-name">
          <div className="hitter-team-logo">
            <img alt="" src={`${logos[team]}`} />
          </div>
          <div className="hitter-team-row"><Link to={`hitter/${hitterId}`}>{playerName}</Link></div>
        </div>
        <div className="feed-row-cell">{((rating / salary) * 100).toFixed(2)}</div>
        <HitterHistory hitterId={hitterId} />
        <div className="feed-row-cell">{fantasyPoints}</div>
        <HitterFuture hitterId={hitterId} />
        <div className="feed-row-cell">{`${this.beautifySalary(salary)}`}</div>
        <div className="feed-row-cell">
          <LineupAdd gameId={this.props.hitterId} />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, { hitterId }) => {
  const hitter = state.hitters.items[`${hitterId}-${state.date}`];
  const game = state.dailyFantasy.items[`${hitterId}-${state.date}`];

  let opp;
  if (game) {
    opp = game.game.homeTeam.Abbreviation === game.team.Abbreviation ?
      game.game.awayTeam.Abbreviation : game.game.homeTeam.Abbreviation;
  }

  const position = hitter && hitter.player.Position;
  const team = hitter && hitter.team.Abbreviation;
  const playerName = hitter && `${hitter.player.FirstName} ${hitter.player.LastName}`;
  const fantasyPoints = game && game.fantasyPoints;
  const salary = game && game.salary;

  return {
    opp,
    position,
    team,
    playerName,
    fantasyPoints,
    salary,
  };
};

export default connect(mapStateToProps)(Hitters);
