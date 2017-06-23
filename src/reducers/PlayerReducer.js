const INITIAL_STATE = {
  items: {},
};

export default function PlayerReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case 'FETCH_HITTER_LOGS_SUCCESS':
      return {
        ...state,
        items: {
          ...state.items,
          [action.playerId]: {
            ...state.items[action.playerId],
            logs: action.games,
          },
        },
      };

    case 'FETCH_HITTER_STATS_SUCCESS':
      return {
        ...state,
        items: {
          ...state.items,
          [action.playerId]: {
            ...state.items[action.playerId],
            cumulative: action.stats,
          },
        },
      };

    default:
      return state;
  }
}
