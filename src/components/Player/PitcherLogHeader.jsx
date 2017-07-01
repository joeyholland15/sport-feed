import React from 'react';
import './HitterLogHeader.scss';

const PitcherLogHeader = () => {
  const HEADERS = [
    'Date',
    'Opp',
    'Points',
  ];

  return (
    <div className="player-log player-log-header">
      {HEADERS.map(header => (
        <div key={header} className={header === 'Date' ? 'large-cell' : ''}>{header}</div>
      ))}
    </div>
  );
};

export default PitcherLogHeader;
