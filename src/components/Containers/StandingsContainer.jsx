import React from 'react';
import { connect } from 'react-redux';
import { fetchDivisionStandings } from '../../actions/LeagueActions';

export class StandingsContainer extends React.Component {
  static propTypes = {
    fetchDivisionStandings: React.PropTypes.func.isRequired,
    children: React.PropTypes.node.isRequired,
    standingsData: React.PropTypes.bool,
  }

  static defaultProps = {
    standingsData: true,
  }

  componentDidMount() {
    if (!this.props.standingsData) {
      this.props.fetchDivisionStandings();
    }
  }

  render() {
    return this.props.children;
  }
}

const mapStateToProps = (state, { gameId }) => ({
  standingsData: Object.keys(state.league.standings).length > 0,
});

export default connect(mapStateToProps, { fetchDivisionStandings })(StandingsContainer);
