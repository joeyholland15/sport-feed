import React, { Component } from 'react';
import { connect } from 'react-redux';
import HitterMenuSection from './HitterMenuSection';
import './HitterMenu.scss';

class HitterMenu extends Component {
  static propTypes = {
    categories: React.PropTypes.shape(),
    logs: React.PropTypes.arrayOf(React.PropTypes.shape()),
  }

  static defaultProps = {
    categories: undefined,
    logs: undefined,
  }

  render() {
    const {
      categories,
      logs,
    } = this.props;

    const gamesWithoutRecentSparq = logs && logs.filter(game => !game.recentSparq).length;
    const bombsWithoutRecentSparq = logs &&
      logs.filter(game => !game.recentSparq && game.points >= 14).length;

    const gamesNotInStreak = logs && logs.filter(game => !game.inStreak).length;
    const bombsNotInStreak = logs &&
      logs.filter(game => !game.inStreak && game.points >= 14).length;

    const gamesWithRecentSparq = logs && logs.filter(game => game.recentSparq).length;
    const bombsWithRecentSparq = logs &&
      logs.filter(game => game.recentSparq && game.points >= 14).length;

    return (
      <div className="player-menu-container">
        <div>{`${(bombsWithRecentSparq / gamesWithRecentSparq).toFixed(3)} (${bombsWithRecentSparq} / ${gamesWithRecentSparq})`}</div>
        <div>{`${(bombsWithoutRecentSparq / gamesWithoutRecentSparq).toFixed(3)} (${bombsWithoutRecentSparq} / ${gamesWithoutRecentSparq})`}</div>
        <div>{`${(bombsNotInStreak / gamesNotInStreak).toFixed(3)} (${bombsNotInStreak} / ${gamesNotInStreak})`}</div>
        {categories && Object.keys(categories).map((category) => {
          const stats = categories[category];
          return (
            <HitterMenuSection key={category} category={category} stats={stats} />
          );
        })}
      </div>
    );
  }
}

const mapStateToProps = (state, { playerId }) => {
  const categories = state.players.items[playerId] && state.players.items[playerId].categories;
  const logs = state.players.items[playerId] && state.players.items[playerId].logs;

  return {
    categories,
    logs,
  };
};

export default connect(mapStateToProps)(HitterMenu);
