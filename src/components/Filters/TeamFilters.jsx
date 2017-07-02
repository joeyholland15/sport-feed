import React, { Component } from 'react';
import { connect } from 'react-redux';
import TileMenu from '../Menu/TileMenu';
import { setTeamFilter } from '../../actions';
import StandingsContainer from '../Containers/StandingsContainer';

const HEADERS = ['1st', '2nd', '3rd', '4th', '5th'];

class TeamFilters extends Component {
  static propTypes = {
    setTeamFilter: React.PropTypes.func.isRequired,
    selected: React.PropTypes.shape().isRequired,
  }

  render() {
    return (
      <StandingsContainer>
        <TileMenu
          headers={HEADERS}
          label="Division"
          categories={this.props.standings}
          onClick={this.props.setTeamFilter}
          selected={this.props.selected}
        />
      </StandingsContainer>
    );
  }
}

const mapStateToProps = state => ({
  selected: state.filters.teams,
  standings: state.league.standings,
});

export default connect(mapStateToProps, { setTeamFilter })(TeamFilters);
