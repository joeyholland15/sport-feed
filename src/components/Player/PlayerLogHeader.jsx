import React from 'react';
import './PlayerLogHeader.scss';

const PlayerLogHeader = () => {
  const HEADERS = [
    'Date',
    'Opp',
    'Points',
    'Due',
    'HR',
    'XBH',
    'Con %',
    'Avg.',
    'Ups.',
  ];

  return (
    <div className="player-log player-log-header">
      {HEADERS.map(header => (
        <div key={header} className={header === 'Date' ? 'large-cell' : ''}>{header}</div>
      ))}
    </div>
  );
};

export default PlayerLogHeader;
