import { ActionTypes as types } from '../constants';

const register = (state = { error: '' }, action) => {
  switch (action.type) {
    case types.REGISTER.REGISTER_START:
    case types.REGISTER.REGISTER_SUCCESS:
      return '';
    case types.REGISTER.REGISTER_ERROR:
      return {
        error: action.data,
      };
    default:
      return state;
  }
};

export default register;
