const INITIAL_STATE = [];

export default function LineupReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case 'LINEUP_PLAYER_ADD':
      if (state.find(game => game === action.game)) {
        return state;
      }

      return [
        ...state,
        action.game,
      ];

    case 'LINEUP_PLAYER_REMOVE': {
      const nextState = [...state];
      const spliceIndex = nextState.findIndex(gameId => gameId === action.game);

      nextState.splice(spliceIndex, 1);

      return nextState;
    }

    case 'LINEUP_CLEAR':
      return [];

    default:
      return state;
  }
}
