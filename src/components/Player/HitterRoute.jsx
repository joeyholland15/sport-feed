import React from 'react';
import Hitter from './Hitter';

const HitterRoute = ({
  params,
}) => <Hitter playerId={params.playerId} />;

// React.PropTypes = {
//   params: React.PropTypes.shape({
//     playerId: React.PropTypes.string.isRequired,
//   }),
// };

export default HitterRoute;
