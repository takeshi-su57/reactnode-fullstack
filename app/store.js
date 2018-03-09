import { createStore, applyMiddleware, compose } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import thunk from 'redux-thunk';
import reduxImmutableStateInvariant from 'redux-immutable-state-invariant';
import { createLogger } from 'redux-logger';
import { rootReducer, initialState } from './reducers';
import { ACCESS_TOKEN, history, ActionTypes as actionTypes } from './constants';
import { storeAuth, isBrowser } from './services';

const enhancers = [];
const middleware = [thunk, routerMiddleware(history)];
const isDev = process.env.NODE_ENV === 'development';

if (isDev && isBrowser) {
  /* eslint-disable global-require */
  const logger = createLogger({
    collapsed: true,
  });
  const { devToolsExtension } = window;
  if (typeof devToolsExtension === 'function') {
    enhancers.push(devToolsExtension());
  }

  middleware.push(logger);
  middleware.push(reduxImmutableStateInvariant());
}

const composedEnhancers = compose(applyMiddleware(...middleware), ...enhancers);

export default function storeSetup(additionalState = undefined) {
  const finalState = Object.assign({}, initialState, additionalState);
  const store = createStore(rootReducer(), finalState, composedEnhancers);

  const token = finalState && finalState.appData && finalState.appData[ACCESS_TOKEN];
  if (token && isBrowser) {
    store.dispatch({ type: actionTypes.LOGIN.LOGIN_SUCCESS, data: storeAuth(token) });
  }

  return store;
}

export function injectAsyncReducer(storeInput, asyncReducer) {
  storeInput.replaceReducer(rootReducer(asyncReducer));
}
