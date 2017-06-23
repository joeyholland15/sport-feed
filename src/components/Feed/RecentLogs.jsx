import React, { Component } from 'react';
import { connect } from 'react-redux';
import styles from './Feed.scss';

class RecentLogs extends Component {
  calculatePoints = (game) => {
    if (!game || !game.stats) {
      return 0;
    }
    const inningsPitched = parseInt(game.stats.InningsPitched['#text']) * 2.25;
    const earnedRuns = parseInt(game.stats.EarnedRunsAllowed['#text']) * -2;
    const wins = parseInt(game.stats.Wins['#text']) * 4;
    const walks = parseInt(game.stats.PitcherWalks['#text']) * -0.6;
    const strikeouts = parseInt(game.stats.PitcherStrikeouts['#text']) * 2;
    const hits = parseInt(game.stats.HitsAllowed['#text']) * -0.6;
    return inningsPitched + earnedRuns + wins + walks + strikeouts + hits;
  }

  render() {
    const {
      recentLogs,
    } = this.props;

    return (
      <div>
        {recentLogs && recentLogs.map((game) => {
          return (
            <div key={game.game.id} className="recent-row">
              <div>{`${game.game.date}`}</div>
              <div>{`${this.calculatePoints(game)}`}</div>
            </div>
          )
        })}
      </div>
    );
  }
}

const mapStateToProps = (state, { pitcherId }) => {
  const playerLogs = state.dailyFantasy.collections[pitcherId];
  const recentLogs = playerLogs && playerLogs.slice(playerLogs.length - 6, playerLogs.length - 1).reverse();

  return {
    recentLogs,
  };
};

export default connect(mapStateToProps)(RecentLogs);
