import axios from 'axios';
import * as actions from './types';
import { USERNAME, TOKEN, SPORTS_FEED_API } from '../../config';

const encryptedAuth = window.btoa(`${USERNAME}:${TOKEN}`);

export function fetchInjuriesSuccess(injuries) {
  return {
    type: actions.FETCH_INJURIES_SUCCESS,
    injuries,
  };
}

export function fetchInjuries() {
  return (dispatch) => {
    dispatch({
      type: actions.FETCH_INJURIES,
    });
    return axios.get(`${SPORTS_FEED_API}player_injuries.json`, {
      headers: {
        Authorization: `Basic ${encryptedAuth}`,
      },
    }).then((resp) => {
      if (resp.error) {
        return resp.error;
      }
      const injuries = resp.data.playerinjuries.playerentry;
      return dispatch(fetchInjuriesSuccess(injuries));
    });
  };
}
