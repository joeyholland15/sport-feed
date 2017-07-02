import React from 'react';
import { connect } from 'react-redux';
import { fetchDivisionStandings } from '../../actions/LeagueActions';

export class StandingsContainer extends React.Component {
  static propTypes = {
    fetchDivisionStandings: React.PropTypes.func.isRequired,
    children: React.PropTypes.node.isRequired,
    boxScoreData: React.PropTypes.bool,
  }

  static defaultProps = {
    boxScoreData: true,
  }

  componentDidMount() {
    if (!this.props.boxScoreData) {
      this.props.fetchDivisionStandings();
    }
  }

  render() {
    return this.props.children;
  }
}

const mapStateToProps = (state, { gameId }) => ({
  boxScoreData: !!state.boxScores.items[gameId],
});

export default connect(mapStateToProps, { fetchDivisionStandings })(StandingsContainer);
