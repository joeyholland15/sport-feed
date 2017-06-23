import React, { Component } from 'react';
import { connect } from 'react-redux';
import { removePlayerFromLineup } from '../../actions';
import styles from './LineupAdd.scss';

class LineupRemove extends Component {
  remove = () => this.props.removePlayerFromLineup(this.props.gameId);

  render() {
    return (
      <div className="add" onClick={this.remove}>-</div>
    );
  }
}

export default connect(null, { removePlayerFromLineup })(LineupRemove);
