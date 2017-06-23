const INITIAL_STATE = [];

export default function TeamReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case 'FETCH_SCOREBOARD_SUCCESS': {
      return action.data;
    }

    default:
      return state;
  }
}
