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
          [action.playerId]: action.games,
        },
      };

    default:
      return state;
  }
}
