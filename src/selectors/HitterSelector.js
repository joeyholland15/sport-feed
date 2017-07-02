import { createSelector } from 'reselect';

const getPlayerState = state => state.players.items;
const getInjuryState = state => state.injuries.items;

export const hitterFeedSelector = createSelector(
  getPlayerState,
  (stats) => {
    const hitters = stats && Object.keys(stats)
      .filter(playerId => stats[playerId].player.Position !== 'P' &&
        !isNaN(stats[playerId].pointsPerGame))
      .map(id => stats[id]);

    return hitters && hitters.sort((first, second) => (
      second.pointsPerGame - first.pointsPerGame
    )).map(player => player.player.ID);
  },
);

export const hitterInjurySelector = createSelector(
  getPlayerState,
  getInjuryState,
  (players, injuries) => {
    const validInjuryIds = injuries && players && Object.keys(injuries)
      .filter(playerId => players[playerId] && players[playerId].player.Position !== 'P' &&
        !isNaN(players[playerId].pointsPerGame));

    return validInjuryIds && validInjuryIds.sort((first, second) => (
      players[second].pointsPerGame - players[first].pointsPerGame
    ));
  },
);
