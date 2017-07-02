import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchStatsByDate } from '../../actions';
import { previousDay, nextDay } from '../../constants/date';

class RecentHitterContainer extends Component {
  componentWillMount() {
    this.fetchLastWeek(this.props.date);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.date !== nextProps.date) {
      this.fetchLastWeek(nextProps.date);
    }
  }

  fetchLastWeek = (date) => {
    const dates = [];
    let nextDate = previousDay(date);
    for (var i = 0; i < 8; i++) {
      if (!this.props.dfsCollections[date]) {
        dates.push(nextDate);
      }
      nextDate = previousDay(nextDate);
    }
    const promises = dates.map(day => this.props.fetchStatsByDate(day));
    return Promise.all(promises);
  }

  render() {
    return null;
  }
}

const mapStateToProps = state => ({
  dfsCollections: state.dailyFantasy.collections,
  date: state.date,
});

export default connect(mapStateToProps, { fetchStatsByDate })(RecentHitterContainer);
