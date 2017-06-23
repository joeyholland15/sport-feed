import React, { Component } from 'react';
import { connect } from 'react-redux';
import { clearLineup } from '../../actions';

class LineupClear extends Component {
  render() {
    return (
      <button onClick={this.props.clearLineup}>Reset Lineup</button>
    );
  }
}

export default connect(null, { clearLineup })(LineupClear);
