import React from 'react';
import HitterStatContainer from './HitterStatContainer';
import HitterHeader from './HitterHeader';
import HitterChart from './HitterChart';
import HitterMenu from './HitterMenu';
import PitcherGamelogs from './PitcherGamelogs';
import './Hitter.scss';

// Power Pitchers generally have higher fly ball rates ~44%
// Contact hitters generally have GB rates close to 50%

const Pitcher = ({ playerId }) => (
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
      <PitcherGamelogs playerId={playerId} />
    </div>
  </HitterStatContainer>
);

export default Pitcher;
