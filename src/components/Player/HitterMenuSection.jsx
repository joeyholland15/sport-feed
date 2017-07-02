import React, { Component } from 'react';
import { connect } from 'react-redux';
import './HitterMenuSection.scss';

class HitterMenuSection extends Component {
  static propTypes = {
    stats: React.PropTypes.shape().isRequired,
    category: React.PropTypes.string.isRequired,
  }

  render() {
    return (
      <div className="menu-section">
        <h4>{this.props.category}</h4>
        <div>
          {Object.keys(this.props.stats).map(stat => (
            <div key={stat} className="menu-section-row">
              <div className="menu-section-category">{stat}</div>
              <div className="menu-section-value">{this.props.stats[stat]['#text']}</div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, { playerId }) => {
  const categories = state.players.items[playerId] && state.players.items[playerId].categories;

  return {
    categories,
  };
};

export default connect(mapStateToProps)(HitterMenuSection);
