import { standardDeviation } from '../constants/consistency';

const INITIAL_STATE = {
  items: {},
};

const SPARQ_VALUE = 12;
const BOMB_VALUE = 16;
const SPARQ_GROUPING = 3;

const hasSparq = list => !!list.find(points => points >= SPARQ_VALUE);

const calculatePoints = (game) => {
  if (!game || !game.stats) {
    return 'DNP';
  }

  const homeruns = Number(game.stats.Homeruns['#text']);
  const runs = Number(game.stats.Runs['#text']);
  const rbis = Number(game.stats.RunsBattedIn['#text']);
  const doubles = Number(game.stats.SecondBaseHits['#text']);
  const triples = Number(game.stats.ThirdBaseHits['#text']);
  const sbs = Number(game.stats.StolenBases['#text']);
  const bbs = Number(game.stats.BatterWalks['#text']);
  const hbp = Number(game.stats.HitByPitch['#text']);
  const singles = Number(game.stats.Hits['#text']) - (homeruns + doubles + triples);

  return (homeruns * 10) + (runs * 2) + (rbis * 2) + (doubles * 5) + (triples * 8) +
    (sbs * 5) + (bbs * 2) + (hbp * 2) + (singles * 3);
};

const getStatsToDate = games => (
  games.reduce((stats, game) => {
    const points = calculatePoints(game);
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
    const points = calculatePoints(game);

    while (ratingIdx >= 0 && calculatePoints(gamesToDate[ratingIdx]) < SPARQ_VALUE) {
      const prevPoints = calculatePoints(gamesToDate[ratingIdx]);
      rating += (10 - prevPoints);
      ratingIdx -= 1;
    }

    const inStreak = hasSparq(gamesToDate.slice(idx - SPARQ_GROUPING, idx)
      .map(perf => calculatePoints(perf)));
    const isSparq = points >= SPARQ_VALUE && !inStreak;
    const ruledOut = !inStreak && points < SPARQ_VALUE;

    const toDate = gamesToDate.slice(0, idx);

    const statsToDate = getStatsToDate(toDate);
    const consistency = toDate &&
      standardDeviation(toDate.map(perf => calculatePoints(perf)));

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

  return gamesWithRatings;
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
      const nextItems = action.stats.reduce((players, player) => ({
        ...players,
        [player.player.ID]: {
          ...players[player.player.ID],
          ...player,
        },
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
