import React from 'react';
import HitterChart from './HitterChart';
import HitterMenu from './HitterMenu';
import HitterGamelogs from './HitterGamelogs';
import HitterHeader from './HitterHeader';
import HitterStatContainer from './HitterStatContainer';
import './Hitter.scss';

// Power Hitters generally have higher fly ball rates ~44%
// Contact hitters generally have GB rates close to 50%

const Hitter = ({ playerId }) => (
  <HitterStatContainer playerId={playerId}>
    <div className="player-container">
      <div className="player-info">
        <HitterHeader playerId={playerId} />
        <div className="player-chart">
          <HitterChart playerId={playerId} />
        </div>
        <div>
          <HitterMenu playerId={playerId} />
        </div>
      </div>
      <HitterGamelogs playerId={playerId} />
    </div>
  </HitterStatContainer>
);

export default Hitter;
