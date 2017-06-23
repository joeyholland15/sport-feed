import { updateItems } from './utils';

const INITIAL_STATE = {
  items: {},
  collections: {}, // each date should be an object with hitters and pitchers
};

export default function PitcherReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case 'FETCH_STATS_BY_DATE_SUCCESS': {
      const pitcherIds = action.stats.filter(game => game.player.Position === 'P').map(player => player.player.ID);
      const hitterIds = action.stats.filter(game => game.player.Position !== 'P').map(player => player.player.ID);

      const nextCollections = { ...state.collections };

      action.stats.forEach((game) => {
        if (nextCollections[game.player.ID]) {
          nextCollections[game.player.ID] = [...nextCollections[game.player.ID], game];
        } else {
          nextCollections[game.player.ID] = [game];
        }
      });

      return {
        ...state,
        items: updateItems(action.stats, state.items, action.date),
        collections: {
          ...nextCollections,
          [action.date]: {
            pitcherIds,
            hitterIds,
          },
        },
      };
    }

    case 'FETCH_PLAYER_LOGS_SUCCESS':
      return {
        ...state,
        collections: {
          ...state.collections,
          [action.playerId]: action.games.filter(game => parseInt(game.stats.PitchesThrown['#text']) > 0),
        },
      };

    default:
      return state;
  }
}
