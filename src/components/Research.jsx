import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import styles from './Research.scss';
import { fetchDfsForResearch } from '../actions';
import { previousDay, nextDay } from '../constants/date';
import { getHitterIds } from '../selectors/ResearchSelectors';
import ResearchHitterRow from './ResearchHitterRow';

const DATE_START = 20160403;
const DATE_END = 20160501;

class Research extends Component {
  componentWillMount() {
    let date = DATE_START; // opening day 2016 is 20160403
    const promises = [];

    while (date < DATE_END) {
      promises.push(this.props.fetchDfsForResearch(date));
      date = nextDay(date);
    }

    return Promise.all(promises);
  }

  render() {
    const title = `This research covers dates ${DATE_START} through ${DATE_END}`;
    const percentIso = 0.7380281690140845;
    const percentTrend = 0.2619718309859155;
    const gamesWithBombLastTwo = 1197;
    return (
      <div className="container">
        <h4>{title}</h4>
        <div>
          <div>{`Average Points for Hitters: ${this.props.totalPoints / this.props.totalGames}`}</div>
          <div>{`Percent total performances above 16: ${this.props.totalBombs / this.props.totalGames}`}</div>
          <div>{`Total Bombs: ${this.props.totalBombs}`}</div>
          <div>{`% Bombs that see 16+ in next game: ${0.27236580516898606}`}</div>
          <div>{`% Iso Bombs: ${percentIso}`}</div>
          <div>{`% Trend Bombs: ${percentTrend}`}</div>
          <div>{`% Cheap Bombs: ${this.props.cheapBombs / this.props.totalBombs}`}</div>
        </div>
        <div>
          {this.props.logs && this.props.logs.map(hitterId => (
            <ResearchHitterRow key={hitterId} hitterId={hitterId} />
          ))}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  logs: getHitterIds(state),
  totalGames: state.research.totalGames,
  totalPoints: state.research.totalPoints,
  totalBombs: state.research.totalBombs,
  cheapBombs: state.research.cheapBombs,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  fetchDfsForResearch,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Research);
