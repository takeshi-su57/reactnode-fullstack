import { decode } from '../services';
import { ACCESS_TOKEN } from '../constants';

const isWindow = (typeof window !== 'undefined');
const token = isWindow ? localStorage.getItem(ACCESS_TOKEN) : '';

const user = token ? decode(token) : null;

// Grab the state from a global variable injected into the server-generated HTML
/* eslint-disable */
const preloadedState = isWindow && window.__PRELOADED_STATE__;

const initialState = {
  appData: preloadedState,
  auth: { user, authenticated: !!user },
};

export { initialState };
