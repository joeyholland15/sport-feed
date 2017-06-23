import { createSelector } from 'reselect';
import _ from 'underscore';

export const getResearchLogs = state => state.research.hitterLogs;
export const getResearchHitterLogs = (state, playerId) => state.research.hitterLogs[playerId];

// Grab all hitter ID's tracked sorted by average points
export const getHitterIds = createSelector(
  getResearchLogs,
  (logs) => {
    let totalBombs = 0;
    let totalGames = 0;
    let trendBombs = 0;
    let isoBombs = 0;
    let bombLastTwoCount = 0;
    let bombNextTwo = 0;
    let bombNextTwoNoSparq = 0;
    // here we have an object of org'd by playerId and then an array of games.
    // sort those games by date
    const nextLogs = logs && Object.keys(logs).reduce((map, playerId) => {
      // map is an object of objects containg playerId and average
      let playerLogs = logs[playerId] && logs[playerId].sort((first, second) => {
        const firstDateString = first.game && first.game.date.split('-').join('');
        const secondDateString = second.game && second.game.date.split('-').join('');

        return Number(firstDateString) - Number(secondDateString);
      });

      if (playerLogs) {
        playerLogs = playerLogs.map((game, idx) => {
          const points = Number(game.fantasyPoints);
          const twoAgo = playerLogs[idx - 2] && Number(playerLogs[idx - 2].fantasyPoints);
          const last = playerLogs[idx - 1] && Number(playerLogs[idx - 1].fantasyPoints);
          const inTwo = playerLogs[idx + 2] && Number(playerLogs[idx + 2].fantasyPoints);
          const next = playerLogs[idx + 1] && Number(playerLogs[idx + 1].fantasyPoints);

          let bombLastTwo = false;

          if ((last && last >= 18) || (twoAgo && twoAgo >= 18)) {
            bombLastTwo = true;
            bombLastTwoCount += 1;
          }

          if (points >= 18) {
            totalBombs += 1;

            if (bombLastTwo) {
              trendBombs += 1;
            } else {
              isoBombs += 1;
            }
          }

          if ((inTwo && inTwo >= 16) || (next && next >= 16)) {
            if (points >= 18) {
              bombNextTwo += 1;
            } else {
              bombNextTwoNoSparq += 1;
            }
          }

          totalGames++;

          return points;
        });
      }

      const playerAverage = playerLogs && playerLogs.reduce((average, game) => (
        average + game
      ), 0) / playerLogs.length;

      return {
        ...map,
        [playerId]: playerAverage,
      };
    }, {});

    console.log(bombNextTwo / totalBombs, bombNextTwoNoSparq / (totalGames - totalBombs));

    return nextLogs && Object.keys(nextLogs).sort((first, second) => (
      nextLogs[second] - nextLogs[first]
    ));

    // in the end, want to return an array of playerIds sorted by average points.
    // those Ids will be passed to another component where they'll get a selector
    // sorting by date and assigning DNPs, sparq, etc.
  },
);

export const playerLogSelector = createSelector(
  getResearchHitterLogs,
  (log) => {
    const playerName = log && log[0] && `${log[0].player.FirstName} ${log[0].player.LastName}`;

    let sortedLog = log && log.sort((first, second) => {
      const firstDateString = first.game && first.game.date.split('-').join('');
      const secondDateString = second.game && second.game.date.split('-').join('');

      return Number(firstDateString) - Number(secondDateString);
    });

    if (sortedLog) {
      sortedLog = sortedLog.map((game, idx) => {
        const points = Number(game.fantasyPoints);
        const threeAgo = sortedLog[idx - 3] && Number(sortedLog[idx - 3].fantasyPoints);
        const twoAgo = sortedLog[idx - 2] && Number(sortedLog[idx - 2].fantasyPoints);
        const last = sortedLog[idx - 1] && Number(sortedLog[idx - 1].fantasyPoints);
        const inThree = sortedLog[idx + 3];
        const inTwo = sortedLog[idx + 2];
        const next = sortedLog[idx + 1];

        let isSparq = false;
        let bombLastTwo = false;

        if ((!threeAgo || threeAgo < 16) && (!twoAgo || twoAgo < 16) && (!last || last < 16) && points >= 18) {
          isSparq = true;
        }

        if ((last && last >= 16) || (twoAgo && twoAgo >= 16)) {
          bombLastTwo = true;
        }

        return {
          points,
          isSparq,
          bombLastTwo,
        };
      });
    }

    return {
      playerName,
      log: sortedLog,
    };
  },
);
