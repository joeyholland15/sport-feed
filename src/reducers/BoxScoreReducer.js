const INITIAL_STATE = {
  items: {}, // by gameId
};

export default function GameReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case 'FETCH_BOXSCORE_SUCCESS':
      return {
        ...state,
        items: {
          ...state.items,
          [action.gameId]: action.data,
        },
      };

    default:
      return state;
  }
}
