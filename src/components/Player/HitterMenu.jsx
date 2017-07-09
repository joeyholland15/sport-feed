import React, { Component } from 'react';
import { connect } from 'react-redux';
import { playerStatSelector } from '../../selectors/PlayerSelector';
import './HitterMenu.scss';

class HitterMenu extends Component {
  static propTypes = {
    categories: React.PropTypes.shape(),
    logs: React.PropTypes.arrayOf(React.PropTypes.shape()),
    stats: React.PropTypes.shape(),
  }

  static defaultProps = {
    categories: undefined,
    logs: undefined,
    stats: undefined,
  }

  render() {
    const {
      categories,
      logs,
    } = this.props;

    const stats = this.props.stats && Object.keys(this.props.stats).sort((first, second) => {
      const firstObj = this.props.stats[first];
      const secondObj = this.props.stats[second];

      return secondObj.percentile - firstObj.percentile;
    })

    return (
      <div className="player-menu-container">
        <div>
          {stats && stats.map((statId) => {
            const stat = this.props.stats[statId];

            return (
              <div key={statId} style={{ display: 'flex' }}>
                <div style={{ flex: 6 }}>{statId}</div>
                <div style={{ flex: 2 }}>{Math.round(Number(stat['#text']) * 1000) / 1000}</div>
                <div style={{ flex: 2 }}>{Math.round(Number(stat.percentile) * 1000) / 1000}</div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, { playerId }) => {
  const categories = state.players.items[playerId] && state.players.items[playerId].categories;
  const logs = state.players.items[playerId] && state.players.items[playerId].logs;
  const stats = playerStatSelector(state, playerId);

  return {
    categories,
    logs,
    stats,
  };
};

export default connect(mapStateToProps)(HitterMenu);
