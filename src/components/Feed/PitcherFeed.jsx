import React, { Component } from 'react';
import { connect } from 'react-redux';
import CumulativeStatContainer from '../Containers/CumulativeStatContainer';
import PitcherFeedRow from './PitcherFeedRow';
import { pitcherFeedSelector } from '../../selectors/PitcherSelector';
import './HitterFeed.scss';

class PitcherFeed extends Component {
  static propTypes = {
    pitchers: React.PropTypes.arrayOf(React.PropTypes.string),
  }

  static defaultProps = {
    pitchers: undefined,
  }

  render() {
    return (
      <CumulativeStatContainer>
        <div>
          {this.props.pitchers && this.props.pitchers.map(playerId => (
            <PitcherFeedRow key={playerId} playerId={playerId} />
          ))}
        </div>
      </CumulativeStatContainer>
    );
  }
}

const mapStateToProps = state => ({
  pitchers: pitcherFeedSelector(state),
});

export default connect(mapStateToProps)(PitcherFeed);
