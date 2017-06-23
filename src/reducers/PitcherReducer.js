import { updateItems, updateCollections } from './utils';

// Each key should be playerId-dateNo. Each object is an individual gamae.
// Perhaps a better name would be GameReducer but I can come back to that.
// This is because a player may be on a different team, a different position, etc.
// Consider splitting this out to PitcherGames and HitterGames.
const INITIAL_STATE = {
  items: {},
  collections: {}, // organized by dateNo and by playerId
};

export default function PitcherReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case 'FETCH_DAILY_STATS_SUCCESS': {
      const pitchers = action.stats.filter(game => game.player.Position === 'P');
      return {
        ...state,
        items: updateItems(pitchers, state.items, action.date),
        collections: updateCollections(pitchers, state.collections, action.date),
      };
    }

    default:
      return state;
  }
}
