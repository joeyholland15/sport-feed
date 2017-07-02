import React from 'react';
import { connect } from 'react-redux';
import { fetchAllCumulativeStats } from '../../actions/PlayerActions';

export class CumulativeStatContainer extends React.Component {
  static propTypes = {
    fetchAllCumulativeStats: React.PropTypes.func.isRequired,
    children: React.PropTypes.node.isRequired,
    stats: React.PropTypes.bool,
  }

  static defaultProps = {
    stats: true,
  }

  componentDidMount() {
    if (!this.props.stats) {
      this.props.fetchAllCumulativeStats();
    }
  }

  render() {
    return this.props.children;
  }
}

const mapStateToProps = state => ({
  stats: Object.keys(state.players.items).length > 0,
});

export default connect(mapStateToProps, { fetchAllCumulativeStats })(CumulativeStatContainer);
