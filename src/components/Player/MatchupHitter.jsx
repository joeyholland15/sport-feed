import React from 'react';
import { beautifySalary } from '../../constants/calculatePoints';

const MatchupHitter = ({
  player,
  atBats,
}) => (
  <div className="matchup-hitter">
    <div>
      <div className="matchup-player-name">
        {`${player.player.FirstName} ${player.player.LastName}`}
      </div>
      <div>{beautifySalary(player.salary)}</div>
      <div>{player.fantasyPoints}</div>
      <div>{player.bats}</div>
    </div>
    <div>
      {atBats && atBats.map((atBat, idx) => (
        <div key={idx}>{`${idx + 1}: ${atBat.result}`}</div>
      ))}
    </div>
  </div>
);

export default MatchupHitter;
