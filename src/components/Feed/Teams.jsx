import React, { Component } from 'react';
import { connect } from 'react-redux';
import styles from './Teams.scss';
import { logos } from '../../constants/logosByTeam';
import { teamTrendSelector, teamPowerSelector } from '../../selectors/FeedSelectors';
import { fetchTeamHistory } from '../../actions';
import GameTrendTile from '../Games/GameTrendTile';

class Teams extends Component {
  render() {
    return (
      <div>
        {this.props.teamPower && this.props.teamPower.map((teamRating) => {
          const team = teamRating.team;
          const teamTrends = this.props.teamTrends[team];

          if (!teamTrends.today) {
            return null;
          }

          return (
            <div key={teamRating.team} className="team-average-row">
              <div>
                <img alt="" src={`${logos[teamRating.team]}`} />
              </div>
              <div>{Math.round(teamRating.recentRating * 100) / 100}</div>
              <div>{Math.round((teamRating.recentRating / teamRating.seasonRating) * 100) / 100}</div>
              {/* <div>{Math.round(teamRating.seasonRunsPerGame * 100) / 100}</div> */}
              {/* <div>{Math.round(teamRating.highGamePercentage * 100) / 100}</div>
              <div>{Math.round(teamRating.lowGamePercentage * 100) / 100}</div> */}
              {teamTrends && teamTrends.future && teamTrends.future.map((gameId, idx) => (
                <GameTrendTile key={gameId} gameId={gameId} team={team} />
              ))}
              {teamTrends && (
                <GameTrendTile
                  gameId={teamTrends.today}
                  team={team}
                  isToday
                />
              )}
              {teamTrends && teamTrends.history && teamTrends.history.map((gameId, idx) => (
                <GameTrendTile key={gameId} gameId={gameId} team={team} />
              ))}
            </div>
          );
        })}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  teamTrends: teamTrendSelector(state),
  teamPower: teamPowerSelector(state, state.date),
});

export default connect(mapStateToProps, { fetchTeamHistory })(Teams);
