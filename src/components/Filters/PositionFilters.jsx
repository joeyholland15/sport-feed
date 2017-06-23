import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setPositionFilter } from '../../actions';
import styles from './PositionFilters.scss';

const HITTER_POSTIONS = ['C', '1B', '2B', '3B', 'SS', 'OF', 'All'];

class PositionFilters extends Component {
  state = {
    count: 0,
    selected: {
      C: false,
      '1B': false,
      '2B': false,
      '3B': false,
      SS: false,
      OF: false,
    },
  }

  handleClick = position => this.props.setPositionFilter(position);

  render() {
    return (
      <div className="filters">
        {HITTER_POSTIONS.map(position => (
          <div
            key={position}
            className={`filter ${this.props.selected[position] ? 'selected' : ''}`}
            onClick={() => { this.handleClick(position); }}
          >
            {position}
          </div>
        ))}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  selected: state.filters.positions,
});

export default connect(mapStateToProps, { setPositionFilter })(PositionFilters);
