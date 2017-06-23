import React, { Component } from 'react';
import { connect } from 'react-redux';
import styles from '../Feed/Teams.scss';
import { logos } from '../../constants/logosByTeam';
import { teamAverageSelector, teamTrendSelector } from '../../selectors/FeedSelectors';
import { fetchBoxScore } from '../../actions';
import GameModal from './GameModal';

class GameTrendTile extends Component {
  state = {
    isModalOpen: false,
  }

  formatScoreCell = (score, result) => {
    if (this.props.isToday) {
      return 'medium';
    }

    let className = '';

    if (score >= 8 && result === 'W') {
      return 'win-high';
    }

    if (score >= 5 && result === 'W') {
      return 'win-medium';
    }

    if (score < 3 && result === 'L') {
      return 'loss-low';
    }

    if (score < 5 && result === 'L') {
      return 'loss-medium';
    }

    if (result === 'W') {
      className = 'win';
    } else {
      className = 'loss';
    }

    return className;
  }

  toggleModal = () => this.setState({ isModalOpen: !this.state.isModalOpen }, () => {
    this.props.fetchBoxScore(this.props.gameId.split('-')[1]);
  });

  render() {
    return (
      <div
        className={`${this.formatScoreCell(this.props.runs, this.props.result)} score-cell ${this.props.isToday ? 'today' : ''}`}
        onClick={this.toggleModal}
      >
        {`${this.props.runs}`}
        <GameModal
          isOpen={this.state.isModalOpen}
          onRequestClose={this.toggleModal}
          gameId={this.props.gameId}
        />
      </div>
    );
  }
}

const mapStateToProps = (state, { gameId, isToday }) => {
  const game = state.games.items[gameId];

  const runs = game && parseInt(game.stats.Runs['#text']);
  const runsAgainst = game && parseInt(game.stats.RunsAgainst['#text']);
  const result = runs > runsAgainst ? 'W' : 'L';
  const date = game && parseInt(game.game.date.split('-').join(''));

  return {
    runs,
    runsAgainst,
    date,
    result,
  };
}

export default connect(mapStateToProps, { fetchBoxScore })(GameTrendTile);
