export const updateItems = (nextItems, prevItems, date) => (
  nextItems.reduce((itemsMap, game) => {
    const key = `${game.player.ID}-${date}`;
    return {
      ...itemsMap,
      [key]: game,
    };
  }, { ...prevItems })
);

export const updateCollections = (games, prevCollections, date) => (
  games.reduce((collections, game) => {
    const dateKey = `date-${date}`;
    const playerKey = `player-${game.player.ID}`;
    return {
      ...collections,
      [dateKey]: collections[dateKey] ? [...collections[dateKey], game] : [game],
      [playerKey]: collections[playerKey] ? [...collections[playerKey], game] : [game],
    };
  }, { ...prevCollections })
);
