import React, { Component } from 'react';
import { connect } from 'react-redux';
import LineupRemove from './LineupRemove';
import styles from './LineupItem.scss';

class LineupItem extends Component {
  render() {
    if (!this.props.game) {
      return null;
    }

    return (
      <div className="item">
        <div style={{ flex: 1 }}>{this.props.game.position}</div>
        <div style={{ flex: 6 }}>{this.props.game.name}</div>
        <div style={{ flex: 2 }}>{this.props.game.salary}</div>
        <div style={{ flex: 1 }}>
          <LineupRemove gameId={this.props.gameId} />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, { gameId }) => ({
  game: state.feed.games[gameId],
});

export default connect(mapStateToProps)(LineupItem);
