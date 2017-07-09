import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import './Feed.scss';
import { logos } from '../../constants/logosByTeam';

class PitcherFeedRow extends Component {
  render() {
    const {
      pitcher,
    } = this.props;

    const playerName = `${pitcher.player.FirstName} ${pitcher.player.LastName}`;
    return (
      <div className="feed-row">
        <div className="feed-row-cell">{pitcher.player.Position}</div>
        <div className="feed-row-name">
          <div className="hitter-team-logo">
            <img alt="" src={`${logos[pitcher.team.Abbreviation]}`} />
          </div>
          <div className="hitter-team-row">
            <Link to={`pitcher/${this.props.playerId}`}>{playerName}</Link>
          </div>
          <div className="feed-row-cell">{Math.round(pitcher.pointsPerGame * 1000) / 1000}</div>
          <div className="feed-row-cell">{pitcher.stats.GamesPlayed['#text']}</div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, { playerId }) => {
  const pitcher = state.players.items[playerId];

  return {
    pitcher,
  };
};

export default connect(mapStateToProps)(PitcherFeedRow);
