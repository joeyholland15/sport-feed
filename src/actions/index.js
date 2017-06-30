import axios from 'axios';
import * as actions from './types';
import { addDays } from '../constants/date';
import { USERNAME, TOKEN } from '../../config';

const SPORTS_FEED_API = 'https://www.mysportsfeeds.com/api/feed/pull/mlb/2016-regular/';

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

const encryptedAuth = window.btoa(`${USERNAME}:${TOKEN}`);

export function fetchTeamGameLogsSuccess(games) {
  return {
    type: actions.FETCH_TEAM_LOGS_SUCCESS,
    games,
  };
}

export function fetchTeamGameLogs(teams) {
  return (dispatch) => {
    dispatch({
      type: actions.FETCH_TEAM_LOGS,
    });
    return axios.get(`${SPORTS_FEED_API}team_gamelogs.json?team=${teams}`, {
      headers: {
        Authorization: `Basic ${encryptedAuth}`,
      },
    }).then((resp) => {
      if (resp.error) {
        return resp.error;
      }
      const games = resp.data.teamgamelogs.gamelogs;
      return dispatch(fetchTeamGameLogsSuccess(games));
    });
  };
}

export function fetchStartingLineupSuccess(data) {
  return {
    type: actions.FETCH_STARTING_LINEUP_SUCCESS,
    data,
  };
}

export function fetchStartingLineup(gameId) {
  return (dispatch) => {
    dispatch({
      type: actions.FETCH_STARTING_LINEUP,
    });
    return axios.get(`${SPORTS_FEED_API}game_startinglineup.json?gameid=${gameId}`, {
      headers: {
        Authorization: `Basic ${encryptedAuth}`,
      },
    }).then((resp) => {
      if (resp.error) {
        return resp.error;
      }
      console.log('RESP', resp.data)
      // const games = resp.data.teamgamelogs.gamelogs;
      // return dispatch(fetchStartingLineupSuccess(games));
    });
  };
}

export function fetchPlayerGameLogsSuccess(games, playerId) {
  return {
    type: actions.FETCH_PLAYER_LOGS_SUCCESS,
    games,
    playerId,
  };
}

export function fetchPlayerGameLogs(playerId, date) {
  return (dispatch) => {
    dispatch({
      type: actions.FETCH_PLAYER_LOGS,
    });
    return axios.get(`${SPORTS_FEED_API}player_gamelogs.json?player=${playerId}&date=until-${date}`, {
      headers: {
        Authorization: `Basic ${encryptedAuth}`,
      },
    }).then((resp) => {
      if (resp.error) {
        return resp.error;
      }
      const games = resp.data.playergamelogs.gamelogs;
      return dispatch(fetchPlayerGameLogsSuccess(games, playerId));
    });
  };
}

export function fetchDailyStatsByDateSuccess(stats, date = '20160521') {
  return {
    type: actions.FETCH_DAILY_STATS_SUCCESS,
    stats,
    date,
  };
}

export function fetchDailyStatsByDate(date) {
  return (dispatch) => {
    dispatch({
      type: actions.FETCH_DAILY_STATS,
      date,
    });
    return axios.get(`${SPORTS_FEED_API}daily_player_stats.json?fordate=${date}`, {
      headers: {
        Authorization: `Basic ${encryptedAuth}`,
      },
    }).then((resp) => {
      if (resp.error) {
        return resp.error;
      }
      const dailyStatEntries = resp.data.dailyplayerstats.playerstatsentry;
      return dispatch(fetchDailyStatsByDateSuccess(dailyStatEntries, date));
    });
  };
}

export function fetchStatsByDateSuccess(stats, date = '20160521') {
  return {
    type: actions.FETCH_STATS_BY_DATE_SUCCESS,
    stats,
    date,
  };
}

