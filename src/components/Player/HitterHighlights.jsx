import React, { Component } from 'react';
import { connect } from 'react-redux';
import './HitterHighlights.scss';

class HitterHighlights extends Component {
  static propTypes = {
    stats: React.PropTypes.shape(),
  }

  static defaultProps = {
    stats: undefined,
  }

  render() {
    return (
      <div className="highlights-container">
        {this.props.stats && Object.keys(this.props.stats).map((statId) => {
          const stat = this.props.stats[statId];

          return (
            <div key={statId} className="highlight">
              <div className="highlight-category">{stat['@abbreviation'] || 'PPG'}</div>
              <div className="highlight-value">{stat['#text'] || stat}</div>
            </div>
          );
        })}
      </div>
    );
  }
}

const mapStateToProps = (state, { playerId }) => {
  const player = state.players.items[playerId];
  const categories = player && player.categories.Highlights;

  return {
    stats: {
      ...categories,
      pointsPerGame: player && (Math.round(player.pointsPerGame * 1000) / 1000),
    },
  };
};

export default connect(mapStateToProps)(HitterHighlights);
