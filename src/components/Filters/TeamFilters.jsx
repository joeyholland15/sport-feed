import React, { Component } from 'react';
import { connect } from 'react-redux';
import TileMenu from '../Menu/TileMenu';
import { setTeamFilter } from '../../actions';
import { mlbDivisions } from '../../constants/divisions';

const HEADERS = ['1st', '2nd', '3rd', '4th', '5th'];

class TeamFilters extends Component {
  render() {
    return (
      <TileMenu
        headers={HEADERS}
        label="Division"
        categories={mlbDivisions}
        onClick={this.props.setTeamFilter}
        selected={this.props.selected}
      />
    );
  }
}

const mapStateToProps = state => ({
  selected: state.filters.teams,
});

export default connect(mapStateToProps, { setTeamFilter })(TeamFilters);
