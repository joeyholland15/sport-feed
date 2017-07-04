import React from 'react';
import { beautifySalary } from '../../constants/calculatePoints';

const MatchupHitter = ({
  player,
  atBats,
}) => (
  <div className="matchup-hitter">
    <div className="matchup-player-header row-titles">
      <div className="matchup-player-name">Batter</div>
      <div className="matchup-player-salary">Salary</div>
      <div>Points</div>
      <div>Bats</div>
    </div>
    <section className="matchup-player-header">
      <div className="matchup-player-name">
        {`${player.player.FirstName} ${player.player.LastName}`}
      </div>
      <div className="matchup-player-salary">{beautifySalary(player.salary)}</div>
      <div>{player.fantasyPoints}</div>
      <div>{player.bats}</div>
    </section>
    <section>
      {atBats && atBats.map((atBat, idx) => (
        <div key={idx}>{`${idx + 1}: ${atBat.result}`}</div>
      ))}
    </section>
  </div>
);

export default MatchupHitter;
