import axios from 'axios';
import * as actions from './types';
import { USERNAME, TOKEN, SPORTS_FEED_API } from '../../config';

const encryptedAuth = window.btoa(`${USERNAME}:${TOKEN}`);

export function fetchDivisionStandingsSuccess(divisions) {
  return {
    type: actions.FETCH_DIVISION_STANDINGS_SUCCESS,
    divisions,
  };
}

export function fetchDivisionStandings() {
  return (dispatch) => {
    dispatch({
      type: actions.FETCH_DIVISION_STANDINGS,
    });
    return axios.get(`${SPORTS_FEED_API}division_team_standings.json`, {
      headers: {
        Authorization: `Basic ${encryptedAuth}`,
      },
    }).then((resp) => {
      if (resp.error) {
        return resp.error;
      }
      const divisions = resp.data.divisionteamstandings.division;
      return dispatch(fetchDivisionStandingsSuccess(divisions));
    });
  };
}
