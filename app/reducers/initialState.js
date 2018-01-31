import { decode } from '../services';
import { AUTH_TOKEN } from '../constants';

const token = localStorage.getItem(AUTH_TOKEN);

const user = token ? decode(token) : null;

const initialState = {
  appData: null,
  auth: { user, authenticated: !!user },
};

export { initialState };
