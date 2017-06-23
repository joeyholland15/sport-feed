import React from 'react';
import Player from './Player';

const PlayerRoute = ({
  params,
}) => <Player playerId={params.playerId} />;

React.PropTypes = {
  params: React.PropTypes.shape({
    playerId: React.PropTypes.string.isRequired,
  }),
};

export default PlayerRoute;
