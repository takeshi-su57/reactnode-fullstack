import * as actionTypes from '../actions/actionTypes';

const initialState = { showChat: false, disabledInput: false };

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.TOGGLE_CHAT: {
      return { showChat: !state.showChat };
    }
    case actionTypes.TOGGLE_INPUT_DISABLED: {
      return state.update('disabledInput', disabledInput => !disabledInput);
    }
    default:
      return state;
  }
}
