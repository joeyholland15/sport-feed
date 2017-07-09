import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PositionFilters from './Filters/PositionFilters';
import TeamFilters from './Filters/TeamFilters';
import HitterPitcherFilters from './Filters/HitterPitcherFilters';
import DatePicker from './Date/DatePicker';
import Feed from './Feed/Feed';
import InjuryReport from './Feed/InjuryReport';
import './App.scss';
import { fetchStatsByDate, fetchDailyStatsByDate, fetchTeamGameLogs } from '../actions';
import { fetchAllCumulativeStats } from '../actions/PlayerActions';

const App = ({
  active,
}) => (
  <div className="app">
    <div className="menu-container">
      <DatePicker />
      <TeamFilters />
      {active === 'Hitters' && <PositionFilters />}
      {active === 'Hitters' && <InjuryReport />}
    </div>
    <div className="content-container">
      <div className="content-filters">
        <HitterPitcherFilters />
      </div>
      <Feed />
    </div>
  </div>
);

App.propTypes = {
  active: React.PropTypes.string,
};

App.defaultProps = {
  active: 'Pitchers',
};

const mapStateToProps = state => ({
  active: state.filters.selected,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  fetchStatsByDate,
  fetchDailyStatsByDate,
  fetchTeamGameLogs,
  fetchAllCumulativeStats,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(App);
