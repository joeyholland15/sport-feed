import axios from 'axios';
import * as actions from './types';
import { USERNAME, TOKEN, SPORTS_FEED_API } from '../../config';

const encryptedAuth = window.btoa(`${USERNAME}:${TOKEN}`);

export function fetchPlayByPlaySuccess(atBats, gameId) {
  return {
    type: actions.FETCH_PLAYBYPLAY_SUCCESS,
    atBats,
    gameId,
  };
}

export function fetchPlayByPlay(gameId) {
  return (dispatch) => {
    dispatch({
      type: actions.FETCH_PLAYBYPLAY,
    });
    return axios.get(`${SPORTS_FEED_API}game_playbyplay.json?gameid=${gameId}`, {
      headers: {
        Authorization: `Basic ${encryptedAuth}`,
      },
    }).then((resp) => {
      if (resp.error) {
        return resp.error;
      }
      const atBats = resp.data.gameplaybyplay.atBats.atBat;
      return dispatch(fetchPlayByPlaySuccess(atBats, gameId));
    });
  };
}

export function fetchBoxScoreSuccess(data, gameId) {
  return {
    type: actions.FETCH_BOXSCORE_SUCCESS,
    data,
    gameId,
  };
}

export function fetchBoxScore(gameId) {
  return (dispatch) => {
    dispatch({
      type: actions.FETCH_BOXSCORE,
      gameId,
    });
    return axios.get(`${SPORTS_FEED_API}game_boxscore.json?gameid=${gameId}`, {
      headers: {
        Authorization: `Basic ${encryptedAuth}`,
      },
    }).then((resp) => {
      if (resp.error) {
        return resp.error;
      }
      const boxScore = resp.data.gameboxscore;
      return dispatch(fetchBoxScoreSuccess(boxScore, gameId));
    });
  };
}
