const INITIAL_STATE = {
  items: {},
  collections: {}, // organized by team
};

export default function GameReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case 'FETCH_TEAM_LOGS_SUCCESS':
      return action.games.reduce((games, game) => {
        const teamCollection = games.collections && games.collections[game.team.Abbreviation];
        const gameKey = `${game.team.Abbreviation}-${game.game.id}`;
        return {
          items: {
            ...games.items,
            [gameKey]: game,
          },
          collections: {
            ...games.collections,
            [game.team.Abbreviation]: teamCollection ? [...teamCollection, gameKey] : [gameKey],
          },
        };
      }, { ...state });

    default:
      return state;
  }
}
