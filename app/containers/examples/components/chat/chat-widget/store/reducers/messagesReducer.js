import { MESSAGE_SENDER } from '../../constants';

import {
  createNewMessage,
  createLinkSnippet,
  createComponentMessage
} from './helper';
import * as actionTypes from '../actions/actionTypes';

const initialState = [];

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.ADD_NEW_USER_MESSAGE: {
      return [...createNewMessage(action.text, MESSAGE_SENDER.CLIENT)];
    }
    case actionTypes.ADD_NEW_RESPONSE_MESSAGE: {
      return [...createNewMessage(action.text, MESSAGE_SENDER.RESPONSE)];
    }
    case actionTypes.ADD_NEW_LINK_SNIPPET: {
      return createLinkSnippet(action.link, MESSAGE_SENDER.RESPONSE);
    }
    case actionTypes.ADD_COMPONENT_MESSAGE: {
      return createComponentMessage(action.component, action.props, action.showAvatar);
    }
    default:
      return state;
  }
}
