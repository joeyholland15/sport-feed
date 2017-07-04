export const FLY_BALL_MAX = 0.42696629213483145; // James Shields
export const FLY_BALL_MIN = 0.09375; // Alex Claudio
export const FLY_BALL_AVERAGE = 0.24749169511209312;

export const FLY_BALL_RANGE = FLY_BALL_MAX - FLY_BALL_MIN;

export const GROUNDER_MAX = 0.7109375; // Alex Claudio
export const GROUNDER_MIN = 0.2967032967032967; // Chris Hatcher
export const GROUNDER_AVERAGE = 0.4852731665609216;

export const generateCustomStats = (allPlayers) => {
  const nextPitchers = allPlayers && allPlayers.map((pitcher) => {
    const pitchesThrown = pitcher.stats.PitchesThrown && Number(pitcher.stats.PitchesThrown['#text']);
    const strikesThrown = pitcher.stats.PitcherStrikes && Number(pitcher.stats.PitcherStrikes['#text']);
    const swings = pitcher.stats.PitcherSwings && Number(pitcher.stats.PitcherSwings['#text']);
    const swingsMisses = pitcher.stats.PitcherStrikesMiss && Number(pitcher.stats.PitcherStrikesMiss['#text']);
    const strikesLooking = pitcher.stats.PitcherStrikesLooking && Number(pitcher.stats.PitcherStrikesLooking['#text']);
    const totalAtBats = pitcher.stats.TotalBattersFaced && Number(pitcher.stats.TotalBattersFaced['#text']);
    const strikeouts = pitcher.stats.PitcherStrikeouts && Number(pitcher.stats.PitcherStrikeouts['#text']);
    const walks = pitcher.stats.PitcherWalks && Number(pitcher.stats.PitcherWalks['#text']);
    const homeruns = pitcher.stats.HomerunsAllowed && Number(pitcher.stats.HomerunsAllowed['#text']);

    const grounders = pitcher.stats.PitcherGroundBalls && Number(pitcher.stats.PitcherGroundBalls['#text']);
    const liners = pitcher.stats.PitcherLineDrives && Number(pitcher.stats.PitcherLineDrives['#text']);
    const flyBalls = pitcher.stats.PitcherFlyBalls && Number(pitcher.stats.PitcherFlyBalls['#text']);
    const ballsInPlay = grounders + liners + flyBalls;

    const customStats = {
      whiffPercentage: {
        '#text': swingsMisses / swings,
      },
      homerunPercentage: {
        '#text': homeruns / totalAtBats,
      },
      strikeoutPercentage: {
        '#text': strikeouts / totalAtBats,
      },
      walkPercentage: {
        '#text': walks / totalAtBats,
      },
      strikePercentage: {
        '#text': strikesThrown / pitchesThrown,
      },
      strikesNoPiece: {
        '#text': (strikesLooking + swingsMisses) / strikesThrown,
      },
      flyBallRatio: {
        '#text': flyBalls / ballsInPlay,
      },
      grounderRatio: {
        '#text': grounders / ballsInPlay,
      },
    };

    return {
      ...pitcher,
      stats: {
        ...pitcher.stats,
        ...customStats,
      },
    };
  });

  const eligiblePitchers = nextPitchers.filter(item => item.player.Position === 'P' &&
    Number(item.stats.PitchesThrown['#text']) >= 500);

  const statLimits = eligiblePitchers && eligiblePitchers.reduce((limits, pitcher) => {
    const stats = pitcher.stats;
    const nextLimits = { ...limits };

    Object.keys(stats).forEach((statId) => {
      const stat = stats[statId];
      const currentValue = stat['#text'] === undefined ? Number(stat) : Number(stat['#text']);
      const prevMin = (nextLimits[statId] && nextLimits[statId].min) || 0;
      const prevMax = (nextLimits[statId] && nextLimits[statId].max) || 0;

      const nextStat = nextLimits[statId] ? {
        ...nextLimits[statId],
        min: Math.min(currentValue, prevMin),
        max: Math.max(currentValue, prevMax),
      } : {
        ...stat,
        min: Number(currentValue),
        max: Number(currentValue),
      };
      nextLimits[statId] = nextStat;
    });

    return nextLimits;
  }, {});

  // now augment percentiles onto players
  return nextPitchers && nextPitchers.map((pitcher) => {
    const nextStats = { ...pitcher.stats };

    const playerName = `${pitcher.player.FirstName} ${pitcher.player.LastName}`

    // if (playerName === 'Jon Lester') {
    //   const stat = Number(nextStats['flyBallRatio']['#text']);
    //   const min = statLimits['flyBallRatio'] && Number(statLimits['flyBallRatio'].min);
    //   const max = statLimits['flyBallRatio'] && Number(statLimits['flyBallRatio'].max);
    //   nextStats['flyBallRatio'] = {
    //     ...nextStats['flyBallRatio'],
    //     percentile: (stat - min) / (max - min),
    //   };
    //   console.log(nextStats['flyBallRatio'])
    // }

    Object.keys(nextStats).forEach((statId) => {
      const stat = Number(nextStats[statId]['#text']);
      const min = statLimits[statId] && Number(statLimits[statId].min);
      const max = statLimits[statId] && Number(statLimits[statId].max);
      nextStats[statId] = {
        ...nextStats[statId],
        percentile: (stat - min) / (max - min),
      };
    });

    if (playerName === 'Jon Lester') {
      console.log({
        ...pitcher,
        stats: nextStats,
      })
    }

    return {
      ...pitcher,
      stats: nextStats,
    };
  });
};

export const calculatePitcherGrounderRatio = (player) => {
  if (!player || !player.stats) {
    return 0;
  }
  const grounders = player.stats.PitcherGroundBalls && Number(player.stats.PitcherGroundBalls['#text']);
  const liners = player.stats.PitcherLineDrives && Number(player.stats.PitcherLineDrives['#text']);
  const flyBalls = player.stats.PitcherFlyBalls && Number(player.stats.PitcherFlyBalls['#text']);

  const ballsInPlay = grounders + liners + flyBalls;

  const grounderRatio = grounders / ballsInPlay;
  const value = (grounderRatio - GROUNDER_MIN) / (GROUNDER_MAX - GROUNDER_MIN);

  return Math.round(value * 1000) / 1000;
};

export const calculatePitcherFlyBallRatio = (player) => {
  if (!player || !player.stats) {
    return 0;
  }
  const grounders = player.stats.PitcherGroundBalls && Number(player.stats.PitcherGroundBalls['#text']);
  const liners = player.stats.PitcherLineDrives && Number(player.stats.PitcherLineDrives['#text']);
  const flyBalls = player.stats.PitcherFlyBalls && Number(player.stats.PitcherFlyBalls['#text']);

  const ballsInPlay = grounders + liners + flyBalls;

  const flyBallRatio = flyBalls / ballsInPlay;
  const value = (flyBallRatio - FLY_BALL_MIN) / (FLY_BALL_MAX - FLY_BALL_MIN);

  return Math.round(value * 1000) / 1000;
};

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

export const beautifySalary = (salary) => {
  if (!salary) {
    return null;
  }

  const salaryCharacters = salary.toString().split('');
  salaryCharacters.splice(salaryCharacters.length - 3, 0, ',');
  return `$${salaryCharacters.join('')}`;
};
