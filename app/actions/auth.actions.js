import { ActionTypes as types, history, ACCESS_TOKEN } from '../constants';
import { dataService, storeAuth } from '../services';

export const loginAction = (usernameOrEmail, password) => (dispatch) => {
  dispatch({ type: types.LOGIN.LOGIN_START });

  dataService
    .post('/api/auth/signin', {
      usernameOrEmail,
      password,
    })
    .then((res) => {
      dispatch({ type: types.LOGIN.LOGIN_SUCCESS, data: storeAuth(res.data) });
      history.push('/');
    })
    .catch((error) => {
      dispatch({
        type: types.LOGIN.LOGIN_ERROR,
        data: error.response.data[0],
      });
    });
};

export const registerAction = (values) => (dispatch) => {
  dispatch({ type: types.REGISTER.REGISTER_START });

  dataService
    .post('/api/auth/signup', values)
    .then(() => {
      dispatch({ type: types.REGISTER.REGISTER_SUCCESS });
      history.push('/login');
    })
    .catch((error) => {
      dispatch({
        type: types.REGISTER.REGISTER_ERROR,
        data: error.response.data[0],
      });
    });
};

export const logoutAction = () => (dispatch) => {
  localStorage.removeItem(ACCESS_TOKEN);
  dispatch({ type: types.LOGOUT });
};
