import { decode, isBrowser } from '../services';
import { ACCESS_TOKEN } from '../constants';

const token = isBrowser ? localStorage.getItem(ACCESS_TOKEN) : '';

const user = token ? decode(token) : null;

const initialState = {
  auth: { user, authenticated: !!user },
};

export { initialState };