export function fetchStatsByDate(date) {
  return (dispatch) => {
    dispatch({
      type: actions.FETCH_STATS_BY_DATE,
      date,
    });
    return axios.get(`${SPORTS_FEED_API}daily_dfs.json?fordate=${date}`, {
      headers: {
        Authorization: `Basic ${encryptedAuth}`,
      },
    }).then((resp) => {
      if (resp.error) {
        return resp.error;
      }
      const dkIndex = resp.data.dailydfs.dfsEntries.findIndex(entry => entry.dfsType === 'DraftKings');
      return dispatch(fetchStatsByDateSuccess(resp.data.dailydfs.dfsEntries[dkIndex].dfsRows, date));
    });
  };
}

export function fetchDfsForResearchSuccess(stats, date = '20160521') {
  return {
    type: actions.FETCH_DFS_FOR_RESEARCH_SUCCESS,
    stats,
    date,
  };
}

export function fetchDfsForResearch(date) {
  return (dispatch) => {
    dispatch({
      type: actions.FETCH_DFS_FOR_RESEARCH,
      date,
    });
    return axios.get(`${SPORTS_FEED_API}daily_dfs.json?fordate=${date}`, {
      headers: {
        Authorization: `Basic ${encryptedAuth}`,
      },
    }).then((resp) => {
      if (resp.error) {
        return resp.error;
      }
      const dkIndex = resp.data.dailydfs.dfsEntries.findIndex(entry => entry.dfsType === 'DraftKings');
      return dispatch(fetchDfsForResearchSuccess(resp.data.dailydfs.dfsEntries[dkIndex].dfsRows, date));
    });
  };
}

export function fetchScoreboardSuccess(data, date = '20160521') {
  return {
    type: actions.FETCH_SCOREBOARD_SUCCESS,
    data,
    date,
  };
}

export function fetchScoreboard(date) {
  return (dispatch) => {
    dispatch({
      type: actions.FETCH_SCOREBOARD,
      date,
    });
    return axios.get(`${SPORTS_FEED_API}scoreboard.json?fordate=${date}`, {
      headers: {
        Authorization: `Basic ${encryptedAuth}`,
      },
    }).then((resp) => {
      if (resp.error) {
        return resp.error;
      }
      const scores = resp.data.scoreboard.gameScore;
      return dispatch(fetchScoreboardSuccess(scores, date));
    });
  };
}

export function fetchScoreTrendSuccess(data, date = '20160521') {
  return {
    type: actions.FETCH_SCORE_TREND_SUCCESS,
    data,
    date,
  };
}

export function fetchScoreTrend(date) {
  return (dispatch) => {
    dispatch({
      type: actions.FETCH_SCORE_TREND,
      date,
    });
    return axios.get(`${SPORTS_FEED_API}scoreboard.json?fordate=${date}`, {
      headers: {
        Authorization: `Basic ${encryptedAuth}`,
      },
    }).then((resp) => {
      if (resp.error) {
        return resp.error;
      }
      const scores = resp.data.scoreboard.gameScore;
      return dispatch(fetchScoreTrendSuccess(scores, date));
    });
  };
}

export function setFeedFilter(filter = 'Pitchers') {
  return {
    type: actions.SET_FEED_FILTER,
    filter,
  };
}

export function setSalaryFilterMin(min) {
  return {
    type: actions.SET_SALARY_FILTER_MIN,
    min,
  };
}

export function setSalaryFilterMax(max) {
  return {
    type: actions.SET_SALARY_FILTER_MAX,
    max,
  };
}

export function setPositionFilter(position) {
  return {
    type: actions.SET_POSITION_FILTER,
    position,
  };
}

export function setTeamFilter(team) {
  return {
    type: actions.SET_TEAM_FILTER,
    team,
  };
}

export function addPlayerToLineup(game) {
  return {
    type: actions.LINEUP_PLAYER_ADD,
    game,
  };
}

export function removePlayerFromLineup(game) {
  return {
    type: actions.LINEUP_PLAYER_REMOVE,
    game,
  };
}

export function clearLineup() {
  return {
    type: actions.LINEUP_CLEAR,
  };
}

export function setDate(date) {
  return {
    type: actions.SET_DATE,
    date,
  };
}
