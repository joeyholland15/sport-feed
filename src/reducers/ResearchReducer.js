const INITIAL_STATE = {
  hitterLogs: {}, // list of dfs items organized by playerId sorted by date
  totalGames: 0,
  totalPoints: 0,
  totalBombs: 0, // a bomb is a 18+ game
  cheapBombs: 0,
};

export default function HitterReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case 'FETCH_DFS_FOR_RESEARCH_SUCCESS': {
      const hitters = action.stats.filter(game => game.player.Position !== 'P' &&
        game.team.Abbreviation !== 'CWS' &&
        game.player.LastName !== 'Duffy' &&
        game.team.Abbreviation !== 'CLE');
      let nextPoints = state.totalPoints;
      let nextGames = state.totalGames;
      let nextBombs = state.totalBombs;
      let nextCheapBombs = state.cheapBombs;

      const logs = hitters.reduce((logs, game) => {
        const key = game.player.ID;
        if (game.fantasyPoints) {
          nextGames += 1;
          nextPoints += Number(game.fantasyPoints);

          if (Number(game.fantasyPoints) >= 18) {
            nextBombs += 1;

            if (Number(game.salary) <= 3500) {
              nextCheapBombs += 1;
            }
          }
        }

        return {
          ...logs,
          [key]: logs[key] ? [...logs[key], game] : [game],
        };
      }, { ...state.hitterLogs });

      return {
        ...state,
        hitterLogs: logs,
        totalGames: nextGames,
        totalPoints: nextPoints,
        totalBombs: nextBombs,
        cheapBombs: nextCheapBombs,
      };
    }

    default:
      return state;
  }
}
