import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addPlayerToLineup } from '../../actions';
import styles from './LineupAdd.scss';

class LineupAdd extends Component {
  add = () => this.props.addPlayerToLineup(this.props.gameId);

  render() {
    return (
      <div className="add" onClick={this.add}>+</div>
    );
  }
}

export default connect(null, { addPlayerToLineup })(LineupAdd);
