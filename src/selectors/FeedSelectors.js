import { createSelector } from 'reselect';
import _ from 'underscore';

const isValidPosition = (activePositions, eligiblePositions) => (
  eligiblePositions.find(position => activePositions[position])
);

const getFeedState = state => state.feed;
const getTeamState = state => state.team;
const getDailyFantasyItems = state => state.dailyFantasy.items;
const getDailyFantasyCollections = state => state.dailyFantasy.collections;
const getFeedCollection = (state, id) => state.filters.collections[id];
const getDailyFantasyCollection = (state, id) => state.dailyFantasy.collections[id];
const getGameState = state => state.games;
const getDate = state => state.date;
const getFeedFilters = state => state.filters;
const getDailyHitters = (state, date) => state.hitters.collections[`date-${date}`];
const getDailyPitchers = (state, date) => state.pitchers.collections[`date-${date}`];

export const dailyHittersByPoints = createSelector(
  getDailyFantasyItems,
  getDailyHitters,
  getDate,
  (dfsItems, hitterIds, date) => {
    return hitterIds && hitterIds.map(player => `${player.player.ID}-${date}`)
      .filter(id => !!dfsItems[id])
      .sort((first, second) => {
        const firstHitter = dfsItems[first];
        const secondHitter = dfsItems[second];

        return Number(secondHitter.fantasyPoints) - Number(firstHitter.fantasyPoints);
      })
      .map(id => dfsItems[id].player.ID);
  },
);

export const dailyHittersByRating = createSelector(
  getDailyFantasyItems,
  getDailyFantasyCollections,
  getDailyHitters,
  getDate,
  (dfsItems, dfsCollections, hitterIds, date) => {
    let gamesOver18 = 0;
    let totalGames = 0;
    let gamesWithFollowups = 0;
    let totalPointsAllPlayers = 0;
    let totalGamesAllPlayers = 0;
    const relevantHitters = hitterIds && hitterIds.filter(player => !!dfsItems[`${player.player.ID}-${date}`])
    const hitterHistory = relevantHitters && relevantHitters.map((hitter) => {
      const hitterCollection = dfsCollections[hitter.player.ID];
      const history = hitterCollection && hitterCollection.filter(game => (
        game && game.game && Number(game.game.date.split('-').join('')) < date
      ));
      const recentGames = history && history.sort((first, second) => {
        const firstDateString = first.game && first.game.date.split('-').join('');
        const secondDateString = second.game && second.game.date.split('-').join('');

        return Number(firstDateString) - Number(secondDateString);
      }).map(player => Number(player.fantasyPoints));

      const dfsHitter = dfsItems[`${hitter.player.ID}-${date}`];

      const rating = recentGames && recentGames.reduce((ceiling, points, idx) => {
        if (points >= 18 && recentGames[idx + 1] && recentGames[idx + 2]) {
          gamesOver18 += 1;

          if ((recentGames[idx + 1] && recentGames[idx + 1] >= 16) || (recentGames[idx + 2] && recentGames[idx + 2] >= 16)) {
            gamesWithFollowups += 1;
          }
        }

        if (points > 15) {
          return ceiling + (points - 15);
        }

        if (recentGames[idx + 1] && recentGames[idx + 2]) {
          totalGames++;
        }

        return ceiling;
      }, 0);

      return {
        id: hitter.player.ID,
        recentGames,
        rating,
        points: Number(dfsHitter.fantasyPoints),
      };
    });

    // console.log('GAMES OVER 18', gamesOver18, gamesWithFollowups, gamesWithFollowups / gamesOver18, gamesOver18 / totalGames)

    return hitterHistory && hitterHistory.sort((first, second) => {
      const firstSalary = Number(dfsItems[`${first.id}-${date}`].salary);
      const secondSalary = Number(dfsItems[`${second.id}-${date}`].salary);
      // return (second.rating / secondSalary) - (first.rating / firstSalary);
      return second.rating - first.rating;
    });
  },
);

export const dailyPitchersByPoints = createSelector(
  getDailyFantasyItems,
  getDailyPitchers,
  getDate,
  (dfsItems, pitcherIds, date) => {
    return pitcherIds && pitcherIds.map(player => `${player.player.ID}-${date}`)
      .filter(id => !!dfsItems[id])
      .sort((first, second) => {
        const firstPitcher = dfsItems[first];
        const secondPitcher = dfsItems[second];

        return Number(secondPitcher.fantasyPoints) - Number(firstPitcher.fantasyPoints);
      })
      .map(id => dfsItems[id].player.ID);
  },
);

export const playerHistorySelector = createSelector(
  getDailyFantasyCollection,
  getDate,
  (games, date) => {
    const relevantGames = games.filter((game) => {
      return game && game.game && Number(game.game.date.split('-').join('')) < date;
    });
    return relevantGames && relevantGames.sort((first, second) => {
      const firstDateString = first.game && first.game.date.split('-').join('');
      const secondDateString = second.game && second.game.date.split('-').join('');

      return Number(firstDateString) - Number(secondDateString);
    }).map(player => Number(player.fantasyPoints)).slice(-8);
  },
);

