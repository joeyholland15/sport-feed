const INITIAL_STATE = {};

export default function TeamReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case 'FETCH_TEAM_LOGS_SUCCESS': {
      if (!action.games) {
        return state;
      }

      return action.games && action.games.reduce((logs, game) => {
        const key = game.team.Abbreviation;
        const runs = parseInt(game.stats.Runs['#text']);
        const runsAgainst = parseInt(game.stats.RunsAgainst['#text']);

        const nextGame = {
          runs,
          runsAgainst,
          result: runs > runsAgainst ? 'W' : 'L',
          date: parseInt(game.game.date.split('-').join('')),
        };

        return {
          ...logs,
          [key]: logs[key] ? [...logs[key], nextGame] : [nextGame],
        };
      }, {});
    }

    default:
      return state;
  }
}
