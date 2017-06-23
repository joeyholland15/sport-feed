import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setSalaryFilterMin, setSalaryFilterMax } from '../../actions';
import styles from './SalaryFilters.scss';

const HITTER_POSTIONS = ['C', '1B', '2B', '3B', 'SS', 'OF'];

class SalaryFilters extends Component {
  state = {
    min: 0,
    max: 200000,
  }

  setSalaryFilterMin = event => this.props.setSalaryFilterMin(event.target.value);
  setSalaryFilterMax = event => this.props.setSalaryFilterMax(event.target.value);

  resetSalaryFilterMin = () => this.props.setSalaryFilterMin(null);
  resetSalaryFilterMax = () => this.props.setSalaryFilterMax(null);

  render() {
    return (
      <div className="container">
        <div className="input-container">
          <label>Min</label>
          <input
            type="number"
            min="2000"
            step="100"
            placeholder="Enter a minimum salary..."
            onBlur={this.setSalaryFilterMin}
          />
          <button onClick={this.resetSalaryFilterMin}>Reset</button>
        </div>
        <div className="input-container">
          <label>Max</label>
          <input
            type="number"
            min="2000"
            step="100"
            placeholder="Enter a maximum salary..."
            onBlur={this.setSalaryFilterMax}
          />
          <button onClick={this.resetSalaryFilterMin}>Reset</button>
        </div>
      </div>
    );
  }
}

export default connect(null, { setSalaryFilterMin, setSalaryFilterMax })(SalaryFilters);
