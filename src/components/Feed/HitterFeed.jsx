import React, { Component } from 'react';
import { connect } from 'react-redux';
import CumulativeStatContainer from '../Containers/CumulativeStatContainer';
import HitterFeedRow from './HitterFeedRow';
import { hitterFeedSelector } from '../../selectors/HitterSelector';
import './HitterFeed.scss';

class HitterFeed extends Component {
  static propTypes = {
    hitters: React.PropTypes.arrayOf(React.PropTypes.string),
  }

  static defaultProps = {
    hitters: undefined,
  }

  render() {
    return (
      <CumulativeStatContainer>
        <div>
          {this.props.hitters && this.props.hitters.map(playerId => (
            <HitterFeedRow key={playerId} playerId={playerId} />
          ))}
        </div>
      </CumulativeStatContainer>
    );
  }
}

const mapStateToProps = state => ({
  hitters: hitterFeedSelector(state),
});

export default connect(mapStateToProps)(HitterFeed);
