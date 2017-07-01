import React from 'react';
import Pitcher from './Pitcher';

const PitcherRoute = ({
  params,
}) => <Pitcher playerId={params.playerId} />;

export default PitcherRoute;
