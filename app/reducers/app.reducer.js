import { ActionTypes as types } from '../constants';

// import initialState from './initialState';

export default function appData(state = null, action) {
  if (action.type === types.APP.LOAD_APP_DATA_SUCCESS) {
    return action.data;
  }
  return state;
}
