import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PositionFilters from './Filters/PositionFilters';
import SalaryFilters from './Filters/SalaryFilters';
import TeamFilters from './Filters/TeamFilters';
import LineupMenu from './Lineups/LineupMenu';
import Scoreboard from './Scoreboard/Scoreboard';
import HitterPitcherFilters from './Filters/HitterPitcherFilters';
import DatePicker from './Date/DatePicker';
import Feed from './Feed/Feed';
import InjuryReport from './Feed/InjuryReport';
import './App.scss';
import { fetchStatsByDate, fetchDailyStatsByDate, fetchTeamGameLogs } from '../actions';
import { fetchAllCumulativeStats } from '../actions/PlayerActions';
import { gameLogTeams } from '../constants/mlbTeams';

class App extends Component {
  componentWillMount() {
    if (!this.props.loaded) {
      this.props.fetchDailyStatsByDate(this.props.date);
      this.props.fetchStatsByDate(this.props.date);
    }
  }

  componentDidMount() {
    if (!this.props.loaded) {
      this.props.fetchTeamGameLogs(gameLogTeams.join(','));
    }
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
        <div className="menu-container">
          <DatePicker />
          <TeamFilters />
          {/* <SalaryFilters /> */}
          {this.props.active === 'Hitters' && <PositionFilters />}
          {/* <Scoreboard /> */}
          {/* <LineupMenu /> */}
          {this.props.active === 'Hitters' && <InjuryReport />}
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
  loaded: !!Object.keys(state.pitchers.items).length,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  fetchStatsByDate,
  fetchDailyStatsByDate,
  fetchTeamGameLogs,
  fetchAllCumulativeStats,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(App);
