const INITIAL_STATE = {
  items: {}, // by gameId
};

export default function GameLineupReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case 'FETCH_PLAYBYPLAY_SUCCESS':
      const lineups = action.atBats.reduce((battingOrders, atBat) => {
        const team = atBat.battingTeam.Abbreviation;
        const batterId = atBat.atBatPlay[0].batterUp.battingPlayer.ID;
        const key = `${team}-${action.gameId}`;

        const previousTeamLineup = battingOrders[key];

        return {
          ...battingOrders,
          [key]: previousTeamLineup ? [...previousTeamLineup, batterId] : [batterId],
        };
      }, { ...state.items });

      return {
        ...state,
        items: lineups,
      };

    default:
      return state;
  }
}
