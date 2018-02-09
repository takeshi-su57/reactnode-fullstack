import { ActionTypes as types } from '../constants';
import { dataService } from '../services';
export const loadAppData = () => (dispatch) => {
  dispatch({ type: types.APP.LOAD_APP_DATA_START });

  dataService
    .get('/api/reduxchanneldata')
    /* eslint-disable */
    .then(res => window.__PRELOADED_STATE__ = res.data);

  dataService
    .get('/api/applicationdata')
    .then((res) => {
      dispatch({ type: types.APP.LOAD_APP_DATA_SUCCESS, data: res.data });
    })
    .catch((error) => {
      dispatch({ type: types.APP.LOAD_APP_DATA_ERROR, data: error });
    });
};