export const playerFutureSelector = createSelector(
  getDailyFantasyCollection,
  getDate,
  (games, date) => {
    const relevantGames = games.filter((game) => {
      return game && game.game && Number(game.game.date.split('-').join('')) > date;
    });
    return relevantGames && relevantGames.sort((first, second) => {
      const firstDateString = first.game && first.game.date.split('-').join('');
      const secondDateString = second.game && second.game.date.split('-').join('');

      return Number(firstDateString) - Number(secondDateString);
    }).map(player => Number(player.fantasyPoints)).slice(0, 5);
  },
);

export const feedHitterSelector = createSelector( // eslint-disable-line
  getFeedFilters,
  getDailyHitters,
  (filters, hitterIds) => {
    const min = filters.salary.min;
    const max = filters.salary.max;
    const positions = filters.positions;
    const teams = filters.teams;
    return hitterIds && hitterIds.filter((hitter) => {
      const validPosition = Object.keys(positions).filter(pos => positions[pos]).length === 0 ||
        isValidPosition(positions, hitter.player.Position.split('/'));
      const validTeam = Object.keys(teams).filter(team => teams[team]).length === 0 ||
        teams[hitter.team.Abbreviation];
      if (!min && !max && validPosition && validTeam) {
        return true;
      }

      if (!min && !!max && hitter.salary <= max && validPosition && validTeam) {
        return true;
      }

      if (!!min && !max && hitter.salary >= min && validPosition && validTeam) {
        return true;
      }

      return hitter.salary <= max && hitter.salary >= min && validPosition && validTeam;
    });
  },
);

export const feedPitcherSelector = createSelector( // eslint-disable-line
  getFeedState,
  getDailyFantasyCollection,
  getDailyFantasyItems,
  getDate,
  (feedState, dailyFantasyPlayers, items, date) => {
    const pitcherIds = dailyFantasyPlayers && dailyFantasyPlayers.pitcherIds;
    const min = feedState.salary.min;
    const max = feedState.salary.max;
    const teams = feedState.teams;
    return pitcherIds && pitcherIds.map(id => items[`${id}-${date}`]).filter((pitcher) => {
      const validTeam = Object.keys(teams).filter(team => teams[team]).length === 0 ||
        teams[pitcher.team.Abbreviation];

      if (!min && !max && validTeam) {
        return true;
      }

      if (!min && !!max && pitcher.salary <= max && validTeam) {
        return true;
      }

      if (!!min && !max && pitcher.salary >= min && validTeam) {
        return true;
      }

      return pitcher.salary <= max && pitcher.salary >= min && validTeam;
    });
  },
);

export const teamAverageSelector = createSelector(
  getFeedState,
  getFeedCollection,
  (feedState, players) => {
    const hitters = players && players.hitters;
    const teamTotals = hitters && hitters.reduce((totals, hitter) => {
      const team = hitter.team.Abbreviation;
      const nextTeam = totals[team] || [0, 0, 0];

      nextTeam[0] += parseInt(hitter.fantasyPoints);
      nextTeam[1] += 1;
      nextTeam[2] = nextTeam[0] / nextTeam[1];
      return {
        ...totals,
        [team]: nextTeam,
      };
    }, {});


    const teamList = Object.keys(teamTotals).map((team) => {
      return {
        average: teamTotals[team][2],
        team,
      };
    });

    teamList.sort((a, b) => {
      return b.average - a.average;
    });

    return teamList;
  },
);

const sortByDate = (first, second) => (
  second.date - first.date
);

// create a team trend selector
export const teamTrendSelector = createSelector(
  getGameState,
  getDate,
  (games, date) => {
    const teamTrends = {};
    if (games && games.collections) {
      Object.keys(games.collections).forEach((teamAbbreviation) => {
        const teamList = games.collections[teamAbbreviation];
        const gameIndex = teamList.findIndex(gameId => games.items[gameId].game.date.split('-').join('') === date.toString());
        if (!gameIndex) {
          return;
        }
        const history = teamList.slice(gameIndex - 14, gameIndex).reverse();
        const future = teamList.slice(gameIndex + 1, gameIndex + 8).reverse();
        const today = teamList[gameIndex];
        teamTrends[teamAbbreviation] = {
          history,
          future,
          today,
        };
      });
      return teamTrends;
    }

    return undefined;
  },
);

