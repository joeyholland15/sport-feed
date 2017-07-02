const INITIAL_STATE = {
  standings: {},
};

const ABBREVIATIONS = {
  'American League/East': 'AL East',
  'American League/Central': 'AL Central',
  'American League/West': 'AL West',
  'National League/East': 'NL East',
  'National League/Central': 'NL Central',
  'National League/West': 'NL West',
};

export default function LeagueReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case 'FETCH_DIVISION_STANDINGS_SUCCESS': {
      const nextStandings = action.divisions.reduce((standings, division) => {
        const key = division['@name'];

        return {
          ...standings,
          [key]: {
            ...division.teamentry,
            // abbreviation: ABBREVIATIONS[key],
          },
        };
      }, { ...state.divisions });

      return {
        ...state,
        standings: nextStandings,
      };
    }

    default:
      return state;
  }
}
