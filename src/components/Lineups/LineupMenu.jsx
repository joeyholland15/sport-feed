import React, { Component } from 'react';
import { connect } from 'react-redux';
import LineupItem from './LineupItem';
import LineupClear from './LineupClear';
import styles from './LineupMenu.scss';

class LineupMenu extends Component {
  render() {
    return (
      <div className="lineups">
        <div className="linuep-title">Lineup</div>
        <div className="lineup-menu-body">
          {!this.props.lineup.length && (
            <div className="lineup-menu-placeholder">
              Use the + icon to add players to your daily lineup.
            </div>
          )}
          {this.props.lineup.map(gameId => (
            <LineupItem key={gameId} gameId={gameId} />
          ))}
        </div>
        <div className="lineup-clear">
          <LineupClear />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  lineup: state.lineup,
});

export default connect(mapStateToProps)(LineupMenu);
