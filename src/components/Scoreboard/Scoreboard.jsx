import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchScoreboard } from '../../actions';
import styles from './Scoreboard.scss';

class Scoreboard extends Component {
  componentWillMount() {
    // call to scoreboard
    this.props.fetchScoreboard(this.props.date);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.date !== nextProps.date) {
      this.props.fetchScoreboard(nextProps.date)
    }
  }

  render() {
    return (
      <div className="scoreboard">
        {this.props.scoreboard && this.props.scoreboard.map(score => (
          <div key={score.game.ID} className="score">
            <div>
              <span className="team-name">{`${score.game.awayTeam.Abbreviation} @`}</span>
              <span className="team-score">{score.awayScore}</span>
            </div>
            <div>
              <span className="team-name">{score.game.homeTeam.Abbreviation}</span>
              <span className="team-score">{score.homeScore}</span>
            </div>
          </div>
        ))}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  date: state.date,
  scoreboard: state.scoreboard,
});

// const mapDispatchToProps = dispatch => bindActionCreators({
//   fetchStatsByDate,
//   fetchTeamHistory,
//   scrapeStats,
// }, dispatch);

export default connect(mapStateToProps, { fetchScoreboard })(Scoreboard);
