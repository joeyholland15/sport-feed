// accepts game object as arg
export const calculateHitterPoints = (game) => {
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

export const calculateHitterPointsSeason = (seasonStats) => {
  const totalPoints = calculateHitterPoints(seasonStats);
  return totalPoints / Number(seasonStats.stats.GamesPlayed['#text']);
};

export const calculatePitcherPoints = (game) => {
  const ipText = game.stats.InningsPitched['#text'];
  const fullInnings = ipText && ipText.split('.')[0];
  let inningDecimal = ipText && ipText.split('.')[1];

  if (inningDecimal === '1') {
    inningDecimal = '333';
  } else if (inningDecimal === '2') {
    inningDecimal = '667';
  }

  const ip = Number(`${fullInnings}.${inningDecimal}`);
  const k = Number(game.stats.PitcherStrikeouts['#text']);
  const bb = Number(game.stats.PitcherWalks['#text']);
  const h = Number(game.stats.HitsAllowed['#text']);
  const w = Number(game.stats.Wins['#text']);
  const er = Number(game.stats.EarnedRunsAllowed['#text']);

  return (ip * 2.25) + (k * 2) + (bb * -0.6) + (h * -0.6) + (er * -2) + (w * 4);
};
