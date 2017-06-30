import React from 'react';
import { connect } from 'react-redux';
import { fetchBoxScore } from '../../actions/GameActions';

export class BoxScoreContainer extends React.Component {
  static propTypes = {
    fetchBoxScore: React.PropTypes.func.isRequired,
    gameId: React.PropTypes.string.isRequired,
    children: React.PropTypes.node.isRequired,
    boxScoreData: React.PropTypes.bool,
  }

  static defaultProps = {
    boxScoreData: true,
  }

  componentDidMount() {
    if (!this.props.boxScoreData) {
      this.props.fetchBoxScore(this.props.gameId);
    }
  }

  render() {
    return this.props.children;
  }
}

const mapStateToProps = (state, { gameId }) => ({
  boxScoreData: !!state.boxScores.items[gameId],
});

export default connect(mapStateToProps, { fetchBoxScore })(BoxScoreContainer);
