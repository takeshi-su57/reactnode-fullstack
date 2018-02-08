import { createStore, applyMiddleware, compose } from 'redux';

import * as io from 'socket.io-client';

import createSagaMiddleware from 'redux-saga';

import thunk from 'redux-thunk';
// import { persistState } from 'redux-devtools';
import { getPreloadedState } from './getPreloadedState'
import { getDebugSessionKey } from './utility'
// import { DevTools } from './components/DevTools/DevTools'
import { initSagas } from './initSagas';

import {
    RECEIVE_MESSAGE,
    receiveMessage
} from './actions'

import { reducer } from './reducers';
import { createSocketMiddleware } from './socketMiddleware'

const preloadedState = getPreloadedState();
const sagaMiddleware = createSagaMiddleware();

const socketMiddleware = createSocketMiddleware(io)({
    NEW_MESSAGE: (data) => ({
        type: RECEIVE_MESSAGE,
        message: data
    })
});

const enhancer = compose(
    applyMiddleware(
        sagaMiddleware,
        thunk,
        socketMiddleware
    ),
    // DevTools.instrument(),
    // persistState(getDebugSessionKey())
);

const store = createStore(
    reducer,
    preloadedState,
    enhancer
);

export const getStore = () => store;

initSagas(sagaMiddleware);

