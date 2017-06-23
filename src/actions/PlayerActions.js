import axios from 'axios';
import * as actions from './types';

const API = 'http://localhost:8081';
const SPORTS_FEED_API = 'https://www.mysportsfeeds.com/api/feed/pull/mlb/2016-regular/';

const username = 'joeyholland15';
const password = 'mysportsfeed4444';

const encryptedAuth = window.btoa(`${username}:${password}`);

export function fetchHitterGamelogsSuccess(games, playerId) {
  return {
    type: actions.FETCH_HITTER_LOGS_SUCCESS,
    games,
    playerId,
  };
}

export function fetchHitterGamelogs(playerId) {
  return (dispatch) => {
    dispatch({
      type: actions.FETCH_HITTER_LOGS,
    });
    const hitterStats = [
      'H',
      'RBI',
      'HR',
      'PA',
      'SB',
      '2B',
      '3B',
      'BB',
      'HBP',
      'R',
      'LD', // BatterLineDrives
      'FlyB', // BatterFlyBalls
      'GroB', // BatterGroundBalls
    ];
    return axios.get(`${SPORTS_FEED_API}player_gamelogs.json?player=${playerId}&playerstats=${hitterStats.join(',')}`, {
      headers: {
        Authorization: `Basic ${encryptedAuth}`,
      },
    }).then((resp) => {
      if (resp.error) {
        return resp.error;
      }
      const games = resp.data.playergamelogs.gamelogs;
      return dispatch(fetchHitterGamelogsSuccess(games, playerId));
    });
  };
}
