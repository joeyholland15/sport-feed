import React from 'react';
import { connect } from 'react-redux';
import { fetchCumulativeStats } from '../../actions/PlayerActions';

export class HitterStatContainer extends React.Component {
  static propTypes = {
    fetchCumulativeStats: React.PropTypes.func.isRequired,
    playerId: React.PropTypes.string.isRequired,
    children: React.PropTypes.node.isRequired,
    playerData: React.PropTypes.bool,
  }

  static defaultProps = {
    playerData: true,
  }

  componentDidMount() {
    if (!this.props.playerData) {
      this.props.fetchCumulativeStats(this.props.playerId);
    }
  }

  render() {
    return this.props.children;
  }
}

const mapStateToProps = (state, { playerId }) => ({
  playerData: !!state.players.items[playerId] && !!state.players.items[playerId].player,
});

export default connect(mapStateToProps, { fetchCumulativeStats })(HitterStatContainer);
