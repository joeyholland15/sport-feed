import React from 'react';
import { connect } from 'react-redux';
import { fetchCumulativeStats } from '../../actions/PlayerActions';

export class PlayerStatContainer extends React.Component {
  static propTypes = {
    fetchCumulativeStats: React.PropTypes.func.isRequired,
    children: React.PropTypes.node.isRequired,
    stats: React.PropTypes.bool,
  }

  static defaultProps = {
    stats: false,
  }

  componentDidMount() {
    if (!this.props.stats) {
      this.props.fetchCumulativeStats(this.props.playerId);
    }
  }

  render() {
    return this.props.children;
  }
}

const mapStateToProps = (state, { playerId }) => ({
  stats: state.players.items[playerId] && state.players.items[playerId].pointsPerGame !== undefined,
});

export default connect(mapStateToProps, { fetchCumulativeStats })(PlayerStatContainer);
