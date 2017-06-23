import React, { Component } from 'react';
import { connect } from 'react-redux';
import styles from './Feed.scss';
import { logos } from '../../constants/logosByTeam';
import { dailyHittersByRating } from '../../selectors/FeedSelectors';
import LineupAdd from '../Lineups/LineupAdd';
import HittersHeader from './HittersHeader';
import HitterRow from './HitterRow';

class Hitters extends Component {
  render() {
    let aboveTwenty = 0;
    let inTopTwenty = 0;
    const high = this.props.hitters && this.props.hitters.reduce((high, current, idx) => {
      if (current.points >= 18) {
        aboveTwenty += 1;
      }
      if (current.points >= 18 && idx <= 25) {
        inTopTwenty += 1;
      }
      return current.points > high ? current.points : high;
    }, 0);

    const total = this.props.hitters && this.props.hitters.length;

    return (
      <div>
        <HittersHeader />
        {this.props.hitters && this.props.hitters.map(hitter => (
          <HitterRow key={hitter.id} hitterId={hitter.id} rating={hitter.rating} />
        ))}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    hitters: dailyHittersByRating(state, state.date),
  };
};

export default connect(mapStateToProps)(Hitters);
