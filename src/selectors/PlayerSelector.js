import { createSelector } from 'reselect';

const SPARQ_VALUE = 10;
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

export const getPlayer = (state, playerId) => state.players.items[playerId];
export const getPlayerLogs = (state, playerId) => state.players.items[playerId] &&
  state.players.items[playerId].logs;

export const playerStatSelector = createSelector(
  getPlayer,
  (player) => {
    const stats = player && { ...player.stats };
    const position = player && player.player && player.player.Position;

    if (stats) {
      Object.keys(stats).forEach((statId) => {
        if (position === 'P' && stats[statId]['@category'] && stats[statId]['@category'] !== 'Pitching') {
          delete stats[statId];
        } else if (position !== 'P' && stats[statId]['@category'] && stats[statId]['@category'] !== 'Batting') {
          delete stats[statId];
        }
      });
    }

    return stats;
  },
);

// will add on trend ratings / heat, sparq, etc.
export const playerLogSelector = createSelector(
  getPlayerLogs,
  logs => logs && logs.map((game, idx) => {
    let rating = 0;
    let ratingIdx = idx - 1;
    const points = calculatePoints(game);

    while (ratingIdx >= 0 && calculatePoints(logs[ratingIdx]) < 10) {
      const prevPoints = calculatePoints(logs[ratingIdx]);
      rating += (10 - prevPoints);
      ratingIdx -= 1;
    }

    const inStreak = hasSparq(logs.slice(idx - SPARQ_GROUPING, idx)
      .map(perf => calculatePoints(perf)));
    const isSparq = points >= SPARQ_VALUE && !inStreak;

    const statsToDate = getStatsToDate(logs.slice(0, idx));

    return {
      ...game,
      rating,
      points,
      isSparq,
      inStreak,
      ...statsToDate,
    };
  }),
);
