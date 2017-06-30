import React, { Component } from 'react';
import { connect } from 'react-redux';
import PlayerLogHeader from './PlayerLogHeader';
import PlayerGamelog from './PlayerGamelog';
import HitterGamelogContainer from './HitterGamelogContainer';
import './Player.scss';

class PlayerGamelogs extends Component {
  static propTypes = {
    playerId: React.PropTypes.string.isRequired,
    playerLogs: React.PropTypes.arrayOf(React.PropTypes.shape()),
  }

  static defaultProps = {
    playerLogs: undefined,
  }

  render() {
    return (
      <HitterGamelogContainer playerId={this.props.playerId}>
        <div className="player-body">
          {this.props.playerLogs && (
            <div className="player-logs">
              <PlayerLogHeader />
              {this.props.playerLogs.map((game, idx) => (
                <PlayerGamelog key={game.game.id} game={game} totalGames={idx} />
              ))}
            </div>
          )}
        </div>
      </HitterGamelogContainer>
    );
  }
}

const mapStateToProps = (state, { playerId }) => ({
  playerLogs: state.players.items[playerId] && state.players.items[playerId].logs,
});

export default connect(mapStateToProps)(PlayerGamelogs);
