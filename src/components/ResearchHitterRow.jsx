import React, { Component } from 'react';
import { connect } from 'react-redux';
import styles from './Research.scss';
import { playerLogSelector } from '../selectors/ResearchSelectors';

class ResearchHitterRow extends Component {
  render() {
    const {
      hitterId,
      logs,
      name,
    } = this.props;

    if (hitterId === '10495') {
      // console.log('LOGS', logs);
    }

    const placeholderCount = (logs && 25 - logs.length) || 0;
    const placeholders = [];
    for (var i = 0; i < placeholderCount; i++) {
      placeholders.push('-');
    }

    return (
      <div className="research-row">
        <div className="research-name">{name}</div>
        {placeholders && placeholders.map((dnp, idx) => (
          <div key={idx} className="research-points">{dnp}</div>
        ))}
        {logs && logs.map((game, idx) => {
          let className = 'research-points';

          if (game.isSparq) {
            className = `${className} sparq`;
          }

          if (game.points < 8) {
            className = `${className} bad`;
          }

          if (game.points >= 16) {
            className = `${className} bomb`;
          }
          return <div key={idx} className={className}>{game.points}</div>
        })}
      </div>
    );
  }
}

const mapStateToProps = (state, { hitterId }) => {
  const playerData = playerLogSelector(state, hitterId);
  return {
    logs: playerData && playerData.log,
    name: playerData && playerData.playerName,
  };
};

export default connect(mapStateToProps)(ResearchHitterRow);
