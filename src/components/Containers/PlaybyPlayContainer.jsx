import React from 'react';
import { connect } from 'react-redux';
import { fetchPlayByPlay } from '../../actions/GameActions';

export class PlaybyPlayContainer extends React.Component {
  static propTypes = {
    fetchPlayByPlay: React.PropTypes.func.isRequired,
    gameId: React.PropTypes.string.isRequired,
    children: React.PropTypes.node.isRequired,
    playbyPlayData: React.PropTypes.bool,
  }

  static defaultProps = {
    playbyPlayData: true,
  }

  componentDidMount() {
    if (!this.props.playbyPlayData) {
      this.props.fetchPlayByPlay(this.props.gameId);
    }
  }

  render() {
    return this.props.children;
  }
}

const mapStateToProps = (state, { gameId }) => ({
  playbyPlayData: !!state.gameLineups.items[gameId],
});

export default connect(mapStateToProps, { fetchPlayByPlay })(PlaybyPlayContainer);
