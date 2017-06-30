import React from 'react';
import './PlayerMenuItem.scss';

const PlayerMenuItem = ({
  category,
  value,
  round,
}) => {
  let formatted = value;
  if (typeof value === 'string') {
    formatted = Number(value);
  }

  return (
    <div className="player-menu-item">
      <div className="category">{category}</div>
      <div className="value">{round ? Math.round(formatted * 1000) / 1000 : formatted}</div>
    </div>
  );
};

// PlayerMenuItem.propTypes = {
//   category: React.PropTypes.string.isRequired,
//   value: React.PropTypes.oneOf(
//     React.PropTypes.string,
//     React.PropTypes.number,
//   ).isRequired,
//   round: React.PropTypes.bool.isRequired,
// };

export default PlayerMenuItem;
