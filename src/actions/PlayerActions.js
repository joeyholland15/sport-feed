import axios from 'axios';
import * as actions from './types';
import { USERNAME, TOKEN, SPORTS_FEED_API } from '../../config';

const HITTER_STATS = [
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
  'XBH', // Extra base hits
];

const PITCHER_STATS = [
  'W',
  'IP',
  'SO',
  'BB',
  'HR',
  'H',
  'ER',
];

const encryptedAuth = window.btoa(`${USERNAME}:${TOKEN}`);

export function fetchHitterGamelogsSuccess(games, playerId) {
  return {
    type: actions.FETCH_HITTER_LOGS_SUCCESS,
    games,
    playerId,
  };
}

export function fetchHitterGamelogs(playerId) {
  const url = playerId ?
    `${SPORTS_FEED_API}player_gamelogs.json?player=${playerId}&playerstats=${HITTER_STATS.join(',')}` :
    `${SPORTS_FEED_API}player_gamelogs.json?playerstats=${HITTER_STATS.join(',')}`;

  return (dispatch) => {
    dispatch({
      type: actions.FETCH_HITTER_LOGS,
    });
    return axios.get(url, {
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

export function fetchPitcherGamelogsSuccess(games, playerId) {
  return {
    type: actions.FETCH_PITCHER_LOGS_SUCCESS,
    games,
    playerId,
  };
}

export function fetchPitcherGamelogs(playerId) {
  const url = playerId ?
    `${SPORTS_FEED_API}player_gamelogs.json?player=${playerId}&playerstats=${PITCHER_STATS.join(',')}` :
    `${SPORTS_FEED_API}player_gamelogs.json?playerstats=${PITCHER_STATS.join(',')}`;

  return (dispatch) => {
    dispatch({
      type: actions.FETCH_PITCHER_LOGS,
    });
    return axios.get(url, {
      headers: {
        Authorization: `Basic ${encryptedAuth}`,
      },
    }).then((resp) => {
      if (resp.error) {
        return resp.error;
      }
      const games = resp.data.playergamelogs.gamelogs;
      return dispatch(fetchPitcherGamelogsSuccess(games, playerId));
    });
  };
}

export function fetchAllCumulativeStatsSuccess(stats) {
  return {
    type: actions.FETCH_ALL_CUMULATIVE_PLAYER_STATS_SUCCESS,
    stats,
  };
}

export function fetchAllCumulativeStats() {
  return (dispatch) => {
    dispatch({
      type: actions.FETCH_ALL_CUMULATIVE_PLAYER_STATS,
    });
    return axios.get(`${SPORTS_FEED_API}cumulative_player_stats.json`, {
      headers: {
        Authorization: `Basic ${encryptedAuth}`,
      },
    }).then((resp) => {
      if (resp.error) {
        return resp.error;
      }
      const stats = resp.data.cumulativeplayerstats.playerstatsentry;
      return dispatch(fetchAllCumulativeStatsSuccess(stats));
    });
  };
}

export function fetchCumulativeStatsSuccess(stats) {
  return {
    type: actions.FETCH_CUMULATIVE_PLAYER_STATS_SUCCESS,
    stats,
  };
}

export function fetchCumulativeStats(playerId) {
  return (dispatch) => {
    dispatch({
      type: actions.FETCH_CUMULATIVE_PLAYER_STATS,
    });
    return axios.get(`${SPORTS_FEED_API}cumulative_player_stats.json?player=${playerId}`, {
      headers: {
        Authorization: `Basic ${encryptedAuth}`,
      },
    }).then((resp) => {
      if (resp.error) {
        return resp.error;
      }
      const stats = resp.data.cumulativeplayerstats.playerstatsentry;
      return dispatch(fetchCumulativeStatsSuccess(stats));
    });
  };
}
