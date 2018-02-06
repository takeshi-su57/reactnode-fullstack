import { ActionTypes as types } from '../constants';

export const notify = (state = '', action) => {
  switch (action.type) {
    case types.NOTIFY_SUCCESS:
      return { type: 'success', message: action.data };
    case types.NOTIFY_WARN:
      return { type: 'warning', message: action.data };
    case types.NOTIFY_ERROR:
      return { type: 'danger', message: action.data };
    case types.NOTIFY_CLEAR:
      return { type: 'clear', message: '' };
    default:
      return state;
  }
};

export default notify;
