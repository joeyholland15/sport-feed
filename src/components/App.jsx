import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import TileMenu from './Menu/TileMenu';
import PositionFilters from './Filters/PositionFilters';
import SalaryFilters from './Filters/SalaryFilters';
import TeamFilters from './Filters/TeamFilters';
import LineupMenu from './Lineups/LineupMenu';
import Scoreboard from './Scoreboard/Scoreboard';
import HitterPitcherFilters from './Filters/HitterPitcherFilters';
import DatePicker from './Date/DatePicker';
import Feed from './Feed/Feed';
import RecentHitterContainer from './Feed/RecentHitterContainer';
import HitterFutureContainer from './Feed/HitterFutureContainer';
import styles from './App.scss';
import { fetchStatsByDate, fetchDailyStatsByDate, fetchTeamGameLogs } from '../actions';
import { previousDay, nextDay } from '../constants/date';
import { gameLogTeams } from '../constants/mlbTeams';

class App extends Component {
  componentWillMount() {
    this.props.fetchDailyStatsByDate(this.props.date);
    this.props.fetchStatsByDate(this.props.date);
  }

  componentDidMount() {
    this.props.fetchTeamGameLogs(gameLogTeams.join(','));
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.date !== nextProps.date) {
      this.props.fetchStatsByDate(nextProps.date);
      this.props.fetchDailyStatsByDate(nextProps.date);
    }
  }

  render() {
    return (
      <div className="app">
        <RecentHitterContainer date={this.props.date} />
        <HitterFutureContainer date={this.props.date} />
        <div className="menu-container">
          <DatePicker />
          <TeamFilters />
          <SalaryFilters />
          {this.props.active === 'Hitters' && <PositionFilters />}
          <Scoreboard />
          <LineupMenu />
        </div>
        <div className="content-container">
          <div className="content-filters">
            <HitterPitcherFilters />
          </div>
          <Feed />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  active: state.filters.selected,
  date: state.date,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  fetchStatsByDate,
  fetchDailyStatsByDate,
  fetchTeamGameLogs,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(App);
