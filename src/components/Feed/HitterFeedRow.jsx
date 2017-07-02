import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import './Feed.scss';
import { logos } from '../../constants/logosByTeam';

class HitterFeedRow extends Component {
  render() {
    const {
      hitter,
    } = this.props;

    const playerName = `${hitter.player.FirstName} ${hitter.player.LastName}`;
    return (
      <div className="feed-row">
        <div className="feed-row-cell">{hitter.player.Position}</div>
        <div className="feed-row-name">
          <div className="hitter-team-logo">
            <img alt="" src={`${logos[hitter.team.Abbreviation]}`} />
          </div>
          <div className="hitter-team-row">
            <Link to={`hitter/${this.props.playerId}`}>{playerName}</Link>
          </div>
          <div className="feed-row-cell">{Math.round(hitter.pointsPerGame * 1000) / 1000}</div>
          <div className="feed-row-cell">{hitter.stats.GamesPlayed['#text']}</div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, { playerId }) => {
  const hitter = state.players.items[playerId];

  return {
    hitter,
  };
};

export default connect(mapStateToProps)(HitterFeedRow);
