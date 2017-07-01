import React, { Component } from 'react';
import { connect } from 'react-redux';
import PitcherLogHeader from './PitcherLogHeader';
import PitcherGamelog from './PitcherGamelog';
import PitcherGamelogContainer from './PitcherGamelogContainer';
import './Hitter.scss';

class PitcherGamelogs extends Component {
  static propTypes = {
    playerId: React.PropTypes.string.isRequired,
    playerLogs: React.PropTypes.arrayOf(React.PropTypes.shape()),
  }

  static defaultProps = {
    playerLogs: undefined,
  }

  render() {
    return (
      <PitcherGamelogContainer playerId={this.props.playerId}>
        <div className="player-body">
          {this.props.playerLogs && (
            <div className="player-logs">
              <PitcherLogHeader />
              {this.props.playerLogs.map(game => (
                <PitcherGamelog key={game.game.id} game={game} />
              ))}
            </div>
          )}
        </div>
      </PitcherGamelogContainer>
    );
  }
}

const mapStateToProps = (state, { playerId }) => ({
  // TODO: move filtering to selector
  playerLogs: state.players.items[playerId] &&
    state.players.items[playerId].logs &&
    state.players.items[playerId].logs.filter(game => game.stats.InningsPitched['#text'] !== '0.0'),
});

export default connect(mapStateToProps)(PitcherGamelogs);