export const teamPowerSelector = createSelector(
  getGameState,
  getDate,
  (games, date) => {
    const teamRatings = games && Object.keys(games.collections).reduce((teams, teamAbbreviation) => {
      const teamList = games.collections[teamAbbreviation];
      const gameIndex = teamList.findIndex(gameId => games.items[gameId].game.date.split('-').join('') === date.toString());

      if (!gameIndex) {
        return;
      }

      const gamesBeforeDate = teamList.slice(0, gameIndex).map(gameId => games.items[gameId]);
      const nextFiveGames = teamList.slice(gameIndex + 1, gameIndex + 5 ).map(gameId => games.items[gameId]);
      const recentIndex = gamesBeforeDate.length - 5;
      const prevIndex = gamesBeforeDate.length - 10;
      const lastTwoWeeksIndexStart = gamesBeforeDate.length - 18;
      const lastTwoWeeksIndexEnd = gamesBeforeDate.length - 8;
      const teamRating = gamesBeforeDate.reduce((ratings, game, idx) => {
        const runs = parseInt(game.stats.Runs['#text']);
        const runsAgainst = parseInt(game.stats.RunsAgainst['#text']);
        const win = runs > runsAgainst;
        let nextWins = ratings.wins;
        if (win) {
          nextWins = ratings.wins ? ratings.wins + 1 : 1;
        }

        let recentRuns = ratings.recentRuns || 0;
        let recentGames = ratings.recentGames || 0;
        let recentWins = ratings.recentWins || 0;
        let prevRuns = ratings.prevRuns || 0;
        let prevGames = ratings.prevGames || 0;
        let prevWins = ratings.prevWins || 0;
        let twoWeekRuns = ratings.twoWeekRuns || 0;
        let twoWeekGames = ratings.twoWeekGames || 0;
        let twoWeekWins = ratings.twoWeekWins || 0;

        let highGames = ratings.highGames || 0;
        let lowGames = ratings.lowGames || 0;

        if (runs >= 8) {
          highGames += 1;
        }

        if (runs < 3) {
          lowGames += 1;
        }

        if (idx >= prevIndex) {
          recentRuns += runs;
          if (win) {
            recentWins += 1;
          }
          recentGames += 1;
        }

        // idea is if this rating is lwo, the steak is healthy
        if (idx >= lastTwoWeeksIndexStart && idx <= lastTwoWeeksIndexEnd) {
          twoWeekRuns += runs;
          if (win) {
            twoWeekWins += 1;
          }
          twoWeekGames += 1;
        }

        if (idx < recentIndex && idx >= prevIndex) {
          prevRuns += runs;
          if (win) {
            prevWins += 1;
          }
          prevGames += 1;
        }

        return {
          ...ratings,
          totalGames: ratings.totalGames !== undefined ? ratings.totalGames + 1 : 1,
          wins: nextWins,
          runs: ratings.runs !== undefined ? ratings.runs + runs : runs,
          recentGames,
          recentWins,
          recentRuns,
          highGames,
          lowGames,
          prevGames,
          prevWins,
          prevRuns,
          twoWeekGames,
          twoWeekWins,
          twoWeekRuns,
        };
      }, {});

      const winPercentage = teamRating.wins / teamRating.totalGames;
      const runsPerGame = teamRating.runs / teamRating.totalGames;

      const recentWinPercentage = teamRating.recentWins / teamRating.recentGames;
      const recentRunsPerGame = teamRating.recentRuns / teamRating.recentGames;

      const prevWinPercentage = teamRating.prevWins / teamRating.prevGames;
      const prevRunsPerGame = teamRating.prevRuns / teamRating.prevGames;

      const twoWeekWinPercentage = teamRating.twoWeekWins / teamRating.twoWeekGames;
      const twoWeekRunsPerGame = teamRating.twoWeekRuns / teamRating.twoWeekGames;

      const futureRating = nextFiveGames.reduce((total, game) => {
        const runs = parseInt(game.stats.Runs['#text']);
        if (runs > 6) {
          return total + (runs - 6);
        }

        return total;
      }, 0);

      return {
        ...teams,
        [teamAbbreviation]: {
          seasonRating: winPercentage * runsPerGame,
          recentRating: recentWinPercentage * recentRunsPerGame,
          seasonRunsPerGame: runsPerGame,
          recentRunsPerGame,
          team: teamAbbreviation,
          highGamePercentage: teamRating.highGames / teamRating.totalGames,
          lowGamePercentage: teamRating.lowGames / teamRating.totalGames,
          futureRating,
          prevRating: prevWinPercentage * prevRunsPerGame,
          twoWeekRating: twoWeekWinPercentage * twoWeekRunsPerGame,
        },
      };
    }, {});

    return teamRatings && Object.keys(teamRatings).map((team) => {
      return teamRatings[team];
    }).sort((first, second) => {
      return (first.recentRating) - (second.recentRating);
      // return (second.prevRating + second.recentRating) - (first.prevRating + first.recentRating);
      // return second.futureRating - first.futureRating;
      // return (Math.abs(first.recentRating - first.prevRating)) - (Math.abs(second.recentRating - second.prevRating));
      // return (((first.prevRating + first.recentRating) / 2) / first.seasonRating) - (((second.prevRating + second.recentRating) / 2) / second.seasonRating);
    });
  },
);
