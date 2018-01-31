import { applyMiddleware, createStore } from 'redux';

import rootReducer from '../reducers/index';

const store = createStore(rootReducer, applyMiddleware(thunk, logger));

export default store;
