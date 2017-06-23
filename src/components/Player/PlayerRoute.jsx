import React from 'react';
import Player from './Player';

const PlayerRoute = ({
  params,
}) => <Player playerId={params.playerId} />;

export default PlayerRoute;
