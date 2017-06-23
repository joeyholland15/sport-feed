import React, { Component } from 'react';
import { connect } from 'react-redux';
import styles from './DatePicker.scss';
import { setDate } from '../../actions';

class DatePicker extends Component {
  changeDate = (event) => {
    const date = event.target.value.split('-').join('');
    this.props.setDate(date);
  }

  render() {
    return (
      <div className="date">
        <label>Date</label>
        <input type="date" onChange={this.changeDate} />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  date: state.date,
});

export default connect(mapStateToProps, { setDate })(DatePicker);
