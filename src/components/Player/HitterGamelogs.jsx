import React, { Component } from 'react';
import { connect } from 'react-redux';
import HitterLogHeader from './HitterLogHeader';
import HitterGamelog from './HitterGamelog';
import HitterHighlights from './HitterHighlights';
import HitterGamelogContainer from './HitterGamelogContainer';
import './Hitter.scss';

class HitterGamelogs extends Component {
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
              <HitterHighlights playerId={this.props.playerId} />
              <HitterLogHeader />
              {this.props.playerLogs.map((game, idx) => (
                <HitterGamelog key={game.game.id} game={game} totalGames={idx} />
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

export default connect(mapStateToProps)(HitterGamelogs);
