import React, { Component } from 'react';
import { connect } from 'react-redux';
import './InjuryReport.scss';

class InjuryReport extends Component {
  static propTypes = {
    injury: React.PropTypes.string,
    player: React.PropTypes.shape(),
  }

  static defaultProps = {
    injury: undefined,
    player: undefined,
  }

  render() {
    return (
      <div className="injury">
        <div className="injury-player">{this.props.player && `${this.props.player.FirstName} ${this.props.player.LastName}`}</div>
        <div className="injury-description">{this.props.injury}</div>
      </div>
    );
  }
}

const mapStateToProps = (state, { playerId }) => ({
  player: state.players.items[playerId] && state.players.items[playerId].player,
  injury: state.injuries.items[playerId],
});

export default connect(mapStateToProps)(InjuryReport);
