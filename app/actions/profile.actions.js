import { ActionTypes as types } from '../constants';
import { dataService } from '../services';

export const loadProfileAction = () => dispatch => {
  dispatch({ type: types.PROFILE.LOAD_START });

  dataService
    .get('/api/profile')
    .then(res => {
      dispatch({ type: types.PROFILE.LOAD_SUCCESS, data: res.data });
    })
    .catch(error => {
      dispatch({
        type: types.PROFILE.LOAD_ERROR,
        data: error.response.data[0],
      });
    });
};

export const saveProfileAction = values => dispatch => {
  dispatch({ type: types.PROFILE.SAVE_START });

  dataService
    .put('/api/profile', values)
    .then(res => {
      dispatch({ type: types.PROFILE.SAVE_SUCCESS, data: res.data });
      dispatch({ type: types.PROFILE.LOAD_SUCCESS, data: res.data });
      dispatch({ type: types.NOTIFY_SUCCESS, data: 'Profile saved successfully' });
      setTimeout(() => {
        dispatch({ type: types.NOTIFY_CLEAR });
      }, 2000);
      dispatch({ type: types.NOTIFY_SUCCESS, data: 'Profile saved successfully' });
    })
    .catch(error => {
      dispatch({
        type: types.PROFILE.SAVE_ERROR,
        data: error.response.data[0],
      });
    });
};
