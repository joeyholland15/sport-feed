const INITIAL_STATE = {
  items: {},
};

export default function InjuryReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case 'FETCH_INJURIES_SUCCESS': {
      const nextItems = action.injuries.reduce((injuries, injury) => ({
        ...injuries,
        [injury.player.ID]: injury.injury,
      }), { ...state.items });

      return {
        ...state,
        items: nextItems,
      };
    }

    default:
      return state;
  }
}
