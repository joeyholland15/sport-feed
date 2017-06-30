import React from 'react';
import PlayerChart from './PlayerChart';
import PlayerMenu from './PlayerMenu';
import PlayerGamelogs from './PlayerGamelogs';
import PlayerHeader from './PlayerHeader';
import HitterStatContainer from './HitterStatContainer';
import './Player.scss';

// Power Hitters generally have higher fly ball rates ~44%
// Contact hitters generally have GB rates close to 50%

const Player = ({ playerId }) => (
  <HitterStatContainer playerId={playerId}>
    <div className="player-container">
      <div className="player-info">
        <PlayerHeader playerId={playerId} />
        <div className="player-chart">
          <PlayerChart playerId={playerId} />
        </div>
        <div>
          <PlayerMenu playerId={playerId} />
        </div>
      </div>
      <PlayerGamelogs playerId={playerId} />
    </div>
  </HitterStatContainer>
);

export default Player;
