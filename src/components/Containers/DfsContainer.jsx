import React from 'react';
import { connect } from 'react-redux';
import { fetchStatsByDate } from '../../actions';

export class BoxScoreContainer extends React.Component {
  static propTypes = {
    fetchStatsByDate: React.PropTypes.func.isRequired,
    date: React.PropTypes.string.isRequired,
    children: React.PropTypes.node.isRequired,
    dfsData: React.PropTypes.bool,
  }

  static defaultProps = {
    dfsData: true,
  }

  componentDidMount() {
    if (!this.props.dfsData) {
      this.props.fetchStatsByDate(this.props.date);
    }
  }

  render() {
    return this.props.children;
  }
}

const mapStateToProps = (state, { date }) => ({
  dfsData: !!state.dailyFantasy.collections[date],
});

export default connect(mapStateToProps, { fetchStatsByDate })(BoxScoreContainer);
