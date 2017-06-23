import React, { Component } from 'react';
import { connect } from 'react-redux';
import styles from './GameModal.scss';
import { logos } from '../../constants/logosByTeam';

class GameModalStatItem extends Component {
  beautifySalary = (salary) => {
    if (!salary) {
      return null;
    }

    const salaryCharacters = salary.toString().split('');
    salaryCharacters.splice(salaryCharacters.length - 3, 0, ',');
    return `$${salaryCharacters.join('')}`;
  }

  render() {
    const {
      name,
      position,
      salary,
      fantasyPoints,
      slot,
      isPitcher,
    } = this.props;

    if (isNaN(fantasyPoints)) {
      return null;
    }

    return (
      <div className={`stat-item ${isPitcher ? 'pitcher-item' : ''}`}>
        {slot && <div>{slot}</div>}
        <div>{position}</div>
        <div className="stat-item-name">{name}</div>
        <div>{this.beautifySalary(salary)}</div>
        <div>{fantasyPoints}</div>
      </div>
    );
  }
}

const mapStateToProps = (state, { playerId, date }) => {
  const playerdfs = state.dailyFantasy.items[`${playerId}-${date}`];
  const playerKey = `${playerId}-${date}`;

  const name = playerdfs && `${playerdfs.player.FirstName} ${playerdfs.player.LastName}`;
  const position = playerdfs && playerdfs.player.Position;

  return {
    salary: playerdfs && playerdfs.salary,
    fantasyPoints: playerdfs && playerdfs.fantasyPoints,
    name,
    position,
  };
};

export default connect(mapStateToProps)(GameModalStatItem);
