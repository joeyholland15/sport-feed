const INITIAL_STATE = {
  hitters: [],
  pitchers: [],
  collections: {},
  games: {},
  selected: 'Pitchers',
  salary: {
    min: null,
    max: null,
  },
  teams: {},
  positions: {},
};

export default function FeedReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case 'FETCH_STATS_BY_DATE_SUCCESS': {
      const pitchers = action.stats.filter(item => item.player.Position === 'P');
      const hitters = action.stats.filter(item => item.player.Position !== 'P');

      const nextCollections = {
        ...state.collections,
        [action.date]: {
          pitchers,
          hitters,
        },
      };

      return {
        ...state,
        collections: nextCollections,
      };
    }

    case 'SET_FEED_FILTER':
      return {
        ...state,
        selected: action.filter,
      };

    case 'SET_SALARY_FILTER_MIN':
      return {
        ...state,
        salary: {
          ...state.salary,
          min: action.min,
        },
      };

    case 'SET_SALARY_FILTER_MAX':
      return {
        ...state,
        salary: {
          ...state.salary,
          max: action.max,
        },
      };

    case 'SET_POSITION_FILTER':
      if (action.position === 'All') {
        return {
          ...state,
          positions: {},
        };
      }

      return {
        ...state,
        positions: {
          ...state.positions,
          [action.position]: !state.positions[action.position],
        },
      };

    case 'SET_TEAM_FILTER':
      return {
        ...state,
        teams: {
          ...state.teams,
          [action.team]: !state.teams[action.team],
        },
      };

    default:
      return state;
  }
}
