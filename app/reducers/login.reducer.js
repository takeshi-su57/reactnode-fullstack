import { ActionTypes as types } from '../constants';

export const auth = (
  state = { user: null, authenticated: false, error: '' },
  action
) => {
  switch (action.type) {
    case types.LOGIN.LOGIN_START:
    case types.LOGOUT:
      return {};
    case types.LOGIN.LOGIN_ERROR:
      return {
        authenticated: false,
        error: action.data,
      };
    case types.LOGIN.LOGIN_SUCCESS:
      return {
        authenticated: true,
        user: action.data,
        error: '',
      };
    default:
      return state;
  }
};

export default auth;
