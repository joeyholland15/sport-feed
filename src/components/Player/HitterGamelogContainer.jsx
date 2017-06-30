import React from 'react';
import { connect } from 'react-redux';
import { fetchHitterGamelogs } from '../../actions/PlayerActions';

export class HitterGamelogContainer extends React.Component {
  static propTypes = {
    fetchHitterGamelogs: React.PropTypes.func.isRequired,
    playerId: React.PropTypes.string.isRequired,
    children: React.PropTypes.node.isRequired,
    playerLogData: React.PropTypes.bool,
  }

  static defaultProps = {
    playerLogData: true,
  }

  componentDidMount() {
    if (!this.props.playerLogData) {
      this.props.fetchHitterGamelogs(this.props.playerId);
    }
  }

  render() {
    return this.props.children;
  }
}

const mapStateToProps = (state, { playerId }) => ({
  playerLogData: !!state.players.items[playerId] && !!state.players.items[playerId].logs,
});

export default connect(mapStateToProps, { fetchHitterGamelogs })(HitterGamelogContainer);
