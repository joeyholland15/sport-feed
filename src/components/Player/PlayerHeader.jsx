import React, { Component } from 'react';
import { connect } from 'react-redux';
import { logos } from '../../constants/logosByTeam';
import './Player.scss';

// Power Hitters generally have higher fly ball rates ~44%
// Contact hitters generally have GB rates close to 50%

class PlayerHeader extends Component {
  static propTypes = {
    jerseyNumber: React.PropTypes.string,
    name: React.PropTypes.string,
    position: React.PropTypes.string,
    team: React.PropTypes.string,
  }

  static defaultProps = {
    jerseyNumber: undefined,
    name: undefined,
    team: undefined,
    position: undefined,
  }

  render() {
    return (
      <div className="player-header">
        <div className="jersey-number">{this.props.jerseyNumber}</div>
        <div>{`${this.props.name} | ${this.props.position} | `}</div>
        <div>
          <img alt="" src={`${logos[this.props.team]}`} />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, { playerId }) => {
  const player = state.players.items[playerId] && state.players.items[playerId].player;
  const teamObj = state.players.items[playerId] && state.players.items[playerId].team;

  const jerseyNumber = player && player.JerseyNumber;
  const position = player && player.Position;
  const name = player && `${player.FirstName} ${player.LastName}`;
  const team = teamObj && teamObj.Abbreviation;

  return {
    jerseyNumber,
    position,
    name,
    team,
  };
};

export default connect(mapStateToProps)(PlayerHeader);
