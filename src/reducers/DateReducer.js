const INITIAL_STATE = 20160501;

export default function DateReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case 'SET_DATE':
      return action.date;

    default:
      return state;
  }
}
