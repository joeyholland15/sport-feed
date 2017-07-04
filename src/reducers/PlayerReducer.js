import { standardDeviation } from '../constants/consistency';
import { HITTER_CATEGORIES } from '../constants/statCategories';
import {
  calculateHitterPoints,
  calculateHitterPointsSeason,
  calculatePitcherGrounderRatio,
  calculatePitcherFlyBallRatio,
  generateCustomStats,
} from '../constants/calculatePoints';

const INITIAL_STATE = {
  items: {},
};

const SPARQ_VALUE = 12;
const BOMB_VALUE = 16;
const SPARQ_GROUPING = 3;

const hasSparq = list => !!list.find(points => points >= SPARQ_VALUE);
const hasRecentSparq = list => !!list.find(game => game.isSparq);

const getStatsToDate = games => (
  games.reduce((stats, game) => {
    const points = calculateHitterPoints(game);
    const nextBombCount = stats.bombCount || 0;

    return {
      ...stats,
      totalPoints: stats.totalPoints !== undefined ?
        stats.totalPoints + points : points,
      bombCount: points >= BOMB_VALUE ? nextBombCount + 1 : nextBombCount,
    };
  }, {})
);

const getRatingsToDate = (games, date) => {
  const dateIdx = games && games.findIndex(game => Number(game.game.date.split('-').join('')) === date);
  const gamesToDate = games && games.slice(0, dateIdx);

  const gamesWithRatings = gamesToDate && gamesToDate.map((game, idx) => {
    let rating = 0;
    let ratingIdx = idx - 1;
    const points = calculateHitterPoints(game);

    while (ratingIdx >= 0 && calculateHitterPoints(gamesToDate[ratingIdx]) < SPARQ_VALUE) {
      const prevPoints = calculateHitterPoints(gamesToDate[ratingIdx]);
      rating += (10 - prevPoints);
      ratingIdx -= 1;
    }

    const inStreak = hasSparq(gamesToDate.slice(idx - SPARQ_GROUPING, idx)
      .map(perf => calculateHitterPoints(perf)));
    const isSparq = points >= SPARQ_VALUE && !inStreak;
    const ruledOut = !inStreak && points < SPARQ_VALUE;

    const toDate = gamesToDate.slice(0, idx);

    const statsToDate = getStatsToDate(toDate);
    const consistency = toDate &&
      standardDeviation(toDate.map(perf => calculateHitterPoints(perf)));

    return {
      ...game,
      rating,
      points,
      isSparq,
      inStreak,
      consistency,
      ruledOut,
      ...statsToDate,
    };
  });

  return gamesWithRatings && gamesWithRatings.map((game, idx) => {
    const recentSparq = !!hasRecentSparq(gamesWithRatings.slice(idx - SPARQ_GROUPING, idx));

    return {
      ...game,
      recentSparq,
    };
  });
};

export default function PlayerReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case 'FETCH_PITCHER_LOGS_SUCCESS':
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

    case 'FETCH_HITTER_LOGS_SUCCESS':
      return {
        ...state,
        items: {
          ...state.items,
          [action.playerId]: {
            ...state.items[action.playerId],
            logs: getRatingsToDate(action.games),
            // cumulative custom stats to date
            logsToDate: getRatingsToDate(action.games, action.date),
          },
        },
      };

    case 'FETCH_CUMULATIVE_PLAYER_STATS_SUCCESS':
    case 'FETCH_ALL_CUMULATIVE_PLAYER_STATS_SUCCESS': {
      const eligiblePitchers = action.stats.filter(item => item.player.Position === 'P' &&
        Number(item.stats.PitchesThrown['#text']) >= 500);

      const playersWithCustomStats = generateCustomStats(action.stats);

      const nextItems = playersWithCustomStats.reduce((players, player) => {
        const categories = {
          Highlights: {},
          Hitting: {},
          Fielding: {},
        };

        if (player.stats) {
          Object.keys(player.stats).forEach((stat) => {
            const category = HITTER_CATEGORIES[stat];

            if (category) {
              categories[category][stat] = player.stats[stat];
            }
          });
        }

        return {
          ...players,
          [player.player.ID]: {
            ...players[player.player.ID],
            ...player,
            categories,
            pointsPerGame: calculateHitterPointsSeason(player),
          },
        };
      }, { ...state.items });

      return {
        ...state,
        items: nextItems,
      };
    }

    default:
      return state;
  }
}
