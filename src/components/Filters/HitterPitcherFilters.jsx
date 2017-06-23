import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setFeedFilter } from '../../actions';
import styles from './HitterPitcherFilters.scss';

class HitterPitcherFilters extends Component {
  onPitcherClick = () => this.props.setFeedFilter('Pitchers');
  onHitterClick = () => this.props.setFeedFilter('Hitters');
  onTeamClick = () => this.props.setFeedFilter('Teams');

  render() {
    return (
      <div className="hitter-pitcher-filters">
        <div className={`${this.props.active === 'Pitchers' ? 'active' : ''}`} onClick={this.onPitcherClick}>Pitchers</div>
        <div className={`${this.props.active === 'Hitters' ? 'active' : ''}`} onClick={this.onHitterClick}>Hitters</div>
        <div className={`${this.props.active === 'Teams' ? 'active' : ''}`} onClick={this.onTeamClick}>Teams</div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  active: state.filters.selected,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  setFeedFilter,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(HitterPitcherFilters);
