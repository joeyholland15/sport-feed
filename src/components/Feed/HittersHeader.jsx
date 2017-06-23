import React, { Component } from 'react';
import { connect } from 'react-redux';
import styles from './PitchersHeader.scss';

class HittersHeader extends Component {
  render() {
    return (
      <div className="header-row">
        <div>Pos.</div>
        <div className="large">Player</div>
        <div>Points</div>
        <div>Salary</div>
        <div>Add</div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
}

export default connect(mapStateToProps)(HittersHeader);
