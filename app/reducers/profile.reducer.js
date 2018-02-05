import { ActionTypes as types } from '../constants';

export const profile = (state = { profile: null, error: '' }, action) => {
  switch (action.type) {
    case types.PROFILE.LOAD_START:
      return {};
    case types.PROFILE.LOAD_ERROR:
      return {
        error: action.data,
      };
    case types.PROFILE.LOAD_SUCCESS:
      return {
        data: action.data,
        error: '',
      };
    case types.PROFILE.SAVE_START:
      return {};
    case types.PROFILE.START_ERROR:
      return {
        error: action.data,
      };
    case types.PROFILE.START_SUCCESS:
      return {
        data: action.data,
        error: '',
      };
    default:
      return state;
  }
};

export default profile;
