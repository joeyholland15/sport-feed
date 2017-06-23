import React, { Component } from 'react';
import styles from './PitchersHeader.scss';

class PitchersHeader extends Component {
  render() {
    return (
      <div className="header-row">
        <div>Pos.</div>
        <div className="large">Player</div>
        <div>Points</div>
        <div>Salary</div>
        <div>Opp</div>
        <div>Add</div>
      </div>
    );
  }
}

export default PitchersHeader;
